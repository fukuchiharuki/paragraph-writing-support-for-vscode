import * as vscode from 'vscode';
import updatePreview from './presentation/updatePreview';
import debounce from './presentation/debounce';
import { PreviewStyle } from './presentation/convertToHtml';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  let previewStyle: PreviewStyle;

  const disposables = [
    // on command call (preview)
    vscode.commands.registerCommand('paragraph-writing-support.preview', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        previewStyle = PreviewStyle.TOPIC_SENTENCE_HIGHLIGHTS;
        updatePreview(document, previewStyle);
      }
    }),

    // on command call (topic sentences)
    vscode.commands.registerCommand('paragraph-writing-support.topic-sentences', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        previewStyle = PreviewStyle.BULLETED_TOPIC_SENTENCES;
        updatePreview(document, previewStyle);
      }
    })
  ];

	// on text change
	vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;
		if (editor && event.document === editor.document) {
			debounce(() => {
				updatePreview(event.document, previewStyle);
			});
		}
	});

  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

// This method is called when your extension is deactivated
export function deactivate() {}
