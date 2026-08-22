"use client";

import PlayerCard from "@/components/Cards/PlayerCard";

export default function SearchPlayers({
  players = [],
}) {
  if (!players.length) return null;

  return (
    <section className="mb-[30px]">
      <h2 className="mb-5 text-white">
        👤 Players
      </h2>

      <div
        className="
          grid
          grid-cols-[repeat(auto-fill,minmax(320px,1fr))]
          gap-5
        "
      >
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
          />
        ))}
      </div>
    </section>
  );
}