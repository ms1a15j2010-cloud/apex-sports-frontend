"use client";

import PlayerCard from "@/components/Cards/PlayerCard";

export default function SearchPlayers({
  players = [],
}) {
  if (!players.length) return null;

  return (
    <section style={{ marginBottom: 30 }}>
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        👤 Players
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
        }}
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