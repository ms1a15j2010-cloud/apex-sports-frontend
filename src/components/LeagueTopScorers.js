"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueTopScorers({
  players = [],
}) {
  if (!players || players.length === 0) {
    return (
      <section
        className="league-top-scorers"
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          className="league-top-scorers-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          ⚽ Top Scorers
        </h2>

        <p
          className="league-top-scorers-empty"
          style={{
            color: "#94a3b8",
          }}
        >
          Top scorer statistics are unavailable.
        </p>
      </section>
    );
  }

  return (
    <section
      className="league-top-scorers"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        className="league-top-scorers-title"
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        ⚽ League Top Scorers
      </h2>

      <div
        className="league-top-scorers-list"
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {players.map((item, index) => {
          const player = item.player || {};

          const team =
            item.statistics?.[0]?.team || {};

          const stats =
            item.statistics?.[0]?.goals || {};

          const games =
            item.statistics?.[0]?.games || {};

          return (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
              className="league-top-scorer-link"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div
                className="league-top-scorer-card"
                style={{
                  background: "#1f2937",
                  borderRadius: 18,
                  padding: 20,
                  display: "grid",
                  gridTemplateColumns:
                    "70px 1fr auto",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                {/* Rank */}

                <div
                  className="league-top-scorer-rank"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background:
                      index === 0
                        ? "#facc15"
                        : index === 1
                        ? "#cbd5e1"
                        : index === 2
                        ? "#b45309"
                        : "#374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {index + 1}
                </div>

                {/* Player */}

                <div
                  className="league-top-scorer-player"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Image
                    className="league-top-scorer-photo"
                    src={
                      player.photo ||
                      "/player.png"
                    }
                    alt={player.name}
                    width={62}
                    height={62}
                    style={{
                      borderRadius: "50%",
                    }}
                  />

                  <div
                    className="league-top-scorer-info"
                  >
                    <h3
                      className="league-top-scorer-name"
                      style={{
                        margin: 0,
                        marginBottom: 6,
                        color: "#fff",
                      }}
                    >
                      {player.name}
                    </h3>

                    <div
                      className="league-top-scorer-team"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#94a3b8",
                        fontSize: 14,
                      }}
                    >
                      <Image
                        className="league-top-scorer-team-logo"
                        src={
                          team.logo ||
                          "/team.png"
                        }
                        alt={team.name}
                        width={20}
                        height={20}
                      />

                      <span
                        className="league-top-scorer-team-name"
                      >
                        {team.name}
                      </span>
                    </div>
                  </div>
                </div>
                                {/* Stats */}

                <div
                  className="league-top-scorer-stats"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3,80px)",
                    gap: 18,
                    textAlign: "center",
                  }}
                >
                  <Stat
                    value={
                      stats.total ?? 0
                    }
                    label="Goals"
                  />

                  <Stat
                    value={
                      stats.assists ?? 0
                    }
                    label="Assists"
                  />

                  <Stat
                    value={
                      games.appearences ??
                      0
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

/* ===================================== */

function Stat({
  value,
  label,
}) {
  return (
    <div
      className="league-top-scorer-stat"
    >
      <div
        className="league-top-scorer-stat-value"
        style={{
          color: "#22c55e",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        {value}
      </div>

      <div
        className="league-top-scorer-stat-label"
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}