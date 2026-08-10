const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* ===========================================
   Generic Request Helper
=========================================== */

async function request(endpoint, options = {}) {
  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 10000);

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

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: response.statusText || "Request failed",
      };
    }

    const text = await response.text();

    if (!text) {
      return {
        success: false,
        message: "Empty response",
      };
    }

    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        message: "Invalid JSON received",
      };
    }
  } catch (err) {
    return {
      success: false,
      message:
        err.name === "AbortError"
          ? "Request timeout"
          : err.message,
    };
  }
}

/* ===========================================
   Dashboard
=========================================== */

const dashboard = {
  getDashboard: () => request("/api/dashboard"),

  getFeaturedMatch: () =>
    request("/api/dashboard/featured"),

  getLiveMatches: () =>
    request("/api/dashboard/live"),

  getTodayMatches: () =>
    request("/api/dashboard/today"),

  getTopLeagues: () =>
    request("/api/dashboard/leagues"),

  getTrendingTeams: () =>
    request("/api/dashboard/teams"),

  getLatestResults: () =>
    request("/api/dashboard/results"),

  getTopScorersMini: () =>
    request("/api/dashboard/topscorers"),

  getStandingsMini: () =>
    request("/api/dashboard/standings"),
};

/* ===========================================
   Match
=========================================== */

const match = {
  getMatch: (id) =>
    request(`/api/match/${id}`),

  getEvents: (id) =>
    request(`/api/match/${id}/events`),

  getStatistics: (id) =>
    request(`/api/match/${id}/statistics`),

  getLineups: (id) =>
    request(`/api/match/${id}/lineups`),

  getPlayerStatistics: (id) =>
    request(`/api/match/${id}/players`),
};

/* ===========================================
   Team
=========================================== */

const team = {
  getTeam: (id) =>
    request(`/api/team/${id}`),

  getPlayers: (id) =>
    request(`/api/team/${id}/players`),

  getStatistics: (id) =>
    request(`/api/team/${id}/statistics`),
};

/* ===========================================
   Player
=========================================== */

const player = {
  getPlayer: (id) =>
    request(`/api/player/${id}`),

  getTransfers: (id) =>
    request(`/api/player/${id}/transfers`),

  getTrophies: (id) =>
    request(`/api/player/${id}/trophies`),
};

/* ===========================================
   League
=========================================== */

const league = {
  getLeague: (id) =>
    request(`/api/league/${id}`),

  getFixtures: (id) =>
    request(`/api/league/${id}/fixtures`),

  getStandings: (id) =>
    request(`/api/league/${id}/standings`),

  getTopScorers: (id) =>
    request(`/api/league/${id}/topscorers`),
};

/* ===========================================
   Search
=========================================== */

const search = {
  query: (text) =>
    request(
      `/api/search?q=${encodeURIComponent(text)}`
    ),
};

/* ===========================================
   Export
=========================================== */

export const api = {
  request,

  dashboard,
  match,
  team,
  player,
  league,
  search,

  // Dashboard
  getDashboard: dashboard.getDashboard,
  getFeaturedMatch: dashboard.getFeaturedMatch,
  getLiveMatches: dashboard.getLiveMatches,
  getTodayMatches: dashboard.getTodayMatches,
  getTopLeagues: dashboard.getTopLeagues,
  getTrendingTeams: dashboard.getTrendingTeams,
  getLatestResults: dashboard.getLatestResults,
  getTopScorersMini: dashboard.getTopScorersMini,
  getStandingsMini: dashboard.getStandingsMini,

  // Match
  getMatch: match.getMatch,
  getMatchEvents: match.getEvents,
  getMatchStatistics: match.getStatistics,
  getMatchLineups: match.getLineups,
  getPlayerStatistics: match.getPlayerStatistics,

  // Team
  getTeam: team.getTeam,
  getTeamPlayers: team.getPlayers,
  getTeamStatistics: team.getStatistics,

  // Player
  getPlayer: player.getPlayer,
  getPlayerTransfers: player.getTransfers,
  getPlayerTrophies: player.getTrophies,

  // League
  getLeague: league.getLeague,
  getLeagueFixtures: league.getFixtures,
  getLeagueStandings: league.getStandings,
  getLeagueTopScorers: league.getTopScorers,

  // Search
  search: search.query,
};