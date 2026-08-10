
// frontend/src/services/liveApi.js

/* =====================================================
IMPORT MATCH API
===================================================== */

import {
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
} from "./matchApi";

/* =====================================================
POLLING INTERVALS
===================================================== */

/*
 * Live matches:
 * Refresh every 15 seconds.
 *
 * This is safer for API quota than polling
 * every 5 seconds.
 */

export const LIVE_INTERVAL =
  15 * 1000;

/*
 * Half-time:
 * Refresh every 30 seconds.
 */

export const HALFTIME_INTERVAL =
  30 * 1000;

/*
 * Upcoming:
 * Refresh every 60 seconds.
 */

export const UPCOMING_INTERVAL =
  60 * 1000;

/*
 * Finished:
 * No polling.
 */

export const FINISHED_INTERVAL = 0;

/* =====================================================
MATCH STATUS
===================================================== */

export function getPollingInterval(
  status
) {
  switch (status) {
    /* -----------------------------------------
    LIVE
    ----------------------------------------- */

    case "LIVE":
    case "1H":
    case "2H":
    case "ET":
    case "P":
      return LIVE_INTERVAL;

    /* -----------------------------------------
    HALF TIME
    ----------------------------------------- */

    case "HT":
    case "BT":
      return HALFTIME_INTERVAL;

    /* -----------------------------------------
    UPCOMING
    ----------------------------------------- */

    case "NS":
    case "TBD":
      return UPCOMING_INTERVAL;

    /* -----------------------------------------
    FINISHED
    ----------------------------------------- */

    case "FT":
    case "AET":
    case "PEN":
    case "CANC":
    case "ABD":
      return FINISHED_INTERVAL;

    /* -----------------------------------------
    DEFAULT
    ----------------------------------------- */

    default:
      return UPCOMING_INTERVAL;
  }
}

/* =====================================================
LIVE MATCH
===================================================== */

export async function fetchLiveMatch(
  matchId
) {
  if (!matchId) {
    return null;
  }

  return getMatch(matchId);
}

/* =====================================================
LIVE TIMELINE
===================================================== */

export async function fetchLiveTimeline(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getTimeline(matchId);
}

/* =====================================================
LIVE EVENTS
===================================================== */

export async function fetchLiveEvents(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getEvents(matchId);
}

/* =====================================================
LIVE STATISTICS
===================================================== */

export async function fetchLiveStatistics(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getStatistics(matchId);
}

/* =====================================================
LINEUPS
===================================================== */

/*
 * Lineups are NOT included in the normal
 * live polling cycle.
 *
 * Load them only when the UI needs them.
 */

export async function fetchLiveLineups(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getLineups(matchId);
}

/* =====================================================
PLAYER RATINGS
===================================================== */

export async function fetchLivePlayerRatings(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getPlayerRatings(matchId);
}

/* =====================================================
MATCH FACTS
===================================================== */

export async function fetchLiveFacts(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getFacts(matchId);
}

/* =====================================================
HEAD TO HEAD
===================================================== */

export async function fetchLiveHeadToHead(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getHeadToHead(matchId);
}

/* =====================================================
STANDINGS
===================================================== */

export async function fetchLiveStandings(
  matchId
) {
  if (!matchId) {
    return [];
  }

  return getStandings(matchId);
}

/* =====================================================
PREDICTION
===================================================== */

export async function fetchLivePrediction(
  matchId
) {
  if (!matchId) {
    return null;
  }

  return getPrediction(matchId);
}

/* =====================================================
CORE LIVE UPDATE
===================================================== */

/*
 * IMPORTANT:
 *
 * This is the function used by LiveContext
 * during automatic polling.
 *
 * Only the data that can actually change
 * frequently during a football match is loaded:
 *
 * 1. Match
 * 2. Timeline
 * 3. Events
 * 4. Statistics
 *
 * This prevents every polling cycle from
 * requesting 10 API endpoints.
 */

export async function fetchCompleteLiveMatch(
  matchId
) {
  if (!matchId) {
    return null;
  }

  try {
    const [
      match,
      timeline,
      events,
      statistics,
    ] = await Promise.all([
      fetchLiveMatch(matchId),
      fetchLiveTimeline(matchId),
      fetchLiveEvents(matchId),
      fetchLiveStatistics(matchId),
    ]);

    /*
     * Return the same object structure
     * expected by LiveContext and LiveClient.
     *
     * Static/expensive sections remain null
     * until explicitly requested.
     */

    return {
      match,
      timeline,
      events,
      statistics,

      lineups: null,

      playerRatings: null,

      facts: null,

      headToHead: null,

      standings: null,

      prediction: null,
    };
  } catch (error) {
    console.error(
      "❌ Live API update failed:",
      error
    );

    return null;
  }
}

/* =====================================================
LOAD EXTENDED MATCH DATA
===================================================== */

/*
 * Use this when the user opens a match
 * and the UI needs the additional sections.
 *
 * This is deliberately NOT part of the
 * automatic 15-second live polling.
 */

export async function fetchExtendedLiveMatch(
  matchId
) {
  if (!matchId) {
    return null;
  }

  try {
    const [
      lineups,
      playerRatings,
      facts,
      headToHead,
      standings,
      prediction,
    ] = await Promise.all([
      fetchLiveLineups(matchId),

      fetchLivePlayerRatings(
        matchId
      ),

      fetchLiveFacts(matchId),

      fetchLiveHeadToHead(
        matchId
      ),

      fetchLiveStandings(
        matchId
      ),

      fetchLivePrediction(
        matchId
      ),
    ]);

    return {
      lineups,
      playerRatings,
      facts,
      headToHead,
      standings,
      prediction,
    };
  } catch (error) {
    console.error(
      "❌ Extended live data failed:",
      error
    );

    return {
      lineups: [],
      playerRatings: [],
      facts: [],
      headToHead: [],
      standings: [],
      prediction: null,
    };
  }
}

/* =====================================================
START POLLING
===================================================== */

export function startPolling(
  callback,
  interval
) {
  if (
    typeof callback !==
    "function"
  ) {
    return null;
  }

  if (
    !interval ||
    interval <= 0
  ) {
    return null;
  }

  return setInterval(
    callback,
    interval
  );
}

/* =====================================================
STOP POLLING
===================================================== */

export function stopPolling(
  pollingId
) {
  if (pollingId) {
    clearInterval(
      pollingId
    );
  }
}

/* =====================================================
DEFAULT EXPORT
===================================================== */

const liveApi = {
  /* Polling */

  LIVE_INTERVAL,

  HALFTIME_INTERVAL,

  UPCOMING_INTERVAL,

  FINISHED_INTERVAL,

  getPollingInterval,

  startPolling,

  stopPolling,

  /* Core live data */

  fetchLiveMatch,

  fetchLiveTimeline,

  fetchLiveEvents,

  fetchLiveStatistics,

  fetchCompleteLiveMatch,

  /* Extended data */

  fetchLiveLineups,

  fetchLivePlayerRatings,

  fetchLiveFacts,

  fetchLiveHeadToHead,

  fetchLiveStandings,

  fetchLivePrediction,

  fetchExtendedLiveMatch,
};

export default liveApi;

