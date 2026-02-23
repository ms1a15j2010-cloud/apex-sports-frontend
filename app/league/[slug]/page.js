import Scoreboard from "../../../components/Scoreboard";
import LeagueSkeleton from "../../../components/LeagueSkeleton";

/* ---------- MOCK DATA (replace later with API) ---------- */
const LEAGUE_MATCHES = {
  epl: [
    { id: 1, home: "Arsenal", away: "Chelsea", goalsHome: 2, goalsAway: 1, status: "LIVE" },
    { id: 2, home: "Liverpool", away: "Man City", goalsHome: 0, goalsAway: 0, status: "NS" },
  ],
  laliga: [
    { id: 3, home: "Real Madrid", away: "Barcelona", goalsHome: 3, goalsAway: 2, status: "FT" },
  ],
};

/* ---------- SEO METADATA ---------- */
export async function generateMetadata({ params }) {
  const slug = params.slug?.toUpperCase() ?? "League";

  return {
    title: `${slug} Live Scores | Apex Sports`,
    description: `Live football scores, fixtures, and results for ${slug}.`,
  };
}

/* ---------- PAGE ---------- */
export default async function LeaguePage({ params }) {
  const slug = params.slug;

  const matches = LEAGUE_MATCHES[slug];

  if (!matches) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>League not found</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {slug.toUpperCase()} – Live Matches
      </h1>

      {/* Skeleton shown only if data empty */}
      {matches.length === 0 ? (
        <LeagueSkeleton />
      ) : (
        <Scoreboard matches={matches} />
      )}
    </main>
  );
}
