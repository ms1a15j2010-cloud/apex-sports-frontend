import Link from "next/link";

const canonical =
  "https://apex-sports-frontend.vercel.app/articles/premier-league-matchweek-9-review-november-2026";

export const metadata = {
  title: "Premier League Matchweek 9 Review: Arsenal Lead, Brighton Beat City | Apex Sports",
  description:
    "A data-led review of Premier League Matchweek 9, 31 October to 2 November 2026: all ten results, Arsenal's win at Anfield, Brighton's victory at City and the updated top five.",
  alternates: { canonical },
  openGraph: {
    title: "Premier League Matchweek 9 Review | Apex Sports",
    description:
      "Ten results, three key storylines and the Premier League top five after Matchweek 9.",
    url: canonical,
    siteName: "Apex Sports",
    type: "article",
  },
};

const results = [
  ["Chelsea", "2-0", "Manchester United"],
  ["Bournemouth", "2-0", "Leeds United"],
  ["Brentford", "2-0", "Nottingham Forest"],
  ["Coventry City", "3-1", "Sunderland"],
  ["Hull City", "2-2", "Ipswich Town"],
  ["Manchester City", "0-1", "Brighton"],
  ["Tottenham Hotspur", "2-0", "Crystal Palace"],
  ["Aston Villa", "1-1", "Fulham"],
  ["Liverpool", "0-1", "Arsenal"],
  ["Newcastle United", "0-1", "Everton"],
];

const leaders = [
  ["1", "Arsenal", "24"],
  ["2", "Manchester City", "21"],
  ["3", "Brighton & Hove Albion", "19"],
  ["4", "Chelsea", "16"],
  ["5", "Liverpool", "15"],
];

export default function PremierLeagueMatchweek9Review() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <article>
        <Link
          href="/articles"
          className="text-sm font-bold text-green-500 hover:text-green-400"
        >
          ← Back to Articles
        </Link>

        <header className="mb-8 mt-6">
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
            Premier League · Matchweek 9 Review
          </div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-tight">
            Arsenal Take Control as Brighton Beat City: Premier League Matchweek 9 Review
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Published 3 November 2026 · Matches played 31 October–2 November 2026
          </p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Matchweek 9 produced 21 goals across ten Premier League games, with
            three away wins changing the picture near the top of the table.
            Arsenal left Anfield with a 1-0 victory, Brighton won at Manchester
            City, and Everton took all three points at Newcastle. The round
            also included important home wins for Chelsea, Bournemouth,
            Brentford, Coventry and Tottenham.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-gray-800 bg-[#0b1220] p-6">
          <h2 className="text-xl font-extrabold text-white">The round at a glance</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div><p className="text-2xl font-black text-white">10</p><p className="text-xs text-slate-400">Matches</p></div>
            <div><p className="text-2xl font-black text-white">21</p><p className="text-xs text-slate-400">Goals</p></div>
            <div><p className="text-2xl font-black text-white">5</p><p className="text-xs text-slate-400">Home wins</p></div>
            <div><p className="text-2xl font-black text-white">3</p><p className="text-xs text-slate-400">Away wins</p></div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Two matches ended level. The remaining result was a 0-1 away win,
            with Arsenal, Brighton and Everton all winning on the road.
          </p>
        </section>

        <div className="space-y-8 text-[16px] leading-8 text-slate-300">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">All ten Matchweek 9 results</h2>
            <p className="mb-4">
              The round began on Saturday 31 October and concluded on Monday
              2 November. The table below lists the final scores in home-team
              order.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-900 text-slate-200">
                  <tr><th className="p-3">Home team</th><th className="p-3 text-center">Score</th><th className="p-3">Away team</th></tr>
                </thead>
                <tbody>
                  {results.map(([home, score, away]) => (
                    <tr key={home} className="border-t border-gray-800">
                      <td className="p-3">{home}</td>
                      <td className="p-3 text-center font-extrabold text-white">{score}</td>
                      <td className="p-3">{away}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Arsenal win the key contest at Anfield</h2>
            <p>
              Kai Havertz scored in the 16th minute to give Arsenal a 1-0 win
              over Liverpool. Declan Rice supplied the low delivery for the
              finish, and Arsenal protected the lead through a difficult
              second half. Liverpool did create pressure: Florian Wirtz struck
              the crossbar with a free-kick, but the home side did not register
              a shot on target in the match-centre statistics.
            </p>
            <p className="mt-4">
              The result mattered beyond the three points. After nine matches,
              Arsenal had 24 points, three more than Manchester City. Liverpool
              remained on 15. One result does not decide a title race, but an
              away win at Anfield gave Arsenal a valuable margin at this early
              stage of the season.
            </p>
            <p className="mt-3 text-sm">
              <a className="font-semibold text-green-500 underline" href="https://www.liverpoolfc.com/matches/mens-team/liverpool-v-arsenal-english-premier-league-20261101" target="_blank" rel="noreferrer">Liverpool FC match report and match-centre statistics</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Brighton deliver the round's standout away performance</h2>
            <p>
              Brighton beat Manchester City 1-0 at the Etihad Stadium, with
              Yasin Ayari scoring after eleven minutes. Brighton's official
              report describes a disciplined defensive display, including
              important interventions from Lewis Dunk and goalkeeper Bart
              Verbruggen as City pushed for an equaliser.
            </p>
            <p className="mt-4">
              The win was notable for the venue as well as the points: Brighton
              recorded their first victory at the Etihad. It also kept them
              third in the table on 19 points, two behind City and five behind
              Arsenal.
            </p>
            <p className="mt-3 text-sm">
              <a className="font-semibold text-green-500 underline" href="https://www.brightonandhovealbion.com/media-article/mft-match-report-manchester-city-bha-pl-october-2026" target="_blank" rel="noreferrer">Brighton & Hove Albion official match report</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Everton's late-round win adds pressure below the top six</h2>
            <p>
              Everton beat Newcastle 1-0 on Monday. Thierno Barry scored shortly
              after half-time, turning a rebound into the only goal of the
              game. Everton's win moved them to 13 points and seventh place
              according to the table after the round.
            </p>
            <p className="mt-4">
              The result shows why the table should be read beyond the title
              contenders. Everton moved into the group chasing the European
              places, while Newcastle missed the chance to add points at home.
            </p>
            <p className="mt-3 text-sm">
              <a className="font-semibold text-green-500 underline" href="https://www.evertonfc.com/news/2026/november/02/newcastle-report/" target="_blank" rel="noreferrer">Everton official match report</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Chelsea respond; the middle of the table stays tight</h2>
            <p>
              Chelsea defeated Manchester United 2-0 at Stamford Bridge.
              Morgan Rogers opened the scoring in the 50th minute and Cole
              Palmer converted a penalty in the 64th. United were reduced to
              ten players after Lisandro Martinez was sent off, making the
              second goal and the remaining game state especially important.
            </p>
            <p className="mt-4">
              Chelsea finished the round fourth on 16 points. Brentford,
              Bournemouth and Tottenham also won, while Hull and Ipswich shared
              four goals in a 2-2 draw. Those results kept several clubs close
              together across the middle positions.
            </p>
            <p className="mt-3 text-sm">
              <a className="font-semibold text-green-500 underline" href="https://www.chelseafc.com/en/news/article/match-report-chelsea-2-0-manchester-united" target="_blank" rel="noreferrer">Chelsea FC official match report</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Top five after nine matches</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-900 text-slate-200">
                  <tr><th className="p-3">Position</th><th className="p-3">Club</th><th className="p-3 text-right">Points</th></tr>
                </thead>
                <tbody>
                  {leaders.map(([position, club, points]) => (
                    <tr key={club} className="border-t border-gray-800">
                      <td className="p-3">{position}</td><td className="p-3 font-semibold text-white">{club}</td><td className="p-3 text-right font-extrabold text-white">{points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              This is a snapshot after nine matches, not a prediction. Clubs
              have played the same number of league games, but goal difference
              and the quality of future opposition can still change the order.
            </p>
            <p className="mt-3 text-sm">
              <a className="font-semibold text-green-500 underline" href="https://www.skysports.com/premier-league-table?refresh=1" target="_blank" rel="noreferrer">Premier League table snapshot, updated 2 November 2026</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">What to watch in Matchweek 10</h2>
            <p>
              The next round begins on 6 November, when Everton host Coventry.
              Arsenal, City and Brighton will each have an opportunity to
              protect their position near the top, while the clubs in the
              congested middle group will look to turn one good result into a
              run of points.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/fixtures/epl" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-green-500 hover:bg-slate-800">Upcoming fixtures</Link>
              <Link href="/standings/epl" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-green-500 hover:bg-slate-800">Premier League table</Link>
              <Link href="/results/epl" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-green-500 hover:bg-slate-800">Recent results</Link>
            </div>
          </section>

          <section className="border-t border-gray-800 pt-6">
            <h2 className="mb-3 text-xl font-extrabold text-white">Sources and methodology</h2>
            <p className="text-sm leading-7 text-slate-400">
              Final scores were cross-checked against the published Premier
              League results list. Match events and selected tactical context
              were taken from the clubs' own match reports. The league table is
              a dated snapshot from 2 November 2026; standings can change after
              each fixture. This article is an editorial review, not a live
              score feed.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
              <li><a className="text-green-500 underline" href="https://www.rte.ie/sport/results/soccer/premier-league/36781/results/" target="_blank" rel="noreferrer">RTÉ: Premier League results</a></li>
              <li><a className="text-green-500 underline" href="https://www.liverpoolfc.com/matches/mens-team/liverpool-v-arsenal-english-premier-league-20261101" target="_blank" rel="noreferrer">Liverpool FC: Liverpool vs Arsenal</a></li>
              <li><a className="text-green-500 underline" href="https://www.brightonandhovealbion.com/media-article/mft-match-report-manchester-city-bha-pl-october-2026" target="_blank" rel="noreferrer">Brighton: Manchester City vs Brighton</a></li>
              <li><a className="text-green-500 underline" href="https://www.evertonfc.com/news/2026/november/02/newcastle-report/" target="_blank" rel="noreferrer">Everton: Newcastle vs Everton</a></li>
              <li><a className="text-green-500 underline" href="https://www.chelseafc.com/en/news/article/match-report-chelsea-2-0-manchester-united" target="_blank" rel="noreferrer">Chelsea: Chelsea vs Manchester United</a></li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
