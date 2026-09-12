import Link from "next/link";

export const metadata = {
  title:
    "How Football League Standings Work: Points & Goal Difference | Apex Sports",
  description:
    "Learn how football league standings work, including points, wins, draws, goal difference, goals scored, head-to-head records and qualification.",
  alternates: {
    canonical:
      "https://apex-sports-frontend.vercel.app/articles/how-football-league-standings-work",
  },
};

export default function FootballLeagueStandingsArticle() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <article>
        <Link
          href="/articles"
          className="text-sm font-bold text-green-500 no-underline hover:text-green-400"
        >
          ← Back to Articles
        </Link>

        <header className="mb-10 mt-6">
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
            Football Guide
          </div>

          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-tight">
            How Football League Standings Work: Points, Goal Difference and
            Qualification
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-400">
            Understanding how football league tables are calculated makes it
            easier to follow a season and understand the title race,
            qualification places and relegation battles.
          </p>
        </header>

        <div className="space-y-8 text-[16px] leading-8 text-slate-300">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How points are awarded
            </h2>

            <p>
              Most football leagues use a simple points system. A win normally
              earns three points, a draw earns one point for each team, and a
              loss earns zero points.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Win: 3 points</li>
              <li>Draw: 1 point</li>
              <li>Loss: 0 points</li>
            </ul>

            <p className="mt-4">
              For example, a team that wins five matches and draws two earns
              17 points from those seven matches.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              What happens when teams have the same points?
            </h2>

            <p>
              Two or more teams can finish level on points. Competitions then
              use additional ranking criteria to separate them. The exact
              order of these criteria depends on the competition regulations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              What is goal difference?
            </h2>

            <p>
              Goal difference is calculated by subtracting goals conceded from
              goals scored.
            </p>

            <div className="my-5 rounded-[16px] border border-gray-800 bg-gray-900 p-5">
              <p className="font-bold text-green-500">
                Goals scored − Goals conceded = Goal difference
              </p>
            </div>

            <p>
              For example, if a team scores 62 goals and concedes 35, its goal
              difference is +27. In competitions that use goal difference as a
              tiebreaker, a higher figure can give a team the advantage over
              another team with the same number of points.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Goals scored
            </h2>

            <p>
              Some competitions also use the number of goals scored as a
              tiebreaker. If teams have the same points and the same goal
              difference, goals scored may be considered depending on the
              competition's rules.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Head-to-head records
            </h2>

            <p>
              Some leagues and competitions use head-to-head results when
              teams finish level. This means the results between the teams
              involved are compared directly.
            </p>

            <p className="mt-4">
              Because tiebreaking rules differ between competitions, it is
              always best to check the regulations for the specific league or
              tournament.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How to read a football league table
            </h2>

            <div className="my-5 overflow-x-auto rounded-[16px] border border-gray-800">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-bold text-white">Column</th>
                    <th className="px-4 py-3 font-bold text-white">
                      Meaning
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Position</td>
                    <td className="px-4 py-3">Current league rank</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Played</td>
                    <td className="px-4 py-3">Matches completed</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Won</td>
                    <td className="px-4 py-3">Matches won</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Drawn</td>
                    <td className="px-4 py-3">Matches that ended level</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Lost</td>
                    <td className="px-4 py-3">Matches lost</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Goals For</td>
                    <td className="px-4 py-3">Total goals scored</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Goals Against</td>
                    <td className="px-4 py-3">Total goals conceded</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Goal Difference</td>
                    <td className="px-4 py-3">
                      Goals scored minus goals conceded
                    </td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Points</td>
                    <td className="px-4 py-3">Total points earned</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Why goal difference matters
            </h2>

            <p>
              Goal difference can become particularly important near the end
              of a season when teams are separated by only a few points. A
              team may finish above another team with the same points if it has
              the better applicable tiebreaker.
            </p>

            <div className="my-5 overflow-x-auto rounded-[16px] border border-gray-800">
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-bold text-white">Team</th>
                    <th className="px-4 py-3 font-bold text-white">Points</th>
                    <th className="px-4 py-3 font-bold text-white">
                      Goal Difference
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3">Team A</td>
                    <td className="px-4 py-3">68</td>
                    <td className="px-4 py-3">+24</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3">Team B</td>
                    <td className="px-4 py-3">68</td>
                    <td className="px-4 py-3">+17</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              What league positions can mean
            </h2>

            <p>
              A team's league position can have important consequences.
              Depending on the competition and season, clubs near the top may
              compete for the championship or qualification for continental
              competitions, while teams near the bottom may be fighting
              relegation or a playoff position.
            </p>

            <p className="mt-4">
              Qualification and relegation rules are competition-specific and
              can change, so the official regulations for the relevant
              competition should always be used for definitive information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Points per game
            </h2>

            <p>
              Points per game can provide additional context when teams have
              played a different number of matches.
            </p>

            <div className="my-5 rounded-[16px] border border-gray-800 bg-gray-900 p-5">
              <p className="font-bold text-green-500">
                Points ÷ Matches Played = Points Per Game
              </p>
            </div>

            <p>
              For example, 30 points from 15 matches equals 2.0 points per
              game. This can be useful for comparing performance during an
              incomplete season, although the official table uses the
              competition's ranking rules.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How the table changes during a season
            </h2>

            <p>
              A league table is a snapshot of completed matches rather than a
              prediction of the final standings. A strong run can move a team
              several places, while dropped points can cause a team near the
              top to lose ground.
            </p>

            <p className="mt-4">
              This is why standings are most useful when viewed alongside
              recent results, upcoming fixtures, goals scored and goals
              conceded.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Follow football standings on Apex Sports
            </h2>

            <p>
              Apex Sports provides football information designed to make it
              easier to follow competitions throughout the season. You can
              compare league standings with fixtures, results and player
              statistics to get more context around team performance.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/standings/epl"
                className="rounded-lg bg-green-500 px-4 py-2.5 font-bold text-black no-underline transition hover:bg-green-400"
              >
                EPL Standings
              </Link>

              <Link
                href="/fixtures/epl"
                className="rounded-lg border border-gray-700 px-4 py-2.5 font-bold text-white no-underline transition hover:border-gray-500"
              >
                EPL Fixtures
              </Link>

              <Link
                href="/results/epl"
                className="rounded-lg border border-gray-700 px-4 py-2.5 font-bold text-white no-underline transition hover:border-gray-500"
              >
                EPL Results
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Final takeaway
            </h2>

            <p>
              Football league standings are based primarily on points, but
              additional tiebreaking criteria can determine the order when
              teams finish level. Understanding wins, draws, goals, goal
              difference and competition-specific rules makes league tables
              much easier to follow.
            </p>

            <p className="mt-4">
              When following a season, look beyond position alone. The number
              of matches played, recent results, goals and points all provide
              useful context for understanding a team's current position.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

