"use client";

/* =====================================================
   REACT
===================================================== */

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* =====================================================
   LIVE CONTEXT
===================================================== */

import { useLive } from "@/context/LiveContext";

/* =====================================================
   COMPONENT
===================================================== */

export default function LeagueFixtures({
  fixtures = [],
}) {
  const {
    registerMatches,
    getMatch,
  } = useLive();

  /* ==========================================
     Register fixtures for live updates
  ========================================== */

  useEffect(() => {
    if (!fixtures.length) return;

    registerMatches(
      fixtures.map(
        (fixture) => fixture.fixture?.id
      )
    );
  }, [
    fixtures,
    registerMatches,
  ]);

  /* ==========================================
     Empty State
  ========================================== */

  if (!fixtures || fixtures.length === 0) {
    return (
      <section
        className="league-fixtures"
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          className="league-fixtures-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          📅 Upcoming Fixtures
        </h2>

        <p
          className="league-fixtures-empty"
          style={{
            color: "#94a3b8",
          }}
        >
          No upcoming fixtures available.
        </p>
      </section>
    );
  }

  /* ==========================================
     UI
  ========================================== */

  return (
    <section
      className="league-fixtures"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        className="league-fixtures-title"
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        📅 Upcoming Fixtures
      </h2>

      <div
        className="league-fixtures-list"
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {fixtures.map((originalMatch) => {
          /* ==========================================
             Live Match (updates automatically)
          ========================================== */

          const live =
            getMatch(
              originalMatch.fixture?.id
            );

          const match =
            live?.match?.match ||
            originalMatch;

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
              className="league-fixture-link"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div
                className="league-fixture-card"
                style={{
                  background: "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  transition: "0.25s",
                  cursor: "pointer",
                }}
              >
                {/* League */}

                <div
                  className="league-fixture-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <Image
                    className="league-fixture-league-logo"
                    src={
                      league.logo ||
                      "/league.png"
                    }
                    alt={
                      league.name ||
                      "League"
                    }
                    width={24}
                    height={24}
                  />

                  <span
                    className="league-fixture-league-name"
                    style={{
                      color: "#94a3b8",
                      fontSize: 14,
                    }}
                  >
                    {league.name}
                  </span>
                </div>

                {/* Teams */}

                <div
                  className="league-fixture-teams"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  {/* Home */}

                  <Team
                    team={home}
                  />

                  {/* Center */}

                  <div
                    className="league-fixture-center"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="league-fixture-vs"
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#22c55e",
                      }}
                    >
                      VS
                    </div>

                    <div
                      className="league-fixture-date"
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "#94a3b8",
                      }}
                    >
                      {fixture.date
                        ? new Date(
                            fixture.date
                          ).toLocaleDateString()
                        : "-"}
                    </div>

                    <div
                      className="league-fixture-time"
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        color: "#64748b",
                      }}
                    >
                      {fixture.date
                        ? new Date(
                            fixture.date
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : ""}
                    </div>
                  </div>

                  {/* Away */}

                  <Team
                    team={away}
                    reverse
                  />
                </div>

                {/* Venue */}

                <div
                  className="league-fixture-footer"
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent:
                      "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    color: "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  <span className="league-fixture-venue">
                    🏟{" "}
                    {fixture.venue?.name ||
                      "Venue TBA"}
                  </span>

                  <span className="league-fixture-city">
                    📍{" "}
                    {fixture.venue?.city ||
                      "-"}
                  </span>

                  <span className="league-fixture-status">
                    ⏱{" "}
                    {fixture.status?.long ||
                      "Scheduled"}
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

/* =====================================================
   TEAM
===================================================== */

function Team({
  team,
  reverse = false,
}) {
  return (
    <div
      className={`league-fixture-team ${
        reverse ? "reverse" : ""
      }`}
      style={{
        display: "flex",
        justifyContent: reverse
          ? "flex-end"
          : "flex-start",
        alignItems: "center",
        gap: 12,
        flexDirection: reverse
          ? "row-reverse"
          : "row",
      }}
    >
      <Image
        src={team.logo || "/team.png"}
        alt={team.name || "Team"}
        width={42}
        height={42}
      />

      <strong
        className="league-fixture-team-name"
        style={{
          color: "#fff",
          fontSize: "14px",
        }}
      >
        {team.name}
      </strong>
    </div>
  );
}