"use client";

import Link from "next/link";

export default function TeamInjuries({
  injuries = [],
  available = false,
}) {
  const hasInjuries =
    available &&
    Array.isArray(injuries) &&
    injuries.length > 0;

  return (
    <section
      id="injuries"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          🚑 Injury Report
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Current team injury information.
        </p>
      </div>

      {/* =================================================
          AVAILABLE INJURY DATA
      ================================================= */}

      {hasInjuries ? (
        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {injuries.map(
            (injury, index) => {
              const player =
                injury?.player || {};

              const team =
                injury?.team || {};

              const reason =
                injury?.reason ||
                injury?.type ||
                injury?.player?.reason ||
                "Injury information unavailable";

              const date =
                injury?.date ||
                injury?.fixture?.date ||
                null;

              const playerId =
                player?.id ?? null;

              return (
                <article
                  key={
                    playerId ??
                    `injury-${index}`
                  }
                  style={{
                    background:
                      "#1f2937",
                    borderRadius:
                      16,
                    padding: 20,
                    border:
                      "1px solid #293548",
                    display: "grid",
                    gridTemplateColumns:
                      "1fr auto",
                    gap: 20,
                    alignItems:
                      "center",
                  }}
                >
                  <div>
                    {playerId ? (
                      <Link
                        href={`/player/${playerId}`}
                        style={{
                          color:
                            "#fff",
                          textDecoration:
                            "none",
                          fontSize:
                            18,
                          fontWeight:
                            800,
                        }}
                      >
                        {player?.name ||
                          "Unknown Player"}
                      </Link>
                    ) : (
                      <div
                        style={{
                          color:
                            "#fff",
                          fontSize:
                            18,
                          fontWeight:
                            800,
                        }}
                      >
                        {player?.name ||
                          "Unknown Player"}
                      </div>
                    )}

                    <div
                      style={{
                        color:
                          "#94a3b8",
                        marginTop:
                          6,
                        fontSize:
                            13,
                      }}
                    >
                      {team?.name ||
                        "Team"}
                    </div>

                    <div
                      style={{
                        color:
                          "#cbd5e1",
                        marginTop:
                          10,
                        lineHeight:
                          1.6,
                      }}
                    >
                      <strong>
                        Reason:
                      </strong>{" "}
                      {reason}
                    </div>

                    {date && (
                      <div
                        style={{
                          color:
                            "#64748b",
                          fontSize:
                            12,
                          marginTop:
                            8,
                        }}
                      >
                        Reported:{" "}
                        {new Date(
                          date
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      background:
                        "#991b1b",
                      color:
                        "#fee2e2",
                      padding:
                        "8px 14px",
                      borderRadius:
                        999,
                      fontSize:
                        12,
                      fontWeight:
                        800,
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    Injured
                  </div>
                </article>
              );
            }
          )}
        </div>
      ) : (
        /* =================================================
           DATA UNAVAILABLE
        ================================================= */

        <div
          style={{
            background:
              "#1f2937",
            borderRadius: 18,
            padding: 40,
            textAlign: "center",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 52,
              marginBottom: 16,
            }}
          >
            🚑
          </div>

          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 10px",
              fontSize: 20,
            }}
          >
            Injury Data Unavailable
          </h3>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              maxWidth: 650,
              marginInline:
                "auto",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            The current football-data.org
            data source does not provide
            the team injury information that
            was previously supplied by
            API-Football.
          </p>

          <div
            style={{
              display:
                "inline-block",
              marginTop: 16,
              padding:
                "7px 12px",
              borderRadius:
                999,
              background:
                "#111827",
              color:
                "#64748b",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Source limitation
          </div>
        </div>
      )}

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
          fontSize: 12,
        }}
      >
        Source: football-data.org
      </div>
    </section>
  );
}