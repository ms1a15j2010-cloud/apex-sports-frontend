"use client";

export default function MatchLineups({
  lineups = [],
}) {
  if (!lineups || lineups.length === 0) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 28,
          marginBottom: 24,
          border: "1px solid #1f2937",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px",
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          Lineups
        </h2>

        <div
          style={{
            background: "#0f172a",
            borderRadius: 14,
            padding: "28px 20px",
            textAlign: "center",
            color: "#64748b",
            fontSize: 14,
          }}
        >
          Lineup information is not available for this match yet.
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        marginBottom: 24,
        border: "1px solid #1f2937",
      }}
    >
      <h2
        style={{
          margin: "0 0 24px",
          color: "#fff",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        Starting XI & Bench
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: 20,
        }}
      >
        {lineups.map(
          (teamLineup, index) => {
            const team =
              teamLineup?.team ||
              {};

            const startXI =
              Array.isArray(
                teamLineup?.startXI
              )
                ? teamLineup.startXI
                : [];

            const substitutes =
              Array.isArray(
                teamLineup?.substitutes
              )
                ? teamLineup.substitutes
                : [];

            return (
              <div
                key={
                  team?.id ||
                  `${team?.name}-${index}`
                }
                style={{
                  background:
                    "#0f172a",
                  borderRadius:
                    16,
                  padding:
                    18,
                  border:
                    "1px solid #1e293b",
                }}
              >
                {/* TEAM HEADER */}

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 12,
                    marginBottom:
                      18,
                  }}
                >
                  {team?.logo ? (
                    <img
                      src={
                        team.logo
                      }
                      alt={
                        team.name ||
                        "Team"
                      }
                      width={40}
                      height={40}
                      style={{
                        objectFit:
                          "contain",
                        borderRadius:
                          8,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius:
                          8,
                        background:
                          "#1e293b",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color:
                          "#64748b",
                        fontSize:
                          10,
                        fontWeight:
                          800,
                      }}
                    >
                      FC
                    </div>
                  )}

                  <div
                    style={{
                      minWidth:
                        0,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color:
                          "#fff",
                        fontSize:
                          17,
                        fontWeight:
                          800,
                      }}
                    >
                      {team?.name ||
                        "Unknown Team"}
                    </h3>

                    {teamLineup
                      ?.formation && (
                      <div
                        style={{
                          marginTop:
                            4,
                          color:
                            "#22c55e",
                          fontSize:
                            12,
                          fontWeight:
                            700,
                        }}
                      >
                        Formation:{" "}
                        {
                          teamLineup.formation
                        }
                      </div>
                    )}
                  </div>
                </div>

                {/* STARTING XI */}

                <div
                  style={{
                    marginBottom:
                      20,
                  }}
                >
                  <div
                    style={{
                      color:
                        "#94a3b8",
                      fontSize:
                        12,
                      fontWeight:
                        800,
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".08em",
                      marginBottom:
                        10,
                    }}
                  >
                    Starting XI
                  </div>

                  {startXI.length ===
                  0 ? (
                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize:
                          13,
                        padding:
                          "12px 0",
                      }}
                    >
                      Starting lineup
                      unavailable.
                    </div>
                  ) : (
                    <div
                      style={{
                        display:
                          "grid",
                        gap: 8,
                      }}
                    >
                      {startXI.map(
                        (
                          entry,
                          playerIndex
                        ) => {
                          const player =
                            entry?.player ||
                            entry ||
                            {};

                          return (
                            <PlayerRow
                              key={
                                player?.id ||
                                `${player?.name}-${playerIndex}`
                              }
                              player={
                                player
                              }
                              starter
                              number={
                                player?.number ??
                                entry?.number
                              }
                            />
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                {/* BENCH */}

                <div>
                  <div
                    style={{
                      color:
                        "#94a3b8",
                      fontSize:
                        12,
                      fontWeight:
                        800,
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".08em",
                      marginBottom:
                        10,
                    }}
                  >
                    Bench
                  </div>

                  {substitutes.length ===
                  0 ? (
                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize:
                          13,
                        padding:
                          "12px 0",
                      }}
                    >
                      Bench information
                      unavailable.
                    </div>
                  ) : (
                    <div
                      style={{
                        display:
                          "grid",
                        gap: 8,
                      }}
                    >
                      {substitutes.map(
                        (
                          entry,
                          playerIndex
                        ) => {
                          const player =
                            entry?.player ||
                            entry ||
                            {};

                          return (
                            <PlayerRow
                              key={
                                player?.id ||
                                `${player?.name}-bench-${playerIndex}`
                              }
                              player={
                                player
                              }
                              number={
                                player?.number ??
                                entry?.number
                              }
                            />
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

/* =====================================================
PLAYER ROW
===================================================== */

function PlayerRow({
  player = {},
  starter = false,
  number,
}) {
  return (
    <div
      style={{
        display:
          "flex",
        alignItems:
          "center",
        gap: 10,
        background:
          "#111827",
        borderRadius:
          10,
        padding:
          "10px 12px",
      }}
    >
      <div
        style={{
          width: 28,
          minWidth: 28,
          height: 28,
          borderRadius: 8,
          background:
            "#1e293b",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color:
            "#94a3b8",
          fontSize:
            11,
          fontWeight:
            800,
        }}
      >
        {number ??
          "—"}
      </div>

      <div
        style={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            color:
              "#fff",
            fontSize:
              13,
            fontWeight:
              starter
                ? 700
                : 600,
            overflow:
              "hidden",
            textOverflow:
              "ellipsis",
            whiteSpace:
              "nowrap",
          }}
        >
          {player?.name ||
            "Unknown Player"}
        </div>

        {player?.position && (
          <div
            style={{
              marginTop:
                2,
              color:
                "#64748b",
              fontSize:
                10,
            }}
          >
            {
              player.position
            }
          </div>
        )}
      </div>
    </div>
  );
}