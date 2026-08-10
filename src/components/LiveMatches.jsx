"use client";

import { useState } from "react";

export default function LiveMatches({ matches }) {
  const [leagueFilter, setLeagueFilter] = useState("All");

  const filteredMatches =
    leagueFilter === "All"
      ? matches
      : matches.filter(
          (m) => m.league.name === leagueFilter
        );

  const leagues = [
    "All",
    ...new Set(matches.map((m) => m.league.name)),
  ];

  return (
    <section>
      <h2>Live Matches</h2>

      <div style={{ marginBottom: "12px" }}>
        {leagues.map((league) => (
          <button
            key={league}
            onClick={() => setLeagueFilter(league)}
            style={{ marginRight: "8px" }}
          >
            {league}
          </button>
        ))}
      </div>

      {filteredMatches.map((match) => (
        <div
          key={match.fixture.id}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #333",
            borderRadius: "8px",
          }}
        >
          <strong>
            {match.teams.home.name} vs {match.teams.away.name}
          </strong>
          <p>
            {match.goals.home} – {match.goals.away}
          </p>
          <p>{match.fixture.status.long}</p>
        </div>
      ))}
    </section>
  );
}
