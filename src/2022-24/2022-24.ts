import { inRange, last } from "../helpers";
import { logResult } from "../logResult";

const X = 0,
  Y = 1;

type Key = `${string},${string}`;

const toKey = (x: number, y: number): Key => {
  return `${x},${y}`;
};

const fromKey = (key: Key) => {
  return key.split(",").map((x) => Number(x));
};

const charToKey = (char: string) => {
  switch (char) {
    case "#":
      return "wall";
    case ">":
      return "right";
    case "<":
      return "left";
    case "^":
      return "up";
    case "v":
      return "down";
    default:
      return undefined;
  }
};

type DirKey = "wall" | "up" | "down" | "left" | "right";

export type Grid = Record<Key, Partial<Record<DirKey, boolean>>>;

// export function nextCoord(coord: [number, number], height: number, width: number) {

// }

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0, 0],
];

export function processGrid(grid: Grid, height: number, width: number) {
  const newGrid: Grid = {};

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      newGrid[toKey(i, j)] = {};

      if (grid[toKey(i, j)]?.wall) {
        newGrid[toKey(i, j)].wall = true;
      }
    }
  }

  for (const key of Object.keys(grid) as Key[]) {
    if (!newGrid[key]) {
      newGrid[key] = {};
    }

    const [x, y] = fromKey(key) as [number, number];
    for (const dirKey of Object.keys(grid[key]!) as DirKey[]) {
      if (dirKey === "right") {
        if (x >= width - 2) {
          newGrid[toKey(1, y)].right = true;
        } else {
          newGrid[toKey(x + 1, y)].right = true;
        }
      } else if (dirKey === "left") {
        if (x <= 1) {
          newGrid[toKey(width - 2, y)].left = true;
        } else {
          newGrid[toKey(x - 1, y)].left = true;
        }
      } else if (dirKey === "up") {
        newGrid[toKey(x, y <= 1 ? height - 2 : y - 1)].up = true;
      } else if (dirKey === "down") {
        newGrid[toKey(x, y >= height - 2 ? 1 : y + 1)].down = true;
      }
    }
  }

  return newGrid;
}

function printGrid(grid: Grid, width: number, height: number) {
  let output = "";
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const key = toKey(j, i);
      const cell = grid[key];
      if (cell.wall) {
        output += "#";
        continue;
      }

      const keys = Object.keys(cell);
      if (keys.length > 1) {
        output += keys.length;
        continue;
      }

      if (cell.down) {
        output += "V";
      } else if (cell.up) {
        output += "^";
      } else if (cell.right) {
        output += ">";
      } else if (cell.left) {
        output += "<";
      } else {
        output += ".";
      }
    }

    output += "\n";
  }

  console.log(output);
}

const toLoopKey = (loop: number, x: number, y: number) => {
  return `${loop},${x},${y}`;
};

function part1(input: string) {
  const split = input.split("\n");
  const queue = [[1, 0]];
  const end = [last(split).indexOf("."), split.length];
  const height = split.length,
    width = split[0].trim()!.length;

  const loopMod = (height - 2) * (width - 2);
  const visitedSet = new Set();
  let grid: Grid = {};

  for (let i = 0; i < split.length; i++) {
    const line = split[i] as string;
    for (let j = 0; j < line.length; j++) {
      const char = line[j] as string;
      const key = charToKey(char);
      if (key) {
        if (!grid[toKey(j, i)]) {
          grid[toKey(j, i)] = {};
        }

        grid[toKey(j, i)]![key] = true;
      } else {
        grid[toKey(j, i)] = {};
      }
    }
  }

  let loop = 0;

  // printGrid(grid, width, height);

  while (true) {
    const length = queue.length;
    grid = processGrid(grid, height, width);

    for (let i = 0; i < length; i++) {
      const el = queue.shift() as number[];

      const loopKey = toLoopKey(loop % loopMod, el[X], el[Y]);
      if (visitedSet.has(loopKey)) {
        continue;
      } else {
        visitedSet.add(loopKey);
      }

      for (const dir of dirs) {
        const newEl = [el[X] + dir[X], el[Y] + dir[Y]];
        if (newEl[X] === end[X] && newEl[Y] === end[Y]) return loop;

        if (
          inRange(newEl[X], 0, width - 1) &&
          inRange(newEl[Y], 0, height - 1) &&
          !Object.values(grid[toKey(newEl[X], newEl[Y])]).some(
            (x) => x === true
          )
        ) {
          queue.push(newEl);
        }
      }
    }

    loop++;

    // printGrid(grid, width, height);
  }
}

function calculate(
  split: string[],
  initialGrid?: Grid,
  shouldSwitch?: boolean
) {
  const queue = !shouldSwitch
    ? [[1, 0]]
    : [[last(split).indexOf("."), split.length]];
  const end = !shouldSwitch ? [last(split).indexOf("."), split.length] : [1, 0];
  const height = split.length,
    width = split[0].trim()!.length;

  const loopMod = (height - 2) * (width - 2);
  const visitedSet = new Set();
  let grid: Grid = {};

  if (initialGrid) {
    grid = initialGrid;
  } else {
    for (let i = 0; i < split.length; i++) {
      const line = split[i] as string;
      for (let j = 0; j < line.length; j++) {
        const char = line[j] as string;
        const key = charToKey(char);
        if (key) {
          if (!grid[toKey(j, i)]) {
            grid[toKey(j, i)] = {};
          }

          grid[toKey(j, i)]![key] = true;
        } else {
          grid[toKey(j, i)] = {};
        }
      }
    }
  }

  let loop = 0;

  // printGrid(grid, width, height);

  while (true) {
    const length = queue.length;
    grid = processGrid(grid, height, width);

    for (let i = 0; i < length; i++) {
      const el = queue.shift() as number[];

      const loopKey = toLoopKey(loop % loopMod, el[X], el[Y]);
      if (visitedSet.has(loopKey)) {
        continue;
      } else {
        visitedSet.add(loopKey);
      }

      for (const dir of dirs) {
        const newEl = [el[X] + dir[X], el[Y] + dir[Y]];
        if (newEl[X] === end[X] && newEl[Y] === end[Y]) return { loop, grid };

        if (
          inRange(newEl[X], 0, width - 1) &&
          inRange(newEl[Y], 0, height - 1) &&
          !Object.values(grid[toKey(newEl[X], newEl[Y])]).some(
            (x) => x === true
          )
        ) {
          queue.push(newEl);
        }
      }
    }

    loop++;

    // printGrid(grid, width, height);
  }
}

function part2(input: string) {
  const split = input.split("\n");
  const { grid: gridPart1, loop: loopPart1 } = calculate(split);
  const { grid: gridPart2, loop: loopPart2 } = calculate(
    split,
    gridPart1,
    true
  );
  return calculate(split, gridPart2).loop + loopPart1 + loopPart2 + 2;
}

export default function main() {
  // logResult("Test", __dirname + "/testInput2.txt", part1);
  logResult("Main", __dirname + "/input.txt", part2);
  // logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
