//https://adventofcode.com/2024/day/9
import { ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const map: (number | ".")[] = [];

  const nums = input.split("").map(Number);

  for (let i = 0; i < nums.length; i += 2) {
    const digit = i / 2;
    const amount = nums[i];
    const spaces = nums[i + 1];

    for (let j = 0; j < amount; j++) {
      map.push(digit);
    }

    for (let j = 0; j < spaces; j++) {
      map.push(".");
    }
  }

  let start = 0;
  let end = map.length - 1;

  while (true) {
    while (map[start] !== ".") {
      start++;
    }

    while (map[end] === ".") {
      end--;
    }

    if (start > end) break;

    map[start] = map[end];
    map[end] = ".";
  }

  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    const num = map[i];
    if (num === ".") {
      break;
    } else {
      sum += i * num;
    }
  }

  return sum;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const split = input.split("\n");
  return ints(input);
}
