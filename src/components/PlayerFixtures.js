"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerFixtures({
  fixtures = [],
}) {
  if (!fixtures.length) return null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 28,
        }}
      >
        📅 Recent Fixtures
      </h2>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        {fixtures.map((match) => {
          const fixture =
            match.fixture || {};

          const league =
            match.league || {};

          const home =
            match.teams?.home || {};

          const away =
            match.teams?.away || {};

          return (
            <Link
              key={fixture.id}
              href={`/match/${fixture.id}`}
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div
                style={{
                  background: "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  transition: "all .25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 28px rgba(0,0,0,.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              >
                {/* League */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <Image
                    src={
                      league.logo ||
                      "/league.png"
                    }
                    alt={
                      league.name ||
                      "League"
                    }
                    width={26}
                    height={26}
                  />

                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {league.name}
                    </div>

                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {fixture.date
                        ? new Date(
                            fixture.date
                          ).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                </div>

                {/* Match */}

                <div
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
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      src={
                        home.logo ||
                        "/team.png"
                      }
                      alt={
                        home.name
                      }
                      width={42}
                      height={42}
                    />

                    <strong>
                      {home.name}
                    </strong>
                  </div>

                  {/* Score */}

                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {fixture.status?.short ===
                    "FT" ? (
                      <>
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight:
                              "bold",
                          }}
                        >
                          {match.goals
                            ?.home ?? 0}
                          {" - "}
                          {match.goals
                            ?.away ?? 0}
                        </div>

                        <div
                          style={{
                            marginTop: 5,
                            color:
                              "#22c55e",
                            fontSize: 13,
                          }}
                        >
                          Full Time
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight:
                              "bold",
                          }}
                        >
                          VS
                        </div>

                        <div
                          style={{
                            marginTop: 5,
                            color:
                              "#f59e0b",
                            fontSize: 13,
                          }}
                        >
                          Upcoming
                        </div>
                      </>
                    )}
                  </div>

                  {/* Away */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "flex-end",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <strong>
                      {away.name}
                    </strong>

                    <Image
                      src={
                        away.logo ||
                        "/team.png"
                      }
                      alt={
                        away.name
                      }
                      width={42}
                      height={42}
                    />
                  </div>
                </div>

                {/* Stadium */}

                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    justifyContent:
                      "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    color: "#94a3b8",
                    fontSize: 14,
                  }}
                >
                  <span>
                    🏟{" "}
                    {fixture.venue
                      ?.name ||
                      "Unknown Venue"}
                  </span>

                  <span>
                    ⏰{" "}
                    {fixture.date
                      ? new Date(
                          fixture.date
                        ).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute:
                              "2-digit",
                          }
                        )
                      : "-"}
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