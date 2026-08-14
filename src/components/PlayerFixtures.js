"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerFixtures({
  fixtures = [],
}) {
  if (
    !Array.isArray(fixtures) ||
    fixtures.length === 0
  ) {
    return null;
  }

  return (
    <section
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
          marginBottom: 28,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing:
              "1.2px",
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
            fontSize: 26,
          }}
        >
          📅 Recent Fixtures
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Player matches from the
          current season.
        </p>
      </div>

      {/* =================================================
          FIXTURE LIST
      ================================================= */}

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {fixtures.map(
          (match, index) => {
            /*
              Support both:

              football-data.org
              and legacy API-Football structures.
            */

            const matchId =
              match?.id ??
              match?.fixture?.id ??
              `fixture-${index}`;

            const matchDate =
              match?.utcDate ??
              match?.fixture?.date ??
              null;

            const status =
              match?.status ??
              match?.fixture?.status
                ?.short ??
              "";

            const home =
              match?.homeTeam ??
              match?.teams?.home ??
              {};

            const away =
              match?.awayTeam ??
              match?.teams?.away ??
              {};

            const competition =
              match?.competition ??
              match?.league ??
              {};

            const area =
              match?.area || {};

            const fullTime =
              match?.score?.fullTime ||
              null;

            const legacyGoals =
              match?.goals ||
              null;

            const homeScore =
              fullTime?.home ??
              legacyGoals?.home ??
              null;

            const awayScore =
              fullTime?.away ??
              legacyGoals?.away ??
              null;

            const isFinished =
              status === "FINISHED" ||
              status === "FT" ||
              status === "AET" ||
              status === "PEN";

            const isScheduled =
              status ===
                "SCHEDULED" ||
              status === "TIMED" ||
              status === "NS";

            const dateText =
              matchDate
                ? new Date(
                    matchDate
                  ).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
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
                      minute: "2-digit",
                    }
                  )
                : "-";

            const homeName =
              home?.name ||
              home?.shortName ||
              "Home Team";

            const awayName =
              away?.name ||
              away?.shortName ||
              "Away Team";

            const homeLogo =
              home?.crest ||
              home?.logo ||
              null;

            const awayLogo =
              away?.crest ||
              away?.logo ||
              null;

            const leagueName =
              competition?.name ||
              "Premier League";

            const leagueLogo =
              competition?.emblem ||
              competition?.logo ||
              null;

            const venueName =
              match?.venue?.name ||
              match?.fixture?.venue
                ?.name ||
              null;

            const matchHref =
              match?.id
                ? `/match/${match.id}`
                : match?.fixture?.id
                ? `/match/${match.fixture.id}`
                : null;

            const card = (
              <article
                style={{
                  background:
                    "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  border:
                    "1px solid #293548",
                  transition:
                    "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-3px)";

                  event.currentTarget.style.boxShadow =
                    "0 14px 28px rgba(0,0,0,.30)";

                  event.currentTarget.style.borderColor =
                    "#374151";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";

                  event.currentTarget.style.boxShadow =
                    "none";

                  event.currentTarget.style.borderColor =
                    "#293548";
                }}
              >
                {/* =====================================
                    COMPETITION / DATE
                ===================================== */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    gap: 15,
                    marginBottom: 22,
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
                      minWidth: 0,
                    }}
                  >
                    {leagueLogo ? (
                      <Image
                        src={
                          leagueLogo
                        }
                        alt={
                          leagueName
                        }
                        width={30}
                        height={30}
                        unoptimized
                        style={{
                          objectFit:
                            "contain",
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
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
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        PL
                      </div>
                    )}

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          color:
                            "#fff",
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
                        {leagueName}
                      </div>

                      <div
                        style={{
                          color:
                            "#64748b",
                          fontSize: 12,
                          marginTop: 3,
                        }}
                      >
                        {area?.name ||
                          "England"}
                      </div>
                    </div>
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
                          "#cbd5e1",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {dateText}
                    </div>

                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize: 12,
                        marginTop: 3,
                      }}
                    >
                      {timeText}
                    </div>
                  </div>
                </div>

                {/* =====================================
                    MATCH
                ===================================== */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems:
                      "center",
                    gap: 18,
                  }}
                >
                  {/* HOME */}

                  <TeamBlock
                    name={homeName}
                    logo={homeLogo}
                    align="left"
                  />

                  {/* SCORE / STATUS */}

                  <div
                    style={{
                      textAlign:
                        "center",
                      minWidth: 90,
                    }}
                  >
                    {isFinished ? (
                      <>
                        <div
                          style={{
                            color:
                              "#fff",
                            fontSize: 26,
                            fontWeight:
                              800,
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {homeScore ??
                            "-"}
                          <span
                            style={{
                              color:
                                "#64748b",
                              margin:
                                "0 7px",
                            }}
                          >
                            -
                          </span>
                          {awayScore ??
                            "-"}
                        </div>

                        <div
                          style={{
                            marginTop: 6,
                            color:
                              "#22c55e",
                            fontSize: 11,
                            fontWeight:
                              800,
                            textTransform:
                              "uppercase",
                            letterSpacing:
                              ".6px",
                          }}
                        >
                          {status ===
                          "PEN"
                            ? "Penalties"
                            : status ===
                              "AET"
                            ? "After Extra Time"
                            : "Full Time"}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            color:
                              "#fff",
                            fontSize: 18,
                            fontWeight:
                              800,
                          }}
                        >
                          VS
                        </div>

                        <div
                          style={{
                            marginTop: 6,
                            color:
                              isScheduled
                                ? "#f59e0b"
                                : "#94a3b8",
                            fontSize: 11,
                            fontWeight:
                              800,
                            textTransform:
                              "uppercase",
                          }}
                        >
                          {isScheduled
                            ? "Upcoming"
                            : status ||
                              "Scheduled"}
                        </div>
                      </>
                    )}
                  </div>

                  {/* AWAY */}

                  <TeamBlock
                    name={awayName}
                    logo={awayLogo}
                    align="right"
                  />
                </div>

                {/* =====================================
                    VENUE
                ===================================== */}

                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
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
                    fontSize: 12,
                  }}
                >
                  <span>
                    🏟{" "}
                    {venueName ||
                      "Venue unavailable"}
                  </span>

                  <span>
                    ⏰ {timeText}
                  </span>
                </div>
              </article>
            );

            if (!matchHref) {
              return (
                <div
                  key={matchId}
                >
                  {card}
                </div>
              );
            }

            return (
              <Link
                key={matchId}
                href={matchHref}
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
            );
          }
        )}
      </div>
    </section>
  );
}

/* =====================================================
TEAM BLOCK
===================================================== */

function TeamBlock({
  name,
  logo,
  align,
}) {
  const isRight =
    align === "right";

  return (
    <div
      style={{
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          isRight
            ? "flex-end"
            : "flex-start",
        gap: 12,
        minWidth: 0,
      }}
    >
      {!isRight &&
        (logo ? (
          <Image
            src={logo}
            alt={name}
            width={46}
            height={46}
            unoptimized
            style={{
              width: 46,
              height: 46,
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
          fontSize: 15,
          lineHeight: 1.35,
          textAlign: isRight
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
            width={46}
            height={46}
            unoptimized
            style={{
              width: 46,
              height: 46,
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
        width: 46,
        height: 46,
        borderRadius: 10,
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#22c55e",
        fontWeight: 800,
        fontSize: 14,
        flexShrink: 0,
      }}
    >
      {name
        ?.slice(0, 2)
        ?.toUpperCase() || "FC"}
    </div>
  );
}