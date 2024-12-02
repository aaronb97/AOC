import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  let count = 0;
  for (const line of split) {
    const nums = ints(line);

    const diff = maxDifference(nums);

    if ((isDecreasing(nums) || isIncreasing(nums)) && diff >= 1 && diff <= 3) {
      count++;
    }
  }

  return count;
}

function part2(input: string) {
  const split = input.split("\n");
  let count = 0;
  for (const line of split) {
    const nums = ints(line);

    for (let i = 0; i < nums.length; i++) {
      const spliced = [...nums];
      spliced.splice(i, 1);
      const diff = maxDifference(spliced);

      if (
        (isDecreasing(spliced) || isIncreasing(spliced)) &&
        diff >= 1 &&
        diff <= 3
      ) {
        count++;
        break;
      }
    }
  }

  return count;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}

function isIncreasing(nums: number[]) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] >= nums[i + 1]) {
      return false;
    }
  }

  return true;
}

function isDecreasing(nums: number[]) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] <= nums[i + 1]) {
      return false;
    }
  }

  return true;
}

function maxDifference(nums: number[]) {
  let diff = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    diff = Math.max(diff, Math.abs(nums[i] - nums[i + 1]));
  }

  return diff;
}
