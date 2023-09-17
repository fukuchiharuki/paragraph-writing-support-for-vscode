const style = `
body {
  font-size: large;
}

.topic-sentence-highlights p {
  text-indent: 1em;
}

.topic-sentence-highlights .sentence:first-child {
  font-weight: bold;
}

.topic-sentence-highlights .sentence--half-width+.sentence::before {
  content: ' ';
}

.bulleted-topic-sentences p {
  display: list-item;
  list-style: inside;
  padding-left: 1em;
  text-indent: -1em;
}

.bulleted-topic-sentences .sentence:not(:first-child) {
  display: none;
}
`;

export default style;
