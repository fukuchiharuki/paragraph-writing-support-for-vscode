import LineDetectionSettings from "../settings/LineDetectionSettings";
import { TextStructureElementType } from "./TextStructureElement";

export default class TextLineDetection {
  type: TextStructureElementType;
  text?: string;

  constructor(
    type: TextStructureElementType,
    text?: string
  ) {
    this.type = type;
    this.text = text;
  }

  static config(settings: LineDetectionSettings): TextLineDetectionExecutor {
    return new TextLineDetectionExecutor(settings);
  }

  isLineBreak(): boolean {
    return this.type === TextStructureElementType.BR;
  }

  isSingleLineComposition(): boolean {
    switch (this.type) {
      case TextStructureElementType.H1:
      case TextStructureElementType.H2:
      case TextStructureElementType.H3:
      case TextStructureElementType.H4:
      case TextStructureElementType.H5:
      case TextStructureElementType.H6:
      case TextStructureElementType.HR:
        return true;
      default:
        return false;
    }
  }

  isParagraphingComposition(): boolean {
    return !this.isLineBreak() && !this.isSingleLineComposition();
  }
}

class TextLineDetectionExecutor {
  settings: LineDetectionSettings;

  constructor(settings: LineDetectionSettings) {
    this.settings = settings;
  }

  detect(line: string): TextLineDetection {
    return this.detectHeadline(line)
      || this.detectHorizon(line)
      || this.detectLineBreak(line)
      || new TextLineDetection(TextStructureElementType.P, line);
  }

  private detectHeadline(line: string): TextLineDetection | null {
    if (this.settings.latexStyle) {
      if (line.match(/^[\\¥]part\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H1, line.replace(/^[\\¥]part\*?{(.*)}$/, '$1'));}
      if (line.match(/^[\\¥]chapter\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H1, line.replace(/^[\\¥]chapter\*?{(.*)}$/, '$1'));}
      if (line.match(/^[\\¥]section\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H2, line.replace(/^[\\¥]section\*?{(.*)}$/, '$1'));}
      if (line.match(/^[\\¥]subsection\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H3, line.replace(/^[\\¥]subsection\*?{(.*)}$/, '$1'));}
      if (line.match(/^[\\¥]subsubsection\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H4, line.replace(/^[\\¥]subsubsection\*?{(.*)}$/, '$1'));}
      if (line.match(/^[\\¥]paragraph\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H5, line.replace(/^[\\¥]paragraph\*?{(.*)}$/, '$1'));}
      if (line.match(/^[\\¥]subparagraph\*?{.*}$/))
        {return new TextLineDetection(TextStructureElementType.H6, line.replace(/^[\\¥]subparagraph\*?{(.*)}$/, '$1'));}
    }
    if (this.settings.markdonwStyle) {
      if (line.match(/^#{1} /)) {return new TextLineDetection(TextStructureElementType.H1, line.substring(2));}
      if (line.match(/^#{2} /)) {return new TextLineDetection(TextStructureElementType.H2, line.substring(3));}
      if (line.match(/^#{3} /)) {return new TextLineDetection(TextStructureElementType.H3, line.substring(4));}
      if (line.match(/^#{4} /)) {return new TextLineDetection(TextStructureElementType.H4, line.substring(5));}
      if (line.match(/^#{5} /)) {return new TextLineDetection(TextStructureElementType.H5, line.substring(6));}
      if (line.match(/^#{6} /)) {return new TextLineDetection(TextStructureElementType.H6, line.substring(7));}
    }
    return null;
  }

  private detectHorizon(line: string): TextLineDetection | null {
    if (this.settings.latexStyle) {
      if (line.match(/[\\¥]hrulefill/)) {return new TextLineDetection(TextStructureElementType.HR);}
      if (line.match(/[\\¥]dotfill/)) {return new TextLineDetection(TextStructureElementType.HR);}
    }
    if (this.settings.markdonwStyle) {
      if (line.match(/^\*\*\*/)) {return new TextLineDetection(TextStructureElementType.HR);}
      if (line.match(/^---/)) {return new TextLineDetection(TextStructureElementType.HR);}
      if (line.match(/^___/)) {return new TextLineDetection(TextStructureElementType.HR);}
      if (line.match(/^\* \* \*/)) {return new TextLineDetection(TextStructureElementType.HR);}
      if (line.match(/^- - -/)) {return new TextLineDetection(TextStructureElementType.HR);}
      if (line.match(/^_ _ _/)) {return new TextLineDetection(TextStructureElementType.HR);}
    }
    return null;
  }

  private detectLineBreak(line: string): TextLineDetection | null {
    if (line.trim().length === 0) {return new TextLineDetection(TextStructureElementType.BR);}
    return null;
  }
}
