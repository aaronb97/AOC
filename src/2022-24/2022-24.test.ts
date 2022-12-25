import { Grid, processGrid } from "./2022-24";

function createGrid(width: number, height: number) {
  const grid: Grid = {};

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      grid[`${i},${j}`] = {};
    }
  }

  return grid;
}

describe("processGrid", () => {
  test("moving right", () => {
    const grid = createGrid(10, 10);
    grid["2,2"].right = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["2,2"]).toStrictEqual({});
    expect(newGrid["3,2"]?.right).toBe(true);
  });

  test("moving right at boundary", () => {
    const grid = createGrid(10, 10);
    grid["8,2"].right = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["8,2"]).toStrictEqual({});
    expect(newGrid["9,2"].right).toBeFalsy();
    expect(newGrid["1,2"]?.right).toBe(true);
  });

  test("moving left", () => {
    const grid = createGrid(10, 10);
    grid["5,5"].left = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["5,5"]).toStrictEqual({});
    expect(newGrid["4,5"]?.left).toBe(true);
  });

  test("moving left at boundary", () => {
    const grid = createGrid(10, 10);
    grid["1,5"].left = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["1,5"]).toStrictEqual({});
    expect(newGrid["0,5"].left).toBeFalsy();
    expect(newGrid["8,5"]?.left).toBe(true);
  });

  test("moving up", () => {
    const grid = createGrid(10, 10);
    grid["5,5"].up = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["5,5"]).toStrictEqual({});
    expect(newGrid["5,4"]?.up).toBe(true);
  });

  test("moving up at boundary", () => {
    const grid = createGrid(10, 10);
    grid["1,1"].up = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["1,1"]).toStrictEqual({});
    expect(newGrid["1,0"].up).toBeFalsy();
    expect(newGrid["1,8"]?.up).toBe(true);
  });

  test("moving down", () => {
    const grid = createGrid(10, 10);
    grid["5,5"].down = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["5,5"]).toStrictEqual({});
    expect(newGrid["5,6"]?.down).toBe(true);
  });

  test("moving down at boundary", () => {
    const grid = createGrid(10, 10);
    grid["5,8"].down = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["5,8"]).toStrictEqual({});
    expect(newGrid["5,9"].down).toBeFalsy();
    expect(newGrid["5,1"]?.down).toBe(true);
  });

  test("moving right and left", () => {
    const grid = createGrid(10, 10);
    grid["5,5"].right = true;
    grid["5,5"].left = true;

    const newGrid = processGrid(grid, 10, 10);
    expect(newGrid["5,5"]).toStrictEqual({});
    expect(newGrid["6,5"].right).toBe(true);
    expect(newGrid["4,5"].left).toBe(true);
  });
});
