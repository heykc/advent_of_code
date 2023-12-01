import { import_file } from '../utils.mjs';

const data = import_file('./01_a.txt');

/* -- first challenge -- */

/**
 * Remove all non-digit characters, then combine the first and last characters
 * to form a two digit number.
 *
 * @param {string} line - the line of text to parse
 * @returns {number} a two digit number of the first and last digit in the line.
 */
function first_last_digits(line) {
  const num_chars = line.replace(/\D/g, '');
  return +`${num_chars.at(0)}${num_chars.at(-1)}`;
}

/**
 * Convert input into array of lines, then add each line
 * to itself using a provided function to create a number
 * from each line.
 *
 * @param {string} input - The multiline input to add together.
 * @param {Function} fn - The function to parse a line into a number.
 * @returns {number} The total value of all lines added together.
 */
function add_lines(input, fn) {
  const lines = input.trim().split`\n`;
  return lines.reduce((total, line) => total + fn(line), 0)
}

console.log(add_lines(data, first_last_digits));

/* -- second challenge -- */

const num_map = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};
/** regex for any digit 0-9 or any word number from the array */
const numbers_regex = `[0-9]|${Object.keys(num_map).join('|')}`;
const first_num_regex = new RegExp(numbers_regex);
const last_num_regex = new RegExp(`(.*)(${numbers_regex})`);

/**
 * Get the first and last digit or number word, then combine them into a string
 * before converting the string to a number.
 *
 * @param {string} line - The line to convert to a number
 * @returns {number} The first and last digit in the string converted into a 2 digit number.
 */
function get_line_number(line) {
  // the full match (match[0]) will always be a digit or word
  const first_num = line.match(first_num_regex)[0];
  /**
   * The second capture group (match[2]) will always be
   * the last number, whether digit or word, in a
   * line since we are not using the global (/g) regex option.
   */
  const last_num = line.match(last_num_regex)[2];

  return +`${num_map[first_num] ?? first_num}${num_map[last_num] ?? last_num}`
}

console.log(add_lines(data, get_line_number));

