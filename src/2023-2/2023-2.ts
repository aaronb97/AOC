import { ints } from "../helpers";
import { logResult } from "../logResult";

const cubeCounts: Record<string, number> = {
  blue: 14,
  green: 13,
  red: 12,
};

function isGameValid(games: string[]) {
  for (const game of games) {
    const cubes = game.split(",");
    for (const cube of cubes) {
      const [count, color] = cube.trim().split(" ");
      if (Number(count) > cubeCounts[color]) {
        return false;
      }
    }
  }

  return true;
}

function getColorCounts(games: string[]) {
  const counts: Record<string, number> = {
    blue: 0,
    green: 0,
    red: 0,
  };

  for (const game of games) {
    const cubes = game.split(",");
    for (const cube of cubes) {
      const [count, color] = cube.trim().split(" ");
      counts[color] = Math.max(counts[color], Number(count));
    }
  }

  return counts;
}

function part1(input: string) {
  const split = input.split("\n");
  let sum = 0;

  for (const line of split) {
    const gameId = ints(line)[0];
    const games = line.split(":")[1].split(";");
    sum;
    if (isGameValid(games)) {
      sum += gameId;
    }
  }

  return sum;
}

function part2(input: string) {
  const split = input.split("\n");
  let sum = 0;

  for (const line of split) {
    const gameId = ints(line)[0];
    const games = line.split(":")[1].split(";");
    const counts = getColorCounts(games);
    sum += counts.red * counts.green * counts.blue;
  }

  return sum;
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
