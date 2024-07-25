import * as vscode from 'vscode';
import textToFormatted from '../model/text/service/textToFormatted';

export default function formatSingleSentenceIntoSingleLine() {
  // 現在アクティブなテキストエディタを取得
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  // エディタのドキュメントと選択範囲を取得
  let document = editor.document;
  let selection = editor.selection;

  // 選択範囲のテキストを取得
  let text = document.getText(selection);

  // ここでテキストをフォーマット
  let formattedText = textToFormatted(text);

  // フォーマットされたテキストで選択範囲を置き換え
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, formattedText);
  });
}
