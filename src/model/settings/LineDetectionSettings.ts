export default LineDetectionSettings;

export const defaultLineDetectionSettings: LineDetectionSettings = {
  latexStyle: true,
  markdonwStyle: true,
};

type LineDetectionSettings = {
  latexStyle: boolean
  markdonwStyle: boolean
};
