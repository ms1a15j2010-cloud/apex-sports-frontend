"use client";

import Link from "next/link";
import Image from "next/image";

export default function MatchCard({ match }) {
  if (!match) return null;

  return (
    <Link
      href={`/match/${match.fixture?.id}`}
      className="text-inherit no-underline"
    >
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-[18px]">
        {/* League */}

        <div className="mb-4 flex items-center gap-2">
          {match.league?.logo && (
            <Image
              src={match.league.logo}
              alt={match.league.name}
              width={22}
              height={22}
            />
          )}

          <span className="text-[13px] text-slate-400">
            {match.league?.name}
          </span>
        </div>

        {/* Teams */}

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center gap-2.5">
            {match.home?.logo && (
              <Image
                src={match.home.logo}
                alt={match.home.name}
                width={32}
                height={32}
              />
            )}

            <span>{match.home?.name}</span>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold">
              {match.goals?.home ?? "-"} : {match.goals?.away ?? "-"}
            </div>

            <div className="text-[13px] text-green-500">
              {match.status?.short}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <span>{match.away?.name}</span>

            {match.away?.logo && (
              <Image
                src={match.away.logo}
                alt={match.away.name}
                width={32}
                height={32}
              />
            )}
          </div>
        </div>

        <div className="mt-[15px] flex justify-between text-xs text-slate-400">
          <span>{match.fixture?.venue?.name || "Unknown Venue"}</span>

          <span>{match.status?.long}</span>
        </div>
      </div>
    </Link>
  );
}