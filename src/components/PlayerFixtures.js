"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerFixtures({ fixtures = [] }) {
  if (!Array.isArray(fixtures) || fixtures.length === 0) {
    return null;
  }

  return (
    <section className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]">
      {/* HEADER */}

      <div className="mb-7">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          📅 Recent Fixtures
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Player matches from the current season.
        </p>
      </div>

      {/* FIXTURE LIST */}

      <div className="grid gap-[18px]">
        {fixtures.map((match, index) => {
          const matchId =
            match?.id ??
            match?.fixture?.id ??
            `fixture-${index}`;

          const matchDate =
            match?.utcDate ??
            match?.fixture?.date ??
            null;

          const status =
            match?.status ??
            match?.fixture?.status?.short ??
            "";

          const home =
            match?.homeTeam ??
            match?.teams?.home ??
            {};

          const away =
            match?.awayTeam ??
            match?.teams?.away ??
            {};

          const competition =
            match?.competition ??
            match?.league ??
            {};

          const area = match?.area || {};

          const fullTime =
            match?.score?.fullTime || null;

          const legacyGoals =
            match?.goals || null;

          const homeScore =
            fullTime?.home ??
            legacyGoals?.home ??
            null;

          const awayScore =
            fullTime?.away ??
            legacyGoals?.away ??
            null;

          const isFinished =
            status === "FINISHED" ||
            status === "FT" ||
            status === "AET" ||
            status === "PEN";

          const isScheduled =
            status === "SCHEDULED" ||
            status === "TIMED" ||
            status === "NS";

          const dateText = matchDate
            ? new Date(matchDate).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "-";

          const timeText = matchDate
            ? new Date(matchDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })
            : "-";

          const homeName =
            home?.name ||
            home?.shortName ||
            "Home Team";

          const awayName =
            away?.name ||
            away?.shortName ||
            "Away Team";

          const homeLogo =
            home?.crest ||
            home?.logo ||
            null;

          const awayLogo =
            away?.crest ||
            away?.logo ||
            null;

          const leagueName =
            competition?.name ||
            "Premier League";

          const leagueLogo =
            competition?.emblem ||
            competition?.logo ||
            null;

          const venueName =
            match?.venue?.name ||
            match?.fixture?.venue?.name ||
            null;

          const matchHref =
            match?.id
              ? `/match/${match.id}`
              : match?.fixture?.id
              ? `/match/${match.fixture.id}`
              : null;

          const card = (
            <article className="rounded-[18px] border border-[#293548] bg-gray-800 p-[22px] transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:border-gray-700 hover:shadow-[0_14px_28px_rgba(0,0,0,0.30)]">
              {/* COMPETITION / DATE */}

              <div className="mb-[22px] flex flex-wrap items-center justify-between gap-[15px]">
                <div className="flex min-w-0 items-center gap-2.5">
                  {leagueLogo ? (
                    <Image
                      src={leagueLogo}
                      alt={leagueName}
                      width={30}
                      height={30}
                      unoptimized
                      className="shrink-0 object-contain"
                    />
                  ) : (
                    <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-gray-900 text-xs font-extrabold text-green-500">
                      PL
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-white">
                      {leagueName}
                    </div>

                    <div className="mt-[3px] text-xs text-slate-500">
                      {area?.name || "England"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[13px] font-semibold text-slate-300">
                    {dateText}
                  </div>

                  <div className="mt-[3px] text-xs text-slate-500">
                    {timeText}
                  </div>
                </div>
              </div>

              {/* MATCH */}

              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[18px]">
                {/* HOME */}

                <TeamBlock
                  name={homeName}
                  logo={homeLogo}
                  align="left"
                />

                {/* SCORE / STATUS */}

                <div className="min-w-[90px] text-center">
                  {isFinished ? (
                    <>
                      <div className="whitespace-nowrap text-[26px] font-extrabold text-white">
                        {homeScore ?? "-"}
                        <span className="mx-[7px] text-slate-500">
                          -
                        </span>
                        {awayScore ?? "-"}
                      </div>

                      <div className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.6px] text-green-500">
                        {status === "PEN"
                          ? "Penalties"
                          : status === "AET"
                          ? "After Extra Time"
                          : "Full Time"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-extrabold text-white">
                        VS
                      </div>

                      <div
                        className={`mt-1.5 text-[11px] font-extrabold uppercase ${
                          isScheduled
                            ? "text-amber-500"
                            : "text-slate-400"
                        }`}
                      >
                        {isScheduled
                          ? "Upcoming"
                          : status || "Scheduled"}
                      </div>
                    </>
                  )}
                </div>

                {/* AWAY */}

                <TeamBlock
                  name={awayName}
                  logo={awayLogo}
                  align="right"
                />
              </div>

              {/* VENUE */}

              <div className="mt-5 flex flex-wrap justify-between gap-[15px] border-t border-[#293548] pt-4 text-xs text-slate-400">
                <span>
                  🏟 {venueName || "Venue unavailable"}
                </span>

                <span>⏰ {timeText}</span>
              </div>
            </article>
          );

          if (!matchHref) {
            return <div key={matchId}>{card}</div>;
          }

          return (
            <Link
              key={matchId}
              href={matchHref}
              className="block text-inherit no-underline"
            >
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* =====================================================
TEAM BLOCK
===================================================== */

function TeamBlock({ name, logo, align }) {
  const isRight = align === "right";

  return (
    <div
      className={`flex min-w-0 items-center gap-3 ${
        isRight ? "justify-end" : "justify-start"
      }`}
    >
      {!isRight &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={46}
            height={46}
            unoptimized
            className="h-[46px] w-[46px] shrink-0 object-contain"
          />
        ) : (
          <TeamFallback name={name} />
        ))}

      <strong
        className={`text-[15px] leading-[1.35] text-white [overflow-wrap:anywhere] ${
          isRight ? "text-right" : "text-left"
        }`}
      >
        {name}
      </strong>

      {isRight &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={46}
            height={46}
            unoptimized
            className="h-[46px] w-[46px] shrink-0 object-contain"
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

function TeamFallback({ name }) {
  return (
    <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px] bg-gray-900 text-sm font-extrabold text-green-500">
      {name?.slice(0, 2)?.toUpperCase() || "FC"}
    </div>
  );
}