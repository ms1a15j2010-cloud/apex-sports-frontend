"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import HomeHero from "@/components/HomeHero";
import HomeTabs from "@/components/HomeTabs";
import SectionHeader from "@/components/SectionHeader";
import MatchList from "@/components/MatchList";

const CURRENT_SEASON = new Date().getMonth() >= 6
  ? new Date().getFullYear()
  : new Date().getFullYear() - 1;

export default function HomePage({ initialData, isInternationalBreak = false }) {
  const router = useRouter();
  const initialMatches = Array.isArray(initialData?.matches)
    ? initialData.matches
    : [];
  const [matches, setMatches] = useState(initialMatches);
  const [filtered, setFiltered] = useState(initialMatches);
  const [tab, setTab] = useState("today");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    initialData?.success
      ? ""
      : initialData?.message || "Premier League match data is temporarily unavailable."
  );
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && tab === "today") {
      firstRender.current = false;
      return;
    }
    firstRender.current = false;

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
              CURRENT_SEASON,
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
          : Array.isArray(data.fixtures)
            ? data.fixtures
            : Array.isArray(data.results)
              ? data.results
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
    const query = String(value || "").trim();
    if (!query) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
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
        <div className="py-[40px] text-center">
          <p className="text-[18px] text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="mt-4 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* =====================================================
          EMPTY MATCH STATE
      ====================================================== */}

      {!loading &&
        !error &&
        filtered.length === 0 && (
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-8 text-center text-slate-300">
            {tab === "today" && isInternationalBreak ? (
              <>
                <h2 className="text-xl font-bold text-white">
                  Premier League paused for the international break
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-300">
                  No Premier League fixtures are scheduled during the November international window (9–17 November).
                  League action is due to return on Saturday 21 November 2026. International teams are playing
                  Nations League and qualifying fixtures during the pause.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-4">
                  <a
                    href="/articles/uefa-nations-league-matchday-5-review-november-2026"
                    className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400"
                  >
                    Read our Nations League matchday review
                  </a>
                  <a
                    href="/fixtures/epl"
                    className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400"
                  >
                    View upcoming Premier League fixtures
                  </a>
                </div>
              </>
            ) : (
              <p>
                {tab === "live"
                  ? "There are no live matches in the selected coverage right now."
                  : tab === "finished"
                    ? "No recent Premier League results are available from the current data feed."
                    : tab === "upcoming"
                      ? "No upcoming Premier League fixtures are available from the current data feed."
                      : "No Premier League fixtures are scheduled for today (UK time)."}
              </p>
            )}
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
            Explore Football Competitions
          </h2>

          <p className="leading-7 text-slate-300">
            Use the competition directory to explore available league
            tables and player rankings. Premier League pages also
            include upcoming fixtures and completed results.
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

            <a
              href="/tools/league-points-calculator"
              className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800 hover:text-green-400"
            >
              Points Calculator
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
              View All Football Guides →
            </a>
          </div>

        </div>

        {/* =================================================
            EDITORIAL MATCH ANALYSIS
        ================================================== */}

        <section className="mt-10 border-t border-slate-800 pt-8" aria-labelledby="match-analysis-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
                Analysis &amp; insight
              </p>
              <h2 id="match-analysis-heading" className="text-2xl font-bold text-white md:text-3xl">
                Recent Match Analysis
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-400">
                Go beyond the final score. These reports explain what selected match events and
                published statistics can show—and where those numbers have limits.
              </p>
            </div>
            <a href="/articles" className="font-semibold text-green-500 hover:text-green-400">
              All articles &amp; guides →
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-xl border border-green-900/70 bg-slate-950 p-5 transition hover:border-green-500 md:col-span-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-green-500">
                UEFA Nations League · 12 Nov 2026 · Published 13 Nov 2026
              </p>
              <h3 className="text-xl font-bold text-white">
                <a href="/articles/uefa-nations-league-matchday-5-review-november-2026" className="hover:text-green-400">
                  England Reach the Last Eight as Italy Reopen Group A1
                </a>
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                An evidence-led review of England’s 2–1 win over Croatia, Italy’s 3–1 comeback against France,
                and the results that set up the final group matchday.
              </p>
              <a href="/articles/uefa-nations-league-matchday-5-review-november-2026" className="mt-3 inline-block font-semibold text-green-500 hover:text-green-400">
                Read the matchday analysis →
              </a>
            </article>

            <article className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                Premier League · Published 3 Nov 2026
              </p>
              <h3 className="text-lg font-bold text-white">
                <a href="/articles/premier-league-matchweek-9-review-november-2026" className="hover:text-green-400">
                  Arsenal, Brighton and the Matchweek 9 Storylines
                </a>
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Ten results, key away performances and a dated top-five table snapshot with links to club reports.
              </p>
            </article>

            <article className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                Football data guide
              </p>
              <h3 className="text-lg font-bold text-white">
                <a href="/articles/how-to-read-football-match-statistics" className="hover:text-green-400">
                  How to Read Match Statistics Without Misreading the Game
                </a>
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                A practical guide to possession, shots, xG and why statistics need match context.
              </p>
            </article>
          </div>

        </section>

      </section>
    </main>
  );
}
