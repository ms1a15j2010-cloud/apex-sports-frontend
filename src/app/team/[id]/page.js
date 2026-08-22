import Link from "next/link";

import TeamTabs from "@/components/TeamTabs";

import TeamSidebar from "@/components/TeamSidebar";
import TeamHeader from "@/components/TeamHeader";
import TeamOverview from "@/components/TeamOverview";
import TeamVenue from "@/components/TeamVenue";
import TeamCoach from "@/components/TeamCoach";

import TeamStats from "@/components/TeamStats";
import TeamAnalytics from "@/components/TeamAnalytics";
import TeamComparison from "@/components/TeamComparison";

import TeamForm from "@/components/TeamForm";
import TeamFixtures from "@/components/TeamFixtures";
import TeamResults from "@/components/TeamResults";

import TeamSquad from "@/components/TeamSquad";

import TeamHistory from "@/components/TeamHistory";
import TeamAchievements from "@/components/TeamAchievements";
import TeamSocial from "@/components/TeamSocial";

import TeamTransfers from "@/components/TeamTransfers";
import TeamInjuries from "@/components/TeamInjuries";
import TeamTrophies from "@/components/TeamTrophies";

/* =====================================================
CONFIG
===================================================== */

const API = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

const SEASON = 2026;

/* =====================================================
SAFE JSON FETCH
===================================================== */

async function fetchJSON(url, label) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`${label}: HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`❌ ${label} fetch failed:`, error);

    return null;
  }
}

/* =====================================================
TEAM PROFILE
===================================================== */

async function getTeam(id) {
  return await fetchJSON(
    `${API}/api/team/${id}?season=${SEASON}`,
    "Team"
  );
}

/* =====================================================
TEAM STATISTICS
===================================================== */

async function getStatistics(id) {
  const data = await fetchJSON(
    `${API}/api/team/${id}/statistics?season=${SEASON}`,
    "Team Statistics"
  );

  if (!data || data.success !== true) {
    return {
      success: false,
      statistics: null,
    };
  }

  return data;
}

/* =====================================================
TEAM HISTORY
===================================================== */

async function getHistory(id) {
  const data = await fetchJSON(
    `${API}/api/team/${id}/history?season=${SEASON}`,
    "Team History"
  );

  if (!data || data.success !== true) {
    return {
      success: false,
      history: [],
    };
  }

  return data;
}

/* =====================================================
METADATA
===================================================== */

export async function generateMetadata({ params }) {
  const { id } = await params;

  const data = await getTeam(id);

  const team = data?.team || null;

  return {
    title: team?.name
      ? `${team.name} | Apex Sports`
      : "Team | Apex Sports",

    description: team?.name
      ? `${team.name} football team profile, squad, fixtures, statistics, results and history.`
      : "Professional football team profile.",
  };
}

/* =====================================================
TEAM PAGE
===================================================== */

export default async function TeamPage({ params }) {
  const { id } = await params;

  /* =================================================
     ONLY FETCH DATA WE ACTUALLY NEED
  ================================================= */

  const [teamData, statisticsData, historyData] =
    await Promise.all([
      getTeam(id),
      getStatistics(id),
      getHistory(id),
    ]);

  /* =================================================
     TEAM NOT FOUND
  ================================================= */

  if (!teamData?.success || !teamData?.team) {
    return (
      <main className="mx-auto max-w-[1450px] px-5 py-10 text-white">
        <div className="rounded-[20px] border border-slate-800 bg-gray-900 p-10">
          <h1 className="mb-[15px] text-2xl font-bold">
            Team Not Found
          </h1>

          <p className="mb-[30px] text-slate-400">
            We couldn't find this team or the team service is
            currently unavailable.
          </p>

          <Link
            href="/leagues"
            className="font-extrabold text-green-500 no-underline transition hover:text-green-400"
          >
            ← Back to Leagues
          </Link>
        </div>
      </main>
    );
  }

  /* =================================================
     NORMALIZED DATA
  ================================================= */

  const team = teamData.team;

  const players = Array.isArray(team.players)
    ? team.players
    : Array.isArray(team.squad)
      ? team.squad
      : [];

  const fixtures = Array.isArray(team.fixtures)
    ? team.fixtures
    : [];

  const statistics =
    statisticsData?.success && statisticsData.statistics
      ? statisticsData.statistics
      : null;

  const history =
    historyData?.success && Array.isArray(historyData.history)
      ? historyData.history
      : [];

  /* =================================================
     DATA AVAILABILITY

     Current football-data.org adapter
     does not provide these datasets.
  ================================================= */

  const transfers = [];
  const injuries = [];
  const trophies = [];

  const transfersAvailable = false;
  const injuriesAvailable = false;
  const trophiesAvailable = false;

  return (
    <main className="mx-auto max-w-[1450px] px-5 pb-[60px] pt-[30px] text-white">
      {/* =================================================
          TOP TABS
      ================================================= */}

      <TeamTabs />

      {/* =================================================
          PAGE LAYOUT
      ================================================= */}

      <div className="grid grid-cols-1 items-start gap-[25px] lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="min-w-0">
          <TeamSidebar team={team} />
        </aside>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="flex min-w-0 flex-col gap-0">
          {/* =================================================
              HEADER
          ================================================= */}

          <TeamHeader team={team} />

          {/* =================================================
              OVERVIEW
          ================================================= */}

          <TeamOverview team={team} />

          {/* =================================================
              VENUE
          ================================================= */}

          <TeamVenue venue={team.venue} />

          {/* =================================================
              COACH
          ================================================= */}

          <TeamCoach coach={team.coach} />

          {/* =================================================
              STATISTICS
          ================================================= */}

          <TeamStats
            team={team}
            statistics={statistics}
          />

          {/* =================================================
              ANALYTICS
          ================================================= */}

          <TeamAnalytics statistics={statistics} />

          {/* =================================================
              COMPARISON
          ================================================= */}

          <TeamComparison statistics={statistics} />

          {/* =================================================
              FORM
          ================================================= */}

          <TeamForm
            fixtures={fixtures}
            teamId={team.id}
          />

          {/* =================================================
              FIXTURES
          ================================================= */}

          <TeamFixtures fixtures={fixtures} />

          {/* =================================================
              RESULTS
          ================================================= */}

          <TeamResults results={fixtures} />

          {/* =================================================
              SQUAD
          ================================================= */}

          <TeamSquad players={players} />

          {/* =================================================
              HISTORY
          ================================================= */}

          <TeamHistory
            team={team}
            history={history}
          />

          {/* =================================================
              ACHIEVEMENTS
          ================================================= */}

          <TeamAchievements team={team} />

          {/* =================================================
              TRANSFERS
          ================================================= */}

          <TeamTransfers
            transfers={transfers}
            available={transfersAvailable}
          />

          {/* =================================================
              INJURIES
          ================================================= */}

          <TeamInjuries
            injuries={injuries}
            available={injuriesAvailable}
          />

          {/* =================================================
              TROPHIES
          ================================================= */}

          <TeamTrophies
            trophies={trophies}
            available={trophiesAvailable}
          />

          {/* =================================================
              SOCIAL
          ================================================= */}

          <TeamSocial team={team} />
        </div>
      </div>
    </main>
  );
}

