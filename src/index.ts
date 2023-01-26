import { getDay, getYear } from "./scriptHelpers";

const year = getYear();
const day = getDay();

const main = async () => {
  try {
    const { default: aocMain } = await import(
      `./${year}-${day}/${year}-${day}`
    );
    aocMain();
  } catch {
    console.error(`Unable to find file for year ${year} day ${day}`);
  }
};

main();
