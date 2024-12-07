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
    if (isValid(target, nums[0], nums.slice(1))) {
      sum += target;
      // console.log("valid", nums);
    } else {
      // console.log("not valid", nums);
    }
  }

  function isValid(target: number, sum: number, nums: number[]): boolean {
    if (sum > target) return false;

    if (nums.length === 0) {
      return sum === target;
    }

    return (
      isValid(target, sum + nums[0], nums.slice(1)) ||
      isValid(target, sum * nums[0], nums.slice(1)) ||
      isValid(target, Number(`${sum}${nums[0]}`), nums.slice(1))
    );
  }

  return sum;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
