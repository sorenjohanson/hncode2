// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HNTreeDataProvider } from './hncodeprovider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('hncode.openurl', link => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(link)));
	const treeDataProvider = new HNTreeDataProvider("top");
	vscode.window.registerTreeDataProvider('top-stories', treeDataProvider);

	/* REGISTER COMMANDS */

	vscode.commands.registerCommand('hncode.refresh', () => treeDataProvider.refresh());
	vscode.commands.registerCommand('hncode.top', () => treeDataProvider.setIdentifier("top"));
	vscode.commands.registerCommand('hncode.ask', () => treeDataProvider.setIdentifier("ask"));
	vscode.commands.registerCommand('hncode.new', () => treeDataProvider.setIdentifier("new"));
	vscode.commands.registerCommand('hncode.show', () => treeDataProvider.setIdentifier("show"));
}

// this method is called when your extension is deactivated
export function deactivate() {}
