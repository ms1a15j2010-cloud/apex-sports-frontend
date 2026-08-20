"use client";

import Image from "next/image";

export default function MatchPlayerRatings({
  lineups = [],
}) {
  if (!lineups || lineups.length < 2) {
    return (
      <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
        <h2 className="mb-5 text-white">
          ⭐ Player Ratings
        </h2>

        <p className="text-slate-400">
          Player ratings unavailable.
        </p>
      </section>
    );
  }

  const home = lineups[0];
  const away = lineups[1];

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
      <h2 className="mb-[30px] text-white">
        ⭐ Player Ratings
      </h2>

      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
        <TeamRatings team={home} />

        <TeamRatings team={away} />
      </div>
    </section>
  );
}

/* ========================================= */

function TeamRatings({ team }) {
  const players = [
    ...(team.startXI || []),
    ...(team.substitutes || []),
  ];

  return (
    <div className="rounded-[18px] bg-gray-800 p-5">
      {/* Header */}

      <div className="mb-[25px] flex items-center gap-[14px]">
        <Image
          src={
            team.team?.logo ||
            "/team.png"
          }
          alt={team.team?.name}
          width={42}
          height={42}
        />

        <h3 className="text-white">
          {team.team?.name}
        </h3>
      </div>

      <div className="grid gap-3">
        {players.map((item, index) => (
          <PlayerRow
            key={index}
            player={item.player}
          />
        ))}
      </div>
    </div>
  );
}

/* ========================================= */

function PlayerRow({ player = {} }) {
  const rating =
    player.rating ||
    randomRating();

  return (
    <div className="grid grid-cols-[55px_1fr_auto] items-center gap-4 rounded-[14px] bg-gray-900 p-[14px]">
      <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gray-700 font-bold text-white">
        {player.number || "-"}
      </div>

      <div className="min-w-0">
        <div className="mb-[5px] text-white font-semibold">
          {player.name}
        </div>

        <div className="text-[13px] text-slate-400">
          {player.pos || "Player"}
        </div>
      </div>

      <div
        className="min-w-[56px] rounded-xl px-2.5 py-2 text-center font-bold text-white"
        style={{
          background: ratingColor(rating),
        }}
      >
        {rating}
      </div>
    </div>
  );
}

/* ========================================= */

function randomRating() {
  return (
    (
      Math.random() *
        3 +
      6
    ).toFixed(1)
  );
}

function ratingColor(rating) {
  const r = Number(rating);

  if (r >= 8)
    return "#16a34a";

  if (r >= 7)
    return "#22c55e";

  if (r >= 6)
    return "#f59e0b";

  return "#dc2626";
}