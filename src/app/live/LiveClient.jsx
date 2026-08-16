"use client";

/* =====================================================
   REACT
===================================================== */
import { useCallback, useEffect, useState } from "react";

/* =====================================================
   NEXT
===================================================== */
import Link from "next/link";
import Image from "next/image";

/* =====================================================
   LIVE CONTEXT
===================================================== */
import { useLive } from "@/context/LiveContext";

/* =====================================================
   API & REFRESH INTERVAL
===================================================== */
const API = process.env.NEXT_PUBLIC_API_URL || "";
const REFRESH_INTERVAL = 60000;

/* =====================================================
   COMPONENT
===================================================== */
export default function LiveClient({ initialMatches = [] }) {
  const { registerMatches, getMatch } = useLive();

  const [matches, setMatches] = useState(
    Array.isArray(initialMatches) ? initialMatches : []
  );
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [refreshError, setRefreshError] = useState("");

  /* ==========================================
     CLIENT MOUNT
  ========================================== */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ==========================================
     REGISTER INITIAL MATCHES
  ========================================== */
  useEffect(() => {
    const safeMatches = Array.isArray(initialMatches) ? initialMatches : [];
    setMatches(safeMatches);

    if (!safeMatches.length) return;

    const fixtureIds = safeMatches
      .map((match) => match?.fixture?.id)
      .filter(Boolean);

    if (fixtureIds.length) {
      registerMatches(fixtureIds);
    }
  }, [initialMatches, registerMatches]);

  /* ==========================================
     REFRESH LIVE MATCHES
  ========================================== */
  const refreshLiveMatches = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setRefreshError("");

      const baseUrl = String(API || "").replace(/\/$/, "");
      const url = `${baseUrl}/api/live`;

      console.log("🔄 Refreshing live matches:", url);

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 15000);

      let res;
      try {
        res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!res.ok) {
        throw new Error(`Live API returned ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Live API did not return JSON.");
      }

      const data = await res.json();
      console.log("✅ Live API response:", data);

      const nextMatches = Array.isArray(data?.matches) ? data.matches : [];
      setMatches(nextMatches);

      const fixtureIds = nextMatches
        .map((match) => match?.fixture?.id)
        .filter(Boolean);

      if (fixtureIds.length) {
        registerMatches(fixtureIds);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error("❌ Live refresh failed:", error);
      if (error?.name === "AbortError") {
        setRefreshError("Live update timed out. Retrying soon...");
      } else {
        setRefreshError("Unable to refresh live matches. Retrying soon...");
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [registerMatches]);

  /* ==========================================
     AUTO REFRESH
  ========================================== */
  useEffect(() => {
    let cancelled = false;

    const runRefresh = async () => {
      if (cancelled) return;
      await refreshLiveMatches();
    };

    runRefresh();

    const interval = setInterval(runRefresh, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [refreshLiveMatches]);

  /* ==========================================
     LAST UPDATED DISPLAY
  ========================================== */
  const renderUpdatedTime = () => {
    if (!mounted || !lastUpdated) {
      return "Waiting for update...";
    }
    return `Updated ${lastUpdated.toLocaleTimeString()}`;
  };

  /* ==========================================
     HEADER
  ========================================== */
  const renderHeader = () => (
    <div className="flex items-center justify-between gap-5 mb-8 flex-wrap">
      <div>
        <h1 className="text-[clamp(28px,5vw,40px)] m-0 font-extrabold text-white">
          🔴 Live Football
        </h1>
        <p className="mt-2 mb-0 text-slate-400">
          Live scores and match updates
        </p>
      </div>

      <div className="text-slate-400 text-[13px] text-right">
        <div>
          {isRefreshing ? "🔄 Updating..." : "🟢 Live monitoring"}
        </div>
        <div className="mt-1">{renderUpdatedTime()}</div>
        {refreshError && (
          <div className="mt-1.5 text-amber-500 max-w-[280px]">
            {refreshError}
          </div>
        )}
      </div>
    </div>
  );

  /* ==========================================
     EMPTY STATE
  ========================================== */
  if (!matches.length) {
    return (
      <main className="max-w-[1200px] my-10 mx-auto p-5 text-white w-full box-border">
        {renderHeader()}

        <div className="bg-slate-900 p-10 rounded-[18px] text-center border border-slate-800">
          <div className="text-[42px] mb-4">⚽</div>
          <h2 className="mb-2.5 text-2xl font-bold">No Live Matches</h2>
          <p className="text-slate-400 m-0 leading-relaxed">
            There are currently no football matches in progress. This page will automatically check again.
          </p>
          <div className="mt-5 text-[13px] text-slate-500">
            🔄 Next update within 60 seconds
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================
     LIVE MATCH PAGE
  ========================================== */
  return (
    <main className="max-w-[1200px] my-10 mx-auto p-5 text-white w-full box-border">
      {renderHeader()}

      <div className="grid gap-5">
        {matches.map((originalMatch) => {
          const fixtureId = originalMatch?.fixture?.id;
          const live = fixtureId ? getMatch(fixtureId) : null;
          const match = live?.match?.match || originalMatch;

          const fixture = match?.fixture || {};
          const league = match?.league || {};
          const home = match?.home || match?.teams?.home || {};
          const away = match?.away || match?.teams?.away || {};
          const matchId = fixture?.id || fixtureId;

          if (!matchId) return null;

          return (
            <Link
              key={matchId}
              href={`/match/${matchId}`}
              className="no-underline text-inherit block"
            >
              <div className="bg-slate-900 rounded-[18px] p-5 border border-slate-800 hover:border-slate-700 transition-colors duration-200">
                {/* LEAGUE */}
                <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                  {league?.logo && (
                    <Image
                      src={league.logo}
                      alt={league.name || "League"}
                      width={30}
                      height={30}
                      unoptimized
                    />
                  )}

                  <div>
                    <strong className="text-white font-bold">
                      {league?.name || "Football"}
                    </strong>
                    {league?.country && (
                      <div className="text-slate-400 text-[13px] mt-0.5">
                        {league.country}
                      </div>
                    )}
                  </div>

                  <div className="ml-auto bg-red-600 px-3 py-1 rounded-full font-bold text-[13px]">
                    {match?.status?.short || "LIVE"}
                    {match?.status?.elapsed ? ` ${match.status.elapsed}'` : ""}
                  </div>
                </div>

                {/* TEAMS & SCORE */}
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3.5">
                  <Team team={home} />

                  <div className="text-center min-w-[80px]">
                    <div className="text-[34px] font-bold whitespace-nowrap">
                      {match?.goals?.home ?? 0} - {match?.goals?.away ?? 0}
                    </div>
                    <div className="text-slate-400 text-[13px] mt-1">
                      {match?.status?.long || "Live"}
                    </div>
                  </div>

                  <Team team={away} reverse />
                </div>

                {/* MATCH DATE */}
                {fixture?.date && (
                  <div className="mt-5 text-center text-slate-400 text-[13px]">
                    {new Date(fixture.date).toLocaleString()}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

/* =====================================================
   TEAM COMPONENT
===================================================== */
function Team({ team, reverse = false }) {
  return (
    <div
      className={`flex items-center gap-2.5 min-w-0 ${
        reverse ? "justify-end flex-row-reverse" : "justify-start flex-row"
      }`}
    >
      {team?.logo && (
        <Image
          src={team.logo}
          alt={team?.name || "Team"}
          width={45}
          height={45}
          unoptimized
        />
      )}

      <strong className="truncate font-bold">
        {team?.name || "Unknown Team"}
      </strong>
    </div>
  );
}