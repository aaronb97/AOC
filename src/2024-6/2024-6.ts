import { ints, stringTo2DArray } from "../helpers";
import { logResult } from "../logResult";

export function part1(input: string) {
  const grid = stringTo2DArray(input);

  function findStart() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "^") {
          return [i, j];
        }
      }
    }

    throw new Error();
  }

  const start = findStart();

  let currentDir = 0;
  const visitedSet = new Set<string>();

  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let coords = start;

  while (true) {
    visitedSet.add(`${coords[0]},${coords[1]}`);

    const nextCoords = [
      coords[0] + dirs[currentDir][0],
      coords[1] + dirs[currentDir][1],
    ];

    const next = grid[nextCoords[0]]?.[nextCoords[1]];

    if (next === undefined) {
      return visitedSet.size;
    }

    if (next === "#") {
      currentDir = (currentDir + 1) % 4;
    } else {
      coords = nextCoords;
    }
  }
}

export function part2(input: string) {
  const grid = stringTo2DArray(input);

  function getVisitedSet() {
    const start = findStart();

    let currentDir = 0;
    const visitedSet = new Set<string>();

    const dirs = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    let coords = start;

    while (true) {
      visitedSet.add(`${coords[0]},${coords[1]}`);

      const nextCoords = [
        coords[0] + dirs[currentDir][0],
        coords[1] + dirs[currentDir][1],
      ];

      const next = grid[nextCoords[0]]?.[nextCoords[1]];

      if (next === undefined) {
        return visitedSet;
      }

      if (next === "#") {
        currentDir = (currentDir + 1) % 4;
      } else {
        coords = nextCoords;
      }
    }
  }

  const visitedSet = getVisitedSet();

  function findStart() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "^") {
          return [i, j];
        }
      }
    }

    throw new Error();
  }

  function traverse(grid: string[][]) {
    const start = findStart();

    let currentDir = 0;

    const dirs = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    let coords = start;

    const visitedMap: Record<string, number[]> = {};

    while (true) {
      const key = `${coords[0]},${coords[1]}`;
      if (!visitedMap[key]) visitedMap[key] = [];

      if (visitedMap[key].includes(currentDir)) {
        return true;
      }

      visitedMap[key].push(currentDir);

      const nextCoords = [
        coords[0] + dirs[currentDir][0],
        coords[1] + dirs[currentDir][1],
      ];

      const next = grid[nextCoords[0]]?.[nextCoords[1]];

      if (next === undefined) {
        return false;
      }

      if (next === "#") {
        currentDir = (currentDir + 1) % 4;
      } else {
        coords = nextCoords;
      }
    }
  }

  function tryTraverse(i: number, j: number) {
    if (!visitedSet.has(`${i},${j}`)) return false;
    if (grid[i][j] !== ".") return false;

    grid[i][j] = "#";

    let found = false;
    if (traverse(grid)) {
      found = true;
    }

    grid[i][j] = ".";

    return found;
  }

  let blocks = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (tryTraverse(i, j)) {
        blocks++;
      }
    }
  }

  return blocks;
}
