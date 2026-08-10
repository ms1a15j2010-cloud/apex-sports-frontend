"use client";

import {
  useEffect,
  useState,
} from "react";

import { useLive } from "@/context/LiveContext";
import Link from "next/link";
import Image from "next/image";

import { api } from "@/lib/api";

export default function LiveNow() {
  const {
  registerMatches,
  getMatch,
} = useLive();
const [loading, setLoading] =
  useState(true);

const {
  registerMatches,
} = useLive();

  useEffect(() => {
  async function load() {
    const data =
      await api.getLiveMatches();

    if (data.success) {
      setMatches(data.matches);

      await registerMatches(
        data.matches.map(
          (m) =>
            m.fixture.id
        )
      );
    }

    setLoading(false);
  }

  load();

}, [registerMatches]);

  if (loading)
    return (
      <section style={styles.section}>
        Loading live matches...
      </section>
    );

  if (!matches.length)
    return (
      <section style={styles.section}>
        No live matches.
      </section>
    );

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>
        🔴 Live Now
      </h2>

      <div style={styles.grid}>
        {matches.map((originalMatch) => {

  const live =
    getMatch(originalMatch.fixture.id);

  const match =
    live?.match?.match ||
    originalMatch;

  return (

    <Link
      key={match.fixture.id}
      href={`/match/${match.fixture.id}`}
      style={styles.card}
    >

      <Team team={match.home} />

      <div style={styles.score}>

        <div style={styles.result}>
          {match.goals.home} - {match.goals.away}
        </div>

        <div style={styles.minute}>
          {match.status.elapsed}
        </div>

        <div style={styles.status}>
          {match.status.short}
        </div>

      </div>

      <Team team={match.away} reverse />

    </Link>

  );

})}
      </div>
    </section>
  );
}

function Team({ team, reverse = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      <Image
        src={team.logo}
        alt={team.name}
        width={42}
        height={42}
      />

      <span>{team.name}</span>
    </div>
  );
}

const styles = {
  section: {
    background: "#111827",
    borderRadius: 20,
    padding: 25,
    color: "white",
  },

  heading: {
    marginBottom: 20,
    fontSize: 28,
  },

  grid: {
    display: "grid",
    gap: 15,
  },

  card: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    background: "#1f2937",
    borderRadius: 15,
    padding: 18,
    textDecoration: "none",
    color: "white",
  },

  score: {
    textAlign: "center",
  },

  result: {
    fontSize: 28,
    fontWeight: 700,
    color: "#22c55e",
  },

  minute: {
    color: "#ef4444",
    fontWeight: 700,
    marginTop: 5,
  },

  status: {
    color: "#9ca3af",
    marginTop: 5,
  },
};