"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function TodayMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await api.getTodayMatches();

        if (!mounted) {
          return;
        }

        if (
          data?.success &&
          Array.isArray(data.matches)
        ) {
          setMatches(data.matches);
        } else {
          setMatches([]);
        }
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error("TodayMatches:", err);

        setError(
          err?.message ||
            "Unable to load today's matches"
        );

        setMatches([]);
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

  function getMatchId(match) {
    return (
      match?.fixture?.id ??
      match?.id ??
      null
    );
  }

  function getHomeName(match) {
    return (
      match?.home?.name ||
      match?.teams?.home?.name ||
      "Home Team"
    );
  }

  function getAwayName(match) {
    return (
      match?.away?.name ||
      match?.teams?.away?.name ||
      "Away Team"
    );
  }

  function getHomeLogo(match) {
    return (
      match?.home?.logo ||
      match?.teams?.home?.logo ||
      ""
    );
  }

  function getAwayLogo(match) {
    return (
      match?.away?.logo ||
      match?.teams?.away?.logo ||
      ""
    );
  }

  function getMatchTime(match) {
    const date = match?.fixture?.date;

    if (!date) {
      return "Time TBD";
    }

    return new Date(date).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  if (loading) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-6 text-white sm:p-7">
        <h2 className="text-2xl font-bold">
          Today&apos;s Matches
        </h2>

        <div className="mt-5 rounded-[14px] bg-[#0f172a] p-6 text-[#9ca3af]">
          Loading today&apos;s matches...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-6 text-white sm:p-7">
        <h2 className="text-2xl font-bold">
          Today&apos;s Matches
        </h2>

        <div className="mt-5 rounded-[14px] bg-[#0f172a] p-6 text-[#9ca3af]">
          {error}
        </div>
      </section>
    );
  }

  if (!matches.length) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-6 text-white sm:p-7">
        <h2 className="text-2xl font-bold">
          Today&apos;s Matches
        </h2>

        <div className="mt-5 rounded-[14px] bg-[#0f172a] p-7 text-center text-[#9ca3af]">
          No matches scheduled today.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-6 text-white sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Today&apos;s Matches
          </h2>

          <p className="mt-1.5 text-sm text-[#9ca3af]">
            Matches scheduled for today.
          </p>
        </div>

        <span className="text-sm font-bold text-blue-400">
          {matches.length}{" "}
          {matches.length === 1
            ? "match"
            : "matches"}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {matches.map((match, index) => {
          const id = getMatchId(match);
          const key = id ?? `today-${index}`;

          return (
            <Link
              key={key}
              href={id ? `/match/${id}` : "#"}
              className={`block rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5 text-white no-underline transition duration-200 ${
                id
                  ? "hover:-translate-y-0.5 hover:border-[#334155]"
                  : "pointer-events-none"
              }`}
            >
              <div className="mb-5 text-center text-[13px] font-bold text-blue-400">
                {getMatchTime(match)}
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5">
                <div className="flex min-w-0 flex-col items-center gap-2.5 text-center text-sm font-semibold text-[#e5e7eb]">
                  {getHomeLogo(match) ? (
                    <img
                      src={getHomeLogo(match)}
                      alt={getHomeName(match)}
                      className="h-[50px] w-[50px] object-contain"
                    />
                  ) : (
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#1f2937]">
                      ⚽
                    </div>
                  )}

                  <span>
                    {getHomeName(match)}
                  </span>
                </div>

                <span className="text-xs font-extrabold text-[#6b7280]">
                  VS
                </span>

                <div className="flex min-w-0 flex-col items-center gap-2.5 text-center text-sm font-semibold text-[#e5e7eb]">
                  {getAwayLogo(match) ? (
                    <img
                      src={getAwayLogo(match)}
                      alt={getAwayName(match)}
                      className="h-[50px] w-[50px] object-contain"
                    />
                  ) : (
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#1f2937]">
                      ⚽
                    </div>
                  )}

                  <span>
                    {getAwayName(match)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}