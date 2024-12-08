//https://adventofcode.com/2019/day/5
import { computer, ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  return computer(ints(input), undefined, undefined, _visualize);
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const split = input.split("\n");
  return ints(input);
}
