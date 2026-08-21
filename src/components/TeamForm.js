"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamForm({
  fixtures = [],
  teamId,
}) {
  if (
    !Array.isArray(fixtures) ||
    fixtures.length === 0
  ) {
    return null;
  }

  /* =================================================
     COMPLETED MATCHES
  ================================================= */

  const completedMatches =
    fixtures
      .filter((match) => {
        const status =
          match?.status ||
          match?.fixture?.status?.short;

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
      );

  /* =================================================
     LAST 10 MATCHES
  ================================================= */

  const lastMatches =
    completedMatches.slice(0, 10);

  if (lastMatches.length === 0) {
    return null;
  }

  /* =================================================
     BUILD FORM
  ================================================= */

  const form = lastMatches.map(
    (match) => {
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
        null;

      const awayGoals =
        score?.away ??
        match?.goals?.away ??
        null;

      const isHome =
        Number(home?.id) ===
        Number(teamId);

      const goalsFor = isHome
        ? homeGoals
        : awayGoals;

      const goalsAgainst = isHome
        ? awayGoals
        : homeGoals;

      if (
        goalsFor === null ||
        goalsAgainst === null
      ) {
        return "D";
      }

      if (
        goalsFor >
        goalsAgainst
      ) {
        return "W";
      }

      if (
        goalsFor <
        goalsAgainst
      ) {
        return "L";
      }

      return "D";
    }
  );

  const wins =
    form.filter(
      (result) => result === "W"
    ).length;

  const draws =
    form.filter(
      (result) => result === "D"
    ).length;

  const losses =
    form.filter(
      (result) => result === "L"
    ).length;

  /* =================================================
     RENDER
  ================================================= */

  return (
    <section
      id="form"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          📈 Recent Form
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Latest completed matches
          from the current season.
        </p>
      </div>

      {/* FORM BADGES */}

      <div className="mb-[25px] flex flex-wrap gap-2.5">
        {form.map(
          (result, index) => (
            <div
              key={`${result}-${index}`}
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-full text-[18px] font-black text-white shadow-[0_5px_14px_rgba(0,0,0,0.2)] ${
                result === "W"
                  ? "bg-green-500"
                  : result === "D"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {result}
            </div>
          )
        )}
      </div>

      {/* SUMMARY */}

      <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[18px]">
        <SummaryCard
          title="Wins"
          value={wins}
          color="#22c55e"
        />

        <SummaryCard
          title="Draws"
          value={draws}
          color="#facc15"
        />

        <SummaryCard
          title="Losses"
          value={losses}
          color="#ef4444"
        />

        <SummaryCard
          title="Matches"
          value={lastMatches.length}
          color="#3b82f6"
        />
      </div>

      {/* MATCH LIST */}

      <div className="grid gap-4">
        {lastMatches.map(
          (match, index) => {
            const matchId =
              match?.id ??
              match?.fixture?.id ??
              index;

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

            const result =
              form[index] || "D";

            const card = (
              <article className="rounded-[18px] border border-[#293548] bg-gray-800 p-5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_25px_rgba(0,0,0,0.28)]">
                {/* Competition */}

                <div className="mb-[18px] flex items-center gap-2.5">
                  {competition?.emblem ? (
                    <Image
                      src={
                        competition.emblem
                      }
                      alt={
                        competition.name ||
                        "Competition"
                      }
                      width={26}
                      height={26}
                      unoptimized
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-gray-900 text-[10px] font-extrabold text-green-500">
                      PL
                    </div>
                  )}

                  <span className="text-[13px] font-semibold text-slate-400">
                    {competition?.name ||
                      "Premier League"}
                  </span>
                </div>

                {/* Teams */}

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[18px]">
                  {/* HOME */}

                  <TeamBlock
                    team={home}
                    align="left"
                  />

                  {/* SCORE */}

                  <div className="min-w-[90px] text-center">
                    <div className="text-[23px] font-black text-white">
                      {homeGoals}
                      {" - "}
                      {awayGoals}
                    </div>

                    <div
                      className={`mt-1.5 text-xs font-extrabold uppercase ${
                        result === "W"
                          ? "text-green-500"
                          : result === "L"
                          ? "text-red-500"
                          : "text-yellow-400"
                      }`}
                    >
                      {result}
                    </div>

                    {matchDate && (
                      <div className="mt-1.5 text-xs text-slate-500">
                        {new Date(
                          matchDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* AWAY */}

                  <TeamBlock
                    team={away}
                    align="right"
                  />
                </div>
              </article>
            );

            if (!matchId) {
              return (
                <div key={index}>
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
            width={38}
            height={38}
            unoptimized
            className="shrink-0 object-contain"
          />
        ) : (
          <LogoFallback name={name} />
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
            width={38}
            height={38}
            unoptimized
            className="shrink-0 object-contain"
          />
        ) : (
          <LogoFallback name={name} />
        ))}
    </div>
  );
}

/* =====================================================
FALLBACK LOGO
===================================================== */

function LogoFallback({
  name,
}) {
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] bg-gray-900 text-[11px] font-black text-green-500">
      {name
        ?.slice(0, 2)
        ?.toUpperCase() ||
        "FC"}
    </div>
  );
}

/* =====================================================
SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="rounded-2xl bg-gray-800 p-[22px] text-center"
      style={{
        border: `1px solid ${color}40`,
      }}
    >
      <div className="mb-2.5 text-[13px] text-slate-400">
        {title}
      </div>

      <div
        className="text-[30px] font-black"
        style={{
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}