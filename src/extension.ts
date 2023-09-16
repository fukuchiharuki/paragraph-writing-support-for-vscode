import * as vscode from 'vscode';
import updatePreview from './updatePreview';
import debounce from './debounce';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel | undefined = undefined;

	// on command call
	let disposable = vscode.commands.registerCommand('paragraph-writing-support.preview', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			panel = updatePreview(panel, document);
		}
	});

	// on text change
	vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;
		if (editor && event.document === editor.document) {
			debounce(() => {
				panel = updatePreview(panel, event.document);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}