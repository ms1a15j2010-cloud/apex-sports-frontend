import Link from "next/link";

export const metadata = {
  title: "What Is Offside in Football? | Apex Sports",
  description:
    "Learn what offside means in football, when a player is in an offside position, when offside is called, and how the offside rule works.",
};

export default function WhatIsOffsideInFootball() {
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
            What Is Offside in Football?
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            The offside rule is one of the most important and sometimes
            confusing rules in football. Learn what an offside position means,
            when an offence occurs, and how referees and VAR apply the rule.
          </p>
        </header>

        <div className="space-y-10 text-base leading-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Does Offside Mean?
            </h2>

            <p>
              A player is in an offside position if, at the moment the ball is
              played or touched by a teammate, they are in the opponents'
              half and are nearer to the opponents' goal line than both the
              ball and the second-last opponent.
            </p>

            <p className="mt-4">
              Being in an offside position by itself is not an offence. An
              offside offence occurs only when the player becomes involved in
              active play in a way covered by the Laws of the Game.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              The Three Main Things to Check
            </h2>

            <p>
              When deciding whether a player is in an offside position,
              several parts of the player's position must be considered.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">
                  Opponents' Half
                </h3>
                <p className="mt-2 text-sm leading-6">
                  The player must be in the opponents' half of the field.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">
                  Position
                </h3>
                <p className="mt-2 text-sm leading-6">
                  The player must be nearer to the goal line than both the
                  ball and the second-last opponent.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">
                  Timing
                </h3>
                <p className="mt-2 text-sm leading-6">
                  The position is judged when the teammate plays or touches
                  the ball.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Is Being in an Offside Position an Offence?
            </h2>

            <p>
              No. A player can be standing in an offside position without the
              referee stopping play.
            </p>

            <p className="mt-4">
              The player must become involved in active play for an offside
              offence to be committed. This can happen by playing or touching
              the ball, interfering with an opponent, or gaining an advantage
              from their position in certain situations.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              A Simple Offside Example
            </h2>

            <p>
              Imagine an attacking player is standing behind the second-last
              defender when their teammate passes the ball forward. If the
              attacking player then becomes involved in the play, the referee
              may penalize the player for an offside offence.
            </p>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
              <p className="font-semibold text-gray-900">
                Important:
              </p>
              <p className="mt-2">
                The position is judged when the teammate plays or touches the
                ball, not when the receiving player eventually receives it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is the Second-Last Opponent?
            </h2>

            <p>
              The offside rule refers to the second-last opponent because the
              goalkeeper is not automatically the last defender for offside
              purposes.
            </p>

            <p className="mt-4">
              Any opponent can be one of the players considered when judging
              the offside line. The relevant position is based on the parts of
              the body that can legally be used to score a goal.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Which Parts of the Body Count for Offside?
            </h2>

            <p>
              When determining an offside position, the head, body, and feet
              can be considered.
            </p>

            <p className="mt-4">
              The hands and arms of all players, including the goalkeeper, are
              not considered when determining an offside position.
            </p>

            <p className="mt-4">
              This means a player is not placed onside or offside based on the
              position of their hands or arms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              When Can a Player Be Penalized for Offside?
            </h2>

            <p>
              A player in an offside position can be penalized if they become
              involved in active play. Examples include:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Playing or touching the ball.</li>
              <li>Interfering with an opponent.</li>
              <li>
                Gaining an advantage from their offside position in situations
                covered by the Laws of the Game.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              When Is a Player Not Offside?
            </h2>

            <p>
              A player is not in an offside position if they are level with the
              second-last opponent or level with the last two opponents.
            </p>

            <p className="mt-4">
              A player is also not in an offside position if they are in their
              own half of the field when the ball is played or touched by a
              teammate.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Offside Does Not Apply Directly From Some Restarts
            </h2>

            <p>
              A player cannot be penalized for being offside when receiving the
              ball directly from a goal kick, throw-in, or corner kick.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[550px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Restart
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Offside Can Be Called Directly?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Goal kick
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      No
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Throw-in
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      No
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      Corner kick
                    </td>
                    <td className="px-4 py-3">
                      No
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Offside and Goal-Scoring Opportunities
            </h2>

            <p>
              Attackers often try to time their runs so they move forward at
              the same moment their teammate plays the ball. This can allow
              them to get behind the defensive line while staying within the
              rules.
            </p>

            <p className="mt-4">
              Defenders may also move forward together to reduce the space
              available to attackers. This tactic is commonly associated with
              the defensive offside line.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Happens After an Offside Offence?
            </h2>

            <p>
              When the referee determines that an offside offence has occurred,
              the opposing team is awarded an indirect free kick from the
              place where the offence occurred, subject to the Laws of the
              Game.
            </p>

            <p className="mt-4">
              The referee or assistant referee may signal for offside, while
              video review may be used in competitions that have VAR.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              How Does VAR Check Offside?
            </h2>

            <p>
              In competitions using the Video Assistant Referee system, an
              offside decision can be reviewed when it is relevant to an
              incident such as a goal or another reviewable attacking
              situation.
            </p>

            <p className="mt-4">
              Video officials examine the position of the attacking player and
              the relevant opponents at the moment the ball was played or
              touched by a teammate.
            </p>

            <p className="mt-4">
              The final decision remains an officiating decision under the
              competition's VAR procedures.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Why Does Football Have an Offside Rule?
            </h2>

            <p>
              The offside rule helps prevent attackers from simply waiting
              close to the opponents' goal for a long forward pass.
            </p>

            <p className="mt-4">
              It encourages teams to coordinate their movement and creates a
              balance between attacking opportunities and defensive
              organization.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  What is offside in simple terms?
                </h3>
                <p className="mt-2">
                  In simple terms, an attacker can be offside when they are
                  ahead of the required defensive line in the opponents' half
                  when a teammate plays the ball and then become involved in
                  the play.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you be offside in your own half?
                </h3>
                <p className="mt-2">
                  No. A player is not in an offside position while in their own
                  half when the teammate plays or touches the ball.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you be offside from a corner kick?
                </h3>
                <p className="mt-2">
                  No. A player cannot be penalized for an offside offence when
                  receiving the ball directly from a corner kick.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you be offside from a throw-in?
                </h3>
                <p className="mt-2">
                  No. A player cannot be penalized for being offside when
                  receiving the ball directly from a throw-in.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you be offside from a goal kick?
                </h3>
                <p className="mt-2">
                  No. A player cannot be penalized for an offside offence when
                  receiving the ball directly from a goal kick.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Does the goalkeeper always count as the last defender?
                </h3>
                <p className="mt-2">
                  No. The offside rule uses the second-last opponent when
                  determining the offside position. The goalkeeper is not
                  automatically the relevant defender.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Is being offside automatically an offence?
                </h3>
                <p className="mt-2">
                  No. Being in an offside position is not itself an offence.
                  The player must become involved in active play in a way that
                  constitutes an offside offence.
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
                href="/articles/what-is-a-corner-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is a Corner Kick in Football?
              </Link>

              <Link
                href="/articles/what-is-a-free-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is a Free Kick in Football?
              </Link>

              <Link
                href="/articles/what-is-a-penalty-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is a Penalty Kick in Football?
              </Link>

              <Link
                href="/articles/how-to-read-football-fixtures-and-match-results"
                className="font-medium text-blue-600 hover:underline"
              >
                How to Read Football Fixtures and Match Results
              </Link>

              <Link
                href="/articles/how-football-points-work"
                className="font-medium text-blue-600 hover:underline"
              >
                How Football Points Work
              </Link>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}