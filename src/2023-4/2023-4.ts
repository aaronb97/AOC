import { ints, sum } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  let score = 0;
  for (const line of split) {
    const parts = line.split("|");
    const winningNumbers = ints(parts[0]).slice(1);
    const myNumbers = ints(parts[1]);

    let localScore = 0;
    for (const num of myNumbers) {
      if (winningNumbers.includes(num)) {
        if (localScore === 0) {
          localScore = 1;
        } else {
          localScore *= 2;
        }
      }
    }

    score += localScore;
  }

  return score;
}

function part2(input: string) {
  const split = input.split("\n");

  const copies = new Array(split.length).fill(1);
  for (let i = 0; i < split.length; i++) {
    const line = split[i];
    const parts = line.split("|");
    const winningNumbers = ints(parts[0]).slice(1);
    const myNumbers = ints(parts[1]);

    let localCount = 0;
    for (const num of myNumbers) {
      if (winningNumbers.includes(num)) {
        localCount++;
      }
    }

    for (let j = i + 1; j <= i + localCount && j < split.length; j++) {
      copies[j] += copies[i];
    }
  }

  return sum(copies);
}

export default function main() {
  // logResult("Test part 1", __dirname + "/testInput.txt", part1);
  // logResult("Main part 1", __dirname + "/input.txt", part1);
  logResult("Test part 2", __dirname + "/testInput.txt", part2);
  logResult("Main part 2", __dirname + "/input.txt", part2);
}
