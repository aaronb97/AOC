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

function part2(input: string) {
  const grid = stringTo2DArray(input, (c) => Number(c));

  const lows = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const num = grid[i][j];

      const isLow = DIRS.every(
        (dir) => (grid[i + dir[0]]?.[j + dir[1]] ?? 10) > num
      );
      if (isLow) {
        lows.push([i, j]);
      }
    }
  }

  const sizes = lows.map((low) => findBasinSize(grid, low));
  sizes.sort((a, b) => b - a);
  return sizes[0] * sizes[1] * sizes[2];
}

function findBasinSize(grid: number[][], low: number[]) {
  const queue = [low];
  const visited = new Set();

  let size = 0;
  while (queue.length) {
    size++;
    const cell = queue.pop() as number[];

    for (const dir of DIRS) {
      const X = cell[0] + dir[0],
        Y = cell[1] + dir[1];
      const num = grid[X]?.[Y] ?? 10;
      if (
        num > grid[cell[0]][cell[1]] &&
        num < 9 &&
        !visited.has(`${X},${Y}`)
      ) {
        queue.push([X, Y]);
        visited.add(`${X},${Y}`);
      }
    }
  }

  return size;
}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  logResult("Test", __dirname + "/testInput.txt", part2);
  logResult("Main", __dirname + "/input.txt", part2);
}
