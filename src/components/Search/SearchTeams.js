"use client";

import TeamCard from "@/components/Cards/TeamCard";

export default function SearchTeams({
  teams = [],
}) {
  if (!teams.length) return null;

  return (
    <section className="mb-[30px]">
      <h2 className="mb-5 text-white">
        ⚽ Teams
      </h2>

      <div
        className="
          grid
          grid-cols-[repeat(auto-fill,minmax(320px,1fr))]
          gap-5
        "
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
          />
        ))}
      </div>
    </section>
  );
}