import Link from "next/link";

export const metadata = {
  title: "Football Leagues | Tables & Top Scorers | Apex Sports",
  description:
    "Explore football league tables and top-scorer lists for the Premier League, La Liga, Bundesliga, Serie A, Ligue 1 and Primeira Liga.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/leagues",
  },
};

const leagues = [
  { name: "Premier League", country: "England", slug: "epl", featured: true },
  { name: "La Liga", country: "Spain", slug: "laliga" },
  { name: "Bundesliga", country: "Germany", slug: "bundesliga" },
  { name: "Serie A", country: "Italy", slug: "seriea" },
  { name: "Ligue 1", country: "France", slug: "ligue1" },
  { name: "Primeira Liga", country: "Portugal", slug: "primeiraliga" },
];

export default function LeaguesPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 text-white sm:px-6 sm:py-10">
      <header className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-green-500">
          Apex Sports
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Football Leagues</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-400">
          Choose a competition to view its league table and top scorers. Data availability
          can vary by competition and the coverage provided by our football data source.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {leagues.map((league) => (
          <article
            key={league.slug}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-green-500/60"
          >
            <p className="text-sm text-slate-400">{league.country}</p>
            <h2 className="mt-1 text-xl font-bold">{league.name}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/standings/${league.slug}`}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-green-500 hover:text-green-400"
              >
                League table
              </Link>
              <Link
                href={`/top-scorers/${league.slug}`}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-green-500 hover:text-green-400"
              >
                Top scorers
              </Link>
              {league.featured && (
                <>
                  <Link
                    href="/league/epl"
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-green-500 hover:text-green-400"
                  >
                    League overview
                  </Link>
                  <Link
                    href="/top-assists"
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-green-500 hover:text-green-400"
                  >
                    Top assists
                  </Link>
                  <Link
                    href="/fixtures/epl"
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-green-500 hover:text-green-400"
                  >
                    Fixtures
                  </Link>
                  <Link
                    href="/results/epl"
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-green-500 hover:text-green-400"
                  >
                    Results
                  </Link>
                </>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
