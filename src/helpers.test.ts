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
  it("calculate", () => {
    expect(computer(ints("1,9,10,3,2,3,11,0,99,30,40,50"))).toStrictEqual({
      outputs: [],
      result: 3500,
    });
  });

  it("outputs the input", () => {
    const result = ["456"];

    expect(computer(ints("3,0,4,0,99"), { input: 456 }).outputs).toStrictEqual(
      result
    );
  });

  it("compares to 8 (equals)", () => {
    const result = ["1"];

    expect(
      computer(ints("3,9,8,9,10,9,4,9,99,-1,8"), { input: 8 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (not equals)", () => {
    const result = ["0"];

    expect(
      computer(ints("3,9,8,9,10,9,4,9,99,-1,8"), { input: 7 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (less than)", () => {
    const result = ["1"];

    expect(
      computer(ints("3,9,7,9,10,9,4,9,99,-1,8"), { input: 7 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (not less than)", () => {
    const result = ["0"];

    expect(
      computer(ints("3,9,7,9,10,9,4,9,99,-1,8"), { input: 9 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (equals) in immediate mode", () => {
    const result = ["1"];

    expect(
      computer(ints("3,3,1108,-1,8,3,4,3,99"), { input: 8 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (not equals) in immediate mode", () => {
    const result = ["0"];

    expect(
      computer(ints("3,3,1108,-1,8,3,4,3,99"), { input: 7 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (less than) in immediate mode", () => {
    const result = ["1"];

    expect(
      computer(ints("3,3,1107,-1,8,3,4,3,99"), { input: 7 }).outputs
    ).toStrictEqual(result);
  });

  it("compares to 8 (not less than) in immediate mode", () => {
    const result = ["0"];

    expect(
      computer(ints("3,3,1107,-1,8,3,4,3,99"), { input: 9 }).outputs
    ).toStrictEqual(result);
  });

  it("handles jumps, 0 input", () => {
    const result = ["0"];

    expect(
      computer(ints("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"), { input: 0 })
        .outputs
    ).toStrictEqual(result);
  });

  it("handles jumps, non-0 input", () => {
    const result = ["1"];

    expect(
      computer(ints("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"), { input: 345 })
        .outputs
    ).toStrictEqual(result);
  });

  it("handles jumps, 0 input, immediate mode", () => {
    const result = ["0"];

    expect(
      computer(ints("3,3,1105,-1,9,1101,0,0,12,4,12,99,1"), { input: 0 })
        .outputs
    ).toStrictEqual(result);
  });

  it("handles jumps, non-0 input, immediate mode", () => {
    const result = ["1"];

    expect(
      computer(ints("3,3,1105,-1,9,1101,0,0,12,4,12,99,1"), { input: 345 })
        .outputs
    ).toStrictEqual(result);
  });

  const complicatedProgram = `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`;

  it("handles complicated program less than case", () => {
    const result = ["999"];

    expect(computer(complicatedProgram, { input: 7 }).outputs).toStrictEqual(
      result
    );
  });

  it("handles complicated program equals case", () => {
    const result = ["1000"];

    expect(computer(complicatedProgram, { input: 8 }).outputs).toStrictEqual(
      result
    );
  });

  it("handles complicated program greater than case", () => {
    const result = ["1001"];

    expect(computer(complicatedProgram, { input: 9 }).outputs).toStrictEqual(
      result
    );
  });
});
