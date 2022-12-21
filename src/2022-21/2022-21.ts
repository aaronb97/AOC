import { ints } from "../helpers";
import { logResult } from "../logResult";

const operatorMap: Record<string, (a: number, b: number) => number> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function part1(input: string) {
  const split = input.split("\n");

  const memo: Record<string, string[] | number> = {};

  for (const line of split) {
    const [left, right] = line.split(": ");
    const rightSplit = right.split(" ");
    if (rightSplit.length === 1) {
      memo[left] = Number(rightSplit[0]);
    } else {
      memo[left] = rightSplit;
    }
  }

  const recurse = (monkey: string): number => {
    const result = memo[monkey];
    if (!result) throw new Error("Something happened " + monkey);

    if (typeof result === "number") {
      return result;
    }

    const newResult = operatorMap[result[1]](
      recurse(result[0]),
      recurse(result[2])
    );
    memo[monkey] = newResult;
    return newResult;
  };

  return recurse("root");
}

function part2(input: string) {}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
