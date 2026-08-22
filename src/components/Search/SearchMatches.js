"use client";

import MatchCard from "@/components/Cards/MatchCard";

export default function SearchMatches({
  matches = [],
}) {
  if (!matches.length) return null;

  return (
    <section className="mb-[30px]">
      <h2 className="mb-5 text-white">
        📅 Matches
      </h2>

      <div className="grid gap-5">
        {matches.map((match) => (
          <MatchCard
            key={match.fixture?.id}
            match={match}
          />
        ))}
      </div>
    </section>
  );
}