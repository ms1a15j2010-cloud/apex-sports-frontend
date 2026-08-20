"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamSidebar({
  team,
}) {
  if (!team) return null;

  const teamLogo =
    team.logo ||
    team.crest ||
    null;

  const area =
    team.area || {};

  const venue =
    team.venue || {};

  const coach =
    team.coach || {};

  const coachName =
    coach.name ||
    [
      coach.firstName,
      coach.lastName,
    ]
      .filter(Boolean)
      .join(" ");

  const competitions =
    Array.isArray(
      team.competitions
    )
      ? team.competitions
      : Array.isArray(
          team.runningCompetitions
        )
      ? team.runningCompetitions
      : [];

  const primaryCompetition =
    competitions[0] || null;

  return (
    <aside className="sticky top-5 rounded-[18px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-6 text-white shadow-[0_8px_24px_rgba(0,0,0,0.30)]">
      {/* =================================================
          TEAM
      ================================================= */}

      <div className="mb-7 text-center">
        <div className="mx-auto flex h-[130px] w-[130px] items-center justify-center rounded-full border border-[#293548] bg-gray-800">
          {teamLogo ? (
            <Image
              src={teamLogo}
              alt={team.name || "Team"}
              width={105}
              height={105}
              priority
              unoptimized
              className="object-contain"
            />
          ) : (
            <div className="text-[28px] font-black text-green-500">
              {team.tla ||
                team.name
                  ?.slice(0, 3)
                  ?.toUpperCase() ||
                "FC"}
            </div>
          )}
        </div>

        <h2 className="my-4 mb-1.5 text-[24px]">
          {team.name ||
            "Unknown Team"}
        </h2>

        <div className="text-sm text-slate-400">
          {area.name ||
            team.country ||
            "England"}
        </div>
      </div>

      {/* =================================================
          TEAM INFORMATION
      ================================================= */}

      <div className="mb-7 grid gap-3">
        <SidebarItem
          title="Founded"
          value={
            team.founded || "-"
          }
        />

        <SidebarItem
          title="Team Code"
          value={
            team.tla ||
            team.shortName ||
            "-"
          }
        />

        <SidebarItem
          title="Country"
          value={
            area.name ||
            team.country ||
            "-"
          }
        />

        <SidebarItem
          title="Stadium"
          value={
            venue.name || "-"
          }
        />

        <SidebarItem
          title="City"
          value={
            venue.city || "-"
          }
        />

        <SidebarItem
          title="Coach"
          value={
            coachName ||
            "Unavailable"
          }
        />
      </div>

      {/* =================================================
          QUICK NAVIGATION
      ================================================= */}

      <div className="border-t border-gray-800 pt-5">
        <h3 className="mb-[15px] text-[18px]">
          Quick Navigation
        </h3>

        <SidebarLink
          href="#overview"
          text="Overview"
        />

        <SidebarLink
          href="#statistics"
          text="Statistics"
        />

        <SidebarLink
          href="#analytics"
          text="Analytics"
        />

        <SidebarLink
          href="#fixtures"
          text="Fixtures"
        />

        <SidebarLink
          href="#results"
          text="Results"
        />

        <SidebarLink
          href="#squad"
          text="Squad"
        />

        <SidebarLink
          href="#history"
          text="History"
        />

        <SidebarLink
          href="#transfers"
          text="Transfers"
        />

        <SidebarLink
          href="#injuries"
          text="Injuries"
        />

        <SidebarLink
          href="#trophies"
          text="Trophies"
        />
      </div>

      {/* =================================================
          COMPETITION
      ================================================= */}

      {primaryCompetition && (
        <div className="mt-7 border-t border-gray-800 pt-5">
          <h3 className="mb-3">
            Competition
          </h3>

          <div className="flex items-center gap-3">
            {primaryCompetition.emblem ? (
              <Image
                src={
                  primaryCompetition.emblem
                }
                alt={
                  primaryCompetition.name ||
                  "Competition"
                }
                width={30}
                height={30}
                unoptimized
                className="object-contain"
              />
            ) : (
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-gray-800 text-[11px] font-extrabold text-green-500">
                FC
              </div>
            )}

            <span className="text-sm font-bold text-green-500">
              {primaryCompetition.name ||
                "Premier League"}
            </span>
          </div>
        </div>
      )}

      {/* =================================================
          OFFICIAL WEBSITE
      ================================================= */}

      {team.website && (
        <div className="mt-[25px] border-t border-gray-800 pt-5">
          <a
            href={team.website}
            target="_blank"
            rel="noreferrer"
            className="block break-words font-bold text-blue-500 no-underline transition-colors hover:text-blue-400"
          >
            🌐 Official Website
          </a>
        </div>
      )}
    </aside>
  );
}

/* =====================================================
SIDEBAR ITEM
===================================================== */

function SidebarItem({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-[#293548] bg-gray-800 px-[14px] py-3">
      <div className="mb-[5px] text-xs text-slate-400">
        {title}
      </div>

      <div className="break-words text-sm font-semibold text-white [overflow-wrap:anywhere]">
        {value || "-"}
      </div>
    </div>
  );
}

/* =====================================================
SIDEBAR LINK
===================================================== */

function SidebarLink({
  href,
  text,
}) {
  return (
    <Link
      href={href}
      className="block border-b border-gray-800 px-1 py-[9px] text-sm text-slate-300 no-underline transition-colors duration-200 hover:text-white"
    >
      {text}
    </Link>
  );
}