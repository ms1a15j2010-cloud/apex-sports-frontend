"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function LatestResults() {
  const [matches, setMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data =
          await api.getLatestResults();

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

        console.error(
          "LatestResults:",
          err
        );

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
      return new Date(
        date
      ).toLocaleDateString(
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
      <section style={styles.section}>
        <h2 style={styles.title}>
          Latest Results
        </h2>

        <div style={styles.message}>
          Loading latest results...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={styles.section}>
        <h2 style={styles.title}>
          Latest Results
        </h2>

        <div style={styles.message}>
          {error}
        </div>
      </section>
    );
  }

  if (!matches.length) {
    return (
      <section style={styles.section}>
        <h2 style={styles.title}>
          Latest Results
        </h2>

        <div style={styles.empty}>
          No recent results available.
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            Latest Results
          </h2>

          <p style={styles.subtitle}>
            Recently completed matches.
          </p>
        </div>

        <span style={styles.count}>
          {matches.length}{" "}
          {matches.length === 1
            ? "result"
            : "results"}
        </span>
      </div>

      <div style={styles.grid}>
        {matches.map(
          (match, index) => {
            const id =
              getMatchId(match);

            const key =
              id ??
              `result-${index}`;

            const homeScore =
              getHomeScore(match);

            const awayScore =
              getAwayScore(match);

            return (
              <Link
                key={key}
                href={
                  id
                    ? `/match/${id}`
                    : "#"
                }
                style={{
                  ...styles.card,
                  pointerEvents: id
                    ? "auto"
                    : "none",
                }}
              >
                <div style={styles.date}>
                  {formatDate(match)}
                </div>

                <div style={styles.teams}>
                  <div style={styles.team}>
                    {getHomeLogo(match) ? (
                      <img
                        src={getHomeLogo(match)}
                        alt={getHomeName(match)}
                        style={styles.logo}
                      />
                    ) : (
                      <div style={styles.placeholder}>
                        ⚽
                      </div>
                    )}

                    <span style={styles.teamName}>
                      {getHomeName(match)}
                    </span>
                  </div>

                  <div style={styles.score}>
                    <span>
                      {homeScore ??
                        "—"}
                    </span>

                    <span>
                      -
                    </span>

                    <span>
                      {awayScore ??
                        "—"}
                    </span>
                  </div>

                  <div style={styles.team}>
                    {getAwayLogo(match) ? (
                      <img
                        src={getAwayLogo(match)}
                        alt={getAwayName(match)}
                        style={styles.logo}
                      />
                    ) : (
                      <div style={styles.placeholder}>
                        ⚽
                      </div>
                    )}

                    <span style={styles.teamName}>
                      {getAwayName(match)}
                    </span>
                  </div>
                </div>

                <div style={styles.completed}>
                  FT
                </div>
              </Link>
            );
          }
        )}
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#111827",
    borderRadius: 20,
    padding: 28,
    marginBottom: 30,
    border: "1px solid #1f2937",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 24,
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 700,
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#9ca3af",
    fontSize: 14,
  },

  count: {
    color: "#60a5fa",
    fontSize: 14,
    fontWeight: 700,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
  },

  card: {
    display: "block",
    textDecoration: "none",
    background: "#0f172a",
    borderRadius: 16,
    padding: 20,
    border: "1px solid #1e293b",
    color: "#ffffff",
  },

  date: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 20,
  },

  teams: {
    display: "grid",
    gridTemplateColumns:
      "1fr auto 1fr",
    alignItems: "center",
    gap: 14,
  },

  team: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 9,
  },

  teamName: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: 600,
  },

  logo: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },

  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 12,
    background: "#1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  score: {
    display: "flex",
    gap: 5,
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 800,
    whiteSpace: "nowrap",
  },

  completed: {
    marginTop: 18,
    textAlign: "center",
    color: "#22c55e",
    fontSize: 11,
    fontWeight: 800,
  },

  message: {
    marginTop: 20,
    padding: 25,
    background: "#0f172a",
    borderRadius: 14,
    color: "#9ca3af",
  },

  empty: {
    padding: 30,
    background: "#0f172a",
    borderRadius: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
};