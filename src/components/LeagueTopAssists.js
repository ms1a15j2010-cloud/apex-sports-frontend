"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueTopAssists({
  players = [],
}) {
  if (!players || players.length === 0) {
    return (
      <section className="league-top-assists">

        <h2 className="league-top-assists-title">
          🎯 Top Assists
        </h2>

        <p className="league-top-assists-empty">
          Top assist statistics are unavailable.
        </p>

      </section>
    );
  }

  return (
    <section className="league-top-assists">

      <h2 className="league-top-assists-title">
        🎯 League Top Assists
      </h2>

      <div className="league-top-assists-list">

        {players.map((item, index) => {

          const player = item.player || {};

          const stats =
            item.statistics?.[0] || {};

          const team =
            stats.team || {};

          const goals =
            stats.goals || {};

          const games =
            stats.games || {};

          return (

            <Link
              key={player.id}
              href={`/player/${player.id}`}
              className="league-top-assist-link"
            >

              <div className="league-top-assist-card">

                {/* Rank */}

                <div
                  className="league-top-assist-rank"
                  style={{
                    background:
                      index === 0
                        ? "#22c55e"
                        : index === 1
                        ? "#3b82f6"
                        : index === 2
                        ? "#a855f7"
                        : "#374151",
                  }}
                >
                  {index + 1}
                </div>

                {/* Player */}

                <div className="league-top-assist-player">

                  <Image
                    src={
                      player.photo ||
                      "/player.png"
                    }
                    alt={player.name}
                    width={62}
                    height={62}
                    className="league-top-assist-photo"
                  />

                  <div className="league-top-assist-info">

                    <h3 className="league-top-assist-name">
                      {player.name}
                    </h3>

                    <div className="league-top-assist-team">

                      <Image
                        src={
                          team.logo ||
                          "/team.png"
                        }
                        alt={team.name}
                        width={20}
                        height={20}
                        className="league-top-assist-team-logo"
                      />

                      <span className="league-top-assist-team-name">
                        {team.name}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Stats */}

                <div className="league-top-assist-stats">

                  <Stat
                    value={goals.assists ?? 0}
                    label="Assists"
                  />

                  <Stat
                    value={goals.total ?? 0}
                    label="Goals"
                  />

                  <Stat
                    value={
                      games.appearences ?? 0
                    }
                    label="Apps"
                  />

                </div>

              </div>

            </Link>

          );
        })}

      </div>

    </section>
  );
}

/* ======================================= */

function Stat({
  value,
  label,
}) {
  return (
    <div className="league-top-assist-stat">

      <div className="league-top-assist-stat-value">
        {value}
      </div>

      <div className="league-top-assist-stat-label">
        {label}
      </div>

    </div>
  );
}