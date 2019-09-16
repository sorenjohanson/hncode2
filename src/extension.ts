// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HNTreeDataProvider } from './hncodeprovider';
import { getTop, getStories } from './api';
import { HNData } from './interface';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage("Extension HNCode loaded!");

	getTop().then(response => {
		getStories(response).then(response => {
			const treeDataProvider = new HNTreeDataProvider(response);
			vscode.window.registerTreeDataProvider('top-stories', treeDataProvider);
			vscode.commands.registerCommand('hncode.refresh', () => treeDataProvider.refresh());
		}).catch(error => {
			console.log(error.message);
			vscode.window.showErrorMessage(error.mmesage);
		});
	});
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("Deactivated");
}
