import * as vscode from 'vscode';
import updatePreview from './presentation/updatePreview';
import debounce from './presentation/debounce';
import convertToHtml from './model/convertToHtml';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	// on command call
	let disposable = vscode.commands.registerCommand('paragraph-writing-support.preview', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			updatePreview(document, convertToHtml);
		}
	});

	// on text change
	vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;
		if (editor && event.document === editor.document) {
			debounce(() => {
				updatePreview(event.document, convertToHtml);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
