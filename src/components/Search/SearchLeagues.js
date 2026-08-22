"use client";

import LeagueCard from "@/components/Cards/LeagueCard";

export default function SearchLeagues({
  leagues = [],
}) {
  if (!leagues.length) return null;

  return (
    <section className="mb-[30px]">
      <h2 className="mb-5 text-white">
        🏆 Leagues
      </h2>

      <div
        className="
          grid
          grid-cols-[repeat(auto-fill,minmax(320px,1fr))]
          gap-5
        "
      >
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            league={league}
          />
        ))}
      </div>
    </section>
  );
}