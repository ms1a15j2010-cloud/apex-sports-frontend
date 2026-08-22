"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

export default function TopScorersMini() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.getTopScorersMini();

        if (!mounted) {
          return;
        }

        if (data?.success) {
          setPlayers(
            Array.isArray(data.players)
              ? data.players
              : []
          );
        } else {
          setPlayers([]);
        }
      } catch (err) {
        console.error(
          "TopScorersMini:",
          err
        );

        if (mounted) {
          setPlayers([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="rounded-[20px] bg-gray-900 p-[25px] text-white">
      <h2 className="mb-5 text-2xl font-bold">
        ⚽ Top Scorers
      </h2>

      {loading && (
        <p className="text-gray-400">
          Loading...
        </p>
      )}

      {!loading && players.length === 0 && (
        <p className="text-slate-400">
          No top scorers available.
        </p>
      )}

      {!loading &&
        players.map((player, index) => {
          const id =
            player?.player?.id ??
            player?.id ??
            `${player?.name}-${index}`;

          const photo =
            player?.player?.photo ??
            player?.photo ??
            "/player.png";

          const name =
            player?.player?.name ??
            player?.name ??
            "Unknown Player";

          const teamName =
            player?.statistics?.[0]?.team?.name ??
            player?.team?.name ??
            player?.team ??
            "Unknown Team";

          const goals =
            player?.statistics?.[0]?.goals?.total ??
            player?.goals ??
            0;

          return (
            <Link
              key={id}
              href={`/player/${id}`}
              className="block text-inherit no-underline"
            >
              <div
                className={`grid grid-cols-[35px_50px_minmax(0,1fr)_auto] items-center gap-[15px] py-3.5 ${
                  index !== players.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }`}
              >
                <strong className="text-green-500">
                  {index + 1}
                </strong>

                <Image
                  src={photo}
                  alt={name}
                  width={50}
                  height={50}
                  unoptimized
                  className="h-[50px] w-[50px] rounded-full object-cover"
                />

                <div className="min-w-0">
                  <div className="truncate font-bold">
                    {name}
                  </div>

                  <div className="truncate text-[13px] text-slate-400">
                    {teamName}
                  </div>
                </div>

                <div className="text-2xl font-bold text-green-500">
                  {goals}
                </div>
              </div>
            </Link>
          );
        })}
    </section>
  );
}