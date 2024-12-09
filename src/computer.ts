import { ints } from "./helpers";

interface Params {
  p1: number;
  p2: number;
  p3: number;
  input: number;
}

function executeOpcode(
  opCode: number,
  nums: number[],
  index: number,
  { p1, p2, p3, input }: Params
): {
  index: number;
  output?: string | number;
  detail?: string;
  usedInput?: boolean;
} {
  // ADD
  if (opCode === 1) {
    nums[p3] = nums[p1] + nums[p2];

    return { index: index + 4 };
  }

  // MULTIPLY
  if (opCode === 2) {
    nums[p3] = nums[p1] * nums[p2];

    return { index: index + 4 };
  }

  if (opCode === 3) {
    nums[p1] = input;

    return { index: index + 2, usedInput: true };
  }

  // PRINT
  if (opCode === 4) {
    return { index: index + 2, output: nums[p1] };
  }

  // JUMP IF TRUE
  if (opCode === 5) {
    if (nums[p1] !== 0) {
      return { index: nums[p2] };
    } else {
      return { index: index + 3 };
    }
  }

  // JUMP IF FALSE
  if (opCode === 6) {
    if (nums[p1] === 0) {
      return { index: nums[p2] };
    } else {
      return { index: index + 3 };
    }
  }

  // LESS THAN
  if (opCode === 7) {
    if (nums[p1] < nums[p2]) {
      nums[p3] = 1;
    } else {
      nums[p3] = 0;
    }

    return { index: index + 4 };
  }

  // EQUALS
  if (opCode === 8) {
    if (nums[p1] === nums[p2]) {
      nums[p3] = 1;
    } else {
      nums[p3] = 0;
    }

    return { index: index + 4 };
  }

  if (opCode === 99) {
    return { index: -1, output: "break" };
  }

  return {
    index: -1,
    output: "error",
    detail: `${opCode} is not a valid opCode`,
  };
}

interface Options {
  overrides?: Record<number, number>;
  input?: number | number[];
  _visualize?: (something: unknown) => void;
}

export function computer(nums: number[] | string, options: Options = {}) {
  if (typeof nums === "string") {
    nums = ints(nums);
  }

  nums = [...nums];

  for (const override of Object.entries(options.overrides ?? [])) {
    nums[Number(override[0])] = override[1];
  }

  const outputs: string[] = [];

  function readOpcode(num: number) {
    const pModes: Record<string, "position" | "immediate"> = {
      "0": "position",
      "1": "immediate",
    };

    const numArray = num.toString().split("");
    while (numArray.length < 5) {
      numArray.unshift("0");
    }

    return {
      opCode: Number(numArray[3]) * 10 + Number(numArray[4]),
      p1Mode: pModes[numArray[2]],
      p2Mode: pModes[numArray[1]],
      p3Mode: pModes[numArray[0]],
    };
  }

  let i = 0;
  let loops = 0;

  let inputCounter = 0;

  while (true) {
    loops++;
    if (loops >= 10000) {
      return { outputs: ["exceeded 10000 loops"] };
    }

    if (i >= nums.length) {
      return { outputs: ["instruction pointer exceeded nums"] };
    }

    const { opCode, p1Mode, p2Mode, p3Mode } = readOpcode(nums[i]);

    const i1 = i + 1;
    const i2 = i + 2;
    const i3 = i + 3;

    const p1 = p1Mode === "immediate" ? i1 : nums[i1];
    const p2 = p2Mode === "immediate" ? i2 : nums[i2];
    const p3 = p3Mode === "immediate" ? i3 : nums[i3];

    const { index, output, detail, usedInput } = executeOpcode(
      opCode,
      nums,
      i,
      {
        p1,
        p2,
        p3,
        input: Array.isArray(options.input)
          ? options.input[inputCounter]
          : options.input ?? -1,
      }
    );

    if (usedInput) inputCounter++;

    if (output === "error") {
      console.error("error:", detail);
      break;
    } else if (output === "break") {
      break;
    } else if (output !== undefined) {
      outputs.push(output.toString());
    }

    i = index;
  }

  return { outputs, result: nums[0] };
}
