const API_BASE =
  process.env.APEX_SPORTS_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://apex-sports-backend.vercel.app";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Football Today: Live Scores, Fixtures & Results | Apex Sports",
  description: "Follow live football match status, today's Premier League fixtures and recent results on the Apex Sports matchday dashboard.",
  alternates: { canonical: "https://apex-sports-frontend.vercel.app/today" },
};

async function getData(path) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return { success: false, matches: [], message: `Data temporarily unavailable (HTTP ${response.status}).` };
    }
    const data = await response.json();
    return data && typeof data === "object" ? data : { success: false, matches: [], message: "Invalid data response." };
  } catch {
    return { success: false, matches: [], message: "Football data is temporarily unavailable. Please try again later." };
  }
}

function londonDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
}

function seasonForToday() {
  const now = new Date();
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
}

function teamName(match, side) {
  return match?.[side]?.name || match?.teams?.[side]?.name || match?.fixture?.[side]?.name || (side === "home" ? "Home Team" : "Away Team");
}

function teamLogo(match, side) {
  return match?.[side]?.logo || match?.teams?.[side]?.logo || "";
}

function matchId(match) {
  return match?.fixture?.id ?? match?.id ?? null;
}

function formatDate(value, withTime = false) {
  if (!value) return "Date unavailable";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", day: "numeric", month: "short", year: "numeric",
      ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    }).format(new Date(value));
  } catch {
    return "Date unavailable";
  }
}

function Team({ match, side }) {
  const name = teamName(match, side);
  const logo = teamLogo(match, side);
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center">
      {logo ? <img src={logo} alt={name} width="48" height="48" className="h-12 w-12 object-contain" /> : <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800" aria-hidden="true">⚽</span>}
      <span className="text-sm font-semibold text-slate-200">{name}</span>
    </div>
  );
}

function MatchCard({ match, kind }) {
  const id = matchId(match);
  const homeScore = match?.goals?.home ?? match?.score?.fulltime?.home ?? match?.score?.fullTime?.home ?? match?.score?.home;
  const awayScore = match?.goals?.away ?? match?.score?.fulltime?.away ?? match?.score?.fullTime?.away ?? match?.score?.away;
  const status = match?.status?.short || match?.status?.long || match?.rawStatus || "";
  const date = match?.fixture?.date || match?.date;
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
        {kind === "today" ? formatDate(date, true) : kind === "results" ? formatDate(date) : status || "Live match"}
      </p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Team match={match} side="home" />
        <div className="whitespace-nowrap text-xl font-black text-white">
          {kind === "today" ? "VS" : `${homeScore ?? "—"} - ${awayScore ?? "—"}`}
        </div>
        <Team match={match} side="away" />
      </div>
      {id ? <a href={`/match/${id}`} className="mt-4 block text-center text-sm font-semibold text-green-500 underline underline-offset-4">Match details</a> : null}
    </article>
  );
}

function MatchSection({ title, description, matches, kind, emptyText, error }) {
  return (
    <section className="rounded-[20px] border border-slate-800 bg-[#111827] p-5 sm:p-7">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-1.5 text-sm text-slate-400">{description}</p>
      </div>
      {error ? <p className="rounded-xl bg-slate-950 p-5 text-sm text-slate-400">{error}</p> : matches.length ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {matches.map((match, index) => <MatchCard key={matchId(match) || `${kind}-${index}`} match={match} kind={kind} />)}
        </div>
      ) : <p className="rounded-xl bg-slate-950 p-5 text-sm text-slate-400">{emptyText}</p>}
    </section>
  );
}

export default async function TodayPage() {
  const date = londonDate();
  const season = seasonForToday();
  const [heroData, liveData, todayData, resultsData] = await Promise.all([
    getData(`/api/dashboard/hero?season=${season}`),
    getData("/api/live"),
    getData(`/api/today?date=${date}&league=PL&season=${season}`),
    getData(`/api/results?league=PL&season=${season}&page=1&limit=5`),
  ]);
  const hero = heroData?.hero || {};
  const liveMatches = Array.isArray(liveData?.matches) ? liveData.matches : [];
  const todayMatches = Array.isArray(todayData?.matches) ? todayData.matches : [];
  const latestResults = Array.isArray(resultsData?.matches) ? resultsData.matches : [];

  return (
    <main className="mx-auto my-10 flex w-full max-w-[1400px] flex-col gap-[30px] px-5">
      <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">Apex Sports · Matchday dashboard</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Football Today: Live Scores, Fixtures & Results</h1>
        <p className="mt-4 max-w-4xl leading-7 text-slate-300">This dashboard brings together the football data currently available to Apex Sports: live match status, Premier League fixtures scheduled for today, and recently completed league matches. Match information is supplied by football-data.org and may be delayed, incomplete or unavailable if the data provider has not published an update.</p>
        <p className="mt-3 max-w-4xl leading-7 text-slate-400">Today’s fixture list uses the United Kingdom local calendar date ({date}) so dates and kick-off times follow the competition schedule. An empty match list means no matching fixtures were returned for that date; it does not mean the data service is broken.</p>
        <nav className="mt-5 flex flex-wrap gap-4" aria-label="Matchday pages">
          <a href="/live" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Live football scores</a>
          <a href="/fixtures/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Premier League fixtures</a>
          <a href="/results/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Premier League results</a>
          <a href="/standings/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">Premier League standings</a>
        </nav>
      </header>

      <section className="rounded-[20px] border border-slate-800 bg-gradient-to-br from-[#111827] to-[#0f172a] p-5 text-white sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-black tracking-[1.5px] text-red-400">APEX SPORTS</p><h2 className="mt-2 text-3xl font-black">Football Dashboard</h2><p className="mt-2 text-sm text-slate-400">Premier League data supplied by football-data.org.</p></div>
          <p className="text-xs font-bold text-green-500">DATA SOURCE · football-data.org</p>
        </div>
        <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
          {([["Leagues", hero.leagues], ["Teams", hero.teams], ["Players", hero.players], ["Fixtures", hero.fixtures]]).map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-950 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-2 text-2xl font-black text-white">{heroData?.success && Number.isFinite(Number(value)) ? Number(value).toLocaleString("en-GB") : "Unavailable"}</dd></div>
          ))}
        </dl>
        {!heroData?.success ? <p className="mt-3 text-sm text-amber-300">{heroData?.message || "Dashboard summary is temporarily unavailable."}</p> : null}
      </section>

      <MatchSection title="🔴 Live Now" description="Live matches currently returned by the football data feed." matches={liveMatches} kind="live" error={!liveData?.success ? liveData?.message : ""} emptyText="There are currently no live matches in the available coverage." />
      <MatchSection title="Today's Matches" description={`Premier League fixtures scheduled for ${date} (UK date).`} matches={todayMatches} kind="today" error={!todayData?.success ? todayData?.message : ""} emptyText="No Premier League fixtures were returned for today's UK calendar date. Browse the upcoming fixtures for the next scheduled matches." />
      <MatchSection title="Latest Results" description="Recently completed Premier League matches from the current season." matches={latestResults} kind="results" error={!resultsData?.success ? resultsData?.message : ""} emptyText="No recent Premier League results are currently available in the data feed." />
    </main>
  );
}
