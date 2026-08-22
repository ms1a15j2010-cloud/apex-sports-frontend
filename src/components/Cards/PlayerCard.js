"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerCard({ player }) {
  if (!player) return null;

  return (
    <Link
      href={`/player/${player.id}`}
      className="text-inherit no-underline"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5">
        <Image
          src={player.photo}
          alt={player.name}
          width={70}
          height={70}
          className="rounded-full"
        />

        <div className="flex-1">
          <h3 className="m-0 text-white">
            {player.name}
          </h3>

          <p className="mb-0 mt-[5px] text-slate-400">
            {player.team}
          </p>

          <p className="mb-0 mt-1 text-green-500">
            {player.position}
          </p>
        </div>
      </div>
    </Link>
  );
}