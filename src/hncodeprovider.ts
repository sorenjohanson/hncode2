import * as vscode from 'vscode';
import { HNData } from './interface';
import { getTop, getStories, getAsk } from './api';

export class HNTreeDataProvider implements vscode.TreeDataProvider<HNData> {

	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	constructor(private readonly stories: HNData[], private readonly identifier: string) {
    }

	public refresh(): any {
		this._onDidChangeTreeData.fire();
    }

    public getTreeItem(element: HNData): vscode.TreeItem {
		return new Story(element.title, vscode.TreeItemCollapsibleState.None, element.url, {
            command: 'hncode.openurl',
            title: '',
            arguments: [element.url]
        });
    }

    public getChildren(element?: HNData): Thenable<HNData[]> {
        return new Promise<HNData[]>((c, e) => {
			if (element) {
				c(getStories(element.kids));
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
				}
			}
        });
    }
}
export class Story extends vscode.TreeItem {

	constructor(
		public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        private url?: vscode.Uri,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	get description(): string {
		return this.label;
	}

	contextValue = 'story';

}
