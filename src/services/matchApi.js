// src/services/matchApi.js
import api from "./api";

/* =====================================================
   MATCH DETAILS
===================================================== */

export const getMatch = (matchId) =>
  api.get(`/api/match/${matchId}`);

/* =====================================================
   MATCH TIMELINE
===================================================== */

export const getTimeline = (matchId) =>
  api.get(`/api/match/${matchId}/timeline`);

/* =====================================================
   MATCH EVENTS
===================================================== */

export const getEvents = (matchId) =>
  api.get(`/api/match/${matchId}/events`);

/* =====================================================
   MATCH STATISTICS
===================================================== */

export const getStatistics = (matchId) =>
  api.get(`/api/match/${matchId}/statistics`);

/* =====================================================
   MATCH LINEUPS
===================================================== */

export const getLineups = (matchId) =>
  api.get(`/api/match/${matchId}/lineups`);

/* =====================================================
   PLAYER RATINGS
===================================================== */

export const getPlayerRatings = (matchId) =>
  api.get(`/api/match/${matchId}/players`);

/* =====================================================
   MATCH FACTS
===================================================== */

export const getFacts = (matchId) =>
  api.get(`/api/match/${matchId}/facts`);

/* =====================================================
   HEAD TO HEAD
===================================================== */

export const getHeadToHead = (matchId) =>
  api.get(`/api/match/${matchId}/headtohead`);

/* =====================================================
   STANDINGS
===================================================== */

export const getStandings = (matchId) =>
  api.get(`/api/match/${matchId}/standings`);

/* =====================================================
   PREDICTION
===================================================== */

export const getPrediction = (matchId) =>
  api.get(`/api/match/${matchId}/prediction`);

/* =====================================================
   COMPLETE MATCH
===================================================== */

export async function getCompleteMatch(matchId) {
  try {
    const [
      match,
      timeline,
      events,
      statistics,
      lineups,
      playerRatings,
      facts,
      headToHead,
      standings,
      prediction,
    ] = await Promise.all([
      getMatch(matchId),
      getTimeline(matchId),
      getEvents(matchId),
      getStatistics(matchId),
      getLineups(matchId),
      getPlayerRatings(matchId),
      getFacts(matchId),
      getHeadToHead(matchId),
      getStandings(matchId),
      getPrediction(matchId),
    ]);

    return {
      match,
      timeline,
      events,
      statistics,
      lineups,
      playerRatings,
      facts,
      headToHead,
      standings,
      prediction,
    };
  } catch (error) {
    console.error("Failed to load complete match:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/* =====================================================
   EXPORT DEFAULT
===================================================== */

const matchApi = {
  getMatch,
  getTimeline,
  getEvents,
  getStatistics,
  getLineups,
  getPlayerRatings,
  getFacts,
  getHeadToHead,
  getStandings,
  getPrediction,
  getCompleteMatch,
};

export default matchApi;