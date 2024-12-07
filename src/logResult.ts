import * as fs from "fs";
import { performance } from "perf_hooks";

/**
 * Get the text input and resolve it as a string
 */
function processFile(path: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data.toString());
    });
  });
}

export function logResult(
  label: string,
  path: string,
  cb: (input: string, ...args: unknown[]) => unknown,
  ...args: unknown[]
): Promise<void> {
  return processFile(path).then((res) => {
    const time1 = performance.now();
    const result = cb(res, ...args);
    const time2 = performance.now();
    const formattedTime = ((time2 - time1) / 1000).toPrecision(3);
    console.log(`${label} (${formattedTime}s):`, result);
  });
}
