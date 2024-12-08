//https://adventofcode.com/2024/day/8
import { ints, printGrid, stringTo2DArray } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const grid = stringTo2DArray(input);
  const ants: Record<string, [number, number][]> = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const char = grid[i][j];
      if (char !== ".") {
        if (!ants[char]) {
          ants[char] = [];
        }

        ants[char].push([i, j]);
      }
    }
  }

  const antiNodes = new Set<string>();

  for (const keyAnts of Object.values(ants)) {
    for (let i = 0; i < keyAnts.length - 1; i++) {
      for (let j = i + 1; j < keyAnts.length; j++) {
        const keyAnt1 = keyAnts[i];
        const keyAnt2 = keyAnts[j];

        const xDiff = keyAnt1[0] - keyAnt2[0];
        const yDiff = keyAnt1[1] - keyAnt2[1];

        const results = [
          [keyAnt1[0] + xDiff, keyAnt1[1] + yDiff],
          [keyAnt2[0] - xDiff, keyAnt2[1] - yDiff],
        ];

        for (const result of results) {
          if (
            result[0] >= 0 &&
            result[0] < grid.length &&
            result[1] >= 0 &&
            result[1] < grid[0].length
          ) {
            antiNodes.add(`${result[0]},${result[1]}`);
          }
        }
      }
    }
  }

  for (const key of antiNodes) {
    const coords = ints(key);
    if (grid[coords[0]][coords[1]] === ".") {
      grid[coords[0]][coords[1]] = "#";
    }
  }

  return antiNodes.size;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const grid = stringTo2DArray(input);
  const ants: Record<string, [number, number][]> = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const char = grid[i][j];
      if (char !== ".") {
        if (!ants[char]) {
          ants[char] = [];
        }

        ants[char].push([i, j]);
      }
    }
  }

  const antiNodes = new Set<string>();

  for (const keyAnts of Object.values(ants)) {
    for (let i = 0; i < keyAnts.length - 1; i++) {
      for (let j = i + 1; j < keyAnts.length; j++) {
        const keyAnt1 = keyAnts[i];
        const keyAnt2 = keyAnts[j];

        const xDiff = keyAnt1[0] - keyAnt2[0];
        const yDiff = keyAnt1[1] - keyAnt2[1];

        let mult = 0;

        while (true) {
          const results = [
            [keyAnt1[0] + xDiff * mult, keyAnt1[1] + yDiff * mult],
            [keyAnt2[0] - xDiff * mult, keyAnt2[1] - yDiff * mult],
          ];

          let found = false;

          for (const result of results) {
            if (
              result[0] >= 0 &&
              result[0] < grid.length &&
              result[1] >= 0 &&
              result[1] < grid[0].length
            ) {
              antiNodes.add(`${result[0]},${result[1]}`);
              found = true;
            }
          }

          if (found) {
            mult++;
          } else {
            break;
          }
        }
      }
    }
  }

  for (const key of antiNodes) {
    const coords = ints(key);
    if (grid[coords[0]][coords[1]] === ".") {
      grid[coords[0]][coords[1]] = "#";
    }
  }

  printGrid(grid);

  return antiNodes.size;
}
