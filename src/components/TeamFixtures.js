"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamFixtures({
  fixtures = [],
}) {
  if (
    !Array.isArray(fixtures) ||
    fixtures.length === 0
  ) {
    return null;
  }

  const upcomingFixtures =
    fixtures
      .filter((match) => {
        const status =
          match?.status ||
          match?.fixture?.status?.short;

        return (
          status === "SCHEDULED" ||
          status === "TIMED" ||
          status === "NS"
        );
      })
      .sort(
        (a, b) =>
          new Date(
            a?.utcDate ||
              a?.fixture?.date ||
              0
          ) -
          new Date(
            b?.utcDate ||
              b?.fixture?.date ||
              0
          )
      );

  if (upcomingFixtures.length === 0) {
    return (
      <section
        id="fixtures"
        className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
      >
        <h2 className="m-0 mb-3 text-[28px] text-white">
          📅 Upcoming Fixtures
        </h2>

        <p className="m-0 text-slate-400">
          No upcoming fixtures are available.
        </p>
      </section>
    );
  }

  return (
    <section
      id="fixtures"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          📅 Upcoming Fixtures
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Scheduled matches for this
          team.
        </p>
      </div>

      {/* FIXTURES */}

      <div className="grid gap-[18px]">
        {upcomingFixtures.map(
          (match, index) => {
            const matchId =
              match?.id ??
              match?.fixture?.id ??
              `fixture-${index}`;

            const competition =
              match?.competition ||
              match?.league ||
              {};

            const home =
              match?.homeTeam ||
              match?.teams?.home ||
              {};

            const away =
              match?.awayTeam ||
              match?.teams?.away ||
              {};

            const matchDate =
              match?.utcDate ||
              match?.fixture?.date ||
              null;

            const competitionLogo =
              competition?.emblem ||
              competition?.logo ||
              null;

            const homeLogo =
              home?.crest ||
              home?.logo ||
              null;

            const awayLogo =
              away?.crest ||
              away?.logo ||
              null;

            const competitionName =
              competition?.name ||
              "Premier League";

            const dateText =
              matchDate
                ? new Date(
                    matchDate
                  ).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "-";

            const timeText =
              matchDate
                ? new Date(
                    matchDate
                  ).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )
                : "-";

            const card = (
              <article className="rounded-[18px] border border-[#293548] bg-gray-800 p-[22px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_25px_rgba(0,0,0,0.28)]">
                {/* Competition */}

                <div className="mb-5 flex flex-wrap items-center justify-between gap-[15px]">
                  <div className="flex min-w-0 items-center gap-2.5">
                    {competitionLogo ? (
                      <Image
                        src={
                          competitionLogo
                        }
                        alt={
                          competitionName
                        }
                        width={28}
                        height={28}
                        unoptimized
                        className="shrink-0 object-contain"
                      />
                    ) : (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-[10px] font-black text-green-500">
                        PL
                      </div>
                    )}

                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold text-slate-300">
                      {competitionName}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-[13px] font-bold text-white">
                      {dateText}
                    </div>

                    <div className="mt-[3px] text-xs text-slate-500">
                      {timeText}
                    </div>
                  </div>
                </div>

                {/* Match */}

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[18px]">
                  {/* HOME */}

                  <TeamBlock
                    team={home}
                    align="left"
                    logo={homeLogo}
                  />

                  {/* VS */}

                  <div className="min-w-[85px] text-center">
                    <div className="text-[18px] font-black text-white">
                      VS
                    </div>

                    <div className="mt-1.5 text-[11px] font-extrabold uppercase text-amber-500">
                      Upcoming
                    </div>
                  </div>

                  {/* AWAY */}

                  <TeamBlock
                    team={away}
                    align="right"
                    logo={awayLogo}
                  />
                </div>

                {/* Match details */}

                <div className="mt-5 flex flex-wrap justify-between gap-[15px] border-t border-[#293548] pt-[15px] text-xs text-slate-400">
                  <span>
                    📅 {dateText}
                  </span>

                  <span>
                    ⏰ {timeText}
                  </span>

                  {match?.venue?.name && (
                    <span>
                      🏟{" "}
                      {match.venue.name}
                    </span>
                  )}
                </div>
              </article>
            );

            return matchId ? (
              <Link
                key={matchId}
                href={`/match/${matchId}`}
                className="block text-inherit no-underline"
              >
                {card}
              </Link>
            ) : (
              <div key={index}>
                {card}
              </div>
            );
          }
        )}
      </div>

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
TEAM BLOCK
===================================================== */

function TeamBlock({
  team = {},
  align = "left",
  logo = null,
}) {
  const isRight =
    align === "right";

  const name =
    team?.name ||
    team?.shortName ||
    "Unknown Team";

  const teamLogo =
    logo ||
    team?.crest ||
    team?.logo ||
    null;

  return (
    <div
      className={`flex min-w-0 items-center gap-2.5 ${
        isRight
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isRight &&
        (teamLogo ? (
          <Image
            src={teamLogo}
            alt={name}
            width={42}
            height={42}
            unoptimized
            className="shrink-0 object-contain"
          />
        ) : (
          <TeamFallback name={name} />
        ))}

      <strong
        className={`break-words text-sm leading-[1.35] text-white [overflow-wrap:anywhere] ${
          isRight
            ? "text-right"
            : "text-left"
        }`}
      >
        {name}
      </strong>

      {isRight &&
        (teamLogo ? (
          <Image
            src={teamLogo}
            alt={name}
            width={42}
            height={42}
            unoptimized
            className="shrink-0 object-contain"
          />
        ) : (
          <TeamFallback name={name} />
        ))}
    </div>
  );
}

/* =====================================================
TEAM FALLBACK
===================================================== */

function TeamFallback({
  name,
}) {
  return (
    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-gray-900 text-[11px] font-black text-green-500">
      {name
        ?.slice(0, 2)
        ?.toUpperCase() ||
        "FC"}
    </div>
  );
}