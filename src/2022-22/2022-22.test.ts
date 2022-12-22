import { nextCoords, RIGHT, UP, DOWN, LEFT } from "./2022-22";

test("3 to 2", () => {
  expect(nextCoords([99, 80], RIGHT)).toStrictEqual([[130, 49], UP]);
});

test("2 to 3", () => {
  expect(nextCoords([130, 49], DOWN)).toStrictEqual([[99, 80], LEFT]);
});

test("2 to 5", () => {
  expect(nextCoords([149, 20], RIGHT)).toStrictEqual([[99, 130], LEFT]);
});

test("5 to 2", () => {
  expect(nextCoords([99, 130], RIGHT)).toStrictEqual([[149, 20], LEFT]);
});

test("4 to 3", () => {
  expect(nextCoords([20, 100], UP)).toStrictEqual([[50, 70], RIGHT]);
});

test("3 to 4", () => {
  expect(nextCoords([50, 70], LEFT)).toStrictEqual([[20, 100], DOWN]);
});

test("6 to 5", () => {
  expect(nextCoords([49, 170], RIGHT)).toStrictEqual([[70, 149], UP]);
});

test("5 to 6", () => {
  expect(nextCoords([70, 149], DOWN)).toStrictEqual([[49, 170], LEFT]);
});

test("1 to 6", () => {
  expect(nextCoords([70, 0], UP)).toStrictEqual([[0, 170], RIGHT]);
});

test("6 to 1", () => {
  expect(nextCoords([0, 170], LEFT)).toStrictEqual([[70, 0], DOWN]);
});

test("6 to 2", () => {
  expect(nextCoords([20, 199], DOWN)).toStrictEqual([[120, 0], DOWN]);
});

test("2 to 6", () => {
  expect(nextCoords([120, 0], UP)).toStrictEqual([[20, 199], UP]);
});

test("1 to 4", () => {
  expect(nextCoords([50, 10], LEFT)).toStrictEqual([[0, 140], RIGHT]);
});

test("4 to 1", () => {
  expect(nextCoords([0, 140], LEFT)).toStrictEqual([[50, 10], RIGHT]);
});

test("base case 1", () => {
  expect(nextCoords([75, 75], DOWN)).toStrictEqual([[75, 76], DOWN]);
});

test("base case 2", () => {
  expect(nextCoords([75, 75], UP)).toStrictEqual([[75, 74], UP]);
});

test("base case 3", () => {
  expect(nextCoords([75, 75], LEFT)).toStrictEqual([[74, 75], LEFT]);
});

test("base case 4", () => {
  expect(nextCoords([75, 75], RIGHT)).toStrictEqual([[76, 75], RIGHT]);
});
