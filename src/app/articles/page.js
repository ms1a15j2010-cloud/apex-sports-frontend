import Link from "next/link";

export const metadata = {
  title: "Football Articles & Guides | Apex Sports",
  description:
    "Read football guides and explanations covering league standings, points, goal difference, fixtures, results and football statistics.",
  alternates: {
    canonical:
      "https://apex-sports-frontend.vercel.app/articles",
  },
};

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports
        </div>

        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Football Articles & Guides
        </h1>

        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-400 sm:text-base">
          Explore useful football guides that explain league standings,
          points, goal difference, fixtures, results and other important
          football statistics.
        </p>
      </header>

      <section className="grid gap-5">
        <article className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 transition hover:border-slate-700 sm:p-8">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-green-500">
            Football Guide
          </div>

          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            <Link
              href="/articles/how-football-league-standings-work"
              className="text-inherit no-underline transition hover:text-green-400"
            >
              How Football League Standings Work
            </Link>
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Learn how football league tables are calculated, how points and
            goal difference work, and how teams are separated when they finish
            level on points.
          </p>

          <Link
            href="/articles/how-football-league-standings-work"
            className="mt-5 inline-block font-bold text-green-500 no-underline transition hover:text-green-400"
          >
            Read the guide →
          </Link>
        </article>
      </section>
    </main>
  );
}

