import Link from "next/link";

/* ---------- SAFE FALLBACK ---------- */
const FALLBACK_MATCH = {
  fixture: {
    id: "X",
    status: { short: "NS" },
    date: new Date().toISOString(),
  },
  teams: {
    home: { name: "Team A" },
    away: { name: "Team B" },
  },
  goals: { home: 0, away: 0 },
};

/* ---------- DATA FETCH ---------- */
async function getMatch(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/match/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    // ✅ Your backend returns the object directly
    return data ?? FALLBACK_MATCH;
  } catch (err) {
    console.error("Match fetch failed:", err);
    return FALLBACK_MATCH;
  }
}

/* ---------- PAGE ---------- */
export default async function MatchPage({ params }) {
  const { id } = await params; // ✅ Required in Next.js 16

  const match = await getMatch(id);

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h1>
        {match.teams.home.name} vs {match.teams.away.name}
      </h1>

      <h2>
        {match.goals.home} - {match.goals.away}
      </h2>

      <p>Status: {match.fixture?.status?.short ?? "NS"}</p>

      <Link href="/">← Back to live scores</Link>
    </main>
  );
}