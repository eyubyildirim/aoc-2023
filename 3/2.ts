const input = await Bun.file("./input.txt").text();

const lines = input.split("\n");

const m = lines.length;
const n = lines[0].length;

const chars: Map<string, number[]> = new Map();
const getAdjacentCharacters = (
  row: number,
  col: number,
  len: number,
  n: number
) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < len + 2; j++) {
      const line = lines[row - 1 + i];
      if (!line) continue;

      const char = line[col - 1 + j];
      if (!char) continue;

      if (i === 1 && j > 0 && j < len + 1) continue;

      if (char === "*") {
        const currentValues = chars.get(
          `${(row - 1 + i) * 10}${(col - 1 + j) * 10}`
        );
        if (currentValues)
          chars.set(`${(row - 1 + i) * 10}${(col - 1 + j) * 10}`, [
            ...currentValues,
            n,
          ]);
        else chars.set(`${(row - 1 + i) * 10}${(col - 1 + j) * 10}`, [n]);
      }
    }
  }

  return chars;
};

const checkAdjacentToSymbol = (
  i: number,
  j: number,
  len: number,
  n: number
) => {
  const adjacentChars = getAdjacentCharacters(i, j, len, n);

  // const adjacentCharsSet = new Set(adjacentChars);

  // if (adjacentCharsSet.size === 1) {
  //   console.log(adjacentCharsSet, i, j);

  //   return true;
  // } else return false;
  return false;
};

let output = 0;
let total = 0;
// console.log(checkAdjacentToSymbol(0, 5, 3));

lines.forEach((line, i) => {
  const chars = line.split("");

  let currentNumber = "";
  chars.forEach((char, j) => {
    if (!Number.isNaN(Number(char))) {
      currentNumber += char;
    }

    if (Number.isNaN(Number(char)) || j === n - 1) {
      if (currentNumber) {
        total += Number(currentNumber);

        const r = i;
        const c =
          j === n - 1 && !Number.isNaN(Number(char))
            ? j - currentNumber.length + 1
            : j - currentNumber.length;
        const l = currentNumber.length;

        if (checkAdjacentToSymbol(r, c, l, Number(currentNumber))) {
          output += Number(currentNumber);
        }
      }
      currentNumber = "";
    }
  });
});

const keys = [...chars.keys()];
output = [...chars.values()].reduce((total, current, i) => {
  if (current.length === 2) {
    console.log(current, keys[i], total);

    return total + current[0] * current[1];
  } else return total;
}, 0);

console.log(output);
