"use client";

import Link from "next/link";
import Image from "next/image";

export default function MatchCard({ match }) {
  if (!match) return null;

  const getStatusClass = () => {
    switch (match.status.short) {
      case "LIVE":
      case "1H":
      case "2H":
      case "HT":
        return "status-live";

      case "FT":
        return "status-ft";

      default:
        return "status-upcoming";
    }
  };

  const getStatusText = () => {
    if (
      ["LIVE", "1H", "2H", "HT"].includes(
        match.status.short
      )
    ) {
      return `${match.status.elapsed || 0}'`;
    }

    if (match.status.short === "FT") {
      return "FT";
    }

    return new Date(match.fixture.date).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
  };

  return (
    <Link
      href={`/match/${match.fixture?.id || match.id}`}
      className="match-card-pro"
    >
      {/* Header */}

      <div className="match-card-header">
        <div className="league-info">
          <Image
            src={match.league.logo}
            alt={match.league.name}
            width={20}
            height={20}
          />

          <div>
            <div className="league-name">
              {match.league.name}
            </div>

            <div className="league-country">
              {match.league.country}
            </div>
          </div>
        </div>

        <div
          className={`match-status ${getStatusClass()}`}
        >
          {getStatusText()}
        </div>
      </div>

      {/* Teams */}

      <div className="teams-wrapper">

        <div className="team-side">
          <Image
            src={match.home.logo}
            alt={match.home.name}
            width={42}
            height={42}
          />

          <span>{match.home.name}</span>
        </div>

        <div className="score-center">
          <span>{match.goals.home ?? "-"}</span>

          <span className="score-divider">
            -
          </span>

          <span>{match.goals.away ?? "-"}</span>
        </div>

        <div className="team-side">
          <Image
            src={match.away.logo}
            alt={match.away.name}
            width={42}
            height={42}
          />

          <span>{match.away.name}</span>
        </div>

      </div>

      {/* Footer */}

      <div className="match-card-footer">
        <span>
          View Match
        </span>

        <span>
          →
        </span>
      </div>
    </Link>
  );
}