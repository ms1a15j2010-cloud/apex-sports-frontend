"use client";

/* =====================================================
   REACT
===================================================== */

import {
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
    initialMatches
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

  /* ==========================================
     CLIENT MOUNT
  ========================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ==========================================
     REGISTER MATCHES FOR LIVE UPDATES
  ========================================== */

  useEffect(() => {
    setMatches(
      initialMatches
    );

    if (
      !initialMatches.length
    ) {
      return;
    }

    registerMatches(
      initialMatches
        .map(
          (match) =>
            match.fixture?.id
        )
        .filter(Boolean)
    );
  }, [
    initialMatches,
    registerMatches,
  ]);

  /* ==========================================
     AUTO REFRESH LIVE MATCHES
  ========================================== */

  useEffect(() => {
    let cancelled = false;

    const refreshLiveMatches =
      async () => {
        if (cancelled) {
          return;
        }

        try {
          setIsRefreshing(true);

          const API =
            process.env
              .NEXT_PUBLIC_API_URL ||
            "http://localhost:5000";

          const res =
            await fetch(
              `${API}/api/live`,
              {
                cache: "no-store",
              }
            );

          if (!res.ok) {
            console.warn(
              "Live refresh failed:",
              res.status
            );

            return;
          }

          const data =
            await res.json();

          if (cancelled) {
            return;
          }

          const nextMatches =
            Array.isArray(
              data.matches
            )
              ? data.matches
              : [];

          setMatches(
            nextMatches
          );

          if (
            nextMatches.length
          ) {
            registerMatches(
              nextMatches
                .map(
                  (match) =>
                    match.fixture?.id
                )
                .filter(Boolean)
            );
          }

          setLastUpdated(
            new Date()
          );

        } catch (error) {
          console.error(
            "Live refresh:",
            error
          );

        } finally {
          if (!cancelled) {
            setIsRefreshing(
              false
            );
          }
        }
      };

    const interval =
      setInterval(
        refreshLiveMatches,
        60000
      );

    return () => {
      cancelled = true;

      clearInterval(
        interval
      );
    };
  }, [
    registerMatches,
  ]);

  /* ==========================================
     LAST UPDATED DISPLAY
  ========================================== */

  const renderUpdatedTime = () => {
    if (
      !mounted ||
      !lastUpdated
    ) {
      return "Waiting for update...";
    }

    return `Updated ${lastUpdated.toLocaleTimeString()}`;
  };

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
        }}
      >

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
                fontSize: 40,
                margin: 0,
              }}
            >
              🔴 Live Football
            </h1>

            <p
              style={{
                marginTop: 8,
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

          </div>

        </div>

        <div
          style={{
            background: "#111827",
            padding: 40,
            borderRadius: 18,
            textAlign: "center",
          }}
        >

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
            }}
          >
            There are currently no football
            matches in progress. This page
            will automatically check again.
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
     PAGE
  ========================================== */

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        color: "#fff",
      }}
    >

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
              fontSize: 40,
              margin: 0,
            }}
          >
            🔴 Live Football
          </h1>

          <p
            style={{
              marginTop: 8,
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

        </div>

      </div>

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
              match.fixture || {};

            const league =
              match.league || {};

            const home =
              match.home ||
              match.teams?.home ||
              {};

            const away =
              match.away ||
              match.teams?.away ||
              {};

            return (
              <Link
                key={
                  fixture.id ||
                  fixtureId
                }
                href={`/match/${
                  fixture.id ||
                  fixtureId
                }`}
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
                  }}
                >

                  {/* League */}

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >

                    {league.logo && (
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
                        unoptimized={
                          true
                        }
                      />
                    )}

                    <div>

                      <strong>
                        {league.name ||
                          "Football"}
                      </strong>

                      <div
                        style={{
                          color:
                            "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        {
                          league.country
                        }
                      </div>

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
                      }}
                    >

                      {
                        match.status
                          ?.short
                      }

                      {match.status
                        ?.elapsed
                        ? ` ${match.status.elapsed}'`
                        : ""}

                    </div>

                  </div>

                  {/* Teams */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr auto 1fr",
                      alignItems:
                        "center",
                    }}
                  >

                    <Team
                      team={home}
                    />

                    <div
                      style={{
                        textAlign:
                          "center",
                      }}
                    >

                      <div
                        style={{
                          fontSize: 34,
                          fontWeight:
                            "bold",
                        }}
                      >
                        {
                          match.goals
                            ?.home
                        }
                        {" - "}
                        {
                          match.goals
                            ?.away
                        }
                      </div>

                      <div
                        style={{
                          color:
                            "#94a3b8",
                        }}
                      >
                        {
                          match.status
                            ?.long
                        }
                      </div>

                    </div>

                    <Team
                      team={away}
                      reverse
                    />

                  </div>

                  {/* Match Date */}

                  <div
                    style={{
                      marginTop: 20,
                      textAlign:
                        "center",
                      color:
                        "#94a3b8",
                    }}
                  >

                    {fixture.date
                      ? new Date(
                          fixture.date
                        ).toLocaleString()
                      : ""}

                  </div>

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
        alignItems: "center",
        gap: 10,
        flexDirection:
          reverse
            ? "row-reverse"
            : "row",
      }}
    >

      {team?.logo && (
        <Image
          src={team.logo}
          alt={
            team.name ||
            "Team"
          }
          width={45}
          height={45}
          unoptimized={true}
        />
      )}

      <strong>
        {team?.name ||
          "Unknown Team"}
      </strong>

    </div>
  );
}