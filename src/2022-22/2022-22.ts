import { inRange, ints, last, mod, range } from "../helpers";
import { logResult } from "../logResult";

const X = 0,
  Y = 1;

export const RIGHT = 0,
  DOWN = 1,
  LEFT = 2,
  UP = 3;

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function part1(input: string) {
  const split = input.split("\n");
  const pos = [split[0].indexOf("."), 0];
  let dirP = 0;

  const grid: string[][] = [];

  for (let i = 0; i < split.length - 2; i++) {
    const line = split[i];
    grid.push(line.split(""));
  }

  const moves = ints(last(split));
  const turns = last(split).match(/[RL]/g) as string[];

  function nextPosition() {
    const dir = dirs[dirP];

    const coords = [pos[X] + dir[X], pos[Y] + dir[Y]];
    const next = grid[coords[Y]]?.[coords[X]];
    if (next === ".") {
      return coords;
    }

    if (next === "#") {
      return false;
    }

    const backCoords = [pos[X], pos[Y]];
    while (
      ![undefined, " "].includes(
        grid[backCoords[Y] - dir[Y]]?.[backCoords[X] - dir[X]]
      )
    ) {
      backCoords[X] -= dir[X];
      backCoords[Y] -= dir[Y];
    }

    if (grid[backCoords[Y]][backCoords[X]] === "#") return false;

    return backCoords;
  }

  function move(a: number) {
    for (let i = 0; i < a; i++) {
      const next = nextPosition();
      if (next) {
        pos[X] = next[X];
        pos[Y] = next[Y];
      } else {
        return;
      }
    }
  }

  let i = 0;
  while (i < turns.length) {
    move(moves[i]);
    if (turns[i] === "R") {
      dirP++;
    } else {
      dirP--;
    }

    dirP = mod(dirP, 4);
    i++;
  }

  move(last(moves));

  return (pos[Y] + 1) * 1000 + (pos[X] + 1) * 4 + dirP;
}

export function nextCoords(
  pos: number[],
  dir: number
): [[number, number], number] {
  //3 to 2
  if (pos[X] === 99 && inRange(pos[Y], 50, 99) && dir === RIGHT) {
    return [[pos[Y] + 50, 49], UP];
  }

  //2 to 3
  if (pos[Y] === 49 && inRange(pos[X], 100, 149) && dir === DOWN) {
    return [[99, pos[X] - 50], LEFT];
  }

  //2 to 5
  if (pos[X] === 149 && inRange(pos[Y], 0, 49) && dir === RIGHT) {
    return [[99, 150 - pos[Y]], LEFT];
  }

  //5 to 2
  if (pos[X] === 99 && inRange(pos[Y], 100, 149) && dir === RIGHT) {
    return [[149, 150 - pos[Y]], LEFT];
  }

  //4 to 3
  if (pos[Y] === 100 && inRange(pos[X], 0, 49) && dir === UP) {
    return [[50, pos[X] + 50], RIGHT];
  }

  //3 to 4
  if (pos[X] === 50 && inRange(pos[Y], 50, 99) && dir === LEFT) {
    return [[pos[Y] - 50, 100], DOWN];
  }

  //6 to 5
  if (pos[X] === 49 && inRange(pos[Y], 150, 199) && dir === RIGHT) {
    return [[pos[Y] - 100, 149], UP];
  }

  //6 to 5
  if (pos[Y] === 149 && inRange(pos[X], 50, 99) && dir === DOWN) {
    return [[49, pos[X] + 100], LEFT];
  }

  //1 to 6
  if (pos[Y] === 0 && inRange(pos[X], 50, 99) && dir === UP) {
    return [[0, 100 + pos[X]], RIGHT];
  }

  //6 to 1
  if (pos[X] === 0 && inRange(pos[Y], 150, 199) && dir === LEFT) {
    return [[pos[Y] - 100, 0], DOWN];
  }

  //6 to 2
  if (pos[Y] === 199 && inRange(pos[X], 0, 49) && dir === DOWN) {
    return [[pos[X] + 100, 0], DOWN];
  }

  //2 to 6
  if (pos[Y] === 0 && inRange(pos[X], 100, 149) && dir === UP) {
    return [[pos[X] - 100, 199], UP];
  }

  //1 to 4
  if (pos[X] === 50 && inRange(pos[Y], 0, 49) && dir === LEFT) {
    return [[0, 150 - pos[Y]], RIGHT];
  }

  //4 to 1
  if (pos[X] === 0 && inRange(pos[Y], 100, 149) && dir === LEFT) {
    return [[50, 150 - pos[Y]], RIGHT];
  }

  return [[pos[X] + dirs[dir][X], pos[Y] + dirs[dir][Y]], dir];
}

function part2(input: string) {
  const split = input.split("\n");
  const pos = [split[0].indexOf("."), 0];
  let dirP = 0;

  const grid: string[][] = [];

  for (let i = 0; i < split.length - 2; i++) {
    const line = split[i];
    grid.push(line.split(""));
  }

  const moves = ints(last(split));
  const turns = last(split).match(/[RL]/g) as string[];

  function move(a: number) {
    for (let i = 0; i < a; i++) {
      const [newCoords, newDir] = nextCoords(pos, dirP);
      if (grid[newCoords[Y]][newCoords[X]] !== "#") {
        pos[X] = newCoords[X];
        pos[Y] = newCoords[Y];
        dirP = newDir;
      } else {
        return;
      }
    }
  }

  let i = 0;
  while (i < turns.length) {
    move(moves[i]);
    if (turns[i] === "R") {
      dirP++;
    } else {
      dirP--;
    }

    dirP = mod(dirP, 4);
    i++;
  }

  move(last(moves));

  return (pos[Y] + 1) * 1000 + (pos[X] + 1) * 4 + dirP;
}

export default function main() {
  // logResult("Test", __dirname + "/testInput.txt", part1);
  // logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  // 116377
  logResult("Test", __dirname + "/input.txt", part2);
}
