import { ints, isLowerCase } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");

  const map: Record<string, string[]> = {};

  for (const line of split) {
    const [to, from] = line.split("-");
    if (!map[to]) map[to] = [];
    if (!map[from]) map[from] = [];

    map[to].push(from);
    map[from].push(to);
  }

  const visited = new Set<string>();

  let count = 0;

  function traverse(node: string) {
    if (node === "end") {
      count++;
      return;
    }

    if (visited.has(node)) return;

    if (isLowerCase(node)) {
      visited.add(node);
    }

    for (const newNode of map[node]) {
      traverse(newNode);
    }

    visited.delete(node);
  }

  traverse("start");

  return count;
}

function part2(input: string) {}

export default function main() {
  logResult("Test part 1", __dirname + "/testInput.txt", part1);
  logResult("Main part 1", __dirname + "/input.txt", part1);
  //   logResult("Test part 2", __dirname + "/testInput.txt", part2);
  //   logResult("Main part 2", __dirname + "/input.txt", part2);
}
