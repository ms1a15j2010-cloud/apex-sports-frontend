export function parseFormation(startXI = []) {
  return startXI
    .filter((player) => player.grid)
    .map((player) => {
      const [row, column] = player.grid
        .split(":")
        .map(Number);

      const stats = player.statistics || {};

      return {
        id: player.id,
        name: player.name,
        number: player.number,
        photo: player.photo,

        row,
        column,

        captain: player.captain || false,

        rating:
          stats.games?.rating ||
          player.rating ||
          null,

        goals:
          stats.goals?.total || 0,

        assists:
          stats.goals?.assists || 0,

        yellow:
          stats.cards?.yellow || 0,

        red:
          stats.cards?.red || 0,

        minutes:
          stats.games?.minutes || 0,

        position:
          player.pos || "",
      };
    });
}