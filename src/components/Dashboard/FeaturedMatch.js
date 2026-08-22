"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

/* =====================================================
   FEATURED MATCH
===================================================== */

export default function FeaturedMatch() {
  const [match, setMatch] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ===================================================
     LOAD ONCE

     IMPORTANT:
     No automatic 60-second polling.

     This prevents repeated provider requests while
     football-data.org is rate-limited.
  =================================================== */

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        if (active) {
          setLoading(true);
          setError("");
        }

        const data = await api.getFeaturedMatch();

        if (!active) {
          return;
        }

        /* ==============================================
           PROVIDER RATE LIMIT
        ============================================== */

        if (
          data?.status === 429 ||
          data?.apiLimitReached === true
        ) {
          setMatch(null);

          setError(
            "Featured match data is temporarily unavailable because the football data provider has reached its request limit."
          );

          return;
        }

        /* ==============================================
           SERVICE UNAVAILABLE
        ============================================== */

        if (data?.status === 503) {
          setMatch(null);

          setError(
            data?.message ||
              "Featured match data is temporarily unavailable."
          );

          return;
        }

        /* ==============================================
           SUCCESS
        ============================================== */

        if (data?.success && data?.match) {
          setMatch(data.match);

          setError("");

          return;
        }

        /* ==============================================
           NO MATCH
        ============================================== */

        setMatch(null);

        setError(
          data?.message ||
            "No featured match available."
        );
      } catch (err) {
        if (!active) {
          return;
        }

        console.error("FeaturedMatch:", err);

        setMatch(null);

        setError(
          err?.message ||
            "Unable to load featured match."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <section className="rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 text-white sm:p-[30px]">
        <h2 className="m-0 mb-5 text-[24px] font-extrabold sm:text-[28px]">
          ⭐ Featured Match
        </h2>

        <div className="p-10 text-center text-[#94a3b8]">
          Loading featured match...
        </div>
      </section>
    );
  }

  /* ===================================================
     ERROR / UNAVAILABLE
  =================================================== */

  if (!match) {
    return (
      <section className="rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 text-white sm:p-[30px]">
        <h2 className="m-0 mb-5 text-[24px] font-extrabold sm:text-[28px]">
          ⭐ Featured Match
        </h2>

        <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-10 text-center">
          <div className="mb-2.5 text-[36px]">
            ⚽
          </div>

          <div className="text-lg font-bold text-white">
            Featured match unavailable
          </div>

          <div className="mt-2 text-sm leading-[1.6] text-[#94a3b8]">
            {error ||
              "No featured match is currently available."}
          </div>
        </div>
      </section>
    );
  }

  /* ===================================================
     NORMALIZE MATCH
  =================================================== */

  const fixtureId =
    match?.fixture?.id ??
    match?.id ??
    null;

  const home =
    match?.home ??
    match?.teams?.home ??
    {};

  const away =
    match?.away ??
    match?.teams?.away ??
    {};

  const goals =
    match?.goals ?? {};

  const league =
    match?.league ?? {};

  const status =
    match?.status ??
    match?.fixture?.status ??
    {};

  const homeScore =
    goals?.home ??
    match?.score?.fulltime?.home ??
    match?.score?.fullTime?.home ??
    null;

  const awayScore =
    goals?.away ??
    match?.score?.fulltime?.away ??
    match?.score?.fullTime?.away ??
    null;

  const matchDate =
    match?.fixture?.date ??
    match?.date ??
    null;

  /* ===================================================
     CONTENT
  =================================================== */

  const content = (
    <div className="rounded-2xl border border-[#374151] bg-[#1f2937] p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5 font-semibold text-[#94a3b8]">
        {league?.logo && (
          <Image
            src={league.logo}
            alt={
              league?.name ||
              "League"
            }
            width={28}
            height={28}
          />
        )}

        <span>
          {league?.name ||
            "Featured Match"}
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <Team team={home} />

        <div className="text-center">
          <div className="text-[34px] font-extrabold text-[#22c55e] sm:text-[42px]">
            {homeScore ?? "—"} :{" "}
            {awayScore ?? "—"}
          </div>

          <div className="mt-2.5 font-semibold text-[#94a3b8]">
            {status?.long ||
              status?.short ||
              "Upcoming"}
          </div>

          {matchDate && (
            <div className="mt-2.5 text-sm text-[#94a3b8]">
              {new Date(
                matchDate
              ).toLocaleString()}
            </div>
          )}
        </div>

        <Team
          team={away}
          reverse
        />
      </div>
    </div>
  );

  /* ===================================================
     LINK ONLY WHEN MATCH ID EXISTS
  =================================================== */

  if (fixtureId) {
    return (
      <section className="rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 text-white sm:p-[30px]">
        <h2 className="m-0 mb-5 text-[24px] font-extrabold sm:text-[28px]">
          ⭐ Featured Match
        </h2>

        <Link
          href={`/match/${fixtureId}`}
          className="block no-underline text-inherit"
        >
          {content}
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-[20px] border border-[#1f2937] bg-[#111827] p-5 text-white sm:p-[30px]">
      <h2 className="m-0 mb-5 text-[24px] font-extrabold sm:text-[28px]">
        ⭐ Featured Match
      </h2>

      {content}
    </section>
  );
}

/* =====================================================
   TEAM
===================================================== */

function Team({
  team = {},
  reverse = false,
}) {
  const name =
    team?.name ||
    team?.shortName ||
    "Unknown Team";

  const logo =
    team?.logo ||
    team?.crest ||
    null;

  return (
    <div
      className={`flex min-w-0 items-center gap-[15px] ${
        reverse
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!reverse &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={60}
            height={60}
            className="shrink-0 object-contain"
          />
        ) : (
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#374151]">
            ⚽
          </div>
        ))}

      <div
        className={`text-lg font-bold sm:text-xl ${
          reverse
            ? "text-right"
            : "text-left"
        }`}
      >
        {name}
      </div>

      {reverse &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={60}
            height={60}
            className="shrink-0 object-contain"
          />
        ) : (
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#374151]">
            ⚽
          </div>
        ))}
    </div>
  );
}