import { logResult } from "./logResult";
import { ints } from "./helpers";

function main(input: string, ...args: unknown[]) {
  console.log(args[0]);
  let sum = 0;
  const split = input.split("\n");

  for (const line of split) {
    console.log(line, ints(line));
  }

  return sum;
}

logResult("Main", "inputs/input.txt", main, 1);
logResult("Test", "inputs/testInput.txt", main);
