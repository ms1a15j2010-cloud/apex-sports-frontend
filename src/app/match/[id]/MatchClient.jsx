"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import MatchHeader from "@/components/MatchHeader";
import MatchTimeline from "@/components/MatchTimeline";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://apex-sports-backend.vercel.app";

async function fetchMatch(matchId) {
  if (!matchId) {
    throw new Error("Match ID is missing");
  }

  const response = await fetch(
    `${API}/api/match/${encodeURIComponent(matchId)}`,
    { cache: "no-store" }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.success !== true || !data?.match) {
    throw new Error(
      data?.message || `Match API returned HTTP ${response.status}`
    );
  }

  return data;
}

function getPollingInterval(status) {
  const value = String(status || "").toUpperCase();

  if (["LIVE", "IN_PLAY", "1H", "2H", "ET", "P", "PEN"].includes(value)) return 15000;
  if (value === "HT" || value === "PAUSED") return 20000;

  return 0;
}

function normalizeMatchData(data) {
  const match = data?.match || null;

  return {
    match,
    timeline: Array.isArray(match?.events)
      ? match.events
      : Array.isArray(match?.goals)
        ? match.goals
        : [],
  };
}

export default function MatchClient({
  matchId,
  initialData = null,
}) {
  const initial = normalizeMatchData(initialData);

  const [match, setMatch] = useState(initial.match);
  const [timeline, setTimeline] = useState(initial.timeline);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(
    initialData?.success === false
      ? initialData.message || "Match information is unavailable."
      : null
  );

  const loadMatch = useCallback(async () => {
    try {
      const data = await fetchMatch(matchId);
      const normalized = normalizeMatchData(data);

      setMatch(normalized.match);
      setTimeline(normalized.timeline);
      setError(null);
      setLoading(false);

      return normalized.match;
    } catch (err) {
      setError(err?.message || "Unable to load match information.");
      setLoading(false);
      return null;
    }
  }, [matchId]);

  useEffect(() => {
    let cancelled = false;
    let timer = null;

    async function initialize() {
      const loadedMatch =
        initialData?.match || await loadMatch();

      if (cancelled || !loadedMatch) return;

      const status =
        loadedMatch?.status?.short ||
        loadedMatch?.rawStatus ||
        "NS";

      const interval = getPollingInterval(status);

      if (interval > 0) {
        timer = setInterval(() => {
          if (!cancelled) loadMatch();
        }, interval);
      }
    }

    initialize();

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [matchId, loadMatch, initialData?.match]);

  if (loading) {
    return (
      <main className="mx-auto my-[60px] w-full max-w-[1100px] px-5 text-center text-white">
        <h1 className="text-2xl font-bold">Loading match information…</h1>
      </main>
    );
  }

  if (error || !match) {
    return (
      <main className="mx-auto my-[60px] w-full max-w-[1100px] px-5 text-center text-white">
        <h1 className="text-2xl font-bold">Match information unavailable</h1>
        <p className="mt-3 text-slate-400">
          {error || "We could not retrieve this match."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto my-10 flex w-full max-w-[1100px] flex-col gap-6 px-5 text-white">
      <MatchHeader match={match} />

      {timeline.length > 0 ? (
        <MatchTimeline timeline={timeline} />
      ) : (
        <section className="rounded-[18px] border border-slate-800 bg-gray-900 p-6">
          <h2 className="text-xl font-bold">Goal timeline</h2>
          <p className="mt-2 text-slate-400">
            No goal events have been reported for this match.
          </p>
        </section>
      )}
    </main>
  );
}
