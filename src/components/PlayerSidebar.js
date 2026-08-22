"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerSidebar({
  player,
}) {
  if (!player) return null;

  const nationality =
    player.nationality ||
    player.country ||
    "-";

  const age =
    player.age ||
    player.birth?.age ||
    "-";

  const position =
    player.position || "-";

  const number =
    player.number || "-";

  const height =
    player.height || "-";

  const weight =
    player.weight || "-";

  const club =
    player.team?.name ||
    player.club?.name ||
    "-";

  const clubLogo =
    player.team?.logo ||
    player.club?.logo ||
    null;

  const playerPhoto =
    player.photo || null;

  return (
    <aside className="mb-[30px] rounded-[20px] bg-gray-900 p-[25px] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      {/* PLAYER */}

      <div className="mb-[30px] text-center">
        {playerPhoto ? (
          <Image
            src={playerPhoto}
            alt={
              player.name ||
              "Player"
            }
            width={170}
            height={170}
            priority
            unoptimized
            className="mx-auto rounded-full border-4 border-green-500 object-cover"
          />
        ) : (
          <div className="mx-auto flex h-[170px] w-[170px] items-center justify-center rounded-full border-4 border-green-500 bg-gradient-to-br from-gray-800 to-gray-900 text-[56px] font-extrabold text-green-500">
            {(player.name || "P")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}

        <h2 className="mb-2 mt-[18px] text-white">
          {player.name ||
            "Unknown Player"}
        </h2>

        <div className="text-slate-400">
          {position}
        </div>
      </div>

      {/* CLUB */}

      <div className="mb-6 rounded-2xl bg-gray-800 p-[18px]">
        <div className="mb-3 font-semibold text-slate-400">
          Current Club
        </div>

        <div className="flex items-center gap-3">
          {clubLogo ? (
            <Image
              src={clubLogo}
              alt={club}
              width={42}
              height={42}
              unoptimized
              className="object-contain"
            />
          ) : (
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-gray-900 text-[15px] font-extrabold text-green-500">
              FC
            </div>
          )}

          <strong className="break-words text-white [overflow-wrap:anywhere]">
            {club}
          </strong>
        </div>
      </div>

      {/* INFORMATION */}

      <div className="mb-[25px] grid gap-[14px]">
        <InfoRow
          label="Nationality"
          value={nationality}
        />

        <InfoRow
          label="Age"
          value={age}
        />

        <InfoRow
          label="Position"
          value={position}
        />

        <InfoRow
          label="Shirt Number"
          value={number}
        />

        <InfoRow
          label="Height"
          value={height}
        />

        <InfoRow
          label="Weight"
          value={weight}
        />
      </div>

      {/* QUICK LINKS */}

      <div className="border-t border-gray-700 pt-5">
        <h3 className="mb-[15px] text-[18px] text-white">
          Quick Links
        </h3>

        <SidebarLink
          href="/today"
          text="Today's Matches"
          icon="⚽"
        />

        <SidebarLink
          href="/leagues"
          text="Leagues"
          icon="🏆"
        />

        <SidebarLink
          href="/search"
          text="Search Players"
          icon="🔍"
        />
      </div>
    </aside>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-800 px-[18px] py-[14px]">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <strong className="break-words text-right text-white [overflow-wrap:anywhere]">
        {value}
      </strong>
    </div>
  );
}

function SidebarLink({
  href,
  text,
  icon,
}) {
  return (
    <Link
      href={href}
      className="mb-[10px] flex items-center gap-3 rounded-xl bg-gray-800 px-[14px] py-3 text-white no-underline transition-all duration-200 hover:bg-gray-700"
    >
      <span className="text-[18px]">
        {icon}
      </span>

      <span>{text}</span>
    </Link>
  );
}