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

export function maxPossible(
  step: number,
  steps: number,
  geodeCount: number,
  geodeRobotCount: number
) {
  const diff = steps - step + 1;
  let robots = geodeRobotCount;
  for (let i = 0; i < diff; i++) {
    geodeCount += robots;
    robots++;
  }

  return geodeCount;
}

function processBlueprint(blueprint: number[], STEPS: number) {
  const robots: number[][] = [
    [blueprint[0], 0, 0, 0],
    [blueprint[1], 0, 0, 0],
    [blueprint[2], blueprint[3], 0, 0],
    [blueprint[4], 0, blueprint[5], 0],
  ];

  let max = 0;

  const memo: Record<string, number[]> = {};

  const processMemo = (
    rockCounts: number[],
    robotCounts: number[],
    step: number
  ) => {
    const key = `${robotCounts.join()},${step}`;
    const lookup = memo[key];
    if (lookup) {
      for (let i = 0; i < 4; i++) {
        if (rockCounts[i] > lookup[i]) {
          return false;
        }
      }

      for (let i = 0; i < 4; i++) {
        lookup[i] = rockCounts[i];
      }

      return true;
    } else {
      memo[key] = [...rockCounts];
      return false;
    }
  };

  // const toKey = (rockCounts: number[], robotCounts: number[], step: number) => {
  //   return `${rockCounts.join(",")},${robotCounts.join(",")},${step}`;
  // };

  const recurse = (
    rockCounts: number[],
    robotCounts: number[],
    step: number
  ) => {
    // console.log(memo);
    if (processMemo(rockCounts, robotCounts, step)) {
      return;
    }

    const testArray = [rockCounts[0], rockCounts[1], rockCounts[2]];
    if (
      testArray.some((x) => x > 20) &&
      testArray.filter((x) => x === 0).length === 2
    ) {
      return 0;
    }

    if (step > 5 && robotCounts.every((x) => x === 0)) return;

    if (rockCounts[3] > max) {
      max = rockCounts[3];
      console.log(max);
    }

    // console.log(rockCounts, robotCounts, step);

    if (rockCounts[3] + robotCounts[3] * (STEPS - step + 1) > max) {
      max = rockCounts[3] + robotCounts[3] * (STEPS - step + 1);
      console.log(max);
    }

    if (maxPossible(step, STEPS, rockCounts[3], robotCounts[3]) <= max) {
      return 0;
    }

    if (step > STEPS) {
      return max;
    }

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

        recurse(newRockCounts, newRobotCounts, step + 1);
      }
    }

    const newRockCounts = incrementRockCounts(robotCounts, rockCounts);
    recurse(newRockCounts, [...robotCounts], step + 1);

    // const maxResult = Math.max(...results);
    // for (const k of keys) {
    //   memo[k] = maxResult;
    // }
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
  // logResult("Test", __dirname + "/testInput.txt", part1);
  // logResult("Test", __dirname + "/testInput.txt", part2);
  logResult("Test", __dirname + "/input.txt", part2);
  // logResult("Main", __dirname + "/input.txt", part1);
}

// 12096
// 13440
