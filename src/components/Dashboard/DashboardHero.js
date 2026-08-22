"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { api } from "@/lib/api";

/* =====================================================
   DASHBOARD HERO
===================================================== */

export default function DashboardHero() {
  const [hero, setHero] = useState({
    leagues: 0,
    teams: 0,
    players: 0,
    fixtures: 0,
  });

  const [league, setLeague] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ===================================================
     PREVENT REPEATED INITIALIZATION
  =================================================== */

  const loadedRef = useRef(false);

  /* ===================================================
     LOAD DASHBOARD HERO
  =================================================== */

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    loadedRef.current = true;

    let mounted = true;

    async function load() {
      try {
        if (mounted) {
          setLoading(true);
          setError("");
        }

        const data = await api.getDashboard();

        if (!mounted) {
          return;
        }

        if (data?.success) {
          setHero({
            leagues:
              Number(data?.hero?.leagues) || 0,

            teams:
              Number(data?.hero?.teams) || 0,

            players:
              Number(data?.hero?.players) || 0,

            fixtures:
              Number(data?.hero?.fixtures) || 0,
          });

          setLeague(data?.league || null);
        } else {
          setError(
            data?.message ||
              "Unable to load dashboard"
          );
        }
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error("DashboardHero:", err);

        setError(
          err?.message ||
            "Unable to load dashboard"
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-gradient-to-br from-[#111827] to-[#0f172a] p-7 text-white">
        <div className="text-sm text-[#94a3b8]">
          Loading dashboard...
        </div>
      </section>
    );
  }

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1f2937] bg-gradient-to-br from-[#111827] to-[#0f172a] p-5 text-white sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="mb-2 text-xs font-black tracking-[1.5px] text-[#ef4444]">
            APEX SPORTS
          </div>

          <h1 className="m-0 text-[clamp(28px,5vw,46px)] font-black leading-[1.1]">
            Football Dashboard
          </h1>

          <p className="mt-[10px] max-w-[650px] text-[15px] leading-[1.6] text-[#94a3b8]">
            Latest football data, fixtures,
            teams, players and competitions.
          </p>

          {league && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-[9px] border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-[13px] font-bold text-[#e5e7eb]">
              <span>
                {league?.name || "Premier League"}
              </span>

              {league?.season && (
                <span className="text-[#22c55e]">
                  {league.season}/
                  {String(
                    Number(league.season) + 1
                  ).slice(-2)}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-3 text-right">
          <div className="text-[10px] font-extrabold tracking-[1px] text-[#64748b]">
            DATA SOURCE
          </div>

          <div className="mt-[5px] text-[13px] font-extrabold text-[#22c55e]">
            football-data.org
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-[10px] border border-[#7f1d1d] bg-[#3f1d1d] px-3.5 py-2.5 text-[13px] text-[#fca5a5]">
          {error}
        </div>
      )}

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        <StatCard
          icon="🏆"
          label="Leagues"
          value={hero.leagues}
        />

        <StatCard
          icon="⚽"
          label="Teams"
          value={hero.teams}
        />

        <StatCard
          icon="👤"
          label="Players"
          value={hero.players}
        />

        <StatCard
          icon="📅"
          label="Fixtures"
          value={hero.fixtures}
        />
      </div>
    </section>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-[14px] border border-[#1f2937] bg-[#0b1220] p-[17px]">
      <div className="mb-2 text-[22px]">
        {icon}
      </div>

      <div className="text-[25px] font-black text-white">
        {Number(value).toLocaleString()}
      </div>

      <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.6px] text-[#64748b]">
        {label}
      </div>
    </div>
  );
}