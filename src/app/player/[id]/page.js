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
      `${API}/api/player/${encodeURIComponent(
        id
      )}?season=${SEASON}`;

    console.log(
      "🌐 Player API request:",
      url
    );

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log(
      "⚽ Player response:",
      {
        status: res.status,
        success: data?.success,
        player:
          data?.player?.name ||
          null,
      }
    );

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
    console.error(
      "❌ Player fetch failed:",
      error
    );

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
      `${API}/api/player/${encodeURIComponent(
        id
      )}/statistics?season=${SEASON}`;

    console.log(
      "🌐 Statistics API request:",
      url
    );

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log(
      "📊 Statistics response:",
      {
        status: res.status,
        success: data?.success,
        count: Array.isArray(
          data?.statistics
        )
          ? data.statistics.length
          : 0,
      }
    );

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
      `${API}/api/player/${encodeURIComponent(
        id
      )}/fixtures?season=${SEASON}`;

    console.log(
      "🌐 Fixtures API request:",
      url
    );

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

    console.log(
      "📅 Fixtures response:",
      {
        success: data?.success,
        count: data?.count ?? 0,
      }
    );

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
      `${API}/api/player/${encodeURIComponent(
        id
      )}/history?season=${SEASON}`;

    console.log(
      "🌐 History API request:",
      url
    );

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

    console.log(
      "📖 History response:",
      {
        success: data?.success,
        count: data?.count ?? 0,
      }
    );

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

export async function generateMetadata({
  params,
}) {
  const { id } = await params;

  const data =
    await getPlayer(id);

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

export default async function PlayerPage({
  params,
}) {
  const { id } = await params;

  /* =================================================
     LOAD CRITICAL DATA

     We intentionally do NOT make eight simultaneous
     requests anymore.

     Profile + Statistics + Fixtures + History
     are sufficient for this Player page.
  ================================================= */

  const playerData =
    await getPlayer(id);

  /* =================================================
     PLAYER NOT FOUND
  ================================================= */

  if (
    !playerData?.success ||
    !playerData?.player
  ) {
    return (
      <main
        style={{
          maxWidth: 1450,
          margin: "40px auto",
          padding: 20,
          color: "#fff",
        }}
      >
        <h1
          style={{
            marginBottom: 15,
          }}
        >
          Player Not Found
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: 30,
          }}
        >
          {playerData?.message ||
            "We couldn't find this player."}
        </p>

        <Link
          href="/search"
          style={{
            color: "#22c55e",
            textDecoration:
              "none",
            fontWeight: "bold",
          }}
        >
          ← Back to Search
        </Link>
      </main>
    );
  }

  const player =
    playerData.player;

  /* =================================================
     STATISTICS

     Fetch once.

  ================================================= */

  const statData =
    await getStatistics(id);

  const statistics =
    statData?.success &&
    Array.isArray(
      statData.statistics
    )
      ? statData.statistics
      : Array.isArray(
          player.statistics
        )
      ? player.statistics
      : [];

  /* =================================================
     FIXTURES + HISTORY

     Only two remaining API requests.
  ================================================= */

  const [
    fixturesData,
    historyData,
  ] = await Promise.all([
    getFixtures(id),
    getHistory(id),
  ]);

  const fixtures =
    fixturesData?.success &&
    Array.isArray(
      fixturesData.fixtures
    )
      ? fixturesData.fixtures
      : Array.isArray(
          player.fixtures
        )
      ? player.fixtures
      : [];

  const history =
    historyData?.success &&
    Array.isArray(
      historyData.history
    )
      ? historyData.history
      : Array.isArray(
          player.history
        )
      ? player.history
      : [];

  /* =================================================
     CAREER

     Career is already represented by the same
     football-data.org statistics block.
  ================================================= */

  const career =
    statistics;

  /* =================================================
     PERFORMANCE

     Performance uses the same current-season
     statistics block.
  ================================================= */

  const performance =
    statistics;

  /* =================================================
     TRANSFERS

     football-data.org does not provide an
     equivalent transfer-history endpoint.
  ================================================= */

  const transfers =
    Array.isArray(
      player.transfers
    )
      ? player.transfers
      : [];

  const transfersAvailable =
    false;

  /* =================================================
     TROPHIES

     football-data.org does not provide an
     equivalent trophy-history endpoint.
  ================================================= */

  const trophies =
    Array.isArray(
      player.trophies
    )
      ? player.trophies
      : [];

  const trophiesAvailable =
    false;

  /* =================================================
     RENDER
  ================================================= */

  return (
    <main
      style={{
        maxWidth: 1450,
        margin: "40px auto",
        padding: 20,
        color: "#fff",

        display: "grid",

        gridTemplateColumns:
          "320px 1fr",

        gap: 25,

        alignItems: "start",
      }}
    >
      {/* ============================================
          LEFT SIDEBAR
      ============================================ */}

      <div>
        <PlayerSidebar
          player={player}
        />
      </div>

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: 30,
        }}
      >
        {/* PLAYER HEADER */}

        <PlayerHeader
          player={player}
        />

        {/* PLAYER OVERVIEW */}

        <PlayerOverview
          player={player}
        />

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

        <PlayerFixtures
          fixtures={fixtures}
        />

        {/* PLAYER TRANSFERS */}

        <PlayerTransfers
          transfers={transfers}
          available={
            transfersAvailable
          }
        />

        {/* PLAYER TROPHIES */}

        <PlayerTrophies
          trophies={trophies}
          available={
            trophiesAvailable
          }
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