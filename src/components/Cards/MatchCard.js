"use client";

import Link from "next/link";
import Image from "next/image";

export default function MatchCard({ match }) {
  if (!match) return null;

  const status = match.status || {};
  const league = match.league || {};
  const home = match.home || {};
  const away = match.away || {};
  const goals = match.goals || {};

  const getStatusClass = () => {
    switch (status.short) {
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
        status.short
      )
    ) {
      return `${status.elapsed || 0}'`;
    }

    if (status.short === "FT") {
      return "FT";
    }

    if (match.fixture?.date) {
      return new Date(
        match.fixture.date
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "-";
  };

  return (
    <Link
      href={`/match/${match.fixture?.id || match.id}`}
      className="match-card-pro"
    >
      {/* Header */}

      <div className="match-card-header">
        <div className="league-info">
          {league.logo ? (
            <Image
              src={league.logo}
              alt={league.name || "League"}
              width={20}
              height={20}
            />
          ) : (
            <div className="h-5 w-5 rounded-full bg-slate-700" />
          )}

          <div>
            <div className="league-name">
              {league.name || "Unknown League"}
            </div>

            <div className="league-country">
              {league.country || "-"}
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
          {home.logo ? (
            <Image
              src={home.logo}
              alt={home.name || "Home team"}
              width={42}
              height={42}
            />
          ) : (
            <div className="h-[42px] w-[42px] rounded-full bg-slate-800" />
          )}

          <span>
            {home.name || "Home Team"}
          </span>
        </div>

        <div className="score-center">
          <span>
            {goals.home ?? "-"}
          </span>

          <span className="score-divider">
            -
          </span>

          <span>
            {goals.away ?? "-"}
          </span>
        </div>

        <div className="team-side">
          {away.logo ? (
            <Image
              src={away.logo}
              alt={away.name || "Away team"}
              width={42}
              height={42}
            />
          ) : (
            <div className="h-[42px] w-[42px] rounded-full bg-slate-800" />
          )}

          <span>
            {away.name || "Away Team"}
          </span>
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