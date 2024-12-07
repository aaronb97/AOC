/**
 * Chop off first 2 elements in argv. Hover over argv for details
 */
const args = process.argv.slice(2);

require("dotenv").config();

export function getYear() {
  const arg = args.find((x) => x.startsWith("y="));
  if (arg) {
    return Number(arg.split("=")[1]);
  }

  if (process.env.AOC_YEAR) {
    return Number(process.env.AOC_YEAR);
  }

  return new Date().getFullYear();
}

export function getDay() {
  const arg = args.find((x) => x.startsWith("d="));
  if (arg) {
    return Number(arg.split("=")[1]);
  }

  if (process.env.AOC_DAY) {
    return Number(process.env.AOC_DAY);
  }

  return new Date().getDate();
}
