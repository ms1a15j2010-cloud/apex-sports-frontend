import api from "./api";

/* =====================================================
   TEAM PROFILE
===================================================== */

export const getTeam = (
  teamId,
  season = 2023,
  league = 39
) =>
  api.get(`/api/team/${teamId}`, {
    season,
    league,
  });

/* =====================================================
   TEAM PLAYERS
===================================================== */

export const getPlayers = (
  teamId,
  season = 2023
) =>
  api.get(
    `/api/team/${teamId}/players`,
    {
      season,
    }
  );

/* =====================================================
   TEAM STATISTICS
===================================================== */

export const getStatistics = (
  teamId,
  season = 2023,
  league = 39
) =>
  api.get(
    `/api/team/${teamId}/statistics`,
    {
      season,
      league,
    }
  );

/* =====================================================
   TEAM FIXTURES
===================================================== */

export const getFixtures = (
  teamId,
  season = 2023
) =>
  api.get(
    `/api/team/${teamId}/fixtures`,
    {
      season,
    }
  );

/* =====================================================
   TEAM HISTORY
===================================================== */

export const getHistory = (
  teamId,
  season = 2023
) =>
  api.get(
    `/api/team/${teamId}/history`,
    {
      season,
    }
  );

/* =====================================================
   TEAM COACH
===================================================== */

export const getCoach = (
  teamId
) =>
  api.get(
    `/api/team/${teamId}/coach`
  );

/* =====================================================
   TEAM TRANSFERS
===================================================== */

export const getTransfers = (
  teamId
) =>
  api.get(
    `/api/team/${teamId}/transfers`
  );

/* =====================================================
   TEAM INJURIES
===================================================== */

export const getInjuries = (
  teamId,
  season = 2023,
  league = 39
) =>
  api.get(
    `/api/team/${teamId}/injuries`,
    {
      season,
      league,
    }
  );

/* =====================================================
   TEAM TROPHIES
===================================================== */

export const getTrophies = (
  teamId
) =>
  api.get(
    `/api/team/${teamId}/trophies`
  );

/* =====================================================
   COMPLETE TEAM
===================================================== */

export async function getCompleteTeam(
  teamId,
  season = 2023,
  league = 39
) {
  const [
    team,
    players,
    statistics,
    fixtures,
    history,
    coach,
    transfers,
    injuries,
    trophies,
  ] = await Promise.all([
    getTeam(
      teamId,
      season,
      league
    ),
    getPlayers(
      teamId,
      season
    ),
    getStatistics(
      teamId,
      season,
      league
    ),
    getFixtures(
      teamId,
      season
    ),
    getHistory(
      teamId,
      season
    ),
    getCoach(teamId),
    getTransfers(teamId),
    getInjuries(
      teamId,
      season,
      league
    ),
    getTrophies(teamId),
  ]);

  return {
    team,
    players,
    statistics,
    fixtures,
    history,
    coach,
    transfers,
    injuries,
    trophies,
  };
}

const teamApi = {
  getTeam,
  getPlayers,
  getStatistics,
  getFixtures,
  getHistory,
  getCoach,
  getTransfers,
  getInjuries,
  getTrophies,
  getCompleteTeam,
};

export default teamApi;