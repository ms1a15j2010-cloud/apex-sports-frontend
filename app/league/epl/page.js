import { Suspense } from "react";

export const metadata = {
  title: "Premier League Live Scores & Standings | Apex Sports",
  description:
    "Live Premier League scores, standings, fixtures and match updates. Fast TV-style scoreboard.",
};

async function getMatches() {
  // Replace with real API later
  return [
    { id: 1, home: "Arsenal", away: "Chelsea", score: "2 - 1", status: "FT" },
    { id: 2, home: "Man City", away: "Liverpool", score: "1 - 1", status: "LIVE" },
  ];
}

async function LeagueContent() {
  const matches = await getMatches();

  return (
    <div className="league-container">
      <h1 className="league-title">Premier League</h1>

      <div className="match-grid">
        {matches.map((match) => (
          <a key={match.id} href={`/match/${match.id}`} className="match-card">
            <div className="teams">
              <span>{match.home}</span>
              <span className="score">{match.score}</span>
              <span>{match.away}</span>
            </div>
            <div className="status">{match.status}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function EPLPage() {
  return (
    <Suspense fallback={<div className="loading">Loading matches...</div>}>
      <LeagueContent />
    </Suspense>
  );
}
