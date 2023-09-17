import convertToTextStructureElements from "../model/convertToTextStructureElements";
import style from "../model/style.css";
import convertToPreviewContent from "./convertToPreviewContent";

export default function convertToHtml(
  text: string,
  previewStyle: PreviewStyle
): string {
  const structure = convertToTextStructureElements(text);
  const content = convertToPreviewContent(structure);
	const convertedHTML = `
    <html>
      <head><style type="text/css">${style}</style></head>
      <body class="${previewStyle}">${content}</body>
    </html>
  `;
	return convertedHTML;
}

export enum PreviewStyle {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TOPIC_SENTENCE_HIGHLIGHTS = 'topic-sentence-highlights',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BULLETED_TOPIC_SENTENCES = 'bulleted-topic-sentences',
};
