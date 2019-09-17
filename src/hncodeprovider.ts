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

		return new Story(`${element.title}`, vscode.TreeItemCollapsibleState.Collapsed, this.identifier, url, {
            command: 'hncode.openurl',
            title: '',
            arguments: [url]
        });
    }

    public getChildren(element?: HNData): Thenable<HNData[]> {
        return new Promise<HNData[]>((c, e) => {
			if (element) {
				// Do nothing
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

	get tooltip(): string {
		return `${this.url}`;
	}
	contextValue = this.cValue;
}
