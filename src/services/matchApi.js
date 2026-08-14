// src/services/matchApi.js
import api from "./api";

/* =====================================================
   MATCH DETAILS
===================================================== */

export const getMatch = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}`);

/* =====================================================
   MATCH TIMELINE
===================================================== */

export const getTimeline = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/timeline`);

/* =====================================================
   MATCH EVENTS
===================================================== */

export const getEvents = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/events`);

/* =====================================================
   MATCH STATISTICS
===================================================== */

export const getStatistics = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/statistics`);

/* =====================================================
   MATCH LINEUPS
===================================================== */

export const getLineups = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/lineups`);

/* =====================================================
   PLAYER RATINGS
===================================================== */

export const getPlayerRatings = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/players`);

/* =====================================================
   MATCH FACTS
===================================================== */

export const getFacts = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/facts`);

/* =====================================================
   HEAD TO HEAD
===================================================== */

export const getHeadToHead = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/headtohead`);

/* =====================================================
   STANDINGS
===================================================== */

export const getStandings = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/standings`);

/* =====================================================
   PREDICTION
===================================================== */

export const getPrediction = (matchId) =>
  api.request(`/api/match/${encodeURIComponent(matchId)}/prediction`);

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