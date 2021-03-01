// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as os from "os";
import { getSnippetForExt } from './config';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cqh-insert" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('cqh-insert.insert', (textEditor, edit) => {
		// The code you place here will be executed every time your command is executed
		let document = textEditor.document;
		let position = textEditor.selection.active;
		let config = getSnippetForExt(document.uri.path);
		if (config == null) {
			vscode.window.showErrorMessage(`cannot find snippet for [${document.uri.path}]`)
			return;
		}
		let quickPickItem: vscode.QuickPickItem[] = [];
		let insert_list = config.configList;
		let index = 1;
		for (let value of insert_list) {
			quickPickItem.push({
				"label": `${index}.${value.name}`,
				"description": ""+index
			})
			index = index + 1
		}
		

		vscode.window.showQuickPick(quickPickItem).then(item => {
			if (item) {
				// last_word = item.description;
				let indexStr = item.description;
				if (indexStr) {
					let indexNum = parseInt(indexStr);

					let insertItem = insert_list[indexNum-1];
					let insert_line = insertItem.list.join(os.EOL);
					let activeEditor = vscode.window.activeTextEditor;
					if(activeEditor) {
						activeEditor.insertSnippet(new vscode.SnippetString(insert_line), position);
					} else {
						vscode.window.showErrorMessage("activeEditor is null");
					}


				}

				// edit.insert(currentPosition, item.description);
			}
		})
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from cqh-insert!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
