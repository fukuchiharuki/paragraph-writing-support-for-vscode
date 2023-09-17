import TextLineDetection from "./helper/TextLineDetection";
import TextStructureComposer from "./helper/TextStructureComposer";
import TextStructureElement from "./helper/TextStructureElement";
import { defaultLineDetectionSettings } from "./settings/LineDetectionSettings";
import { defaultSentenceBoundaryDetectionSettings } from "./settings/SentenceBoundaryDetectionSettings";

export default function convertToTextStructureElements(text: string): TextStructureElement[] {
  const sentenceBoundaryDetectionSettings = defaultSentenceBoundaryDetectionSettings;
  const lineDetectionSettings = defaultLineDetectionSettings;

  const detections = [
    sentenceBoundaryDetectionSettings.halfwidthDotSpace
      ? (text: string) => text.replace(/(\. )/g, '$1\n') : (text: string) => text,
    sentenceBoundaryDetectionSettings.halfwidthDotDoubleQuotationSpace
      ? (text: string) => text.replace(/(\.\" )/g, '$1\n') : (text: string) => text,
    sentenceBoundaryDetectionSettings.halfwidthDotSingleQuotationSpace
      ? (text: string) => text.replace(/(\.\' )/g, '$1\n') : (text: string) => text,
    sentenceBoundaryDetectionSettings.fullwidthDot // NOTE: U+ff0e (full-width dot)
      ? (text: string) => text.replace(/(\uff0e)/g, '$1\n') : (text: string) => text,
    sentenceBoundaryDetectionSettings.fullwidthSmallCircle
      ? (text: string) => text.replace(/(。)/g, '$1\n') : (text: string) => text,
  ];
  const composer = new TextStructureComposer(lineDetectionSettings);
  text
    .trim()
    .replace(/\n\n+/g, '\n\n')
    .split('\n')
    .map((line) => TextLineDetection
      .config(lineDetectionSettings)
      .detect(line)
      .isParagraphingComposition()
      ? detections.reduce((acc, fn) => fn(acc), line)
      : line
    )
    .flatMap((block) => block.trim().split('\n'))
    .map((s) => s.trim())
    .forEach((s) => composer.compose(s));
  return composer.elements;
}
