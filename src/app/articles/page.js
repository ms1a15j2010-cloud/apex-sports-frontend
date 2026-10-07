import Link from "next/link";

export const metadata = {
  title: "Football Articles & Guides | Apex Sports",
  description:
    "Read football guides and explanations covering league standings, points, goal difference, fixtures, match rules, cards, formations and common football terms.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/articles",
  },
};

const articles = [
  {
    title: "How Football League Standings Work",
    href: "/articles/how-football-league-standings-work",
    description:
      "Learn how football league tables are calculated, how points and goal difference work, and how teams are separated when they finish level on points.",
  },
  {
    title: "How Football Points Work: Wins, Draws & League Tables",
    href: "/articles/how-football-points-work",
    description:
      "Learn how football league points are calculated, including three points for a win, one point for a draw, zero for a loss, and how points affect league positions.",
  },
  {
    title: "How to Read Football Fixtures and Match Results",
    href: "/articles/how-to-read-football-fixtures-and-match-results",
    description:
      "Learn how to read football fixtures, understand home and away teams, kickoff times, match scores, postponed games and results.",
  },
  {
    title: "How Football Goal Difference Works",
    href: "/articles/how-football-goal-difference-works",
    description:
      "Learn how goal difference is calculated, why it matters in league tables, and how goals scored and conceded affect team rankings.",
  },
  {
    title: "What Is a Clean Sheet in Football?",
    href: "/articles/what-is-a-clean-sheet-in-football",
    description:
      "Learn what a clean sheet means in football, how teams and goalkeepers earn one, and why clean sheets matter in match statistics.",
  },
  {
    title: "What Is a Football Fixture?",
    href: "/articles/what-is-a-football-fixture",
    description:
      "Learn what a football fixture is, what information a fixture contains, and how fixtures help fans follow a team's upcoming matches.",
  },
  {
    title: "What Is Added Time in Football?",
    href: "/articles/what-is-added-time-in-football",
    description:
      "Learn what added time means, why referees add minutes to each half, and how stoppages affect the end of a football match.",
  },
  {
    title: "What Is a Hat-Trick in Football?",
    href: "/articles/what-is-a-hat-trick-in-football",
    description:
      "Learn what a hat-trick means in football, how three-goal performances are recorded, and how hat-tricks differ from other scoring achievements.",
  },
  {
    title: "What Is a Penalty Kick in Football?",
    href: "/articles/what-is-a-penalty-kick-in-football",
    description:
      "Learn when a penalty kick is awarded, how the penalty is taken, and what can happen during a football penalty.",
  },
  {
    title: "What Is a Free Kick in Football?",
    href: "/articles/what-is-a-free-kick-in-football",
    description:
      "Learn what a free kick is, the difference between direct and indirect free kicks, and how free kicks are taken during a match.",
  },
  {
    title: "What Is a Corner Kick in Football?",
    href: "/articles/what-is-a-corner-kick-in-football",
    description:
      "Learn when a corner kick is awarded, how it is taken, and why corners can create important attacking opportunities.",
  },
  {
    title: "What Is Offside in Football?",
    href: "/articles/what-is-offside-in-football",
    description:
      "Learn the basic offside rule, when a player is considered offside, and how offside decisions affect attacking plays.",
  },
  {
    title: "What Is a Goal Kick in Football?",
    href: "/articles/what-is-a-goal-kick-in-football",
    description:
      "Learn when a goal kick is awarded, how it is taken, and how it differs from a corner kick and other restarts.",
  },
  {
    title: "What Is a Throw-In in Football?",
    href: "/articles/what-is-a-throw-in-in-football",
    description:
      "Learn when a throw-in is awarded, how players must take it, and the basic rules governing this common restart.",
  },
  {
    title: "What Is Handball in Football?",
    href: "/articles/what-is-handball-in-football",
    description:
      "Learn the basic handball rule in football, why referees may award a free kick or penalty, and how handball decisions are made.",
  },
  {
    title: "What Is a Yellow Card in Football?",
    href: "/articles/what-is-a-yellow-card-in-football",
    description:
      "Learn what a yellow card means, why players receive cautions, and how yellow-card accumulation can affect players and matches.",
  },
  {
    title: "What Is a Red Card in Football?",
    href: "/articles/what-is-a-red-card-in-football",
    description:
      "Learn what a red card means, why a player can be sent off, and what happens to a team after a dismissal.",
  },
  {
    title: "What Is a Substitution in Football?",
    href: "/articles/what-is-a-substitution-in-football",
    description:
      "Learn how football substitutions work, why managers make changes, and how substitutions can affect tactics and match strategy.",
  },
  {
    title: "What Is a Football Formation?",
    href: "/articles/what-is-a-football-formation",
    description:
      "Learn what football formations mean and how systems such as 4-4-2, 4-3-3, 4-2-3-1 and 3-5-2 organize players on the pitch.",
  },
  {
    title: "What Is Extra Time in Football?",
    href: "/articles/what-is-extra-time-in-football",
    description:
      "Learn when extra time is used, how the two 15-minute periods work, and what happens if a knockout match remains level after extra time.",
  },
];

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports
        </div>

        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Football Articles &amp; Guides
        </h1>

        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-400 sm:text-base">
          Explore practical football guides covering league standings,
          points, goal difference, fixtures, match results, match rules,
          player actions and common football terms. These resources are
          written to help new and regular football fans understand the game.
        </p>
      </header>

      <section className="mb-10 rounded-[20px] border border-gray-800 bg-[#0b1220] p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold text-white">
          Football Guides
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-slate-400">
          Football matches involve many rules, statistics and terms.
          Our guides explain these topics in simple language so you can
          better understand league tables, match results and what happens
          during a football game.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <h3 className="font-bold text-white">League Tables</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Points, standings and goal difference.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <h3 className="font-bold text-white">Match Rules</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Offside, handball, cards and restarts.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <h3 className="font-bold text-white">Football Terms</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Common terms used when following matches.
            </p>
          </div>
        </div>
      </section>

      <section
        className="grid gap-5"
        aria-label="Football guides"
      >
        {articles.map((article) => (
          <article
            key={article.href}
            className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 transition hover:border-slate-700 sm:p-8"
          >
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-green-500">
              Football Guide
            </div>

            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              <Link
                href={article.href}
                className="text-inherit no-underline transition hover:text-green-400"
              >
                {article.title}
              </Link>
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              {article.description}
            </p>

            <Link
              href={article.href}
              className="mt-5 inline-block font-bold text-green-500 no-underline transition hover:text-green-400"
            >
              Read the guide →
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[20px] border border-gray-800 bg-[#0b1220] p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold text-white">
          Explore Apex Sports
        </h2>

        <p className="mt-3 leading-7 text-slate-400">
          After exploring these guides, visit our football pages to check
          match schedules, completed results, league tables and player
          scoring statistics.
        </p>

        <nav
          className="mt-5 flex flex-wrap gap-3"
          aria-label="Football pages"
        >
          <Link
            href="/fixtures/epl"
            className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800"
          >
            Premier League Fixtures
          </Link>

          <Link
            href="/results/epl"
            className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800"
          >
            Premier League Results
          </Link>

          <Link
            href="/standings/epl"
            className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800"
          >
            Premier League Standings
          </Link>

          <Link
            href="/top-scorers/epl"
            className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-800"
          >
            Premier League Top Scorers
          </Link>
        </nav>
      </section>
    </main>
  );
}
