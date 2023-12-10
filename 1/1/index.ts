const inputFile = Bun.file("./input.txt");

const input = await inputFile.text();
let output = 0;

input.split("\n").forEach((line) => {
  let calibrationNumbers = [];
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (!Number.isNaN(Number(ch))) {
      calibrationNumbers.push(ch);
    }
  }

  const calibrationNumber = Number(
    calibrationNumbers[0] + calibrationNumbers[calibrationNumbers.length - 1]
  );

  output += calibrationNumber;
});

console.log(output);
