export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";


/* =====================================================
API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";


/* =====================================================
CONFIG
===================================================== */

const LEAGUE =
  "epl";

const SEASON =
  2026;


/* =====================================================
GET TOP ASSISTS

Migrated backend endpoint:

/api/league/epl/topassists
===================================================== */

async function getTopAssists() {
  const url =
    `${API}/api/league/${LEAGUE}/topassists` +
    `?season=${SEASON}` +
    `&page=1` +
    `&limit=20`;

  console.log(
    "🌐 Top assists page request:",
    url
  );

  try {
    const response =
      await fetch(
        url,
        {
          cache:
            "no-store",
        }
      );

    console.log(
      "📡 Top assists API status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Backend returned ${response.status}`
      );
    }

    const data =
      await response.json();

    console.log(
      "📊 Top assists response:",
      {
        success:
          data?.success,

        season:
          data?.season,

        total:
          data?.total,

        count:
          data?.count,

        source:
          data?.source,
      }
    );

    if (
      !data ||
      data.success !== true ||
      !Array.isArray(
        data.players
      )
    ) {
      return {
        success: false,

        players: [],

        season:
          data?.season ||
          SEASON,

        message:
          data?.message ||
          "No assist data available.",
      };
    }

    return {
      ...data,

      players:
        data.players,
    };
  } catch (error) {
    console.error(
      "❌ Failed to load top assists:",
      error
    );

    return {
      success: false,

      players: [],

      season:
        SEASON,

      message:
        error?.message ||
        "Unable to load top assists.",
    };
  }
}


/* =====================================================
METADATA
===================================================== */

export const metadata = {
  title:
    "Top Assists | Apex Sports",

  description:
    "Top football assist providers from the Premier League.",
};


/* =====================================================
PAGE
===================================================== */

export default async function TopAssistsPage() {
  const data =
    await getTopAssists();

  const players =
    data.success &&
    Array.isArray(
      data.players
    )
      ? data.players
      : [];


  return (
    <main
      style={{
        maxWidth:
          "1200px",

        margin:
          "40px auto",

        padding:
          "20px",

        color:
          "white",
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <header
        style={{
          marginBottom:
            30,
        }}
      >
        <div
          style={{
            color:
              "#22c55e",

            fontSize:
              12,

            fontWeight:
              800,

            letterSpacing:
              "1.2px",

            textTransform:
              "uppercase",

            marginBottom:
              8,
          }}
        >
          ⚡ Apex Sports
        </div>

        <h1
          style={{
            margin:
              0,

            fontSize:
              "clamp(28px, 5vw, 44px)",

            fontWeight:
              800,
          }}
        >
          🎯 Top Assists
        </h1>

        <p
          style={{
            color:
              "#94a3b8",

            margin:
              "10px 0 0",

            fontSize:
              15,
          }}
        >
          Premier League assist
          leaders for the{" "}
          {data?.season ||
            SEASON}
          /
          {String(
            (data?.season ||
              SEASON) + 1
          ).slice(-2)}{" "}
          season.
        </p>

        <div
          style={{
            display:
              "inline-flex",

            marginTop:
              14,

            padding:
              "7px 12px",

            borderRadius:
              999,

            background:
              "rgba(34,197,94,.10)",

            border:
              "1px solid rgba(34,197,94,.25)",

            color:
              "#22c55e",

            fontSize:
              12,

            fontWeight:
              700,
          }}
        >
          Source:
          football-data.org
        </div>
      </header>


      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {players.length === 0 ? (
        <div
          style={{
            background:
              "#111827",

            border:
              "1px solid #1f2937",

            padding:
              "50px 30px",

            borderRadius:
              20,

            textAlign:
              "center",
          }}
        >
          <div
            style={{
              fontSize:
                48,

              marginBottom:
                15,
            }}
          >
            🎯
          </div>

          <h2
            style={{
              margin:
                "0 0 10px",
            }}
          >
            No Assist Data Available
          </h2>

          <p
            style={{
              color:
                "#94a3b8",

              margin:
                0,
            }}
          >
            {data?.message ||
              `No Premier League assist data is currently available for the ${data?.season || SEASON} season.`}
          </p>
        </div>
      ) : (

        /* =================================================
           PLAYER LIST
        ================================================= */

        <div
          style={{
            display:
              "grid",

            gap:
              16,
          }}
        >
          {players.map(
            (
              player,
              index
            ) => {
              const playerData =
                player?.player ||
                {};

              const statistics =
                Array.isArray(
                  player?.statistics
                ) &&
                player.statistics
                  .length > 0
                  ? player.statistics[0]
                  : {};

              const team =
                statistics?.team ||
                {};

              const goals =
                statistics
                  ?.goals ||
                {};

              const games =
                statistics
                  ?.games ||
                {};

              const playerId =
                playerData?.id ??
                `player-${index}`;

              const playerName =
                playerData?.name ||
                "Unknown Player";

              const teamName =
                team?.name ||
                "Unknown Team";

              const assists =
                Number(
                  goals?.assists
                ) || 0;

              const totalGoals =
                Number(
                  goals?.total
                ) || 0;

              const appearances =
                Number(
                  games?.appearences ??
                    games?.appearances
                ) || 0;

              const minutes =
                Number(
                  games?.minutes
                ) || 0;

              return (
                <Link
                  key={`${playerId}-${index}`}
                  href={`/player/${playerId}`}
                  style={{
                    textDecoration:
                      "none",

                    color:
                      "inherit",
                  }}
                >
                  <article
                    style={{
                      background:
                        "linear-gradient(145deg,#111827,#0b1220)",

                      border:
                        "1px solid #1f2937",

                      borderRadius:
                        18,

                      padding:
                        20,

                      display:
                        "grid",

                      gridTemplateColumns:
                        "60px minmax(260px,1.5fr) minmax(180px,1fr) repeat(4,90px)",

                      gap:
                        18,

                      alignItems:
                        "center",
                    }}
                  >

                    {/* =================================
                        RANK
                    ================================= */}

                    <div
                      style={{
                        width:
                          48,

                        height:
                          48,

                        borderRadius:
                          14,

                        background:
                          index === 0
                            ? "rgba(250,204,21,.15)"
                            : index === 1
                            ? "rgba(148,163,184,.15)"
                            : index === 2
                            ? "rgba(249,115,22,.15)"
                            : "#1e293b",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        color:
                          index === 0
                            ? "#facc15"
                            : index === 1
                            ? "#cbd5e1"
                            : index === 2
                            ? "#fb923c"
                            : "#22c55e",

                        fontWeight:
                          800,

                        fontSize:
                          16,
                      }}
                    >
                      #{index + 1}
                    </div>


                    {/* =================================
                        PLAYER
                    ================================= */}

                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap:
                          16,

                        minWidth:
                          0,
                      }}
                    >
                      <PlayerAvatar
                        src={
                          playerData?.photo
                        }

                        name={
                          playerName
                        }
                      />

                      <div
                        style={{
                          minWidth:
                            0,
                        }}
                      >
                        <h2
                          style={{
                            margin:
                              0,

                            fontSize:
                              18,

                            fontWeight:
                              700,

                            color:
                              "#fff",

                            overflow:
                              "hidden",

                            textOverflow:
                              "ellipsis",

                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {playerName}
                        </h2>

                        <p
                          style={{
                            margin:
                              "5px 0 0",

                            color:
                              "#94a3b8",

                            fontSize:
                              12,
                          }}
                        >
                          {playerData?.nationality ||
                            "Football Player"}
                        </p>
                      </div>
                    </div>


                    {/* =================================
                        TEAM
                    ================================= */}

                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        gap:
                          10,

                        minWidth:
                          0,
                      }}
                    >
                      <TeamAvatar
                        src={
                          team?.logo
                        }

                        name={
                          teamName
                        }
                      />

                      <strong
                        style={{
                          color:
                            "#e2e8f0",

                          fontSize:
                            14,

                          overflow:
                            "hidden",

                          textOverflow:
                            "ellipsis",

                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {teamName}
                      </strong>
                    </div>


                    {/* =================================
                        ASSISTS
                    ================================= */}

                    <StatBox
                      value={
                        assists
                      }

                      label="Assists"

                      primary
                    />


                    {/* =================================
                        GOALS
                    ================================= */}

                    <StatBox
                      value={
                        totalGoals
                      }

                      label="Goals"
                    />


                    {/* =================================
                        APPEARANCES
                    ================================= */}

                    <StatBox
                      value={
                        appearances
                      }

                      label="Matches"
                    />


                    {/* =================================
                        MINUTES
                    ================================= */}

                    <StatBox
                      value={
                        minutes ||
                        "-"
                      }

                      label="Minutes"
                    />
                  </article>
                </Link>
              );
            }
          )}
        </div>
      )}
    </main>
  );
}


/* =====================================================
PLAYER AVATAR
===================================================== */

function PlayerAvatar({
  src,
  name,
}) {
  const initials =
    String(
      name || "P"
    )
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (part) =>
          part
            .charAt(0)
            .toUpperCase()
      )
      .join("");

  return (
    <div
      style={{
        width:
          64,

        height:
          64,

        minWidth:
          64,

        borderRadius:
          "50%",

        overflow:
          "hidden",

        background:
          "linear-gradient(145deg,#1e293b,#334155)",

        border:
          "1px solid #475569",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",
      }}
    >
      {src ? (
        <Image
          src={
            src
          }

          alt={
            name ||
            "Player"
          }

          width={
            64
          }

          height={
            64
          }

          unoptimized

          style={{
            width:
              "100%",

            height:
              "100%",

            objectFit:
              "cover",
          }}
        />
      ) : (
        <span
          style={{
            color:
              "#22c55e",

            fontSize:
              20,

            fontWeight:
              800,
          }}
        >
          {initials ||
            "P"}
        </span>
      )}
    </div>
  );
}


/* =====================================================
TEAM AVATAR
===================================================== */

function TeamAvatar({
  src,
  name,
}) {
  return (
    <div
      style={{
        width:
          44,

        height:
          44,

        minWidth:
          44,

        borderRadius:
          10,

        background:
          "#111827",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",
      }}
    >
      {src ? (
        <Image
          src={
            src
          }

          alt={
            name ||
            "Team"
          }

          width={
            36
          }

          height={
            36
          }

          unoptimized

          style={{
            objectFit:
              "contain",
          }}
        />
      ) : (
        <span
          style={{
            color:
              "#64748b",

            fontSize:
              11,

            fontWeight:
              800,
          }}
        >
          FC
        </span>
      )}
    </div>
  );
}


/* =====================================================
STAT BOX
===================================================== */

function StatBox({
  value,
  label,
  primary = false,
}) {
  return (
    <div
      style={{
        textAlign:
          "center",
      }}
    >
      <div
        style={{
          color:
            primary
              ? "#22c55e"
              : "#fff",

          fontSize:
            primary
              ? 27
              : 21,

          fontWeight:
            800,

          lineHeight:
            1,

          marginBottom:
            6,
        }}
      >
        {value}
      </div>

      <small
        style={{
          color:
            "#94a3b8",

          fontSize:
            11,
        }}
      >
        {label}
      </small>
    </div>
  );
}