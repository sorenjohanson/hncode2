import * as vscode from 'vscode';
import { HNData } from './interface';
import { getTop, getStories, getAsk, getNew, getShow } from './api';

export class HNTreeDataProvider implements vscode.TreeDataProvider<HNData> {

	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	constructor(private readonly stories: HNData[], public identifier: string) {
    }

	public refresh(): any {
		this._onDidChangeTreeData.fire();
	}
	
	public setIdentifier(newIdentifier: string): any {
		this.identifier = newIdentifier;
		this.refresh();
	}

    public getTreeItem(element: HNData): vscode.TreeItem {
		let url: vscode.Uri = element.url ? element.url : <vscode.Uri><unknown>(`https://news.ycombinator.com/item?id=${element.id}`);
		let collapsed = element.isComment ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed;
		return new Story(`${element.title}`, collapsed, this.identifier, url, {
            command: 'hncode.openurl',
            title: '',
            arguments: [url]
        });
    }

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
export class Story extends vscode.TreeItem {

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
