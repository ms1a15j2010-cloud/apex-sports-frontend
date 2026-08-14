"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamFixtures({
  fixtures = [],
}) {
  if (
    !Array.isArray(fixtures) ||
    fixtures.length === 0
  ) {
    return null;
  }

  const upcomingFixtures =
    fixtures
      .filter((match) => {
        const status =
          match?.status ||
          match?.fixture?.status
            ?.short;

        return (
          status === "SCHEDULED" ||
          status === "TIMED" ||
          status === "NS"
        );
      })
      .sort(
        (a, b) =>
          new Date(
            a?.utcDate ||
              a?.fixture?.date ||
              0
          ) -
          new Date(
            b?.utcDate ||
              b?.fixture?.date ||
              0
          )
      );

  if (upcomingFixtures.length === 0) {
    return (
      <section
        id="fixtures"
        style={{
          background:
            "linear-gradient(145deg,#111827,#0f172a)",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
          border:
            "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin:
              "0 0 12px",
            fontSize: 28,
          }}
        >
          📅 Upcoming Fixtures
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          No upcoming fixtures are available.
        </p>
      </section>
    );
  }

  return (
    <section
      id="fixtures"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform:
              "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          📅 Upcoming Fixtures
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Scheduled matches for this
          team.
        </p>
      </div>

      {/* =================================================
          FIXTURES
      ================================================= */}

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {upcomingFixtures.map(
          (match, index) => {
            const matchId =
              match?.id ??
              match?.fixture?.id ??
              `fixture-${index}`;

            const competition =
              match?.competition ||
              match?.league ||
              {};

            const home =
              match?.homeTeam ||
              match?.teams?.home ||
              {};

            const away =
              match?.awayTeam ||
              match?.teams?.away ||
              {};

            const matchDate =
              match?.utcDate ||
              match?.fixture?.date ||
              null;

            const competitionLogo =
              competition?.emblem ||
              competition?.logo ||
              null;

            const homeLogo =
              home?.crest ||
              home?.logo ||
              null;

            const awayLogo =
              away?.crest ||
              away?.logo ||
              null;

            const competitionName =
              competition?.name ||
              "Premier League";

            const dateText =
              matchDate
                ? new Date(
                    matchDate
                  ).toLocaleDateString(
                    "en-US",
                    {
                      weekday:
                        "short",
                      day: "numeric",
                      month:
                        "short",
                      year:
                        "numeric",
                    }
                  )
                : "-";

            const timeText =
              matchDate
                ? new Date(
                    matchDate
                  ).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute:
                        "2-digit",
                    }
                  )
                : "-";

            const card = (
              <article
                style={{
                  background:
                    "#1f2937",
                  borderRadius:
                    18,
                  padding: 22,
                  border:
                    "1px solid #293548",
                  transition:
                    "transform .25s ease, box-shadow .25s ease",
                }}
                onMouseEnter={(
                  event
                ) => {
                  event.currentTarget.style.transform =
                    "translateY(-3px)";

                  event.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,.28)";
                }}
                onMouseLeave={(
                  event
                ) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";

                  event.currentTarget.style.boxShadow =
                    "none";
                }}
              >
                {/* Competition */}

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    gap: 15,
                    marginBottom:
                      20,
                    flexWrap:
                      "wrap",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 10,
                      minWidth:
                        0,
                    }}
                  >
                    {competitionLogo ? (
                      <Image
                        src={
                          competitionLogo
                        }
                        alt={
                          competitionName
                        }
                        width={28}
                        height={28}
                        unoptimized
                        style={{
                          objectFit:
                            "contain",
                          flexShrink:
                            0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius:
                            8,
                          background:
                            "#111827",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color:
                            "#22c55e",
                          fontSize:
                            10,
                          fontWeight:
                            900,
                        }}
                      >
                        PL
                      </div>
                    )}

                    <span
                      style={{
                        color:
                          "#cbd5e1",
                        fontSize:
                          13,
                        fontWeight:
                          700,
                        overflow:
                          "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {
                        competitionName
                      }
                    </span>
                  </div>

                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#fff",
                        fontSize:
                          13,
                        fontWeight:
                          700,
                      }}
                    >
                      {dateText}
                    </div>

                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize:
                          12,
                        marginTop:
                          3,
                      }}
                    >
                      {timeText}
                    </div>
                  </div>
                </div>

                {/* Match */}

                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems:
                      "center",
                    gap: 18,
                  }}
                >
                  {/* HOME */}

                  <TeamBlock
                    team={home}
                    align="left"
                  />

                  {/* VS */}

                  <div
                    style={{
                      textAlign:
                        "center",
                      minWidth: 85,
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#fff",
                        fontWeight:
                          900,
                        fontSize:
                          18,
                      }}
                    >
                      VS
                    </div>

                    <div
                      style={{
                        marginTop:
                          6,
                        color:
                          "#f59e0b",
                        fontSize:
                          11,
                        fontWeight:
                          800,
                        textTransform:
                          "uppercase",
                      }}
                    >
                      Upcoming
                    </div>
                  </div>

                  {/* AWAY */}

                  <TeamBlock
                    team={away}
                    align="right"
                  />
                </div>

                {/* Match details */}

                <div
                  style={{
                    marginTop:
                      20,
                    paddingTop:
                      15,
                    borderTop:
                      "1px solid #293548",
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    gap: 15,
                    flexWrap:
                      "wrap",
                    color:
                      "#94a3b8",
                    fontSize:
                      12,
                  }}
                >
                  <span>
                    📅 {dateText}
                  </span>

                  <span>
                    ⏰ {timeText}
                  </span>

                  {match?.venue?.name && (
                    <span>
                      🏟{" "}
                      {
                        match.venue
                          .name
                      }
                    </span>
                  )}
                </div>
              </article>
            );

            return matchId ? (
              <Link
                key={matchId}
                href={`/match/${matchId}`}
                style={{
                  color:
                    "inherit",
                  textDecoration:
                    "none",
                  display:
                    "block",
                }}
              >
                {card}
              </Link>
            ) : (
              <div key={index}>
                {card}
              </div>
            );
          }
        )}
      </div>

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color:
            "#64748b",
          fontSize: 12,
        }}
      >
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
TEAM BLOCK
===================================================== */

function TeamBlock({
  team = {},
  align = "left",
}) {
  const isRight =
    align === "right";

  const name =
    team?.name ||
    team?.shortName ||
    "Unknown Team";

  const logo =
    team?.crest ||
    team?.logo ||
    null;

  return (
    <div
      style={{
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          isRight
            ? "flex-end"
            : "flex-start",
        gap: 10,
        minWidth:
          0,
      }}
    >
      {!isRight &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={42}
            height={42}
            unoptimized
            style={{
              objectFit:
                "contain",
              flexShrink: 0,
            }}
          />
        ) : (
          <TeamFallback
            name={name}
          />
        ))}

      <strong
        style={{
          color: "#fff",
          fontSize: 14,
          lineHeight:
            1.35,
          textAlign:
            isRight
              ? "right"
              : "left",
          overflowWrap:
            "anywhere",
        }}
      >
        {name}
      </strong>

      {isRight &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={42}
            height={42}
            unoptimized
            style={{
              objectFit:
                "contain",
              flexShrink: 0,
            }}
          />
        ) : (
          <TeamFallback
            name={name}
          />
        ))}
    </div>
  );
}

/* =====================================================
TEAM FALLBACK
===================================================== */

function TeamFallback({
  name,
}) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        background:
          "#111827",
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        color:
          "#22c55e",
        fontSize: 11,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      {name
        ?.slice(0, 2)
        ?.toUpperCase() ||
        "FC"}
    </div>
  );
}