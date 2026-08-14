"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { api } from "@/lib/api";

/* =====================================================
   DASHBOARD HERO
===================================================== */

export default function DashboardHero() {
  const [hero, setHero] =
    useState({
      leagues: 0,
      teams: 0,
      players: 0,
      fixtures: 0,
    });

  const [league, setLeague] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ===================================================
     PREVENT REPEATED INITIALIZATION
  =================================================== */

  const loadedRef =
    useRef(false);

  /* ===================================================
     LOAD DASHBOARD HERO
  =================================================== */

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    loadedRef.current =
      true;

    let mounted = true;

    async function load() {
      try {
        if (mounted) {
          setLoading(true);
          setError("");
        }

        const data =
          await api.getDashboard();

        if (!mounted) {
          return;
        }

        if (
          data?.success
        ) {
          setHero({
            leagues:
              Number(
                data?.hero
                  ?.leagues
              ) || 0,

            teams:
              Number(
                data?.hero
                  ?.teams
              ) || 0,

            players:
              Number(
                data?.hero
                  ?.players
              ) || 0,

            fixtures:
              Number(
                data?.hero
                  ?.fixtures
              ) || 0,
          });

          setLeague(
            data?.league ||
              null
          );
        } else {
          setError(
            data?.message ||
              "Unable to load dashboard"
          );
        }
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error(
          "DashboardHero:",
          err
        );

        setError(
          err?.message ||
            "Unable to load dashboard"
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
     LOADING
  =================================================== */

  if (loading) {
    return (
      <section
        style={styles.section}
      >
        <div
          style={
            styles.loading
          }
        >
          Loading dashboard...
        </div>
      </section>
    );
  }

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <section
      style={styles.section}
    >
      <div
        style={
          styles.header
        }
      >
        <div>
          <div
            style={
              styles.eyebrow
            }
          >
            APEX SPORTS
          </div>

          <h1
            style={
              styles.title
            }
          >
            Football Dashboard
          </h1>

          <p
            style={
              styles.subtitle
            }
          >
            Latest football
            data, fixtures,
            teams, players
            and competitions.
          </p>

          {league && (
            <div
              style={
                styles.leagueBadge
              }
            >
              <span>
                {league?.name ||
                  "Premier League"}
              </span>

              {league?.season && (
                <span
                  style={
                    styles.season
                  }
                >
                  {league.season}
                  /
                  {String(
                    Number(
                      league.season
                    ) + 1
                  ).slice(-2)}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          style={
            styles.source
          }
        >
          <div
            style={
              styles.sourceLabel
            }
          >
            DATA SOURCE
          </div>

          <div
            style={
              styles.sourceValue
            }
          >
            football-data.org
          </div>
        </div>
      </div>

      {error && (
        <div
          style={
            styles.error
          }
        >
          {error}
        </div>
      )}

      <div
        style={
          styles.stats
        }
      >
        <StatCard
          icon="🏆"
          label="Leagues"
          value={
            hero.leagues
          }
        />

        <StatCard
          icon="⚽"
          label="Teams"
          value={
            hero.teams
          }
        />

        <StatCard
          icon="👤"
          label="Players"
          value={
            hero.players
          }
        />

        <StatCard
          icon="📅"
          label="Fixtures"
          value={
            hero.fixtures
          }
        />
      </div>
    </section>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div
      style={
        styles.statCard
      }
    >
      <div
        style={
          styles.statIcon
        }
      >
        {icon}
      </div>

      <div
        style={
          styles.statValue
        }
      >
        {Number(
          value
        ).toLocaleString()}
      </div>

      <div
        style={
          styles.statLabel
        }
      >
        {label}
      </div>
    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {
  section: {
    background:
      "linear-gradient(135deg, #111827 0%, #0f172a 100%)",
    border:
      "1px solid #1f2937",
    borderRadius: 20,
    padding: 28,
    marginBottom: 30,
    color: "#ffffff",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    gap: 25,
    flexWrap: "wrap",
  },

  eyebrow: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  title: {
    margin: 0,
    fontSize:
      "clamp(28px, 5vw, 46px)",
    lineHeight: 1.1,
    fontWeight: 900,
  },

  subtitle: {
    margin:
      "10px 0 0",
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 1.6,
    maxWidth: 650,
  },

  leagueBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    padding:
      "8px 12px",
    background: "#0b1220",
    border:
      "1px solid #1f2937",
    borderRadius: 9,
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: 700,
  },

  season: {
    color: "#22c55e",
  },

  source: {
    padding: 12,
    textAlign: "right",
  },

  sourceLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1,
  },

  sourceValue: {
    marginTop: 5,
    color: "#22c55e",
    fontSize: 13,
    fontWeight: 800,
  },

  error: {
    marginTop: 20,
    padding:
      "10px 14px",
    borderRadius: 10,
    background: "#3f1d1d",
    border:
      "1px solid #7f1d1d",
    color: "#fca5a5",
    fontSize: 13,
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
    marginTop: 28,
  },

  statCard: {
    background: "#0b1220",
    border:
      "1px solid #1f2937",
    borderRadius: 14,
    padding: 17,
  },

  statIcon: {
    fontSize: 22,
    marginBottom: 8,
  },

  statValue: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: 900,
  },

  statLabel: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 11,
    fontWeight: 800,
    textTransform:
      "uppercase",
    letterSpacing: 0.6,
  },

  loading: {
    color: "#94a3b8",
    fontSize: 14,
  },
};