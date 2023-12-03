const test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

const num_regex = /\d+/gd;
const symbols_regex = /[^\w\d.]/;
const get_line_length = (input) => input.match(/\n/d).indices[0][0];
const flatten_input = (input) => input.replaceAll('\n', '');

const parse_input = (input) => {
  const line_length = get_line_length(input);
  const flat_line = flatten_input(input);
  const all_nums = flat_line.matchAll(num_regex);
  let result = 0;

  for (const match of all_nums) {
    const [start, end] = match.indices[0];
    const line_start = start - (start % line_length);
    const line_end = line_start + line_length;
    const mid_start = Math.max(start - 1, line_start);
    const mid_end = Math.min(end + 1, line_end);
    const top_start = Math.max(mid_start - line_length, line_start - line_length);
    const top_end = Math.min(mid_end - line_length, line_end - line_length);
    const bot_start = Math.max(mid_start + line_length, line_start + line_length);
    const bot_end = Math.min(mid_end + line_length, line_end + line_length);

    const text_box = flat_line.substring(top_start, top_end)
      + flat_line.substring(mid_start, mid_end)
      + flat_line.substring(bot_start, bot_end);

    if (symbols_regex.exec(text_box)) result += +match[0];
  }

  console.log(result);
}

parse_input(test)
