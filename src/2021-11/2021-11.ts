import { DIAG_DIRS, ints, stringTo2DArray } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const grid = stringTo2DArray(input, (c) => Number(c));
  let flashCount = 0;

  function flash([i, j]: number[]) {
    flashCount++;
    for (const dir of DIAG_DIRS) {
      const di = i + dir[0];
      const dj = j + dir[1];
      if (grid[di]?.[dj] !== undefined) {
        grid[di][dj]++;
        if (grid[di][dj] === 10) {
          flash([di, dj]);
        }
      }
    }
  }

  for (let x = 0; x < 100; x++) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j]++;
        if (grid[i][j] === 10) {
          flash([i, j]);
        }
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] > 9) {
          grid[i][j] = 0;
        }
      }
    }
  }

  return flashCount;
}

function all0(grid: number[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== 0) return false;
    }
  }

  return true;
}

function part2(input: string) {
  const grid = stringTo2DArray(input, (c) => Number(c));
  let flashCount = 0;

  function flash([i, j]: number[]) {
    flashCount++;
    for (const dir of DIAG_DIRS) {
      const di = i + dir[0];
      const dj = j + dir[1];
      if (grid[di]?.[dj] !== undefined) {
        grid[di][dj]++;
        if (grid[di][dj] === 10) {
          flash([di, dj]);
        }
      }
    }
  }

  for (let x = 0; x < 1000; x++) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j]++;
        if (grid[i][j] === 10) {
          flash([i, j]);
        }
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] > 9) {
          grid[i][j] = 0;
        }
      }
    }

    if (all0(grid)) return x + 1;
  }
}

export default function main() {
  logResult("Test part 1", __dirname + "/testInput.txt", part1);
  logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
