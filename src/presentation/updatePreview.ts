import * as vscode from 'vscode';
import convertToHtml, { PreviewStyle } from './convertToHtml';

let panel: vscode.WebviewPanel | null = null;

export default function updatePreview(
	document: vscode.TextDocument,
  previewStyle: PreviewStyle
) {
	const htmlContent = convertToHtml(document.getText(), previewStyle);

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
