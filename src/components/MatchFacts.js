"use client";

import Image from "next/image";

/* =====================================================
SAFE DISPLAY VALUE

Prevents React from trying to render API objects
directly as children.
===================================================== */

function getDisplayValue(
  value,
  fallback = "-"
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return value;
  }

  if (typeof value === "object") {
    return (
      value.name ||
      value.shortName ||
      value.code ||
      value.tla ||
      fallback
    );
  }

  return fallback;
}

export default function MatchFacts({
  match,
  statistics = [],
}) {
  if (!match) return null;

  const fixture =
    match.fixture || {};

  const league =
    match.league || {};

  const home =
    match.teams?.home || {};

  const away =
    match.teams?.away || {};

  const homeStats =
    statistics[0] || {};

  const awayStats =
    statistics[1] || {};

  function getStat(team, type) {
    const stat =
      team.statistics?.find(
        (item) =>
          item?.type === type
      );

    return getDisplayValue(
      stat?.value
    );
  }

  const facts = [
    {
      title: "Referee",
      value: getDisplayValue(
        fixture.referee
      ),
    },

    {
      title: "Stadium",
      value: getDisplayValue(
        fixture.venue?.name
      ),
    },

    {
      title: "City",
      value: getDisplayValue(
        fixture.venue?.city
      ),
    },

    {
      title: "League",
      value: getDisplayValue(
        league.name
      ),
    },

    {
      title: "Country",
      value: getDisplayValue(
        league.country
      ),
    },

    {
      title: "Season",
      value: getDisplayValue(
        league.season
      ),
    },

    {
      title: "Round",
      value: getDisplayValue(
        league.round
      ),
    },

    {
      title: "Status",
      value: getDisplayValue(
        fixture.status?.long
      ),
    },

    {
      title: "Attendance",
      value: getDisplayValue(
        fixture.attendance
      ),
    },

    {
      title: "Home Possession",
      value: getStat(
        homeStats,
        "Ball Possession"
      ),
    },

    {
      title: "Away Possession",
      value: getStat(
        awayStats,
        "Ball Possession"
      ),
    },

    {
      title: "Home Pass Accuracy",
      value: getStat(
        homeStats,
        "Passes accurate"
      ),
    },

    {
      title: "Away Pass Accuracy",
      value: getStat(
        awayStats,
        "Passes accurate"
      ),
    },

    {
      title: "Home Fouls",
      value: getStat(
        homeStats,
        "Fouls"
      ),
    },

    {
      title: "Away Fouls",
      value: getStat(
        awayStats,
        "Fouls"
      ),
    },
  ];

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-5 sm:p-[30px]">
      <h2 className="mb-[30px] text-2xl font-bold text-white">
        📖 Match Facts
      </h2>

      {/* Teams */}

      <div className="mb-[35px] grid grid-cols-1 items-center gap-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <TeamCard team={home} />

        <div className="text-center text-[28px] font-bold text-slate-500">
          VS
        </div>

        <TeamCard team={away} />
      </div>

      {/* Facts */}

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
        {facts.map((fact) => (
          <FactCard
            key={fact.title}
            title={fact.title}
            value={fact.value}
          />
        ))}
      </div>
    </section>
  );
}

/* ======================================
TEAM CARD
====================================== */

function TeamCard({ team }) {
  const teamName =
    getDisplayValue(
      team?.name,
      "Unknown Team"
    );

  const teamLogo =
    typeof team?.logo === "string" &&
    team.logo.startsWith("http")
      ? team.logo
      : "/team.png";

  return (
    <div className="rounded-[18px] bg-gray-800 p-5 text-center">
      <Image
        src={teamLogo}
        alt={teamName}
        width={70}
        height={70}
        unoptimized
        className="mx-auto h-[70px] w-[70px] object-contain"
      />

      <h3 className="mt-[15px] mb-0 break-words text-lg font-bold text-white">
        {teamName}
      </h3>
    </div>
  );
}

/* ======================================
FACT CARD
====================================== */

function FactCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-800 p-5">
      <div className="mb-2.5 text-sm text-slate-400">
        {title}
      </div>

      <div className="break-words text-[19px] font-bold text-white">
        {getDisplayValue(value)}
      </div>
    </div>
  );
}
