"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

export default function StandingsMini() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.getStandingsMini();

        if (!mounted) return;

        if (data?.success) {
          const standings = Array.isArray(data.standings)
            ? data.standings
            : Array.isArray(data.table)
            ? data.table
            : [];

          setTeams(standings.slice(0, 5));
        } else {
          setTeams([]);
        }
      } catch (err) {
        console.error("StandingsMini:", err);

        if (mounted) {
          setTeams([]);
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

  if (loading) {
    return (
      <section className="rounded-[20px] bg-[#111827] p-6 text-white sm:p-7">
        <h2 className="text-2xl font-bold">
          🏆 League Standings
        </h2>

        <p className="mt-3 text-[#94a3b8]">
          Loading...
        </p>
      </section>
    );
  }

  if (teams.length === 0) {
    return (
      <section className="rounded-[20px] bg-[#111827] p-6 text-white sm:p-7">
        <h2 className="text-2xl font-bold">
          🏆 League Standings
        </h2>

        <p className="mt-3 text-[#94a3b8]">
          Standings unavailable.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[20px] bg-[#111827] p-6 text-white sm:p-7">
      <h2 className="mb-5 text-2xl font-bold">
        🏆 League Standings
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1f2937] text-[#94a3b8]">
              <th className="px-2 py-3 text-center text-sm font-semibold">
                #
              </th>

              <th className="px-2 py-3 text-left text-sm font-semibold">
                Club
              </th>

              <th className="px-2 py-3 text-center text-sm font-semibold">
                Pts
              </th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team, index) => {
              const teamId =
                team?.team?.id ??
                team?.id ??
                "";

              const key =
                team?.team?.id ??
                team?.id ??
                `${team?.rank ?? index}-${index}`;

              return (
                <tr
                  key={key}
                  className="border-b border-[#1f2937] last:border-b-0"
                >
                  <td className="px-2 py-3 text-center">
                    {team?.rank ?? "-"}
                  </td>

                  <td className="px-2 py-3">
                    <Link
                      href={`/team/${teamId}`}
                      className="flex items-center gap-2.5 text-white no-underline transition hover:text-blue-400"
                    >
                      <Image
                        src={
                          team?.team?.logo ||
                          "/images/team-placeholder.png"
                        }
                        alt={
                          team?.team?.name ||
                          "Team"
                        }
                        width={28}
                        height={28}
                        className="shrink-0 object-contain"
                      />

                      <span className="truncate">
                        {team?.team?.name ||
                          "Unknown Team"}
                      </span>
                    </Link>
                  </td>

                  <td className="px-2 py-3 text-center font-bold text-[#22c55e]">
                    {team?.points ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}