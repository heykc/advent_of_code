import { import_file } from '../utils.mjs';

const data = import_file('./02.txt');
const color_maxes = {
  red: 12,
  green: 13,
  blue: 14,
};
const test = 'Game 511: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
const id_regex = new RegExp(/Game (\d+): /, 'd');

const parse_id = (line) => {
  const { 1: id, indices: [ [ , after_match ] ] } = id_regex.exec(line);
  const game = line.substring(after_match);

  return { id, game };
};

const get_max_values = (game) => game
  .replaceAll(';', ',')
  .split`,`
  .reduce((acc, cur) => {
    const [amt, color] = cur.trim().split(' ');
    acc[color] = Math.max(+amt, acc[color] ?? 0);
    return acc;
  }, {});

const check_impossible_values = (line) => {
  const { id, game } = parse_id(line);
  const max_color_values = get_max_values(game);
  const has_impossible_value = Object
    .entries(max_color_values)
    .some(([color, amt]) => color_maxes[color] < amt)
  
  return has_impossible_value
    ? 0
    : +id;
};

const pow_of_max_values = (line) => {
  const { id, game } = parse_id(line);
  const max_color_values = get_max_values(game);
  return Object.values(max_color_values).reduce((acc, val) => acc * val, 1);
}

const parse_input = (input, fn) => {
  const lines = input.split('\n');
  return lines.reduce((acc, line) => acc + fn(line), 0);
};

console.log(parse_input(data, check_impossible_values));
console.log(parse_input(data, pow_of_max_values));
