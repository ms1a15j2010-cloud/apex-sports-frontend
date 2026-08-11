"use client";

/* =====================================================
   REACT
===================================================== */

import {
  useCallback,
  useEffect,
  useState,
} from "react";

/* =====================================================
   NEXT
===================================================== */

import Link from "next/link";
import Image from "next/image";

/* =====================================================
   LIVE CONTEXT
===================================================== */

import { useLive } from "@/context/LiveContext";

/* =====================================================
   API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   REFRESH INTERVAL
===================================================== */

const REFRESH_INTERVAL = 60000;

/* =====================================================
   COMPONENT
===================================================== */

export default function LiveClient({
  initialMatches = [],
}) {
  const {
    registerMatches,
    getMatch,
  } = useLive();

  const [
    matches,
    setMatches,
  ] = useState(
    Array.isArray(initialMatches)
      ? initialMatches
      : []
  );

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(null);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    refreshError,
    setRefreshError,
  ] = useState("");

  /* ==========================================
     CLIENT MOUNT
  ========================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ==========================================
     REGISTER INITIAL MATCHES
  ========================================== */

  useEffect(() => {
    const safeMatches =
      Array.isArray(initialMatches)
        ? initialMatches
        : [];

    setMatches(safeMatches);

    if (!safeMatches.length) {
      return;
    }

    const fixtureIds =
      safeMatches
        .map(
          (match) =>
            match?.fixture?.id
        )
        .filter(Boolean);

    if (fixtureIds.length) {
      registerMatches(fixtureIds);
    }
  }, [
    initialMatches,
    registerMatches,
  ]);

  /* ==========================================
     REFRESH LIVE MATCHES
  ========================================== */

  const refreshLiveMatches =
    useCallback(async () => {
      try {
        setIsRefreshing(true);
        setRefreshError("");

        /*
          Make sure API URL is valid.
        */

        const baseUrl =
          String(API || "").replace(
            /\/$/,
            ""
          );

        if (!baseUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured."
          );
        }

        const url =
          `${baseUrl}/api/live`;

        console.log(
          "🔄 Refreshing live matches:",
          url
        );

        const controller =
          new AbortController();

        const timeout =
          setTimeout(() => {
            controller.abort();
          }, 15000);

        let res;

        try {
          res = await fetch(url, {
            method: "GET",

            cache: "no-store",

            headers: {
              Accept:
                "application/json",
            },

            signal:
              controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }

        if (!res.ok) {
          throw new Error(
            `Live API returned ${res.status}`
          );
        }

        const contentType =
          res.headers.get(
            "content-type"
          ) || "";

        if (
          !contentType.includes(
            "application/json"
          )
        ) {
          throw new Error(
            "Live API did not return JSON."
          );
        }

        const data =
          await res.json();

        console.log(
          "✅ Live API response:",
          data
        );

        const nextMatches =
          Array.isArray(
            data?.matches
          )
            ? data.matches
            : [];

        setMatches(
          nextMatches
        );

        /*
          Register fixtures with
          LiveContext.
        */

        const fixtureIds =
          nextMatches
            .map(
              (match) =>
                match?.fixture?.id
            )
            .filter(Boolean);

        if (
          fixtureIds.length
        ) {
          registerMatches(
            fixtureIds
          );
        }

        setLastUpdated(
          new Date()
        );

      } catch (error) {
        console.error(
          "❌ Live refresh failed:",
          error
        );

        /*
          Do not destroy the currently
          displayed matches when a refresh
          temporarily fails.

          This is important for network
          interruptions.
        */

        if (
          error?.name ===
          "AbortError"
        ) {
          setRefreshError(
            "Live update timed out. Retrying soon..."
          );
        } else {
          setRefreshError(
            "Unable to refresh live matches. Retrying soon..."
          );
        }

      } finally {
        setIsRefreshing(
          false
        );
      }
    }, [
      registerMatches,
    ]);

  /* ==========================================
     AUTO REFRESH
  ========================================== */

  useEffect(() => {
    let cancelled = false;

    const runRefresh =
      async () => {
        if (cancelled) {
          return;
        }

        await refreshLiveMatches();
      };

    /*
      IMPORTANT:
      Refresh immediately when the
      component loads.

      Previously the first refresh
      waited 60 seconds.
    */

    runRefresh();

    const interval =
      setInterval(
        runRefresh,
        REFRESH_INTERVAL
      );

    return () => {
      cancelled = true;

      clearInterval(
        interval
      );
    };
  }, [
    refreshLiveMatches,
  ]);

  /* ==========================================
     LAST UPDATED DISPLAY
  ========================================== */

  const renderUpdatedTime =
    () => {
      if (
        !mounted ||
        !lastUpdated
      ) {
        return "Waiting for update...";
      }

      return `Updated ${lastUpdated.toLocaleTimeString()}`;
    };

  /* ==========================================
     HEADER
  ========================================== */

  const renderHeader =
    () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: 20,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize:
                "clamp(28px, 5vw, 40px)",
              margin: 0,
              fontWeight: 800,
            }}
          >
            🔴 Live Football
          </h1>

          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              color: "#94a3b8",
            }}
          >
            Live scores and match updates
          </p>
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            textAlign: "right",
          }}
        >
          <div>
            {isRefreshing
              ? "🔄 Updating..."
              : "🟢 Live monitoring"}
          </div>

          <div
            style={{
              marginTop: 5,
            }}
          >
            {renderUpdatedTime()}
          </div>

          {refreshError && (
            <div
              style={{
                marginTop: 6,
                color: "#f59e0b",
                maxWidth: 280,
              }}
            >
              {refreshError}
            </div>
          )}
        </div>
      </div>
    );

  /* ==========================================
     EMPTY STATE
  ========================================== */

  if (!matches.length) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: 20,
          color: "#fff",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {renderHeader()}

        <div
          style={{
            background: "#111827",
            padding: 40,
            borderRadius: 18,
            textAlign: "center",
            border:
              "1px solid #1e293b",
          }}
        >
          <div
            style={{
              fontSize: 42,
              marginBottom: 15,
            }}
          >
            ⚽
          </div>

          <h2
            style={{
              marginBottom: 10,
            }}
          >
            No Live Matches
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            There are currently no
            football matches in progress.
            This page will automatically
            check again.
          </p>

          <div
            style={{
              marginTop: 20,
              fontSize: 13,
              color: "#64748b",
            }}
          >
            🔄 Next update within 60 seconds
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================
     LIVE MATCH PAGE
  ========================================== */

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        color: "#fff",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {renderHeader()}

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        {matches.map(
          (originalMatch) => {
            const fixtureId =
              originalMatch
                ?.fixture?.id;

            const live =
              fixtureId
                ? getMatch(
                    fixtureId
                  )
                : null;

            const match =
              live?.match?.match ||
              originalMatch;

            const fixture =
              match?.fixture || {};

            const league =
              match?.league || {};

            const home =
              match?.home ||
              match?.teams?.home ||
              {};

            const away =
              match?.away ||
              match?.teams?.away ||
              {};

            const matchId =
              fixture?.id ||
              fixtureId;

            if (!matchId) {
              return null;
            }

            return (
              <Link
                key={matchId}
                href={`/match/${matchId}`}
                style={{
                  textDecoration:
                    "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    background:
                      "#111827",
                    borderRadius: 18,
                    padding: 20,
                    border:
                      "1px solid #1e293b",
                    transition:
                      "border-color 0.2s ease",
                  }}
                >
                  {/* =================================
                      LEAGUE
                  ================================== */}

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 10,
                      marginBottom: 20,
                      flexWrap:
                        "wrap",
                    }}
                  >
                    {league?.logo && (
                      <Image
                        src={
                          league.logo
                        }
                        alt={
                          league.name ||
                          "League"
                        }
                        width={30}
                        height={30}
                        unoptimized
                      />
                    )}

                    <div>
                      <strong>
                        {league?.name ||
                          "Football"}
                      </strong>

                      {league?.country && (
                        <div
                          style={{
                            color:
                              "#94a3b8",
                            fontSize: 13,
                            marginTop: 2,
                          }}
                        >
                          {
                            league.country
                          }
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        marginLeft:
                          "auto",
                        background:
                          "#dc2626",
                        padding:
                          "5px 12px",
                        borderRadius:
                          20,
                        fontWeight:
                          "bold",
                        fontSize: 13,
                      }}
                    >
                      {
                        match?.status
                          ?.short ||
                        "LIVE"
                      }

                      {match?.status
                        ?.elapsed
                        ? ` ${match.status.elapsed}'`
                        : ""}
                    </div>
                  </div>

                  {/* =================================
                      TEAMS
                  ================================== */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "minmax(0, 1fr) auto minmax(0, 1fr)",
                      alignItems:
                        "center",
                      gap: 15,
                    }}
                  >
                    <Team
                      team={home}
                    />

                    <div
                      style={{
                        textAlign:
                          "center",
                        minWidth: 80,
                      }}
                    >
                      <div
                        style={{
                          fontSize:
                            34,
                          fontWeight:
                            "bold",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          match?.goals
                            ?.home ??
                          0
                        }

                        {" - "}

                        {
                          match?.goals
                            ?.away ??
                          0
                        }
                      </div>

                      <div
                        style={{
                          color:
                            "#94a3b8",
                          fontSize: 13,
                          marginTop: 5,
                        }}
                      >
                        {
                          match?.status
                            ?.long ||
                          "Live"
                        }
                      </div>
                    </div>

                    <Team
                      team={away}
                      reverse
                    />
                  </div>

                  {/* =================================
                      MATCH DATE
                  ================================== */}

                  {fixture?.date && (
                    <div
                      style={{
                        marginTop: 20,
                        textAlign:
                          "center",
                        color:
                          "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {new Date(
                        fixture.date
                      ).toLocaleString()}
                    </div>
                  )}
                </div>
              </Link>
            );
          }
        )}
      </div>
    </main>
  );
}

/* =====================================================
   TEAM COMPONENT
===================================================== */

function Team({
  team,
  reverse = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          reverse
            ? "flex-end"
            : "flex-start",
        gap: 10,
        flexDirection:
          reverse
            ? "row-reverse"
            : "row",
        minWidth: 0,
      }}
    >
      {team?.logo && (
        <Image
          src={team.logo}
          alt={
            team?.name ||
            "Team"
          }
          width={45}
          height={45}
          unoptimized
        />
      )}

      <strong
        style={{
          overflow: "hidden",
          textOverflow:
            "ellipsis",
          whiteSpace:
            "nowrap",
        }}
      >
        {team?.name ||
          "Unknown Team"}
      </strong>
    </div>
  );
}