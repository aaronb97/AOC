//https://adventofcode.com/2019/day/5
import { computer } from "../computer";
import { ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  return computer(ints(input), { _visualize, input: 1 });
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  return computer(ints(input), { _visualize, input: 5 });
}
