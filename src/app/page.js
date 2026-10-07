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
              2025,
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
          FOOTBALL INFORMATION
      ====================================================== */}

      <section className="mx-auto mt-12 max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">

        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Live Football Scores, Fixtures & Results
        </h2>

        <p className="mb-4 leading-7 text-slate-300">
          Apex Sports helps football fans follow matches,
          fixtures, results, league standings, player
          statistics and competition information in one place.
          The homepage brings together today&apos;s matches,
          live games, completed results and upcoming fixtures.
        </p>

        <p className="mb-6 leading-7 text-slate-300">
          You can explore major football competitions such as
          the Premier League, check team positions in league
          tables, review completed matches and learn how common
          football statistics are calculated.
        </p>

        {/* =================================================
            FEATURE CARDS
        ================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Live Scores */}

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              Live
            </div>

            <h3 className="mb-2 font-semibold text-white">
              Live Scores
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Follow live football matches and score updates
              from available competitions.
            </p>
          </div>

          {/* Fixtures */}

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              Fixtures
            </div>

            <h3 className="mb-2 font-semibold text-white">
              Football Fixtures
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Find scheduled football matches and upcoming
              fixture information.
            </p>
          </div>

          {/* Results */}

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              Results
            </div>

            <h3 className="mb-2 font-semibold text-white">
              Match Results
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Check completed football matches and their
              recorded scores.
            </p>
          </div>

          {/* Standings */}

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-3 text-2xl">
              Table
            </div>

            <h3 className="mb-2 font-semibold text-white">
              League Standings
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Explore league tables, team positions, points and
              goal statistics.
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
            From domestic leagues to international competitions,
            Apex Sports provides football information covering
            match schedules, results, standings and player
            statistics.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">

            <a
              href="/fixtures/epl"
              className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800 hover:text-green-400"
            >
              Premier League Fixtures
            </a>

            <a
              href="/results/epl"
              className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800 hover:text-green-400"
            >
              Premier League Results
            </a>

            <a
              href="/standings/epl"
              className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800 hover:text-green-400"
            >
              Premier League Standings
            </a>

            <a
              href="/top-scorers/epl"
              className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800 hover:text-green-400"
            >
              Premier League Top Scorers
            </a>

            <a
              href="/articles"
              className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800 hover:text-green-400"
            >
              Football Guides
            </a>

          </div>

        </div>

        {/* =================================================
            FOOTBALL GUIDES
        ================================================== */}

        <div className="mt-8 border-t border-slate-800 pt-6">

          <h2 className="mb-3 text-xl font-bold text-white">
            Football Guides & Explanations
          </h2>

          <p className="mb-5 max-w-3xl leading-7 text-slate-300">
            Learn how football rules, scores, league tables and
            match statistics work with our easy-to-follow football
            guides. Explore the full collection of football
            explanations on our Articles &amp; Guides page.
          </p>

          <div className="grid gap-4 md:grid-cols-2">

            <a
              href="/articles/how-football-points-work"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                How Football Points Work
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Understand how teams earn points from wins,
                draws and losses.
              </p>
            </a>

            <a
              href="/articles/how-football-league-standings-work"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                How Football League Standings Work
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Learn how teams are ranked in football league
                tables.
              </p>
            </a>

            <a
              href="/articles/how-football-goal-difference-works"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                How Football Goal Difference Works
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Learn how goals scored and conceded affect
                league positions.
              </p>
            </a>

            <a
              href="/articles/how-to-read-football-fixtures-and-match-results"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                How to Read Football Fixtures &amp; Results
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Understand match dates, results, scores and
                fixture information.
              </p>
            </a>

            <a
              href="/articles/what-is-offside-in-football"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                What Is Offside in Football?
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Learn the basic offside rule and how offside
                decisions affect attacking plays.
              </p>
            </a>

            <a
              href="/articles/what-is-a-penalty-kick-in-football"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                What Is a Penalty Kick in Football?
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Learn when penalties are awarded and how
                penalty kicks work.
              </p>
            </a>

            <a
              href="/articles/what-is-a-yellow-card-in-football"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                What Is a Yellow Card in Football?
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Learn why referees give yellow cards and how
                cautions affect players.
              </p>
            </a>

            <a
              href="/articles/what-is-a-football-formation"
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500"
            >
              <h3 className="mb-2 font-semibold text-white">
                What Is a Football Formation?
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Learn how formations such as 4-4-2 and 4-3-3
                organize players on the pitch.
              </p>
            </a>

          </div>

          <div className="mt-5">
            <a
              href="/articles"
              className="inline-block rounded-lg border border-green-600 px-5 py-2.5 font-bold text-green-500 transition hover:bg-green-600 hover:text-white"
            >
              View All 20 Football Guides →
            </a>
          </div>

        </div>

      </section>
    </main>
  );
}
