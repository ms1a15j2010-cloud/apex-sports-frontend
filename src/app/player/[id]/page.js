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

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   PLAYER PROFILE
===================================================== */

async function getPlayer(id) {
  try {
    const res = await fetch(
      `${API}/api/player/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Player not found");
    }

    return await res.json();
  } catch (err) {
    console.error("Player:", err);

    return {
      success: false,
      player: null,
    };
  }
}

/* =====================================================
   PLAYER STATISTICS
===================================================== */

async function getStatistics(id) {
  try {
    const res = await fetch(
      `${API}/api/player/${id}/statistics`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Statistics not found"
      );
    }

    return await res.json();
  } catch (err) {
    console.error(
      "Statistics:",
      err
    );

    return {
      success: false,
      statistics: null,
    };
  }
}

/* =====================================================
   PLAYER TRANSFERS
===================================================== */

async function getTransfers(id) {
  try {
    const res = await fetch(
      `${API}/api/player/${id}/transfers`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Transfers not found"
      );
    }

    return await res.json();
  } catch (err) {
    console.error(
      "Transfers:",
      err
    );

    return {
      success: false,
      transfers: [],
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

  const data = await getPlayer(id);

  return {
    title: data.success
      ? `${data.player.name} | Apex Sports`
      : "Player | Apex Sports",

    description:
      "Professional football player profile, statistics, career, trophies and transfer history.",
  };
}

export default async function PlayerPage({
  params,
}) {
  const { id } = await params;

  const [
    playerData,
    statData,
    transferData,
  ] = await Promise.all([
    getPlayer(id),
    getStatistics(id),
    getTransfers(id),
  ]);

  /* ============================================
     PLAYER NOT FOUND
  ============================================ */

  if (
    !playerData.success ||
    !playerData.player
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
          We couldn't find this player.
        </p>

        <Link
          href="/search"
          style={{
            color: "#22c55e",
            textDecoration: "none",
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

  const statistics =
    statData.success
      ? statData.statistics
      : player.statistics ||
        {};

  const transfers =
    transferData.success
      ? transferData.transfers
      : player.transfers ||
        [];

  const fixtures =
    player.fixtures || [];

  const trophies =
    player.trophies || [];

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
        {/* ============================================
            PLAYER HEADER
        ============================================ */}

        <PlayerHeader
          player={player}
        />

        {/* ============================================
            PLAYER OVERVIEW
        ============================================ */}

        <PlayerOverview
          player={player}
        />

        {/* ============================================
            PLAYER STATISTICS
        ============================================ */}

        <PlayerStatistics
          statistics={statistics}
          player={player}
        />

        {/* ============================================
            PLAYER PERFORMANCE
        ============================================ */}

        <PlayerPerformance
          statistics={statistics}
        />

        {/* ============================================
            PLAYER CAREER
        ============================================ */}

        <PlayerCareer
          player={player}
          statistics={statistics}
        />

        {/* ============================================
            PLAYER FIXTURES
        ============================================ */}

        <PlayerFixtures
          fixtures={fixtures}
        />

        {/* ============================================
            PLAYER TRANSFERS
        ============================================ */}

        <PlayerTransfers
          transfers={transfers}
        />

        {/* ============================================
            PLAYER TROPHIES
        ============================================ */}

        <PlayerTrophies
          trophies={trophies}
        />

        {/* ============================================
            PLAYER HISTORY
        ============================================ */}

        <PlayerHistory
          player={player}
        />
      </div>
    </main>
  );
}