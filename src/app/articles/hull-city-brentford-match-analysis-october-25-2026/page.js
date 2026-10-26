import Link from "next/link";

export const metadata = {
  title: "Hull City 1-1 Brentford: Match Analysis | Apex Sports",
  description: "A data-led review of Hull City 1-1 Brentford on 25 October 2026, including goals, possession, shots and expected goals.",
  alternates: { canonical: "https://apex-sports-frontend.vercel.app/articles/hull-city-brentford-match-analysis-october-25-2026" },
};

export default function HullBrentfordAnalysis() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <article>
        <Link href="/articles" className="text-sm font-bold text-green-500 hover:text-green-400">← Back to Articles</Link>
        <header className="mb-8 mt-6">
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">Premier League · Match Analysis</div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-tight">Hull City 1-1 Brentford: What the Match Statistics Tell Us</h1>
          <p className="mt-4 text-base leading-7 text-slate-400">25 October 2026 · MKM Stadium</p>
        </header>
        <section className="mb-8 rounded-2xl border border-gray-800 bg-[#0b1220] p-6">
          <p className="text-2xl font-extrabold">Hull City 1-1 Brentford</p>
          <p className="mt-3 leading-7 text-slate-300">Ollie McBurnie scored from the penalty spot for Hull before Dango Ouattara equalised for Brentford. The draw reflected a contest in which Brentford had more of the ball, while both teams produced a similar expected-goals total.</p>
        </section>
        <div className="space-y-8 text-[16px] leading-8 text-slate-300">
          <section><h2 className="mb-3 text-2xl font-extrabold text-white">The match in numbers</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800"><table className="w-full text-left text-sm"><thead className="bg-gray-900"><tr><th className="p-3">Metric</th><th className="p-3">Hull City</th><th className="p-3">Brentford</th></tr></thead><tbody>
            <tr className="border-t border-gray-800"><td className="p-3">Possession</td><td className="p-3">42%</td><td className="p-3">58%</td></tr>
            <tr className="border-t border-gray-800"><td className="p-3">Shots</td><td className="p-3">12</td><td className="p-3">14</td></tr>
            <tr className="border-t border-gray-800"><td className="p-3">Shots on target</td><td className="p-3">2</td><td className="p-3">6</td></tr>
            <tr className="border-t border-gray-800"><td className="p-3">Expected goals (xG)</td><td className="p-3">1.84</td><td className="p-3">1.81</td></tr>
            </tbody></table></div>
            <p className="mt-4">Brentford's possession and shot-on-target advantage suggest they tested the goalkeeper more often. However, the near-equal xG totals indicate that the overall quality of chances was much closer than the shots-on-target count alone suggests.</p>
          </section>
          <section><h2 className="mb-3 text-2xl font-extrabold text-white">Why the draw makes sense</h2><p>Hull's penalty gave the hosts a route to the lead, while Ouattara's second-half goal brought Brentford level. A penalty can materially raise a team's xG, so the total should not be read as a simple count of open-play chances. The available numbers point to different strengths: Brentford generated more attempts and controlled possession, while Hull remained competitive in the chance-quality measure.</p><p className="mt-4">Neither possession nor xG proves which side “deserved” to win. They describe different parts of the match and should be read alongside the goal events.</p></section>
          <section><h2 className="mb-3 text-2xl font-extrabold text-white">What the statistics cannot tell us</h2><p>Team-level figures do not fully explain defensive pressure, the timing of chances or individual decision-making. The figures also vary slightly between providers because their event definitions and models can differ. Treat the table as a useful snapshot, not a complete tactical explanation.</p></section>
          <section><h2 className="mb-3 text-2xl font-extrabold text-white">Sources and methodology</h2><p>Score and event details were cross-checked against published match reports and statistics. xG is an estimate of the probability that a shot becomes a goal, not a prediction of the final score.</p><ul className="mt-3 list-disc space-y-2 pl-6"><li><a className="text-green-500 underline" href="https://www.skysports.com/football/hull-city-vs-brentford/stats/7355766645827227232" target="_blank" rel="noreferrer">Sky Sports match statistics</a></li><li><a className="text-green-500 underline" href="https://www.footballwebpages.co.uk/match/2026-2027/premier-league/hull-city/brentford/591006" target="_blank" rel="noreferrer">Football Web Pages match report and data</a></li></ul></section>
        </div>
      </article>
    </main>
  );
}
