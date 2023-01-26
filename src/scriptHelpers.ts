/**
 * Chop off first 2 elements in argv. Hover over argv for details
 */
const args = process.argv.slice(2);

export function getYear() {
  const arg = args.find((x) => x.startsWith("y="));
  if (!arg) {
    return new Date().getFullYear();
  }

  return arg.split("=")[1];
}

export function getDay() {
  const arg = args.find((x) => x.startsWith("d="));
  if (!arg) {
    return new Date().getDate();
  }

  return arg.split("=")[1];
}
