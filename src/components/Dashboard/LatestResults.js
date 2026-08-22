"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function LatestResults() {
  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await api.getLatestResults();

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

        console.error("LatestResults:", err);

        setError(
          err?.message ||
            "Unable to load latest results"
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
      match?.fixture?.home?.name ||
      "Home Team"
    );
  }

  function getAwayName(match) {
    return (
      match?.away?.name ||
      match?.teams?.away?.name ||
      match?.fixture?.away?.name ||
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

  function getHomeScore(match) {
    return (
      match?.goals?.home ??
      match?.score?.fulltime?.home ??
      match?.score?.home ??
      null
    );
  }

  function getAwayScore(match) {
    return (
      match?.goals?.away ??
      match?.score?.fulltime?.away ??
      match?.score?.away ??
      null
    );
  }

  function getDate(match) {
    return (
      match?.fixture?.date ||
      match?.date ||
      null
    );
  }

  function formatDate(match) {
    const date = getDate(match);

    if (!date) {
      return "Date unavailable";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
    } catch {
      return "Date unavailable";
    }
  }

  if (loading) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 sm:p-7">
        <h2 className="m-0 text-2xl font-bold text-white">
          Latest Results
        </h2>

        <div className="mt-5 rounded-[14px] bg-[#0f172a] p-[25px] text-[#9ca3af]">
          Loading latest results...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 sm:p-7">
        <h2 className="m-0 text-2xl font-bold text-white">
          Latest Results
        </h2>

        <div className="mt-5 rounded-[14px] bg-[#0f172a] p-[25px] text-[#9ca3af]">
          {error}
        </div>
      </section>
    );
  }

  if (!matches.length) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 sm:p-7">
        <h2 className="m-0 text-2xl font-bold text-white">
          Latest Results
        </h2>

        <div className="mt-5 rounded-[14px] bg-[#0f172a] p-[30px] text-center text-[#9ca3af]">
          No recent results available.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-[15px]">
        <div>
          <h2 className="m-0 text-2xl font-bold text-white">
            Latest Results
          </h2>

          <p className="mt-1.5 text-sm text-[#9ca3af]">
            Recently completed matches.
          </p>
        </div>

        <span className="text-sm font-bold text-[#60a5fa]">
          {matches.length}{" "}
          {matches.length === 1
            ? "result"
            : "results"}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {matches.map((match, index) => {
          const id = getMatchId(match);

          const key =
            id ?? `result-${index}`;

          const homeScore =
            getHomeScore(match);

          const awayScore =
            getAwayScore(match);

          return (
            <Link
              key={key}
              href={id ? `/match/${id}` : "#"}
              className={`block rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5 text-white no-underline ${
                id
                  ? "pointer-events-auto"
                  : "pointer-events-none"
              }`}
            >
              <div className="mb-5 text-center text-xs text-[#9ca3af]">
                {formatDate(match)}
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[14px]">
                <div className="flex flex-col items-center gap-[9px] text-center">
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

                  <span className="text-sm font-semibold text-[#e5e7eb]">
                    {getHomeName(match)}
                  </span>
                </div>

                <div className="flex gap-[5px] whitespace-nowrap text-[22px] font-extrabold text-white">
                  <span>
                    {homeScore ?? "—"}
                  </span>

                  <span>-</span>

                  <span>
                    {awayScore ?? "—"}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-[9px] text-center">
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

                  <span className="text-sm font-semibold text-[#e5e7eb]">
                    {getAwayName(match)}
                  </span>
                </div>
              </div>

              <div className="mt-[18px] text-center text-[11px] font-extrabold text-[#22c55e]">
                FT
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}