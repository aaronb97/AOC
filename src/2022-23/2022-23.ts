import { ints } from "../helpers";
import { logResult } from "../logResult";

const toKey = (i: number, j: number) => {
  return `${i},${j}`;
};

const proposalChecks = [
  [
    //NORTH
    [1, -1],
    [0, -1],
    [-1, -1],
  ],
  [
    //SOUTH
    [1, 1],
    [0, 1],
    [-1, 1],
  ],
  [
    //WEST
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ],
  [
    //EAST
    [1, 0],
    [1, 1],
    [1, -1],
  ],
];

const proposals = [
  [0, -1], //NORTH
  [0, 1], //SOUTH
  [-1, 0], //WEST
  [1, 0], //EAST
];
const X = 0,
  Y = 1;

const printMap = (map: Record<string, boolean>, iMax: number, jMax: number) => {
  let output = "";
  for (let i = 0; i < iMax; i++) {
    for (let j = 0; j < jMax; j++) {
      if (map[toKey(j, i)]) {
        output += "#";
      } else {
        output += ".";
      }
    }
    output += "\n";
  }

  console.log(output);
};

function part1(input: string) {
  const split = input.split("\n");

  const map: Record<string, boolean> = {};
  for (let i = 0; i < split.length; i++) {
    const line = split[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "#") {
        map[toKey(j, i)] = true;
      }
    }
  }

  function findPropIndex(numKey: number[], i: number) {
    let foundAdj = false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        if (map[toKey(numKey[X] + j, numKey[Y] + i)]) {
          foundAdj = true;
        }
      }
    }

    if (!foundAdj) return undefined;

    for (let j = i; j < i + 4; j++) {
      const propIndex = j % 4;

      if (
        proposalChecks[propIndex].every(
          (propCheck) =>
            !map[toKey(numKey[X] + propCheck[X], numKey[Y] + propCheck[Y])]
        )
      ) {
        return propIndex;
      }
    }
  }

  for (let i = 0; i < 10; i++) {
    // printMap(map, 14, 12);

    const proposalMap: Record<string, undefined | false | string> = {};
    for (const key of Object.keys(map)) {
      const numKey = key.split(",").map((x) => Number(x));
      const propIndex = findPropIndex(numKey, i);
      if (propIndex !== undefined) {
        const prop = proposals[propIndex];
        const propKey = toKey(numKey[X] + prop[X], numKey[Y] + prop[Y]);
        if (proposalMap[propKey]) {
          proposalMap[propKey] = false;
        } else if (proposalMap[propKey] === undefined) {
          proposalMap[propKey] = key;
        }
      }
    }

    for (const key of Object.keys(proposalMap)) {
      if (proposalMap[key]) {
        map[key] = true;
        delete map[proposalMap[key] as string];
      }
    }
  }

  // printMap(map, 14, 14);

  let minX = Number.MAX_VALUE,
    minY = Number.MAX_VALUE,
    maxX = Number.MIN_VALUE,
    maxY = Number.MIN_VALUE;

  for (const key of Object.keys(map)) {
    const numKey = key.split(",").map((x) => Number(x));
    minX = Math.min(numKey[X], minX);
    minY = Math.min(numKey[Y], minY);
    maxX = Math.max(numKey[X], maxX);
    maxY = Math.max(numKey[Y], maxY);
  }

  return (maxX - minX + 1) * (maxY - minY + 1) - Object.keys(map).length;
}

function part2(input: string) {
  const split = input.split("\n");

  const map: Record<string, boolean> = {};
  for (let i = 0; i < split.length; i++) {
    const line = split[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "#") {
        map[toKey(j, i)] = true;
      }
    }
  }

  function findPropIndex(numKey: number[], i: number) {
    let foundAdj = false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        if (map[toKey(numKey[X] + j, numKey[Y] + i)]) {
          foundAdj = true;
        }
      }
    }

    if (!foundAdj) return undefined;

    for (let j = i; j < i + 4; j++) {
      const propIndex = j % 4;

      if (
        proposalChecks[propIndex].every(
          (propCheck) =>
            !map[toKey(numKey[X] + propCheck[X], numKey[Y] + propCheck[Y])]
        )
      ) {
        return propIndex;
      }
    }
  }

  let i = 0;
  while (true) {
    // printMap(map, 14, 12);

    const proposalMap: Record<string, undefined | false | string> = {};
    for (const key of Object.keys(map)) {
      const numKey = key.split(",").map((x) => Number(x));
      const propIndex = findPropIndex(numKey, i);
      if (propIndex !== undefined) {
        const prop = proposals[propIndex];
        const propKey = toKey(numKey[X] + prop[X], numKey[Y] + prop[Y]);
        if (proposalMap[propKey]) {
          proposalMap[propKey] = false;
        } else if (proposalMap[propKey] === undefined) {
          proposalMap[propKey] = key;
        }
      }
    }

    if (Object.values(proposalMap).filter((x) => Boolean(x)).length === 0)
      return i + 1;

    for (const key of Object.keys(proposalMap)) {
      if (proposalMap[key]) {
        map[key] = true;
        delete map[proposalMap[key] as string];
      }
    }

    i++;
  }
}

export default function main() {
  // logResult("Test", __dirname + "/testInput2.txt", part1);
  // logResult("Test", __dirname + "/testInput.txt", part2);
  logResult("Main", __dirname + "/input.txt", part2);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
