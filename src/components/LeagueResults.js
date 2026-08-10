"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueResults({
  results = [],
}) {
  if (!results || results.length === 0) {
    return (
      <section
        className="league-results"
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          className="league-results-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          ✅ Latest Results
        </h2>

        <p
          className="league-results-empty"
          style={{
            color: "#94a3b8",
          }}
        >
          No completed matches available.
        </p>
      </section>
    );
  }

  return (
    <section
      className="league-results"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        className="league-results-title"
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        ✅ Latest Results
      </h2>

      <div
        className="league-results-list"
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {results.map((match) => {
          const fixture = match.fixture || {};
          const league = match.league || {};
          const home = match.teams?.home || {};
          const away = match.teams?.away || {};
          const goals = match.goals || {};

          return (
            <Link
              key={fixture.id}
              href={`/match/${fixture.id}`}
              className="league-result-link"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div
                className="league-result-card"
                style={{
                  background: "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  transition: ".25s",
                  cursor: "pointer",
                }}
              >
                {/* League */}

                <div
                  className="league-result-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <Image
                    className="league-result-league-logo"
                    src={league.logo || "/league.png"}
                    alt={league.name || "League"}
                    width={24}
                    height={24}
                  />

                  <span
                    className="league-result-league-name"
                    style={{
                      color: "#94a3b8",
                      fontSize: 14,
                    }}
                  >
                    {league.name}
                  </span>
                </div>

                {/* Match */}

                <div
                  className="league-result-match"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  {/* Home */}

                  <div
                    className="league-result-team league-result-home"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      className="league-result-team-logo"
                      src={home.logo || "/team.png"}
                      alt={home.name}
                      width={42}
                      height={42}
                    />

                    <strong className="league-result-team-name">
                      {home.name}
                    </strong>
                  </div>

                  {/* Score */}

                  <div
                    className="league-result-score"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="league-result-score-value"
                      style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: "#22c55e",
                      }}
                    >
                      {goals.home ?? 0}
                      {" - "}
                      {goals.away ?? 0}
                    </div>

                    <div
                      className="league-result-status"
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "#94a3b8",
                      }}
                    >
                      {fixture.status?.short || "FT"}
                    </div>
                  </div>

                  {/* Away */}

                  <div
                    className="league-result-team league-result-away"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <strong className="league-result-team-name">
                      {away.name}
                    </strong>

                    <Image
                      className="league-result-team-logo"
                      src={away.logo || "/team.png"}
                      alt={away.name}
                      width={42}
                      height={42}
                    />
                  </div>
                </div>

                {/* Footer */}

                <div
                  className="league-result-footer"
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    color: "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  <span className="league-result-date">
                    📅{" "}
                    {fixture.date
                      ? new Date(fixture.date).toLocaleDateString()
                      : "-"}
                  </span>

                  <span className="league-result-venue">
                    🏟 {fixture.venue?.name || "Venue"}
                  </span>

                  <span
                    className="league-result-finished"
                    style={{
                      color: "#22c55e",
                      fontWeight: "bold",
                    }}
                  >
                    Full Time
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