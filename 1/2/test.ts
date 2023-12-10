const numMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

/**
 * @param {string} input
 */
function main(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  const numSpellRegexLt = new RegExp(`(${Object.keys(numMap).join("|")})$`);
  const numSpellRegexRt = new RegExp(`^(${Object.keys(numMap).join("|")})`);
  const digitRegex = new RegExp(`^([0-9])`);

  lines.forEach((line) => {
    let strLeft = "";
    let strRight = "";

    let leftDigit = "";
    let rightDigit = "";

    let i = 0;
    while (!leftDigit || !rightDigit) {
      if (!leftDigit) {
        strLeft += line[i];
        if (line[i].match(digitRegex)) {
          leftDigit = line[i];
        } else if (strLeft.match(numSpellRegexLt)) {
          leftDigit = numMap[strLeft.match(numSpellRegexLt)[0]];
        }
      }

      if (!rightDigit) {
        strRight = line[line.length - i - 1] + strRight;

        if (line[line.length - i - 1].match(digitRegex)) {
          rightDigit = line[line.length - i - 1];
        } else if (strRight.match(numSpellRegexRt)) {
          rightDigit = numMap[strRight.match(numSpellRegexRt)[0]];
        }
      }

      i += 1;
    }

    const numStr = leftDigit + rightDigit;
    console.log(numStr, line);

    sum += Number.parseInt(numStr);
  });

  return sum;
}

console.log(main(await Bun.file("./input.txt").text()));
