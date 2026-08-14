"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

/* =====================================================
   FEATURED MATCH
===================================================== */

export default function FeaturedMatch() {
  const [match, setMatch] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

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

        const data =
          await api.getFeaturedMatch();

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

        if (
          data?.status === 503
        ) {
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

        if (
          data?.success &&
          data?.match
        ) {
          setMatch(
            data.match
          );

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

        console.error(
          "FeaturedMatch:",
          err
        );

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
      <section
        style={styles.section}
      >
        <h2
          style={styles.heading}
        >
          ⭐ Featured Match
        </h2>

        <div
          style={styles.loading}
        >
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
      <section
        style={styles.section}
      >
        <h2
          style={styles.heading}
        >
          ⭐ Featured Match
        </h2>

        <div
          style={styles.empty}
        >
          <div
            style={styles.emptyIcon}
          >
            ⚽
          </div>

          <div
            style={styles.emptyTitle}
          >
            Featured match unavailable
          </div>

          <div
            style={styles.emptyText}
          >
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
    match?.score
      ?.fulltime
      ?.home ??
    match?.score
      ?.fullTime
      ?.home ??
    null;

  const awayScore =
    goals?.away ??
    match?.score
      ?.fulltime
      ?.away ??
    match?.score
      ?.fullTime
      ?.away ??
    null;

  const matchDate =
    match?.fixture?.date ??
    match?.date ??
    null;

  /* ===================================================
     CONTENT
  =================================================== */

  const content = (
    <div
      style={styles.card}
    >
      <div
        style={styles.league}
      >
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

      <div
        style={styles.content}
      >
        <Team
          team={home}
        />

        <div
          style={styles.score}
        >
          <div
            style={styles.scoreText}
          >
            {homeScore ??
              "—"}{" "}
            :{" "}
            {awayScore ??
              "—"}
          </div>

          <div
            style={styles.status}
          >
            {status?.long ||
              status?.short ||
              "Upcoming"}
          </div>

          {matchDate && (
            <div
              style={styles.date}
            >
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
      <section
        style={styles.section}
      >
        <h2
          style={styles.heading}
        >
          ⭐ Featured Match
        </h2>

        <Link
          href={`/match/${fixtureId}`}
          style={{
            textDecoration:
              "none",

            color:
              "inherit",
          }}
        >
          {content}
        </Link>
      </section>
    );
  }

  return (
    <section
      style={styles.section}
    >
      <h2
        style={styles.heading}
      >
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
      style={{
        ...styles.team,

        justifyContent:
          reverse
            ? "flex-end"
            : "flex-start",
      }}
    >
      {!reverse &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={60}
            height={60}
            style={styles.teamLogo}
          />
        ) : (
          <div
            style={
              styles.logoPlaceholder
            }
          >
            ⚽
          </div>
        ))}

      <div
        style={{
          fontWeight: 700,

          fontSize: 20,

          textAlign:
            reverse
              ? "right"
              : "left",
        }}
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
            style={styles.teamLogo}
          />
        ) : (
          <div
            style={
              styles.logoPlaceholder
            }
          >
            ⚽
          </div>
        ))}
    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {
  section: {
    background:
      "#111827",

    borderRadius:
      20,

    padding:
      30,

    color:
      "#ffffff",

    border:
      "1px solid #1f2937",
  },

  heading: {
    fontSize:
      28,

    margin:
      "0 0 25px",

    fontWeight:
      800,
  },

  loading: {
    textAlign:
      "center",

    padding:
      40,

    color:
      "#94a3b8",
  },

  empty: {
    textAlign:
      "center",

    padding:
      40,

    borderRadius:
      16,

    background:
      "#0f172a",

    border:
      "1px solid #1e293b",
  },

  emptyIcon: {
    fontSize:
      36,

    marginBottom:
      10,
  },

  emptyTitle: {
    color:
      "#ffffff",

    fontSize:
      18,

    fontWeight:
      700,
  },

  emptyText: {
    marginTop:
      8,

    color:
      "#94a3b8",

    fontSize:
      14,

    lineHeight:
      1.6,
  },

  card: {
    background:
      "#1f2937",

    borderRadius:
      16,

    padding:
      25,

    border:
      "1px solid #374151",
  },

  league: {
    display:
      "flex",

    alignItems:
      "center",

    gap:
      10,

    marginBottom:
      20,

    color:
      "#94a3b8",

    fontWeight:
      600,
  },

  content: {
    display:
      "grid",

    gridTemplateColumns:
      "1fr auto 1fr",

    alignItems:
      "center",

    gap:
      25,
  },

  team: {
    display:
      "flex",

    alignItems:
      "center",

    gap:
      15,

    minWidth:
      0,
  },

  teamLogo: {
    objectFit:
      "contain",
  },

  score: {
    textAlign:
      "center",
  },

  scoreText: {
    fontSize:
      42,

    fontWeight:
      800,

    color:
      "#22c55e",
  },

  status: {
    marginTop:
      10,

    color:
      "#94a3b8",

    fontWeight:
      600,
  },

  date: {
    marginTop:
      10,

    color:
      "#94a3b8",

    fontSize:
      14,
  },

  logoPlaceholder: {
    width:
      60,

    height:
      60,

    borderRadius:
      "50%",

    background:
      "#374151",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    flexShrink:
      0,
  },
};