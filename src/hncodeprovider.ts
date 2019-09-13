import * as vscode from 'vscode';
import * as path from 'path';

import * as rm from 'typed-rest-client/RestClient';

import { HNData } from './interface';
import { getStory, getTop, getKids } from './api';

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

	constructor(private readonly stories: HNData[]) { }

	public refresh(): any {
		this._onDidChangeTreeData.fire();
    }

    public getTreeItem(element: HNData): vscode.TreeItem {
		return {
            label: element.title,
            id: element.id,
            resourceUri: element.url,
			collapsibleState: void 0
		};
    }

    public getChildren(element?: HNData): Thenable<HNData[]> {
        // @TODO: Fix loop
        if (element) {
            return getKids(element.kids);
        } else {

        }
    }

    public getParent(element: HNData): HNData | null {
        console.log(element);
        const url = element.url;
        return url ? element : null;
    }
}

export class HNStoryExplorer {

    private storyViewer: vscode.TreeView<HNData> | undefined;

    constructor(context: vscode.ExtensionContext, stories: number[]) {
        getStories(stories).then(response => {
            if (response) {
                const treeDataProvider = new HNTreeDataProvider(hnStories);
                vscode.commands.registerCommand('hnCode.refresh', () => treeDataProvider.refresh());
                this.storyViewer = vscode.window.createTreeView('top-stories', { treeDataProvider });
            }
        });     
    }
}

async function getStories(stories: number[]) {
    if (stories) {
        let hnPromises: Array<Promise<HNData>> = [];
        let hnStories: HNData[] = [];
        for (let i in stories) {
            let fetch: Promise<HNData> = new Promise(async (resolve, reject) => {
                let story: HNData = await getStory(stories[i].toString());
                if (story) {
                    resolve(story);
                } else {
                    reject();
                }
            });
            hnPromises.push(fetch);
        }

        Promise.all(hnPromises).then(responses => {
            responses.forEach(response => {
                if (response) {
                    hnStories.push(response);
                }
            });
            return hnStories;
        });
    }
}