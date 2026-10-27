import Link from "next/link";

export const metadata = {
  title: "Football Transfers | Apex Sports",
  description:
    "Transfer records are not currently available from the football data provider used by Apex Sports.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TransfersPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-green-500">
          Apex Sports
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Football Transfers</h1>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <h2 className="text-xl font-bold">Transfer data is not available</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Our current football data provider does not supply transfer records. We are not displaying guessed or outdated transfer information.
        </p>
        <p className="mt-3 leading-7 text-slate-400">
          You can still browse verified fixtures, completed results, league tables and football guides.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/fixtures/epl" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:border-green-500">
            Premier League fixtures
          </Link>
          <Link href="/results/epl" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:border-green-500">
            Match results
          </Link>
          <Link href="/standings/epl" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:border-green-500">
            League table
          </Link>
          <Link href="/articles" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-green-500 transition hover:border-green-500">
            Football guides
          </Link>
        </div>
      </section>
    </main>
  );
}
