import Line from "../data/Line";

export default function textToLines(text: string): Line[] {
  return text.split("\n");
}
