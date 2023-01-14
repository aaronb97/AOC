import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  let sum = 0;
  for (const line of split) {
    const segments = line.split("|")[1].split(" ");
    for (const segment of segments) {
      if ([2, 3, 4, 7].includes(segment.length)) {
        sum++;
      }
    }
  }

  return sum;
}

function part2(input: string) {}

export default function main() {
  // logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
