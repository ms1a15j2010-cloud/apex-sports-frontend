"use client";

import TeamCard from "@/components/Cards/TeamCard";

export default function SearchTeams({ teams = [] }) {
  if (!teams.length) return null;

  return (
    <section style={{ marginBottom: 30 }}>
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        ⚽ Teams
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
        }}
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
          />
        ))}
      </div>
    </section>
  );
}