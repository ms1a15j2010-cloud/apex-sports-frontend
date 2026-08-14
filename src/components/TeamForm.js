"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamForm({
  fixtures = [],
  teamId,
}) {
  if (
    !Array.isArray(fixtures) ||
    fixtures.length === 0
  ) {
    return null;
  }

  /* =================================================
     COMPLETED MATCHES
  ================================================= */

  const completedMatches =
    fixtures
      .filter((match) => {
        const status =
          match?.status ||
          match?.fixture?.status
            ?.short;

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
      );

  /* =================================================
     LAST 10 MATCHES
  ================================================= */

  const lastMatches =
    completedMatches.slice(
      0,
      10
    );

  if (lastMatches.length === 0) {
    return null;
  }

  /* =================================================
     BUILD FORM
  ================================================= */

  const form = lastMatches.map(
    (match) => {
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
        null;

      const awayGoals =
        score?.away ??
        match?.goals?.away ??
        null;

      const isHome =
        Number(home?.id) ===
        Number(teamId);

      const goalsFor =
        isHome
          ? homeGoals
          : awayGoals;

      const goalsAgainst =
        isHome
          ? awayGoals
          : homeGoals;

      if (
        goalsFor === null ||
        goalsAgainst === null
      ) {
        return "D";
      }

      if (
        goalsFor >
        goalsAgainst
      ) {
        return "W";
      }

      if (
        goalsFor <
        goalsAgainst
      ) {
        return "L";
      }

      return "D";
    }
  );

  const wins =
    form.filter(
      (result) => result === "W"
    ).length;

  const draws =
    form.filter(
      (result) => result === "D"
    ).length;

  const losses =
    form.filter(
      (result) => result === "L"
    ).length;

  /* =================================================
     RENDER
  ================================================= */

  return (
    <section
      id="form"
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
          📈 Recent Form
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Latest completed matches
          from the current season.
        </p>
      </div>

      {/* =================================================
          FORM BADGES
      ================================================= */}

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 25,
        }}
      >
        {form.map(
          (result, index) => (
            <div
              key={`${result}-${index}`}
              style={{
                width: 46,
                height: 46,
                borderRadius:
                  "50%",
                display: "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                fontWeight:
                  900,
                fontSize: 18,
                color: "#fff",
                background:
                  result === "W"
                    ? "#22c55e"
                    : result === "D"
                    ? "#eab308"
                    : "#ef4444",
                boxShadow:
                  "0 5px 14px rgba(0,0,0,.2)",
              }}
            >
              {result}
            </div>
          )
        )}
      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 18,
          marginBottom: 30,
        }}
      >
        <SummaryCard
          title="Wins"
          value={wins}
          color="#22c55e"
        />

        <SummaryCard
          title="Draws"
          value={draws}
          color="#facc15"
        />

        <SummaryCard
          title="Losses"
          value={losses}
          color="#ef4444"
        />

        <SummaryCard
          title="Matches"
          value={
            lastMatches.length
          }
          color="#3b82f6"
        />
      </div>

      {/* =================================================
          MATCH LIST
      ================================================= */}

      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {lastMatches.map(
          (match, index) => {
            const matchId =
              match?.id ??
              match?.fixture?.id ??
              index;

            const home =
              match?.homeTeam ||
              match?.teams?.home ||
              {};

            const away =
              match?.awayTeam ||
              match?.teams?.away ||
              {};

            const score =
              match?.score
                ?.fullTime ||
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

            const result =
              form[index] ||
              "D";

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
                    gap: 10,
                    marginBottom:
                      18,
                  }}
                >
                  {competition?.emblem ? (
                    <Image
                      src={
                        competition.emblem
                      }
                      alt={
                        competition.name ||
                        "Competition"
                      }
                      width={26}
                      height={26}
                      unoptimized
                      style={{
                        objectFit:
                          "contain",
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
                        display:
                          "flex",
                        justifyContent:
                          "center",
                        alignItems:
                          "center",
                        color:
                          "#22c55e",
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      PL
                    </div>
                  )}

                  <span
                    style={{
                      color:
                        "#94a3b8",
                      fontSize: 13,
                      fontWeight:
                        600,
                    }}
                  >
                    {competition?.name ||
                      "Premier League"}
                  </span>
                </div>

                {/* Teams */}

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

                  {/* SCORE */}

                  <div
                    style={{
                      textAlign:
                        "center",
                      minWidth: 90,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 23,
                        color:
                          "#fff",
                      }}
                    >
                      {homeGoals}
                      {" - "}
                      {awayGoals}
                    </div>

                    <div
                      style={{
                        marginTop:
                          6,
                        color:
                          result ===
                          "W"
                            ? "#22c55e"
                            : result ===
                              "L"
                            ? "#ef4444"
                            : "#facc15",
                        fontSize: 12,
                        fontWeight:
                          800,
                        textTransform:
                          "uppercase",
                      }}
                    >
                      {result}
                    </div>

                    {matchDate && (
                      <div
                        style={{
                          color:
                            "#64748b",
                          marginTop:
                            6,
                          fontSize: 12,
                        }}
                      >
                        {new Date(
                          matchDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month:
                              "short",
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* AWAY */}

                  <TeamBlock
                    team={away}
                    align="right"
                  />
                </div>
              </article>
            );

            if (!matchId) {
              return (
                <div
                  key={index}
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
        alignItems:
          "center",
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
            width={38}
            height={38}
            unoptimized
            style={{
              objectFit:
                "contain",
              flexShrink: 0,
            }}
          />
        ) : (
          <LogoFallback
            name={name}
          />
        ))}

      <strong
        style={{
          color: "#fff",
          fontSize: 14,
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
            width={38}
            height={38}
            unoptimized
            style={{
              objectFit:
                "contain",
              flexShrink: 0,
            }}
          />
        ) : (
          <LogoFallback
            name={name}
          />
        ))}
    </div>
  );
}

/* =====================================================
FALLBACK LOGO
===================================================== */

function LogoFallback({
  name,
}) {
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 9,
        background:
          "#111827",
        display: "flex",
        alignItems:
          "center",
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

/* =====================================================
SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign: "center",
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 10,
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontWeight: 900,
          fontSize: 30,
        }}
      >
        {value}
      </div>
    </div>
  );
}