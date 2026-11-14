import Link from "next/link";

function getTeam(match, side) {
  return (
    match?.[side]?.name ||
    match?.teams?.[side]?.name ||
    match?.fixture?.[side]?.name ||
    (side === "home" ? "Home team" : "Away team")
  );
}

function getKickoff(match) {
  const value = match?.fixture?.date || match?.date;
  if (!value) return "Kick-off to be confirmed";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date to be confirmed";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date) + " UK time";
}

export default function UpcomingFixturesPreview({ fixtures = [] }) {
  if (!Array.isArray(fixtures) || fixtures.length === 0) return null;

  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8" aria-labelledby="upcoming-fixtures-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
            Next on the schedule
          </p>
          <h2 id="upcoming-fixtures-heading" className="mt-2 text-2xl font-bold text-white">
            Upcoming Premier League Fixtures
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-slate-400">
            No Premier League match is listed for today. These are the next scheduled fixtures in the available season feed.
            Kick-off times are shown in UK local time.
          </p>
        </div>
        <Link href="/fixtures/epl" className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">
          View all fixtures
        </Link>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {fixtures.slice(0, 6).map((match, index) => {
          const id = match?.fixture?.id ?? match?.id;
          return (
            <li key={id ?? index} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs font-semibold text-slate-400">{getKickoff(match)}</p>
              <p className="mt-2 font-semibold text-white">
                {getTeam(match, "home")} <span className="px-2 text-slate-500">vs</span> {getTeam(match, "away")}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
