import * as vscode from 'vscode';
import { HNData } from './interface';
import { getTop, getStories } from './api';

// I need a TreeDataProvider extending from vscode.TreeDataProvider<T>
// And an HNStory class would be good too I guess

// export class HNStory {

//     constructor(id: string, by: string, kids: number[], title: string, url: vscode.Uri) {
//     }

//     public get(id: string): Thenable<HNData> {
//         return getStory(id);
//     }
// }

export class HNTreeDataProvider implements vscode.TreeDataProvider<HNData> {

	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	constructor(private readonly stories: HNData[]) {
    }

	public refresh(): any {
		this._onDidChangeTreeData.fire();
    }

    public getTreeItem(element: HNData): vscode.TreeItem {
		return new vscode.TreeItem(element.title, vscode.TreeItemCollapsibleState.None);
    }

    public getChildren(element?: HNData): Thenable<HNData[]> {
        // @TODO: Fix loop
        return new Promise<HNData[]>((c, e) => {
            if (element) {
                c(getStories(element.kids));
            } else {
                getTop().then(response => {
                    getStories(response).then(response => {
                        c(response);
                    });
                });
            }
        });
    }
}