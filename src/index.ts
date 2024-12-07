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
  files.forEach(async (fileName) => {
    const filePath = `${__dirname}/${year}-${day}/${fileName}`;

    let history: any[] = [];

    function visualize(toVisualize: string) {
      history.push(toVisualize);
    }

    await logResult(
      `${partLabel} on ${fileName}`,
      filePath,
      chosenPartFn,
      visualize
    );

    if (history.length > 0) {
      console.log("Visualizing...");
      let frame = 0;
      let interval: NodeJS.Timeout | null = null;
      let speed = 500;

      function showFrame() {
        console.clear();
        console.log(
          'Controls: left arrow to go back, right arrow to go forward, up arrow to increase speed, down arrow to decrease speed, "c" to toggle autoplay, Ctrl+C to exit'
        );

        if (interval) {
          console.log("Autoplaying at", speed, "ms per frame");
        }

        console.log("Frame", frame + 1, "of", history.length);
        console.log(history[frame]);
      }

      showFrame();
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (key) => {
        if (key.toString() === "\u001B[C") {
          // right arrow key
          frame++;
          if (frame >= history.length) {
            frame = 0; // loop to the beginning
          }
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
          showFrame();
        } else if (key.toString() === "\u001B[D") {
          // left arrow key
          frame--;
          if (frame < 0) {
            frame = history.length - 1; // loop to the end
          }
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
          showFrame();
        } else if (key.toString() === "\u001B[A") {
          // up arrow key
          speed = Math.max(100, speed - 100); // increase speed
          if (interval) {
            clearInterval(interval);
            interval = setInterval(() => {
              frame++;
              if (frame >= history.length) {
                frame = 0; // loop to the beginning
              }
              showFrame();
            }, speed);
          }
        } else if (key.toString() === "\u001B[B") {
          // down arrow key
          speed += 100; // decrease speed
          if (interval) {
            clearInterval(interval);
            interval = setInterval(() => {
              frame++;
              if (frame >= history.length) {
                frame = 0; // loop to the beginning
              }
              showFrame();
            }, speed);
          }
        } else if (key.toString() === "c") {
          if (interval) {
            clearInterval(interval);
            interval = null;
          } else {
            interval = setInterval(() => {
              frame++;
              if (frame >= history.length) {
                frame = 0; // loop to the beginning
              }
              showFrame();
            }, speed);
          }
        } else if (key.toString() === "\u0003") {
          process.exit();
        }

        showFrame();
      });
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
