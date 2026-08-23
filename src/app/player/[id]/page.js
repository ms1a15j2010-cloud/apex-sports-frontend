import Link from "next/link";

import PlayerSidebar from "@/components/PlayerSidebar";
import PlayerHeader from "@/components/PlayerHeader";
import PlayerOverview from "@/components/PlayerOverview";
import PlayerStatistics from "@/components/PlayerStatistics";
import PlayerCareer from "@/components/PlayerCareer";
import PlayerPerformance from "@/components/PlayerPerformance";
import PlayerFixtures from "@/components/PlayerFixtures";
import PlayerTransfers from "@/components/PlayerTransfers";
import PlayerTrophies from "@/components/PlayerTrophies";
import PlayerHistory from "@/components/PlayerHistory";
import PlayerRatings from "@/components/PlayerRatings";

/* =====================================================
   API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";

const SEASON = 2026;

/* =====================================================
   PLAYER PROFILE
===================================================== */

async function getPlayer(id) {
  try {
    const url =
      `${API}/api/player/${encodeURIComponent(id)}?season=${SEASON}`;

    console.log("🌐 Player API request:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log("⚽ Player response:", {
      status: res.status,
      success: data?.success,
      player: data?.player?.name || null,
    });

    if (!res.ok) {
      return {
        success: false,
        player: null,
        message:
          data?.message ||
          `Backend error: ${res.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error("❌ Player fetch failed:", error);

    return {
      success: false,
      player: null,
      message:
        error?.message ||
        "Unable to load player",
    };
  }
}

/* =====================================================
   PLAYER STATISTICS
===================================================== */

async function getStatistics(id) {
  try {
    const url =
      `${API}/api/player/${encodeURIComponent(id)}/statistics?season=${SEASON}`;

    console.log("🌐 Statistics API request:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log("📊 Statistics response:", {
      status: res.status,
      success: data?.success,
      count: Array.isArray(data?.statistics)
        ? data.statistics.length
        : 0,
    });

    if (!res.ok) {
      return {
        success: false,
        statistics: [],
      };
    }

    return data;
  } catch (error) {
    console.error(
      "❌ Statistics fetch failed:",
      error
    );

    return {
      success: false,
      statistics: [],
    };
  }
}

/* =====================================================
   PLAYER FIXTURES
===================================================== */

async function getFixtures(id) {
  try {
    const url =
      `${API}/api/player/${encodeURIComponent(id)}/fixtures?season=${SEASON}`;

    console.log("🌐 Fixtures API request:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        fixtures: [],
      };
    }

    console.log("📅 Fixtures response:", {
      success: data?.success,
      count: data?.count ?? 0,
    });

    return data;
  } catch (error) {
    console.error(
      "❌ Fixtures fetch failed:",
      error
    );

    return {
      success: false,
      fixtures: [],
    };
  }
}

/* =====================================================
   PLAYER HISTORY
===================================================== */

async function getHistory(id) {
  try {
    const url =
      `${API}/api/player/${encodeURIComponent(id)}/history?season=${SEASON}`;

    console.log("🌐 History API request:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        history: [],
      };
    }

    console.log("📖 History response:", {
      success: data?.success,
      count: data?.count ?? 0,
    });

    return data;
  } catch (error) {
    console.error(
      "❌ History fetch failed:",
      error
    );

    return {
      success: false,
      history: [],
    };
  }
}

/* =====================================================
   METADATA
===================================================== */

export async function generateMetadata({ params }) {
  const { id } = await params;

  const data = await getPlayer(id);

  return {
    title:
      data?.success &&
      data?.player?.name
        ? `${data.player.name} | Apex Sports`
        : "Player | Apex Sports",

    description:
      "Professional football player profile, statistics, career, performance and match information.",
  };
}

/* =====================================================
   PAGE
===================================================== */

export default async function PlayerPage({ params }) {
  const { id } = await params;

  /* =================================================
     LOAD CRITICAL DATA
  ================================================= */

  const playerData = await getPlayer(id);

  /* =================================================
     PLAYER NOT FOUND
  ================================================= */

  if (
    !playerData?.success ||
    !playerData?.player
  ) {
    return (
      <main className="mx-auto my-10 max-w-[1450px] px-5 text-white">
        <h1 className="mb-[15px] text-3xl font-bold">
          Player Not Found
        </h1>

        <p className="mb-[30px] text-slate-400">
          {playerData?.message ||
            "We couldn't find this player."}
        </p>

        <Link
          href="/search"
          className="font-bold text-green-500 no-underline transition hover:text-green-400"
        >
          ← Back to Search
        </Link>
      </main>
    );
  }

  const player = playerData.player;

  /* =================================================
     STATISTICS
  ================================================= */

  const statData = await getStatistics(id);

  const statistics =
    statData?.success &&
    Array.isArray(statData.statistics)
      ? statData.statistics
      : Array.isArray(player.statistics)
      ? player.statistics
      : [];

  /* =================================================
     FIXTURES + HISTORY
  ================================================= */

  const [fixturesData, historyData] =
    await Promise.all([
      getFixtures(id),
      getHistory(id),
    ]);

  const fixtures =
    fixturesData?.success &&
    Array.isArray(fixturesData.fixtures)
      ? fixturesData.fixtures
      : Array.isArray(player.fixtures)
      ? player.fixtures
      : [];

  const history =
    historyData?.success &&
    Array.isArray(historyData.history)
      ? historyData.history
      : Array.isArray(player.history)
      ? player.history
      : [];

  /* =================================================
     CAREER
  ================================================= */

  const career = statistics;

  /* =================================================
     PERFORMANCE
  ================================================= */

  const performance = statistics;

  /* =================================================
     TRANSFERS
  ================================================= */

  const transfers =
    Array.isArray(player.transfers)
      ? player.transfers
      : [];

  const transfersAvailable = false;

  /* =================================================
     TROPHIES
  ================================================= */

  const trophies =
    Array.isArray(player.trophies)
      ? player.trophies
      : [];

  const trophiesAvailable = false;

  /* =================================================
     RENDER
  ================================================= */

  return (
    <main className="mx-auto my-10 grid max-w-[1450px] grid-cols-1 items-start gap-[25px] px-5 text-white lg:grid-cols-[320px_minmax(0,1fr)]">
      {/* ============================================
          LEFT SIDEBAR
      ============================================ */}

      <div className="min-w-0">
        <PlayerSidebar player={player} />
      </div>

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <div className="flex min-w-0 flex-col gap-[30px]">
        {/* PLAYER HEADER */}

        <PlayerHeader player={player} />

        {/* PLAYER OVERVIEW */}

        <PlayerOverview player={player} />

        {/* PLAYER STATISTICS */}

        <PlayerStatistics
          statistics={statistics}
          player={player}
        />

        {/* PLAYER PERFORMANCE */}

        <PlayerPerformance
          statistics={performance}
        />

        {/* PLAYER RATINGS */}

        <PlayerRatings
          player={player}
          statistics={statistics}
        />

        {/* PLAYER CAREER */}

        <PlayerCareer
          player={player}
          statistics={career}
        />

        {/* PLAYER FIXTURES */}

        <PlayerFixtures fixtures={fixtures} />

        {/* PLAYER TRANSFERS */}

        <PlayerTransfers
          transfers={transfers}
          available={transfersAvailable}
        />

        {/* PLAYER TROPHIES */}

        <PlayerTrophies
          trophies={trophies}
          available={trophiesAvailable}
        />

        {/* PLAYER HISTORY */}

        <PlayerHistory
          player={player}
          history={history}
        />
      </div>
    </main>
  );
}

