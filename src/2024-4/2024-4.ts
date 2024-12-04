import { DIAG_DIRS, DIAG_DIRS_ONLY, stringTo2DArray } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const grid = stringTo2DArray(input);

  const word = "XMAS";
  let count = 0;

  function recurse(i: number, j: number, index: number, dir: number[]) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
      return;
    }

    if (word[index] === grid[i][j] && index === word.length - 1) {
      count++;
      return;
    }

    if (grid[i][j] !== word[index]) {
      return;
    }

    recurse(i + dir[0], j + dir[1], index + 1, dir);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      for (const dir of DIAG_DIRS) {
        recurse(i, j, 0, dir);
      }
    }
  }

  return count;
}

function part2(input: string) {
  const grid = stringTo2DArray(input);

  let count = 0;
  const word = ["M", "S"];

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] === "A") {
        const letters = [
          [grid[i + 1][j - 1], grid[i - 1][j + 1]],
          [grid[i + 1][j + 1], grid[i - 1][j - 1]],
        ];

        if (
          letters.every((subLetters) =>
            word.every((char) => subLetters.includes(char))
          )
        ) {
          console.log(i, j, letters);
          count++;
        }
      }
    }
  }

  return count;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
