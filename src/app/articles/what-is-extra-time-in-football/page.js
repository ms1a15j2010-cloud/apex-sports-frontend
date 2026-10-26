import Link from "next/link";

export const metadata = {
  title: "What Is Extra Time in Football? Rules and How It Works | Apex Sports",
  description:
    "Learn when extra time is played in football, how its two 15-minute periods work, and what happens if a knockout match remains level.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/articles/what-is-extra-time-in-football",
  },
};

export default function ExtraTimeArticlePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-200 sm:px-6 lg:px-8">
      <article>
        <Link href="/articles" className="text-sm font-semibold text-green-500 hover:text-green-400">
          ← Back to Articles
        </Link>

        <header className="mb-10 mt-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-green-500">
            Football Guide
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            What Is Extra Time in Football?
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Extra time is an additional period used in some knockout matches when the teams are level after normal time and the competition rules require a winner. It gives both sides another opportunity to score before a possible penalty shootout.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How long is extra time?</h2>
          <p className="leading-7">
            In the standard format, extra time lasts 30 minutes and is divided into two 15-minute periods. The referee may add stoppage time to either period when play has been interrupted. Competition regulations determine the exact procedure for the match.
          </p>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="font-semibold text-white">Standard extra-time format</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
              <li>First period: 15 minutes</li>
              <li>Short interval and change of ends</li>
              <li>Second period: 15 minutes</li>
              <li>Penalty shootout if the tie is still level and the rules require one</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-white">When is extra time used?</h2>
          <p className="leading-7">
            Extra time is most often associated with knockout football, where a team must advance to the next round or win a final. It is not normally used in league matches simply because the score is tied: a draw is an accepted league result.
          </p>
          <p className="leading-7">
            Not every knockout competition uses extra time. Some formats move directly to penalties, while two-legged ties may have specific rules for deciding the aggregate winner. Always check the regulations for the tournament being played.
          </p>

          <h2 className="text-2xl font-bold text-white">What happens if the score is still level?</h2>
          <p className="leading-7">
            If the teams remain level after extra time and the competition requires a winner, the match may be decided by a penalty shootout. The shootout is recorded separately from goals scored during normal time and extra time, so a displayed match score may not include the penalty tally in the same figures.
          </p>

          <h2 className="text-2xl font-bold text-white">Extra time vs added time</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-900">
                <tr>
                  <th className="p-3 text-white">Term</th>
                  <th className="p-3 text-white">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-800">
                  <td className="p-3 font-semibold">Added time</td>
                  <td className="p-3 leading-6">Time added at the end of a playing period to account for interruptions.</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="p-3 font-semibold">Extra time</td>
                  <td className="p-3 leading-6">Additional playing periods used by some competitions to help decide a tied knockout match.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white">Why extra time changes the match</h2>
          <p className="leading-7">
            Players have already completed normal time, so fatigue, substitutions and tactical adjustments can become especially important. A team may try to control possession and conserve energy, while another may press for a goal before the possibility of penalties. These are tactical choices rather than fixed rules.
          </p>

          <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          <h3 className="text-lg font-bold text-white">Does every tied match go to extra time?</h3>
          <p className="leading-7">
            No. League games can finish as draws. Extra time is used only when the competition format calls for it.
          </p>
          <h3 className="text-lg font-bold text-white">Can a goal be scored during extra time?</h3>
          <p className="leading-7">
            Yes. Goals scored during extra time count toward the match score. Play continues until the period ends, subject to the referee's decisions.
          </p>
          <h3 className="text-lg font-bold text-white">Is extra time the same as a penalty shootout?</h3>
          <p className="leading-7">
            No. Extra time is additional open play. A penalty shootout is a separate method used by some competitions to decide a winner if the tie remains level.
          </p>

          <h2 className="text-2xl font-bold text-white">Key takeaway</h2>
          <p className="leading-7">
            Extra time is usually two 15-minute periods played in certain knockout matches when a winner is required. The tournament rules decide whether extra time is used and whether penalties follow. It should not be confused with added time, which compensates for stoppages during a period.
          </p>
        </section>

        <nav aria-label="Related football pages" className="mt-10 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
          <Link href="/fixtures/epl" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-900">
            Premier League Fixtures
          </Link>
          <Link href="/results/epl" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-900">
            Match Results
          </Link>
          <Link href="/articles/what-is-added-time-in-football" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:bg-slate-900">
            Added Time Explained
          </Link>
        </nav>
      </article>
    </main>
  );
}
