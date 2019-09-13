// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HNStoryExplorer } from './hncodeprovider';
import { getTop } from './api';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage("Extension HNCode loaded!");
	getTop().then(response => {
		if (response) {
			// tslint:disable-next-line: no-unused-expression
			new HNStoryExplorer(context, response);
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
