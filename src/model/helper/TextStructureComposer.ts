import LineDetectionSettings from "../settings/LineDetectionSettings";
import TextLineDetection from "./TextLineDetection";
import TextStructureElement from "./TextStructureElement";
import TextStructureStatusAction from "./TextStructureStatusAction";

export default class TextStructureComposer {
  settings: LineDetectionSettings;
  status: TextStructureStatus;
  elements: TextStructureElement[];
  action: TextStructureStatusAction;

  constructor(settings: LineDetectionSettings) {
    this.settings = settings;
    this.status = TextStructureStatus.BEGIN;
    this.elements = [];
    this.action = new TextStructureStatusAction();
  }

  compose(line: string) {
    const detection = TextLineDetection.config(this.settings).detect(line);
    const nextStatus = this.nextStatus(detection);
    this.doAction(nextStatus, detection);
    this.status = nextStatus;
  }

  private nextStatus(detection: TextLineDetection): TextStructureStatus {
    return detection.isLineBreak()
      ? TextStructureStatus.BEGIN
      : detection.isSingleLineComposition()
        ? TextStructureStatus.SINGLE_LINE_COMPOSITION
        : TextStructureStatus.PARAGRAPHING_COMPOSITION;
  }

  private doAction(nextStatus: TextStructureStatus, detection: TextLineDetection) {
    if (this.status !== nextStatus)
      {this.action.entry(this.elements, detection);}
    else
      {this.action.do(this.elements, detection);}
  }
}

export enum TextStructureStatus {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BEGIN = 'BEGIN',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SINGLE_LINE_COMPOSITION = 'SINGLE_LINE_COMPOSITION',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PARAGRAPHING_COMPOSITION = 'PARAGRAPHING_COMPOSITION',
}
