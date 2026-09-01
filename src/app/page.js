"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import HomeHero from "@/components/HomeHero";
import HomeTabs from "@/components/HomeTabs";
import SectionHeader from "@/components/SectionHeader";
import MatchList from "@/components/MatchList";

export default function HomePage() {
  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tab, setTab] = useState("today");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      if (!mounted) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        let data;

        switch (tab) {
          case "live":
            data = await api.getLiveMatches();
            break;

          case "finished":
            data = await api.getLatestResults();
            break;

          case "upcoming":
            data = await api.getFixtures(
              "epl",
              2026,
              1,
              10
            );
            break;

          case "today":
          default:
            data = await api.getTodayMatches();
            break;
        }

        if (!mounted) {
          return;
        }

        if (!data?.success) {
          setMatches([]);
          setFiltered([]);
          setError(
            data?.message ||
              "Unable to load matches"
          );
          return;
        }

        const list = Array.isArray(data.matches)
          ? data.matches
          : [];

        setMatches(list);
        setFiltered(list);
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error(
          "HomePage matches:",
          err
        );

        setMatches([]);
        setFiltered([]);

        setError(
          err?.message ||
            "Unable to connect to server."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, [tab]);

  function handleSearch(value) {
    const text = value
      .toLowerCase()
      .trim();

    if (!text) {
      setFiltered(matches);
      return;
    }

    const result = matches.filter((m) => {
      return (
        m.home?.name
          ?.toLowerCase()
          .includes(text) ||
        m.away?.name
          ?.toLowerCase()
          .includes(text) ||
        m.teams?.home?.name
          ?.toLowerCase()
          .includes(text) ||
        m.teams?.away?.name
          ?.toLowerCase()
          .includes(text) ||
        m.league?.name
          ?.toLowerCase()
          .includes(text)
      );
    });

    setFiltered(result);
  }

  return (
    <main className="w-full">
      {/* =====================================================
          HERO
      ====================================================== */}
      <HomeHero
        onSearch={handleSearch}
      />

      {/* =====================================================
          MATCH TABS
      ====================================================== */}
      <HomeTabs
        activeTab={tab}
        setActiveTab={setTab}
      />

      {/* =====================================================
          MATCH SECTION HEADER
      ====================================================== */}
      <SectionHeader
        title={
          tab === "live"
            ? "Live Matches"
            : tab === "finished"
              ? "Finished Matches"
              : tab === "upcoming"
                ? "Upcoming Matches"
                : "Today's Matches"
        }
        subtitle={`${filtered.length} matches`}
      />

      {/* =====================================================
          LOADING STATE
      ====================================================== */}
      {loading && (
        <div className="py-[60px] text-center text-[20px] text-slate-300">
          Loading matches...
        </div>
      )}

      {/* =====================================================
          ERROR STATE
      ====================================================== */}
      {!loading && error && (
        <div className="py-[40px] text-center text-[18px] text-red-500">
          {error}
        </div>
      )}

      {/* =====================================================
          EMPTY MATCH STATE
      ====================================================== */}
      {!loading &&
        !error &&
        filtered.length === 0 && (
          <div className="py-[60px] text-center text-[18px] text-slate-400">
            {tab === "live"
              ? "No live matches."
              : tab === "finished"
                ? "No finished matches available."
                : tab === "upcoming"
                  ? "No upcoming matches available."
                  : "No matches scheduled today."}
          </div>
        )}

      {/* =====================================================
          MATCH LIST
      ====================================================== */}
      {!loading &&
        !error &&
        filtered.length > 0 && (
          <MatchList matches={filtered} />
        )}

      {/* =====================================================
          SEO / INFORMATION SECTION
          Always rendered so the homepage contains useful
          content even when the football API has no matches.
      ====================================================== */}
      <section className="mx-auto mt-12 max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Live Football Scores, Fixtures & Results
        </h2>

        <p className="mb-4 leading-7 text-slate-300">
          Apex Sports provides football fans with
          live scores, upcoming fixtures, recent
          results, league standings, match statistics,
          team information, player information and
          football updates from competitions around
          the world.
        </p>

        <p className="mb-6 leading-7 text-slate-300">
          Follow today's football matches, check live
          scores and explore competitions including the
          Premier League and other major football
          leagues. Apex Sports makes it easy to follow
          matches, teams and football competitions in
          one place.
        </p>

        {/* =================================================
            FEATURE CARDS
        ================================================== */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Live Scores */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              🔴
            </div>

            <h3 className="mb-2 font-semibold text-white">
              Live Scores
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Follow football matches and live score
              updates from competitions around the
              world.
            </p>
          </div>

          {/* Fixtures */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              📅
            </div>

            <h3 className="mb-2 font-semibold text-white">
              Football Fixtures
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Find upcoming football fixtures and match
              schedules for your favourite competitions.
            </p>
          </div>

          {/* Results */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              ✅
            </div>

            <h3 className="mb-2 font-semibold text-white">
              Match Results
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Check recent football results and completed
              matches from leagues and competitions.
            </p>
          </div>

          {/* Standings */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              📊
            </div>

            <h3 className="mb-2 font-semibold text-white">
              League Standings
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Explore league tables, rankings and
              competition information.
            </p>
          </div>
        </div>

        {/* =================================================
            MORE INFORMATION
        ================================================== */}
        <div className="mt-8 border-t border-slate-800 pt-6">
          <h2 className="mb-3 text-xl font-bold text-white">
            Follow Football Around the World
          </h2>

          <p className="leading-7 text-slate-300">
            From domestic leagues to international
            competitions, Apex Sports helps football
            fans stay informed about match schedules,
            results, standings and live football action.
            Browse leagues, follow teams and check the
            latest match information whenever you need
            it.
          </p>
        </div>
      </section>
    </main>
  );
}