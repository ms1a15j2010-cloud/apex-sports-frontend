import api from "./api";

/* =====================================================
   LEAGUE DETAILS
===================================================== */

export const getLeague = (
  leagueId,
  season = 2023
) =>
  api.get(`/api/league/${leagueId}`, {
    season,
  });

/* =====================================================
   LEAGUE STANDINGS
===================================================== */

export const getStandings = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/standings`,
    {
      season,
    }
  );

/* =====================================================
   LEAGUE FIXTURES
===================================================== */

export const getFixtures = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/fixtures`,
    {
      season,
    }
  );

/* =====================================================
   LEAGUE RESULTS
===================================================== */

export const getResults = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/results`,
    {
      season,
    }
  );

/* =====================================================
   LEAGUE TOP SCORERS
===================================================== */

export const getTopScorers = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/topscorers`,
    {
      season,
    }
  );

/* =====================================================
   LEAGUE TOP ASSISTS
===================================================== */

export const getTopAssists = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/topassists`,
    {
      season,
    }
  );

/* =====================================================
   LEAGUE TEAMS
===================================================== */

export const getTeams = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/teams`,
    {
      season,
    }
  );

/* =====================================================
   LEAGUE STATISTICS
===================================================== */

export const getStatistics = (
  leagueId,
  season = 2023
) =>
  api.get(
    `/api/league/${leagueId}/statistics`,
    {
      season,
    }
  );

/* =====================================================
   COMPLETE LEAGUE
===================================================== */

export async function getCompleteLeague(
  leagueId,
  season = 2023
) {
  const [
    league,
    standings,
    fixtures,
    results,
    topScorers,
    topAssists,
    teams,
    statistics,
  ] = await Promise.all([
    getLeague(
      leagueId,
      season
    ),
    getStandings(
      leagueId,
      season
    ),
    getFixtures(
      leagueId,
      season
    ),
    getResults(
      leagueId,
      season
    ),
    getTopScorers(
      leagueId,
      season
    ),
    getTopAssists(
      leagueId,
      season
    ),
    getTeams(
      leagueId,
      season
    ),
    getStatistics(
      leagueId,
      season
    ),
  ]);

  return {
    league,
    standings,
    fixtures,
    results,
    topScorers,
    topAssists,
    teams,
    statistics,
  };
}

const leagueApi = {
  getLeague,
  getStandings,
  getFixtures,
  getResults,
  getTopScorers,
  getTopAssists,
  getTeams,
  getStatistics,
  getCompleteLeague,
};

export default leagueApi;