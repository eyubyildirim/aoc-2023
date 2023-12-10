const input = await Bun.file("./input.txt").text();

const lines = input.split("\n");

const m = lines.length;
const n = lines[0].length;

const getAdjacentCharacters = (row: number, col: number, len: number) => {
  const chars: string[] = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < len + 2; j++) {
      const line = lines[row - 1 + i];
      if (!line) continue;

      const char = line[col - 1 + j];
      if (!char) continue;

      if (i === 1 && j > 0 && j < len + 1) continue;

      if (char) {
        // console.log(i, j, char);

        chars.push(char);
      }
    }
  }

  return chars;
};

const checkAdjacentToSymbol = (i: number, j: number, len: number) => {
  const adjacentChars = getAdjacentCharacters(i, j, len);

  const adjacentCharsSet = new Set(adjacentChars);

  if (adjacentCharsSet.size > 1) {
    return true;
  } else return false;
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

        if (checkAdjacentToSymbol(r, c, l)) {
          output += Number(currentNumber);
        }
      }
      currentNumber = "";
    }
  });
});

console.log(output, total);
