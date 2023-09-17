import convertToTextStructureElements from "./convertToTextStructureElements";
import { TextStructureElementType } from "./helper/TextStructureElement";
import TextStructureElement from './helper/TextStructureElement';
import style from "./style.css";

export default function convertToHtml(text: string): string {
  const structure = convertToTextStructureElements(text);
  const content = structure.map((element) => {
    switch (element.type) {
      case TextStructureElementType.P: return elementP(element);
      case TextStructureElementType.H1: return elementH(element, 1);
      case TextStructureElementType.H2: return elementH(element, 2);
      case TextStructureElementType.H3: return elementH(element, 3);
      case TextStructureElementType.H4: return elementH(element, 4);
      case TextStructureElementType.H5: return elementH(element, 5);
      case TextStructureElementType.H6: return elementH(element, 6);
      case TextStructureElementType.HR: return elementHR();
      default: return '';
    }
  }).join('');
	const convertedHTML = `
    <html>
      <head><style type="text/css">${style}</style></head>
      <body>${content}</body>
    </html>
  `;
	return convertedHTML;
}

function elementP(element: TextStructureElement) {
  const sentences = element.contents.map((sentence) =>
    `<span class="${sentenceClasses(sentence).join(' ')}">${sentence}</span>`
  ).join('');
  return `<p>${sentences}</p>`;
}

function sentenceClasses(s: string) {
  return [
    'sentence',
    s[s.length - 1].match(/[ -~]/) ? 'sentence--half-width' : 'sentence--full-width'
  ];
}

function elementH(element: TextStructureElement, h: number) {
  return `<h${h}>${element.contents[0]}</h${h}>`;
}

function elementHR() {
  return '<hr />';
}
