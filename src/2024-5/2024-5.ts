import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const [part1, part2] = input.split("\n\n");

  const rules: Record<number, number[]> = {};

  for (const line of part1.split("\n")) {
    const [before, after] = ints(line);
    if (!rules[before]) {
      rules[before] = [];
    }

    rules[before].push(after);
  }

  let sum = 0;
  for (const line of part2.split("\n")) {
    const nums = ints(line);
    const map: Record<number, number> = {};
    for (let i = 0; i < nums.length; i++) {
      map[nums[i]] = i;
    }

    let valid = true;
    for (let i = 0; i < nums.length; i++) {
      for (const rule of rules[nums[i]] ?? []) {
        if (map[rule] < i) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      sum += nums[Math.floor(nums.length / 2)];
    }
  }

  return sum;
}

function part2(input: string) {
  const [part1, part2] = input.split("\n\n");

  const rules: Record<number, number[]> = {};

  for (const line of part1.split("\n")) {
    const [before, after] = ints(line);
    if (!rules[before]) {
      rules[before] = [];
    }

    rules[before].push(after);
  }

  function getIncorrect(nums: number[]) {
    const map: Record<number, number> = {};
    for (let i = 0; i < nums.length; i++) {
      map[nums[i]] = i;
    }

    for (let i = 0; i < nums.length; i++) {
      for (const rule of rules[nums[i]] ?? []) {
        if (map[rule] < i) {
          return [map[rule], i];
        }
      }
    }
  }

  let sum = 0;
  for (const line of part2.split("\n")) {
    const nums = ints(line);

    let isCorrect = false;
    let wasIncorrect = false;

    do {
      const incorrect = getIncorrect(nums);
      if (!incorrect) {
        isCorrect = true;
      } else {
        wasIncorrect = true;
        const [removed] = nums.splice(incorrect[1], 1);
        nums.splice(incorrect[0], 0, removed);
      }
    } while (!isCorrect);

    if (wasIncorrect) {
      sum += nums[Math.floor(nums.length / 2)];
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
