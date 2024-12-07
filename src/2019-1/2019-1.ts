//Visit the problem: https://adventofcode.com/2019/day/1
import { ints } from "../helpers";

export function part1(input: string) {
  const split = input.split("\n");
  let sum = 0;
  for (const line of split) {
    sum += Math.floor(Number(line) / 3) - 2;
  }

  return sum;
}

export function part2(input: string, _visualize: (toVis: unknown) => void) {
  const split = input.split("\n");
  let sum = 0;
  for (const line of split) {
    let num = Number(line);
    while (num > 0) {
      num = Math.floor(num / 3) - 2;
      if (num > 0) {
        sum += num;
      }
    }
  }

  return sum;
}
