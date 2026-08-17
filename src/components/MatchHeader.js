"use client";

import Image from "next/image";

function getDisplayValue(value, fallback = "-") {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  if (typeof value === "string" || typeof value === "number") {
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

export default function MatchHeader({ match }) {
  if (!match) return null;

  const fixture = match.fixture || {};
  const league = match.league || {};
  const home = match.teams?.home || {};
  const away = match.teams?.away || {};
  const goals = match.goals || {};

  const status =
    fixture.status?.short ||
    fixture.status?.long ||
    "NS";

  const statusColor =
    status === "FT"
      ? "#22c55e"
      : status === "HT"
      ? "#f59e0b"
      : ["1H", "2H", "LIVE", "ET", "P"].includes(
          status
        )
      ? "#ef4444"
      : "#3b82f6";

  const formattedDate = fixture.date
    ? new Date(
        fixture.date
      ).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const leagueName = getDisplayValue(
    league.name,
    "Football"
  );

  const leagueCountry = getDisplayValue(
    league.country,
    ""
  );

  const leagueRound = getDisplayValue(
    league.round,
    ""
  );

  const homeName = getDisplayValue(
    home.name,
    "Home Team"
  );

  const awayName = getDisplayValue(
    away.name,
    "Away Team"
  );

  const stadiumName = getDisplayValue(
    fixture.venue?.name
  );

  const cityName = getDisplayValue(
    fixture.venue?.city
  );

  const refereeName = getDisplayValue(
    fixture.referee
  );

  const season = getDisplayValue(
    league.season
  );

  const statusLong = getDisplayValue(
    fixture.status?.long,
    status
  );

  const leagueLogo =
    typeof league.logo === "string" &&
    league.logo.startsWith("http")
      ? league.logo
      : "/league.png";

  const homeLogo =
    typeof home.logo === "string" &&
    home.logo.startsWith("http")
      ? home.logo
      : "/team.png";

  const awayLogo =
    typeof away.logo === "string" &&
    away.logo.startsWith("http")
      ? away.logo
      : "/team.png";

  return (
    <section className="mb-[30px] rounded-[22px] bg-[linear-gradient(135deg,#111827,#1f2937)] p-[clamp(18px,4vw,35px)] shadow-[0_12px_35px_rgba(0,0,0,0.35)]">
      {/* League */}

      <div className="mb-[30px] flex flex-wrap items-center gap-3">
        <Image
          src={leagueLogo}
          alt={leagueName}
          width={42}
          height={42}
          unoptimized
          className="h-[42px] w-[42px] object-contain"
        />

        <div>
          <div className="text-[clamp(20px,3vw,28px)] font-bold text-white">
            {leagueName}
          </div>

          {(leagueCountry || leagueRound) && (
            <div className="mt-[3px] text-sm text-slate-400">
              {leagueCountry}
              {leagueCountry &&
              leagueRound
                ? " • "
                : ""}
              {leagueRound}
            </div>
          )}
        </div>
      </div>

      {/* Teams */}

      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* Home */}

        <div className="flex flex-col items-center">
          <Image
            src={homeLogo}
            alt={homeName}
            width={100}
            height={100}
            unoptimized
            className="h-auto w-[clamp(80px,10vw,120px)] object-contain"
          />

          <h2 className="mt-[15px] text-center text-[clamp(20px,3vw,32px)] font-bold break-words text-white">
            {homeName}
          </h2>
        </div>

        {/* Score */}

        <div className="min-w-0 text-center sm:min-w-[260px]">
          <div
            className="mb-[18px] inline-block rounded-[40px] px-[22px] py-[10px] font-bold text-white"
            style={{
              backgroundColor: statusColor,
            }}
          >
            {statusLong}
          </div>

          <div className="whitespace-nowrap text-[clamp(42px,7vw,70px)] font-bold leading-none text-white">
            {goals.home ?? "-"}

            <span className="mx-3 sm:mx-5">
              :
            </span>

            {goals.away ?? "-"}
          </div>

          <div className="mt-[18px] text-sm text-slate-400">
            {formattedDate}
          </div>
        </div>

        {/* Away */}

        <div className="flex flex-col items-center">
          <Image
            src={awayLogo}
            alt={awayName}
            width={100}
            height={100}
            unoptimized
            className="h-auto w-[clamp(80px,10vw,120px)] object-contain"
          />

          <h2 className="mt-[15px] break-words text-center text-[clamp(20px,3vw,32px)] font-bold text-white">
            {awayName}
          </h2>
        </div>
      </div>

      {/* Match Details */}

      <div className="mt-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
        <InfoCard
          title="🏟 Stadium"
          value={stadiumName}
        />

        <InfoCard
          title="📍 City"
          value={cityName}
        />

        <InfoCard
          title="👨‍⚖️ Referee"
          value={refereeName}
        />

        <InfoCard
          title="🏆 Season"
          value={season}
        />

        <InfoCard
          title="⚽ Round"
          value={leagueRound}
        />

        <InfoCard
          title="📊 Status"
          value={statusLong}
        />
      </div>
    </section>
  );
}

function InfoCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-800 p-[18px]">
      <div className="mb-2 text-sm text-slate-400">
        {title}
      </div>

      <div className="break-words text-lg font-bold text-white">
        {getDisplayValue(value)}
      </div>
    </div>
  );
}

