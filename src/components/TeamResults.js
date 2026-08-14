"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamResults({
  results = [],
}) {
  const matches = Array.isArray(results)
    ? results
        .filter((match) => {
          const status = match?.status;

          return (
            status === "FINISHED" ||
            status === "AWARDED" ||
            status === "FT"
          );
        })
        .sort(
          (a, b) =>
            new Date(
              b?.utcDate ||
                b?.fixture?.date ||
                0
            ) -
            new Date(
              a?.utcDate ||
                a?.fixture?.date ||
                0
            )
        )
        .slice(0, 10)
    : [];

  return (
    <section
      id="results"
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
            textTransform: "uppercase",
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
          🏁 Latest Results
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          The team's most recent completed
          matches.
        </p>
      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {matches.length === 0 ? (
        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 40,
            textAlign: "center",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 14,
            }}
          >
            🏁
          </div>

          <h3
            style={{
              color: "#fff",
              margin: "0 0 8px",
            }}
          >
            No Results Available
          </h3>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: 14,
            }}
          >
            No completed team results are
            available from the current data
            source.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {matches.map(
            (match, index) => {
              const matchId =
                match?.id ??
                match?.fixture?.id ??
                null;

              const home =
                match?.homeTeam ||
                match?.teams?.home ||
                {};

              const away =
                match?.awayTeam ||
                match?.teams?.away ||
                {};

              const score =
                match?.score?.fullTime ||
                {};

              const homeGoals =
                score?.home ??
                match?.goals?.home ??
                0;

              const awayGoals =
                score?.away ??
                match?.goals?.away ??
                0;

              const competition =
                match?.competition ||
                match?.league ||
                {};

              const matchDate =
                match?.utcDate ||
                match?.fixture?.date ||
                null;

              const venue =
                match?.venue ||
                match?.fixture?.venue ||
                {};

              const competitionName =
                competition?.name ||
                "Premier League";

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

              const dateText = matchDate
                ? new Date(
                    matchDate
                  ).toLocaleString(
                    "en-US",
                    {
                      weekday:
                        "short",
                      day: "numeric",
                      month:
                        "short",
                      year:
                        "numeric",
                      hour:
                        "numeric",
                      minute:
                        "2-digit",
                    }
                  )
                : "Unknown Date";

              const resultText =
                homeGoals > awayGoals
                  ? "Home Win"
                  : homeGoals < awayGoals
                  ? "Away Win"
                  : "Draw";

              const resultColor =
                homeGoals === awayGoals
                  ? "#facc15"
                  : "#22c55e";

              const card = (
                <article
                  style={{
                    background:
                      "#1f2937",
                    borderRadius: 18,
                    padding: 20,
                    border:
                      "1px solid #293548",
                    transition:
                      "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform =
                      "translateY(-3px)";

                    event.currentTarget.style.boxShadow =
                      "0 10px 24px rgba(0,0,0,.30)";

                    event.currentTarget.style.borderColor =
                      "#22c55e";
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
                  {/* =================================================
                      DATE / COMPETITION
                  ================================================= */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: 15,
                      flexWrap: "wrap",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 10,
                        minWidth: 0,
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
                          width={26}
                          height={26}
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
                            width: 26,
                            height: 26,
                            borderRadius: 7,
                            background:
                              "#111827",
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            color:
                              "#22c55e",
                            fontSize: 10,
                            fontWeight: 900,
                          }}
                        >
                          PL
                        </div>
                      )}

                      <span
                        style={{
                          color:
                            "#cbd5e1",
                          fontSize: 13,
                          fontWeight: 700,
                          overflow: "hidden",
                          textOverflow:
                            "ellipsis",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {competitionName}
                      </span>
                    </div>

                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize: 12,
                      }}
                    >
                      {dateText}
                    </div>
                  </div>

                  {/* =================================================
                      TEAMS / SCORE
                  ================================================= */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr auto 1fr",
                      alignItems: "center",
                      gap: 18,
                    }}
                  >
                    {/* HOME */}

                    <TeamBlock
                      team={home}
                      align="left"
                    />

                    {/* SCORE */}

                    <div
                      style={{
                        textAlign: "center",
                        minWidth: 95,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 900,
                          color: "#22c55e",
                        }}
                      >
                        {homeGoals}
                        {" - "}
                        {awayGoals}
                      </div>

                      <div
                        style={{
                          marginTop: 6,
                          display:
                            "inline-block",
                          padding:
                            "4px 10px",
                          borderRadius: 999,
                          background:
                            "#111827",
                          color:
                            resultColor,
                          fontSize: 11,
                          fontWeight: 800,
                          textTransform:
                            "uppercase",
                        }}
                      >
                        {resultText}
                      </div>
                    </div>

                    {/* AWAY */}

                    <TeamBlock
                      team={away}
                      align="right"
                    />
                  </div>

                  {/* =================================================
                      MATCH DETAILS
                  ================================================= */}

                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 15,
                      borderTop:
                        "1px solid #293548",
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      gap: 12,
                      flexWrap: "wrap",
                      color:
                        "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    <span>
                      📍{" "}
                      {venue?.name ||
                        "Venue unavailable"}
                    </span>

                    {match?.stage && (
                      <span>
                        🏆{" "}
                        {match.stage}
                      </span>
                    )}
                  </div>
                </article>
              );

              if (!matchId) {
                return (
                  <div
                    key={
                      `result-${index}`
                    }
                  >
                    {card}
                  </div>
                );
              }

              return (
                <Link
                  key={matchId}
                  href={`/match/${matchId}`}
                  style={{
                    color: "inherit",
                    textDecoration:
                      "none",
                    display: "block",
                  }}
                >
                  {card}
                </Link>
              );
            }
          )}
        </div>
      )}

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
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
        display: "flex",
        alignItems: "center",
        justifyContent:
          isRight
            ? "flex-end"
            : "flex-start",
        gap: 10,
        minWidth: 0,
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
          lineHeight: 1.35,
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
        display: "flex",
        alignItems: "center",
        justifyContent:
          "center",
        color: "#22c55e",
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