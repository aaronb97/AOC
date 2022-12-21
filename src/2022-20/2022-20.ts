import { ints } from "../helpers";
import { logResult } from "../logResult";

function part1(input: string) {
  const nums = ints(input);

  const numObjs = nums.map((num) => ({ value: num }));
  const queue = numObjs.map((obj) => obj);

  while (queue.length) {
    const e = queue.shift();
    if (!e) throw new Error("something happened");

    const index = numObjs.indexOf(e);
    const newIndex = (index + e.value) % (numObjs.length - 1);

    numObjs.splice(index, 1);
    numObjs.splice(newIndex, 0, e);
  }

  const start = numObjs.findIndex((x) => x.value === 0);

  return (
    numObjs[(start + 1000) % numObjs.length].value +
    numObjs[(start + 2000) % numObjs.length].value +
    numObjs[(start + 3000) % numObjs.length].value
  );
}

function part2(input: string) {}

export default function main() {
  logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  //   logResult("Main", __dirname + "/testInput.txt", part2);
  //   logResult("Test", __dirname + "/input.txt", part2);
}
