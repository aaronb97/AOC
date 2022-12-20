import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  const set = new Set<string>();

  const cubes = split.map((x) => ints(x));
  cubes.forEach((cube) => set.add(`${cube[0]},${cube[1]},${cube[2]}`));

  let sum = 0;
  const sides = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  for (const cube of cubes) {
    for (const side of sides) {
      if (
        !set.has(
          `${cube[0] + side[0]},${cube[1] + side[1]},${cube[2] + side[2]}`
        )
      ) {
        sum++;
      }
    }
  }

  return sum;
}

function part2(input: string) {
  const split = input.split("\n");
  const set = new Set<string>();
  const visitedSet = new Set<string>();

  const cubes = split.map((x) => ints(x));
  cubes.forEach((cube) => set.add(`${cube[0]},${cube[1]},${cube[2]}`));

  let sum = 0;
  const sides = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  const max = Math.max(...ints(input)) + 1;

  const queue = [[max, max, max]];

  while (queue.length) {
    const q = queue.shift() as [number, number, number];
    for (const side of sides) {
      const check = [side[0] + q[0], side[1] + q[1], side[2] + q[2]];
      if (check.some((checkSide) => checkSide > max || checkSide < -1)) {
        continue;
      }

      const checkString = `${check[0]},${check[1]},${check[2]}`;

      if (set.has(checkString)) {
        sum++;
      } else if (!visitedSet.has(checkString)) {
        queue.push(check);
        visitedSet.add(checkString);
      }
    }
  }

  return sum;
}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part2);
  logResult("Main", __dirname + "/input.txt", part2);
  // logResult("Test", __dirname + "/input.txt", part1);
  // logResult("Test", __dirname + "/testInput.txt", part2);
  //   logResult("Main", __dirname + "/input.txt", part2);
}
