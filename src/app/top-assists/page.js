
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

const LEAGUE = "epl";
const SEASON = 2026;

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
    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log(
      "📡 Top assists API status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Backend returned ${response.status}`
      );
    }

    const data = await response.json();

    console.log(
      "📊 Top assists response:",
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
      players: data.players,
    };
  } catch (error) {
    console.error(
      "❌ Failed to load top assists:",
      error
    );

    return {
      success: false,
      players: [],
      season: SEASON,
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
  title: "Top Assists | Apex Sports",

  description:
    "Top football assist providers from the Premier League.",
};

/* =====================================================
PAGE
===================================================== */

export default async function TopAssistsPage() {
  const data = await getTopAssists();

  const players =
    data.success &&
    Array.isArray(data.players)
      ? data.players
      : [];

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="mb-[30px]">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          ⚡ Apex Sports
        </div>

        <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-tight text-white">
          🎯 Top Assists
        </h1>

        <p className="mt-2.5 text-[15px] text-slate-400">
          Premier League assist leaders
          for the{" "}
          {data?.season || SEASON}/
          {String(
            (data?.season || SEASON) + 1
          ).slice(-2)}{" "}
          season.
        </p>

        <div className="mt-3.5 inline-flex items-center rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-xs font-bold text-green-500">
          Source: football-data.org
        </div>
      </header>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {players.length === 0 ? (
        <div className="rounded-[20px] border border-gray-800 bg-gray-900 px-[30px] py-[50px] text-center">
          <div className="mb-[15px] text-5xl">
            🎯
          </div>

          <h2 className="mb-2.5 text-2xl font-bold text-white">
            No Assist Data Available
          </h2>

          <p className="m-0 text-sm text-slate-400 sm:text-base">
            {data?.message ||
              `No Premier League assist data is currently available for the ${
                data?.season || SEASON
              } season.`}
          </p>
        </div>
      ) : (
        /* =================================================
           PLAYER LIST
        ================================================= */

        <div className="grid gap-4">
          {players.map(
            (player, index) => {
              const playerData =
                player?.player || {};

              const statistics =
                Array.isArray(
                  player?.statistics
                ) &&
                player.statistics.length > 0
                  ? player.statistics[0]
                  : {};

              const team =
                statistics?.team || {};

              const goals =
                statistics?.goals || {};

              const games =
                statistics?.games || {};

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
                  <article className="grid items-center gap-4 rounded-[18px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-4 transition hover:border-slate-700 hover:bg-slate-900 sm:p-5 md:grid-cols-[60px_minmax(260px,1.5fr)_minmax(180px,1fr)_repeat(4,90px)] md:gap-[18px]">
                    {/* =================================
                        RANK
                    ================================= */}

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-[14px] text-base font-extrabold ${rankStyles}`}
                    >
                      #{index + 1}
                    </div>

                    {/* =================================
                        PLAYER
                    ================================= */}

                    <div className="flex min-w-0 items-center gap-4">
                      <PlayerAvatar
                        src={
                          playerData?.photo
                        }
                        name={
                          playerName
                        }
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

                    {/* =================================
                        TEAM
                    ================================= */}

                    <div className="flex min-w-0 items-center justify-center gap-2.5">
                      <TeamAvatar
                        src={
                          team?.logo
                        }
                        name={
                          teamName
                        }
                      />

                      <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-slate-200">
                        {teamName}
                      </strong>
                    </div>

                    {/* =================================
                        ASSISTS
                    ================================= */}

                    <StatBox
                      value={assists}
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
                        minutes || "-"
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
  const initials = String(
    name || "P"
  )
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part
        .charAt(0)
        .toUpperCase()
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

