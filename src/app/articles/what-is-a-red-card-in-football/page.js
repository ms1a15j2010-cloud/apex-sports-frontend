import Link from "next/link";

export const metadata = {
  title: "What Is a Red Card in Football? Rules, Fouls and Dismissals | Apex Sports",
  description:
    "Learn what a red card means in football, why players are sent off, second yellow cards, serious fouls, denying goals, substitutions and suspensions.",
  alternates: {
    canonical:
      "https://apex-sports-frontend.vercel.app/articles/what-is-a-red-card-in-football",
  },
};

export default function RedCardArticle() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article>
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold text-blue-600">
            Football Guide
          </p>

          <h1 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Is a Red Card in Football?
          </h1>

          <p className="text-lg leading-8 text-gray-600">
            A red card is the most serious disciplinary punishment a referee
            can give during a football match. It means a player or team
            official has been sent off. Learn why red cards are issued, what
            happens after a dismissal, and how losing a player affects a team.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            What Is a Red Card?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A red card is an official dismissal issued by the referee. When a
            player receives a red card, they must leave the field and cannot
            take any further part in the match.
          </p>

          <p className="leading-7 text-gray-700">
            Unlike a yellow card, a red card immediately removes the player
            from the match. Their team normally has to continue with one fewer
            player.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Why Is a Red Card Given?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            The Laws of the Game identify several offences that can result in
            a sending-off. These include serious foul play, violent conduct,
            denying an obvious goal-scoring opportunity in certain
            circumstances, offensive or abusive language or actions, and
            receiving a second caution in the same match.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>• Serious foul play.</li>
            <li>• Violent conduct.</li>
            <li>• Denying a goal or obvious goal-scoring opportunity in situations covered by the Laws.</li>
            <li>• Using offensive, insulting or abusive language or actions.</li>
            <li>• Receiving a second yellow card in the same match.</li>
            <li>• Other sending-off offences defined by the Laws of the Game.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Second Yellow Card
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A player can also be sent off after receiving two yellow cards in
            the same match.
          </p>

          <p className="leading-7 text-gray-700">
            The second caution becomes a dismissal. The player must leave the
            field and cannot continue playing, while the team normally remains
            with one fewer player.
          </p>

          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-2 font-bold text-gray-900">
              Example
            </h3>

            <p className="leading-7 text-gray-700">
              A midfielder receives a yellow card in the first half. Later in
              the match, the same player commits another cautionable offence.
              The referee shows a second yellow card followed by a red card,
              and the player is dismissed.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Serious Foul Play
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A player can receive a straight red card for serious foul play.
            This generally involves a challenge or action that uses excessive
            force or endangers the safety of an opponent.
          </p>

          <p className="leading-7 text-gray-700">
            The referee considers the nature of the challenge, the force used
            and the danger created when deciding whether an offence meets the
            threshold for serious foul play.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Violent Conduct
          </h2>

          <p className="leading-7 text-gray-700">
            Violent conduct is another offence that can result in a straight
            red card. It involves using or attempting to use excessive force
            or brutality against another person when the ball is not being
            challenged for in the relevant way.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Denying a Goal or Obvious Goal-Scoring Opportunity
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A player can be sent off for denying the opposing team a goal or an
            obvious goal-scoring opportunity in circumstances specified by the
            Laws of the Game.
          </p>

          <p className="leading-7 text-gray-700">
            The exact disciplinary punishment depends on how the offence
            happened. For example, the rules distinguish between certain
            deliberate handball offences and fouls inside or outside the
            penalty area.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Red Card for Offensive or Abusive Behaviour
          </h2>

          <p className="leading-7 text-gray-700">
            Offensive, insulting or abusive language or actions can also result
            in a red card. This can apply to conduct directed at opponents,
            teammates, match officials or other people involved in the match.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            What Happens After a Player Is Sent Off?
          </h2>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <ul className="space-y-3 text-gray-700">
              <li>
                • The player must leave the field and its immediate technical
                area as required by the Laws.
              </li>
              <li>
                • The player cannot return to participate in the match.
              </li>
              <li>
                • The team normally continues with one fewer player.
              </li>
              <li>
                • The dismissal is recorded in the match report.
              </li>
              <li>
                • Additional disciplinary consequences can follow under the
                competition regulations.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Can a Sent-Off Player Be Replaced?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            In normal competitive football, a player who is sent off cannot be
            replaced by a substitute. The team must continue with fewer
            players.
          </p>

          <p className="leading-7 text-gray-700">
            This is different from a normal substitution, where one player
            leaves and another player enters without reducing the team's
            numbers.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Can a Red Card Be Given to a Substitute?
          </h2>

          <p className="leading-7 text-gray-700">
            Yes. A substitute or team official can also be dismissed for
            certain sending-off offences. The disciplinary rules apply to
            participants and team officials according to their role and the
            Laws of the Game.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Red Card vs Yellow Card
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 font-bold">
                    Yellow Card
                  </th>
                  <th className="border border-gray-200 px-4 py-3 font-bold">
                    Red Card
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    Caution
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Sending-off
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    Player normally stays in the match
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Player must leave the match
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    One caution does not reduce the team
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Team normally has one fewer player
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    Can contribute to accumulation suspensions
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Can lead to a disciplinary suspension
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            How a Red Card Changes a Match
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A red card can have a major tactical effect because the team has
            fewer players for the remainder of the match.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Less attacking support:</strong> The team may need to
              reduce its attacking numbers.
            </li>
            <li>
              <strong>Defensive adjustments:</strong> Coaches often reorganize
              the formation after a dismissal.
            </li>
            <li>
              <strong>More space for the opponent:</strong> The team with an
              extra player can often control more possession.
            </li>
            <li>
              <strong>Greater physical workload:</strong> Players may have to
              cover more space while playing with fewer teammates.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Red Cards and Suspensions
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A red card can lead to a suspension beyond the current match. The
            length of the suspension depends on the offence and the regulations
            of the competition.
          </p>

          <p className="leading-7 text-gray-700">
            Serious offences can result in longer suspensions or additional
            disciplinary action. Because competition rules differ, the exact
            punishment should always be checked against the relevant
            competition regulations.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                What does a red card mean?
              </h3>
              <p className="leading-7 text-gray-700">
                It means a player or other participant has been dismissed and
                cannot continue participating in the match.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Can a player receive a red card without getting a yellow card
                first?
              </h3>
              <p className="leading-7 text-gray-700">
                Yes. Serious offences can result in a straight red card.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                What happens after two yellow cards?
              </h3>
              <p className="leading-7 text-gray-700">
                The second caution results in a red card and the player is
                dismissed.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Can a sent-off player be substituted?
              </h3>
              <p className="leading-7 text-gray-700">
                In normal competitive football, no. The dismissed player
                cannot be replaced, so the team normally continues with fewer
                players.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Can a red card lead to a suspension?
              </h3>
              <p className="leading-7 text-gray-700">
                Yes. Competition disciplinary regulations can impose a
                suspension after a sending-off.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Does a red card affect the whole team?
              </h3>
              <p className="leading-7 text-gray-700">
                Yes. The team normally has to play with one fewer player for
                the remainder of the match.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Related Football Guides
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/articles/what-is-a-yellow-card-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Yellow Card?
            </Link>

            <Link
              href="/articles/what-is-a-free-kick-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Free Kick?
            </Link>

            <Link
              href="/articles/what-is-a-penalty-kick-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Penalty Kick?
            </Link>

            <Link
              href="/articles/what-is-handball-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is Handball in Football?
            </Link>

            <Link
              href="/articles/what-is-offside-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is Offside in Football?
            </Link>

            <Link
              href="/articles/what-is-added-time-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is Added Time?
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}