import * as vscode from 'vscode';
import convertToHTML from './convertToHTML';

let panel: vscode.WebviewPanel | undefined = undefined;

export default function updatePreview(
	document: vscode.TextDocument
): vscode.WebviewPanel {
	const htmlContent = convertToHTML(document.getText());

	if (!panel) {
		panel = vscode.window.createWebviewPanel(
			'preview',
			'Preview',
			vscode.ViewColumn.Two,
			{}
		);
	}

	panel.webview.html = htmlContent;
	return panel;
}
