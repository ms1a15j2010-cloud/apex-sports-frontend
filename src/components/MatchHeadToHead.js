"use client";

import Image from "next/image";
import Link from "next/link";

export default function MatchHeadToHead({
  h2h = [],
}) {
  if (!h2h || h2h.length === 0) {
    return (
      <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
        <h2 className="mb-5 text-white">
          🤝 Head to Head
        </h2>

        <p className="text-slate-400">
          No previous meetings found.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
      <h2 className="mb-[30px] text-white">
        🤝 Head to Head
      </h2>

      <div className="grid gap-[18px]">
        {h2h.map((match) => (
          <HeadToHeadCard
            key={match.fixture?.id}
            match={match}
          />
        ))}
      </div>
    </section>
  );
}

/* ===================================== */

function HeadToHeadCard({ match }) {
  const fixture =
    match.fixture || {};

  const league =
    match.league || {};

  const home =
    match.teams?.home || {};

  const away =
    match.teams?.away || {};

  const goals =
    match.goals || {};

  return (
    <Link
      href={`/match/${fixture.id}`}
      className="no-underline"
    >
      <div className="rounded-[18px] bg-gray-800 p-5 transition-[0.25s] hover:bg-gray-750">
        {/* Top */}

        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
          <div className="text-slate-400">
            {league.name}
          </div>

          <div className="text-slate-400">
            {fixture.date
              ? new Date(
                  fixture.date
                ).toLocaleDateString()
              : "-"}
          </div>
        </div>

        {/* Teams */}

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
          {/* Home */}

          <div className="flex items-center gap-3">
            <Image
              src={
                home.logo ||
                "/team.png"
              }
              alt={home.name}
              width={42}
              height={42}
              className="object-contain"
            />

            <strong className="text-white">
              {home.name}
            </strong>
          </div>

          {/* Score */}

          <div className="text-center">
            <div className="text-[28px] font-bold text-white">
              {goals.home}
              {" - "}
              {goals.away}
            </div>

            <div className="mt-1.5 text-[13px] text-green-500">
              {fixture.status?.short}
            </div>
          </div>

          {/* Away */}

          <div className="flex items-center justify-end gap-3">
            <strong className="text-white">
              {away.name}
            </strong>

            <Image
              src={
                away.logo ||
                "/team.png"
              }
              alt={away.name}
              width={42}
              height={42}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}