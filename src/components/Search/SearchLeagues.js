"use client";

import LeagueCard from "@/components/Cards/LeagueCard";

export default function SearchLeagues({
  leagues = [],
}) {
  if (!leagues.length) return null;

  return (
    <section style={{ marginBottom: 30 }}>
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        🏆 Leagues
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
        }}
      >
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            league={league}
          />
        ))}
      </div>
    </section>
  );
}