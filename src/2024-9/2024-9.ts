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
  const map: { digit: number; index: number; length: number }[] = [];

  const nums = input.split("").map(Number);

  let indexCounter = 0;

  let max = 0;

  for (let i = 0; i < nums.length; i += 2) {
    const digit = i / 2;
    max = digit;
    const length = nums[i];
    const spaces = nums[i + 1];

    map.push({ length, index: indexCounter, digit });

    indexCounter += length + spaces;
  }

  for (let i = max; i >= 0; i--) {
    let digit: (typeof map)[number] | undefined = undefined;
    let digitIndex = -1;

    digit = undefined;
    digitIndex = -1;

    for (let j = 0; j < map.length; j++) {
      if (map[j].digit === i) {
        digit = map[j];
        digitIndex = j;
        break;
      }
    }

    if (!digit) {
      break;
    }

    // _visualize?.({ map });

    for (let j = 0; j < map.length - 1; j++) {
      if (digit === map[j]) break;

      if (map[j + 1].index - (map[j].index + map[j].length) >= digit.length) {
        digit.index = map[j].index + map[j].length;
        map.splice(digitIndex, 1);
        map.splice(j + 1, 0, digit);
        break;
      }
    }
  }

  let sum = 0;

  for (let i = 0; i < map.length; i++) {
    const entry = map[i];
    for (let j = entry.index; j < entry.index + entry.length; j++) {
      sum += j * entry.digit;
    }
  }

  return sum;
}
