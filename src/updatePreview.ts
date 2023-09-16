import * as vscode from 'vscode';
import convertToHTML from './convertToHTML';

export default function updatePreview(
	panel: vscode.WebviewPanel | undefined,
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
