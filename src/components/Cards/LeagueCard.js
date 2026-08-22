"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueCard({ league }) {
  if (!league?.league) return null;

  return (
    <Link
      href={`/league/${league.league.id}`}
      className="text-inherit no-underline"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5">
        <Image
          src={league.league.logo}
          alt={league.league.name}
          width={60}
          height={60}
        />

        <div>
          <h3 className="m-0 text-white">
            {league.league.name}
          </h3>

          <p className="mb-0 mt-1.5 text-slate-400">
            {league.country?.name}
          </p>

          <p className="mb-0 mt-1 text-green-500">
            Season {league.seasons?.[0]?.year}
          </p>
        </div>
      </div>
    </Link>
  );
}