"use client";

import Image from "next/image";
import Link from "next/link";

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

export default function MatchSidebar({
  match,
}) {
  if (!match) return null;

  const fixture = match.fixture || {};
  const league = match.league || {};
  const home = match.teams?.home || {};
  const away = match.teams?.away || {};
  const goals = match.goals || {};

  const homeName = getDisplayValue(
    home.name,
    "Home Team"
  );

  const awayName = getDisplayValue(
    away.name,
    "Away Team"
  );

  const leagueName = getDisplayValue(
    league.name,
    "League"
  );

  const leagueCountry = getDisplayValue(
    league.country
  );

  const leagueSeason = getDisplayValue(
    league.season
  );

  const leagueRound = getDisplayValue(
    league.round
  );

  const refereeName = getDisplayValue(
    fixture.referee
  );

  const status = getDisplayValue(
    fixture.status?.long ||
      fixture.status?.short
  );

  const fixtureDate = fixture.date
    ? new Date(
        fixture.date
      ).toLocaleString()
    : "-";

  const stadium = getDisplayValue(
    fixture.venue?.name
  );

  const city = getDisplayValue(
    fixture.venue?.city
  );

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
    <aside className="sticky top-5 flex min-w-0 flex-col gap-5">
      {/* Match Summary */}

      <SidebarCard title="⚽ Match Summary">
        <div className="mb-[18px] flex items-center justify-between gap-3">
          <TeamMini
            team={{
              ...home,
              name: homeName,
              logo: homeLogo,
            }}
          />

          <div className="whitespace-nowrap text-[26px] font-bold text-white">
            {goals.home ?? "-"} -{" "}
            {goals.away ?? "-"}
          </div>

          <TeamMini
            team={{
              ...away,
              name: awayName,
              logo: awayLogo,
            }}
          />
        </div>

        <Info
          label="Status"
          value={status}
        />

        <Info
          label="Date"
          value={fixtureDate}
        />

        <Info
          label="Referee"
          value={refereeName}
        />
      </SidebarCard>

      {/* Competition */}

      <SidebarCard title="🏆 Competition">
        <Info
          label="League"
          value={leagueName}
        />

        <Info
          label="Country"
          value={leagueCountry}
        />

        <Info
          label="Season"
          value={leagueSeason}
        />

        <Info
          label="Round"
          value={leagueRound}
        />
      </SidebarCard>

      {/* Venue */}

      <SidebarCard title="🏟 Venue">
        <Info
          label="Stadium"
          value={stadium}
        />

        <Info
          label="City"
          value={city}
        />
      </SidebarCard>

      {/* Quick Links */}

      <SidebarCard title="🔗 Quick Links">
        {home.id && (
          <SidebarLink
            href={`/team/${home.id}`}
            text={`${homeName} Team`}
          />
        )}

        {away.id && (
          <SidebarLink
            href={`/team/${away.id}`}
            text={`${awayName} Team`}
          />
        )}

        {league.id && (
          <SidebarLink
            href={`/league/${league.id}`}
            text={leagueName}
          />
        )}
      </SidebarCard>
    </aside>
  );
}

/* ===================================== */

function SidebarCard({
  title,
  children,
}) {
  return (
    <div className="rounded-[20px] bg-gray-900 p-[22px]">
      <h3 className="mb-[18px] text-xl font-bold text-white">
        {title}
      </h3>

      {children}
    </div>
  );
}

/* ===================================== */

function TeamMini({
  team,
}) {
  const name = getDisplayValue(
    team?.name,
    "Unknown Team"
  );

  return (
    <div className="flex w-[90px] min-w-0 flex-col items-center gap-2">
      <Image
        src={
          team?.logo ||
          "/team.png"
        }
        alt={name}
        width={46}
        height={46}
        unoptimized
        className="h-[46px] w-[46px] object-contain"
      />

      <span className="max-w-full break-words text-center font-semibold text-white">
        {name}
      </span>
    </div>
  );
}

/* ===================================== */

function Info({
  label,
  value,
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-700 py-2.5 last:border-b-0">
      <span className="shrink-0 text-slate-400">
        {label}
      </span>

      <span className="min-w-0 break-words text-right font-semibold text-white">
        {getDisplayValue(value)}
      </span>
    </div>
  );
}

/* ===================================== */

function SidebarLink({
  href,
  text,
}) {
  return (
    <Link
      href={href}
      className="mb-3 block rounded-xl bg-gray-800 px-4 py-3 font-semibold text-white no-underline transition hover:bg-slate-700 last:mb-0"
    >
      {getDisplayValue(text)}
    </Link>
  );
}

