"use client";

import Image from "next/image";
// import Link from "next/link";

export default function HeadToHead({ matches = [] }) {
  if (!matches.length) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 24,
          marginBottom: 25,
          color: "white",
        }}
      >
        <h2>🤝 Head to Head</h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: 15,
          }}
        >
          No previous meetings available.
        </p>
      </section>
    );
  }

  /* ==========================================
     TEAM NAMES
  ========================================== */

  const homeTeam =
    matches[0]?.teams?.home?.name ||
    matches[0]?.home ||
    "Home";

  const awayTeam =
    matches[0]?.teams?.away?.name ||
    matches[0]?.away ||
    "Away";

  const homeLogo =
    matches[0]?.teams?.home?.logo || "";

  const awayLogo =
    matches[0]?.teams?.away?.logo || "";

  /* ==========================================
     H2H SUMMARY
  ========================================== */

  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  let homeGoals = 0;
  let awayGoals = 0;

  const recentForm = [];

  matches.forEach((match) => {
    const h =
      match.goals?.home ??
      match.homeGoals ??
      0;

    const a =
      match.goals?.away ??
      match.awayGoals ??
      0;

    homeGoals += Number(h);
    awayGoals += Number(a);

    if (h > a) {
      homeWins++;
      recentForm.push("W");
    } else if (a > h) {
      awayWins++;
      recentForm.push("L");
    } else {
      draws++;
      recentForm.push("D");
    }
  });

  const totalMatches = matches.length;

  const avgGoals =
    totalMatches > 0
      ? (
          (homeGoals + awayGoals) /
          totalMatches
        ).toFixed(1)
      : "0.0";

  /* ==========================================
     HELPERS
  ========================================== */

  function resultColor(result) {
    if (result === "W") return "#22c55e";
    if (result === "L") return "#ef4444";
    return "#64748b";
  }

  function winner(home, away) {
    if (home > away) return "home";
    if (away > home) return "away";
    return "draw";
  }
    return (
    <section
    className="h2h-section"
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 24,
        marginBottom: 25,
      }}
    >
      {/* Header */}

      <h2
        style={{
          color: "white",
          marginBottom: 25,
          fontSize: 28,
        }}
      >
        🤝 Head to Head
      </h2>

      {/* Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 18,
          marginBottom: 30,
        }}
      >
        {/* Home */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          {homeLogo && (
            <Image
              src={homeLogo || "/team.png" }
              alt={homeTeam}
              width={38}
              height={38}
              unoptimized
            />
          )}

          <h3
            style={{
              color: "white",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {homeTeam}
          </h3>

          <div
            style={{
              fontSize: 38,
              color: "#22c55e",
              fontWeight: 700,
            }}
          >
            {homeWins}
          </div>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            Wins
          </div>
        </div>

        {/* Draw */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 34,
              marginBottom: 8,
            }}
          >
            🤝
          </div>

          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#facc15",
            }}
          >
            {draws}
          </div>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            Draws
          </div>
        </div>

        {/* Away */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          {awayLogo && (
            <Image
              src={awayLogo}
              alt={awayTeam}
              width={55}
              height={55}
              unoptimized
            />
          )}

          <h3
            style={{
              color: "white",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {awayTeam}
          </h3>

          <div
            style={{
              fontSize: 38,
              color: "#3b82f6",
              fontWeight: 700,
            }}
          >
            {awayWins}
          </div>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            Wins
          </div>
        </div>

        {/* Total Goals */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 34,
              marginBottom: 8,
            }}
          >
            ⚽
          </div>

          <div
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {homeGoals + awayGoals}
          </div>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            Total Goals
          </div>
        </div>

        {/* Average */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 34,
              marginBottom: 8,
            }}
          >
            📈
          </div>

          <div
            style={{
              color: "#22c55e",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {avgGoals}
          </div>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            Avg Goals
          </div>
        </div>
      </div>

      {/* Recent Form */}

      <div
       className="h2h-match-card"
        style={{
          background: "#191b1f",
          borderRadius: 16,
          padding: 18,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            color: "white",
            marginBottom: 15,
          }}
        >
          Recent Form
        </h3>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {recentForm.slice(0, 10).map((result, index) => (
            <div
              key={index}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: resultColor(result),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: 700,
              }}
            >
              {result}
            </div>
          ))}
        </div>
      </div>
            {/* Previous Matches */}

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {matches.map((match) => {
          const fixtureId =
            match.fixture?.id || match.id;

          const home =
            match.teams?.home?.name ||
            match.home ||
            "-";

          const away =
            match.teams?.away?.name ||
            match.away ||
            "-";

          const homeLogo =
            match.teams?.home?.logo;

          const awayLogo =
            match.teams?.away?.logo;

          const homeGoals =
            match.goals?.home ??
            match.homeGoals ??
            0;

          const awayGoals =
            match.goals?.away ??
            match.awayGoals ??
            0;

          const league =
            match.league?.name || "";

          const round =
            match.league?.round || "";

          const venue =
            match.fixture?.venue?.name || "";

          const date =
            match.fixture?.date ||
            match.date;

          const result = winner(
            homeGoals,
            awayGoals
          );

          return (
            <Link
              key={fixtureId}
              href={`/match/${fixtureId}`}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background: "#1f2937",
                  borderRadius: 16,
                  padding: 20,
                  border:
                    result === "home"
                      ? "2px solid #22c55e"
                      : result === "away"
                      ? "2px solid #3b82f6"
                      : "2px solid #475569",
                  transition: ".3s",
                  cursor: "pointer",
                }}
              >
                {/* Top */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        background:
                          "#2563eb",
                        color: "white",
                        padding:
                          "4px 10px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {league}
                    </span>

                    <span
                      style={{
                        color:
                          "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {round}
                    </span>
                  </div>

                  <span
                    style={{
                      color:
                        "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    {date
                      ? new Date(
                          date
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

                {/* Teams */}

                <div
                className="h2h-summary-grid h2h-match-list h2h-teams-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  {/* Home */}

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 12,
                    }}
                  >
                    {homeLogo && (
                      <Image
                        src={homeLogo || "/team.png"}
                        alt={home}
                        width={38}
                        height={38}
                        unoptimized
                      />
                    )}

                    <strong
                      style={{
                        color:
                          result ===
                          "home"
                            ? "#22c55e"
                            : "white",
                      }}
                    >
                      {home}
                    </strong>
                  </div>

                  {/* Score */}

                  <div
                    style={{
                      textAlign:
                        "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      {homeGoals} -{" "}
                      {awayGoals}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        color:
                          "#94a3b8",
                        fontSize: 12,
                      }}
                    >
                      FT
                    </div>
                  </div>

                  {/* Away */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "flex-end",
                      alignItems:
                        "center",
                      gap: 12,
                    }}
                  >
                    <strong
                      style={{
                        color:
                          result ===
                          "away"
                            ? "#3b82f6"
                            : "white",
                      }}
                    >
                      {away}
                    </strong>

                    {awayLogo && (
                      <Image
                        src={awayLogo || "/team.png"}
                        alt={away}
                        width={38}
                        height={38}
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Bottom */}

                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    borderTop:
                      "1px solid #334155",
                    paddingTop: 12,
                  }}
                >
                  <span
                    style={{
                      color:
                        "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    🏟 {venue || "Unknown Venue"}
                  </span>

                  <span
                    style={{
                      color:
                        result ===
                        "draw"
                          ? "#facc15"
                          : result ===
                            "home"
                          ? "#22c55e"
                          : "#3b82f6",
                          fontWeight: 700,
                    }}
                  >
                    {result === "draw"
                      ? "Draw"
                      : result ===
                        "home"
                      ? `${home} won`
                      : `${away} won`}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}