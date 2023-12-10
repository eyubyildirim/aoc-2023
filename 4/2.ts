const input = await Bun.file("./input.txt").text();

const games = input.split("\n");

const unprocessedGames = [...games];
const processedGames: string[] = [];

let total = 0;

const getMatchCount = (game: string) => {
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

  return intersect.length;
};
// let count = 200;
while (1) {
  const currentGame = unprocessedGames.shift();

  if (!currentGame) break;

  console.log(unprocessedGames.length);

  processedGames.push(currentGame);

  const currentMatchCount = getMatchCount(currentGame);

  const gameIndex = Number(currentGame.split(": ")[0].split(/\s+/g)[1]) - 1;
  // console.log(gameIndex);

  for (let i = 0; i < currentMatchCount; i++) {
    const gameToAdd = games[gameIndex + i + 1];

    if (gameToAdd) unprocessedGames.push(gameToAdd);
  }
}

console.log(processedGames.sort().length);
