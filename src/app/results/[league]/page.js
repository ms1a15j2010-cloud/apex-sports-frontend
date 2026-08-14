import ResultsClient from "@/components/ResultsClient";

/* =====================================================
API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";


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

  pl: {
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
};


/* =====================================================
LOAD RESULTS
===================================================== */

async function getLeagueResults(
  league
) {
  const slug =
    String(league || "")
      .trim()
      .toLowerCase();

  const config =
    LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      success: false,

      league: null,

      season: null,

      matches: [],

      count: 0,

      total: 0,

      message:
        "Unsupported league",
    };
  }

  /*
   * Migrated backend endpoint:
   *
   * /api/league/epl/results
   *
   * football-data.org
   */

  const url =
    `${API}/api/league/${slug}/results` +
    `?season=${config.season}` +
    `&page=1` +
    `&limit=10`;

  console.log(
    "🌐 Results page API request:",
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
      "📡 Results API status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Results API returned ${response.status}`
      );
    }

    const data =
      await response.json();

    console.log(
      "📊 Results API response:",
      {
        success:
          data?.success,

        season:
          data?.season,

        total:
          data?.total,

        count:
          data?.count,
      }
    );

    /*
     * Backend returns:
     *
     * results: [...]
     *
     * ResultsClient expects:
     *
     * initialMatches: [...]
     */

    const results =
      Array.isArray(
        data?.results
      )
        ? data.results
        : [];

    if (
      !data ||
      data.success !== true ||
      !Array.isArray(
        data.results
      )
    ) {
      console.error(
        "❌ Invalid results response:",
        data
      );

      return {
        success: false,

        league:
          slug,

        season:
          data?.season ||
          config.season,

        matches: [],

        count: 0,

        total: 0,

        message:
          data?.message ||
          "Invalid results response",
      };
    }

    return {
      ...data,

      matches:
        results,
    };
  } catch (error) {
    console.error(
      "❌ Failed to load league results:",
      error
    );

    return {
      success: false,

      league:
        slug,

      season:
        config.season,

      matches: [],

      count: 0,

      total: 0,

      message:
        error?.name ===
        "AbortError"
          ? "Results request timed out"
          : error?.message ||
            "Unable to load results",
    };
  } finally {
    clearTimeout(
      timeout
    );
  }
}


/* =====================================================
METADATA
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
        "Results | Apex Sports",

      description:
        "Latest football results",
    };
  }

  return {
    title:
      `${config.name} Results | Apex Sports`,

    description:
      `Latest football results, scores and completed matches from ${config.name}.`,
  };
}


/* =====================================================
PAGE
===================================================== */

export default async function ResultsLeaguePage({
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
    return (
      <main
        style={{
          minHeight:
            "100vh",

          background:
            "#030712",

          color:
            "#fff",

          padding:
            "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth:
              1200,

            margin:
              "0 auto",

            background:
              "#111827",

            border:
              "1px solid #1f2937",

            borderRadius:
              20,

            padding:
              45,

            textAlign:
              "center",
          }}
        >
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
        </div>
      </main>
    );
  }

  const data =
    await getLeagueResults(
      slug
    );

  const matches =
    Array.isArray(
      data?.matches
    )
      ? data.matches
      : [];

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#030712",

        color:
          "#fff",

        padding:
          "30px 20px 60px",
      }}
    >
      <div
        style={{
          width:
            "100%",

          maxWidth:
            "1200px",

          margin:
            "0 auto",
        }}
      >

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header
          style={{
            marginBottom:
              "30px",
          }}
        >
          <div
            style={{
              color:
                "#22c55e",

              fontSize:
                "12px",

              fontWeight:
                800,

              letterSpacing:
                "1.2px",

              textTransform:
                "uppercase",

              marginBottom:
                "8px",
            }}
          >
            ⚡ Apex Sports
          </div>

          <h1
            style={{
              margin:
                0,

              color:
                "#fff",

              fontSize:
                "clamp(28px, 5vw, 44px)",

              fontWeight:
                800,

              lineHeight:
                1.15,
            }}
          >
            {config.name} Results
          </h1>

          <p
            style={{
              margin:
                "10px 0 0",

              color:
                "#9ca3af",

              fontSize:
                "15px",

              lineHeight:
                1.6,
            }}
          >
            Latest completed
            matches, scores and
            results from{" "}
            {config.name}.
          </p>

          <div
            style={{
              marginTop:
                "12px",

              display:
                "inline-flex",

              alignItems:
                "center",

              gap:
                8,

              padding:
                "7px 12px",

              borderRadius:
                "8px",

              background:
                "#111827",

              border:
                "1px solid #1f2937",

              color:
                "#d1d5db",

              fontSize:
                "13px",

              fontWeight:
                700,
            }}
          >
            Season{" "}
            {config.season}/
            {String(
              config.season + 1
            ).slice(-2)}
          </div>
        </header>


        {/* =================================================
            EMPTY / ERROR STATE
        ================================================= */}

        {!data?.success &&
        matches.length === 0 ? (
          <section
            style={{
              background:
                "#111827",

              border:
                "1px solid #1f2937",

              borderRadius:
                20,

              padding:
                "50px 25px",

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
              🏁
            </div>

            <h2
              style={{
                margin:
                  "0 0 10px",
              }}
            >
              Results Not Available
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
                "Unable to load results."}
            </p>
          </section>
        ) : (
          <ResultsClient
            initialMatches={
              matches
            }

            league={
              slug
            }

            leagueName={
              config.name
            }
          />
        )}
      </div>
    </main>
  );
}