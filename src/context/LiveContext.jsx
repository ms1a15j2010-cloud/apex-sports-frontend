"use client";

/* =====================================================
REACT
===================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* =====================================================
LIVE API
===================================================== */

import {
  fetchCompleteLiveMatch,
  getPollingInterval,
} from "@/services/liveApi";

/* =====================================================
CONTEXT
===================================================== */

const LiveContext = createContext(null);

/* =====================================================
PROVIDER
===================================================== */

export function LiveProvider({
  children,
}) {
  /* ==========================================
  LIVE MATCH CACHE
  ========================================== */

  const [
    liveMatches,
    setLiveMatches,
  ] = useState({});

  const [
    loading,
    setLoading,
  ] = useState({});

  const [
    registeredMatches,
    setRegisteredMatches,
  ] = useState([]);

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState(null);

  /* ==========================================
  POLLING REFERENCES
  ========================================== */

  const timers = useRef({});

  const mounted = useRef(true);

  /* ==========================================
  MOUNT / UNMOUNT
  ========================================== */

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;

      Object.values(
        timers.current
      ).forEach((timer) => {
        clearInterval(timer);
      });

      timers.current = {};
    };
  }, []);

  /* ==========================================
  LOAD ONE MATCH
  ========================================== */

  const loadMatch = useCallback(
    async (matchId) => {
      if (!matchId) return;

      try {
        setLoading((prev) => ({
          ...prev,
          [matchId]: true,
        }));

        const data =
          await fetchCompleteLiveMatch(
            matchId
          );

        if (!mounted.current) {
          return;
        }

        if (data) {
          setLiveMatches((prev) => ({
            ...prev,
            [matchId]: data,
          }));

          setLastUpdated(
            new Date()
          );

          setError(null);
        }
      } catch (err) {
        console.error(
          "LiveContext:",
          err
        );

        if (mounted.current) {
          setError(
            err.message ||
              "Unable to update live match"
          );
        }
      } finally {
        if (mounted.current) {
          setLoading((prev) => ({
            ...prev,
            [matchId]: false,
          }));
        }
      }
    },
    []
  );

  /* ==========================================
  START POLLING
  ========================================== */

  const startPolling = useCallback(
    (matchId) => {
      if (!matchId) {
        return;
      }

      /*
       * Do not create duplicate timers.
       */

      if (
        timers.current[matchId]
      ) {
        return;
      }

      /*
       * Load immediately.
       */

      loadMatch(matchId);

      /*
       * Start with the live interval.
       *
       * The actual match status will be
       * checked after every update.
       */

      timers.current[matchId] =
        setInterval(async () => {
          await loadMatch(matchId);
        }, getPollingInterval("LIVE"));
    },
    [loadMatch]
  );

  /* ==========================================
  STOP POLLING
  ========================================== */

  const stopPolling = useCallback(
    (matchId) => {
      if (
        timers.current[matchId]
      ) {
        clearInterval(
          timers.current[matchId]
        );

        delete timers.current[
          matchId
        ];
      }
    },
    []
  );

  /* ==========================================
  UPDATE POLLING SPEED
  ========================================== */

  useEffect(() => {
    if (!registeredMatches.length) {
      return;
    }

    registeredMatches.forEach((matchId) => {
      const current = liveMatches[matchId];

      const status =
        current?.match?.match?.status?.short ||
        current?.match?.status?.short ||
        "LIVE";

      const interval =
        getPollingInterval(status);

      /* Finished match */

      if (interval === 0) {
        stopPolling(matchId);
        return;
      }

      /*
       * Only restart when the current timer
       * does not exist.
       */

      if (!timers.current[matchId]) {
        timers.current[matchId] =
          setInterval(() => {
            loadMatch(matchId);
          }, interval);
      }
    });
  }, [
    registeredMatches,
    liveMatches,
    loadMatch,
    stopPolling,
  ]);

  /* ==========================================
  REGISTER MATCHES
  ========================================== */

  const registerMatches =
    useCallback(
      (ids = []) => {
        const uniqueIds = [
          ...new Set(
            ids.filter(Boolean)
          ),
        ];

        /*
         * Stop polling matches that
         * are no longer registered.
         */

        Object.keys(
          timers.current
        ).forEach(
          (matchId) => {
            const numericId =
              Number(matchId);

            if (
              !uniqueIds.includes(
                numericId
              ) &&
              !uniqueIds.includes(
                matchId
              )
            ) {
              stopPolling(
                matchId
              );
            }
          }
        );

        setRegisteredMatches(
          uniqueIds
        );

        /*
         * Start polling only for
         * newly registered matches.
         */

        uniqueIds.forEach(
          (matchId) => {
            if (
              !timers.current[
                matchId
              ]
            ) {
              startPolling(
                matchId
              );
            }
          }
        );
      },
      [
        startPolling,
        stopPolling,
      ]
    );

  /* ==========================================
  UNREGISTER ALL MATCHES
  ========================================== */

  const unregisterMatches =
    useCallback(() => {
      registeredMatches.forEach(
        stopPolling
      );

      setRegisteredMatches(
        []
      );
    }, [
      registeredMatches,
      stopPolling,
    ]);

  /* ==========================================
  GET MATCH
  ========================================== */

  const getMatch =
    useCallback(
      (matchId) => {
        return (
          liveMatches[
            matchId
          ] || null
        );
      },
      [liveMatches]
    );

  /* ==========================================
  IS LOADING
  ========================================== */

  const isLoading =
    useCallback(
      (matchId) => {
        return (
          loading[
            matchId
          ] || false
        );
      },
      [loading]
    );

  /* ==========================================
  CONTEXT VALUE
  ========================================== */

  const value = {
    liveMatches,
    loading,
    error,
    lastUpdated,
    registeredMatches,
    registerMatches,
    unregisterMatches,
    getMatch,
    isLoading,
    loadMatch,
  };

  /* ==========================================
  PROVIDER
  ========================================== */

  return (
    <LiveContext.Provider
      value={value}
    >
      {children}
    </LiveContext.Provider>
  );
}

/* =====================================================
HOOK
===================================================== */

export function useLive() {
  const context =
    useContext(
      LiveContext
    );

  if (!context) {
    throw new Error(
      "useLive must be used inside LiveProvider"
    );
  }

  return context;
}