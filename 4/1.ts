const input = await Bun.file("./input.txt").text();

const games = input.split("\n");

let total = 0;

games.forEach((game) => {
  const winningNumbers = game
    .split(": ")[1]
    .split(" | ")[0]
    .trim()
    .replace(/\s+/g, " ")
    .split(" ");
  const numbers = game
    .split(": ")[1]
    .split(" | ")[1]
    .trim()
    .replace(/\s+/g, " ")
    .split(" ");

  const intersect = winningNumbers.filter((v) => numbers.includes(v));

  if (intersect.length > 0) {
    total += Math.pow(2, intersect.length - 1);
  }
});

console.log(total);
