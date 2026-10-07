import Link from "next/link";

export const metadata = {
  title: "What Is Handball in Football? Rules, Penalties and Examples | Apex Sports",
  description:
    "Learn what handball means in football, when a handball is penalized, accidental handball rules, penalties, attacking handball, goalkeeper exceptions and VAR.",
  alternates: {
    canonical:
      "https://apex-sports-frontend.vercel.app/articles/what-is-handball-in-football",
  },
};

export default function HandballArticle() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article>
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold text-blue-600">
            Football Guide
          </p>

          <h1 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Is Handball in Football?
          </h1>

          <p className="text-lg leading-8 text-gray-600">
            Handball is one of the most discussed rules in football. Learn
            when contact between the ball and a player's hand or arm is
            penalized, when it is not, and how handball decisions can lead to
            free kicks, penalties and disallowed goals.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            What Is Handball?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            In football, handball generally refers to a player deliberately
            touching the ball with the hand or arm. The laws of the game also
            consider situations where a player makes their body unnaturally
            bigger with the position of their hand or arm.
          </p>

          <p className="leading-7 text-gray-700">
            Not every contact between the ball and a player's hand or arm is
            automatically a handball offence. The referee must consider the
            circumstances of the contact and apply the Laws of the Game.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Which Part of the Arm Counts?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            For the purposes of the handball law, the relevant area extends
            from the bottom of the armpit. Contact with other parts of the arm
            outside the permitted area is not treated in exactly the same way.
          </p>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="leading-7 text-gray-700">
              A simple way to understand the rule is that players cannot use
              their hands or arms to deliberately control or unfairly stop the
              ball. However, accidental contact is not automatically an
              offence.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            When Is Handball Usually Penalized?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            Referees can penalize a player when the hand or arm makes an
            illegal contact with the ball. Important factors include whether
            the player deliberately moved the hand or arm toward the ball and
            whether the position of the arm made the body unnaturally bigger.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>
              • Deliberately moving the hand or arm toward the ball.
            </li>
            <li>
              • Making the body unnaturally bigger through the position of the
              hand or arm.
            </li>
            <li>
              • Gaining control or creating an attacking opportunity through a
              handball offence.
            </li>
            <li>
              • Preventing an opponent from scoring or creating a clear
              scoring opportunity through an offence that requires disciplinary
              action.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Is Every Accidental Handball a Foul?
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            No. Accidental contact between the ball and a player's hand or arm
            is not automatically a handball offence.
          </p>

          <p className="leading-7 text-gray-700">
            The referee considers the player's actions and the position of the
            arm. This is why two incidents that look similar at first glance
            can sometimes receive different decisions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Hand Position and Making the Body Bigger
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            Players naturally move their arms while running, jumping and
            maintaining balance. Having an arm away from the body does not
            automatically mean a handball has occurred.
          </p>

          <p className="leading-7 text-gray-700">
            However, when the position of the hand or arm is judged to have
            made the body unnaturally bigger, the referee may award a free
            kick or penalty depending on where the offence happened.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Handball Inside the Penalty Area
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            If a defending player commits a handball offence inside their own
            penalty area, the opposing team can be awarded a penalty kick.
          </p>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-3 font-bold text-gray-900">
              Example
            </h3>

            <p className="leading-7 text-gray-700">
              A defender illegally uses their hand or arm to stop the ball
              inside their own penalty area. The referee can award a penalty
              kick to the attacking team, with additional disciplinary action
              possible depending on the circumstances.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Handball Outside the Penalty Area
          </h2>

          <p className="leading-7 text-gray-700">
            If a defending player commits a handball offence outside their own
            penalty area, the normal restart is a direct free kick for the
            opposing team.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Attacking Handball
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            Handball by an attacking player can affect whether a goal is
            allowed or whether play must be stopped.
          </p>

          <p className="leading-7 text-gray-700">
            A player cannot use an illegal hand or arm contact to score a goal
            or create an immediate scoring opportunity. If an attacking
            handball offence occurs, the referee can stop play and award the
            appropriate restart to the defending team.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Can a Goal Be Scored With the Hand?
          </h2>

          <p className="leading-7 text-gray-700">
            A player cannot deliberately score a goal using their hand or arm.
            If an attacking player deliberately uses the hand or arm to put the
            ball into the opponent's goal, the goal is not allowed and the
            appropriate disciplinary action can follow.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Goalkeepers and Handball
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            Goalkeepers have special privileges when handling the ball, but
            those privileges are limited to their own penalty area.
          </p>

          <p className="leading-7 text-gray-700">
            A goalkeeper generally cannot use their hands to handle the ball
            outside their own penalty area. If they deliberately handle the
            ball outside that area, a direct free kick can be awarded and
            disciplinary action may also be appropriate depending on the
            situation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            What Happens After a Handball Offence?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-left text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 font-bold">
                    Location
                  </th>
                  <th className="border border-gray-200 px-4 py-3 font-bold">
                    Typical Restart
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    Defending team's penalty area
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Penalty kick
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    Outside the penalty area
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Direct free kick
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-200 px-4 py-3">
                    Attacking handball offence
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    Restart for defending team
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Handball and Yellow or Red Cards
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            A handball offence does not automatically result in a yellow or
            red card. The referee considers the nature and consequences of the
            offence.
          </p>

          <p className="leading-7 text-gray-700">
            Deliberate handball can lead to disciplinary action, particularly
            when it stops a promising attack or denies an obvious goal-scoring
            opportunity. The exact punishment depends on the circumstances and
            the Laws of the Game.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Handball and VAR
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            In competitions using Video Assistant Referee technology, VAR can
            review incidents involving possible handball when they are
            connected to a reviewable decision, such as a goal or penalty
            incident.
          </p>

          <p className="leading-7 text-gray-700">
            VAR does not replace the referee for every handball situation. The
            review process follows the competition's VAR protocol and the
            Laws of the Game.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Why Handball Decisions Can Be Difficult
          </h2>

          <p className="mb-4 leading-7 text-gray-700">
            Handball decisions can be difficult because players move quickly
            and the ball can strike an arm from a short distance. Referees
            must judge the circumstances rather than simply deciding that any
            contact equals an offence.
          </p>

          <p className="leading-7 text-gray-700">
            This is also why television replays can lead to debate. A slow
            motion replay can show details that are difficult to judge at full
            match speed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Is every ball-to-hand contact a handball?
              </h3>
              <p className="leading-7 text-gray-700">
                No. Contact between the ball and a player's hand or arm is not
                automatically an offence. The circumstances and position of
                the arm must be considered.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Is handball inside the penalty area always a penalty?
              </h3>
              <p className="leading-7 text-gray-700">
                If the defending player commits a handball offence inside their
                own penalty area, a penalty kick can be awarded.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Can a goalkeeper handle the ball?
              </h3>
              <p className="leading-7 text-gray-700">
                Yes, a goalkeeper can normally handle the ball inside their own
                penalty area, subject to the goalkeeper-specific restrictions
                in the Laws of the Game.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Can a goalkeeper handle the ball outside the penalty area?
              </h3>
              <p className="leading-7 text-gray-700">
                No. The goalkeeper's special handball privilege does not extend
                outside their own penalty area.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-gray-900">
                Can handball cause a red card?
              </h3>
              <p className="leading-7 text-gray-700">
                It can, depending on the circumstances. A deliberate handball
                that denies an obvious goal-scoring opportunity can result in
                serious disciplinary action.
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
              href="/articles/what-is-a-penalty-kick-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Penalty Kick?
            </Link>

            <Link
              href="/articles/what-is-a-free-kick-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Free Kick?
            </Link>

            <Link
              href="/articles/what-is-offside-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is Offside in Football?
            </Link>

            <Link
              href="/articles/what-is-a-corner-kick-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Corner Kick?
            </Link>

            <Link
              href="/articles/what-is-a-goal-kick-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Goal Kick?
            </Link>

            <Link
              href="/articles/what-is-a-throw-in-in-football"
              className="rounded-lg border border-gray-200 p-4 font-medium text-blue-600 hover:bg-gray-50"
            >
              What Is a Throw-In?
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}