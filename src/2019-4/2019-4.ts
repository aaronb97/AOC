//https://adventofcode.com/2019/day/4
import { getCounts, ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  input = input.replace("-", " ");
  const nums = ints(input);

  function isValid(num: number) {
    const digits = num.toString().split("").map(Number);

    for (let i = 0; i < digits.length - 1; i++) {
      if (digits[i] > digits[i + 1]) {
        return false;
      }
    }

    if (new Set(digits).size === 6) {
      return false;
    }

    return true;
  }

  let count = 0;

  for (let i = nums[0]; i <= nums[1]; i++) {
    if (isValid(i)) {
      count++;
    }
  }

  return count;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  input = input.replace("-", " ");
  const nums = ints(input);

  function isValid(num: number) {
    const digits = num.toString().split("").map(Number);

    for (let i = 0; i < digits.length - 1; i++) {
      if (digits[i] > digits[i + 1]) {
        return false;
      }
    }

    const counts = getCounts(digits);

    console.log(counts);

    return Object.values(counts).some((value) => value === 2);
  }

  let count = 0;

  for (let i = nums[0]; i <= nums[1]; i++) {
    if (isValid(i)) {
      count++;
    }
  }

  return count;
}
