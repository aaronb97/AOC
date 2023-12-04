import { DIAG_DIRS, ints, isNumber } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const grid = input.split("\n");

  let sum = 0;

  function isPart(xStart: number, xEnd: number, y: number) {
    for (let x = xStart; x <= xEnd; x++) {
      for (const dir of DIAG_DIRS) {
        const char = grid[y + dir[0]]?.[x + dir[1]];
        if (char && char !== "." && !isNumber(char)) {
          return true;
        }
      }
    }

    return false;
  }

  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (isNumber(line[j]) && !isNumber(line[j - 1])) {
        const num = parseInt(line.substring(j));
        if (isPart(j, j + String(num).length - 1, i)) {
          sum += num;
        }
      }
    }
  }

  return sum;
}

function part2(input: string) {
  const grid = input.split("\n");
  const gearDict: Record<string, number[]> = {};

  let sum = 0;

  function getGears(xStart: number, xEnd: number, y: number, num: number) {
    for (let x = xStart; x <= xEnd; x++) {
      for (const dir of DIAG_DIRS) {
        const charY = y + dir[0];
        const charX = x + dir[1];
        const char = grid[charY]?.[charX];
        if (char && char !== "." && !isNumber(char)) {
          const key = `${charY},${charX}`;
          if (!gearDict[key]) gearDict[key] = [];

          if (!gearDict[key].includes(num)) {
            gearDict[key].push(num);
          }
        }
      }
    }

    return false;
  }

  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (isNumber(line[j]) && !isNumber(line[j - 1])) {
        const num = parseInt(line.substring(j));
        getGears(j, j + String(num).length - 1, i, num);
      }
    }
  }

  for (const values of Object.values(gearDict)) {
    if (values.length === 2) {
      sum += values[0] * values[1];
    }
  }

  return sum;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
