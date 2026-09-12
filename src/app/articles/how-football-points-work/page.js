import Link from "next/link";

export const metadata = {
  title: "How Football Points Work: Wins, Draws & League Tables | Apex Sports",
  description:
    "Learn how football league points are calculated, including wins, draws, losses, goal difference, points per game and how results affect league positions.",
  alternates: {
    canonical:
      "https://apex-sports-frontend.vercel.app/articles/how-football-points-work",
  },
};

export default function FootballPointsArticle() {
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
            How Football Points Work: Wins, Draws, Losses and League Tables
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-400">
            Football league tables use points to rank teams throughout a
            season. Understanding how points are awarded helps explain why
            teams move up or down the table after every match.
          </p>
        </header>

        <div className="space-y-8 text-[16px] leading-8 text-slate-300">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How football points are awarded
            </h2>

            <p>
              In most association football league competitions, teams receive
              points based on the result of each match. A win normally gives
              three points, a draw gives one point to each team, and a loss
              gives zero points.
            </p>

            <div className="my-5 overflow-x-auto rounded-[16px] border border-gray-800">
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-bold text-white">
                      Match Result
                    </th>
                    <th className="px-4 py-3 font-bold text-white">
                      Points Earned
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3">Win</td>
                    <td className="px-4 py-3 font-bold">3 points</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3">Draw</td>
                    <td className="px-4 py-3 font-bold">1 point</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3">Loss</td>
                    <td className="px-4 py-3 font-bold">0 points</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              This system rewards teams more strongly for winning matches than
              for drawing them. As a result, a team that consistently wins can
              build a significant points advantage over a team that records
              many draws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How three points for a win affects the table
            </h2>

            <p>
              The three-point system means that a win can have a large effect
              on the league table. A team earns three points for winning,
              while its opponent receives none.
            </p>

            <p className="mt-4">
              For example, if Team A defeats Team B, Team A adds three points
              to its total. Team B does not receive a point for the defeat.
            </p>

            <div className="my-5 rounded-[16px] border border-gray-800 bg-gray-900 p-5">
              <p className="font-bold text-green-500">
                Win = 3 points for the winning team
              </p>
              <p className="mt-2 font-bold text-slate-300">
                Loss = 0 points for the losing team
              </p>
            </div>

            <p>
              Because points are awarded for every league match, a strong run
              of victories can quickly change a team's position.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              What happens when a match ends in a draw?
            </h2>

            <p>
              When a league match ends level, both teams normally receive one
              point. Neither team receives the three points available for a
              victory.
            </p>

            <p className="mt-4">
              For example, if a match finishes 1–1, both teams receive one
              point. The result therefore adds two points to the combined
              league totals of the two clubs.
            </p>

            <p className="mt-4">
              A team with many draws can still collect a substantial number of
              points, but it may gain ground more slowly than a team that turns
              similar matches into wins.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How losses affect a team's points
            </h2>

            <p>
              A team normally receives zero league points when it loses a
              match. The opponent receives three points for the victory.
            </p>

            <p className="mt-4">
              Losing several matches in a short period can therefore cause a
              team to fall behind competitors, particularly when those
              competitors are collecting points consistently.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Example: calculating points from results
            </h2>

            <p>
              Imagine a team has played ten league matches with the following
              record:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>6 wins</li>
              <li>2 draws</li>
              <li>2 losses</li>
            </ul>

            <p className="mt-4">
              The team's points can be calculated by multiplying wins by three
              and draws by one.
            </p>

            <div className="my-5 rounded-[16px] border border-gray-800 bg-gray-900 p-5">
              <p className="font-bold text-green-500">
                6 wins × 3 = 18 points
              </p>

              <p className="mt-2 font-bold text-green-500">
                2 draws × 1 = 2 points
              </p>

              <p className="mt-2 font-bold text-slate-300">
                2 losses × 0 = 0 points
              </p>

              <p className="mt-4 border-t border-gray-800 pt-4 font-extrabold text-white">
                Total = 20 points
              </p>
            </div>

            <p>
              The team would therefore have 20 points from those ten matches,
              before considering any competition-specific deductions or other
              exceptional circumstances.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Why points are more important than wins alone
            </h2>

            <p>
              Wins are important, but league position is normally determined by
              total points rather than the number of victories alone.
            </p>

            <p className="mt-4">
              Consider two teams that have played the same number of matches.
              One team could have more wins but also more losses, while another
              team could have fewer wins and several draws. Their final
              positions depend on the total points accumulated from all of
              their results.
            </p>

            <p className="mt-4">
              This is why the full league record matters rather than looking at
              only one statistic.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Points and goal difference
            </h2>

            <p>
              Points normally come first when teams are ranked in a league
              table. However, two or more teams can finish with the same number
              of points.
            </p>

            <p className="mt-4">
              Competitions then use additional tiebreaking criteria according
              to their regulations. In many competitions, goal difference is
              one of the important criteria.
            </p>

            <div className="my-5 rounded-[16px] border border-gray-800 bg-gray-900 p-5">
              <p className="font-bold text-green-500">
                Goal Difference = Goals Scored − Goals Conceded
              </p>
            </div>

            <p>
              For example, a team that has scored 50 goals and conceded 30 has
              a goal difference of +20.
            </p>

            <p className="mt-4">
              The exact tiebreaking order differs between competitions, so the
              official rules of the relevant league should be checked when
              teams are level on points.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Why every match matters
            </h2>

            <p>
              A football season contains many matches, and each result can
              change the points total. This makes consistency particularly
              important over a long campaign.
            </p>

            <p className="mt-4">
              A team may have an excellent start to the season but lose ground
              after a series of draws or defeats. Another team can close the
              gap by collecting points consistently.
            </p>

            <p className="mt-4">
              Near the end of a season, even a single win can make a meaningful
              difference in a title race, European qualification battle or
              relegation fight.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Points per game
            </h2>

            <p>
              Points per game is a useful additional measurement when teams
              have played different numbers of matches or when evaluating
              performance during an ongoing season.
            </p>

            <div className="my-5 rounded-[16px] border border-gray-800 bg-gray-900 p-5">
              <p className="font-bold text-green-500">
                Points Per Game = Total Points ÷ Matches Played
              </p>
            </div>

            <p>
              For example, a team with 30 points after 15 matches has a points
              per game rate of 2.0.
            </p>

            <p className="mt-4">
              Points per game does not replace the official league table, but
              it can provide useful context when comparing teams at different
              stages of a competition.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              How points influence a league position
            </h2>

            <p>
              The number of points a team has determines where it stands
              relative to other teams, subject to the competition's
              tiebreaking rules.
            </p>

            <div className="my-5 overflow-x-auto rounded-[16px] border border-gray-800">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-bold text-white">Team</th>
                    <th className="px-4 py-3 font-bold text-white">
                      Played
                    </th>
                    <th className="px-4 py-3 font-bold text-white">Wins</th>
                    <th className="px-4 py-3 font-bold text-white">
                      Draws
                    </th>
                    <th className="px-4 py-3 font-bold text-white">
                      Losses
                    </th>
                    <th className="px-4 py-3 font-bold text-white">
                      Points
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Team A</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3 font-bold">22</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Team B</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3 font-bold">21</td>
                  </tr>

                  <tr className="border-t border-gray-800">
                    <td className="px-4 py-3 font-bold">Team C</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3 font-bold">18</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              In this example, Team A leads because it has the highest points
              total. Team B has fewer wins but remains close because it has
              collected several points from draws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Can points be deducted?
            </h2>

            <p>
              In some competitions, a club can receive a points deduction as a
              disciplinary or regulatory sanction. Such deductions are
              competition-specific and are not part of the normal three-points
              for a win system.
            </p>

            <p className="mt-4">
              When a points deduction occurs, the official competition
              announcement and regulations should be used to understand the
              reason and the exact effect on the league table.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Why league tables change throughout the season
            </h2>

            <p>
              A league table is continuously updated as matches are completed.
              Every win, draw and loss changes the points totals of the teams
              involved.
            </p>

            <p className="mt-4">
              This means a team near the top can lose its position after one
              matchday, while a team lower down can climb several places after
              collecting a strong run of results.
            </p>

            <p className="mt-4">
              Looking at the current points total together with matches played,
              recent results and goal difference gives a better understanding
              of a team's position.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Follow football standings and results on Apex Sports
            </h2>

            <p>
              Apex Sports provides football information including league
              standings, fixtures, results and player statistics. These pages
              can be used together to follow how teams perform throughout a
              season.
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

              <Link
                href="/top-scorers/epl"
                className="rounded-lg border border-gray-700 px-4 py-2.5 font-bold text-white no-underline transition hover:border-gray-500"
              >
                EPL Top Scorers
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Final takeaway
            </h2>

            <p>
              Football league points are primarily earned through wins and
              draws. Three points are normally awarded for a win, one point for
              a draw and zero points for a loss. These totals determine league
              positions, with additional tiebreaking rules used when teams have
              the same number of points.
            </p>

            <p className="mt-4">
              Understanding points makes it easier to follow title races,
              qualification battles and relegation fights. For a complete
              picture, combine points with matches played, recent results and
              goal difference.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}