
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
  const slug = String(value || "")
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
      config: LEAGUE_CONFIG["premier-league"],
    };
  }

  if (LEAGUE_CONFIG[slug]) {
    return {
      slug,
      config: LEAGUE_CONFIG[slug],
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

async function getStandings(league) {
  try {
    const { slug, config } =
      normalizeLeague(league);

    if (!config) {
      return {
        success: false,
        league: null,
        season: null,
        count: 0,
        standings: [],
        message: "Unsupported league",
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

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "❌ Backend standings error:",
        response.status
      );

      return {
        success: false,
        league: null,
        season: config.season,
        count: 0,
        standings: [],
        message:
          `Backend returned ${response.status}`,
      };
    }

    const data = await response.json();

    console.log(
      "📊 Frontend standings response:",
      {
        success: data?.success,
        season: data?.season,
        league:
          data?.league?.code ||
          data?.league?.id,
        count: data?.count,
      }
    );

    if (
      !data ||
      data.success !== true ||
      !Array.isArray(data.standings)
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
  const { league } = await params;

  const { config } =
    normalizeLeague(league);

  if (!config) {
    return {
      title: "Standings | Apex Sports",
      description: "Football league standings",
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
  const { league } = await params;

  const { slug, config } =
    normalizeLeague(league);

  console.log(
    "🔄 Standings route:",
    {
      league,
      slug,
      configExists: Boolean(config),
    }
  );

  /* =================================================
     UNSUPPORTED LEAGUE
  ================================================= */

  if (!config) {
    return (
      <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
        <section className="rounded-[20px] border border-gray-800 bg-gray-900 p-8 text-center sm:p-10">
          <div className="mb-[15px] text-5xl">
            📊
          </div>

          <h1 className="mb-2.5 text-2xl font-extrabold text-white sm:text-3xl">
            League Not Found
          </h1>

          <p className="m-0 text-sm text-slate-400 sm:text-base">
            The requested league is not supported.
          </p>

          <Link
            href="/leagues"
            className="mt-6 inline-block font-bold text-green-500 no-underline transition hover:text-green-400"
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

  const data = await getStandings(slug);

  /* =================================================
     API FAILURE
  ================================================= */

  if (
    !data?.success ||
    !Array.isArray(data?.standings) ||
    data.standings.length === 0
  ) {
    console.error(
      "❌ No standings available:",
      data
    );

    return (
      <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
        <section className="rounded-[20px] border border-gray-800 bg-gray-900 p-8 text-center sm:p-10">
          <div className="mb-[15px] text-[42px]">
            📊
          </div>

          <h1 className="mb-2.5 text-2xl font-extrabold text-white sm:text-3xl">
            {config.name} Standings
          </h1>

          <p className="m-0 text-sm text-slate-400 sm:text-base">
            Standings are temporarily unavailable.
          </p>

          <p className="mt-[15px] text-sm text-red-500">
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

  const table = data.standings;

  const leagueData = data.league || {};

  const season =
    data.season ||
    leagueData.season ||
    config.season;

  /* =================================================
     PAGE
  ================================================= */

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
      {/* =============================================
          HEADER
      ============================================= */}

      <section className="mb-[25px] flex flex-wrap items-center gap-5 rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 sm:p-[25px]">
        {leagueData.logo ? (
          <Image
            src={leagueData.logo}
            alt={
              leagueData.name ||
              config.name
            }
            width={76}
            height={76}
            unoptimized
            className="h-[76px] w-[76px] object-contain"
          />
        ) : (
          <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-[22px] font-extrabold text-green-500">
            {leagueData.code ||
              config.competition}
          </div>
        )}

        <div className="min-w-[240px] flex-1">
          <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
            ⚡ Apex Sports
          </div>

          <h1 className="m-0 text-[clamp(28px,5vw,40px)] font-extrabold leading-tight text-white">
            {leagueData.name ||
              config.name}
          </h1>

          <p className="m-0 mt-1.5 text-sm text-slate-400">
            {leagueData.country ||
              config.country}
          </p>

          <div className="mt-3 flex flex-wrap gap-2.5">
            <Badge
              label={`Season ${season}`}
              positive
            />

            <Badge
              label={`${table.length} Teams`}
            />

            <Badge
              label="Football-data.org"
            />
          </div>
        </div>
      </section>

      {/* =============================================
          STANDINGS TABLE
      ============================================= */}

      <section className="overflow-hidden rounded-[20px] border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-5 py-5 sm:px-[22px]">
          <h2 className="m-0 text-xl font-bold text-white sm:text-[22px]">
            League Table
          </h2>

          <p className="m-0 mt-1.5 text-[13px] text-slate-500">
            Current {config.name} standings
            for the {season} season.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse">
            <thead>
              <tr className="bg-slate-800">
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
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`whitespace-nowrap px-3.5 py-3 text-xs font-extrabold text-slate-300 ${
                      heading === "Club"
                        ? "text-left"
                        : "text-center"
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.map(
                (row, index) => {
                  const rank =
                    row?.rank ??
                    index + 1;

                  const team =
                    row?.team || {};

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
                      className="border-b border-slate-800 transition hover:bg-slate-800/40"
                    >
                      <td
                        className="px-3 py-3.5 text-center font-extrabold"
                        style={{
                          color: getRankColor(
                            rank
                          ),
                        }}
                      >
                        {rank}
                      </td>

                      <td className="px-3 py-3.5">
                        <div className="flex min-w-[220px] items-center gap-3">
                          {teamLogo ? (
                            <Image
                              src={teamLogo}
                              alt={teamName}
                              width={34}
                              height={34}
                              unoptimized
                              className="h-[34px] w-[34px] shrink-0 object-contain"
                            />
                          ) : (
                            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-slate-800 text-[10px] font-extrabold text-slate-500">
                              FC
                            </div>
                          )}

                          <div>
                            <strong className="text-sm font-bold text-white">
                              {teamName}
                            </strong>

                            {row?.tla && (
                              <div className="text-[11px] text-slate-500">
                                {row.tla}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <TableNumber value={played} />

                      <TableNumber
                        value={wins}
                        color="#22c55e"
                      />

                      <TableNumber
                        value={draws}
                        color="#facc15"
                      />

                      <TableNumber
                        value={losses}
                        color="#ef4444"
                      />

                      <TableNumber value={goalsFor} />

                      <TableNumber value={goalsAgainst} />

                      <td
                        className="px-3 py-3.5 text-center font-bold"
                        style={{
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

                      <td className="px-3 py-3.5 text-center text-base font-black text-white">
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

      <div className="mt-3.5 flex flex-wrap justify-between gap-2.5 text-xs text-slate-500">
        <span>
          Showing {table.length} teams
        </span>

        <span>
          Source: football-data.org
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
      className="px-3 py-3.5 text-center font-semibold"
      style={{
        color:
          color || "#e2e8f0",
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
      className={`inline-flex items-center rounded-full px-2.5 py-1.5 text-[11px] font-bold ${
        positive
          ? "border border-green-500/25 bg-green-500/10 text-green-500"
          : "border border-slate-700 bg-slate-800 text-slate-400"
      }`}
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

  if (rank >= 4 && rank <= 6) {
    return "#22c55e";
  }

  if (rank >= 18) {
    return "#ef4444";
  }

  return "#94a3b8";
}
