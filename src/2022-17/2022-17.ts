import { logResult } from "../logResult";

type Grid = Record<string, boolean>;
const X = 0;
const Y = 1;

function toGrid(piece: number[]) {
  return `${piece[0]},${piece[1]}`;
}

function canMoveLeft(piece: number[][], grid: Grid) {
  for (const subpiece of piece) {
    if (grid[`${subpiece[X] - 1},${subpiece[Y]}`]) {
      return false;
    }

    if (subpiece[X] === 0) {
      return false;
    }
  }

  return true;
}

function moveLeft(piece: number[][]) {
  for (const subpiece of piece) {
    subpiece[X]--;
  }
}

function moveRight(piece: number[][]) {
  for (const subpiece of piece) {
    subpiece[X]++;
  }
}

function canMoveRight(piece: number[][], grid: Grid) {
  for (const subpiece of piece) {
    if (grid[`${subpiece[X] + 1},${subpiece[Y]}`]) {
      return false;
    }

    if (subpiece[X] === 6) {
      return false;
    }
  }

  return true;
}

function canMoveDown(piece: number[][], grid: Grid) {
  for (const subpiece of piece) {
    if (grid[`${subpiece[X]},${subpiece[Y] - 1}`]) {
      return false;
    }
  }

  return true;
}

function moveDown(piece: number[][]) {
  for (const subpiece of piece) {
    subpiece[Y]--;
  }
}

function addToGrid(piece: number[][], grid: Grid) {
  for (const subpiece of piece) {
    grid[`${subpiece[X]},${subpiece[Y]}`] = true;
  }
}

function maxY(piece: number[][]) {
  let max = 0;
  for (const subpiece of piece) {
    max = Math.max(max, subpiece[Y]);
  }

  return max;
}

function printGrid(piece: number[][], grid: Grid, max: number) {
  let line = "";
  for (let y = max; y >= 0; y--) {
    for (let x = 0; x < 7; x++) {
      if (grid[`${x},${y}`]) {
        line += "#";
      } else if (
        piece.some((subpiece) => subpiece[X] === x && subpiece[Y] === y)
      ) {
        line += "@";
      } else {
        line += ".";
      }
    }

    line += ` ${y} \n`;
  }

  line += "\n-------\n";

  console.log(line);
}

function part1(input: string) {
  const pieces = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ];

  let prev = -1;
  let max = -1;

  const grid: Record<string, boolean> = {
    "0,-1": true,
    "1,-1": true,
    "2,-1": true,
    "3,-1": true,
    "4,-1": true,
    "5,-1": true,
    "6,-1": true,
  };

  let windStep = -1;
  let output = "";

  for (let i = 0; i < 10000; i++) {
    output += max - prev;
    const piece = [];
    for (const subPiece of pieces[i % pieces.length]) {
      piece.push([subPiece[X] + 2, subPiece[Y] + max + 4]);
    }
    if ((i - 200) % 1700 === 0) {
      console.log(max, i);
    }

    while (true) {
      //   if (i % pieces.length === 0 && windStep % input.length === 2) {
      //     console.log(max, i);
      //   }
      windStep++;
      //   console.log(i % pieces.length, windStep % input.length);
      //   printGrid(piece, grid, max + 5);
      if (input[windStep % input.length] === "<") {
        if (canMoveLeft(piece, grid)) {
          moveLeft(piece);
        }
      } else {
        if (canMoveRight(piece, grid)) {
          moveRight(piece);
        }
      }

      if (canMoveDown(piece, grid)) {
        moveDown(piece);
      } else {
        addToGrid(piece, grid);
        prev = max;
        max = Math.max(max, maxY(piece));
        break;
      }
    }
  }
  //1561176470549
  //1561176470569
  //1561176470590
  //1561176485894

  return max + 1;
}

export default function main() {
  //   logResult("Test", __dirname + "/testInput.txt", part1);
  logResult("Main", __dirname + "/input.txt", part1);
  // logResult("Test", __dirname + "/input.txt", part1);
  // logResult("Test", __dirname + "/testInput.txt", part2);
  //   logResult("Main", __dirname + "/input.txt", part2);
}
