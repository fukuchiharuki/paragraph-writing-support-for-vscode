import Line from "../data/Line";
import Sentence from "../data/Sentence";

export default function lineToSentences(line: Line): Sentence[] {
  return breakIntoSentences(line)
    .trim()
    .split("\n")
    .map((s) => s.trim());
}

function breakIntoSentences(line: Line): Line {
  return apply(line, breakForEn, breakForJa);
}

function breakForEn(line: Line): Line {
  return (
    line
      // 半角ピリオド
      .replace(/\. /g, ".\n")
      // 半角ピリオドとダブルクォーテーション
      .replace(/\." /g, '."\n')
      // 半角ピリオドとシングルクォーテーション
      .replace(/\.' /g, ".'\n")
      // 半角ピリオドとダブルクォーテーション・シングルクォーテーション
      .replace(/\."' /g, ".\"'\n")
      // 半角ピリオドとシングルクォーテーション・ダブルクォーテーション
      .replace(/\.'" /g, ".'\"\n")
  );
}

function breakForJa(line: Line): Line {
  return (
    line
      // 句点
      .replace(/。/g, "。\n")
      // 全角ピリオド
      .replace(/．/g, "．\n")
  );
}

function apply(line: Line, ...fn: ((line: Line) => Line)[]): Line {
  for (const f of fn) {
    line = f(line);
  }
  return line;
}
