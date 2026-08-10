"use client";

/* =====================================================
   REACT
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

/* =====================================================
   API
===================================================== */

import { api } from "@/lib/api";

/* =====================================================
   LIVE CONTEXT
===================================================== */

import {
  useLive,
} from "@/context/LiveContext";

/* =====================================================
   COMPONENT
===================================================== */

export default function LatestResults() {

  const [matches, setMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const {
    registerMatches,
    getMatch,
  } = useLive();

  /* ==========================================
     LOAD RESULTS
  ========================================== */

  useEffect(() => {

    async function load() {

      const data =
        await api.getLatestResults();

      if (data.success) {

        setMatches(
          data.matches || []
        );

        await registerMatches(
          (data.matches || []).map(
            (match) =>
              match.fixture.id
          )
        );

      }

      setLoading(false);

    }

    load();

  }, [registerMatches]);

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <section
        style={styles.section}
      >
        Loading latest results...
      </section>
    );
  }

  /* ==========================================
     EMPTY
  ========================================== */

  if (!matches.length) {
    return (
      <section
        style={styles.section}
      >
        No finished matches.
      </section>
    );
  }

  /* ==========================================
     UI
  ========================================== */

  return (
    <section style={styles.section}>

      <h2 style={styles.title}>
        📋 Latest Results
      </h2>

      <div style={styles.list}>
                {matches.map((originalMatch) => {

          const live =
            getMatch(
              originalMatch.fixture?.id
            );

          const match =
              live?.match?.match ||
              live?.match ||
              live ||
              originalMatch;

          return (

            <Link
              key={match.fixture.id}
              href={`/match/${match.fixture.id}`}
              style={styles.card}
            >

              {/* ===========================
                  League
              =========================== */}

              <div style={styles.league}>

                <Image
                  src={match.league.logo}
                  alt={match.league.name}
                  width={22}
                  height={22}
                />

                <span>
                  {match.league.name}
                </span>

              </div>

              {/* ===========================
                  Match Row
              =========================== */}

              <div style={styles.row}>

                <Team
                  team={match.home}
                />

                <div style={styles.score}>

                  {match.goals.home}

                  {" - "}

                  {match.goals.away}

                </div>

                <Team
                  team={match.away}
                  reverse
                />

              </div>

              {/* ===========================
                  Date
              =========================== */}

              <div style={styles.date}>

                {new Date(
                  match.fixture.date
                ).toLocaleDateString()}

              </div>

            </Link>

          );

        })}

              </div>

    </section>
  );
}

/* =====================================================
   TEAM
===================================================== */

function Team({
  team,
  reverse = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "35%",
        flexDirection: reverse
          ? "row-reverse"
          : "row",
      }}
    >

      <Image
        src={team.logo}
        alt={team.name}
        width={30}
        height={30}
      />

      <span>
        {team.name}
      </span>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {

  section: {
    background: "#111827",
    borderRadius: 20,
    padding: 25,
    color: "#fff",
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  card: {
    background: "#1f2937",
    borderRadius: 15,
    padding: 18,
    color: "#fff",
    textDecoration: "none",
    transition: ".25s",
  },

  league: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: 600,
  },
    row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  score: {
    fontSize: 24,
    fontWeight: 700,
    color: "#22c55e",
    minWidth: 90,
    textAlign: "center",
  },

  date: {
    marginTop: 15,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 13,
  },

};