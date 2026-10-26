"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamCard({ team }) {
  const data = team?.team || team;
  if (!data?.id) return null;

  const name = data.name || data.shortName || "Unknown Team";
  const logo = data.logo || data.crest || null;
  const country = data.country || data.area?.name || "Country unavailable";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/team/${data.id}`}
      className="text-inherit no-underline"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition duration-200 hover:border-green-500/60">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={60}
            height={60}
            unoptimized
            className="h-[60px] w-[60px] shrink-0 object-contain"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-slate-300"
          >
            {initials || "FC"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="m-0 truncate text-white">{name}</h3>
          <p className="mb-0 mt-1.5 text-slate-400">{country}</p>
        </div>
      </div>
    </Link>
  );
}
