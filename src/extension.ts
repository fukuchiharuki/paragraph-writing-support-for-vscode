import * as vscode from 'vscode';
import formatSingleSentenceIntoSingleLine from './command/formatSingleSentenceIntoSingleLine';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  const disposables = [
    vscode.commands.registerCommand(
      "paragraph-writing-support.format-single-sentence-into-single-line",
      formatSingleSentenceIntoSingleLine
    ),
  ];

  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

// This method is called when your extension is deactivated
export function deactivate() {}
