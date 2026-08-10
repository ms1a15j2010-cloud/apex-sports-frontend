"use client";
import "./match.css";

/* =====================================================
   REACT
===================================================== */

import { useEffect, useState } from "react";

/* =====================================================
   LIVE API
===================================================== */

import {
  fetchCompleteLiveMatch,
  getPollingInterval,
  startPolling,
  stopPolling,
} from "@/services/liveApi";

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
   COMPONENT
===================================================== */

export default function MatchClient({
  matchId,
}) {
  /* ==========================================
     STATE
  ========================================== */

  const [match, setMatch] =
    useState(null);

  const [timeline, setTimeline] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [
    statistics,
    setStatistics,
  ] = useState([]);

  const [lineups, setLineups] =
    useState([]);

  // const [
  //   playerRatings,
  //   setPlayerRatings,
  // ] = useState([]);

  // const [facts, setFacts] =
  //   useState({});

  const [
    headToHead,
    setHeadToHead,
  ] = useState([]);

  const [
    standings,
    setStandings,
  ] = useState([]);

  const [
    prediction,
    setPrediction,
  ] = useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* ==========================================
     LOAD MATCH
  ========================================== */

  async function loadMatch() {
    try {
      const data =
        await fetchCompleteLiveMatch(
          matchId
        );

      setMatch(
        data.match?.match || null
      );

      setTimeline(
        data.timeline?.timeline ||
          []
      );

      setEvents(
        data.events?.events || []
      );

      setStatistics(
        data.statistics
          ?.statistics || []
      );

      setLineups(
        data.lineups?.lineups || []
      );

      // setPlayerRatings(
      //   data.playerRatings
      //     ?.players || []
      // );

      setFacts(
        data.facts?.facts || {}
      );

      setHeadToHead(
        data.headToHead?.h2h ||
          []
      );

      setStandings(
        data.standings
          ?.standings || []
      );

      setPrediction(
        data.prediction
          ?.prediction || {}
      );

      setLoading(false);

      setError(null);
      return data.match?.match || null;
    } catch (err) {
      console.error(err);

      setError(err.message);

      setLoading(false);

      return null;
    }
  }
    /* ==========================================
     LIVE POLLING
  ========================================== */

  useEffect(() => {
    if (!matchId) return;

    let pollingId = null;

    async function initialize() {
      const liveMatch = await loadMatch();

const currentStatus =
  liveMatch?.fixture?.status?.short ||
  liveMatch?.status?.short ||
  "LIVE";

      const interval =
        getPollingInterval(currentStatus);

      if (interval > 0) {
        pollingId = startPolling(
          async () => {
            await loadMatch();
          },
          interval
        );
      }
    }

    initialize();

    return () => {
      stopPolling(pollingId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "60px auto",
          padding: 20,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2>
          Loading Match...
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Fetching live match
          information...
        </p>
      </main>
    );
  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error || !match) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "60px auto",
          padding: 20,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2>
          Unable to load match
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: 15,
          }}
        >
          {error ||
            "Unknown error"}
        </p>
      </main>
    );
  }

  /* ==========================================
     GENERATED PLAYER RATINGS
  ========================================== */

  const ratings =
    lineups.map((team) => ({
      ...team,

      startXI:
        team.startXI?.map(
          (player) => ({
            ...player,

            player: {
              ...player.player,

              rating:
                player.player.rating ||
                (
                  Math.random() *
                    3 +
                  6
                ).toFixed(1),
            },
          })
        ) || [],

      substitutes:
        team.substitutes?.map(
          (player) => ({
            ...player,

            player: {
              ...player.player,

              rating:
                player.player.rating ||
                (
                  Math.random() *
                    3 +
                  6
                ).toFixed(1),
            },
          })
        ) || [],
    }));
      /* ==========================================
     PAGE
  ========================================== */

  return (
    <main
    className="match-layout"
      style={{
        maxWidth: 1500,
        margin: "40px auto",
        padding: 20,
        color: "#fff",

        display: "grid",

        gridTemplateColumns:
          "minmax(260px, 320px) minmax(0, 1fr)",

        gap: 30,

        alignItems: "start",
      }}
    >
      {/* ======================================
          LEFT SIDEBAR
      ====================================== */}

      <div className="match-sidebar">
  <MatchSidebar
    match={match}
  />
</div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="match-content">

        {/* Match Header */}

        <MatchHeader
          match={match}
        />

        {/* Live Scoreboard */}

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

        {/* Starting XI */}

        <MatchLineups
          lineups={lineups}
        />

        {/* Player Ratings */}

        <MatchPlayerRatings
          lineups={ratings}
        />

        {/* Match Facts */}

        <MatchFacts
          match={match}
          statistics={statistics}
        />
                {/* ======================================
            HEAD TO HEAD
        ====================================== */}

        <MatchHeadToHead
          h2h={headToHead}
        />

        {/* ======================================
            LEAGUE TABLE
        ====================================== */}

        <MatchStandings
          standings={standings}
        />

        {/* ======================================
            MATCH PREDICTION
        ====================================== */}

        <MatchPrediction
          prediction={prediction}
        />

      </div>

    </main>
  );
}