
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* =====================================================
   HELPERS
===================================================== */

function getTeamName(team) {
  if (!team) return "Unknown";

  if (typeof team === "string") {
    return team;
  }

  return (
    team.name ||
    team.team?.name ||
    team.shortName ||
    team.tla ||
    "Unknown"
  );
}

function getTeamLogo(team) {
  if (!team || typeof team === "string") {
    return null;
  }

  return (
    team.crest ||
    team.logo ||
    team.team?.crest ||
    team.team?.logo ||
    null
  );
}

function getScore(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  return value;
}

function getMatchId(match) {
  return (
    match?.id ||
    match?.fixture?.id ||
    match?.fixtureId ||
    match?.matchId ||
    match?.match?.id ||
    null
  );
}

function getMatchDate(match) {
  return (
    match?.utcDate ||
    match?.fixture?.date ||
    match?.date ||
    match?.match?.utcDate ||
    match?.match?.date ||
    null
  );
}

function formatDate(date) {
  if (!date) {
    return "Date unavailable";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date) {
  if (!date) {
    return "";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatus(match) {
  if (match?.status === "FINISHED") {
    return "FT";
  }

  if (
    match?.status &&
    typeof match.status === "object"
  ) {
    return (
      match.status.short ||
      match.status.long ||
      "FT"
    );
  }

  return (
    match?.status?.short ||
    match?.fixture?.status?.short ||
    match?.match?.status?.short ||
    "FT"
  );
}

function getStatusLabel(match) {
  const status = getStatus(match);

  switch (status) {
    case "FT":
    case "FINISHED":
      return "Full Time";

    case "AET":
      return "After Extra Time";

    case "PEN":
      return "Penalties";

    case "CANC":
      return "Cancelled";

    case "ABD":
      return "Abandoned";

    case "POSTPONED":
      return "Postponed";

    default:
      return status;
  }
}

/* =====================================================
   NORMALIZE MATCH

   Supports:

   1. football-data.org
      {
        id,
        utcDate,
        status,
        homeTeam,
        awayTeam,
        score: {
          fullTime: {
            home,
            away
          }
        }
      }

   2. API-Football style
      {
        fixture,
        teams,
        goals
      }

   3. Older Apex Sports response shapes
===================================================== */

function normalizeMatch(match) {
  if (!match) {
    return {
      id: null,
      date: null,
      homeName: "Unknown",
      homeLogo: null,
      awayName: "Unknown",
      awayLogo: null,
      homeScore: "-",
      awayScore: "-",
      status: "FT",
      statusLabel: "Full Time",
      venue: null,
    };
  }

  /*
    Some APIs may wrap the actual match inside
    a "match" property.
  */
  const source =
    match?.match &&
    typeof match.match === "object"
      ? {
          ...match.match,
          ...match,
        }
      : match;

  /* ===================================================
     TEAMS
  =================================================== */

  const home =
    source?.homeTeam ||
    source?.home ||
    source?.teams?.home ||
    source?.match?.homeTeam ||
    {};

  const away =
    source?.awayTeam ||
    source?.away ||
    source?.teams?.away ||
    source?.match?.awayTeam ||
    {};

  /* ===================================================
     SCORE
  =================================================== */

  const fullTime =
    source?.score?.fullTime ||
    source?.score?.fulltime ||
    source?.fullTime ||
    source?.match?.score?.fullTime ||
    {};

  const goals =
    source?.goals ||
    source?.match?.goals ||
    {};

  const homeScore =
    fullTime?.home ??
    goals?.home ??
    source?.homeScore ??
    home?.goals ??
    null;

  const awayScore =
    fullTime?.away ??
    goals?.away ??
    source?.awayScore ??
    away?.goals ??
    null;

  /* ===================================================
     DATE
  =================================================== */

  const date =
    source?.utcDate ||
    source?.fixture?.date ||
    source?.date ||
    source?.match?.utcDate ||
    source?.match?.date ||
    null;

  /* ===================================================
     STATUS
  =================================================== */

  const status =
    source?.status === "FINISHED"
      ? "FT"
      : getStatus(source);

  /* ===================================================
     VENUE
  =================================================== */

  const venue =
    source?.fixture?.venue?.name ||
    source?.venue?.name ||
    source?.venue ||
    source?.match?.venue?.name ||
    null;

  /* ===================================================
     RETURN NORMALIZED MATCH
  =================================================== */

  return {
    id: getMatchId(source),

    date,

    homeName: getTeamName(home),

    homeLogo: getTeamLogo(home),

    awayName: getTeamName(away),

    awayLogo: getTeamLogo(away),

    homeScore: getScore(homeScore),

    awayScore: getScore(awayScore),

    status,

    statusLabel:
      source?.status === "FINISHED"
        ? "Full Time"
        : getStatusLabel(source),

    venue,
  };
}

/* =====================================================
   TEAM LOGO
===================================================== */

function TeamLogo({ src, name }) {
  if (!src) {
    return (
      <div className="flex h-[42px] w-[42px] min-w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-gray-800 text-lg font-bold text-gray-400">
        {name?.charAt(0)?.toUpperCase() || "?"}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={42}
      height={42}
      loading="lazy"
      className="h-[42px] w-[42px] min-w-[42px] shrink-0 object-contain"
    />
  );
}

/* =====================================================
   MATCH CARD
===================================================== */

function ResultCard({ match }) {
  const matchId = match.id;

  const content = (
    <article className="rounded-[18px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-700">
      {/* DATE */}

      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] font-semibold text-gray-400">
          {formatDate(match.date)}
        </div>

        <div className="text-xs text-gray-500">
          {formatTime(match.date)}
        </div>
      </div>

      {/* TEAMS */}

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-4">
        {/* HOME */}

        <div className="flex min-w-0 items-center gap-3">
          <TeamLogo
            src={match.homeLogo}
            name={match.homeName}
          />

          <span className="break-words text-[15px] font-bold leading-[1.3] text-white">
            {match.homeName}
          </span>
        </div>

        {/* SCORE */}

        <div className="min-w-[80px] text-center">
          <div className="whitespace-nowrap text-[25px] font-extrabold tracking-[1px] text-white">
            {match.homeScore}

            <span className="mx-[7px] text-gray-500">
              -
            </span>

            {match.awayScore}
          </div>

          <div className="mt-[5px] text-[11px] font-bold uppercase tracking-[0.5px] text-green-500">
            {match.statusLabel}
          </div>
        </div>

        {/* AWAY */}

        <div className="flex min-w-0 items-center justify-end gap-3">
          <span className="break-words text-right text-[15px] font-bold leading-[1.3] text-white">
            {match.awayName}
          </span>

          <TeamLogo
            src={match.awayLogo}
            name={match.awayName}
          />
        </div>
      </div>

      {/* VENUE */}

      {match.venue && (
        <div className="mt-[18px] border-t border-gray-800 pt-3.5 text-xs text-gray-500">
          📍 {match.venue}
        </div>
      )}
    </article>
  );

  if (!matchId) {
    return content;
  }

  return (
    <Link
      href={`/match/${matchId}`}
      className="block text-inherit no-underline"
    >
      {content}
    </Link>
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function ResultsClient({
  initialMatches = [],
  league = "",
  leagueName = "League Results",
}) {
  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] =
    useState("all");

  /* ===================================================
     NORMALIZE MATCHES
  =================================================== */

  const normalizedMatches = useMemo(() => {
    if (!Array.isArray(initialMatches)) {
      return [];
    }

    return initialMatches
      .map(normalizeMatch)
      .sort((a, b) => {
        const dateA = new Date(
          a.date || 0
        ).getTime();

        const dateB = new Date(
          b.date || 0
        ).getTime();

        return dateB - dateA;
      });
  }, [initialMatches]);

  /* ===================================================
     FILTER MATCHES
  =================================================== */

  const filteredMatches = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return normalizedMatches.filter((match) => {
      const homeName =
        match.homeName?.toLowerCase() || "";

      const awayName =
        match.awayName?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        homeName.includes(query) ||
        awayName.includes(query);

      if (!matchesSearch) {
        return false;
      }

      if (selectedDate === "all") {
        return true;
      }

      if (!match.date) {
        return false;
      }

      const date = new Date(match.date);

      if (Number.isNaN(date.getTime())) {
        return false;
      }

      const today = new Date();

      if (selectedDate === "today") {
        return (
          date.toDateString() ===
          today.toDateString()
        );
      }

      if (selectedDate === "yesterday") {
        const yesterday = new Date(today);

        yesterday.setDate(
          yesterday.getDate() - 1
        );

        return (
          date.toDateString() ===
          yesterday.toDateString()
        );
      }

      return true;
    });
  }, [
    normalizedMatches,
    search,
    selectedDate,
  ]);

  /* ===================================================
     EMPTY STATE
  =================================================== */

  if (normalizedMatches.length === 0) {
    return (
      <section>
        <header className="mb-[30px]">
          <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-red-500">
            ⚽ Apex Sports
          </div>

          <h1 className="text-[clamp(28px,5vw,42px)] font-extrabold leading-tight text-white">
            {leagueName}
          </h1>

          <p className="mt-2.5 text-[15px] text-gray-400">
            No completed matches are
            available for this league
            right now.
          </p>
        </header>

        <div className="rounded-[20px] border border-gray-800 bg-gray-900 px-6 py-[55px] text-center sm:px-[25px]">
          <div className="mb-[15px] text-[42px]">
            ⚽
          </div>

          <h2 className="mb-2 text-[22px] font-bold text-white">
            No results found
          </h2>

          <p className="m-0 text-sm text-gray-400">
            There are currently no
            results available for{" "}
            {leagueName}.
          </p>
        </div>
      </section>
    );
  }

  /* ===================================================
     PAGE
  =================================================== */

  return (
    <section>
      {/* HEADER */}

      <header className="mb-7">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h1 className="text-[clamp(28px,5vw,42px)] font-extrabold leading-tight text-white">
          {leagueName}
        </h1>

        <p className="mt-2 text-[15px] text-gray-400">
          Latest completed matches,
          scores and results.
        </p>
      </header>

      {/* FILTERS */}

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search team..."
          aria-label="Search team"
          className="min-w-0 flex-[1_1_240px] rounded-xl border border-gray-800 bg-gray-900 px-[15px] py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
        />

        <select
          value={selectedDate}
          onChange={(event) =>
            setSelectedDate(
              event.target.value
            )
          }
          aria-label="Filter results by date"
          className="w-full flex-[0_1_180px] rounded-xl border border-gray-800 bg-gray-900 px-[15px] py-3 text-sm text-white outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 sm:w-auto"
        >
          <option value="all">
            All Results
          </option>

          <option value="today">
            Today
          </option>

          <option value="yesterday">
            Yesterday
          </option>
        </select>
      </div>

      {/* RESULT COUNT */}

      <div className="mb-4 text-[13px] font-semibold text-gray-500">
        Showing{" "}
        {filteredMatches.length}{" "}
        of{" "}
        {normalizedMatches.length}{" "}
        results
      </div>

      {/* RESULTS */}

      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredMatches.map(
            (match, index) => (
              <ResultCard
                key={
                  match.id ||
                  `${match.homeName}-${match.awayName}-${match.date}-${index}`
                }
                match={match}
              />
            )
          )}
        </div>
      ) : (
        <div className="rounded-[18px] border border-gray-800 bg-gray-900 p-10 text-center">
          <div className="mb-2 text-xl font-bold text-white">
            No matching results
          </div>

          <p className="m-0 text-sm text-gray-400">
            Try another team name or
            change the date filter.
          </p>
        </div>
      )}
    </section>
  );
}
