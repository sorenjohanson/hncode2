import * as vscode from 'vscode';
import * as path from 'path';

import * as rm from 'typed-rest-client/RestClient';

interface HNData {
    by: string;
    id: number;
    kids: number[];
    title: string;
    url: string;
}

// I need a TreeDataProvider extending from vscode.TreeDataProvider<T>
// And an HNStory class would be good too I guess

export class HNStory {
    private BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
    private restClient: rm.RestClient = new rm.RestClient('hncode', this.BASE_URL);
    private by: string = '';
    private kids: number[] = [];
    private title: string = '';
    private url: string = '';

    constructor(id: number) {
        this.get(id).then(response => {
        });
    }

    public get(id: number): Thenable<HNData> {
        return new Promise<HNData>((c, e) => {
            this.restClient.get<HNData>('item/' + id + '.json').then(response => {
                console.log(response);
            }).catch(error => {
                e(error.message);
            })
        });
    }
}

export class HNTreeDataProvider implements vscode.TreeDataProvider<HNData> {

	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	constructor(private readonly story: HNStory) { }

	public refresh(): any {
		this._onDidChangeTreeData.fire();
    }

    public getTreeItem(element: HNData): vscode.TreeItem {
		return {
			collapsibleState: void 0,
			command: element.url ? void 0 : {
				command: 'hncode.openLink',
				arguments: [element.url],
				title: 'Open External Link'
			}
		};
    }
}