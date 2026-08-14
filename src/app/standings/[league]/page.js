import Image from "next/image";
import Link from "next/link";

/* =====================================================
LEAGUE CONFIG
===================================================== */

const LEAGUE_CONFIG = {
  epl: {
    name: "Premier League",
    country: "England",
    competition: "PL",
    season: 2026,
  },

  premierleague: {
    name: "Premier League",
    country: "England",
    competition: "PL",
    season: 2026,
  },

  "premier-league": {
    name: "Premier League",
    country: "England",
    competition: "PL",
    season: 2026,
  },

  laliga: {
    name: "La Liga",
    country: "Spain",
    competition: "PD",
    season: 2025,
  },

  "la-liga": {
    name: "La Liga",
    country: "Spain",
    competition: "PD",
    season: 2025,
  },

  bundesliga: {
    name: "Bundesliga",
    country: "Germany",
    competition: "BL1",
    season: 2025,
  },

  seriea: {
    name: "Serie A",
    country: "Italy",
    competition: "SA",
    season: 2025,
  },

  "serie-a": {
    name: "Serie A",
    country: "Italy",
    competition: "SA",
    season: 2025,
  },

  ligue1: {
    name: "Ligue 1",
    country: "France",
    competition: "FL1",
    season: 2025,
  },

  "ligue-1": {
    name: "Ligue 1",
    country: "France",
    competition: "FL1",
    season: 2025,
  },

  primeiraliga: {
    name: "Primeira Liga",
    country: "Portugal",
    competition: "PPL",
    season: 2025,
  },

  "primeira-liga": {
    name: "Primeira Liga",
    country: "Portugal",
    competition: "PPL",
    season: 2025,
  },
};


/* =====================================================
NORMALIZE LEAGUE
===================================================== */

function normalizeLeague(value) {
  const slug =
    String(value || "")
      .trim()
      .toLowerCase();

  if (slug === "epl") {
    return {
      slug: "epl",

      config: {
        name: "Premier League",
        country: "England",
        competition: "PL",
        season: 2026,
      },
    };
  }

  if (slug === "premierleague") {
    return {
      slug: "premierleague",

      config: LEAGUE_CONFIG.premierleague,
    };
  }

  if (slug === "premier-league") {
    return {
      slug: "premier-league",

      config:
        LEAGUE_CONFIG[
          "premier-league"
        ],
    };
  }

  if (LEAGUE_CONFIG[slug]) {
    return {
      slug,

      config:
        LEAGUE_CONFIG[slug],
    };
  }

  return {
    slug,

    config: null,
  };
}


/* =====================================================
GET STANDINGS
===================================================== */

async function getStandings(
  league
) {
  try {
    const {
      slug,
      config,
    } =
      normalizeLeague(
        league
      );

    if (!config) {
      return {
        success: false,

        league: null,

        season: null,

        count: 0,

        standings: [],

        message:
          "Unsupported league",
      };
    }

    const API =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:5000";

    const url =
      `${API}/api/standings/${slug}` +
      `?season=${config.season}`;

    console.log(
      "🌐 Frontend standings request:",
      url
    );

    const response =
      await fetch(
        url,
        {
          cache:
            "no-store",
        }
      );

    if (!response.ok) {
      console.error(
        "❌ Backend standings error:",
        response.status
      );

      return {
        success: false,

        league: null,

        season:
          config.season,

        count: 0,

        standings: [],

        message:
          `Backend returned ${response.status}`,
      };
    }

    const data =
      await response.json();

    console.log(
      "📊 Frontend standings response:",
      {
        success:
          data?.success,

        season:
          data?.season,

        league:
          data?.league?.code ||
          data?.league?.id,

        count:
          data?.count,
      }
    );

    if (
      !data ||
      data.success !==
        true ||
      !Array.isArray(
        data.standings
      )
    ) {
      console.error(
        "❌ Invalid standings response:",
        data
      );

      return {
        success: false,

        league: null,

        season:
          data?.season ||
          config.season,

        count: 0,

        standings: [],

        message:
          data?.message ||
          "Invalid standings response",
      };
    }

    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching standings:",
      error
    );

    return {
      success: false,

      league: null,

      season: null,

      count: 0,

      standings: [],

      message:
        error?.message ||
        "Unable to load standings",
    };
  }
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

  const {
    config,
  } =
    normalizeLeague(
      league
    );

  if (!config) {
    return {
      title:
        "Standings | Apex Sports",

      description:
        "Football league standings",
    };
  }

  return {
    title:
      `${config.name} Standings | Apex Sports`,

    description:
      `${config.name} football standings`,
  };
}


/* =====================================================
PAGE
===================================================== */

export default async function StandingsPage({
  params,
}) {
  const {
    league,
  } =
    await params;

  const {
    slug,
    config,
  } =
    normalizeLeague(
      league
    );

  console.log(
    "🔎 Standings route:",
    {
      league,

      slug,

      configExists:
        Boolean(config),
    }
  );

  /* =================================================
     UNSUPPORTED LEAGUE
  ================================================= */

  if (!config) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin:
            "40px auto",
          padding: 20,
          color: "#fff",
        }}
      >
        <section
          style={{
            background:
              "#111827",
            border:
              "1px solid #1f2937",
            borderRadius: 20,
            padding: 40,
            textAlign:
              "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 15,
            }}
          >
            📊
          </div>

          <h1
            style={{
              margin:
                "0 0 10px",
            }}
          >
            League Not Found
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
              margin: 0,
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
              marginTop: 24,
              color:
                "#22c55e",
              textDecoration:
                "none",
              fontWeight: 700,
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
    await getStandings(
      slug
    );


  /* =================================================
     API FAILURE
  ================================================= */

  if (
    !data?.success ||
    !Array.isArray(
      data?.standings
    ) ||
    data.standings.length === 0
  ) {
    console.error(
      "❌ No standings available:",
      data
    );

    return (
      <main
        style={{
          maxWidth: 1200,
          margin:
            "40px auto",
          padding: 20,
          color: "#fff",
        }}
      >
        <section
          style={{
            background:
              "#111827",
            border:
              "1px solid #1f2937",
            borderRadius: 20,
            padding: 40,
            textAlign:
              "center",
          }}
        >
          <div
            style={{
              fontSize: 42,
              marginBottom: 15,
            }}
          >
            📊
          </div>

          <h1
            style={{
              margin:
                "0 0 10px",
            }}
          >
            {config.name} Standings
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
              margin: 0,
            }}
          >
            Standings are temporarily
            unavailable.
          </p>

          <p
            style={{
              color:
                "#ef4444",
              margin:
                "15px 0 0",
              fontSize: 14,
            }}
          >
            {data?.message ||
              "Unable to load standings"}
          </p>
        </section>
      </main>
    );
  }


  /* =================================================
     DATA
  ================================================= */

  const table =
    data.standings;

  const leagueData =
    data.league || {};

  const season =
    data.season ||
    leagueData.season ||
    config.season;


  /* =================================================
     PAGE
  ================================================= */

  return (
    <main
      style={{
        maxWidth: 1200,
        margin:
          "40px auto",
        padding: 20,
        color: "#fff",
      }}
    >

      {/* =============================================
          HEADER
      ============================================= */}

      <section
        style={{
          background:
            "linear-gradient(145deg,#111827,#0b1220)",
          border:
            "1px solid #1f2937",
          borderRadius: 20,
          padding: 25,
          marginBottom: 25,
          display:
            "flex",
          alignItems:
            "center",
          gap: 20,
          flexWrap:
            "wrap",
        }}
      >

        {leagueData.logo ? (
          <Image
            src={
              leagueData.logo
            }
            alt={
              leagueData.name ||
              config.name
            }
            width={76}
            height={76}
            unoptimized
            style={{
              objectFit:
                "contain",
            }}
          />
        ) : (
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 16,
              background:
                "#1e293b",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              color:
                "#22c55e",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            {leagueData.code ||
              config.competition}
          </div>
        )}

        <div
          style={{
            flex: 1,
            minWidth: 240,
          }}
        >
          <div
            style={{
              color:
                "#22c55e",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing:
                "1.2px",
              textTransform:
                "uppercase",
              marginBottom: 8,
            }}
          >
            ⚡ Apex Sports
          </div>

          <h1
            style={{
              margin: 0,
              fontSize:
                "clamp(28px,5vw,40px)",
              fontWeight: 800,
            }}
          >
            {leagueData.name ||
              config.name}
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
              margin:
                "7px 0 0",
            }}
          >
            {leagueData.country ||
              config.country}
          </p>

          <div
            style={{
              display:
                "flex",
              gap: 10,
              flexWrap:
                "wrap",
              marginTop: 12,
            }}
          >
            <Badge
              label={
                `Season ${season}`
              }
              positive
            />

            <Badge
              label={
                `${table.length} Teams`
              }
            />

            <Badge
              label={
                "Football-data.org"
              }
            />
          </div>
        </div>
      </section>


      {/* =============================================
          STANDINGS TABLE
      ============================================= */}

      <section
        style={{
          background:
            "#111827",
          border:
            "1px solid #1f2937",
          borderRadius: 20,
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            padding:
              "20px 22px",
            borderBottom:
              "1px solid #1f2937",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 22,
            }}
          >
            League Table
          </h2>

          <p
            style={{
              margin:
                "6px 0 0",
              color:
                "#64748b",
              fontSize: 13,
            }}
          >
            Current{" "}
            {config.name}{" "}
            standings
            for the{" "}
            {season}{" "}
            season.
          </p>
        </div>

        <div
          style={{
            overflowX:
              "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 780,
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "#1e293b",
                }}
              >
                {[
                  "#",
                  "Club",
                  "P",
                  "W",
                  "D",
                  "L",
                  "GF",
                  "GA",
                  "GD",
                  "Pts",
                ].map(
                  (heading) => (
                    <th
                      key={
                        heading
                      }
                      style={{
                        padding:
                          "14px 12px",
                        textAlign:
                          heading ===
                          "Club"
                            ? "left"
                            : "center",
                        color:
                          "#cbd5e1",
                        fontSize: 12,
                        fontWeight:
                          800,
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {table.map(
                (
                  row,
                  index
                ) => {
                  const rank =
                    row?.rank ??
                    index + 1;

                  const team =
                    row?.team ||
                    {};

                  const teamName =
                    row?.name ||
                    team?.name ||
                    "Unknown Team";

                  const teamLogo =
                    row?.crest ||
                    team?.crest ||
                    null;

                  const played =
                    row?.played ??
                    row?.playedGames ??
                    0;

                  const wins =
                    row?.win ??
                    row?.won ??
                    0;

                  const draws =
                    row?.draw ??
                    0;

                  const losses =
                    row?.lose ??
                    row?.lost ??
                    0;

                  const goalsFor =
                    row?.goalsFor ??
                    0;

                  const goalsAgainst =
                    row?.goalsAgainst ??
                    0;

                  const goalDifference =
                    row?.goalDifference ??
                    (
                      goalsFor -
                      goalsAgainst
                    );

                  const points =
                    row?.points ??
                    0;

                  return (
                    <tr
                      key={`${row?.id || team?.id || "team"}-${rank}`}
                      style={{
                        borderBottom:
                          "1px solid #1e293b",
                      }}
                    >
                      <td
                        style={{
                          padding:
                            "14px 12px",
                          textAlign:
                            "center",
                          fontWeight:
                            800,
                          color:
                            getRankColor(
                              rank
                            ),
                        }}
                      >
                        {rank}
                      </td>

                      <td
                        style={{
                          padding:
                            "14px 12px",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 12,
                            minWidth:
                              220,
                          }}
                        >
                          {teamLogo ? (
                            <Image
                              src={
                                teamLogo
                              }
                              alt={
                                teamName
                              }
                              width={
                                34
                              }
                              height={
                                34
                              }
                              unoptimized
                              style={{
                                objectFit:
                                  "contain",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                minWidth: 34,
                                borderRadius: 9,
                                background:
                                  "#1e293b",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                color:
                                  "#64748b",
                                fontSize: 10,
                                fontWeight:
                                  800,
                              }}
                            >
                              FC
                            </div>
                          )}

                          <div>
                            <strong
                              style={{
                                color:
                                  "#fff",
                                fontSize:
                                  14,
                              }}
                            >
                              {teamName}
                            </strong>

                            {row?.tla && (
                              <div
                                style={{
                                  color:
                                    "#64748b",
                                  fontSize:
                                    11,
                                }}
                              >
                                {row.tla}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <TableNumber
                        value={
                          played
                        }
                      />

                      <TableNumber
                        value={
                          wins
                        }
                        color="#22c55e"
                      />

                      <TableNumber
                        value={
                          draws
                        }
                        color="#facc15"
                      />

                      <TableNumber
                        value={
                          losses
                        }
                        color="#ef4444"
                      />

                      <TableNumber
                        value={
                          goalsFor
                        }
                      />

                      <TableNumber
                        value={
                          goalsAgainst
                        }
                      />

                      <td
                        style={{
                          padding:
                            "14px 12px",
                          textAlign:
                            "center",
                          fontWeight:
                            700,
                          color:
                            goalDifference >
                            0
                              ? "#22c55e"
                              : goalDifference <
                                0
                              ? "#ef4444"
                              : "#94a3b8",
                        }}
                      >
                        {goalDifference >
                        0
                          ? `+${goalDifference}`
                          : goalDifference}
                      </td>

                      <td
                        style={{
                          padding:
                            "14px 12px",
                          textAlign:
                            "center",
                          fontWeight:
                            900,
                          color:
                            "#fff",
                          fontSize:
                            16,
                        }}
                      >
                        {points}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </section>


      {/* =============================================
          FOOTER
      ============================================= */}

      <div
        style={{
          display:
            "flex",
          justifyContent:
            "space-between",
          flexWrap:
            "wrap",
          gap: 10,
          marginTop: 14,
          color:
            "#64748b",
          fontSize: 12,
        }}
      >
        <span>
          Showing{" "}
          {table.length}{" "}
          teams
        </span>

        <span>
          Source:
          football-data.org
        </span>
      </div>
    </main>
  );
}


/* =====================================================
TABLE NUMBER
===================================================== */

function TableNumber({
  value,
  color,
}) {
  return (
    <td
      style={{
        padding:
          "14px 12px",
        textAlign:
          "center",
        fontWeight: 600,
        color:
          color ||
          "#e2e8f0",
      }}
    >
      {value}
    </td>
  );
}


/* =====================================================
BADGE
===================================================== */

function Badge({
  label,
  positive = false,
}) {
  return (
    <span
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        padding:
          "6px 10px",
        borderRadius:
          999,
        background:
          positive
            ? "rgba(34,197,94,.12)"
            : "#1e293b",
        border:
          positive
            ? "1px solid rgba(34,197,94,.25)"
            : "1px solid #334155",
        color:
          positive
            ? "#22c55e"
            : "#94a3b8",
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}


/* =====================================================
RANK COLOR
===================================================== */

function getRankColor(rank) {
  if (rank === 1) {
    return "#facc15";
  }

  if (rank === 2) {
    return "#cbd5e1";
  }

  if (rank === 3) {
    return "#fb923c";
  }

  if (
    rank >= 4 &&
    rank <= 6
  ) {
    return "#22c55e";
  }

  if (rank >= 18) {
    return "#ef4444";
  }

  return "#94a3b8";
}