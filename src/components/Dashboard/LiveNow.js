"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";

/* =====================================================
   LIVE NOW
===================================================== */

export default function LiveNow() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===================================================
     LOAD LIVE MATCHES

     IMPORTANT:
     - One effect only
     - Empty dependency array
     - No initialMatches synchronization
     - No clock state
     - No automatic retry after 429
  =================================================== */

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (mounted) {
          setLoading(true);
          setError("");
        }

        const data =
          await api.getLiveMatches();

        if (!mounted) {
          return;
        }

        /* ==============================================
           PROVIDER RATE LIMIT
        ============================================== */

        if (
          data?.status === 429 ||
          data?.apiLimitReached === true
        ) {
          setMatches([]);

          setError(
            "Live data is temporarily unavailable because the football data provider has reached its request limit."
          );

          return;
        }

        /* ==============================================
           NORMAL SUCCESS RESPONSE
        ============================================== */

        if (
          data?.success &&
          Array.isArray(data?.matches)
        ) {
          setMatches(data.matches);

          setError("");

          return;
        }

        /* ==============================================
           EMPTY / UNSUCCESSFUL RESPONSE
        ============================================== */

        setMatches([]);

        setError(
          data?.message ||
            ""
        );
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error(
          "LiveNow:",
          err
        );

        setMatches([]);

        setError(
          err?.message ||
            "Unable to load live matches"
        );
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

  /* ===================================================
     HELPERS
  =================================================== */

  function getMatchId(match) {
    return (
      match?.fixture?.id ??
      match?.id ??
      null
    );
  }

  function getHome(match) {
    return (
      match?.home ||
      match?.teams?.home ||
      {}
    );
  }

  function getAway(match) {
    return (
      match?.away ||
      match?.teams?.away ||
      {}
    );
  }

  function getHomeName(match) {
    const home =
      getHome(match);

    return (
      home?.name ||
      home?.shortName ||
      "Home Team"
    );
  }

  function getAwayName(match) {
    const away =
      getAway(match);

    return (
      away?.name ||
      away?.shortName ||
      "Away Team"
    );
  }

  function getHomeLogo(match) {
    const home =
      getHome(match);

    return (
      home?.logo ||
      home?.crest ||
      ""
    );
  }

  function getAwayLogo(match) {
    const away =
      getAway(match);

    return (
      away?.logo ||
      away?.crest ||
      ""
    );
  }

  function getHomeScore(match) {
    return (
      match?.score?.fulltime?.home ??
      match?.score?.fullTime?.home ??
      match?.score?.home ??
      match?.goals?.home ??
      null
    );
  }

  function getAwayScore(match) {
    return (
      match?.score?.fulltime?.away ??
      match?.score?.fullTime?.away ??
      match?.score?.away ??
      match?.goals?.away ??
      null
    );
  }

  function getStatus(match) {
    return (
      match?.status?.short ||
      match?.status?.long ||
      match?.rawStatus ||
      "LIVE"
    );
  }

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="m-0 text-2xl font-extrabold text-white">
              🔴 Live Now
            </h2>

            <p className="mt-1.5 text-sm text-[#9ca3af]">
              Live matches currently being monitored.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-bold text-[#cbd5e1]">
            <span className="text-sm text-[#22c55e]">
              ●
            </span>

            <span>
              Loading...
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-9 text-center">
          <div className="mb-2.5 text-4xl">
            ⚽
          </div>

          <p className="m-0 text-sm text-[#9ca3af]">
            Checking for live matches...
          </p>
        </div>
      </section>
    );
  }

  /* ===================================================
     EMPTY
  =================================================== */

  if (!matches.length) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="m-0 text-2xl font-extrabold text-white">
              🔴 Live Now
            </h2>

            <p className="mt-1.5 text-sm text-[#9ca3af]">
              Live matches currently being monitored.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-bold text-[#cbd5e1]">
            <span className="text-sm text-[#22c55e]">
              ●
            </span>

            <span>
              Monitoring
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-9 text-center">
          <div className="mb-2.5 text-4xl">
            ⚽
          </div>

          <h3 className="m-0 text-xl text-white">
            No live matches
          </h3>

          <p className="mx-auto mt-2 max-w-[550px] text-sm leading-[1.6] text-[#9ca3af]">
            {error ||
              "There are currently no football matches in progress."}
          </p>
        </div>
      </section>
    );
  }

  /* ===================================================
     LIVE MATCHES
  =================================================== */

  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-[#111827] p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
        <div>
          <h2 className="m-0 text-2xl font-extrabold text-white">
            🔴 Live Now
          </h2>

          <p className="mt-1.5 text-sm text-[#9ca3af]">
            {matches.length}{" "}
            {matches.length === 1
              ? "match"
              : "matches"}{" "}
            currently live.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[13px] font-bold text-[#cbd5e1]">
          <span className="text-sm text-[#22c55e]">
            ●
          </span>

          <span>
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {matches.map(
          (match, index) => {
            const id =
              getMatchId(match);

            const homeLogo =
              getHomeLogo(match);

            const awayLogo =
              getAwayLogo(match);

            const homeScore =
              getHomeScore(match);

            const awayScore =
              getAwayScore(match);

            const key =
              id ??
              `live-${index}`;

            return (
              <Link
                key={key}
                href={
                  id
                    ? `/match/${id}`
                    : "#"
                }
                className={`block rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5 text-white no-underline ${
                  id
                    ? "pointer-events-auto"
                    : "pointer-events-none"
                }`}
              >
                <div className="mb-[18px] text-xs font-extrabold text-[#ef4444]">
                  <span className="mr-1.5 text-[#ef4444]">
                    ●
                  </span>

                  LIVE

                  <span className="ml-2 font-medium text-[#9ca3af]">
                    {getStatus(match)}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5">
                  <Team
                    name={
                      getHomeName(
                        match
                      )
                    }
                    logo={
                      homeLogo
                    }
                  />

                  <div className="flex gap-[5px] whitespace-nowrap text-2xl font-black text-white">
                    <span>
                      {homeScore ?? "—"}
                    </span>

                    <span>
                      -
                    </span>

                    <span>
                      {awayScore ?? "—"}
                    </span>
                  </div>

                  <Team
                    name={
                      getAwayName(
                        match
                      )
                    }
                    logo={
                      awayLogo
                    }
                  />
                </div>
              </Link>
            );
          }
        )}
      </div>
    </section>
  );
}

/* =====================================================
   TEAM
===================================================== */

function Team({
  name,
  logo,
}) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center gap-[9px] text-center">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-12 w-12 object-contain"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f2937]">
          ⚽
        </div>
      )}

      <span className="text-sm font-bold leading-[1.3] text-[#e5e7eb]">
        {name}
      </span>
    </div>
  );
}