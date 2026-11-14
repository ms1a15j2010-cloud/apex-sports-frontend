import Link from "next/link";

import PlayerHeader from "@/components/PlayerHeader";
import PlayerStatistics from "@/components/PlayerStatistics";
import PlayerFixtures from "@/components/PlayerFixtures";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://apex-sports-backend.vercel.app";

const SEASON = new Date().getMonth() >= 6
  ? new Date().getFullYear()
  : new Date().getFullYear() - 1;

async function getPlayer(id) {
  try {
    const response = await fetch(
      `${API}/api/player/${encodeURIComponent(id)}?season=${SEASON}`,
      { cache: "no-store" }
    );
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.success !== true || !data?.player) {
      return {
        success: false,
        player: null,
        message: data?.message || `Player service returned HTTP ${response.status}.`,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      player: null,
      message: error?.message || "Player information is temporarily unavailable.",
    };
  }
}

async function getFixtures(id) {
  try {
    const response = await fetch(
      `${API}/api/player/${encodeURIComponent(id)}/fixtures?season=${SEASON}`,
      { cache: "no-store" }
    );
    const data = await response.json().catch(() => null);

    return response.ok && data?.success === true && Array.isArray(data.fixtures)
      ? data.fixtures
      : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getPlayer(id);
  const name = data?.player?.name;

  return {
    title: name ? `${name} Player Profile | Apex Sports` : "Football Player | Apex Sports",
    description: name
      ? `Available profile details, current club, season goals, appearances and recent matches for ${name}.`
      : "Football player profile and available season statistics.",
  };
}

export default async function PlayerPage({ params }) {
  const { id } = await params;
  const playerData = await getPlayer(id);

  if (!playerData?.success || !playerData?.player) {
    return (
      <main className="mx-auto my-10 max-w-[1100px] px-5 text-white">
        <h1 className="mb-4 text-3xl font-bold">Player information unavailable</h1>
        <p className="mb-6 text-slate-400">
          {playerData?.message || "We could not retrieve this player profile."}
        </p>
        <Link href="/top-scorers/epl" className="font-bold text-green-500 no-underline">
          ← Back to Premier League top scorers
        </Link>
      </main>
    );
  }

  const player = playerData.player;
  const statistics = Array.isArray(player.statistics) ? player.statistics : [];
  const fixtures = await getFixtures(id);

  return (
    <main className="mx-auto my-10 flex max-w-[1200px] flex-col gap-7 px-5 text-white">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
        <Link href="/" className="text-slate-300 no-underline hover:text-white">Home</Link>
        {" / "}
        <Link href="/top-scorers/epl" className="text-slate-300 no-underline hover:text-white">Premier League top scorers</Link>
        {" / "}
        <span>{player.name}</span>
      </nav>

      <PlayerHeader player={player} />

      {statistics.length > 0 ? (
        <PlayerStatistics statistics={statistics} player={player} />
      ) : (
        <section className="rounded-2xl border border-slate-800 bg-gray-900 p-6">
          <h2 className="text-xl font-bold">Season statistics</h2>
          <p className="mt-2 text-slate-400">
            Detailed season statistics are not available from the current data source.
          </p>
        </section>
      )}

      {fixtures.length > 0 ? (
        <PlayerFixtures fixtures={fixtures} />
      ) : (
        <section className="rounded-2xl border border-slate-800 bg-gray-900 p-6">
          <h2 className="text-xl font-bold">Recent matches</h2>
          <p className="mt-2 text-slate-400">
            Recent match history is not available for this player at the moment.
          </p>
        </section>
      )}

      <p className="text-xs text-slate-500">
        Data source: football-data.org. Statistics not supplied by the provider are shown as unavailable, not as zero.
      </p>
    </main>
  );
}
