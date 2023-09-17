const style = `
body {
  font-size: large;
}

p {
  text-indent: 1em;
}

.sentence:first-child {
  font-weight: bold;
}

.sentence--half-width+.sentence::before {
  content: ' ';
}
`;

export default style;
