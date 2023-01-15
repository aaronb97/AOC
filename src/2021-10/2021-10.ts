import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  let sum = 0;

  for (const line of split) {
    sum += getScore(line.split(""));
  }

  return sum;
}

const map: Record<string, string> = {
  "{": "}",
  "[": "]",
  "(": ")",
  "<": ">",
};

const scores: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const scores2: Record<string, number> = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

function getScore(line: string[]) {
  const stack = [];

  for (const c of line) {
    if (map[c]) {
      stack.push(c);
    } else {
      const pop = stack.pop() as string;
      if (map[pop] !== c) {
        return scores[c];
      }
    }
  }

  return 0;
}

function getScore2(line: string[]) {
  const stack = [];

  for (const c of line) {
    if (map[c]) {
      stack.push(c);
    } else {
      const pop = stack.pop() as string;
      if (map[pop] !== c) {
        return 0;
      }
    }
  }

  let sum = 0;
  while (stack.length) {
    const pop = stack.pop() as string;
    sum *= 5;
    sum += scores2[pop];
  }

  return sum;
}

function part2(input: string) {
  const split = input.split("\n");
  let scores = [];

  for (const line of split) {
    const score = getScore2(line.split(""));
    if (score) scores.push(score);
  }

  scores.sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2];
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
