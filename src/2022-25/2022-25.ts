import { logResult } from "../logResult";

function part1(input: string) {
  const split = input.split("\n");
  let sum = 0;

  for (const line of split) {
    sum += fromSnafu(line);
  }

  return toSnafu(sum);
}

export function fromSnafu(snafu: string) {
  const array = snafu.split("").reverse();
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "-") array[i] = "-1";
    if (array[i] === "=") array[i] = "-2";
    sum += Math.pow(5, i) * Number(array[i]);
  }

  return sum;
}

export function toSnafu(num: number) {
  let power = 0;

  let snafu: string[] = [];

  while (num > 0) {
    const res = num % 5;
    if (res === 3) {
      num += 2;
      snafu.push("=");
    } else if (res === 4) {
      num += 2;
      snafu.push("-");
    } else {
      snafu.push(String(res));
    }

    num = Math.floor(num / 5);
  }

  return snafu.reverse().join("");
}

function part2(input: string) {}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
