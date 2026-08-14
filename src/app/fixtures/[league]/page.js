import Link from "next/link";
import Image from "next/image";

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

  premierleague: {
    name: "Premier League",
    country: "England",
    code: "PL",
    season: 2026,
  },

  "premier-league": {
    name: "Premier League",
    country: "England",
    code: "PL",
    season: 2026,
  },

  pl: {
    name: "Premier League",
    country: "England",
    code: "PL",
    season: 2026,
  },
};

/* =====================================================
API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";

/* =====================================================
GET FIXTURES

Uses the migrated backend:

/api/fixtures/:league

Backend pagination:
page
limit

Next.js caches the response for 2 minutes.
===================================================== */

async function getFixtures(
  league,
  season,
  page = 1,
  limit = 20
) {
  try {
    const url =
      `${API}/api/fixtures/${league}` +
      `?season=${season}` +
      `&page=${page}` +
      `&limit=${limit}`;

    console.log(
      "🌐 Frontend fixtures request:",
      url
    );

    const controller =
      new AbortController();

    const timeout =
      setTimeout(() => {
        controller.abort();
      }, 15000);

    try {
      const response =
        await fetch(url, {
          next: {
            revalidate: 120,
          },

          signal:
            controller.signal,
        });

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      const data =
        await response.json();

      console.log(
        "📅 Frontend fixtures response:",
        {
          success:
            data?.success,

          season:
            data?.season,

          count:
            data?.count,

          total:
            data?.total,

          page:
            data?.page,
        }
      );

      if (
        !data ||
        data.success !== true ||
        !Array.isArray(
          data.fixtures
        )
      ) {
        return {
          success: false,
          league: null,
          season,
          page,
          limit,
          total: 0,
          totalPages: 0,
          count: 0,
          fixtures: [],
          message:
            data?.message ||
            "Invalid fixtures response",
        };
      }

      return data;
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error(
      "❌ Error fetching fixtures:",
      error
    );

    return {
      success: false,

      league: null,

      season,

      page,

      limit,

      total: 0,

      totalPages: 0,

      count: 0,

      fixtures: [],

      message:
        error?.name ===
        "AbortError"
          ? "Fixtures request timed out"
          : error?.message ||
            "Unable to load fixtures",
    };
  }
}

/* =====================================================
FORMAT DATE
===================================================== */

function formatMatchDate(
  date
) {
  if (!date) {
    return {
      date: "-",
      time: "-",
    };
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return {
      date: "-",
      time: "-",
    };
  }

  return {
    date:
      new Intl.DateTimeFormat(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ).format(parsed),

    time:
      new Intl.DateTimeFormat(
        "en-GB",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ).format(parsed),
  };
}

/* =====================================================
STATUS LABEL
===================================================== */

function getStatusLabel(
  status
) {
  const value =
    status?.short ||
    "TBD";

  switch (value) {
    case "NS":
      return "Scheduled";

    case "LIVE":
      return "Live";

    case "HT":
      return "Half Time";

    case "FT":
      return "Finished";

    case "PST":
      return "Postponed";

    case "SUS":
      return "Suspended";

    case "CANC":
      return "Cancelled";

    default:
      return (
        status?.long ||
        value
      );
  }
}

/* =====================================================
STATUS COLOR
===================================================== */

function getStatusColor(
  status
) {
  switch (
    status?.short
  ) {
    case "LIVE":
      return "#ef4444";

    case "HT":
      return "#f59e0b";

    case "FT":
      return "#64748b";

    case "PST":
    case "SUS":
    case "CANC":
      return "#ef4444";

    default:
      return "#22c55e";
  }
}

/* =====================================================
SAFE IMAGE

Prevents broken image URLs from causing problems.
===================================================== */

function TeamLogo({
  src,
  name,
}) {
  if (!src) {
    return (
      <div
        style={{
          width: 52,
          height: 52,
          minWidth: 52,
          borderRadius: 12,
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          color: "#64748b",
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        FC
      </div>
    );
  }

  return (
    <div
      style={{
        width: 52,
        height: 52,
        minWidth: 52,
        borderRadius: 12,
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent:
          "center",
      }}
    >
      <Image
        src={src}
        alt={
          name ||
          "Team"
        }
        width={40}
        height={40}
        unoptimized
        style={{
          objectFit:
            "contain",
        }}
      />
    </div>
  );
}

/* =====================================================
SEO
===================================================== */

export async function generateMetadata({
  params,
}) {
  const { league } =
    await params;

  const slug =
    String(league || "")
      .trim()
      .toLowerCase();

  const config =
    LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      title:
        "Fixtures | Apex Sports",

      description:
        "Football fixtures",
    };
  }

  return {
    title:
      `${config.name} Fixtures | Apex Sports`,

    description:
      `Upcoming fixtures for ${config.name} in the ${config.season} season.`,
  };
}

/* =====================================================
PAGE
===================================================== */

export default async function FixturesPage({
  params,
}) {
  const { league } =
    await params;

  const slug =
    String(league || "")
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
          maxWidth: 1200,
          margin: "40px auto",
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
            📅
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
              marginTop: 20,
              color:
                "#22c55e",
              fontWeight: 700,
              textDecoration:
                "none",
            }}
          >
            ← Back to Leagues
          </Link>
        </section>
      </main>
    );
  }

  /* =================================================
     LOAD FIRST PAGE
  ================================================= */

  const data =
    await getFixtures(
      slug,
      config.season,
      1,
      20
    );

  /* =================================================
     FAILURE
  ================================================= */

  if (
    !data?.success
  ) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
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
            padding: 45,
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
            📅
          </div>

          <h1
            style={{
              margin:
                "0 0 10px",
            }}
          >
            Fixtures Not Available
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
              margin: 0,
            }}
          >
            {data?.message ||
              "Unable to load fixtures."}
          </p>
        </section>
      </main>
    );
  }

  const fixtures =
    Array.isArray(
      data.fixtures
    )
      ? data.fixtures
      : [];

  const leagueData =
    data.league || {};

  /* =================================================
     NO FIXTURES
  ================================================= */

  if (
    fixtures.length === 0
  ) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
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
            padding: 45,
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
            📅
          </div>

          <h1
            style={{
              margin:
                "0 0 10px",
            }}
          >
            No Fixtures Available
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
              margin: 0,
            }}
          >
            No fixtures are currently
            available for the{" "}
            {config.name}{" "}
            {config.season} season.
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
        maxWidth: 1200,
        margin:
          "40px auto",
        padding: 20,
        color: "#fff",
      }}
    >
      {/* =============================================
          LEAGUE HEADER
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
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {config.code}
          </div>
        )}

        <div
          style={{
            flex: 1,
            minWidth: 250,
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
            ⚽ Apex Sports
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
              flexWrap:
                "wrap",
              gap: 10,
              marginTop: 12,
            }}
          >
            <Badge
              label={`Season ${
                data.season ||
                config.season
              }`}
              green
            />

            <Badge
              label={`${data.total || 0} Fixtures`}
            />

            <Badge
              label="Football-data.org"
            />
          </div>
        </div>
      </section>

      {/* =============================================
          FIXTURE LIST
      ============================================= */}

      <section
        style={{
          background:
            "#111827",
          border:
            "1px solid #1f2937",
          borderRadius: 20,
          overflow: "hidden",
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
            Upcoming Fixtures
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
            {config.name} fixtures
            for the{" "}
            {data.season ||
              config.season}{" "}
            season.
          </p>
        </div>

        <div
          style={{
            display:
              "grid",
            gap: 1,
            background:
              "#1f2937",
          }}
        >
          {fixtures.map(
            (
              match
            ) => {
              const fixture =
                match?.fixture ||
                {};

              const home =
                match?.home ||
                {};

              const away =
                match?.away ||
                {};

              const status =
                match?.status ||
                {};

              const dateInfo =
                formatMatchDate(
                  fixture.date
                );

              const statusLabel =
                getStatusLabel(
                  status
                );

              const statusColor =
                getStatusColor(
                  status
                );

              return (
                <Link
                  key={
                    fixture.id
                  }
                  href={`/match/${fixture.id}`}
                  style={{
                    textDecoration:
                      "none",
                    color:
                      "inherit",
                    background:
                      "#111827",
                  }}
                >
                  <article
                    style={{
                      padding:
                        "22px",
                    }}
                  >
                    {/* Date / Status */}

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 15,
                        flexWrap:
                          "wrap",
                        marginBottom: 18,
                      }}
                    >
                      <div
                        style={{
                          color:
                            "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        📅{" "}
                        {dateInfo.date}
                        {" • "}
                        {dateInfo.time}
                      </div>

                      <span
                        style={{
                          display:
                            "inline-flex",
                          padding:
                            "6px 12px",
                          borderRadius:
                            999,
                          background:
                            `${statusColor}18`,
                          border:
                            `1px solid ${statusColor}45`,
                          color:
                            statusColor,
                          fontSize: 11,
                          fontWeight:
                            800,
                        }}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    {/* Teams */}

                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "minmax(0,1fr) auto minmax(0,1fr)",
                        alignItems:
                          "center",
                        gap: 20,
                      }}
                    >
                      {/* Home */}

                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 14,
                          minWidth: 0,
                        }}
                      >
                        <TeamLogo
                          src={
                            home.logo
                          }
                          name={
                            home.name
                          }
                        />

                        <div
                          style={{
                            minWidth:
                              0,
                          }}
                        >
                          <div
                            style={{
                              color:
                                home.winner ===
                                true
                                  ? "#22c55e"
                                  : "#fff",
                              fontSize:
                                16,
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
                            {home.name ||
                              "Home Team"}
                          </div>

                          {home.tla && (
                            <div
                              style={{
                                color:
                                  "#64748b",
                                fontSize:
                                  11,
                                marginTop:
                                  3,
                              }}
                            >
                              {home.tla}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Center */}

                      <div
                        style={{
                          textAlign:
                            "center",
                          minWidth: 70,
                        }}
                      >
                        {status.short ===
                          "FT" &&
                        match.score?.home !==
                          null &&
                        match.score?.away !==
                          null ? (
                          <>
                            <div
                              style={{
                                fontSize:
                                  24,
                                fontWeight:
                                  900,
                                color:
                                  "#fff",
                              }}
                            >
                              {
                                match
                                  .score
                                  .home
                              }{" "}
                              -{" "}
                              {
                                match
                                  .score
                                  .away
                              }
                            </div>

                            <div
                              style={{
                                color:
                                  "#64748b",
                                fontSize:
                                  11,
                                marginTop:
                                  4,
                              }}
                            >
                              Final
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              style={{
                                fontSize:
                                  18,
                                fontWeight:
                                  800,
                                color:
                                  "#22c55e",
                              }}
                            >
                              VS
                            </div>

                            <div
                              style={{
                                color:
                                  "#64748b",
                                fontSize:
                                  11,
                                marginTop:
                                  4,
                              }}
                            >
                              Match
                            </div>
                          </>
                        )}
                      </div>

                      {/* Away */}

                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "flex-end",
                          gap: 14,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            minWidth:
                              0,
                            textAlign:
                              "right",
                          }}
                        >
                          <div
                            style={{
                              color:
                                away.winner ===
                                true
                                  ? "#22c55e"
                                  : "#fff",
                              fontSize:
                                16,
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
                            {away.name ||
                              "Away Team"}
                          </div>

                          {away.tla && (
                            <div
                              style={{
                                color:
                                  "#64748b",
                                fontSize:
                                  11,
                                marginTop:
                                  3,
                              }}
                            >
                              {away.tla}
                            </div>
                          )}
                        </div>

                        <TeamLogo
                          src={
                            away.logo
                          }
                          name={
                            away.name
                          }
                        />
                      </div>
                    </div>

                    {/* Venue */}

                    <div
                      style={{
                        marginTop:
                          18,
                        paddingTop:
                          14,
                        borderTop:
                          "1px solid #1f2937",
                        color:
                          "#64748b",
                        fontSize:
                          12,
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        gap: 15,
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <span>
                        🏟{" "}
                        {fixture
                          .venue
                          ?.name ||
                          "Venue TBD"}
                      </span>

                      <span>
                        📍{" "}
                        {fixture
                          .venue
                          ?.city ||
                          config.country}
                      </span>
                    </div>
                  </article>
                </Link>
              );
            }
          )}
        </div>
      </section>

      {/* =============================================
          PAGINATION INFO
      ============================================= */}

      <div
        style={{
          marginTop:
            14,
          display:
            "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          flexWrap:
            "wrap",
          gap: 10,
          color:
            "#64748b",
          fontSize: 12,
        }}
      >
        <span>
          Showing{" "}
          {data.count || 0} of{" "}
          {data.total || 0} fixtures
        </span>

        <span>
          Page{" "}
          {data.page || 1} of{" "}
          {data.totalPages || 1}
        </span>
      </div>
    </main>
  );
}

/* =====================================================
BADGE
===================================================== */

function Badge({
  label,
  green = false,
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
          green
            ? "rgba(34,197,94,.12)"
            : "#1e293b",
        border:
          green
            ? "1px solid rgba(34,197,94,.25)"
            : "1px solid #334155",
        color:
          green
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