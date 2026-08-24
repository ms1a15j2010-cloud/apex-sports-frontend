"use client";

import Link from "next/link";
import Image from "next/image";

export default function MatchCard({ match }) {
  if (!match) return null;

  /*
   * Support multiple backend/API response formats.
   */
  const status = match.status || {};
  const league = match.league || {};

  const home =
    match.home ||
    match.teams?.home ||
    match.homeTeam ||
    {};

  const away =
    match.away ||
    match.teams?.away ||
    match.awayTeam ||
    {};

  const goals = match.goals || {};
  const score = match.score || {};

  const fullTime =
    score.fulltime ||
    score.fullTime ||
    {};

  /*
   * Match ID
   */
  const matchId =
    match.fixture?.id ||
    match.id ||
    match.matchId;

  /*
   * Status styling
   */
  const getStatusClass = () => {
    switch (status.short) {
      case "LIVE":
      case "1H":
      case "2H":
      case "HT":
      case "IN_PLAY":
        return "status-live";

      case "FT":
      case "FINISHED":
        return "status-ft";

      default:
        return "status-upcoming";
    }
  };

  /*
   * Status text
   */
  const getStatusText = () => {
    if (
      [
        "LIVE",
        "1H",
        "2H",
        "HT",
        "IN_PLAY",
      ].includes(status.short)
    ) {
      return `${status.elapsed || 0}'`;
    }

    if (
      status.short === "FT" ||
      status.short === "FINISHED"
    ) {
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

    if (match.utcDate) {
      return new Date(
        match.utcDate
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "-";
  };

  /*
   * Support both:
   *
   * goals.home / goals.away
   *
   * and:
   *
   * score.fulltime.home / score.fulltime.away
   */
  const homeGoals =
    goals.home ??
    fullTime.home ??
    "-";

  const awayGoals =
    goals.away ??
    fullTime.away ??
    "-";

  /*
   * Safe match URL
   */
  const matchHref = matchId
    ? `/match/${matchId}`
    : "#";

  return (
    <Link
      href={matchHref}
      className="match-card-pro"
    >
      {/* Header */}

      <div className="match-card-header">
        <div className="league-info">
          {league.logo ? (
            <Image
              src={league.logo}
              alt={
                league.name ||
                "League"
              }
              width={20}
              height={20}
            />
          ) : (
            <div className="h-5 w-5 rounded-full bg-slate-700" />
          )}

          <div>
            <div className="league-name">
              {league.name ||
                "Unknown League"}
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
        {/* Home Team */}

        <div className="team-side">
          {home.logo ? (
            <Image
              src={home.logo}
              alt={
                home.name ||
                "Home team"
              }
              width={42}
              height={42}
            />
          ) : (
            <div className="h-[42px] w-[42px] rounded-full bg-slate-800" />
          )}

          <span>
            {home.name ||
              "Home Team"}
          </span>
        </div>

        {/* Score */}

        <div className="score-center">
          <span>
            {homeGoals}
          </span>

          <span className="score-divider">
            -
          </span>

          <span>
            {awayGoals}
          </span>
        </div>

        {/* Away Team */}

        <div className="team-side">
          {away.logo ? (
            <Image
              src={away.logo}
              alt={
                away.name ||
                "Away team"
              }
              width={42}
              height={42}
            />
          ) : (
            <div className="h-[42px] w-[42px] rounded-full bg-slate-800" />
          )}

          <span>
            {away.name ||
              "Away Team"}
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