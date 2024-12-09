//https://adventofcode.com/2019/day/7
import { computer } from "../computer";
import { getPermutations, ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const phaseSettings = [0, 1, 2, 3, 4];
  const phasePerms = getPermutations(phaseSettings);

  let max = 0;

  for (let i = 0; i < phasePerms.length; i++) {
    let ampResult = 0;
    for (let j = 0; j < 5; j++) {
      const result = computer(input, { input: [phasePerms[i][j], ampResult] });
      ampResult = Number(result.outputs[0]);
    }

    max = Math.max(max, ampResult);
  }

  return max;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const phaseSettings = [5, 6, 7, 8, 9];
  const phasePerms = getPermutations(phaseSettings);

  let max = 0;

  for (let i = 0; i < phasePerms.length; i++) {
    let ampResults: number[] = [];
    let j = 0;
    while (true) {
      const result = computer(input, {
        input: [phasePerms[i][j], ...ampResults],
      });
      if (result.outputs[0] === "break") {
        break;
      }

      ampResults = result.outputs.map(Number);
      j = (j + 1) % 5;
    }

    max = Math.max(max, ampResults[0]);
  }

  return max;
}
