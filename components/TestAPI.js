"use client";

import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";
import SkeletonScoreboard from "./SkeletonScoreboard";

const FALLBACK_MATCHES = [
  { id: "1", home: "Team A", away: "Team B", goalsHome: 2, goalsAway: 1, status: "LIVE" },
  { id: "2", home: "Team C", away: "Team D", goalsHome: 0, goalsAway: 0, status: "NS" },
  { id: "3", home: "Team E", away: "Team F", goalsHome: 3, goalsAway: 2, status: "FT" },
];

export default function TestAPI() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMatches() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/live`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      const formatted =
        data?.response?.map((m) => ({
          id: String(m.fixture.id),
          home: m.teams.home.name,
          away: m.teams.away.name,
          goalsHome: m.goals.home ?? 0,
          goalsAway: m.goals.away ?? 0,
          status: m.fixture.status.short,
        })) ?? [];

      setMatches(formatted.length ? formatted : FALLBACK_MATCHES);
    } catch {
      setMatches(FALLBACK_MATCHES);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000); // 🔄 30s refresh
    return () => clearInterval(interval);
  }, []);

  if (loading) return <SkeletonScoreboard />;

  return <Scoreboard matches={matches} />;
}
