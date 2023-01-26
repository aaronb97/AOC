import * as fs from "fs";
import { getDay, getYear } from "./scriptHelpers";

const year = getYear();
const day = getDay();

const main = async () => {
  if (day > 25) throw new Error(day + " Not a valid advent of code day");

  const template = fs.readFileSync(__dirname + "/template.txt");

  const baseDir = __dirname + `/${year}-${day}`;
  if (fs.existsSync(baseDir)) {
    throw new Error(`${baseDir} already exists`);
  }

  fs.mkdirSync(baseDir);

  fs.writeFileSync(`${baseDir}/${year}-${day}.ts`, template);
  fs.writeFileSync(`${baseDir}/testInput.txt`, "1 2 3");
  fs.writeFileSync(`${baseDir}/input.txt`, "1 2 3 4 5");

  console.log(`Generated files for year ${year} day ${day}`);
};

main();
