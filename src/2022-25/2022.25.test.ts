import { fromSnafu, toSnafu } from "./2022-25";

describe("fromSnafu", () => {
  test("1", () => {
    expect(fromSnafu("1")).toBe(1);
  });

  test("2", () => {
    expect(fromSnafu("2")).toBe(2);
  });

  test("3", () => {
    expect(fromSnafu("1=")).toBe(3);
  });

  test("4", () => {
    expect(fromSnafu("1-")).toBe(4);
  });

  test("15", () => {
    expect(fromSnafu("1=0")).toBe(15);
  });

  test("2022", () => {
    expect(fromSnafu("1=11-2")).toBe(2022);
  });

  test("1121-1110-1=0", () => {
    expect(fromSnafu("1121-1110-1=0")).toBe(314159265);
  });
});

describe("toSnafu", () => {
  test("1", () => {
    expect(toSnafu(1)).toBe("1");
  });

  test("2", () => {
    expect(toSnafu(2)).toBe("2");
  });

  test("3", () => {
    expect(toSnafu(3)).toBe("1=");
  });

  test("4", () => {
    expect(toSnafu(4)).toBe("1-");
  });

  test("5", () => {
    expect(toSnafu(5)).toBe("10");
  });

  test("10", () => {
    expect(toSnafu(10)).toBe("20");
  });

  test("2022", () => {
    expect(toSnafu(2022)).toBe("1=11-2");
  });

  test("314159265", () => {
    expect(toSnafu(314159265)).toBe("1121-1110-1=0");
  });
});
