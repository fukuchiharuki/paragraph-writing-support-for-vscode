import lineToSentences from "./lineToSentences";
import textToLines from "./textToLines";

export default function textToFormatted(text: string): string {
  return textToLines(text).flatMap(lineToSentences).join("\n");
}
