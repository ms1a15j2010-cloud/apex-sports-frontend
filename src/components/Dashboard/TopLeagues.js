"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

export default function TopLeagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await api.getTopLeagues();

      if (data.success) {
        setLeagues(data.leagues);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <section className="rounded-[20px] bg-gray-900 p-[25px] text-white">
        Loading leagues...
      </section>
    );
  }

  return (
    <section className="rounded-[20px] bg-gray-900 p-[25px] text-white">
      <h2 className="mb-5 text-[28px] font-bold">
        🏆 Top Leagues
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
        {leagues.map((league) => (
          <Link
            key={league.id}
            href={`/league/${league.id}`}
            className="rounded-[15px] bg-gray-800 p-5 text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-gray-700"
          >
            <Image
              src={league.logo}
              width={60}
              height={60}
              alt={league.name}
              className="mx-auto object-contain"
            />

            <h3 className="mt-4 text-lg font-bold">
              {league.name}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {league.country}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}