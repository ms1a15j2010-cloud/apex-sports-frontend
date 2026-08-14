"use client";

import Image from "next/image";

export default function PlayerStatistics({
  statistics = [],
  player = null,
}) {
  if (
    !Array.isArray(statistics) ||
    statistics.length === 0
  ) {
    return null;
  }

  const getRatingColor = (rating) => {
    if (!rating) {
      return "#94a3b8";
    }

    const value = Number(rating);

    if (value >= 8) {
      return "#22c55e";
    }

    if (value >= 6.5) {
      return "#eab308";
    }

    return "#ef4444";
  };

  const getRatingStars = (rating) => {
    const value =
      Number(rating || 0);

    if (value >= 9) {
      return "★★★★★";
    }

    if (value >= 8) {
      return "★★★★☆";
    }

    if (value >= 7) {
      return "★★★☆☆";
    }

    if (value >= 6) {
      return "★★☆☆☆";
    }

    if (value > 0) {
      return "★☆☆☆☆";
    }

    return "☆☆☆☆☆";
  };

  const getInitial = (name) => {
    return (
      name
        ?.charAt(0)
        ?.toUpperCase() || "P"
    );
  };

  return (
    <section
      style={{
        marginTop: 35,
        background:
          "linear-gradient(145deg,#0f172a,#111827)",
        borderRadius: 20,
        padding: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing:
              "1.2px",
            textTransform:
              "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            fontSize: 26,
            margin: 0,
          }}
        >
          Player Statistics
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Performance statistics for{" "}
          {player?.name ||
            "this player"}.
        </p>
      </div>

      {/* =================================================
          STATISTICS BY COMPETITION / TEAM
      ================================================= */}

      {statistics.map(
        (stat, index) => {
          const team =
            stat?.team || {};

          const league =
            stat?.league || {};

          const games =
            stat?.games || {};

          const goals =
            stat?.goals || {};

          const shots =
            stat?.shots || {};

          const passes =
            stat?.passes || {};

          const tackles =
            stat?.tackles || {};

          const duels =
            stat?.duels || {};

          const dribbles =
            stat?.dribbles || {};

          const fouls =
            stat?.fouls || {};

          const cards =
            stat?.cards || {};

          const penalty =
            stat?.penalty || {};

          const teamLogo =
            team.logo || null;

          const playerPhoto =
            player?.photo || null;

          return (
            <div
              key={`${team.id || "team"}-${index}`}
              style={{
                marginBottom:
                  index <
                  statistics.length - 1
                    ? 30
                    : 0,
              }}
            >
              {/* =================================================
                  COMPETITION / TEAM HEADER
              ================================================= */}

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "space-between",
                  gap: 20,
                  marginBottom: 20,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: 14,
                    minWidth: 0,
                  }}
                >
                  {teamLogo ? (
                    <Image
                      src={
                        teamLogo
                      }
                      width={52}
                      height={52}
                      alt={
                        team.name ||
                        "Team"
                      }
                      unoptimized
                      style={{
                        width: 52,
                        height: 52,
                        objectFit:
                          "contain",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 12,
                        background:
                          "#1e293b",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color:
                          "#22c55e",
                        fontWeight:
                          800,
                        flexShrink: 0,
                      }}
                    >
                      FC
                    </div>
                  )}

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <h3
                      style={{
                        color: "#fff",
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 700,
                        overflow:
                          "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {team.name ||
                        "Unknown Team"}
                    </h3>

                    <span
                      style={{
                        color:
                          "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {league.name ||
                        "Premier League"}
                      {" • "}
                      Season{" "}
                      {league.season ||
                        ""}
                    </span>
                  </div>
                </div>

                {/* PLAYER */}

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: 10,
                  }}
                >
                  {playerPhoto ? (
                    <Image
                      src={
                        playerPhoto
                      }
                      width={44}
                      height={44}
                      alt={
                        player?.name ||
                        "Player"
                      }
                      unoptimized
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius:
                          "50%",
                        objectFit:
                          "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius:
                          "50%",
                        background:
                          "#1e293b",
                        border:
                          "2px solid #22c55e",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color:
                          "#22c55e",
                        fontWeight:
                          800,
                      }}
                    >
                      {getInitial(
                        player?.name
                      )}
                    </div>
                  )}

                  <strong
                    style={{
                      color: "#fff",
                    }}
                  >
                    {player?.name ||
                      "Unknown Player"}
                  </strong>
                </div>
              </div>

              {/* =================================================
                  PRIMARY PERFORMANCE CARDS
              ================================================= */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <Stat
                  title="Appearances"
                  value={
                    games.appearances
                  }
                />

                <Stat
                  title="Minutes"
                  value={
                    games.minutes
                  }
                />

                <Stat
                  title="Goals"
                  value={
                    goals.total
                  }
                  highlight
                />

                <Stat
                  title="Assists"
                  value={
                    goals.assists
                  }
                />

                <Stat
                  title="Shots"
                  value={
                    shots.total
                  }
                />

                <Stat
                  title="Tackles"
                  value={
                    tackles.total
                  }
                />
              </div>

              {/* =================================================
                  RATING
              ================================================= */}

              <div
                style={{
                  marginBottom: 18,
                  background:
                    "#0f172a",
                  padding: 16,
                  borderRadius: 14,
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: 15,
                  flexWrap:
                    "wrap",
                }}
              >
                <span
                  style={{
                    color:
                      "#94a3b8",
                    fontWeight: 600,
                  }}
                >
                  Player Rating
                </span>

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      color:
                        getRatingColor(
                          games.rating
                        ),
                      fontSize: 20,
                      fontWeight:
                        800,
                    }}
                  >
                    {games.rating ||
                      "-"}
                  </span>

                  <span
                    style={{
                      color:
                        "#facc15",
                      fontSize: 16,
                      letterSpacing:
                        1,
                    }}
                  >
                    {getRatingStars(
                      games.rating
                    )}
                  </span>
                </div>
              </div>

              {/* =================================================
                  DETAILED STATISTICS
              ================================================= */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: 14,
                }}
              >
                <Stat
                  title="Lineups"
                  value={
                    games.lineups
                  }
                />

                <Stat
                  title="Passes"
                  value={
                    passes.total
                  }
                />

                <Stat
                  title="Key Passes"
                  value={
                    passes.key
                  }
                />

                <Stat
                  title="Pass Accuracy"
                  value={
                    passes.accuracy
                      ? `${passes.accuracy}%`
                      : "-"
                  }
                />

                <Stat
                  title="Duels"
                  value={
                    duels.total
                  }
                />

                <Stat
                  title="Duels Won"
                  value={
                    duels.won
                  }
                />

                <Stat
                  title="Dribble Attempts"
                  value={
                    dribbles.attempts
                  }
                />

                <Stat
                  title="Dribbles Won"
                  value={
                    dribbles.success
                  }
                />

                <Stat
                  title="Fouls Drawn"
                  value={
                    fouls.drawn
                  }
                />

                <Stat
                  title="Fouls Committed"
                  value={
                    fouls.committed
                  }
                />

                <Stat
                  title="🟨 Yellow"
                  value={
                    cards.yellow
                  }
                />

                <Stat
                  title="🟥 Red"
                  value={
                    cards.red
                  }
                />

                <Stat
                  title="Penalty Goals"
                  value={
                    penalty.scored
                  }
                />

                <Stat
                  title="Penalty Missed"
                  value={
                    penalty.missed
                  }
                />
              </div>
            </div>
          );
        }
      )}
    </section>
  );
}

/* =====================================================
STAT CARD
===================================================== */

function Stat({
  title,
  value,
  highlight = false,
}) {
  return (
    <div
      style={{
        background:
          "#0f172a",
        padding: 16,
        borderRadius: 12,
        textAlign: "center",
        border:
          "1px solid #1e293b",
      }}
    >
      <div
        style={{
          color:
            "#94a3b8",
          fontSize: 12,
          marginBottom: 7,
        }}
      >
        {title}
      </div>

      <strong
        style={{
          color: highlight
            ? "#22c55e"
            : "#fff",
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        {value ??
          0}
      </strong>
    </div>
  );
}