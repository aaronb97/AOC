import { ints, last } from "../helpers";
import { logResult } from "../logResult";

const X = 0,
  Y = 1;

function part1(input: string) {
  const split = input.split("\n");
  const pos = [split[0].indexOf("."), 0];
  let dirP = 0;
  const dirs = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];

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
    const next = grid[coords[X]]?.[coords[Y]];
    if (next === ".") {
      return coords;
    }

    if (next === "#") {
      return false;
    }

    const backCoords = [pos[X], pos[Y]];
    while (
      ![undefined, " "].includes(
        grid[backCoords[X] - dir[X]]?.[backCoords[Y] - dir[Y]]
      )
    ) {
      backCoords[X] -= dir[X];
      backCoords[Y] -= dir[Y];
    }

    if (grid[backCoords[X]][backCoords[Y]] === "#") return false;

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

    dirP = dirP % 4;
    i++;
  }

  move(last(moves));

  return (pos[X] + 1) * 1000 + (pos[Y] + 1) * 4 + dirP;
}

function part2(input: string) {}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part1);
  // logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
