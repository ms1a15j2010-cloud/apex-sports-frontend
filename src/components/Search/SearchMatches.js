"use client";

import MatchCard from "@/components/Cards/MatchCard";

export default function SearchMatches({
  matches = [],
}) {
  if (!matches.length) return null;

  return (
    <section style={{ marginBottom: 30 }}>
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        📅 Matches
      </h2>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        {matches.map((match) => (
          <MatchCard
            key={match.fixture?.id}
            match={match}
          />
        ))}
      </div>
    </section>
  );
}