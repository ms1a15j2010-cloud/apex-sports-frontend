/* =========================================================
   APEX SPORTS FRONTEND API SERVICE
   ========================================================= */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =========================================================
   GENERIC REQUEST
   ========================================================= */

async function request(endpoint, options = {}) {
  const controller = new AbortController();

 const timeout = setTimeout(() => {
  controller.abort();
}, 30000);

  try {
    const response = await fetch(`${API}${endpoint}`, {
  cache: "no-store",
  signal: controller.signal,
  headers: {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  },
  ...options,
});

    clearTimeout(timeout);

    const text = await response.text();

    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    }

    if (!response.ok) {
  return {
    success: false,
    status: response.status,
    message:
      data?.message ||
      response.statusText ||
      `Request failed (${response.status})`,
    apiLimitReached:
      response.status === 429,
    data,
  };
}

    if (!data) {
      throw new Error(
        "Invalid JSON response from server"
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeout);

    if (
      error?.name ===
      "AbortError"
    ) {
      throw new Error(
        "Request timeout"
      );
    }

    throw error;
  }
}

/* =========================================================
   DASHBOARD API
   ========================================================= */

const dashboard = {
  /* -----------------------------------------
     Dashboard Hero
     GET /api/dashboard/hero
  ----------------------------------------- */

  getDashboardHero: (
    season = 2026
  ) =>
    request(
      `/api/dashboard/hero?season=${encodeURIComponent(
        season
      )}`
    ),

  /* -----------------------------------------
     Dashboard
     -----------------------------------------
     Kept for compatibility with older
     Dashboard components.
  ----------------------------------------- */

  getDashboard: () =>
    request(
      "/api/dashboard/hero?season=2026"
    ),

  /* -----------------------------------------
     Featured Match
     GET /api/dashboard/featured
  ----------------------------------------- */

  getFeaturedMatch: () =>
    request(
      "/api/dashboard/featured"
    ),

  /* -----------------------------------------
     Live Matches
     GET /api/dashboard/live
  ----------------------------------------- */

  getLiveMatches: () =>
    request(
      "/api/dashboard/live"
    ),

  /* -----------------------------------------
     Today Matches
     GET /api/dashboard/today
  ----------------------------------------- */

  getTodayMatches: (
    date = ""
  ) => {
    const query = date
      ? `?date=${encodeURIComponent(date)}`
      : "";

    return request(
      `/api/dashboard/today${query}`
    );
  },

  /* -----------------------------------------
     Top Leagues
     GET /api/dashboard/leagues
  ----------------------------------------- */

  getTopLeagues: (
    season = 2026
  ) =>
    request(
      `/api/dashboard/leagues?season=${encodeURIComponent(
        season
      )}`
    ),

  /* -----------------------------------------
     Trending Teams
     GET /api/dashboard/teams
  ----------------------------------------- */

  getTrendingTeams: (
    season = 2026
  ) =>
    request(
      `/api/dashboard/teams?season=${encodeURIComponent(
        season
      )}`
    ),

  /* -----------------------------------------
     Latest Results
     GET /api/dashboard/results
  ----------------------------------------- */

  getLatestResults: () =>
    request(
      "/api/dashboard/results"
    ),

  /* -----------------------------------------
     Mini Top Scorers
     GET /api/dashboard/topscorers
  ----------------------------------------- */

  getTopScorersMini: () =>
    request(
      "/api/dashboard/topscorers"
    ),

  /* -----------------------------------------
     Mini Standings
     GET /api/dashboard/standings
  ----------------------------------------- */

  getStandingsMini: () =>
    request(
      "/api/dashboard/standings"
    ),
};

/* =========================================================
   MATCH API
   ========================================================= */

const match = {
  /* -----------------------------------------
     Match Details
     GET /api/match/:id
  ----------------------------------------- */

  getMatch: (
    id
  ) =>
    request(
      `/api/match/${id}`
    ),

  /* -----------------------------------------
     Match Events
     GET /api/match/:id/events
  ----------------------------------------- */

  getEvents: (
    id
  ) =>
    request(
      `/api/match/${id}/events`
    ),

  /* -----------------------------------------
     Match Timeline
     GET /api/match/:id/timeline
  ----------------------------------------- */

  getTimeline: (
    id
  ) =>
    request(
      `/api/match/${id}/timeline`
    ),

  /* -----------------------------------------
     Match Statistics
     GET /api/match/:id/statistics
  ----------------------------------------- */

  getStatistics: (
    id
  ) =>
    request(
      `/api/match/${id}/statistics`
    ),

  /* -----------------------------------------
     Match Lineups
     GET /api/match/:id/lineups
  ----------------------------------------- */

  getLineups: (
    id
  ) =>
    request(
      `/api/match/${id}/lineups`
    ),

  /* -----------------------------------------
     Player Statistics
     GET /api/match/:id/players
  ----------------------------------------- */

  getPlayerStatistics: (
    id
  ) =>
    request(
      `/api/match/${id}/players`
    ),

  /* -----------------------------------------
     Match Facts
     GET /api/match/:id/facts
  ----------------------------------------- */

  getFacts: (
    id
  ) =>
    request(
      `/api/match/${id}/facts`
    ),

  /* -----------------------------------------
     Head To Head
     GET /api/match/:id/headtohead
  ----------------------------------------- */

  getHeadToHead: (
    id
  ) =>
    request(
      `/api/match/${id}/headtohead`
    ),

  /* -----------------------------------------
     Match Standings
     GET /api/match/:id/standings
  ----------------------------------------- */

  getStandings: (
    id
  ) =>
    request(
      `/api/match/${id}/standings`
    ),

  /* -----------------------------------------
     Match Prediction
     GET /api/match/:id/prediction
  ----------------------------------------- */

  getPrediction: (
    id
  ) =>
    request(
      `/api/match/${id}/prediction`
    ),
};

/* =========================================================
   TEAM API
   ========================================================= */

const team = {
  getTeam: (
    id
  ) =>
    request(
      `/api/team/${id}`
    ),

  getPlayers: (
    id
  ) =>
    request(
      `/api/team/${id}/players`
    ),

  getStatistics: (
    id
  ) =>
    request(
      `/api/team/${id}/statistics`
    ),
};

/* =========================================================
   PLAYER API
   ========================================================= */

const player = {
  getPlayer: (
    id
  ) =>
    request(
      `/api/player/${id}`
    ),

  getTransfers: (
    id
  ) =>
    request(
      `/api/player/${id}/transfers`
    ),

  getTrophies: (
    id
  ) =>
    request(
      `/api/player/${id}/trophies`
    ),
};

/* =========================================================
   LEAGUE API
   ========================================================= */

const league = {
  getLeague: (
    id
  ) =>
    request(
      `/api/league/${id}`
    ),

  getFixtures: (
    id,
    season = 2026
  ) =>
    request(
      `/api/league/${id}/fixtures?season=${encodeURIComponent(
        season
      )}`
    ),

  getStandings: (
    id,
    season = 2026
  ) =>
    request(
      `/api/league/${id}/standings?season=${encodeURIComponent(
        season
      )}`
    ),

  getTopScorers: (
    id,
    season = 2026
  ) =>
    request(
      `/api/league/${id}/topscorers?season=${encodeURIComponent(
        season
      )}`
    ),
};

/* =========================================================
   SEARCH API
   ========================================================= */

const search = {
  query: (
    text
  ) =>
    request(
      `/api/search?q=${encodeURIComponent(
        text
      )}`
    ),
};

/* =========================================================
   MAIN API OBJECT
   ========================================================= */

const api = {
  /* -----------------------------------------
     Generic
  ----------------------------------------- */

  request,

  /* -----------------------------------------
     Namespaced APIs
  ----------------------------------------- */

  dashboard,
  match,
  team,
  player,
  league,
  search,

  /* =====================================================
     DASHBOARD SHORTCUTS
  ===================================================== */

  getDashboard:
    dashboard.getDashboard,

  getDashboardHero:
    dashboard.getDashboardHero,

  getFeaturedMatch:
    dashboard.getFeaturedMatch,

  getLiveMatches:
    dashboard.getLiveMatches,

  getTodayMatches:
    dashboard.getTodayMatches,

  getTopLeagues:
    dashboard.getTopLeagues,

  getTrendingTeams:
    dashboard.getTrendingTeams,

  getLatestResults:
    dashboard.getLatestResults,

  getTopScorersMini:
    dashboard.getTopScorersMini,

  getStandingsMini:
    dashboard.getStandingsMini,

  /* =====================================================
     MATCH SHORTCUTS
  ===================================================== */

  getMatch:
    match.getMatch,

  getMatchEvents:
    match.getEvents,

  getMatchTimeline:
    match.getTimeline,

  getMatchStatistics:
    match.getStatistics,

  getMatchLineups:
    match.getLineups,

  getPlayerStatistics:
    match.getPlayerStatistics,

  getMatchFacts:
    match.getFacts,

  getMatchHeadToHead:
    match.getHeadToHead,

  getMatchStandings:
    match.getStandings,

  getMatchPrediction:
    match.getPrediction,

  /* =====================================================
     TEAM SHORTCUTS
  ===================================================== */

  getTeam:
    team.getTeam,

  getTeamPlayers:
    team.getPlayers,

  getTeamStatistics:
    team.getStatistics,

  /* =====================================================
     PLAYER SHORTCUTS
  ===================================================== */

  getPlayer:
    player.getPlayer,

  getPlayerTransfers:
    player.getTransfers,

  getPlayerTrophies:
    player.getTrophies,

  /* =====================================================
     LEAGUE SHORTCUTS
  ===================================================== */

  getLeague:
    league.getLeague,

  getLeagueFixtures:
    league.getFixtures,

  getLeagueStandings:
    league.getStandings,

  getLeagueTopScorers:
    league.getTopScorers,

  /* =====================================================
     SEARCH SHORTCUT
  ===================================================== */

  search:
    search.query,
};

/* =========================================================
   EXPORTS

   BOTH ARE INTENTIONAL.

   Supports:

   import api from "./api";

   AND:

   import { api } from "./api";
   ========================================================= */

export {
  api,
  request,
  dashboard,
  match,
  team,
  player,
  league,
  search,
};

export default api;