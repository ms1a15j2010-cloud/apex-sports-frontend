"use client";

export default function LeagueTopCards({ players = [] }) {
  return (
    <section className="league-top-cards">

      <h2 className="league-top-cards-title">
        🟥 Top Cards
      </h2>

      {players.length === 0 ? (
        <div className="league-top-cards-empty">
          No card statistics available.
        </div>
      ) : (
        <div className="league-top-cards-list">

          {players.map((player, index) => (

            <div
              key={player.player?.id || index}
              className="league-top-card"
            >

              <div className="league-top-card-rank">
                #{index + 1}
              </div>

              <div className="league-top-card-name">
                {player.player?.name}
              </div>

              <div className="league-top-card-stats">

                <span className="yellow-card">
                  🟨 {player.statistics?.[0]?.cards?.yellow || 0}
                </span>

                <span className="red-card">
                  🟥 {player.statistics?.[0]?.cards?.red || 0}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}