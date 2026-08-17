
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
  const slug = String(league || "")
    .trim()
    .toLowerCase();

  const config = LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      success: false,
      season: null,
      league: null,
      count: 0,
      players: [],
      message: "Unsupported league",
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
      "📡 Top scorers API status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Backend error: ${response.status}`
      );
    }

    const data = await response.json();

    console.log(
      "📊 Top scorers response:",
      {
        success: data?.success,
        season: data?.season,
        total: data?.total,
        count: data?.count,
        source: data?.source,
      }
    );

    if (
      !data ||
      data.success !== true ||
      !Array.isArray(data.players)
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
      players: data.players,
    };
  } catch (error) {
    console.error(
      "❌ Top scorers fetch error:",
      error
    );

    return {
      success: false,
      season: config.season,
      league: config.code,
      count: 0,
      players: [],
      message:
        error?.name === "AbortError"
          ? "Top scorers request timed out"
          : error?.message ||
            "Unable to connect to backend",
    };
  } finally {
    clearTimeout(timeout);
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

  const number = Number(value);

  return Number.isFinite(number)
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
  const initials = String(
    name || "P"
  )
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");

  return (
    <div className="flex h-16 w-16 min-w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-[linear-gradient(145deg,#1e293b,#334155)]">
      {src ? (
        <Image
          src={src}
          alt={name || "Player"}
          width={64}
          height={64}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xl font-extrabold text-green-500">
          {initials || "P"}
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
    <div className="flex h-11 w-11 min-w-11 shrink-0 items-center justify-center rounded-[10px] bg-gray-900">
      {src ? (
        <Image
          src={src}
          alt={name || "Team"}
          width={36}
          height={36}
          unoptimized
          className="object-contain"
        />
      ) : (
        <span className="text-[11px] font-extrabold text-slate-500">
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
  const { league } = await params;

  const slug = String(league || "")
    .trim()
    .toLowerCase();

  const config = LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      title: "Top Scorers | Apex Sports",
      description: "Football top scorers",
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
  const { league } = await params;

  const slug = String(league || "")
    .trim()
    .toLowerCase();

  const config = LEAGUE_CONFIG[slug];

  /* =================================================
     UNSUPPORTED LEAGUE
  ================================================= */

  if (!config) {
    return (
      <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
        <section className="rounded-[18px] border border-slate-800 bg-gray-900 p-8 text-center sm:p-10">
          <div className="mb-[15px] text-[46px]">
            ⚽
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            League Not Found
          </h1>

          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            The requested league is not supported.
          </p>

          <Link
            href="/leagues"
            className="mt-5 inline-block font-bold text-green-500 no-underline transition hover:text-green-400"
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

  const data = await getTopScorers(slug);

  const players = Array.isArray(data?.players)
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
      <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
        <header className="mb-[30px]">
          <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
            ⚡ Apex Sports
          </div>

          <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-tight">
            {config.name} Top Scorers
          </h1>

          <p className="mt-2.5 text-[15px] text-gray-400">
            Season{" "}
            {data?.season ||
              config.season}
          </p>
        </header>

        <section className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] px-6 py-[55px] text-center sm:px-8">
          <div className="mb-[15px] text-5xl">
            ⚽
          </div>

          <h2 className="mb-2.5 text-2xl font-bold text-white">
            No top scorers available
          </h2>

          <p className="m-0 text-sm text-slate-400 sm:text-base">
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
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="mb-[30px]">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          ⚡ Apex Sports
        </div>

        <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-tight">
          {config.name} Top Scorers
        </h1>

        <p className="mt-2.5 text-[15px] text-gray-400">
          Leading goalscorers for{" "}
          {config.name}{" "}
          {data?.season ||
            config.season}{" "}
          season.
        </p>
      </header>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <section className="mb-6 grid grid-cols-1 gap-4 rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-[22px] sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Competition"
          value={config.name}
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
          value="Football-data.org"
        />
      </section>

      {/* =================================================
          PLAYER LIST
      ================================================= */}

      <div className="grid gap-4">
        {players.map(
          (
            scorer,
            index
          ) => {
            const statistics =
              Array.isArray(
                scorer?.statistics
              ) &&
              scorer.statistics.length >
                0
                ? scorer.statistics[0]
                : {};

            const playerData =
              scorer?.player || {};

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

            const goals = safeNumber(
              statistics?.goals
                ?.total ??
                scorer?.goals
            );

            const assists = safeNumber(
              statistics?.goals
                ?.assists ??
                scorer?.assists
            );

            const appearances =
              safeNumber(
                statistics?.games
                  ?.appearences ??
                  statistics?.games
                    ?.appearances ??
                  scorer?.appearances
              );

            const rankStyles =
              index === 0
                ? "bg-yellow-400/15 text-yellow-400"
                : index === 1
                ? "bg-slate-400/15 text-slate-300"
                : index === 2
                ? "bg-orange-500/15 text-orange-400"
                : "bg-slate-800 text-green-500";

            return (
              <Link
                key={`${playerId}-${index}`}
                href={`/player/${playerId}`}
                className="block text-inherit no-underline"
              >
                <article className="grid items-center gap-4 rounded-[18px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-4 transition hover:border-slate-700 hover:bg-slate-900 sm:p-5 md:grid-cols-[55px_minmax(240px,1.5fr)_minmax(180px,1fr)_repeat(3,80px)] md:gap-[18px]">
                  {/* RANK */}

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[14px] text-base font-extrabold ${rankStyles}`}
                  >
                    {index + 1}
                  </div>

                  {/* PLAYER */}

                  <div className="flex min-w-0 items-center gap-3.5">
                    <PlayerAvatar
                      src={playerPhoto}
                      name={playerName}
                    />

                    <div className="min-w-0">
                      <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-bold text-white">
                        {playerName}
                      </h2>

                      <p className="mt-1.5 text-xs text-slate-400">
                        {playerData?.nationality ||
                          "Football Player"}
                      </p>
                    </div>
                  </div>

                  {/* TEAM */}

                  <div className="flex min-w-0 items-center justify-center gap-2.5">
                    <TeamAvatar
                      src={teamLogo}
                      name={teamName}
                    />

                    <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-slate-200">
                      {teamName}
                    </strong>
                  </div>

                  {/* GOALS */}

                  <StatBox
                    value={goals}
                    label="Goals"
                    primary
                  />

                  {/* ASSISTS */}

                  <StatBox
                    value={assists}
                    label="Assists"
                  />

                  {/* APPEARANCES */}

                  <StatBox
                    value={
                      appearances || "-"
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
    <div className="rounded-[14px] bg-gray-800 p-[18px]">
      <div className="mb-1.5 text-xs uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>

      <div className="text-xl font-extrabold text-white">
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
    <div className="text-center">
      <div
        className={`mb-1.5 font-extrabold leading-none ${
          primary
            ? "text-[27px] text-green-500"
            : "text-[21px] text-white"
        }`}
      >
        {value}
      </div>

      <small className="text-[11px] text-slate-400">
        {label}
      </small>
    </div>
  );

}