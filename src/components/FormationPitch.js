"use client";

export default function FormationPitch({ lineup }) {
  if (!lineup || !lineup.startXI || lineup.startXI.length === 0) {
    return (
      <div className="pitch-empty">
        Formation unavailable.
      </div>
    );
  }

  const formation = lineup.formation || "Unknown";

  // const goalkeeper = lineup.startXI.find(
  //   (p) => p.player.grid === "1:1"
  // );

  const rows = {};

  lineup.startXI.forEach((p) => {
    if (!p.player?.grid) return;

    const [row] = p.player.grid.split(":");

    if (!rows[row]) rows[row] = [];

    rows[row].push(p);
  });

  return (
    <div className="formation-wrapper">

      <h3 className="formation-title">
        Formation • {formation}
      </h3>

      <div className="football-pitch">

        {Object.keys(rows)
          .sort((a, b) => Number(a) - Number(b))
          .map((row) => (
            <div
              className="pitch-row"
              key={row}
            >
              {rows[row].map((player) => (
                <div
                  key={player.player.id || player.player.name}
                  className="pitch-player"
                >
                  <div className="shirt">
                    {player.player.number}
                  </div>

                  <span>
                    {player.player.name}
                  </span>
                </div>
              ))}
            </div>
          ))}

      </div>

    </div>
  );
}