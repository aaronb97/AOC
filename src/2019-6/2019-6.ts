//https://adventofcode.com/2019/day/6
import { ints } from "../helpers";

export function part1(input: string, _visualize?: (toVis: unknown) => void) {
  const split = input.split("\n");
  const orbits: Record<string, string[]> = {};

  for (const line of split) {
    const [a, b] = line.split(")");

    if (!orbits[a]) orbits[a] = [];

    orbits[a].push(b);
  }

  let count = 0;

  function recurse(planet: string, depth: number) {
    count += depth;

    for (const orbiting of orbits[planet] ?? []) {
      recurse(orbiting, depth + 1);
    }
  }

  recurse("COM", 0);

  return count;
}

export function part2(input: string, _visualize?: (toVis: unknown) => void) {
  const split = input.split("\n");
  const orbits: Record<string, string[]> = {};

  for (const line of split) {
    const [a, b] = line.split(")");

    if (!orbits[a]) orbits[a] = [];

    orbits[a].push(b);
  }

  let result = 0;

  function recurse(planet: string): number | undefined {
    if (result) return;

    if (planet === "YOU" || planet == "SAN") {
      return 1;
    }

    let results: number[] = [];

    for (const orbiting of orbits[planet] ?? []) {
      const result = recurse(orbiting);
      if (result) {
        results.push(result);
      }
    }

    if (results.length === 2) {
      result = results[0] + results[1];
    }

    if (results.length === 1) {
      return results[0] + 1;
    }

    return undefined;
  }

  recurse("COM");
  return result - 2;
}
