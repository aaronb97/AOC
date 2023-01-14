import { DIRS, ints, stringTo2DArray } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const grid = stringTo2DArray(input, (c) => Number(c));

  let sum = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const num = grid[i][j];

      const isLow = DIRS.every(
        (dir) => (grid[i + dir[0]]?.[j + dir[1]] ?? 10) > num
      );
      if (isLow) {
        sum += num + 1;
      }
    }
  }

  return sum;
}

function part2(input: string) {}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
