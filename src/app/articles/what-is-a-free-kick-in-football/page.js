import Link from "next/link";

export const metadata = {
  title: "What Is a Free Kick in Football? | Apex Sports",
  description:
    "Learn what a free kick is in football, the difference between direct and indirect free kicks, when they are awarded, and how free kicks are taken.",
};

export default function WhatIsAFreeKickInFootball() {
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
            What Is a Free Kick in Football?
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A free kick is a restart awarded after certain offences in
            football. Learn the difference between direct and indirect free
            kicks, when they are awarded, and how they can be used to create
            scoring opportunities.
          </p>
        </header>

        <div className="space-y-10 text-base leading-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is a Free Kick?
            </h2>

            <p>
              A free kick is a method of restarting play after an offence has
              occurred. Depending on the type of offence, the referee can
              award either a direct free kick or an indirect free kick.
            </p>

            <p className="mt-4">
              The team receiving the free kick gets an opportunity to restart
              play from the location specified by the Laws of the Game.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Direct vs Indirect Free Kick
            </h2>

            <p>
              The two main types of free kicks are direct and indirect. The
              biggest difference is whether the ball can enter the opponents'
              goal directly from the kick.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Type
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Can It Score Directly?
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Common Use
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Direct free kick
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Yes
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Fouls and certain handball offences
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">
                      Indirect free kick
                    </td>
                    <td className="px-4 py-3">
                      No
                    </td>
                    <td className="px-4 py-3">
                      Certain technical or non-contact offences
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is a Direct Free Kick?
            </h2>

            <p>
              A direct free kick allows the attacking team to score directly
              from the kick. If the ball is kicked directly into the
              opponents' goal without touching another player, the goal can
              count.
            </p>

            <p className="mt-4">
              Direct free kicks are commonly awarded for offences such as
              kicking, tripping, pushing, holding, or certain handball
              offences, depending on the circumstances.
            </p>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
              <p className="font-semibold text-gray-900">
                Example:
              </p>
              <p className="mt-2">
                A player is fouled outside the penalty area. The referee awards
                a direct free kick, and the attacking player curls the ball
                directly into the goal. The goal can count.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is an Indirect Free Kick?
            </h2>

            <p>
              An indirect free kick is different because the ball must touch
              another player before a goal can be scored.
            </p>

            <p className="mt-4">
              The referee indicates an indirect free kick by raising one arm
              above their head and keeping it raised until the ball touches
              another player or goes out of play.
            </p>

            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
              <p className="font-semibold text-gray-900">
                Example:
              </p>
              <p className="mt-2">
                If an attacking player takes an indirect free kick and the
                ball goes directly into the goal without touching another
                player, the goal does not count. The defending team receives a
                goal kick.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              When Is a Free Kick Awarded?
            </h2>

            <p>
              Free kicks can be awarded for different offences depending on
              the situation and the Laws of the Game.
            </p>

            <p className="mt-4">
              Direct free kicks are generally associated with physical
              offences or certain handball offences. Indirect free kicks can
              result from technical offences and other situations specified
              by the Laws of the Game.
            </p>

            <p className="mt-4">
              The referee decides which restart is appropriate based on the
              offence and where it occurred.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Where Is a Free Kick Taken?
            </h2>

            <p>
              A free kick is generally taken from the location where the
              offence occurred, subject to the specific rules governing the
              restart.
            </p>

            <p className="mt-4">
              There are special rules for some offences and situations. For
              example, certain technical offences can require an indirect free
              kick from a particular location.
            </p>

            <p className="mt-4">
              When a free kick is taken close to the defending goal, the
              defending team may organize a defensive wall to make it harder
              for the attacking team to shoot directly at goal.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Is a Free-Kick Wall?
            </h2>

            <p>
              A free-kick wall is a group of defending players positioned
              between the ball and their goal to block or reduce the angle of
              a direct shot.
            </p>

            <p className="mt-4">
              The referee controls the required distance between defending
              players and the ball. Players who are too close can be penalized
              according to the Laws of the Game.
            </p>

            <p className="mt-4">
              Attackers may also position themselves around the wall to create
              space or make it harder for the goalkeeper to see the ball.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can a Free Kick Be Scored Directly?
            </h2>

            <p>
              A direct free kick can be scored directly into the opponents'
              goal.
            </p>

            <p className="mt-4">
              An indirect free kick cannot result in a goal directly. The ball
              must touch another player before it enters the goal for the goal
              to be awarded.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[500px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Situation
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Direct free kick enters opponents' goal directly
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Goal
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Indirect free kick enters opponents' goal without
                      touching another player
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      No goal; goal kick
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      Indirect free kick touches another player before entering
                      goal
                    </td>
                    <td className="px-4 py-3">
                      Goal, provided all other requirements are satisfied
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Free Kick vs Penalty Kick
            </h2>

            <p>
              A free kick and a penalty kick are both methods of restarting
              play, but they are awarded in different circumstances.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Free Kick
                    </th>
                    <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                      Penalty Kick
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Can be direct or indirect
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Specific type of restart after an eligible offence inside
                      the defending penalty area
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Usually taken from the location of the offence
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      Taken from the penalty mark
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      Defenders can usually form a wall when appropriate
                    </td>
                    <td className="px-4 py-3">
                      Only the kicker and goalkeeper are directly involved in
                      the kick
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <Link
                href="/articles/what-is-a-penalty-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                Read: What Is a Penalty Kick in Football?
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What Happens If the Ball Goes Directly Into the Wrong Goal?
            </h2>

            <p>
              If a team takes a free kick and the ball goes directly into its
              own goal, a corner kick is awarded to the opposing team. A team
              cannot score an own goal directly from a free kick.
            </p>

            <p className="mt-4">
              The exact restart depends on the type of free kick and what
              happens to the ball.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  What is the difference between a direct and indirect free
                  kick?
                </h3>
                <p className="mt-2">
                  A direct free kick can result in a goal directly. An indirect
                  free kick requires the ball to touch another player before a
                  goal can be scored.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can a free kick be taken quickly?
                </h3>
                <p className="mt-2">
                  Yes. In situations where the restart is permitted, a team
                  can take a free kick quickly rather than waiting for the
                  defense to organize.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can you score directly from a free kick?
                </h3>
                <p className="mt-2">
                  Yes, from a direct free kick. An indirect free kick requires
                  the ball to touch another player before entering the goal.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Can a free kick be taken inside the penalty area?
                </h3>
                <p className="mt-2">
                  Yes. Certain offences inside the penalty area result in
                  indirect free kicks rather than penalties, depending on the
                  offence and the Laws of the Game.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  How far away must defenders be from a free kick?
                </h3>
                <p className="mt-2">
                  In general, opponents must remain at least 9.15 metres
                  (10 yards) from the ball until it is in play, subject to
                  specific exceptions in the Laws of the Game.
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
                href="/articles/what-is-a-penalty-kick-in-football"
                className="font-medium text-blue-600 hover:underline"
              >
                What Is a Penalty Kick in Football?
              </Link>

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