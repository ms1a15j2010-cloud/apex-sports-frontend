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

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

/* =====================================================
GET FIXTURES
===================================================== */

async function getFixtures(league, season, page = 1, limit = 20) {
  try {
    const url = `${API}/api/fixtures/${league}?season=${season}&page=${page}&limit=${limit}`;

    console.log("🌐 Frontend fixtures request:", url);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const response = await fetch(url, {
        next: { revalidate: 120 },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();

      console.log("📅 Frontend fixtures response:", {
        success: data?.success,
        season: data?.season,
        count: data?.count,
        total: data?.total,
        page: data?.page,
      });

      if (!data || data.success !== true || !Array.isArray(data.fixtures)) {
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
          message: data?.message || "Invalid fixtures response",
        };
      }

      return data;
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("❌ Error fetching fixtures:", error);

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
        error?.name === "AbortError"
          ? "Fixtures request timed out"
          : error?.message || "Unable to load fixtures",
    };
  }
}

/* =====================================================
FORMAT DATE
===================================================== */

function formatMatchDate(date) {
  if (!date) {
    return { date: "-", time: "-" };
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return { date: "-", time: "-" };
  }

  return {
    date: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsed),

    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsed),
  };
}

/* =====================================================
STATUS LABEL
===================================================== */

function getStatusLabel(status) {
  const value = status?.short || "TBD";

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
      return status?.long || value;
  }
}

/* =====================================================
STATUS COLOR / BADGE CLASSES
===================================================== */

function getStatusBadgeClasses(status) {
  switch (status?.short) {
    case "LIVE":
    case "PST":
    case "SUS":
    case "CANC":
      return "bg-red-500/10 border-red-500/30 text-red-500";
    case "HT":
      return "bg-amber-500/10 border-amber-500/30 text-amber-500";
    case "FT":
      return "bg-slate-500/10 border-slate-500/30 text-slate-400";
    default:
      return "bg-emerald-500/10 border-emerald-500/30 text-emerald-500";
  }
}

/* =====================================================
SAFE IMAGE
===================================================== */

function TeamLogo({ src, name }) {
  if (!src) {
    return (
      <div className="w-[52px] h-[52px] min-w-[52px] rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 text-[11px] font-extrabold">
        FC
      </div>
    );
  }

  return (
    <div className="w-[52px] h-[52px] min-w-[52px] rounded-xl bg-slate-900 flex items-center justify-center">
      <Image
        src={src}
        alt={name || "Team"}
        width={40}
        height={40}
        unoptimized
        className="object-contain"
      />
    </div>
  );
}

/* =====================================================
SEO
===================================================== */

export async function generateMetadata({ params }) {
  const { league } = await params;
  const slug = String(league || "").trim().toLowerCase();
  const config = LEAGUE_CONFIG[slug];

  if (!config) {
    return {
      title: "Fixtures | Apex Sports",
      description: "Football fixtures",
    };
  }

  return {
    title: `${config.name} Fixtures | Apex Sports`,
    description: `Upcoming fixtures for ${config.name} in the ${config.season} season.`,
  };
}

/* =====================================================
PAGE
===================================================== */

export default async function FixturesPage({ params }) {
  const { league } = await params;
  const slug = String(league || "").trim().toLowerCase();
  const config = LEAGUE_CONFIG[slug];

  /* =================================================
     UNSUPPORTED LEAGUE
  ================================================= */

  if (!config) {
    return (
      <main className="max-w-[1200px] my-[40px] mx-auto p-5 text-white">
        <section className="bg-slate-900 border border-slate-800 rounded-[20px] p-[40px] text-center">
          <div className="text-[48px] mb-[15px]">📅</div>
          <h1 className="text-2xl font-bold">League Not Found</h1>
          <p className="text-slate-400 mt-2">
            The requested league is not supported.
          </p>
          <Link
            href="/leagues"
            className="inline-block mt-[20px] text-emerald-500 font-bold no-underline hover:underline"
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

  const data = await getFixtures(slug, config.season, 1, 20);

  /* =================================================
     FAILURE
  ================================================= */

  if (!data?.success) {
    return (
      <main className="max-w-[1200px] my-[40px] mx-auto p-5 text-white">
        <section className="bg-slate-900 border border-slate-800 rounded-[20px] p-[45px] text-center">
          <div className="text-[48px] mb-[15px]">📅</div>
          <h1 className="m-0 text-2xl font-bold">Fixtures Not Available</h1>
          <p className="text-slate-400 m-0 mt-2">
            {data?.message || "Unable to load fixtures."}
          </p>
        </section>
      </main>
    );
  }

  const fixtures = Array.isArray(data.fixtures) ? data.fixtures : [];
  const leagueData = data.league || {};

  /* =================================================
     NO FIXTURES
  ================================================= */

  if (fixtures.length === 0) {
    return (
      <main className="max-w-[1200px] my-[40px] mx-auto p-5 text-white">
        <section className="bg-slate-900 border border-slate-800 rounded-[20px] p-[45px] text-center">
          <div className="text-[48px] mb-[15px]">📅</div>
          <h1 className="m-0 text-2xl font-bold">No Fixtures Available</h1>
          <p className="text-slate-400 m-0 mt-2">
            No fixtures are currently available for the {config.name}{" "}
            {config.season} season.
          </p>
        </section>
      </main>
    );
  }

  /* =================================================
     MAIN CONTENT
  ================================================= */

  return (
    <main className="max-w-[1200px] my-[40px] mx-auto p-5 text-white">
      {/* =============================================
          LEAGUE HEADER
      ============================================= */}

      <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[20px] p-[25px] mb-[25px] flex items-center gap-[20px] flex-wrap">
        {leagueData.logo ? (
          <Image
            src={leagueData.logo}
            alt={leagueData.name || config.name}
            width={76}
            height={76}
            unoptimized
            className="object-contain"
          />
        ) : (
          <div className="w-[76px] h-[76px] rounded-[16px] bg-slate-800 flex items-center justify-center text-emerald-500 text-[22px] font-extrabold">
            {config.code}
          </div>
        )}

        <div className="flex-1 min-w-[250px]">
          <div className="text-emerald-500 text-[12px] font-extrabold tracking-[1.2px] uppercase mb-[8px]">
            ⚽ Apex Sports
          </div>

          <h1 className="m-0 text-[clamp(28px,5vw,40px)] font-extrabold leading-tight">
            {leagueData.name || config.name}
          </h1>

          <p className="text-slate-400 mt-[7px] mb-0">
            {leagueData.country || config.country}
          </p>

          <div className="flex flex-wrap gap-[10px] mt-[12px]">
            <Badge
              label={`Season ${data.season || config.season}`}
              green
            />
            <Badge label={`${data.total || 0} Fixtures`} />
            <Badge label="Football-data.org" />
          </div>
        </div>
      </section>

      {/* =============================================
          FIXTURE LIST
      ============================================= */}

      <section className="bg-slate-900 border border-slate-800 rounded-[20px] overflow-hidden">
        <div className="px-[22px] py-[20px] border-b border-slate-800">
          <h2 className="m-0 text-[22px] font-bold">Upcoming Fixtures</h2>
          <p className="mt-[6px] mb-0 text-slate-500 text-[13px]">
            {config.name} fixtures for the {data.season || config.season} season.
          </p>
        </div>

        <div className="grid gap-[1px] bg-slate-800">
          {fixtures.map((match) => {
            const fixture = match?.fixture || {};
            const home = match?.home || {};
            const away = match?.away || {};
            const status = match?.status || {};
            const dateInfo = formatMatchDate(fixture.date);
            const statusLabel = getStatusLabel(status);
            const badgeClasses = getStatusBadgeClasses(status);

            return (
              <Link
                key={fixture.id}
                href={`/match/${fixture.id}`}
                className="no-underline text-inherit bg-slate-900 block hover:bg-slate-900/80 transition-colors"
              >
                <article className="p-[22px]">
                  {/* Date / Status */}
                  <div className="flex items-center justify-between gap-[15px] flex-wrap mb-[18px]">
                    <div className="text-slate-400 text-[13px]">
                      📅 {dateInfo.date} • {dateInfo.time}
                    </div>

                    <span
                      className={`inline-flex px-[12px] py-[6px] rounded-full border text-[11px] font-extrabold ${badgeClasses}`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[20px]">
                    {/* Home Team */}
                    <div className="flex items-center gap-[14px] min-w-0">
                      <TeamLogo src={home.logo} name={home.name} />
                      <div className="min-w-0">
                        <div
                          className={`text-[16px] font-bold truncate ${
                            home.winner === true ? "text-emerald-500" : "text-white"
                          }`}
                        >
                          {home.name || "Home Team"}
                        </div>
                        {home.tla && (
                          <div className="text-slate-500 text-[11px] mt-[3px]">
                            {home.tla}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center Score / VS */}
                    <div className="text-center min-w-[70px]">
                      {status.short === "FT" &&
                      match.score?.home !== null &&
                      match.score?.away !== null ? (
                        <>
                          <div className="text-[24px] font-black text-white">
                            {match.score.home} - {match.score.away}
                          </div>
                          <div className="text-slate-500 text-[11px] mt-[4px]">
                            Final
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-[18px] font-extrabold text-emerald-500">
                            VS
                          </div>
                          <div className="text-slate-500 text-[11px] mt-[4px]">
                            Match
                          </div>
                        </>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center justify-end gap-[14px] min-w-0">
                      <div className="min-w-0 text-right">
                        <div
                          className={`text-[16px] font-bold truncate ${
                            away.winner === true ? "text-emerald-500" : "text-white"
                          }`}
                        >
                          {away.name || "Away Team"}
                        </div>
                        {away.tla && (
                          <div className="text-slate-500 text-[11px] mt-[3px]">
                            {away.tla}
                          </div>
                        )}
                      </div>
                      <TeamLogo src={away.logo} name={away.name} />
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="mt-[18px] pt-[14px] border-t border-slate-800 text-slate-500 text-[12px] flex justify-between gap-[15px] flex-wrap">
                    <span>🏟 {fixture.venue?.name || "Venue TBD"}</span>
                    <span>📍 {fixture.venue?.city || config.country}</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =============================================
          PAGINATION INFO
      ============================================= */}

      <div className="mt-[14px] flex justify-between items-center flex-wrap gap-[10px] text-slate-500 text-[12px]">
        <span>
          Showing {data.count || 0} of {data.total || 0} fixtures
        </span>
        <span>
          Page {data.page || 1} of {data.totalPages || 1}
        </span>
      </div>
    </main>
  );
}

/* =====================================================
BADGE
===================================================== */

function Badge({ label, green = false }) {
  return (
    <span
      className={`inline-flex items-center px-[10px] py-[6px] rounded-full text-[11px] font-bold border ${
        green
          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-500"
          : "bg-slate-800 border-slate-700 text-slate-400"
      }`}
    >
      {label}
    </span>
  );
}