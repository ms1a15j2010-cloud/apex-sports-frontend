"use client";

import MatchCard from "./MatchCard";

export default function MatchList({ matches = [] }) {
  if (matches.length === 0) {
    return (
      <div className="empty-state">
        ⚽ No matches found.
      </div>
    );
  }

  return (
    <div className="match-list">
      {matches.map((match) => (
  <MatchCard
    key={match.fixture?.id || match.id || `${match.home?.id}-${match.away?.id}`}
    match={match}
  />
))}
    </div>
  );
}