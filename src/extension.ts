// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HNTreeDataProvider } from './hncodeprovider';


/**
 * This function is called when the extension is viewed for the first time. Refer to package.json for activationEvents.
 * @param context - Provided by VSCode
 */
export async function activate(context: vscode.ExtensionContext) {

	/**
	 * Workspace configuration defined in package.json
	 */
	const config = vscode.workspace.getConfiguration("hncode2");
	
	vscode.commands.registerCommand('hncode.openurl', link => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(link)));
	const treeDataProvider = new HNTreeDataProvider(config.defaultView);
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
