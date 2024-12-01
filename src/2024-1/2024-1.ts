import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  const split = input.split("\n");
  for (const line of split) {
    const nums = ints(line);
    list1.push(nums[0]);
    list2.push(nums[1]);
  }

  list1.sort();
  list2.sort();

  let sum = 0;

  for (let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
  }

  return sum;
}

function part2(input: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  const counts: Record<number, number> = {};

  const split = input.split("\n");
  for (const line of split) {
    const nums = ints(line);
    list1.push(nums[0]);
    list2.push(nums[1]);
  }

  for (const num of list2) {
    if (counts[num] === undefined) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  }

  let sum = 0;

  for (const num of list1) {
    if (counts[num]) {
      sum += counts[num] * num;
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
