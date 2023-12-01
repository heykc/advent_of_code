const string = require('./01_a.txt').toString();

function first_last_digits(line) {
  const num_chars = line.replace(/[^0-9]/g, '');
  return +`${num_chars.at(0)}${num_chars.at(-1)}`;
}

function parse_lines(input) {
  const lines = input.split`/n`;
  return lines.reduce((total, line) => total + first_last_digits(line))
}

console.log(parse_lines(string));