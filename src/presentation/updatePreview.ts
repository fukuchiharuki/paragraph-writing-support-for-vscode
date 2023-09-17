import * as vscode from 'vscode';
import convertToHtml from './convertToHtml';

let panel: vscode.WebviewPanel | null = null;

export default function updatePreview(
	document: vscode.TextDocument,
) {
	const htmlContent = convertToHtml(document.getText());

	if (!panel) {
		panel = vscode.window.createWebviewPanel(
			'preview',
			'Preview',
			vscode.ViewColumn.Two,
			{}
		);

    panel.onDidDispose(() => {
      panel = null;
    });
	}

	panel.webview.html = htmlContent;
}
