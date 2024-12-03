import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const matches = input.match(/mul\(\d+,\d+\)/g);
  let sum = 0;
  for (const match of matches ?? []) {
    const nums = ints(match);
    sum += nums[0] * nums[1];
  }

  return sum;
}

function part2(input: string) {
  const matches = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
  console.log(matches);

  let sum = 0;
  let enabled = true;
  for (const match of matches ?? []) {
    if (match === "do()") {
      enabled = true;
    } else if (match === "don't()") {
      enabled = false;
    } else if (enabled) {
      const nums = ints(match);
      sum += nums[0] * nums[1];
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
