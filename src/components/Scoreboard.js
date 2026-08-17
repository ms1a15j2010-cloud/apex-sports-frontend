"use client";

import Link from "next/link";

export default function Scoreboard({
  matches = [],
}) {
  if (!matches.length) {
    return (
      <div className="rounded-[18px] bg-gray-900 p-[30px] text-center text-white">
        No matches available.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-gray-800 bg-gray-900">
      {matches.map((m, index) => {
        const statusColor =
          m.status === "LIVE"
            ? "bg-green-500"
            : m.status === "FT"
            ? "bg-red-500"
            : "bg-amber-500";

        const homeScore =
          m.goalsHome ?? null;

        const awayScore =
          m.goalsAway ?? null;

        const matchId =
          m.id ?? `match-${index}`;

        return (
          <Link
            key={matchId}
            href={
              m.id
                ? `/match/${m.id}`
                : "#"
            }
            className={`block no-underline ${
              m.id
                ? "pointer-events-auto"
                : "pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center border-b border-gray-800 px-[22px] py-[18px] text-white transition hover:bg-slate-800/50">
              <div>
                <div className="mb-1.5 font-bold">
                  {m.home ||
                    "Home Team"}
                </div>

                <div className="text-slate-400">
                  {m.away ||
                    "Away Team"}
                </div>
              </div>

              <div className="mr-[25px] whitespace-nowrap text-[22px] font-extrabold">
                {homeScore ?? "—"} -{" "}
                {awayScore ?? "—"}
              </div>

              <span
                className={`min-w-[60px] rounded-[30px] px-3.5 py-1.5 text-center text-[13px] font-bold text-white ${statusColor}`}
              >
                {m.status || "NS"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

