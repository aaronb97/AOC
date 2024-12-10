//https://adventofcode.com/2024/day/10
import { DIRS, ints, stringTo2DArray } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const grid = stringTo2DArray(input, (c) => (c === "." ? "." : Number(c)));
  let score = 0;

  const visited = new Set<string>();

  function recurse(i: number, j: number) {
    const current = grid[i][j];
    if (current === ".") {
      return;
    }

    if (current === 9 && !visited.has(`${i},${j}`)) {
      score++;
      visited.add(`${i},${j}`);
      return;
    }

    for (const dir of DIRS) {
      const next = [i + dir[0], j + dir[1]];
      if (grid[next[0]]?.[next[1]] === current + 1) {
        recurse(next[0], next[1]);
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        recurse(i, j);
        visited.clear();
      }
    }
  }

  return score;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const grid = stringTo2DArray(input, (c) => (c === "." ? "." : Number(c)));
  let score = 0;

  function recurse(i: number, j: number) {
    const current = grid[i][j];
    if (current === ".") {
      return;
    }

    if (current === 9) {
      score++;
      return;
    }

    for (const dir of DIRS) {
      const next = [i + dir[0], j + dir[1]];
      if (grid[next[0]]?.[next[1]] === current + 1) {
        recurse(next[0], next[1]);
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        recurse(i, j);
      }
    }
  }

  return score;
}
