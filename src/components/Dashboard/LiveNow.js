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

           Backend may return:

           status: 429
           apiLimitReached: true
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
      <section style={styles.section}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>
              🔴 Live Now
            </h2>

            <p style={styles.subtitle}>
              Live matches currently being monitored.
            </p>
          </div>

          <div style={styles.monitoring}>
            <span style={styles.dot}>
              ●
            </span>

            <span>
              Loading...
            </span>
          </div>
        </div>

        <div style={styles.empty}>
          <div style={styles.emptyIcon}>
            ⚽
          </div>

          <p style={styles.emptyText}>
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
      <section style={styles.section}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>
              🔴 Live Now
            </h2>

            <p style={styles.subtitle}>
              Live matches currently being monitored.
            </p>
          </div>

          <div style={styles.monitoring}>
            <span style={styles.dot}>
              ●
            </span>

            <span>
              Monitoring
            </span>
          </div>
        </div>

        <div style={styles.empty}>
          <div style={styles.emptyIcon}>
            ⚽
          </div>

          <h3 style={styles.emptyTitle}>
            No live matches
          </h3>

          <p style={styles.emptyText}>
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
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            🔴 Live Now
          </h2>

          <p style={styles.subtitle}>
            {matches.length}{" "}
            {matches.length === 1
              ? "match"
              : "matches"}{" "}
            currently live.
          </p>
        </div>

        <div style={styles.monitoring}>
          <span style={styles.dot}>
            ●
          </span>

          <span>
            Live
          </span>
        </div>
      </div>

      <div style={styles.grid}>
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
                style={{
                  ...styles.card,
                  pointerEvents: id
                    ? "auto"
                    : "none",
                }}
              >
                <div style={styles.status}>
                  <span style={styles.liveDot}>
                    ●
                  </span>

                  LIVE

                  <span
                    style={
                      styles.statusText
                    }
                  >
                    {getStatus(match)}
                  </span>
                </div>

                <div style={styles.teams}>
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
    <div style={styles.team}>
      {logo ? (
        <img
          src={logo}
          alt={name}
          style={styles.logo}
        />
      ) : (
        <div
          style={
            styles.logoPlaceholder
          }
        >
          ⚽
        </div>
      )}

      <span style={styles.teamName}>
        {name}
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
    padding: 28,
    marginBottom: 30,
    border: "1px solid #1f2937",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 24,
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 800,
  },

  subtitle: {
    margin:
      "6px 0 0",
    color: "#9ca3af",
    fontSize: 14,
  },

  monitoring: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: 700,
  },

  dot: {
    color: "#22c55e",
    fontSize: 14,
  },

  liveDot: {
    color: "#ef4444",
    marginRight: 6,
  },

  statusText: {
    color: "#9ca3af",
    marginLeft: 8,
    fontWeight: 500,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
  },

  card: {
    display: "block",
    background: "#0f172a",
    border:
      "1px solid #1e293b",
    borderRadius: 16,
    padding: 20,
    textDecoration: "none",
    color: "#ffffff",
  },

  status: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 18,
  },

  teams: {
    display: "grid",
    gridTemplateColumns:
      "1fr auto 1fr",
    gap: 14,
    alignItems: "center",
  },

  team: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    textAlign: "center",
    minWidth: 0,
  },

  logo: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },

  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  teamName: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.3,
  },

  score: {
    display: "flex",
    gap: 5,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  empty: {
    background: "#0f172a",
    borderRadius: 16,
    padding: 36,
    textAlign: "center",
    border:
      "1px solid #1e293b",
  },

  emptyIcon: {
    fontSize: 36,
    marginBottom: 10,
  },

  emptyTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: 20,
  },

  emptyText: {
    margin:
      "8px auto 0",
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 1.6,
    maxWidth: 550,
  },
};