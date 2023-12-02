import { import_file } from '../utils.mjs';

const data = import_file('./02.txt');
const color_maxes = {
  red: 12,
  green: 13,
  blue: 14,
};
const id_regex = new RegExp(/Game (\d+): /, 'd');

/**
 * Separate the ID from the game results string.
 *
 * @param {string} line - The whole line representing both the game id and rounds played.
 * @returns {object} The id and the collection of rounds as 2 separate strings.
 */
const parse_id = (line) => {
  const { 1: id, indices: [ [ , after_match ] ] } = id_regex.exec(line);
  const game = line.substring(after_match);

  return { id, game };
};

/**
 * Take each game and find the highest number of cubes pulled per color for the entire game of rounds.
 * Rounds don't actually matter, so remove the semicolon to make a flat list of colors and their values.
 *
 * @param {string} game - the results of cubes pulled per round in a game.
 * @returns {object} { red: ##, green: ##, blue: ## } where ## is the maximum value for each.
 */
const get_max_values = (game) => game
  .replaceAll(';', ',')
  .split`,`
  .reduce((acc, cur) => {
    const [amt, color] = cur.trim().split(' ');
    acc[color] = Math.max(+amt, acc[color] ?? 0);
    return acc;
  }, {});

/**
 * Compare each maximum value of cubes pulled per color for a game and see
 * if that value is greater than the color_maxes defined by the prompt.
 *
 * @param {string} line - A single game of cubes pulled split in rounds, prefixed with a game id.
 * @returns {number} 0 if any color exceeds the max defined by the prompt, otherwise returns id number.
 */
const check_impossible_values = (line) => {
  const { id, game } = parse_id(line);
  const max_color_values = get_max_values(game);
  const has_impossible_value = Object
    .entries(max_color_values)
    .some(([color, amt]) => color_maxes[color] < amt);
  
  return has_impossible_value
    ? 0
    : +id;
};

/**
 * Multiplies all the highest numbers of cubes pulled per game together.
 *
 * @param {string} line - A single game of cubes pulled split in rounds, prefixed with a game id. 
 * @returns {number} all the cube values multiplied together
 */
const pow_of_max_values = (line) => {
  const { id, game } = parse_id(line);
  const max_color_values = get_max_values(game);
  return Object.values(max_color_values).reduce((acc, val) => acc * val, 1);
}

/**
 * Split the multiline input into separate lines, then add each line together based on
 * the provided function.
 *
 * @param {string} input - The multiline input to add together.
 * @param {Function} fn - The function to parse a line into a number.
 * @returns {number} The total value of all lines added together.
 */
const parse_input = (input, fn) => {
  const lines = input.split('\n');
  return lines.reduce((acc, line) => acc + fn(line), 0);
};

console.log(parse_input(data, check_impossible_values));
console.log(parse_input(data, pow_of_max_values));
