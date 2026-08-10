import Link from "next/link";

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
import TeamSquad from "@/components/TeamSquad";
import TeamAchievements from "@/components/TeamAchievements";
import TeamHistory from "@/components/TeamHistory";
import TeamSocial from "@/components/TeamSocial";
import TeamExtra from "@/components/TeamExtra";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

async function getTeam(id) {
  try {
    const res = await fetch(
      `${API}/api/team/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Team not found");

    return await res.json();
  } catch (err) {
    console.error(err);

    return {
      success: false,
      team: null,
    };
  }
}

async function getPlayers(id) {
  try {
    const res = await fetch(
      `${API}/api/team/${id}/players`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error();

    return await res.json();
  } catch {
    return {
      success: false,
      players: [],
    };
  }
}

async function getStatistics(id) {
  try {
    const res = await fetch(
      `${API}/api/team/${id}/statistics`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error();

    return await res.json();
  } catch {
    return {
      success: false,
      statistics: null,
    };
  }
}

export async function generateMetadata({
  params,
}) {
  const { id } = await params;

  const data = await getTeam(id);

  return {
    title: data.success
      ? `${data.team.name} | Apex Sports`
      : "Team | Apex Sports",

    description:
      "Professional football team profile",
  };
}

export default async function TeamPage({
  params,
}) {
  const { id } = await params;

  const [
    teamData,
    playerData,
    statData,
  ] = await Promise.all([
    getTeam(id),
    getPlayers(id),
    getStatistics(id),
  ]);

  if (!teamData.success || !teamData.team) {
    return (
      <main
        style={{
          maxWidth: 1450,
          margin: "40px auto",
          padding: 20,
          color: "#fff",
        }}
      >
        <h1>Team Not Found</h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: 30,
          }}
        >
          We couldn't find this team.
        </p>

        <Link
          href="/leagues"
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to Leagues
        </Link>
      </main>
    );
  }

  const team = teamData.team;

  const statistics =
    statData.success
      ? statData.statistics
      : team.statistics;

  const players =
    playerData.success
      ? playerData.players
      : team.players;

  return (
    <main
      style={{
        maxWidth: 1450,
        margin: "40px auto",
        padding: 20,
        color: "#fff",
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 25,
        alignItems: "start",
      }}
    >
      {/* Sidebar */}

      <div>
        <TeamSidebar team={team} />
      </div>

      {/* Main */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <TeamHeader team={team} />

        <TeamOverview team={team} />

        <TeamVenue venue={team.venue} />

        <TeamCoach coach={team.coach} />

        <TeamStats
          team={team}
          statistics={statistics}
        />

        <TeamAnalytics
          statistics={statistics}
        />

        <TeamComparison
          statistics={statistics}
        />

        <TeamAchievements
  team={team}
/>
<TeamHistory
  team={team}
/>

<TeamSocial
  team={team}
/>
        <TeamForm
          fixtures={team.fixtures}
          teamId={team.id}
        />

        <TeamFixtures
          fixtures={team.fixtures}
        />

        <TeamSquad
          players={players}
        />

        <TeamExtra team={team} />
      </div>
    </main>
  );
}