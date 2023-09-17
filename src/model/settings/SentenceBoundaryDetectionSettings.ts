export default SentenceBoundaryDetectionSettings;

export const defaultSentenceBoundaryDetectionSettings: SentenceBoundaryDetectionSettings = {
  halfwidthDotSpace: true,
  halfwidthDotDoubleQuotationSpace: true,
  halfwidthDotSingleQuotationSpace: true,
  fullwidthDot: true,
  fullwidthSmallCircle: true,
};

type SentenceBoundaryDetectionSettings = {
  halfwidthDotSpace: boolean
  halfwidthDotDoubleQuotationSpace: boolean
  halfwidthDotSingleQuotationSpace: boolean
  fullwidthDot: boolean
  fullwidthSmallCircle: boolean
};

