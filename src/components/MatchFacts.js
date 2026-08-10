"use client";
import Image from "next/image";

export default function MatchFacts({
  match,
  statistics = [],
}) {
  if (!match) return null;

  const fixture = match.fixture || {};
  const league = match.league || {};
  const home = match.teams?.home || {};
  const away = match.teams?.away || {};

  const homeStats = statistics[0] || {};
  const awayStats = statistics[1] || {};

  function getStat(team, type) {
    const stat =
      team.statistics?.find(
        (s) => s.type === type
      );

    return stat?.value ?? "-";
  }

  const facts = [
    {
      title: "Referee",
      value:
        fixture.referee ||
        "-",
    },
    {
      title: "Stadium",
      value:
        fixture.venue?.name ||
        "-",
    },
    {
      title: "City",
      value:
        fixture.venue?.city ||
        "-",
    },
    {
      title: "League",
      value:
        league.name ||
        "-",
    },
    {
      title: "Country",
      value:
        league.country ||
        "-",
    },
    {
      title: "Season",
      value:
        league.season ||
        "-",
    },
    {
      title: "Round",
      value:
        league.round ||
        "-",
    },
    {
      title: "Status",
      value:
        fixture.status?.long ||
        "-",
    },
    // ============================
// Attendance comes from fixture
// NOT from team statistics
// ============================

{
  title: "Attendance",
  value: fixture.attendance || "-",
},
    {
  title: "Home Possession",
  value: getStat(homeStats, "Ball Possession"),
},
{
  title: "Away Possession",
  value: getStat(awayStats, "Ball Possession"),
},
{
  title: "Home Pass Accuracy",
  value: getStat(homeStats, "Passes accurate"),
},
{
  title: "Away Pass Accuracy",
  value: getStat(awayStats, "Passes accurate"),
},
    {
      title: "Home Fouls",
      value:
        getStat(
          homeStats,
          "Fouls"
        ),
    },
    {
      title: "Away Fouls",
      value:
        getStat(
          awayStats,
          "Fouls"
        ),
    },
  ];

  return (
    <section
     className="match-facts"
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
          marginBottom: 30,
        }}
      >
        📖 Match Facts
      </h2>

      {/* Teams */}

      <div
      className="match-facts-teams"
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <TeamCard
          team={home}
        />

        <div
         className="facts-vs"

          style={{
            color: "#64748b",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          VS
        </div>

        <TeamCard
          team={away}
        />
      </div>

      {/* Facts */}

      <div
      className="facts-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: 18,
        }}
      >
        {facts.map(
          (fact) => (
            <FactCard
              key={
                fact.title
              }
              title={
                fact.title
              }
              value={
                fact.value
              }
            />
          )
        )}
      </div>
    </section>
  );
}

/* ====================================== */

function TeamCard({ team }) {
  return (
    <div
     className="facts-team-card"
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 20,
        textAlign: "center",
      }}
    >
      <Image
 className="facts-team-logo"
 src={team.logo || "/team.png"}
 alt={team.name || "Team"}
 width={70}
 height={70}
 unoptimized
 style={{
   objectFit:"contain",
 }}
/>

      <h3
        style={{
          color: "#fff",
          marginTop: 15,
          marginBottom: 0,
        }}
      >
        {team.name || "Unknown Team"}
      </h3>
    </div>
  );
}

/* ====================================== */

function FactCard({
  title,
  value,
}) {
  return (
    <div
    className="fact-card"

      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
       className="fact-title"
        style={{
          color: "#94a3b8",
          marginBottom: 10,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
      className="fact-value"
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 19,
        }}
      >
        {value}
      </div>
    </div>
  );
}