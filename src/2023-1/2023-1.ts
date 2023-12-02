import { ints, singleInts } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  let sum = 0;
  for (const line of split) {
    const nums = singleInts(line) ?? [];
    sum += nums[0] * 10 + nums[nums.length - 1];
  }

  return sum;
}

const numberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function extractDigits(line: string) {
  let result: number[] = [];

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(Number(line[i]))) {
      result.push(Number(line[i]));
    }

    for (const [key, value] of Object.entries(numberMap)) {
      if (line.substring(i, i + key.length) === key) {
        result.push(value);
      }
    }
  }

  return result;
}

function part2(input: string) {
  const split = input.split("\n");
  let sum = 0;
  for (let line of split) {
    const nums = extractDigits(line);
    sum += nums[0] * 10 + nums[nums.length - 1];
  }

  return sum;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
