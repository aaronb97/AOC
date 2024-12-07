//https://adventofcode.com/2019/day/2
import { computer, ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const nums = ints(input);

  return computer(nums, 12, 2);
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const nums = ints(input);

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const result = computer(nums, i, j);
      if (result === 19690720) {
        return 100 * i + j;
      }
    }
  }
}
