import Link from "next/link";

export const metadata = {
  title: "What Is a Penalty Kick in Football? | Apex Sports",
  description:
    "Learn what a penalty kick is in football, when penalties are awarded, how penalty kicks are taken, and what happens after a penalty is saved, missed, or scored.",
};

export default function WhatIsAPenaltyKickInFootball() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/articles"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Football Guides
          </Link>
        </div>

        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Football Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What Is a Penalty Kick in Football?
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A penalty kick is a direct scoring opportunity awarded when a
            defending player commits a certain type of offence inside their
            own penalty area. Learn how penalty kicks work and what happens
            when they are scored, saved, or missed.
          </p>
        </header>

        <div className="space-y-10 text-base leading-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is a Penalty Kick?
            </h2>

            <p>
              A penalty kick is a restart awarded to the attacking team after
              a defending player commits a direct-free-kick offence inside
              their own penalty area.
            </p>

            <p className="mt-4">
              The ball is placed on the penalty mark, and one attacking player
              takes the kick against the defending goalkeeper. The goalkeeper
              must remain on the goal line until the ball is kicked, subject to
              the applicable Laws of the Game.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              When Is a Penalty Awarded?
            </h2>

            <p>
              A penalty can be awarded when a defending player commits an
              offence punishable by a direct free kick inside their own
              penalty area.
            </p>

            <p className="mt-4">
              Common examples can include certain types of fouls involving
              holding, pushing, tripping, kicking, or handball. The referee
              decides whether an offence has occurred and whether a penalty
              should be awarded.
            </p>

            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
              <p className="font-semibold text-gray-900">
                Important:
              </p>
              <p className="mt-2">
                Not every incident inside the penalty area results in a
                penalty. The referee must determine whether the action
                constitutes an offence under the Laws of the Game.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Where Is the Penalty Taken?
            </h2>

            <p>
              A penalty kick is taken from the penalty mark, which is located
              inside the defending team's penalty area.
            </p>

            <p className="mt-4">
              The kicker must be clearly identified before taking the kick.
              The ball must be stationary on the penalty mark, and the kick is
              taken toward the defending team's goal.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Who Takes the Penalty?
            </h2>

            <p>
              A player from the attacking team takes the penalty. The player
              must be identified before the kick is taken.
            </p>

            <p className="mt-4">
              Teams normally choose a player who is confident at taking
              penalties. However, the designated kicker does not have to be
              the player who was fouled.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              How Is a Penalty Kick Taken?
            </h2>

            <p>
              The ball is placed on the penalty mark. The kicker then takes
              the kick toward the goal while the goalkeeper attempts to save
              it.
            </p>

            <p className="mt-4">
              At the moment the ball is kicked, the goalkeeper must have at
              least part of one foot touching, in line with, or behind the
              goal line, according to the Laws of the Game.
            </p>

            <p className="mt-4">
              Other players must also remain in the required positions until
              the kick is taken.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Happens If the Penalty Is Scored?
            </h2>

            <p>
              If the ball legally enters the goal, the attacking team is
              awarded one goal.
            </p>

            <p className="mt-4">
              The match then restarts from the centre spot with a kick-off by
              the team that conceded the goal.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[500px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Outcome
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Ball enters goal legally
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Goal awarded
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Goalkeeper saves the ball
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      No goal
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Ball misses the goal
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      No goal
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      Kick is saved or blocked and remains in play
                    </td>
                    <td className="px-4 py-3">
                      Play may continue, subject to the Laws of the Game
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Happens If the Penalty Is Missed?
            </h2>

            <p>
              If the kicker misses the goal and the ball does not enter the
              goal, no goal is awarded.
            </p>

            <p className="mt-4">
              Depending on what happens to the ball, play can continue or a
              different restart may be awarded. For example, if the ball goes
              directly out of play after missing the goal, the defending team
              normally receives a goal kick.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can a Penalty Be Saved?
            </h2>

            <p>
              Yes. The goalkeeper can attempt to save the penalty by moving
              across the goal and stopping the ball.
            </p>

            <p className="mt-4">
              A saved penalty does not count as a goal. If the ball remains in
              play after the save, attacking players may sometimes have an
              opportunity to continue the attack, depending on the situation.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Penalty Kick During a Match vs Penalty Shootout
            </h2>

            <p>
              A penalty kick awarded during normal match play is different from
              a penalty shootout.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[550px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Penalty During Match
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Penalty Shootout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Awarded after an eligible offence
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Used to determine a winner when required after a drawn
                      match
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Goal counts toward the match score
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Determines the shootout result rather than being added to
                      the match score
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      Play can continue after a save or certain rebounds
                    </td>
                    <td className="px-4 py-3">
                      Each kick is treated as part of the shootout procedure
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can a Penalty Be Retaken?
            </h2>

            <p>
              A penalty can sometimes be retaken when the Laws of the Game
              require it because of an infringement or other specific
              circumstance.
            </p>

            <p className="mt-4">
              The exact decision depends on what happened during the kick,
              including whether the kicker, goalkeeper, or another player
              committed an infringement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Why Are Penalties Important?
            </h2>

            <p>
              Penalties can have a major effect on a football match because
              they provide the attacking team with a close-range, one-on-one
              opportunity against the goalkeeper.
            </p>

            <p className="mt-4">
              A successful penalty can change the scoreline, influence the
              result, and affect league standings or knockout qualification.
              This is why penalty decisions are often among the most important
              moments of a match.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  How many goals is a penalty worth?
                </h3>
                <p className="mt-2">
                  A successful penalty kick counts as one goal.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can the player who was fouled take the penalty?
                </h3>
                <p className="mt-2">
                  Yes. The player who was fouled can take the penalty if they
                  are selected as the kicker and remain eligible to take it.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can a goalkeeper save a penalty?
                </h3>
                <p className="mt-2">
                  Yes. The goalkeeper can attempt to save the penalty.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Does a missed penalty count as a shot on target?
                </h3>
                <p className="mt-2">
                  Statistical treatment can depend on the exact event and the
                  competition's data provider. A penalty that misses the goal
                  is generally recorded differently from one that is saved.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Is a penalty shootout part of the match score?
                </h3>
                <p className="mt-2">
                  In standard football statistics, shootout kicks are used to
                  determine the winner and are not added to the normal match
                  score.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Related Football Guides
            </h2>

            <div className="grid gap-3">
              <Link
                href="/articles/what-is-a-hat-trick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is a Hat-Trick in Football?
              </Link>

              <Link
                href="/articles/what-is-added-time-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is Added Time in Football?
              </Link>

              <Link
                href="/articles/what-is-a-clean-sheet-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is a Clean Sheet in Football?
              </Link>

              <Link
                href="/articles/how-football-points-work"
                className="font-medium text-blue-600 hover:underline"
              >
                How Football Points Work
              </Link>

              <Link
                href="/articles/how-football-goal-difference-works"
                className="font-medium text-blue-600 hover:underline"
              >
                How Football Goal Difference Works
              </Link>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}