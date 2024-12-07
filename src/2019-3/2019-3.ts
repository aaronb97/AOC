//https://adventofcode.com/2019/day/3
import { ints } from "../helpers";

const map: Record<string, [number, number]> = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const lines = input.split("\n");

  const set = new Set<string>(["0,0"]);

  let minDistance = Infinity;

  for (let i = 0; i < lines.length; i++) {
    const pos = [0, 0];
    const line = lines[i];

    const dirs = line.split(",");

    for (const dir of dirs) {
      const direction = map[dir[0]];
      const distance = ints(dir)[0];

      for (let j = 0; j < distance; j++) {
        pos[0] += direction[0];
        pos[1] += direction[1];

        const key = `${pos[0]},${pos[1]}`;
        if (i === 1 && set.has(key)) {
          minDistance = Math.min(
            minDistance,
            Math.abs(pos[0]) + Math.abs(pos[1])
          );
        } else if (i === 0) {
          set.add(key);
        }
      }
    }
  }

  return minDistance;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const lines = input.split("\n");

  const steps: Record<string, number> = {};

  let minSteps = Infinity;

  for (let i = 0; i < lines.length; i++) {
    const pos = [0, 0];
    let counter = 0;
    const line = lines[i];

    const dirs = line.split(",");

    for (const dir of dirs) {
      const direction = map[dir[0]];
      const distance = ints(dir)[0];

      for (let j = 0; j < distance; j++) {
        counter++;
        pos[0] += direction[0];
        pos[1] += direction[1];

        const key = `${pos[0]},${pos[1]}`;
        if (i === 1 && steps[key]) {
          minSteps = Math.min(minSteps, counter + steps[key]);
        } else if (i === 0 && !steps[key]) {
          steps[key] = counter;
        }
      }
    }
  }

  return minSteps;
}
