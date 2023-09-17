import TextLineDetection from "./TextLineDetection";
import TextStructureElement from "./TextStructureElement";

export default class TextStructureStatusAction {
  entry(elements: TextStructureElement[], detection: TextLineDetection) {
    const { type, text } = detection;
    if (!detection.isLineBreak()) {
      elements.push(new TextStructureElement(type, text));
    }
  }

  do(elements: TextStructureElement[], detection: TextLineDetection) {
    const { type, text } = detection;
    if (detection.isSingleLineComposition()) {
      elements.push(new TextStructureElement(type, text));
    }
    if (detection.isParagraphingComposition()) {
      elements[elements.length - 1].append(text || '');
    }
  }
}
