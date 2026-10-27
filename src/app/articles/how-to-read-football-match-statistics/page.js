import Link from "next/link";

export const metadata = {
  title: "How to Read Football Match Statistics | Apex Sports",
  description:
    "A practical guide to reading football match statistics, including possession, shots, shots on target, expected goals, passing and defensive numbers without drawing misleading conclusions.",
  alternates: {
    canonical:
      "https://apex-sports-frontend.vercel.app/articles/how-to-read-football-match-statistics",
  },
};

export default function ReadMatchStatisticsArticle() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <article>
        <Link href="/articles" className="text-sm font-bold text-green-500 hover:text-green-400">
          ← Back to Articles
        </Link>

        <header className="mb-10 mt-6">
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
            Football Guide · Statistics
          </div>
          <h1 className="text-[clamp(30px,5vw,48px)] font-extrabold leading-tight">
            How to Read Football Match Statistics Without Misreading the Game
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-400">
            A scoreline tells you the result, but match statistics can help explain how a game unfolded. The key is to read several measures together, understand what each one measures, and avoid treating any single number as proof that a team played better.
          </p>
        </header>

        <section className="mb-10 rounded-[20px] border border-gray-800 bg-[#0b1220] p-6 sm:p-7">
          <h2 className="text-2xl font-extrabold">A quick way to read the numbers</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-slate-300">
            <li>Start with the score and the timing of each goal.</li>
            <li>Compare total shots with shots on target, rather than treating them as the same measure.</li>
            <li>Use expected goals (xG), when available, to compare the estimated quality of chances.</li>
            <li>Read possession and passing numbers in the context of the score and each team's approach.</li>
            <li>Check the source and definition of each statistic before comparing data from different providers.</li>
          </ol>
        </section>

        <div className="space-y-8 text-[16px] leading-8 text-slate-300">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">1. Possession: who had the ball?</h2>
            <p>Possession is the share of time or recorded play during which a team controls the ball, according to the provider's method. It can indicate which team circulated the ball more, but it does not automatically show who created the more dangerous chances.</p>
            <p className="mt-4">A team leading late in a match may deliberately defend deeper and allow its opponent to keep the ball in less threatening areas. Another team may have less possession but attack quickly into space. Read possession alongside shots, chance quality and the match timeline.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">2. Shots and shots on target</h2>
            <p>Total shots count attempts at goal, subject to the provider's event definitions. Shots on target generally include attempts that would enter the goal without a save or are saved by the goalkeeper; blocked shots and attempts that miss are not normally on target.</p>
            <p className="mt-4">For example, imagine Team A takes 15 shots but only two are on target, while Team B takes eight shots and puts five on target. Team A attempted more shots, but the totals alone do not prove that it created better chances. Check where the attempts came from, whether they were blocked, and how difficult they were to save. These numbers are an illustrative example, not a report of a real match.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">3. Expected goals (xG)</h2>
            <p>Expected goals estimates the probability that a shot will become a goal based on factors used by a particular model. Depending on the provider, those factors can include shot location, angle, body part, assist type and the situation in which the shot was taken.</p>
            <p className="mt-4">A shot assigned an xG value of 0.20 is estimated by that model to have a 20% chance of being scored in comparable situations. It does not mean the player scored 0.20 of a goal, and it does not predict the final score. Team xG is often the sum of the xG values for its shots.</p>
            <p className="mt-4">xG models differ between providers, so figures from different services may not match exactly. Penalties usually carry a relatively high xG value, which is one reason it helps to look at goal events and chance context as well as the total.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">4. Passing accuracy and chances created</h2>
            <p>Passing accuracy is usually the proportion of recorded passes completed. A high percentage may reflect patient circulation or many short, low-risk passes; it does not necessarily mean a team progressed the ball effectively. A team attempting difficult forward passes may complete a lower share while still creating dangerous attacks.</p>
            <p className="mt-4">If a provider lists key passes or chances created, check its definition. These measures can help describe attacking involvement, but they do not all measure the same thing and may be recorded differently across services.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">5. Defensive statistics need context too</h2>
            <p>Tackles, interceptions, clearances, blocks and saves describe different defensive actions. A large number of clearances can mean a defence dealt with sustained pressure, but it can also indicate that the team spent long periods defending. A goalkeeper's save count depends partly on how many shots opponents put on target.</p>
            <p className="mt-4">No single defensive statistic measures the quality of an entire defensive performance. Use the event timeline, the scoreline and the opponent's chances to understand what the numbers may indicate.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">A worked example: read the full picture</h2>
            <p>Suppose a fictional match ends 1–0. The losing team has 62% possession and more total shots, while the winning team has fewer attempts but a higher xG total. A careful interpretation would not simply say the losing team dominated because it had more possession. The winning team may have created the clearer chances, but the match timeline and actual shot locations would be needed to explain why.</p>
            <p className="mt-4">This is a hypothetical example. It demonstrates how to combine measures; it is not a claim about a real fixture or a prediction about future results.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Common mistakes to avoid</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>Assuming more possession automatically means a better performance.</li>
              <li>Comparing total shots as though every attempt has the same chance of scoring.</li>
              <li>Treating xG as an actual score or a guarantee of what should have happened.</li>
              <li>Ignoring the score and match state, which can change each team's approach.</li>
              <li>Comparing numbers from different providers without checking their definitions and methods.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Sources and limitations</h2>
            <p>Match statistics are provider-reported data, and definitions or model outputs can vary. This guide explains how to interpret common measures; it does not claim to supply a proprietary xG model or independently verify every event in every match. For a specific fixture, compare the event timeline and statistics from a named provider and treat model-based metrics as estimates.</p>
            <p className="mt-4">For competition rules and official definitions, consult the relevant competition organiser or the IFAB Laws of the Game.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><a className="text-green-500 underline" href="https://www.theifab.com/laws/latest/" target="_blank" rel="noreferrer">IFAB Laws of the Game</a></li>
              <li><a className="text-green-500 underline" href="https://www.premierleague.com/" target="_blank" rel="noreferrer">Premier League official website</a></li>
            </ul>
          </section>
        </div>

        <nav className="mt-10 border-t border-gray-800 pt-6" aria-label="Related football guides">
          <h2 className="mb-3 text-xl font-extrabold">Related guides</h2>
          <ul className="space-y-2">
            <li><Link href="/articles/how-football-goal-difference-works" className="text-green-500 hover:text-green-400">How football goal difference works →</Link></li>
            <li><Link href="/articles/how-football-league-standings-work" className="text-green-500 hover:text-green-400">How football league standings work →</Link></li>
            <li><Link href="/results/epl" className="text-green-500 hover:text-green-400">View Premier League results →</Link></li>
          </ul>
        </nav>
      </article>
    </main>
  );
}
