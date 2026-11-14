import Link from "next/link";

import TeamTabs from "@/components/TeamTabs";
import TeamSidebar from "@/components/TeamSidebar";
import TeamHeader from "@/components/TeamHeader";
import TeamOverview from "@/components/TeamOverview";
import TeamVenue from "@/components/TeamVenue";
import TeamCoach from "@/components/TeamCoach";
import TeamStats from "@/components/TeamStats";
import TeamForm from "@/components/TeamForm";
import TeamFixtures from "@/components/TeamFixtures";
import TeamResults from "@/components/TeamResults";
import TeamSquad from "@/components/TeamSquad";
import TeamSocial from "@/components/TeamSocial";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://apex-sports-backend.vercel.app";

const SEASON = new Date().getMonth() >= 6
  ? new Date().getFullYear()
  : new Date().getFullYear() - 1;

async function fetchJSON(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json().catch(() => null);
    return response.ok ? data : null;
  } catch {
    return null;
  }
}

async function getTeam(id) {
  return fetchJSON(
    `${API}/api/team/${encodeURIComponent(id)}?season=${SEASON}`
  );
}

async function getStatistics(id) {
  return fetchJSON(
    `${API}/api/team/${encodeURIComponent(id)}/statistics?season=${SEASON}`
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getTeam(id);
  const team = data?.team || null;

  return {
    title: team?.name ? `${team.name} Team Profile | Apex Sports` : "Football Team Profile | Apex Sports",
    description: team?.name
      ? `Club profile, squad, fixtures, results and available season statistics for ${team.name}.`
      : "Football club profile, squad, fixtures and available season information.",
  };
}

export default async function TeamPage({ params }) {
  const { id } = await params;

  const [teamData, statisticsData] = await Promise.all([
    getTeam(id),
    getStatistics(id),
  ]);

  if (!teamData?.success || !teamData?.team) {
    return (
      <main className="mx-auto max-w-[1100px] px-5 py-10 text-white">
        <h1 className="mb-4 text-3xl font-bold">Team information unavailable</h1>
        <p className="mb-6 text-slate-400">
          We could not retrieve this club profile or the team service is temporarily unavailable.
        </p>
        <Link href="/standings/epl" className="font-bold text-green-500 no-underline">
          ← Back to Premier League standings
        </Link>
      </main>
    );
  }

  const team = teamData.team;
  const players = Array.isArray(team.players)
    ? team.players
    : Array.isArray(team.squad)
      ? team.squad
      : [];
  const fixtures = Array.isArray(team.fixtures) ? team.fixtures : [];
  const statistics =
    statisticsData?.success && statisticsData.statistics
      ? statisticsData.statistics
      : null;

  const venue = team.venue &&
    (team.venue.name || team.venue.city || team.venue.address)
      ? team.venue
      : null;
  const coach = team.coach?.name || team.coach?.firstName || team.coach?.lastName
    ? team.coach
    : null;

  const hasCompletedFixtures = fixtures.some((match) =>
    ["FINISHED", "AWARDED", "FT"].includes(match?.status)
  );

  const sectionIds = ["overview", "results", "social"];
  if (venue) sectionIds.push("venue");
  if (coach) sectionIds.push("coach");
  if (statistics) sectionIds.push("statistics");
  if (hasCompletedFixtures) sectionIds.push("form");
  if (fixtures.length > 0) sectionIds.push("fixtures");
  if (players.length > 0) sectionIds.push("squad");

  return (
    <main className="mx-auto max-w-[1450px] px-5 pb-[60px] pt-[30px] text-white">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-400">
        <Link href="/" className="text-slate-300 no-underline hover:text-white">Home</Link>
        {" / "}
        <Link href="/standings/epl" className="text-slate-300 no-underline hover:text-white">Premier League standings</Link>
        {" / "}
        <span>{team.name}</span>
      </nav>

      <TeamTabs sectionIds={sectionIds} />

      <div className="grid grid-cols-1 items-start gap-[25px] lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <TeamSidebar team={team} sectionIds={sectionIds} />
        </aside>

        <div className="flex min-w-0 flex-col">
          <TeamHeader team={team} />
          <TeamOverview team={team} />

          {venue && <TeamVenue venue={venue} />}
          {coach && <TeamCoach coach={coach} />}
          {statistics && <TeamStats team={team} statistics={statistics} />}

          {hasCompletedFixtures && <TeamForm fixtures={fixtures} teamId={team.id} />}
          {fixtures.length > 0 && <TeamFixtures fixtures={fixtures} />}
          <TeamResults results={fixtures} />
          {players.length > 0 && <TeamSquad players={players} />}

          <TeamSocial team={team} />

          <p className="mt-2 text-xs text-slate-500">
            Club and match information is supplied by football-data.org. Sections are shown only when supporting data is available.
          </p>
        </div>
      </div>
    </main>
  );
}
