"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

/* =====================================================
   COMPONENTS
===================================================== */

import MatchHeader from "@/components/MatchHeader";
import MatchScoreboard from "@/components/MatchScoreboard";
import MatchTimeline from "@/components/MatchTimeline";
import MatchStatistics from "@/components/MatchStatistics";
import MatchEvents from "@/components/MatchEvents";
import MatchLineups from "@/components/MatchLineups";
import MatchPlayerRatings from "@/components/MatchPlayerRatings";
import MatchFacts from "@/components/MatchFacts";
import MatchHeadToHead from "@/components/MatchHeadToHead";
import MatchStandings from "@/components/MatchStandings";
import MatchPrediction from "@/components/MatchPrediction";
import MatchSidebar from "@/components/MatchSidebar";

/* =====================================================
   API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://apex-sports-backend.vercel.app";

/* =====================================================
   FETCH MATCH

   IMPORTANT:

   The Match Center now uses ONE backend endpoint:

   /api/match/:id

   This is the migrated football-data.org endpoint.

   We do NOT call:

   /events
   /timeline
   /statistics
   /lineups
   /players
   /headtohead
   /standings
   /prediction

   separately from the frontend.

===================================================== */

async function fetchMatch(matchId) {
  if (!matchId) {
    throw new Error("Match ID is missing");
  }

  const response = await fetch(
    `${API}/api/match/${encodeURIComponent(matchId)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Match API returned ${response.status}`
    );
  }

  const data = await response.json();

  if (
    !data ||
    data.success !== true ||
    !data.match
  ) {
    throw new Error(
      data?.message ||
        "Match data is unavailable"
    );
  }

  return data;
}

/* =====================================================
   GET POLLING INTERVAL

   We only poll matches that can actually change.

   NS / FT:
   No polling.

   LIVE:
   15 seconds.

   HT:
   20 seconds.

   Unknown active status:
   30 seconds.
===================================================== */

function getPollingInterval(status) {
  const value = String(
    status || ""
  ).toUpperCase();

  if (
    value === "LIVE" ||
    value === "IN_PLAY"
  ) {
    return 15000;
  }

  if (
    value === "HT" ||
    value === "PAUSED"
  ) {
    return 20000;
  }

  return 0;
}

/* =====================================================
   NORMALIZE DATA

   Keep all match-center data derived from the single
   backend response.

   No fake values are generated.
===================================================== */

function normalizeMatchData(data) {
  const match = data?.match || null;

  if (!match) {
    return {
      match: null,
      timeline: [],
      events: [],
      statistics: [],
      lineups: [],
      playerRatings: [],
      facts: {},
      headToHead: [],
      standings: [],
      prediction: null,
    };
  }

  const events =
    Array.isArray(match.events)
      ? match.events
      : Array.isArray(match.goals)
      ? match.goals
      : [];

  const lineups =
    Array.isArray(match.lineups)
      ? match.lineups
      : [];

  return {
    match,

    timeline: events,

    events,

    statistics:
      Array.isArray(match.statistics)
        ? match.statistics
        : [],

    lineups,

    playerRatings:
      Array.isArray(match.players)
        ? match.players
        : [],

    facts:
      match.fixture ||
      match.raw ||
      {},

    headToHead:
      Array.isArray(match.headtohead)
        ? match.headtohead
        : [],

    standings:
      Array.isArray(match.standings)
        ? match.standings
        : [],

    prediction:
      match.prediction || null,
  };
}

/* =====================================================
   COMPONENT
===================================================== */

export default function MatchClient({
  matchId,
  initialData = null,
}) {
  const initial = normalizeMatchData(initialData);

  /* ==========================================
     STATE
  ========================================== */

  const [match, setMatch] = useState(initial.match);

  const [
    timeline,
    setTimeline,
  ] = useState(initial.timeline);

  const [
    events,
    setEvents,
  ] = useState(initial.events);

  const [
    statistics,
    setStatistics,
  ] = useState(initial.statistics);

  const [
    lineups,
    setLineups,
  ] = useState(initial.lineups);

  const [
    playerRatings,
    setPlayerRatings,
  ] = useState(initial.playerRatings);

  const [
    facts,
    setFacts,
  ] = useState(initial.facts);

  const [
    headToHead,
    setHeadToHead,
  ] = useState(initial.headToHead);

  const [
    standings,
    setStandings,
  ] = useState(initial.standings);

  const [
    prediction,
    setPrediction,
  ] = useState(initial.prediction);

  const [
    loading,
    setLoading,
  ] = useState(!initialData);

  const [
    error,
    setError,
  ] = useState(
    initialData?.success === false
      ? initialData.message || "Match data is unavailable."
      : null
  );

  /* ==========================================
     LOAD MATCH
  ========================================== */

  const loadMatch = useCallback(
    async () => {
      try {
        const data =
          await fetchMatch(matchId);

        const normalized =
          normalizeMatchData(data);

        setMatch(
          normalized.match
        );

        setTimeline(
          normalized.timeline
        );

        setEvents(
          normalized.events
        );

        setStatistics(
          normalized.statistics
        );

        setLineups(
          normalized.lineups
        );

        setPlayerRatings(
          normalized.playerRatings
        );

        setFacts(
          normalized.facts
        );

        setHeadToHead(
          normalized.headToHead
        );

        setStandings(
          normalized.standings
        );

        setPrediction(
          normalized.prediction
        );

        setLoading(false);
        setError(null);

        return normalized.match;
      } catch (err) {
        console.error(
          "❌ MatchClient:",
          err
        );

        setError(
          err?.message ||
            "Unable to load match"
        );

        setLoading(false);

        return null;
      }
    },
    [matchId]
  );

  /* ==========================================
     LOAD + LIVE POLLING
  ========================================== */

  useEffect(() => {
    if (!matchId) {
      setError(
        "Match ID is missing"
      );

      setLoading(false);

      return;
    }

    let timer = null;
    let cancelled = false;

    async function initialize() {
      const loadedMatch =
        initialData?.match || await loadMatch();

      if (
        cancelled ||
        !loadedMatch
      ) {
        return;
      }

      const currentStatus =
        loadedMatch?.status?.short ||
        loadedMatch?.rawStatus ||
        "NS";

      const interval =
        getPollingInterval(
          currentStatus
        );

      if (interval <= 0) {
        return;
      }

      timer = setInterval(
        async () => {
          if (!cancelled) {
            await loadMatch();
          }
        },
        interval
      );
    }

    initialize();

    return () => {
      cancelled = true;

      if (timer) {
        clearInterval(timer);
      }
    };
  }, [matchId, loadMatch, initialData?.match]);

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <main className="mx-auto my-[60px] w-full max-w-[1200px] px-5 text-center text-white">
        <h2 className="m-0 text-2xl font-bold">
          Loading Match...
        </h2>

        <p className="mt-3 text-slate-400">
          Fetching match information...
        </p>
      </main>
    );
  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error || !match) {
    return (
      <main className="mx-auto my-[60px] w-full max-w-[1200px] px-5 text-center text-white">
        <h2 className="m-0 text-2xl font-bold">
          Unable to Load Match
        </h2>

        <p className="mt-[15px] text-slate-400">
          {error ||
            "Match data is unavailable."}
        </p>
      </main>
    );
  }

  /* ==========================================
     PAGE
  ========================================== */

  return (
    <main className="mx-auto my-10 grid w-full max-w-[1500px] grid-cols-1 items-start gap-5 px-5 text-white lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-[30px]">
      {/* ======================================
          LEFT SIDEBAR
      ====================================== */}

      <div className="match-sidebar min-w-0">
        <MatchSidebar
          match={match}
        />
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="match-content min-w-0">
        {/* Match Header */}

        <MatchHeader
          match={match}
        />

        {/* Scoreboard */}

        <MatchScoreboard
          match={match}
        />

        {/* Timeline */}

        <MatchTimeline
          timeline={timeline}
        />

        {/* Statistics */}

        <MatchStatistics
          statistics={statistics}
        />

        {/* Match Events */}

        <MatchEvents
          events={events}
        />

        {/* Lineups */}

        <MatchLineups
          lineups={lineups}
        />

        {/* Player Ratings */}

        <MatchPlayerRatings
          lineups={lineups}
          players={playerRatings}
        />

        {/* Match Facts */}

        <MatchFacts
          match={match}
          statistics={statistics}
          facts={facts}
        />

        {/* Head To Head */}

        <MatchHeadToHead
          h2h={headToHead}
        />

        {/* League Standings */}

        <MatchStandings
          standings={standings}
        />

        {/* Prediction */}

        <MatchPrediction
          prediction={prediction}
        />
      </div>
    </main>
  );
}

