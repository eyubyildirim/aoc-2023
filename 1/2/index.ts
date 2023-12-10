const inputFile = Bun.file("./input.txt");

const input = await inputFile.text();

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let output = 0;
const lines = input.split("\n");
let logged = 0;

lines.forEach((line) => {
  let calibrationNumbers = [];
  let str = "";

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (!Number.isNaN(Number(ch))) {
      calibrationNumbers.push(ch);
      if (str.length > 0) str = str[str.length - 1];
    } else {
      str += ch;

      let isDigit = "";
      if (
        digits.some((d) => {
          if (str.includes(d)) {
            isDigit = d;
            return true;
          }

          return false;
        })
      ) {
        if (str.length > 0) str = str[str.length - 1];

        calibrationNumbers.push(String(digits.indexOf(isDigit) + 1));
      }
    }
  }

  console.log(
    Number(
      calibrationNumbers[0] + calibrationNumbers[calibrationNumbers.length - 1]
    ),
    // calibrationNumbers.join(""),
    line
  );
  logged++;

  output += Number(
    calibrationNumbers[0] + calibrationNumbers[calibrationNumbers.length - 1]
  );
});

console.log(output, logged);
