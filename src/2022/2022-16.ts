import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const graph: Record<string, string[]> = {};
  const flows: Record<string, number> = {};
  const split = input.split("\n");

  for (const line of split) {
    const valves = line.match(/[A-Z]{2}/g);
    if (!valves) {
      throw new Error("No valves found");
    }

    const flow = ints(line)[0];
    const group = [];
    for (let i = 1; i < valves.length; i++) {
      group.push(valves[i]);
    }

    if (flow > 0) {
      flows[valves[0]] = flow;
    }

    graph[valves[0]] = group;
  }

  let max = 0;

  const opened: Record<string, number> = {};
  const visitedTimes: Record<string, number> = {};

  const SCORE_STEPS = 30;
  const STEPS = 30;

  const calculateScore = () => {
    let score = 0;
    for (const key of Object.keys(opened)) {
      const diff = SCORE_STEPS - opened[key];
      score += diff * flows[key];
    }

    return score;
  };

  const recurse = (node: string, step: number, prev: string | null) => {
    if (step >= STEPS) return;

    if (!visitedTimes[node]) visitedTimes[node] = 1;
    else if (visitedTimes[node] <= 2) {
      visitedTimes[node]++;
    } else {
      return;
    }

    if (step >= 5 && calculateScore() === 0) {
      visitedTimes[node]--;
      return;
    }

    if (
      step >= STEPS - 1 ||
      Object.keys(flows).length === Object.keys(opened).length
    ) {
      const score = calculateScore();
      if (score > max) {
        console.log(step, score, opened);
        max = score;
      }

      // delete opened[node];
      visitedTimes[node]--;
      return;
    }

    if (flows[node] && !opened[node]) {
      opened[node] = step;
      for (const adj of graph[node]) {
        recurse(adj, step + 2, null);
      }

      delete opened[node];
    }

    for (const adj of graph[node]) {
      if (prev !== node) {
        recurse(adj, step + 1, node);
      }
    }

    visitedTimes[node]--;
  };

  recurse("AA", 1, null);

  return max;
}

export default function main() {
  // logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Test", __dirname + "/input.txt", part1);
}
