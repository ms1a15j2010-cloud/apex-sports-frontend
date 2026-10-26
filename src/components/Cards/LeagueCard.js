"use client";

import Image from "next/image";
import Link from "next/link";

const LEAGUE_SLUGS = {
  PL: "epl",
  PD: "laliga",
  BL1: "bundesliga",
  SA: "seriea",
  FL1: "ligue1",
  PPL: "primeiraliga",
};

export default function LeagueCard({ league }) {
  const competition = league?.league || league;
  if (!competition?.name) return null;

  const code = String(competition.code || "").toUpperCase();
  const slug = LEAGUE_SLUGS[code];
  const href = code === "PL"
    ? "/league/epl"
    : slug
      ? `/standings/${slug}`
      : "/leagues";
  const logo = competition.logo || competition.emblem || null;
  const country =
    competition.area?.name ||
    competition.country?.name ||
    competition.country ||
    "International";
  const season =
    competition.currentSeason?.startDate?.slice(0, 4) ||
    competition.seasons?.[0]?.year ||
    null;

  return (
    <Link href={href} className="text-inherit no-underline">
      <div className="flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-green-500/60">
        {logo ? (
          <Image
            src={logo}
            alt={competition.name}
            width={60}
            height={60}
            unoptimized
            className="h-[60px] w-[60px] shrink-0 object-contain"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-slate-800 text-2xl"
          >
            🏆
          </div>
        )}

        <div className="min-w-0">
          <h3 className="m-0 text-white">{competition.name}</h3>
          <p className="mb-0 mt-1.5 text-slate-400">{country}</p>
          {season && (
            <p className="mb-0 mt-1 text-green-500">Season {season}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
