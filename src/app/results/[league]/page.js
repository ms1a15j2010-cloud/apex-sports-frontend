
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

async function getLeagueResults(league) {
  const slug = String(league || "")
    .trim()
    .toLowerCase();

  const config = LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      success: false,
      league: null,
      season: null,
      matches: [],
      count: 0,
      total: 0,
      message: "Unsupported league",
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

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(url, {
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

    const data = await response.json();

    console.log(
      "📈 Results API response:",
      {
        success: data?.success,
        season: data?.season,
        total: data?.total,
        count: data?.count,
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

    const results = Array.isArray(data?.results)
      ? data.results
      : [];

    if (
      !data ||
      data.success !== true ||
      !Array.isArray(data.results)
    ) {
      console.error(
        "❌ Invalid results response:",
        data
      );

      return {
        success: false,
        league: slug,
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
      matches: results,
    };
  } catch (error) {
    console.error(
      "❌ Failed to load league results:",
      error
    );

    return {
      success: false,
      league: slug,
      season: config.season,
      matches: [],
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
METADATA
===================================================== */

export async function generateMetadata({
  params,
}) {
  const { league } = await params;

  const slug = String(league || "")
    .trim()
    .toLowerCase();

  const config = LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      title: "Results | Apex Sports",
      description: "Latest football results",
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
  const { league } = await params;

  const slug = String(league || "")
    .trim()
    .toLowerCase();

  const config = LEAGUE_CONFIG[slug];

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

  const data = await getLeagueResults(slug);

  const matches = Array.isArray(data?.matches)
    ? data.matches
    : [];

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
            Season {config.season}/
            {String(config.season + 1).slice(-2)}
          </div>
        </header>

        {/* =================================================
            EMPTY / ERROR STATE
        ================================================= */}

        {!data?.success &&
        matches.length === 0 ? (
          <section className="rounded-[20px] border border-gray-800 bg-gray-900 px-6 py-[50px] text-center">
            <div className="mb-[15px] text-5xl">
              🏆
            </div>

            <h2 className="mb-2.5 text-2xl font-bold text-white">
              Results Not Available
            </h2>

            <p className="m-0 text-sm text-slate-400 sm:text-base">
              {data?.message ||
                "Unable to load results."}
            </p>
          </section>
        ) : (
          <ResultsClient
            initialMatches={matches}
            league={slug}
            leagueName={config.name}
          />
        )}
      </div>
    </main>
  );
}
