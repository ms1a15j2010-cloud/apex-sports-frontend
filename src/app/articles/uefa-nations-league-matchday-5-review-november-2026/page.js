import Link from "next/link";

const canonical =
  "https://apex-sports-frontend.vercel.app/articles/uefa-nations-league-matchday-5-review-november-2026";

export const metadata = {
  title: "England Reach Nations League Quarter-finals as Italy Beat France | Apex Sports",
  description:
    "A matchday review of England 2-1 Croatia and Italy 3-1 France, with all eight UEFA Nations League results from 12 November 2026 and the Group A1 implications.",
  alternates: { canonical },
  openGraph: {
    title: "England Reach the Last Eight as Italy Reopen Group A1",
    description:
      "What England's late winner and Italy's comeback mean after UEFA Nations League Matchday 5.",
    url: canonical,
    siteName: "Apex Sports",
    type: "article",
  },
};

const results = [
  ["Türkiye", "1–2", "Belgium", "League A · Group A1"],
  ["Italy", "3–1", "France", "League A · Group A1"],
  ["England", "2–1", "Croatia", "League A · Group A3"],
  ["Czechia", "0–2", "Spain", "League A · Group A3"],
  ["Albania", "2–0", "Finland", "League C · Group C1"],
  ["San Marino", "0–2", "Belarus", "League C · Group C1"],
  ["Armenia", "1–1", "Cyprus", "League C · Group C2"],
  ["Montenegro", "2–1", "Latvia", "League C · Group C2"],
];

export default function NationsLeagueMatchdayFiveReview() {
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
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
            International football · UEFA Nations League · Matchday 5
          </p>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-tight">
            England Reach the Last Eight as Italy Reopen Group A1
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Published 13 November 2026 · Matches reviewed: 12 November 2026
          </p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Thursday’s Nations League programme produced two decisive stories in League A.
            England beat Croatia 2–1 at Wembley to secure a place in the quarter-finals,
            while Italy recovered from an early setback to defeat France 3–1. Belgium’s
            win in Türkiye means Group A1 remains unresolved heading into its final matchday.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Apex Sports Editorial Desk · Match reports checked against UEFA’s official matchday coverage
          </p>
        </header>

        <section className="mb-9 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-extrabold text-white">Matchday 5 results</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            All eight results from Thursday 12 November, grouped by Nations League section.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-slate-700 text-slate-400">
                <tr>
                  <th className="px-3 py-3">Home</th>
                  <th className="px-3 py-3 text-center">Score</th>
                  <th className="px-3 py-3">Away</th>
                  <th className="px-3 py-3">Section</th>
                </tr>
              </thead>
              <tbody>
                {results.map(([home, score, away, group]) => (
                  <tr key={home} className="border-b border-slate-800">
                    <td className="px-3 py-3 font-semibold text-white">{home}</td>
                    <td className="px-3 py-3 text-center font-extrabold text-white">{score}</td>
                    <td className="px-3 py-3">{away}</td>
                    <td className="px-3 py-3 text-xs text-slate-400">{group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-8 text-[16px] leading-8 text-slate-300">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">England’s win was built around two key moments</h2>
            <p>
              Morgan Rogers put England ahead in the first half after receiving Jude Bellingham’s
              pass. Croatia restored parity through Petar Sučić after the interval, briefly
              changing the pressure on the home side. Harry Kane then converted a penalty five
              minutes later, giving England a lead they protected through the closing stages.
            </p>
            <p className="mt-4">
              The result had significance beyond the score. Kane’s appearance was his 126th for
              England, taking him past Peter Shilton as the men’s team’s record appearance holder.
              He also scored the goal that confirmed England’s place in the Nations League last
              eight. The ending was not entirely comfortable: Nikola Vlašić shot narrowly wide
              and Jarell Quansah blocked an effort from Ante Budimir.
            </p>
            <p className="mt-4">
              The useful lesson from this match is how quickly the game state changed. England
              had to respond after Croatia equalised, and the decisive penalty restored their
              advantage before the visitors could build further momentum. The late defensive
              interventions show that qualification was secured under pressure rather than
              through a quiet finish.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Italy’s comeback changed the Group A1 picture</h2>
            <p>
              France struck first through Michael Olise, but Pio Esposito brought Italy level
              during the opening half. France then came close to regaining control when Bradley
              Barcola and Rayan Cherki hit the woodwork. Italy’s response was decisive: Davide
              Frattesi put the hosts ahead, and Esposito converted a penalty for his second goal.
            </p>
            <p className="mt-4">
              This was more than a recovery from conceding first. Italy turned a match in which
              France had threatened to score again into a two-goal win. The result moved Italy
              level with France on ten points, while Belgium’s 2–1 comeback win in Türkiye kept
              the group’s final qualification places open. UEFA described Matchday 6 as a
              three-way contest for the two quarter-final places.
            </p>
            <p className="mt-4">
              That context matters when reading the table: a team can win an important match
              without the group being settled. The final round, not the headline result alone,
              will determine which two sides progress.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Other results: promotion races and group positions</h2>
            <p>
              Spain won 2–0 away to Czechia, with a penalty from Álex Baena and a late finish
              from Marc Pubill. Albania beat Finland 2–0, and Belarus defeated San Marino by
              the same score; those results confirmed Albania and Belarus as the top two in
              Group C1 before their final meeting. Montenegro’s 2–1 win over Latvia secured
              promotion from Group C2, while Armenia and Cyprus drew 1–1.
            </p>
            <p className="mt-4">
              These results show why a matchday roundup should include more than the biggest
              teams. In the lower leagues, the consequences can be just as concrete: promotion
              positions and group finishing places were clarified before the final games.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">What to watch next</h2>
            <p>
              The next fixtures will determine the remaining group outcomes. In Group A1,
              Italy’s result against France and Belgium’s win in Türkiye have created a
              high-stakes final stage. For England, the quarter-final place is secured, but
              the final group match remains an opportunity to finish the league phase strongly.
            </p>
            <p className="mt-4">
              Apex Sports will keep Premier League coverage separate from international
              football coverage. The English league is paused for the November international
              window and is scheduled to return on Saturday 21 November 2026.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-extrabold text-white">Sources and editorial method</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Scores, scorers, match events and group implications in this review were checked
              against UEFA’s official Matchday 5 roundup. The Premier League return date was
              checked against the league’s published 2026/27 international-break calendar.
              This article adds Apex Sports’ comparison of the match situations; it does not
              reproduce a live data feed or predict the final group standings.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
              <li>
                <a
                  href="https://www.uefa.com/uefanationsleague/news/02ab-220e66a3c090-9304054ed1ca-1000--uefa-nations-league-matchday-5-highlights-harry-kane-sends-/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-green-500 underline"
                >
                  UEFA: Nations League Matchday 5 results and match reports
                </a>
              </li>
              <li>
                <a
                  href="https://www.premierleague.com/en/news/4689113/when-are-the-international-breaks-for-202627"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-green-500 underline"
                >
                  Premier League: 2026/27 international-break dates
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Data note: official competition reports are the reference for this article. If a
              later correction is published, this page should be updated and the change recorded.
            </p>
          </section>
        </div>

        <nav className="mt-10 flex flex-wrap gap-4" aria-label="Related football pages">
          <Link href="/articles/premier-league-matchweek-9-review-november-2026" className="font-semibold text-green-500 hover:text-green-400">
            Premier League Matchweek 9 review →
          </Link>
          <Link href="/fixtures/epl" className="font-semibold text-green-500 hover:text-green-400">
            Premier League fixtures →
          </Link>
          <Link href="/articles" className="font-semibold text-green-500 hover:text-green-400">
            All articles and guides →
          </Link>
        </nav>
      </article>
    </main>
  );
}
