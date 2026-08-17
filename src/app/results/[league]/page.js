

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
  },

  pl: {
    name: "Premier League",
    country: "England",
    code: "PL",
  },

  premierleague: {
    name: "Premier League",
    country: "England",
    code: "PL",
  },

  "premier-league": {
    name: "Premier League",
    country: "England",
    code: "PL",
  },
};

/* =====================================================
AUTOMATIC CURRENT SEASON

Football seasons run approximately:

August → May

Examples:

August 2026 → 2026/27
June 2026 → 2025/26
===================================================== */

function getCurrentSeason() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return month >= 7
    ? year
    : year - 1;
}

/* =====================================================
FETCH RESULTS FOR ONE SEASON
===================================================== */

async function fetchSeasonResults(
  slug,
  season
) {
  const url =
    `${API}/api/league/${slug}/results` +
    `?season=${season}` +
    `&page=1` +
    `&limit=10`;

  console.log(
    "🌐 Results season request:",
    url
  );

  const controller =
    new AbortController();

  const timeout =
    setTimeout(() => {
      controller.abort();
    }, 60000);

  try {
    const response =
      await fetch(url, {
        cache: "no-store",
        signal: controller.signal,
      });

    console.log(
      "📊 Results API status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Results API returned ${response.status}`
      );
    }

    const data =
      await response.json();

    const results =
      Array.isArray(
        data?.results
      )
        ? data.results
        : [];

    console.log(
      "📈 Season results:",
      {
        season,
        success: data?.success,
        total: data?.total,
        count: results.length,
      }
    );

    return {
      ...data,
      results,
    };
  } catch (error) {
    console.error(
      `❌ Failed to load season ${season}:`,
      error
    );

    return {
      success: false,
      season,
      results: [],
      count: 0,
      total: 0,
      message:
        error?.name === "AbortError"
          ? "Results request timed out"
          : error?.message ||
            "Unable to load results",
    };
  } finally {
    clearTimeout(timeout);
  }
}

/* =====================================================
LOAD RESULTS WITH AUTOMATIC FALLBACK

1. Try current season
2. If current season has completed matches → use them
3. If current season has NO completed matches →
   automatically load previous season
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
      requestedSeason: null,
      fallbackUsed: false,
      matches: [],
      count: 0,
      total: 0,
      message:
        "Unsupported league",
    };
  }

  const currentSeason =
    getCurrentSeason();

  console.log(
    `📅 Current Premier League season: ${currentSeason}`
  );

  /* ===================================================
     TRY CURRENT SEASON
  =================================================== */

  const currentData =
    await fetchSeasonResults(
      slug,
      currentSeason
    );

  const currentResults =
    Array.isArray(
      currentData?.results
    )
      ? currentData.results
      : [];

  /* ===================================================
     CURRENT SEASON HAS RESULTS
  =================================================== */

  if (
    currentData?.success === true &&
    currentResults.length > 0
  ) {
    console.log(
      `✅ Using current season ${currentSeason}`
    );

    return {
      ...currentData,
      league: slug,
      season: currentSeason,
      requestedSeason:
        currentSeason,
      fallbackUsed: false,
      matches:
        currentResults,
    };
  }

  /* ===================================================
     AUTOMATIC FALLBACK

     Current season has no completed matches.
  =================================================== */

  const previousSeason =
    currentSeason - 1;

  console.log(
    `ℹ️ No completed matches in ${currentSeason}.`
  );

  console.log(
    `🔄 Automatically falling back to season ${previousSeason}`
  );

  const previousData =
    await fetchSeasonResults(
      slug,
      previousSeason
    );

  const previousResults =
    Array.isArray(
      previousData?.results
    )
      ? previousData.results
      : [];

  /* ===================================================
     PREVIOUS SEASON HAS RESULTS
  =================================================== */

  if (
    previousData?.success === true &&
    previousResults.length > 0
  ) {
    console.log(
      `✅ Using previous completed season ${previousSeason}`
    );

    return {
      ...previousData,
      league: slug,
      season:
        previousSeason,
      requestedSeason:
        currentSeason,
      fallbackUsed: true,
      matches:
        previousResults,
      message:
        `No completed matches in ${currentSeason}/${String(
          currentSeason + 1
        ).slice(-2)}. Showing the latest completed season.`,
    };
  }

  /* ===================================================
     NOTHING FOUND
  =================================================== */

  return {
    success: false,
    league: slug,
    season: currentSeason,
    requestedSeason:
      currentSeason,
    fallbackUsed: false,
    matches: [],
    count: 0,
    total: 0,
    message:
      "No completed matches are available.",
  };
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

  /* ===================================================
     INVALID LEAGUE
  =================================================== */

  if (!config) {
    return (
      <main className="min-h-screen bg-gray-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-[1200px] rounded-[20px] border border-gray-800 bg-gray-900 p-8 text-center sm:p-10">
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            League Not Found
          </h1>

          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            The requested league is not supported.
          </p>
        </div>
      </main>
    );
  }

  /* ===================================================
     LOAD RESULTS
  =================================================== */

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

  const season =
    data?.season ||
    getCurrentSeason();

  /* ===================================================
     PAGE
  =================================================== */

  return (
    <main className="min-h-screen bg-gray-950 px-5 pb-16 pt-[30px] text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="mb-[30px]">

          <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
            ⚡ Apex Sports
          </div>

          <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.15] text-white">
            {config.name} Results
          </h1>

          <p className="mt-2.5 max-w-2xl text-[15px] leading-[1.6] text-gray-400">
            Latest completed matches, scores and
            results from {config.name}.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-[13px] font-bold text-gray-300">
            Season {season}/
            {String(season + 1).slice(-2)}
          </div>

          {/* =================================================
              FALLBACK NOTICE
          ================================================= */}

          {data?.fallbackUsed && (
            <div className="mt-3 rounded-lg border border-yellow-900/60 bg-yellow-950/30 px-3 py-2 text-sm text-yellow-400">
              No completed matches are available yet
              for the current season. Showing the
              latest completed season.
            </div>
          )}

        </header>

        {/* =================================================
            EMPTY / ERROR STATE
        ================================================= */}

        {!data?.success &&
        matches.length === 0 ? (
          <section className="rounded-[20px] border border-gray-800 bg-gray-900 px-6 py-[50px] text-center">

            <div className="mb-[15px] text-5xl">
              ⚽
            </div>

            <h2 className="mb-2.5 text-2xl font-bold text-white">
              No Results Found
            </h2>

            <p className="m-0 text-sm text-slate-400 sm:text-base">
              {data?.message ||
                "No completed matches are available."}
            </p>

          </section>
        ) : (
          <ResultsClient
            initialMatches={
              matches
            }
            league={slug}
            leagueName={
              config.name
            }
          />
        )}

      </div>
    </main>
  );
}

