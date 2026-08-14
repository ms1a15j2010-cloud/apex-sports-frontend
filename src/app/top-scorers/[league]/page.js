import Image from "next/image";
import Link from "next/link";

/* =====================================================
LEAGUE CONFIG
===================================================== */

const LEAGUE_CONFIG = {
  epl: {
    name: "Premier League",
    country: "England",
    code: "PL",
    season: 2026,
  },

  laliga: {
    name: "La Liga",
    country: "Spain",
    code: "PD",
    season: 2025,
  },

  "la-liga": {
    name: "La Liga",
    country: "Spain",
    code: "PD",
    season: 2025,
  },

  bundesliga: {
    name: "Bundesliga",
    country: "Germany",
    code: "BL1",
    season: 2025,
  },

  seriea: {
    name: "Serie A",
    country: "Italy",
    code: "SA",
    season: 2025,
  },

  "serie-a": {
    name: "Serie A",
    country: "Italy",
    code: "SA",
    season: 2025,
  },

  ligue1: {
    name: "Ligue 1",
    country: "France",
    code: "FL1",
    season: 2025,
  },

  "ligue-1": {
    name: "Ligue 1",
    country: "France",
    code: "FL1",
    season: 2025,
  },

  primeiraliga: {
    name: "Primeira Liga",
    country: "Portugal",
    code: "PPL",
    season: 2025,
  },

  "primeira-liga": {
    name: "Primeira Liga",
    country: "Portugal",
    code: "PPL",
    season: 2025,
  },
};


/* =====================================================
API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";


/* =====================================================
GET TOP SCORERS

Migrated backend endpoint:

/api/league/epl/topscorers
===================================================== */

async function getTopScorers(league) {
  const slug =
    String(league || "")
      .trim()
      .toLowerCase();

  const config =
    LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      success: false,

      season: null,

      league: null,

      count: 0,

      players: [],

      message:
        "Unsupported league",
    };
  }

  const url =
    `${API}/api/league/${slug}/topscorers` +
    `?season=${config.season}` +
    `&page=1` +
    `&limit=20`;

  console.log(
    "🌐 Top scorers request:",
    url
  );

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      15000
    );

  try {
    const response =
      await fetch(
        url,
        {
          cache:
            "no-store",

          signal:
            controller.signal,
        }
      );

    console.log(
      "📡 Top scorers API status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Backend error: ${response.status}`
      );
    }

    const data =
      await response.json();

    console.log(
      "📊 Top scorers response:",
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

        season:
          data?.season ||
          config.season,

        league:
          data?.league ||
          config.code,

        count: 0,

        players: [],

        message:
          data?.message ||
          "No top scorers available",
      };
    }

    return {
      ...data,

      season:
        data.season ||
        config.season,

      league:
        data.league ||
        config.code,

      players:
        data.players,
    };
  } catch (error) {
    console.error(
      "❌ Top scorers fetch error:",
      error
    );

    return {
      success: false,

      season:
        config.season,

      league:
        config.code,

      count: 0,

      players: [],

      message:
        error?.name ===
        "AbortError"
          ? "Top scorers request timed out"
          : error?.message ||
            "Unable to connect to backend",
    };
  } finally {
    clearTimeout(
      timeout
    );
  }
}


/* =====================================================
SAFE NUMBER
===================================================== */

function safeNumber(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : 0;
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
        width: 64,

        height: 64,

        minWidth: 64,

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
          src={src}
          alt={
            name ||
            "Player"
          }
          width={64}
          height={64}
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
        width: 44,

        height: 44,

        minWidth: 44,

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
          src={src}
          alt={
            name ||
            "Team"
          }
          width={36}
          height={36}
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
SEO
===================================================== */

export async function generateMetadata({
  params,
}) {
  const {
    league,
  } =
    await params;

  const slug =
    String(
      league || ""
    )
      .trim()
      .toLowerCase();

  const config =
    LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      title:
        "Top Scorers | Apex Sports",

      description:
        "Football top scorers",
    };
  }

  return {
    title:
      `${config.name} Top Scorers | Apex Sports`,

    description:
      `Top scorers for ${config.name} in the ${config.season} season.`,
  };
}


/* =====================================================
PAGE
===================================================== */

export default async function TopScorersPage({
  params,
}) {
  const {
    league,
  } =
    await params;

  const slug =
    String(
      league || ""
    )
      .trim()
      .toLowerCase();

  const config =
    LEAGUE_CONFIG[slug];

  /* =================================================
     UNSUPPORTED LEAGUE
  ================================================= */

  if (!config) {
    return (
      <main
        style={{
          maxWidth:
            1200,

          margin:
            "40px auto",

          padding:
            20,

          color:
            "#fff",
        }}
      >
        <section
          style={{
            background:
              "#111827",

            border:
              "1px solid #1e293b",

            borderRadius:
              18,

            padding:
              40,

            textAlign:
              "center",
          }}
        >
          <div
            style={{
              fontSize:
                46,

              marginBottom:
                15,
            }}
          >
            ⚽
          </div>

          <h1>
            League Not Found
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
            }}
          >
            The requested league
            is not supported.
          </p>

          <Link
            href="/leagues"
            style={{
              display:
                "inline-block",

              marginTop:
                20,

              color:
                "#22c55e",

              textDecoration:
                "none",

              fontWeight:
                700,
            }}
          >
            ← Back to Leagues
          </Link>
        </section>
      </main>
    );
  }


  /* =================================================
     LOAD DATA
  ================================================= */

  const data =
    await getTopScorers(
      slug
    );

  const players =
    Array.isArray(
      data?.players
    )
      ? data.players
      : [];


  /* =================================================
     EMPTY STATE
  ================================================= */

  if (
    !data?.success ||
    players.length === 0
  ) {
    return (
      <main
        style={{
          maxWidth:
            1200,

          margin:
            "40px auto",

          padding:
            20,

          color:
            "#fff",
        }}
      >
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
            {config.name} Top
            Scorers
          </h1>

          <p
            style={{
              color:
                "#9ca3af",

              margin:
                "10px 0 0",
            }}
          >
            Season{" "}
            {data?.season ||
              config.season}
          </p>
        </header>

        <section
          style={{
            background:
              "linear-gradient(145deg,#111827,#0b1220)",

            border:
              "1px solid #1f2937",

            borderRadius:
              20,

            padding:
              "55px 25px",

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
            ⚽
          </div>

          <h2
            style={{
              margin:
                "0 0 10px",
            }}
          >
            No top scorers
            available
          </h2>

          <p
            style={{
              margin:
                0,

              color:
                "#94a3b8",
            }}
          >
            {data?.message ||
              "No top scorer data is currently available."}
          </p>
        </section>
      </main>
    );
  }


  /* =================================================
     PAGE
  ================================================= */

  return (
    <main
      style={{
        maxWidth:
          1200,

        margin:
          "40px auto",

        padding:
          20,

        color:
          "#fff",
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
          {config.name} Top
          Scorers
        </h1>

        <p
          style={{
            margin:
              "10px 0 0",

            color:
              "#9ca3af",

            fontSize:
              15,
          }}
        >
          Leading goalscorers
          for {config.name}{" "}
          {data?.season ||
            config.season}{" "}
          season.
        </p>
      </header>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <section
        style={{
          background:
            "linear-gradient(145deg,#111827,#0b1220)",

          border:
            "1px solid #1f2937",

          borderRadius:
            20,

          padding:
            22,

          marginBottom:
            24,

          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",

          gap:
            16,
        }}
      >
        <SummaryCard
          label="Competition"
          value={
            config.name
          }
        />

        <SummaryCard
          label="Season"
          value={
            data?.season ||
            config.season
          }
        />

        <SummaryCard
          label="Players"
          value={
            data?.total ??
            data?.count ??
            players.length
          }
        />

        <SummaryCard
          label="Data Source"
          value={
            "Football-data.org"
          }
        />
      </section>


      {/* =================================================
          PLAYER LIST
      ================================================= */}

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
            scorer,
            index
          ) => {
            const statistics =
              Array.isArray(
                scorer?.statistics
              ) &&
              scorer.statistics
                .length > 0
                ? scorer.statistics[0]
                : {};

            const playerData =
              scorer?.player ||
              {};

            const playerId =
              playerData?.id ??
              scorer?.id ??
              `player-${index}`;

            const playerName =
              playerData?.name ||
              "Unknown Player";

            const playerPhoto =
              playerData?.photo ||
              null;

            const team =
              statistics?.team ||
              scorer?.team ||
              {};

            const teamName =
              team?.name ||
              "Unknown Team";

            const teamLogo =
              team?.logo ||
              team?.crest ||
              null;

            const goals =
              safeNumber(
                statistics
                  ?.goals
                  ?.total ??
                scorer?.goals
              );

            const assists =
              safeNumber(
                statistics
                  ?.goals
                  ?.assists ??
                scorer?.assists
              );

            const appearances =
              safeNumber(
                statistics
                  ?.games
                  ?.appearences ??
                statistics
                  ?.games
                  ?.appearances ??
                scorer?.appearances
              );

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
                      "55px minmax(240px,1.5fr) minmax(180px,1fr) repeat(3,80px)",

                    gap:
                      18,

                    alignItems:
                      "center",
                  }}
                >

                  {/* RANK */}

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
                    {index + 1}
                  </div>


                  {/* PLAYER */}

                  <div
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        14,

                      minWidth:
                        0,
                    }}
                  >
                    <PlayerAvatar
                      src={
                        playerPhoto
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

                          color:
                            "#fff",

                          fontSize:
                            18,

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


                  {/* TEAM */}

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
                        teamLogo
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


                  {/* GOALS */}

                  <StatBox
                    value={
                      goals
                    }

                    label="Goals"

                    primary
                  />


                  {/* ASSISTS */}

                  <StatBox
                    value={
                      assists
                    }

                    label="Assists"
                  />


                  {/* APPEARANCES */}

                  <StatBox
                    value={
                      appearances ||
                      "-"
                    }

                    label="Apps"
                  />
                </article>
              </Link>
            );
          }
        )}
      </div>
    </main>
  );
}


/* =====================================================
SUMMARY CARD
===================================================== */

function SummaryCard({
  label,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#1f2937",

        borderRadius:
          14,

        padding:
          18,
      }}
    >
      <div
        style={{
          color:
            "#94a3b8",

          fontSize:
            12,

          marginBottom:
            6,

          textTransform:
            "uppercase",

          letterSpacing:
            ".08em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color:
            "#fff",

          fontWeight:
            800,

          fontSize:
            20,
        }}
      >
        {value}
      </div>
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