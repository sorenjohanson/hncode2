import * as vscode from 'vscode';
import { HNData } from './interface';
import { getTop, getStories, getAsk, getNew, getShow } from './api';

/**
 * This TreeDataProvider provides all relevant stories for the tree view.
 */
export class HNTreeDataProvider implements vscode.TreeDataProvider<HNData> {

	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();

	/** @description Event which fires when view is refreshed (either through action or by changing data provider) */
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	/**
	 * @param identifier - String that identifies which tree is being provided (ask, top, new, show)
	 */
	constructor(public identifier: string) {
    }

	/**
	 * Method that refreshes the tree view (this calls [[getChildren]] again)
	 */
	public refresh(): any {
		this._onDidChangeTreeData.fire();
	}
	
	/**
	 * Function that sets new identifying string and refreshes view after
	 * @param newIdentifier - New string that identifies which tree is being provided
	 */
	public setIdentifier(newIdentifier: string): any {
		this.identifier = newIdentifier;
		this.refresh();
	}

	/**
	 * Gets a single tree item for display purposes (called by vscode.TreeDataProvider)
	 * @param element - Data Element passed on from [[getChildren]]
	 */
    public getTreeItem(element: HNData): vscode.TreeItem {
		let url: vscode.Uri = element.url ? element.url : <vscode.Uri><unknown>(`https://news.ycombinator.com/item?id=${element.id}`);
		let collapsed = element.isComment ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed;
		return new Story(`${element.title}`, collapsed, this.identifier, url, {
            command: 'hncode.openurl',
            title: '',
            arguments: [url]
        });
    }

	/**
	 * Main function called by vscode.TreeDataProvider to populate tree view with relevant stories
	 * @param element - Data Element of which to get comments from
	 */
    public getChildren(element?: HNData): Thenable<HNData[]> {
        return new Promise<HNData[]>((c, e) => {
			if (element) {
				let data: HNData[] = [];
				let comments: HNData = {
					"id": element.id,
					"descendants": element.descendants,
					"title": `${element.descendants} comments`,
					"url": <vscode.Uri><unknown>(`https://news.ycombinator.com/item?id=${element.id}`),
					"isComment": true
				};
				data.push(comments);
				c(data);
			} else {
				switch(this.identifier) {
					case "top":
						getTop().then(response => {
							getStories(response).then(response => {
								c(response);
							}).catch(error => {
								e(error.message);
							});
						});
						break;
					case "ask":
						getAsk().then(response => {
							getStories(response).then(response => {
								c(response);
							}).catch(error => {
								e(error.message);
							});
						});
						break;
					case "new":
						getNew().then(response => {
							getStories(response).then(response => {
								c(response);
							}).catch(error => {
								e(error.message);
							});
						});
						break;
					case "show":
						getShow().then(response => {
							getStories(response).then(response => {
								c(response);
							}).catch(error => {
								e(error.message);
							});
						});
						break;
				}
			}
        });
    }
}

/**
 * Provides a vscode.TreeItem with some customization to fit the needs of the HN Tree View.
 */
export class Story extends vscode.TreeItem {

	/**
	 * @param label - Title of the Story displayed
	 * @param collapsibleState - Can this element be expanded (Collapsed) or not (None)?
	 * @param cValue - Context value (top, show, ask, new) of Story
	 * @param url - URL of Story Item
	 * @param command - Command to execute when Story Item is clicked on
	 */
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly cValue: string,
        private url?: vscode.Uri,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get description(): string {
		let desc: string = '';

		let linkRe: RegExp = new RegExp('\/\/([a-zA-Z\.0-9\-\_]*)\/', 'm');
		let url: vscode.Uri | undefined = this.url;
		if (url) {
			let links: RegExpMatchArray | null = url.toString().match(linkRe);
			if (links) {
				desc = links[1];
			}
		}
		return desc;
	}

	contextValue = this.cValue;
}
