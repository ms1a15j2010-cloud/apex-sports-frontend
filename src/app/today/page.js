import DashboardHero from "@/components/Dashboard/DashboardHero";
import LiveNow from "@/components/Dashboard/LiveNow";
import TodayMatches from "@/components/Dashboard/TodayMatches";
import LatestResults from "@/components/Dashboard/LatestResults";

export const metadata = {
  title: "Football Today: Live Scores, Fixtures & Results | Apex Sports",
  description:
    "Follow live football match status, today's Premier League fixtures and recent results on the Apex Sports matchday dashboard.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/today",
  },
};

export default function TodayPage() {
  return (
    <main className="mx-auto my-10 flex w-full max-w-[1400px] flex-col gap-[30px] px-5">
      <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports · Matchday dashboard
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
          Football Today: Live Scores, Fixtures & Results
        </h1>
        <p className="mt-4 max-w-4xl leading-7 text-slate-300">
          This dashboard brings together the football data currently available to Apex Sports: live match status, Premier League fixtures scheduled for today, and recently completed league matches. Match information is supplied by football-data.org and may be delayed, incomplete or unavailable if the data provider has not published an update.
        </p>
        <p className="mt-3 max-w-4xl leading-7 text-slate-400">
          The today fixture list uses the United Kingdom local calendar date so its dates and kick-off times follow the competition schedule. An empty match list means that no matching fixtures were returned for that date; it does not mean the football data service is broken. Use the fixtures and results pages to browse matches outside today’s schedule.
        </p>
        <nav className="mt-5 flex flex-wrap gap-4" aria-label="Matchday pages">
          <a href="/live" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Live football scores</a>
          <a href="/fixtures/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Premier League fixtures</a>
          <a href="/results/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Premier League results</a>
          <a href="/standings/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Premier League standings</a>
        </nav>
      </header>

      <DashboardHero />
      <LiveNow />
      <TodayMatches />
      <LatestResults />
    </main>
  );
}
