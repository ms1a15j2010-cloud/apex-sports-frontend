"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerCard({ player }) {
  const data = player?.player || player;
  if (!data?.id) return null;

  const name = data.name || [data.firstName, data.lastName].filter(Boolean).join(" ") || "Unknown Player";
  const team = player?.team || data.currentTeam || {};
  const teamName = typeof team === "string" ? team : team.name || "Team unavailable";
  const position = typeof data.position === "string"
    ? data.position
    : data.position?.name || "Position unavailable";
  const photo = data.photo || data.image || null;
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/player/${data.id}`}
      className="text-inherit no-underline"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-green-500/60">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            width={70}
            height={70}
            unoptimized
            className="h-[70px] w-[70px] shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-slate-800 text-lg font-bold text-slate-300"
          >
            {initials || "P"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="m-0 truncate text-white">{name}</h3>
          <p className="mb-0 mt-[5px] truncate text-slate-400">{teamName}</p>
          <p className="mb-0 mt-1 text-green-500">{position}</p>
        </div>
      </div>
    </Link>
  );
}
