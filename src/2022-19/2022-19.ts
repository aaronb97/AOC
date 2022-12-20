import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  const blueprints: number[][] = [];

  for (const line of split) {
    blueprints.push(ints(line).slice(1));
  }

  let sum = 0;
  for (let i = 0; i < blueprints.length; i++) {
    const result = processBlueprint(blueprints[i], 24);
    console.log(`Blueprint ${i + 1}: ${result}`);
    sum += result * (i + 1);
  }

  return sum;
}

function part2(input: string) {
  const split = input.split("\n");
  const blueprints: number[][] = [];

  for (const line of split) {
    blueprints.push(ints(line).slice(1));
  }

  let product = 1;
  for (let i = 0; i < 3; i++) {
    const result = processBlueprint(blueprints[i], 32);
    console.log(`Blueprint ${i + 1}: ${result}`);
    product *= result;
  }

  return product;
}

type Rock = "ORE" | "CLAY" | "OBS" | "GEO";
type Robot = Partial<Record<Rock, number>>;

function processBlueprint(blueprint: number[], STEPS: number) {
  const robots: number[][] = [
    [blueprint[0], 0, 0, 0],
    [blueprint[1], 0, 0, 0],
    [blueprint[2], blueprint[3], 0, 0],
    [blueprint[4], 0, blueprint[5], 0],
  ];

  let max = 0;

  const memo: Record<string, number> = {};

  const toKey = (rockCounts: number[], robotCounts: number[], step: number) => {
    return `${rockCounts.join(",")},${robotCounts.join(",")},${step}`;
  };

  function maxPossible(
    step: number,
    geodeCount: number,
    geodeRobotCount: number
  ) {
    const diff = STEPS - step + 1;
    let robots = geodeRobotCount;
    for (let i = 0; i < diff; i++) {
      geodeCount += robots;
      robots++;
    }

    return geodeCount;
  }

  const recurse = (
    rockCounts: number[],
    robotCounts: number[],
    step: number
  ): number => {
    if (rockCounts.some((x) => x > 50)) return 0;

    // console.log(rockCounts, robotCounts, step);
    const key = toKey(rockCounts, robotCounts, step);
    const lookup = memo[key];
    if (lookup !== undefined) {
      return lookup;
    }

    if (maxPossible(step, rockCounts[3], robotCounts[3]) < max) {
      memo[key] = 0;
      return 0;
    }

    if (rockCounts[3] + robotCounts[3] * (STEPS - step + 1) > max) {
      max = rockCounts[3] + robotCounts[3] * (STEPS - step + 1);
    }
    if (step > STEPS) return rockCounts[3];

    let results = [];
    let keys = [];

    // if (max - rockCounts[3] > STEPS - step) return;

    for (let i = 3; i >= 0; i--) {
      const robot = robots[i];
      if (canBuildRobot(robot, rockCounts)) {
        const subtractedRockCounts = subtractRockCounts(robot, rockCounts);
        const newRobotCounts = incrementRobotCounts(robotCounts, i);
        const newRockCounts = incrementRockCounts(
          robotCounts,
          subtractedRockCounts
        ); //use old robot counts

        const result = recurse(newRockCounts, newRobotCounts, step + 1);
        results.push(result);
        keys.push(key);
      }
    }

    const newRockCounts = incrementRockCounts(robotCounts, rockCounts);
    results.push(recurse(newRockCounts, [...robotCounts], step + 1));
    keys.push(toKey(newRockCounts, robotCounts, step));

    const maxResult = Math.max(...results);
    for (const k of keys) {
      memo[k] = maxResult;
    }

    return maxResult;
  };

  recurse([0, 0, 0, 0], [1, 0, 0, 0], 1);

  return max;
}

function canBuildRobot(robot: number[], rockCounts: number[]) {
  for (let i = 0; i < 4; i++) {
    if (robot[i] > rockCounts[i]) {
      return false;
    }
  }

  return true;
}

function subtractRockCounts(robot: number[], rockCounts: number[]) {
  const newRockCounts = [];
  for (let i = 0; i < 4; i++) {
    newRockCounts.push(rockCounts[i] - robot[i]);
  }

  return newRockCounts;
}

function incrementRobotCounts(robots: number[], i: number) {
  const newRobotCounts = [...robots];
  newRobotCounts[i]++;
  return newRobotCounts;
}

function incrementRockCounts(robotCounts: number[], rockCounts: number[]) {
  const newRockCounts = [];
  for (let i = 0; i < 4; i++) {
    newRockCounts.push(robotCounts[i] + rockCounts[i]);
  }

  return newRockCounts;
}

export default function main() {
  //   logResult("Test", __dirname + "/testInput.txt", part1);
  // logResult("Test", __dirname + "/testInput.txt", part2);
  logResult("Main", __dirname + "/input.txt", part1);
}

// Blueprint 1: 5
// Blueprint 2: 0
// Blueprint 3: 2
// Blueprint 4: 10
// Blueprint 5: 3
// Blueprint 6: 6
// Blueprint 7: 0
// Blueprint 8: 11
// Blueprint 9: 3
// Blueprint 10: 8
// Blueprint 11: 1
// Blueprint 12: 0
// Blueprint 13: 1
// Blueprint 14: 0
// Blueprint 15: 15
// Blueprint 16: 0
// Blueprint 17: 0
// Blueprint 18: 12
// Blueprint 19: 0
// Blueprint 20: 2
// Blueprint 21: 1
// Blueprint 22: 0
// Blueprint 23: 3
// Blueprint 24: 14
// Blueprint 25: 1
