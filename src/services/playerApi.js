import api from "./api";

/* =====================================================
   PLAYER PROFILE
===================================================== */

export const getPlayer = (
  playerId,
  season = 2023
) =>
  api.get(`/api/player/${playerId}`, {
    season,
  });

/* =====================================================
   PLAYER STATISTICS
===================================================== */

export const getStatistics = (
  playerId,
  season = 2023
) =>
  api.get(
    `/api/player/${playerId}/statistics`,
    {
      season,
    }
  );

/* =====================================================
   PLAYER CAREER
===================================================== */

export const getCareer = (
  playerId,
  season = 2023
) =>
  api.get(
    `/api/player/${playerId}/career`,
    {
      season,
    }
  );

/* =====================================================
   PLAYER PERFORMANCE
===================================================== */

export const getPerformance = (
  playerId,
  season = 2023
) =>
  api.get(
    `/api/player/${playerId}/performance`,
    {
      season,
    }
  );

/* =====================================================
   PLAYER FIXTURES
===================================================== */

export const getFixtures = (
  playerId,
  season = 2023
) =>
  api.get(
    `/api/player/${playerId}/fixtures`,
    {
      season,
    }
  );

/* =====================================================
   PLAYER HISTORY
===================================================== */

export const getHistory = (
  playerId,
  season = 2023
) =>
  api.get(
    `/api/player/${playerId}/history`,
    {
      season,
    }
  );

/* =====================================================
   PLAYER TRANSFERS
===================================================== */

export const getTransfers = (
  playerId
) =>
  api.get(
    `/api/player/${playerId}/transfers`
  );

/* =====================================================
   PLAYER TROPHIES
===================================================== */

export const getTrophies = (
  playerId
) =>
  api.get(
    `/api/player/${playerId}/trophies`
  );

/* =====================================================
   PLAYER SEARCH
===================================================== */

export const searchPlayers = (
  keyword
) =>
  api.get(
    `/api/player/search/${encodeURIComponent(
      keyword
    )}`
  );

/* =====================================================
   COMPLETE PLAYER
===================================================== */

export async function getCompletePlayer(
  playerId,
  season = 2023
) {
  const [
    player,
    statistics,
    career,
    performance,
    fixtures,
    history,
    transfers,
    trophies,
  ] = await Promise.all([
    getPlayer(
      playerId,
      season
    ),
    getStatistics(
      playerId,
      season
    ),
    getCareer(
      playerId,
      season
    ),
    getPerformance(
      playerId,
      season
    ),
    getFixtures(
      playerId,
      season
    ),
    getHistory(
      playerId,
      season
    ),
    getTransfers(playerId),
    getTrophies(playerId),
  ]);

  return {
    player,
    statistics,
    career,
    performance,
    fixtures,
    history,
    transfers,
    trophies,
  };
}

const playerApi = {
  getPlayer,
  getStatistics,
  getCareer,
  getPerformance,
  getFixtures,
  getHistory,
  getTransfers,
  getTrophies,
  searchPlayers,
  getCompletePlayer,
};

export default playerApi;