import * as fs from "fs";

const args = process.argv.slice(2);

const year =
  args.find((x) => x.startsWith("y"))?.split("=")[1] ??
  new Date().getFullYear();

const day =
  args.find((x) => x.startsWith("d"))?.split("=")[1] ?? new Date().getDate();

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
