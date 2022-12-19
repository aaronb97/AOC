const args = process.argv.slice(2);

const year =
  args.find((x) => x.startsWith("y"))?.split("=")[1] ??
  new Date().getFullYear();

const day =
  args.find((x) => x.startsWith("d"))?.split("=")[1] ?? new Date().getDate();

const main = async () => {
  try {
    const { default: aocMain } = await import(`./${year}/${year}-${day}`);
    aocMain();
  } catch {
    console.error(`Unable to find file for year ${year} day ${day}`);
  }
};

main();
