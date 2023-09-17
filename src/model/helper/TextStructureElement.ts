export default class TextStructureElement {
  type: TextStructureElementType;
  contents: string[];

  constructor(type: TextStructureElementType, text?: string) {
    this.type = type;
    this.contents = text ? [text] : [];
  }

  append(text: string) {
    this.contents.push(text);
  }

  isParagraph(): boolean {
    return this.type === TextStructureElementType.P;
  }

  countSentences(): number {
    return this.contents.length;
  }

  countCharacters(): number {
    return this.contents.reduce((acc, s) => acc + s.length, 0);
  }
}

export enum TextStructureElementType {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BR = 'br',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  H1 = 'h1',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  H2 = 'h2',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  H3 = 'h3',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  H4 = 'h4',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  H5 = 'h5',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  H6 = 'h6',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HR = 'hr',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  P = 'p',
}
