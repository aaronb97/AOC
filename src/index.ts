import { getDay, getYear } from "./scriptHelpers";
import { logResult } from "./logResult";

async function main() {
  const year = getYear();
  const day = getDay();

  console.log(`Starting run for year ${year} day ${day}`);

  // Parse arguments
  const args = process.argv.slice(2);
  const partArg = args.find((arg) => arg.startsWith("--part="));
  const filesArg = args.find((arg) => arg.startsWith("--files="));

  if (!partArg || !filesArg) {
    console.log(
      "Usage: node index.js --part=1|2 --files=file1.txt,file2.txt,..."
    );
    console.log(
      "Example: node index.js --part=1 --files=testInput.txt,input.txt"
    );
    return;
  }

  const partValue = partArg.split("=")[1];
  const filesValue = filesArg.split("=")[1];

  if (partValue !== "1" && partValue !== "2") {
    console.log("Invalid part specified. Use --part=1 or --part=2.");
    return;
  }

  if (!filesValue) {
    console.log("No files specified. Provide at least one file after --files=");
    return;
  }

  const files = filesValue
    .split(",")
    .map((file) => file.trim())
    .filter(Boolean);
  if (files.length === 0) {
    console.log("No valid files provided.");
    return;
  }

  // Dynamically import part1 and part2 functions from the correct year-day file
  let part1: (input: string) => unknown, part2: (input: string) => unknown;
  try {
    const module = await import(`./${year}-${day}/${year}-${day}`);
    part1 = module.part1;
    part2 = module.part2;
  } catch {
    console.error(`Unable to find file for year ${year} day ${day}`);
    return;
  }

  // Determine which function to run
  const chosenPartFn = partValue === "1" ? part1 : part2;
  const partLabel = partValue === "1" ? "Part 1" : "Part 2";

  if (!chosenPartFn) {
    console.error(
      `Part ${partValue} not found in ${year}-${day}. Is your function exported?`
    );
    return;
  }

  // Run the chosen part on each specified file
  files.forEach((fileName) => {
    const filePath = `${__dirname}/${year}-${day}/${fileName}`;
    logResult(`${partLabel} on ${fileName}`, filePath, chosenPartFn);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
