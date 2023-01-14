import { invertRecord, removeFromArray } from "../helpers";
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

function part2(input: string) {
  const split = input.split("\n");

  let sum = 0;
  let count = 0;

  for (const line of split) {
    const codes: Record<number, string> = {};

    const segments = line
      .split("|")[0]
      .split(" ")
      .map((x) =>
        x
          .split("")
          .sort((a, b) => a.localeCompare(b))
          .join("")
      );
    codes[1] = segments.find((x) => x.length === 2) as string;
    codes[4] = segments.find((x) => x.length === 4) as string;
    codes[7] = segments.find((x) => x.length === 3) as string;
    codes[8] = segments.find((x) => x.length === 7) as string;

    const sixes = segments.filter((x) => x.length === 6);

    codes[9] = sixes.find((x) =>
      codes[4].split("").every((c) => x.includes(c))
    ) as string;
    removeFromArray(sixes, codes[9]);

    codes[0] = sixes.find((x) =>
      codes[7].split("").every((c) => x.includes(c))
    ) as string;
    removeFromArray(sixes, codes[0]);

    codes[6] = sixes[0];

    const fives = segments.filter((x) => x.length === 5);
    codes[3] = fives.find((x) =>
      codes[1].split("").every((c) => x.includes(c))
    ) as string;
    removeFromArray(fives, codes[3]);

    codes[5] = fives.find((x) =>
      x.split("").every((c) => codes[6].includes(c))
    ) as string;
    removeFromArray(fives, codes[5]);

    codes[2] = fives[0];

    const inverted = invertRecord(codes) as Record<string, string>;
    const toDecode = line
      .split("|")[1]
      .split(" ")
      .filter(Boolean)
      .map((x) =>
        x
          .split("")
          .sort((a, b) => a.localeCompare(b))
          .join("")
      );
    sum += Number(inverted[toDecode[0]]) * 1000;
    sum += Number(inverted[toDecode[1]]) * 100;
    sum += Number(inverted[toDecode[2]]) * 10;
    sum += Number(inverted[toDecode[3]]);

    count++;
  }

  return sum;
}

export default function main() {
  // logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part2);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
