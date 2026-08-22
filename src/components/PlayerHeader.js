"use client";

import Image from "next/image";

export default function PlayerHeader({ player }) {
  if (!player) return null;

  const playerPhoto = player.photo || null;

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center gap-[30px]">
        {/* PLAYER PHOTO */}

        <div className="min-w-[220px] text-center">
          {playerPhoto ? (
            <Image
              src={playerPhoto}
              alt={player.name || "Player"}
              width={180}
              height={180}
              priority
              unoptimized
              className="rounded-full border-4 border-green-500 object-cover"
            />
          ) : (
            <div
              aria-label={player.name || "Player"}
              className="mx-auto flex h-[180px] w-[180px] items-center justify-center rounded-full border-4 border-green-500 bg-gradient-to-br from-gray-800 to-gray-900 text-[64px] font-extrabold text-green-500"
            >
              {(player.name || "P").charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mb-[5px] mt-5 text-white">
            {player.name || "Unknown Player"}
          </h2>

          <div className="text-slate-400">
            {player.position || "Football Player"}
          </div>
        </div>

        {/* INFORMATION */}

        <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
          <InfoCard
            title="Nationality"
            value={player.nationality || "-"}
          />

          <InfoCard
            title="Age"
            value={player.age || "-"}
          />

          <InfoCard
            title="Height"
            value={player.height || "-"}
          />

          <InfoCard
            title="Weight"
            value={player.weight || "-"}
          />

          <InfoCard
            title="Birth Date"
            value={player.birth?.date || "-"}
          />

          <InfoCard
            title="Birth Place"
            value={
              [
                player.birth?.place,
                player.birth?.country,
              ]
                .filter(Boolean)
                .join(", ") || "-"
            }
          />

          <InfoCard
            title="Current Club"
            value={
              player.team?.name ||
              player.club?.name ||
              "-"
            }
          />

          <InfoCard
            title="Jersey Number"
            value={player.number || "-"}
          />
        </div>
      </div>

      {/* SUMMARY */}

      <div className="mt-[35px] rounded-[18px] bg-gray-800 p-6">
        <h3 className="mb-[15px] text-white">
          Player Overview
        </h3>

        <p className="m-0 leading-[1.9] text-slate-300">
          <strong>
            {player.name || "This player"}
          </strong>{" "}
          is a professional football player representing{" "}
          <strong>
            {player.team?.name ||
              player.club?.name ||
              "his club"}
          </strong>
          . He plays primarily as{" "}
          <strong>
            {player.position || "-"}
          </strong>{" "}
          and represents{" "}
          <strong>
            {player.nationality || "-"}
          </strong>
          . Personal information, career statistics,
          transfers, injuries and performance data are
          automatically updated from the football data
          provider whenever new information becomes
          available.
        </p>
      </div>
    </section>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-[14px] bg-gray-800 p-5">
      <div className="mb-2 text-sm text-slate-400">
        {title}
      </div>

      <div className="text-xl font-bold text-white">
        {value}
      </div>
    </div>
  );
}