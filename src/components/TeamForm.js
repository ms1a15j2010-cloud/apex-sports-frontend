"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamForm({
  fixtures = [],
  teamId,
}) {
  if (!fixtures || fixtures.length === 0) return null;

  // Only completed matches
  const completedMatches = fixtures.filter(
    (match) =>
      match?.fixture?.status?.short === "FT"
  );

  // Latest 10 matches
  const lastMatches = completedMatches.slice(0, 10);

  // W D L form
  const form = lastMatches.map((match) => {
    const homeTeam = match?.teams?.home?.id === teamId;

    const goalsFor = homeTeam
      ? match?.goals?.home
      : match?.goals?.away;

    const goalsAgainst = homeTeam
      ? match?.goals?.away
      : match?.goals?.home;

    if (goalsFor > goalsAgainst) return "W";
    if (goalsFor < goalsAgainst) return "L";
    return "D";
  });

  const wins = form.filter((x) => x === "W").length;
  const draws = form.filter((x) => x === "D").length;
  const losses = form.filter((x) => x === "L").length;

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
          marginBottom: 25,
        }}
      >
        📈 Recent Form
      </h2>

      {/* Form Icons */}

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 25,
        }}
      >
        {form.map((result, index) => (
          <div
            key={index}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 18,
              color: "#fff",
              background:
                result === "W"
                  ? "#22c55e"
                  : result === "D"
                  ? "#eab308"
                  : "#ef4444",
            }}
          >
            {result}
          </div>
        ))}
      </div>

      {/* Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <SummaryCard
          title="Wins"
          value={wins}
          color="#22c55e"
        />

        <SummaryCard
          title="Draws"
          value={draws}
          color="#facc15"
        />

        <SummaryCard
          title="Losses"
          value={losses}
          color="#ef4444"
        />

        <SummaryCard
          title="Matches"
          value={lastMatches.length}
          color="#3b82f6"
        />
      </div>

      {/* Match List */}

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {lastMatches.map((match) => (
          <Link
            key={match.fixture.id}
            href={`/match/${match.fixture.id}`}
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <div
              style={{
                background: "#1f2937",
                borderRadius: 18,
                padding: 20,
                transition: ".25s",
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
                    match.league?.logo ||
                    "/league.png"
                  }
                  alt={match.league?.name}
                  width={24}
                  height={24}
                />

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {match.league?.name}
                </span>
              </div>

              {/* Teams */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr auto 1fr",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    src={
                      match.teams.home.logo
                    }
                    alt={
                      match.teams.home.name
                    }
                    width={38}
                    height={38}
                  />

                  <strong>
                    {match.teams.home.name}
                  </strong>
                </div>

                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    {match.goals.home}
                    {" - "}
                    {match.goals.away}
                  </div>

                  <div
                    style={{
                      color: "#94a3b8",
                      marginTop: 6,
                      fontSize: 13,
                    }}
                  >
                    {new Date(
                      match.fixture.date
                    ).toLocaleDateString()}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <strong>
                    {match.teams.away.name}
                  </strong>

                  <Image
                    src={
                      match.teams.away.logo
                    }
                    alt={
                      match.teams.away.name
                    }
                    width={38}
                    height={38}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SummaryCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign: "center",
        border: `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 10,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontWeight: "bold",
          fontSize: 32,
        }}
      >
        {value}
      </div>
    </div>
  );
}