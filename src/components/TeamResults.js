"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamResults({
  results = [],
}) {
  const matches = Array.isArray(results)
    ? results
        .filter((match) => {
          const status = match?.status;

          return (
            status === "FINISHED" ||
            status === "AWARDED" ||
            status === "FT"
          );
        })
        .sort(
          (a, b) =>
            new Date(
              b?.utcDate ||
                b?.fixture?.date ||
                0
            ) -
            new Date(
              a?.utcDate ||
                a?.fixture?.date ||
                0
            )
        )
        .slice(0, 10)
    : [];

  return (
    <section
      id="results"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🏁 Latest Results
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          The team's most recent completed
          matches.
        </p>
      </div>

      {/* EMPTY STATE */}

      {matches.length === 0 ? (
        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-10 text-center">
          <div className="mb-[14px] text-[48px]">
            🏁
          </div>

          <h3 className="mb-2 text-white">
            No Results Available
          </h3>

          <p className="m-0 text-sm text-slate-400">
            No completed team results are
            available from the current data
            source.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {matches.map(
            (match, index) => {
              const matchId =
                match?.id ??
                match?.fixture?.id ??
                null;

              const home =
                match?.homeTeam ||
                match?.teams?.home ||
                {};

              const away =
                match?.awayTeam ||
                match?.teams?.away ||
                {};

              const score =
                match?.score?.fullTime ||
                {};

              const homeGoals =
                score?.home ??
                match?.goals?.home ??
                0;

              const awayGoals =
                score?.away ??
                match?.goals?.away ??
                0;

              const competition =
                match?.competition ||
                match?.league ||
                {};

              const matchDate =
                match?.utcDate ||
                match?.fixture?.date ||
                null;

              const venue =
                match?.venue ||
                match?.fixture?.venue ||
                {};

              const competitionName =
                competition?.name ||
                "Premier League";

              const competitionLogo =
                competition?.emblem ||
                competition?.logo ||
                null;

              const dateText = matchDate
                ? new Date(
                    matchDate
                  ).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )
                : "Unknown Date";

              const resultText =
                homeGoals > awayGoals
                  ? "Home Win"
                  : homeGoals < awayGoals
                  ? "Away Win"
                  : "Draw";

              const resultColor =
                homeGoals === awayGoals
                  ? "#facc15"
                  : "#22c55e";

              const card = (
                <article className="rounded-[18px] border border-[#293548] bg-gray-800 p-5 transition-all duration-300 hover:-translate-y-[3px] hover:border-green-500 hover:shadow-[0_10px_24px_rgba(0,0,0,0.30)]">
                  {/* DATE / COMPETITION */}

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
                          width={26}
                          height={26}
                          unoptimized
                          className="shrink-0 object-contain"
                        />
                      ) : (
                        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-gray-900 text-[10px] font-black text-green-500">
                          PL
                        </div>
                      )}

                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold text-slate-300">
                        {competitionName}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      {dateText}
                    </div>
                  </div>

                  {/* TEAMS / SCORE */}

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[18px]">
                    {/* HOME */}

                    <TeamBlock
                      team={home}
                      align="left"
                    />

                    {/* SCORE */}

                    <div className="min-w-[95px] text-center">
                      <div className="text-[28px] font-black text-green-500">
                        {homeGoals}
                        {" - "}
                        {awayGoals}
                      </div>

                      <div
                        className="mt-1.5 inline-block rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-extrabold uppercase"
                        style={{
                          color:
                            resultColor,
                        }}
                      >
                        {resultText}
                      </div>
                    </div>

                    {/* AWAY */}

                    <TeamBlock
                      team={away}
                      align="right"
                    />
                  </div>

                  {/* MATCH DETAILS */}

                  <div className="mt-[18px] flex flex-wrap items-center justify-between gap-3 border-t border-[#293548] pt-[15px] text-xs text-slate-400">
                    <span>
                      📍{" "}
                      {venue?.name ||
                        "Venue unavailable"}
                    </span>

                    {match?.stage && (
                      <span>
                        🏆{" "}
                        {match.stage}
                      </span>
                    )}
                  </div>
                </article>
              );

              if (!matchId) {
                return (
                  <div
                    key={`result-${index}`}
                  >
                    {card}
                  </div>
                );
              }

              return (
                <Link
                  key={matchId}
                  href={`/match/${matchId}`}
                  className="block text-inherit no-underline"
                >
                  {card}
                </Link>
              );
            }
          )}
        </div>
      )}

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
}) {
  const isRight =
    align === "right";

  const name =
    team?.name ||
    team?.shortName ||
    "Unknown Team";

  const logo =
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
        (logo ? (
          <Image
            src={logo}
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
        (logo ? (
          <Image
            src={logo}
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