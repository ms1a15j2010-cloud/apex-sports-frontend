"use client";

import {
  useEffect,
  useState,
} from "react";

import { useLive } from "@/context/LiveContext";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

export default function TodayMatches() {

  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);

  const {
  registerMatches,
  getMatch,
} = useLive();

  useEffect(() => {

  async function load() {

    const data =
      await api.getTodayMatches();

    if (data.success) {

      setMatches(data.matches);

      await registerMatches(
        data.matches.map(
          (match) =>
            match.fixture.id
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
        Loading today's matches...
      </section>
    );

  return (
    <section style={styles.section}>

      <h2 style={styles.title}>
        📅 Today's Matches
      </h2>

      {!matches.length ? (

        <div style={styles.empty}>
          No matches today.
        </div>

      ) : (

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

              <League league={match.league} />

              <div style={styles.row}>

                <Team team={match.home} />

                <div style={styles.center}>

                  <div style={styles.time}>
                    {new Date(match.fixture.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <div style={styles.status}>
                    {match.status.short}
                  </div>

                </div>

                <Team team={match.away} reverse />

              </div>

            </Link>
  );
})}

        </div>

      )}

    </section>
  );
}

function League({ league }) {

  return (

    <div style={styles.league}>

      <Image
        src={league.logo}
        width={22}
        height={22}
        alt={league.name}
      />

      <span>{league.name}</span>

    </div>

  );
}

function Team({ team, reverse = false }) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: reverse ? "row-reverse" : "row",
        gap: 10,
      }}
    >

      <Image
        src={team.logo}
        width={36}
        height={36}
        alt={team.name}
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
    color: "#fff",
  },

  title: {
    marginBottom: 20,
    fontSize: 28,
  },

  empty: {
    color: "#9ca3af",
    textAlign: "center",
    padding: 30,
  },

  grid: {
    display: "grid",
    gap: 15,
  },

  card: {
    background: "#1f2937",
    borderRadius: 15,
    padding: 18,
    textDecoration: "none",
    color: "white",
  },

  league: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#9ca3af",
    marginBottom: 15,
    fontWeight: 600,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
  },

  center: {
    textAlign: "center",
  },

  time: {
    fontWeight: 700,
    fontSize: 20,
    color: "#22c55e",
  },

  status: {
    marginTop: 6,
    color: "#9ca3af",
  },

};