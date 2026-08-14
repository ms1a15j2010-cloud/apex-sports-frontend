const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* ===========================================
   GENERIC REQUEST
=========================================== */

async function request(
  endpoint,
  options = {}
) {
  let timeoutId = null;

  try {
    const controller =
      new AbortController();

    timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000);

    const response = await fetch(
      `${API}${endpoint}`,
      {
        cache: "no-store",

        signal:
          controller.signal,

        ...options,

        headers: {
          "Content-Type":
            "application/json",

          ...(options.headers || {}),
        },
      }
    );

    clearTimeout(timeoutId);

    const text =
      await response.text();

    let data = null;

    if (text) {
      try {
        data =
          JSON.parse(text);
      } catch {
        data = null;
      }
    }

    if (!response.ok) {
      return {
        success: false,

        status:
          response.status,

        message:
          data?.message ||
          response.statusText ||
          `Request failed (${response.status})`,

        data,
      };
    }

    if (!text) {
      return {
        success: true,

        data: null,

        message:
          "Empty response",
      };
    }

    if (!data) {
      return {
        success: false,

        status:
          response.status,

        message:
          "Invalid JSON received",
      };
    }

    return data;
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    console.error(
      `API request failed: ${endpoint}`,
      error
    );

    return {
      success: false,

      status:
        error?.name ===
        "AbortError"
          ? 408
          : 0,

      message:
        error?.name ===
        "AbortError"
          ? "Request timeout"
          : error?.message ||
            "Network request failed",
    };
  }
}

/* ===========================================
   DASHBOARD
=========================================== */

const dashboard = {
  /* -----------------------------------------
     DASHBOARD HERO

     Current backend:
     GET /api/dashboard/hero
  ----------------------------------------- */

  getDashboardHero:
    () =>
      request(
        "/api/dashboard/hero"
      ),

  /* -----------------------------------------
     BACKWARD COMPATIBILITY

     Existing DashboardHero.js currently calls:

     api.getDashboard()

     Keep it working.
  ----------------------------------------- */

  getDashboard:
    () =>
      request(
        "/api/dashboard/hero"
      ),

  /* -----------------------------------------
     FEATURED
  ----------------------------------------- */

  getFeaturedMatch:
    () =>
      request(
        "/api/dashboard/featured"
      ),

  /* -----------------------------------------
     LIVE
  ----------------------------------------- */

  getLiveMatches:
    () =>
      request(
        "/api/dashboard/live"
      ),

  /* -----------------------------------------
     TODAY
  ----------------------------------------- */

  getTodayMatches:
    () =>
      request(
        "/api/dashboard/today"
      ),

  /* -----------------------------------------
     TOP LEAGUES
  ----------------------------------------- */

  getTopLeagues:
    () =>
      request(
        "/api/dashboard/leagues"
      ),

  /* -----------------------------------------
     TRENDING TEAMS
  ----------------------------------------- */

  getTrendingTeams:
    () =>
      request(
        "/api/dashboard/teams"
      ),

  /* -----------------------------------------
     LATEST RESULTS
  ----------------------------------------- */

  getLatestResults:
    () =>
      request(
        "/api/dashboard/results"
      ),

  /* -----------------------------------------
     TOP SCORERS
  ----------------------------------------- */

  getTopScorersMini:
    () =>
      request(
        "/api/dashboard/topscorers"
      ),

  /* -----------------------------------------
     STANDINGS
  ----------------------------------------- */

  getStandingsMini:
    () =>
      request(
        "/api/dashboard/standings"
      ),
};

/* ===========================================
   MATCH
=========================================== */

const match = {
  getMatch:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}`
      ),

  getEvents:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/events`
      ),

  getTimeline:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/timeline`
      ),

  getStatistics:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/statistics`
      ),

  getLineups:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/lineups`
      ),

  getPlayerStatistics:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/players`
      ),

  getFacts:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/facts`
      ),

  getHeadToHead:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/headtohead`
      ),

  getStandings:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/standings`
      ),

  getPrediction:
    (id) =>
      request(
        `/api/match/${encodeURIComponent(
          id
        )}/prediction`
      ),
};

/* ===========================================
   FIXTURES
=========================================== */

const fixtures = {
  get:
    (
      league = "epl",
      season,
      page = 1,
      limit = 10
    ) => {
      const params =
        new URLSearchParams();

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      params.set(
        "page",
        page
      );

      params.set(
        "limit",
        limit
      );

      return request(
        `/api/fixtures/${encodeURIComponent(
          league
        )}?${params.toString()}`
      );
    },
};

/* ===========================================
   RESULTS
=========================================== */

const results = {
  get:
    (
      league = "PL",
      season,
      page = 1,
      limit = 10
    ) => {
      const params =
        new URLSearchParams();

      params.set(
        "league",
        league
      );

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      params.set(
        "page",
        page
      );

      params.set(
        "limit",
        limit
      );

      return request(
        `/api/results?${params.toString()}`
      );
    },

  direct:
    (season) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/results/direct${query}`
      );
    },
};

/* ===========================================
   LIVE
=========================================== */

const live = {
  get:
    (
      league,
      season
    ) => {
      const params =
        new URLSearchParams();

      if (league) {
        params.set(
          "league",
          league
        );
      }

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      const query =
        params.toString();

      return request(
        `/api/live${
          query
            ? `?${query}`
            : ""
        }`
      );
    },
};

/* ===========================================
   TODAY
=========================================== */

const today = {
  get:
    (
      date,
      league = "PL",
      season
    ) => {
      const params =
        new URLSearchParams();

      if (date) {
        params.set(
          "date",
          date
        );
      }

      if (league) {
        params.set(
          "league",
          league
        );
      }

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      const query =
        params.toString();

      return request(
        `/api/today${
          query
            ? `?${query}`
            : ""
        }`
      );
    },
};

/* ===========================================
   TOP LEAGUES
=========================================== */

const topLeagues = {
  get:
    (season) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/top-leagues${query}`
      );
    },
};

/* ===========================================
   TRENDING TEAMS
=========================================== */

const trendingTeams = {
  get:
    (season) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/trending-teams${query}`
      );
    },
};

/* ===========================================
   TOP SCORERS MINI
=========================================== */

const topScorersMini = {
  get:
    (
      league = "epl",
      season = 2025
    ) => {
      const params =
        new URLSearchParams();

      params.set(
        "league",
        league
      );

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      return request(
        `/api/top-scorers-mini?${params.toString()}`
      );
    },
};

/* ===========================================
   STANDINGS MINI
=========================================== */

const standingsMini = {
  get:
    (
      league = "epl",
      season = 2025
    ) => {
      const params =
        new URLSearchParams();

      params.set(
        "league",
        league
      );

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      return request(
        `/api/standings/${encodeURIComponent(
          league
        )}?${params.toString()}`
      );
    },
};

/* ===========================================
   TEAM
=========================================== */

const team = {
  getTeam:
    (id) =>
      request(
        `/api/team/${encodeURIComponent(
          id
        )}`
      ),

  getPlayers:
    (id) =>
      request(
        `/api/team/${encodeURIComponent(
          id
        )}/players`
      ),

  getStatistics:
    (id) =>
      request(
        `/api/team/${encodeURIComponent(
          id
        )}/statistics`
      ),
};

/* ===========================================
   PLAYER
=========================================== */

const player = {
  getPlayer:
    (id) =>
      request(
        `/api/player/${encodeURIComponent(
          id
        )}`
      ),

  getTransfers:
    (id) =>
      request(
        `/api/player/${encodeURIComponent(
          id
        )}/transfers`
      ),

  getTrophies:
    (id) =>
      request(
        `/api/player/${encodeURIComponent(
          id
        )}/trophies`
      ),
};

/* ===========================================
   LEAGUE
=========================================== */

const league = {
  getLeague:
    (
      id,
      season
    ) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}${query}`
      );
    },

  getFixtures:
    (
      id,
      season,
      page = 1,
      limit = 10
    ) => {
      const params =
        new URLSearchParams();

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      params.set(
        "page",
        page
      );

      params.set(
        "limit",
        limit
      );

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/fixtures?${params.toString()}`
      );
    },

  getResults:
    (
      id,
      season,
      page = 1,
      limit = 10
    ) => {
      const params =
        new URLSearchParams();

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      params.set(
        "page",
        page
      );

      params.set(
        "limit",
        limit
      );

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/results?${params.toString()}`
      );
    },

  getStandings:
    (
      id,
      season
    ) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/standings${query}`
      );
    },

  getTopScorers:
    (
      id,
      season,
      page = 1,
      limit = 20
    ) => {
      const params =
        new URLSearchParams();

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      params.set(
        "page",
        page
      );

      params.set(
        "limit",
        limit
      );

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/topscorers?${params.toString()}`
      );
    },

  getTopAssists:
    (
      id,
      season,
      page = 1,
      limit = 20
    ) => {
      const params =
        new URLSearchParams();

      if (
        season !== undefined &&
        season !== null &&
        season !== ""
      ) {
        params.set(
          "season",
          season
        );
      }

      params.set(
        "page",
        page
      );

      params.set(
        "limit",
        limit
      );

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/topassists?${params.toString()}`
      );
    },

  getTeams:
    (
      id,
      season
    ) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/teams${query}`
      );
    },

  getStatistics:
    (
      id,
      season
    ) => {
      const query =
        season !== undefined &&
        season !== null &&
        season !== ""
          ? `?season=${encodeURIComponent(
              season
            )}`
          : "";

      return request(
        `/api/league/${encodeURIComponent(
          id
        )}/statistics${query}`
      );
    },
};

/* ===========================================
   SEARCH
=========================================== */

const search = {
  query:
    (text) =>
      request(
        `/api/search?q=${encodeURIComponent(
          text
        )}`
      ),
};

/* ===========================================
   EXPORT
=========================================== */

export const api = {
  request,

  dashboard,
  match,
  fixtures,
  results,
  live,
  today,
  topLeagues,
  trendingTeams,
  topScorersMini,
  standingsMini,
  team,
  player,
  league,
  search,

  /* Dashboard compatibility */

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

  /* Match */

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

  /* Fixtures */

  getFixtures:
    fixtures.get,

  /* Results */

  getResults:
    results.get,

  getDirectResults:
    results.direct,

  /* Live */

  getLive:
    live.get,

  /* Today */

  getToday:
    today.get,

  /* Top leagues */

  getTopLeaguesList:
    topLeagues.get,

  /* Trending teams */

  getTrendingTeamsList:
    trendingTeams.get,

  /* Top scorers */

  getTopScorers:
    topScorersMini.get,

  /* Standings */

  getStandings:
    standingsMini.get,

  /* Team */

  getTeam:
    team.getTeam,

  getTeamPlayers:
    team.getPlayers,

  getTeamStatistics:
    team.getStatistics,

  /* Player */

  getPlayer:
    player.getPlayer,

  getPlayerTransfers:
    player.getTransfers,

  getPlayerTrophies:
    player.getTrophies,

  /* League */

  getLeague:
    league.getLeague,

  getLeagueFixtures:
    league.getFixtures,

  getLeagueResults:
    league.getResults,

  getLeagueStandings:
    league.getStandings,

  getLeagueTopScorers:
    league.getTopScorers,

  getLeagueTopAssists:
    league.getTopAssists,

  getLeagueTeams:
    league.getTeams,

  getLeagueStatistics:
    league.getStatistics,

  /* Search */

  search:
    search.query,
};