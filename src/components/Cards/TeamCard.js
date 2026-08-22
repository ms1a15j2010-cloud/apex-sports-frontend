"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamCard({ team }) {
  if (!team) return null;

  return (
    <Link
      href={`/team/${team.id}`}
      className="text-inherit no-underline"
    >
      <div className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition duration-200">
        <Image
          src={team.logo}
          alt={team.name}
          width={60}
          height={60}
        />

        <div className="flex-1">
          <h3 className="m-0 text-white">
            {team.name}
          </h3>

          <p className="mb-0 mt-1.5 text-slate-400">
            {team.country}
          </p>
        </div>
      </div>
    </Link>
  );
}