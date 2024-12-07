/**
 * Return all numbers in a string
 */
export function ints(str: string) {
  let numbers = [];
  let currentNumber = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (/[0-9-]/.test(char)) {
      currentNumber += char;
    } else {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
      }
      currentNumber = "";
    }
  }
  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }
  return numbers;
}

export function isNumber(str: string) {
  return !isNaN(Number(str));
}

export function singleInts(str: string) {
  return str.match(/\d/g)?.map(Number);
}

export function intersect(set1: Set<unknown>, set2: Set<unknown>) {
  const intersect = new Set();
  for (const x of Array.from(set1)) {
    if (set2.has(x)) intersect.add(x);
  }

  return intersect;
}

export function union(set1: Set<unknown>, set2: Set<unknown>) {
  const union = new Set();
  for (const x of Array.from(set1)) {
    union.add(x);
  }

  for (const x of Array.from(set2)) {
    union.add(x);
  }

  return union;
}

export function splitIndex(str: string, index: number) {
  return [str.slice(0, index), str.slice(index)];
}

export function areCoordinatesAdjacent(
  coord1: [number, number],
  coord2: [number, number]
): boolean {
  // Check if the coordinates are adjacent
  return (
    Math.abs(coord1[0] - coord2[0]) <= 1 && Math.abs(coord1[1] - coord2[1]) <= 1
  );
}

export function convertStringNumber(input: string): string | number {
  const num = Number(input);
  if (!isNaN(num)) {
    return num;
  } else {
    return input;
  }
}

export function logObject(...objs: unknown[]) {
  console.log(...objs.map((obj) => JSON.parse(JSON.stringify(obj))));
}

export function gridToString(grid: unknown[][]) {
  return grid.map((row) => row.join("")).join("\n");
}

export function printGrid(grid: unknown[][]) {
  console.log("\n");
  console.log(grid.map((row) => row.join("")).join("\n"));
  console.log("\n");
}

export function createGrid<T>(x: number, y?: number, value?: T): T[][] {
  if (y === undefined) y = x;

  const grid: T[][] = [];
  for (let i = 0; i < x; i++) {
    grid[i] = [];

    if (value !== undefined) {
      for (let j = 0; j < y; j++) {
        grid[i][j] = value;
      }
    }
  }
  return grid;
}

export function stringTo2DArray<T = string>(
  str: string,
  transformer: (c: string) => T = (c) => c as T
): T[][] {
  const rows = str.split("\n");
  return rows.map((row) => row.split("").map(transformer));
}

export function range(x: number, y: number): number[] {
  const arr: number[] = [];
  if (y >= x) {
    for (let i = x; i <= y; i++) {
      arr.push(i);
    }
  } else {
    for (let i = x; i >= y; i--) {
      arr.push(i);
    }
  }
  return arr;
}

export function inRange(test: number, low: number, high: number) {
  return test >= low && test <= high;
}

export function swap<T>(x: T, y: T): [T, T] {
  return [y, x];
}

export function arrayToString(arr: unknown[][]) {
  return arr.map((row) => row.join("")).join("\n");
}

export function sum(arr: number[]) {
  return arr.reduce((total, current) => total + current, 0);
}

export function last<T>(arr: T[]) {
  if (arr.length === 0) {
    throw new Error("Cannot get last element of empty array");
  }

  return arr[arr.length - 1] as T;
}

export function mod(n: number, m: number) {
  const remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
}

export const invertRecord = (
  record: Record<string, any>
): Record<any, string> => {
  return Object.entries(record).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<any, string>);
};

export const removeFromArray = <T>(array: T[], el: T) => {
  array.splice(array.indexOf(el), 1);
};

export function isLowerCase(s: string) {
  return s.toLowerCase() === s;
}

export function getPermutations<T>(arr: T[]): T[][] {
  const result: T[][] = [];

  function permute(prefix: T[], remaining: T[]): void {
    if (remaining.length === 0) {
      result.push(prefix);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const chosen = remaining[i];
      const newRemaining = [
        ...remaining.slice(0, i),
        ...remaining.slice(i + 1),
      ];
      permute([...prefix, chosen], newRemaining);
    }
  }

  permute([], arr);

  return result;
}

export function splitArrayAtIndex<T>(arr: T[], index: number): [T[], T[]] {
  if (index < 0 || index > arr.length) {
    throw new Error("Index out of bounds");
  }

  const left = arr.slice(0, index);
  const right = arr.slice(index);
  return [left, right];
}

export const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export const DIAG_DIRS_ONLY = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

export const DIAG_DIRS = [...DIRS, ...DIAG_DIRS_ONLY];

export function computer(nums: number[], input1?: number, input2?: number) {
  nums = [...nums];
  if (input1) {
    nums[1] = input1;
  }

  if (input2) {
    nums[2] = input2;
  }

  for (let i = 0; i < nums.length; i += 4) {
    const num1 = nums[nums[i + 1]];
    const num2 = nums[nums[i + 2]];
    const storeIndex = nums[i + 3];

    if (nums[i] === 1) {
      nums[storeIndex] = num1 + num2;
    } else if (nums[i] === 2) {
      nums[storeIndex] = num1 * num2;
    } else if (nums[i] === 99) {
      break;
    } else {
      return -1;
    }
  }

  return nums[0];
}

//TODO: add more helpers
