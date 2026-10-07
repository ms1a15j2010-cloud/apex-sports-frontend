import Link from "next/link";

export const metadata = {
  title: "What Is a Goal Kick in Football? | Apex Sports",
  description:
    "Learn what a goal kick is in football, when it is awarded, how it is taken, and how it differs from a corner kick and other restarts.",
};

export default function WhatIsAGoalKickInFootball() {
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
            What Is a Goal Kick in Football?
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A goal kick is a restart awarded to the defending team when the
            ball completely crosses the goal line without entering the goal
            and was last touched by an attacking player. Learn how goal kicks
            work and when they are awarded.
          </p>
        </header>

        <div className="space-y-10 text-base leading-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is a Goal Kick?
            </h2>

            <p>
              A goal kick is a method of restarting play after the ball
              completely crosses the goal line, either on the ground or in the
              air, without a goal being scored, when the last player to touch
              the ball was an attacking player.
            </p>

            <p className="mt-4">
              The defending team takes the goal kick from inside its own goal
              area.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              When Is a Goal Kick Awarded?
            </h2>

            <p>
              A goal kick is awarded when all of the following conditions are
              met:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>The ball completely crosses the goal line.</li>
              <li>The ball does not enter the goal.</li>
              <li>The last player to touch the ball was an attacking player.</li>
            </ul>

            <p className="mt-4">
              The restart is then given to the defending team.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Goal Kick or Corner Kick?
            </h2>

            <p>
              The main difference between a goal kick and a corner kick is
              which team touched the ball last before it crossed the goal
              line.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Situation
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Restart
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Last touch by an attacking player
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Goal kick
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">
                      Last touch by a defending player
                    </td>
                    <td className="px-4 py-3">
                      Corner kick
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <Link
                href="/articles/what-is-a-corner-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                Read: What Is a Corner Kick in Football?
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Where Is a Goal Kick Taken?
            </h2>

            <p>
              The ball is kicked from anywhere within the goal area by a
              defending player.
            </p>

            <p className="mt-4">
              The goal area is the smaller rectangular area in front of the
              goal. The goalkeeper frequently takes goal kicks, but another
              defending player can take the restart as well.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              How Is a Goal Kick Taken?
            </h2>

            <p>
              The ball must be stationary and is kicked from within the goal
              area. The ball is in play when it is kicked and clearly moves.
            </p>

            <p className="mt-4">
              Once the ball is in play, the defending team can build an attack
              from the back or send the ball toward the midfield or attacking
              area.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can the Goalkeeper Take a Goal Kick?
            </h2>

            <p>
              Yes. Goalkeepers commonly take goal kicks, but the goalkeeper is
              not required to take them.
            </p>

            <p className="mt-4">
              A different player from the defending team can take the goal
              kick if the team chooses.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can a Goal Be Scored Directly From a Goal Kick?
            </h2>

            <p>
              Yes. A goal can be scored directly from a goal kick into the
              opponents' goal.
            </p>

            <p className="mt-4">
              However, a player cannot score an own goal directly from a goal
              kick. If the ball goes directly into the kicker's own goal, the
              opposing team is awarded a corner kick.
            </p>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
              <p className="font-semibold text-gray-900">
                Example:
              </p>

              <p className="mt-2">
                A goalkeeper takes a goal kick and the ball travels directly
                into the opponents' goal without another player touching it.
                The goal can be awarded.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can a Player Be Offside From a Goal Kick?
            </h2>

            <p>
              No. A player cannot be penalized for an offside offence when
              receiving the ball directly from a goal kick.
            </p>

            <p className="mt-4">
              This is one of the specific restarts where the offside rule does
              not apply directly to the receiving player.
            </p>

            <div className="mt-5">
              <Link
                href="/articles/what-is-offside-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                Read: What Is Offside in Football?
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Goal Kick Tactics
            </h2>

            <p>
              Teams can use goal kicks in different ways depending on their
              tactical approach.
            </p>

            <p className="mt-4">
              Some teams play short passes to defenders or midfielders to keep
              possession and build attacks from the back. Other teams may send
              the ball farther up the pitch to compete for possession in
              midfield or the attacking half.
            </p>

            <p className="mt-4">
              The goalkeeper's technique and the positioning of teammates can
              therefore make goal kicks an important part of a team's
              possession strategy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Goal Kick vs Free Kick
            </h2>

            <p>
              A goal kick is awarded because the ball crossed the goal line
              after an attacking player touched it. A free kick is normally
              awarded because of an offence or another situation covered by
              the Laws of the Game.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Goal Kick
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Free Kick
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Restart after the ball crosses the goal line
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Usually awarded after an offence
                    </td>
                  </tr>

                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Awarded to the defending team
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Can be awarded to either team
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">
                      Taken from the goal area
                    </td>
                    <td className="px-4 py-3">
                      Usually taken from the place of the offence
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <Link
                href="/articles/what-is-a-free-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                Read: What Is a Free Kick in Football?
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Why Are Goal Kicks Important?
            </h2>

            <p>
              A goal kick gives the defending team possession and an
              opportunity to restart the match in a controlled way.
            </p>

            <p className="mt-4">
              Modern teams may use goal kicks to attract the opposition
              forward before playing through the defensive line. Other teams
              prefer a longer delivery to move the ball away from their own
              goal.
            </p>

            <p className="mt-4">
              The choice depends on the team's tactics, the positions of the
              players, and the pressure applied by the opposition.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  What is a goal kick in simple terms?
                </h3>

                <p className="mt-2">
                  A goal kick is a restart for the defending team when the
                  ball crosses the goal line without a goal being scored and
                  was last touched by an attacking player.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Who takes a goal kick?
                </h3>

                <p className="mt-2">
                  Any defending player can take the goal kick. The goalkeeper
                  commonly takes it, but another player can also take the
                  restart.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Where is a goal kick taken from?
                </h3>

                <p className="mt-2">
                  A goal kick is taken from anywhere within the defending
                  team's goal area.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you score directly from a goal kick?
                </h3>

                <p className="mt-2">
                  Yes. A goal can be scored directly from a goal kick into the
                  opponents' goal.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you score an own goal directly from a goal kick?
                </h3>

                <p className="mt-2">
                  No. If the ball goes directly into the kicker's own goal, the
                  opposing team is awarded a corner kick.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you be offside from a goal kick?
                </h3>

                <p className="mt-2">
                  No. Offside cannot be called when a player receives the ball
                  directly from a goal kick.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  What is the difference between a goal kick and a corner
                  kick?
                </h3>

                <p className="mt-2">
                  A goal kick is awarded when an attacking player touches the
                  ball last before it crosses the goal line. A corner kick is
                  awarded when a defending player touches it last.
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
                href="/articles/what-is-offside-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is Offside in Football?
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
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}