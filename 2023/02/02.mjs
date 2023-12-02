import { import_file } from '../utils.mjs';

const data = import_file('./02.txt');
const color_values = {
  red: 12,
  green: 13,
  blue: 14,
};
const test = 'Game 511: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
const id_regex = new RegExp(/Game (\d+): /, 'd');

const parse_line = (line) => {
  const { 1: id, indices: [ [ , after_match ] ] } = id_regex.exec(line);
  const game = line.substring(after_match);

  const amounts_by_color = game
    .replaceAll(';', ',')
    .split`,`
    .reduce((acc, cur) => {
      const [amt, color] = cur.trim().split(' ');
      acc[color] = Math.max(+amt, acc[color] ?? 0);
      return acc;
    }, {});

  if (Object.entries(amounts_by_color).some(([color, amt]) => color_values[color] < amt)) return 0;

  return +id;
}

const parse_input = (input, fn) => {
  const lines = input.split('\n');
  return lines.reduce((acc, line) => acc + parse_line(line), 0);
}

console.log(parse_input(data, parse_line));
