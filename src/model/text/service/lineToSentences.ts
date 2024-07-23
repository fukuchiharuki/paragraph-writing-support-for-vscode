import Line from "../data/Line";
import Sentence from "../data/Sentence";

export default function lineToSentences(line: Line): Sentence[] {
  return breakIntoSentences(line)
    .trim()
    .split("\n")
    .map((s) => s.trim());
}

function breakIntoSentences(line: Line): string {
  return line
    .replace(/\. /g, ".\n")
    .replace(/。/g, "。\n")
    .replace(/．/g, "．\n");
}
