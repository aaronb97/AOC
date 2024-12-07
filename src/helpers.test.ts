import { computer, intersect, ints, splitIndex } from "./helpers";

describe("ints", () => {
  it("should return ints in a string", () => {
    expect(ints("3 4 5")).toStrictEqual([3, 4, 5]);
  });
});

describe("intersect", () => {
  it("should return elements common to both sets", () => {
    const set1 = new Set([1, 2, 3, 4]);
    const set2 = new Set([3, 4, 5, 6]);

    const newSet = intersect(set1, set2);
    expect(newSet).toStrictEqual(new Set([3, 4]));
  });
});

describe("splitIndex", () => {
  it("should split a string at a given index", () => {
    expect(splitIndex("abcdef", 4)).toStrictEqual(["abcd", "ef"]);
  });
});

describe("computer", () => {
  it("1", () => {
    expect(computer(ints("1,9,10,3,2,3,11,0,99,30,40,50"))).toBe(3500);
  });
});
