import * as fs from "fs";
import * as path from "path";
import { getDay, getYear } from "./scriptHelpers";
import * as readline from "readline";

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const year = getYear();
const day = getDay();

const main = async () => {
  if (day > 25 || day < 1) {
    throw new Error(`${day} is not a valid Advent of Code day`);
  }

  const session = process.env.AOC_SESSION;
  if (!session) {
    throw new Error(
      "AOC_SESSION environment variable not set. Please provide your AoC session token."
    );
  }

  const baseDir = path.join(__dirname, `${year}-${day}`);
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  const templatePath = path.join(__dirname, "template.txt");
  if (!fs.existsSync(templatePath)) {
    throw new Error("Template file not found at: " + templatePath);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const solutionFile = `${baseDir}/${year}-${day}.ts`;
  const testInputFile = `${baseDir}/testInput.txt`;
  const inputFile = `${baseDir}/input.txt`;

  // Only create the solution file if it doesn't exist
  if (!fs.existsSync(solutionFile)) {
    fs.writeFileSync(solutionFile, template);
  } else {
    console.log("Solution file already exists, skipping creation.");
  }

  // Only create the test input if it doesn't exist
  if (!fs.existsSync(testInputFile)) {
    fs.writeFileSync(testInputFile, "1 2 3");
  } else {
    console.log("testInput.txt already exists, skipping creation.");
  }

  // Only fetch input if it does not exist
  if (!fs.existsSync(inputFile)) {
    console.log(`Fetching input for year ${year}, day ${day}...`);

    const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
    const response = await fetch(inputUrl, {
      headers: {
        Cookie: `session=${session};`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch input: ${response.status} ${response.statusText}`
      );
    }

    const inputText = await response.text();
    fs.writeFileSync(inputFile, inputText.trim());
    console.log("Input fetched and saved to input.txt");
  } else {
    console.log("input.txt already exists, skipping fetch.");
  }

  console.log(
    `Setup complete for year ${year} day ${day}. Visit the problem here: https://adventofcode.com/${year}/day/${day}`
  );

  // Prompt user to set AOC_DAY and AOC_YEAR
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `Do you want to set AOC_DAY=${day} and AOC_YEAR=${year} in .env? (y/n) `,
    (answer) => {
      if (answer.toLowerCase() === "y") {
        const envPath = path.join(__dirname, "..", ".env");
        let envFileContent = "";
        if (fs.existsSync(envPath)) {
          envFileContent = fs.readFileSync(envPath, "utf-8");
        }

        // Remove any existing AOC_DAY/AOC_YEAR lines
        const lines = envFileContent.split("\n").filter((line) => {
          return (
            line &&
            !line.startsWith("AOC_DAY=") &&
            !line.startsWith("AOC_YEAR=")
          );
        });

        // Add or update the variables
        lines.push(`AOC_YEAR=${year}`);
        lines.push(`AOC_DAY=${day}`);

        fs.writeFileSync(envPath, lines.join("\n") + "\n", "utf-8");
        console.log(".env updated with AOC_YEAR and AOC_DAY");
      } else {
        console.log("Skipped setting environment variables.");
      }

      rl.close();
    }
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
