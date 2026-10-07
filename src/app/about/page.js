import Link from "next/link";

export const metadata = {
  title: "About Apex Sports | Football Scores, Fixtures & Guides",
  description:
    "Learn about Apex Sports, a football website providing scores, fixtures, results, league standings, statistics and helpful football guides.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1000px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports
        </div>

        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          About Apex Sports
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Apex Sports is a football-focused website designed to help fans
          follow matches, competitions, teams and players in one place.
        </p>
      </header>

      <section className="space-y-8">
        <article className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">
            What Apex Sports Provides
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports brings together football information such as live
            scores, upcoming fixtures, previous results, league standings,
            top scorers and player information. The goal is to make commonly
            needed football information easy to find and understand.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            In addition to match information, Apex Sports publishes football
            articles and guides that explain common football terms,
            statistics and competition rules in straightforward language.
          </p>
        </article>

        <article className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">
            Football Information & Guides
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Football statistics can sometimes be difficult to understand,
            especially when comparing teams or reading league tables. Our
            guides explain topics such as points, goal difference, fixtures,
            results and league standings so visitors can better understand
            the information they see.
          </p>

          <Link
            href="/articles"
            className="mt-5 inline-block font-bold text-green-500 transition hover:text-green-400"
          >
            Explore football guides →
          </Link>
        </article>

        <article className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">
            Our Goal
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Our goal is to provide a simple and useful destination for
            football fans who want to check match information quickly while
            also learning more about how football competitions and statistics
            work.
          </p>
        </article>
      </section>

      <div className="mt-10">
        <Link
          href="/"
          className="font-semibold text-green-500 transition hover:text-green-400"
        >
          ← Back to Apex Sports
        </Link>
      </div>
    </main>
  );
}