import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const graph: Record<string, string[]> = {};
  const weightedGraph: Record<string, Record<string, number>> = {};
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

  for (const key of Object.keys(flows).concat("AA")) {
    let steps = 1;
    const queue = [key];
    const visistedSet = new Set([key]);

    while (queue.length) {
      const length = queue.length;

      for (let i = 0; i < length; i++) {
        const valve = queue.shift() as string;
        if (!weightedGraph[key]) weightedGraph[valve] = {};

        for (const adj of graph[valve]) {
          if (flows[adj] && adj !== key) {
            if (!weightedGraph[adj]) weightedGraph[adj] = {};

            weightedGraph[key][adj] = steps;

            if (key !== "AA") {
              weightedGraph[adj][key] = steps;
            }

            visistedSet.add(adj);
          } else if (!visistedSet.has(adj)) {
            visistedSet.add(adj);
            queue.push(adj);
          }
        }
      }

      steps++;
    }
  }

  console.log(weightedGraph);

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
    const score = calculateScore();
    if (
      step >= STEPS - 1 ||
      Object.keys(flows).length === Object.keys(opened).length
    ) {
      if (score > max) {
        console.log(step, score, opened);
        max = score;
      }

      // delete opened[node];
      visitedTimes[node]--;
      return;
    }

    if (!visitedTimes[node]) visitedTimes[node] = 1;
    else if (visitedTimes[node] <= 2) {
      visitedTimes[node]++;
    } else {
      return;
    }

    if (step >= 5 && score === 0) {
      visitedTimes[node]--;
      return;
    }

    if (flows[node] && !opened[node]) {
      opened[node] = step;
      const weights = weightedGraph[node];
      for (const adj of Object.keys(weights)) {
        recurse(adj, step + weights[adj] + 1, null);
      }

      delete opened[node];
    }

    const weights = weightedGraph[node];
    for (const adj of Object.keys(weights)) {
      if (adj !== prev) {
        recurse(adj, step + weights[adj], node);
      }
    }

    visitedTimes[node]--;
  };

  recurse("AA", 1, null);

  return max;
}

function part2(input: string) {
  const graph: Record<string, string[]> = {};
  const weightedGraph: Record<string, Record<string, number>> = {};
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

  const keys = Object.keys(flows).concat("AA");

  for (const key of keys) {
    let steps = 1;
    const queue = [key];
    const visistedSet = new Set([key]);

    while (queue.length) {
      const length = queue.length;

      for (let i = 0; i < length; i++) {
        const valve = queue.shift() as string;
        if (!weightedGraph[key]) weightedGraph[valve] = {};

        for (const adj of graph[valve]) {
          if (!visistedSet.has(adj)) {
            if (keys.includes(adj)) {
              if (!weightedGraph[adj]) weightedGraph[adj] = {};

              weightedGraph[key][adj] = steps + 1;
              weightedGraph[adj][key] = steps + 1;
            }

            visistedSet.add(adj);
            queue.push(adj);
          }
        }
      }

      steps++;
    }
  }

  console.log(weightedGraph);

  let max = 0;

  const STEPS = 26;

  const calculateScore = (arr: string[]) => {
    let score = 0;
    let steps = 0;
    let i = 0;

    while (i < arr.length - 1 && steps < STEPS) {
      steps += weightedGraph[arr[i]][arr[i + 1]];
      score += (STEPS - steps) * flows[arr[i + 1]];
      i++;
    }

    return { score, steps };
  };

  const permutator = (inputArr: string[]) => {
    const permute = (arr: string[], m: string[] = ["AA"]) => {
      if (m.length > 4) {
        for (let i = 2; i < m.length - 2; i++) {
          const partition1 = m.slice(0, i);
          const partition2 = m.slice(i);
          const score1 = calculateScore(partition1);
          const score2 = calculateScore(["AA"].concat(partition2));
          const total = score1.score + score2.score;

          if (total > max) {
            max = total;
            console.log(total, partition1, partition2);
          }

          if (score1.steps >= STEPS - 1 && score2.steps >= STEPS - 1) return;
        }
      }

      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    };

    permute(inputArr);
  };

  permutator(Object.keys(flows));

  return max;
}

export default function main() {
  // logResult("Test", __dirname + "/testInput.txt", part1);
  // logResult("Test", __dirname + "/input.txt", part1);
  // logResult("Test", __dirname + "/testInput.txt", part2);
  logResult("Main", __dirname + "/input.txt", part2);
}
