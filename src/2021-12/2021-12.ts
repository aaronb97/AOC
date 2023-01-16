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

function part2(input: string) {
  const split = input.split("\n");

  const map: Record<string, string[]> = {};

  for (const line of split) {
    const [to, from] = line.split("-");
    if (!map[to]) map[to] = [];
    if (!map[from]) map[from] = [];

    map[to].push(from);
    map[from].push(to);
  }

  const visitedCount: Record<string, number> = {};
  const paths = new Set<string>();

  function traverse(node: string, twiceNode: string, path: string[] = []) {
    if (node === "end") {
      paths.add(path.join());
      return;
    }

    if (node === twiceNode) {
      if (visitedCount[node] === 2) {
        return;
      }
    } else if (visitedCount[node]) {
      return;
    }

    if (isLowerCase(node)) {
      if (visitedCount[node] === undefined) {
        visitedCount[node] = 1;
      } else {
        visitedCount[node]++;
      }
    }

    for (const newNode of map[node]) {
      traverse(newNode, twiceNode, [...path, newNode]);
    }

    visitedCount[node]--;
  }

  for (const key of Object.keys(map)
    .filter(isLowerCase)
    .filter((x) => x !== "start" && x !== "end")) {
    traverse("start", key);
  }

  return paths.size;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
