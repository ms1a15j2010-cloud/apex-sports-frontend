import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLeagueId } from "../../../utils/leagueMap";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";

/* ============================================
   GET LEAGUE DATA
============================================ */

async function getLeagueData(league) {
  try {
    const leagueId = getLeagueId(league);

    if (!leagueId) {
      return {
        success: false,
        league: null,
        error: "Invalid league identifier",
      };
    }

    console.log(
      `Fetching league data | League ID: ${leagueId}`
    );

    const res = await fetch(
      `${API}/api/league/${leagueId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`Backend error: ${res.status}`);

      return {
        success: false,
        league: null,
        error: `Backend error: ${res.status}`,
      };
    }

    const data = await res.json();

    console.log(
      `League data received | Success: ${data.success}`
    );

    return data;
  } catch (err) {
    console.error(
      "Error fetching league:",
      err.message
    );

    return {
      success: false,
      league: null,
      error: err.message,
    };
  }
}

/* ============================================
   SEO
============================================ */

export async function generateMetadata({ params }) {
  const { id } = await params;

  const leagueName =
    typeof id === "string"
      ? id.toUpperCase()
      : "League";

  const isPremierLeague =
    id?.toLowerCase() === "epl";

  return {
    title: isPremierLeague
      ? "Premier League | Fixtures, Results, Standings & Top Scorers | Apex Sports"
      : `${leagueName} League | Fixtures, Results, Standings & Top Scorers | Apex Sports`,

    description: isPremierLeague
      ? "Follow Premier League football with fixtures, results, standings, top scorers and useful league information on Apex Sports."
      : `${leagueName} football league information including standings, fixtures, results and top scorers on Apex Sports.`,
  };
}

/* ============================================
   PAGE
============================================ */

export default async function LeaguePage({
  params,
}) {
  const { id } = await params;

  const data = await getLeagueData(id);

  if (!data?.success || !data?.league) {
    notFound();
  }

  const league = data.league;

  const leagueName =
    typeof league.name === "string"
      ? league.name
      : "Football League";

  let country = "England";

  if (
    league.country &&
    typeof league.country === "object"
  ) {
    country =
      league.country.name ||
      league.country.code ||
      "England";
  } else if (
    typeof league.country === "string"
  ) {
    country = league.country;
  }

  const leagueLogo =
    typeof league.logo === "string"
      ? league.logo
      : null;

  const season =
    data.season ||
    league.season ||
    2024;

  const isPremierLeague =
    id?.toLowerCase() === "epl";

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">

      {/* ============================================
          LEAGUE HEADER
      ============================================ */}

      <header className="mb-8 flex flex-wrap items-center gap-5 rounded-[18px] bg-gray-900 p-5 sm:p-[25px]">
        {leagueLogo && (
          <Image
            src={leagueLogo}
            alt={`${leagueName} logo`}
            width={70}
            height={70}
            unoptimized
            className="h-[70px] w-[70px] shrink-0 object-contain"
          />
        )}

        <div>
          <h1 className="m-0 text-[clamp(28px,5vw,38px)] font-extrabold text-white">
            {leagueName}
          </h1>

          <p className="m-0 mt-2 text-sm text-slate-400">
            {country}
          </p>

          <p className="m-0 mt-1 font-bold text-green-500">
            Season {season}
          </p>
        </div>
      </header>

      {/* ============================================
          LEAGUE INTRODUCTION
      ============================================ */}

      <section className="mb-8 rounded-2xl border border-slate-800 bg-gray-900 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {isPremierLeague
            ? "Premier League Football"
            : `${leagueName} Football`}
        </h2>

        {isPremierLeague ? (
          <>
            <p className="mt-4 leading-7 text-slate-300">
              The Premier League is England's top-level men's
              football competition. Clubs compete across a full
              league season, with teams earning points from their
              match results.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Apex Sports brings the main Premier League
              information together on this page. Supporters can
              check the league standings, review completed
              results, look ahead to fixtures and follow the
              players leading the scoring charts.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              The league table helps explain how clubs compare
              during the season. Points are earned from match
              results, while goal difference and goals scored can
              become important when teams are level on points.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Football statistics can be easier to understand when
              the basic table rules are clear. Apex Sports also
              provides educational football guides explaining
              points, standings, goal difference, fixtures and
              results.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 leading-7 text-slate-300">
              Follow {leagueName} football with competition
              information available on Apex Sports. This page
              provides access to standings, results, fixtures and
              top scorers.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Supporters can use the sections below to check team
              positions, review completed matches, find upcoming
              fixtures and follow individual scoring performances.
            </p>
          </>
        )}
      </section>

      {/* ============================================
          QUICK NAVIGATION
      ============================================ */}

      <section className="mb-8">
        <h2 className="mb-5 text-2xl font-bold text-white">
          Explore {leagueName}
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <Link
            href={`/standings/${id}`}
            className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
          >
            <h3 className="m-0 text-xl font-bold">
              📊 Standings
            </h3>

            <p className="m-0 mt-2 text-sm text-slate-400">
              Compare team positions, points, wins, draws,
              losses and goal difference.
            </p>
          </Link>

          <Link
            href={`/results/${id}`}
            className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
          >
            <h3 className="m-0 text-xl font-bold">
              🏁 Results
            </h3>

            <p className="m-0 mt-2 text-sm text-slate-400">
              Review completed matches and recorded scores from
              the league season.
            </p>
          </Link>

          <Link
            href={`/fixtures/${id}`}
            className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
          >
            <h3 className="m-0 text-xl font-bold">
              📅 Fixtures
            </h3>

            <p className="m-0 mt-2 text-sm text-slate-400">
              Check scheduled matches and upcoming kick-off
              information.
            </p>
          </Link>

          <Link
            href={`/top-scorers/${id}`}
            className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
          >
            <h3 className="m-0 text-xl font-bold">
              ⚽ Top Scorers
            </h3>

            <p className="m-0 mt-2 text-sm text-slate-400">
              See the players leading the league scoring charts.
            </p>
          </Link>

        </div>
      </section>

      {/* ============================================
          HOW TO FOLLOW THE LEAGUE
      ============================================ */}

      <section className="mb-8 rounded-2xl border border-slate-800 bg-gray-900 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">
          How to Follow {leagueName}
        </h2>

        <div className="mt-6 space-y-7">

          <div>
            <h3 className="text-lg font-bold text-white">
              1. Start with the standings
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              The league table gives a quick view of each club's
              position. It normally includes matches played,
              wins, draws, losses, goals scored, goals conceded,
              goal difference and total points. These figures help
              explain how teams compare during the season.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              2. Check recent results
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              Results show what happened in completed matches.
              Looking at results alongside the standings can help
              explain why a club has moved up or down the table.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              3. Look at upcoming fixtures
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              Fixtures show which matches are scheduled next.
              Match dates and kick-off times can sometimes change,
              so the latest fixture listing should be checked for
              current information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              4. Follow individual scorers
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              The top-scorers section provides a separate view of
              individual attacking performances and shows which
              players have contributed the most goals.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          FOOTBALL KNOWLEDGE
      ============================================ */}

      <section className="mb-8 rounded-2xl border border-slate-800 bg-gray-900 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">
          Learn How Football Tables Work
        </h2>

        <p className="mt-4 leading-7 text-slate-300">
          Understanding the numbers behind a football league table
          makes match statistics easier to follow. Apex Sports has
          created simple guides covering common football concepts
          and match information.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <Link
            href="/articles/how-football-points-work"
            className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 no-underline transition hover:bg-slate-800"
          >
            <h3 className="font-bold text-white">
              How Football Points Work
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Learn how wins, draws and losses affect a team's
              league points.
            </p>
          </Link>

          <Link
            href="/articles/how-football-league-standings-work"
            className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 no-underline transition hover:bg-slate-800"
          >
            <h3 className="font-bold text-white">
              How League Standings Work
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Understand the columns and statistics commonly
              displayed in a football table.
            </p>
          </Link>

          <Link
            href="/articles/how-football-goal-difference-works"
            className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 no-underline transition hover:bg-slate-800"
          >
            <h3 className="font-bold text-white">
              How Goal Difference Works
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Learn why goals scored and conceded can affect
              league ranking.
            </p>
          </Link>

          <Link
            href="/articles/how-to-read-football-fixtures-and-match-results"
            className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 no-underline transition hover:bg-slate-800"
          >
            <h3 className="font-bold text-white">
              How to Read Fixtures and Results
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Understand common match information shown in
              football fixture and result listings.
            </p>
          </Link>

        </div>
      </section>

      {/* ============================================
          LEAGUE INFORMATION
      ============================================ */}

      <section className="mb-8 rounded-2xl border border-slate-800 bg-gray-900 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">
          {leagueName} Information
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl bg-slate-800/60 p-5">
            <p className="text-sm text-slate-400">
              Competition
            </p>

            <p className="mt-1 font-semibold text-white">
              {leagueName}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-5">
            <p className="text-sm text-slate-400">
              Country
            </p>

            <p className="mt-1 font-semibold text-white">
              {country}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-5">
            <p className="text-sm text-slate-400">
              Season
            </p>

            <p className="mt-1 font-semibold text-white">
              {season}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-5">
            <p className="text-sm text-slate-400">
              Information available
            </p>

            <p className="mt-1 font-semibold text-white">
              Fixtures, results, standings and top scorers
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          FAQ
      ============================================ */}

      <section className="rounded-2xl border border-slate-800 bg-gray-900 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-6 space-y-7">

          <div>
            <h3 className="font-bold text-white">
              Where can I find the {leagueName} standings?
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              Open the Standings section to view team positions,
              points, match records and goal statistics for the
              selected league season.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Where can I find upcoming {leagueName} fixtures?
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              Open Fixtures to see scheduled matches and available
              kick-off information.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Where can I see completed {leagueName} results?
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              The Results section lists completed league matches
              and their recorded scores.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Where can I find the top scorers?
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              Open Top Scorers to view players who have scored the
              most goals in the selected competition.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              How does Apex Sports get football data?
            </h3>

            <p className="mt-2 leading-7 text-slate-300">
              Apex Sports retrieves competition and match
              information from football data services and presents
              that information through its own league, fixture,
              result and statistics pages.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}