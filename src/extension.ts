// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HNTreeDataProvider } from './hncodeprovider';
import { getTop, getStories, getAsk } from './api';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('hncode.openurl', link => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(link)));

	// Top Stories
	getTop().then(response => {
		getStories(response).then(response => {
			const treeDataProvider = new HNTreeDataProvider(response, "top");
			vscode.window.registerTreeDataProvider('top-stories', treeDataProvider);
			vscode.commands.registerCommand('hncode.refresh', () => treeDataProvider.refresh());
		}).catch(error => {
			vscode.window.showErrorMessage(error.mmesage);
		});
	});

	// Ask HN
	getAsk().then(response => {
		getStories(response).then(response => {
			const askProvider = new HNTreeDataProvider(response, "ask");
			vscode.window.registerTreeDataProvider('ask-hn', askProvider);
			vscode.commands.registerCommand('hncode.refresh', () => askProvider.refresh());
		}).catch(error => {
			vscode.window.showErrorMessage(error.mmesage);
		});
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
