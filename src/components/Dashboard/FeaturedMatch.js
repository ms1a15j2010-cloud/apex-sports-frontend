"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

export default function FeaturedMatch() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await api.getFeaturedMatch();

        if (!active) return;

        if (data.success && data.match) {
          setMatch(data.match);
        } else {
          setMatch(null);
        }
      } catch (err) {
        console.error(err);

        if (active) setMatch(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    const interval = setInterval(load, 60000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <section style={styles.section}>
        <h2 style={styles.heading}>⭐ Featured Match</h2>

        <div style={styles.loading}>
          Loading featured match...
        </div>
      </section>
    );
  }

  if (!match) {
    return (
      <section style={styles.section}>
        <h2 style={styles.heading}>⭐ Featured Match</h2>

        <div style={styles.empty}>
          No featured match available.
        </div>
      </section>
    );
  }

  const fixtureId = match.fixture?.id ?? match.id;

  const home = match.home ?? match.teams?.home ?? {};

  const away = match.away ?? match.teams?.away ?? {};

  const goals = match.goals ?? {
    home: "-",
    away: "-",
  };

  const league = match.league ?? {};

  const status =
    match.status ??
    match.fixture?.status ?? {};

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>⭐ Featured Match</h2>

      <Link
        href={`/match/${fixtureId}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div style={styles.card}>
          <div style={styles.league}>
            {league.logo && (
              <Image
                src={league.logo}
                alt={league.name}
                width={28}
                height={28}
              />
            )}

            <span>{league.name}</span>
          </div>

          <div style={styles.content}>
            <Team team={home} />

            <div style={styles.score}>
              <div style={styles.scoreText}>
                {goals.home} : {goals.away}
              </div>

              <div style={styles.status}>
                {status.long ||
                  status.short ||
                  "Upcoming"}
              </div>

              {match.fixture?.date && (
                <div style={styles.date}>
                  {new Date(
                    match.fixture.date
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
      </Link>
    </section>
  );
}

function Team({
  team,
  reverse = false,
}) {
  return (
    <div
      style={{
        ...styles.team,
        justifyContent: reverse
          ? "flex-end"
          : "flex-start",
      }}
    >
      {!reverse &&
        (team.logo ? (
          <Image
            src={team.logo}
            alt={team.name}
            width={60}
            height={60}
          />
        ) : (
          <div
            style={
              styles.logoPlaceholder
            }
          />
        ))}

      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          textAlign: reverse
            ? "right"
            : "left",
        }}
      >
        {team.name || "Unknown Team"}
      </div>

      {reverse &&
        (team.logo ? (
          <Image
            src={team.logo}
            alt={team.name}
            width={60}
            height={60}
          />
        ) : (
          <div
            style={
              styles.logoPlaceholder
            }
          />
        ))}
    </div>
  );
}

const styles = {
  section: {
    background: "#111827",
    borderRadius: 20,
    padding: 30,
    color: "#fff",
  },

  heading: {
    fontSize: 28,
    marginBottom: 25,
  },

  loading: {
    textAlign: "center",
    padding: 40,
    color: "#94a3b8",
  },

  empty: {
    textAlign: "center",
    padding: 40,
    color: "#94a3b8",
  },

  card: {
    background: "#1f2937",
    borderRadius: 16,
    padding: 25,
  },

  league: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    color: "#94a3b8",
    fontWeight: 600,
  },

  content: {
    display: "grid",
    gridTemplateColumns:
      "1fr auto 1fr",
    alignItems: "center",
    gap: 25,
  },

  team: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  score: {
    textAlign: "center",
  },

  scoreText: {
    fontSize: 42,
    fontWeight: 800,
    color: "#22c55e",
  },

  status: {
    marginTop: 10,
    color: "#94a3b8",
    fontWeight: 600,
  },

  date: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 14,
  },

  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#374151",
  },
};