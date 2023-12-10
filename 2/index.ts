const input = await Bun.file("./input.txt").text();

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = input.split("\n");

let output = 0;
let total = 0;

games.forEach((game) => {
  const [gameId, setBlock] = game.split("Game ")[1].split(": ");
  const sets = setBlock.split("; ");

  const minCubeCount = {
    red: 0,
    green: 0,
    blue: 0,
  };

  total += Number(gameId);

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];

    const cubes = set.split(", ");
    for (let j = 0; j < cubes.length; j++) {
      const cube = cubes[j];
      const [value, color] = cube.split(" ");

      if (Number(value) > minCubeCount[color as keyof typeof minCubeCount]) {
        minCubeCount[color as keyof typeof minCubeCount] = Number(value);
      }
    }
  }

  output += minCubeCount.red * minCubeCount.green * minCubeCount.blue;
});
console.log(output);
