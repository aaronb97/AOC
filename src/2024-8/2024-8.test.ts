import { part1, part2 } from "./2024-8";

describe("part1", () => {
  it("1", () => {
    expect(
      part1(`..........
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........`)
    ).toBe(2);
  });

  it("2", () => {
    expect(
      part1(`..........
..........
..........
....a.....
...a......
.....a....
..........
..........
..........
..........`)
    ).toBe(6);
  });

  it("3", () => {
    expect(
      part1(`..........
..........
..........
....a.....
........a.
.....a....
..........
..........
..........
..........`)
    ).toBe(4);
  });

  it("4", () => {
    expect(
      part1(`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`)
    ).toBe(14);
  });
});

describe("part2", () => {
  it("1", () => {
    expect(
      part2(`T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`)
    ).toBe(9);
  });

  it("2", () => {
    expect(
      part2(`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`)
    ).toBe(34);
  });
});
