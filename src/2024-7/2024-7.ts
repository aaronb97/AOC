import { getPermutations, ints, last, splitArrayAtIndex } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");

  let sum = 0;
  for (const line of split) {
    const [target, ...nums] = ints(line);
    if (isValid(target, nums)) {
      sum += target;
      // console.log("valid", nums);
    } else {
      // console.log("not valid", nums);
    }
  }

  function isValid(target: number, nums: number[]): boolean {
    if (target < 1) return false;

    if (nums.length === 1) {
      return nums[0] === target;
    }

    return (
      isValid(target / last(nums), nums.slice(0, nums.length - 1)) ||
      isValid(target - last(nums), nums.slice(0, nums.length - 1))
    );
  }

  return sum;
}

function part2(input: string) {
  const split = input.split("\n");

  let sum = 0;
  for (const line of split) {
    const [target, ...nums] = ints(line);
    if (isValid(target, nums, nums.length - 1)) {
      sum += target;
      // console.log("valid", nums);
    } else {
      // console.log("not valid", nums);
    }
  }

  // Determine the number of digits in n using math
  function digitCount(n: number): number {
    return n === 0 ? 1 : Math.floor(Math.log10(Math.abs(n))) + 1;
  }

  function isValid(target: number, nums: number[], i: number): boolean {
    // If target is less than 1, it's invalid
    if (target < 1) return false;

    // Base case: if we're at the first element
    if (i === 0) {
      return nums[0] === target;
    }

    const lastNum = nums[i];

    // Try division and subtraction paths
    if (isValid(target / lastNum, nums, i - 1)) return true;
    if (isValid(target - lastNum, nums, i - 1)) return true;

    // If division/subtraction not valid, try the suffix removal logic
    const d = digitCount(lastNum);
    const base = 10 ** d;

    // Check if target ends with lastNum
    if (target % base === lastNum) {
      const nextNum = Math.floor(target / base);
      return isValid(nextNum, nums, i - 1);
    }

    return false;
  }

  return sum;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
