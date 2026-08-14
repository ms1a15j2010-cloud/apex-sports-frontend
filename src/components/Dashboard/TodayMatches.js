"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function TodayMatches() {
  const [matches, setMatches] = useState([]);
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
          await api.getTodayMatches();

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
          "TodayMatches:",
          err
        );

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
    const date =
      match?.fixture?.date;

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
      <section style={styles.section}>
        <h2 style={styles.title}>
          Today&apos;s Matches
        </h2>

        <div style={styles.message}>
          Loading today&apos;s matches...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={styles.section}>
        <h2 style={styles.title}>
          Today&apos;s Matches
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
          Today&apos;s Matches
        </h2>

        <div style={styles.empty}>
          No matches scheduled today.
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            Today&apos;s Matches
          </h2>

          <p style={styles.subtitle}>
            Matches scheduled for today.
          </p>
        </div>

        <span style={styles.count}>
          {matches.length}{" "}
          {matches.length === 1
            ? "match"
            : "matches"}
        </span>
      </div>

      <div style={styles.grid}>
        {matches.map(
          (match, index) => {
            const id =
              getMatchId(match);

            const key =
              id ?? `today-${index}`;

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
                <div style={styles.time}>
                  {getMatchTime(match)}
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

                    <span>
                      {getHomeName(match)}
                    </span>
                  </div>

                  <span style={styles.vs}>
                    VS
                  </span>

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

                    <span>
                      {getAwayName(match)}
                    </span>
                  </div>
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
    border: "1px solid #1e293b",
    borderRadius: 16,
    padding: 20,
    color: "#ffffff",
  },

  time: {
    textAlign: "center",
    color: "#60a5fa",
    fontSize: 13,
    fontWeight: 700,
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

  vs: {
    color: "#6b7280",
    fontSize: 12,
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