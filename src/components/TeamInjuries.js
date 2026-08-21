"use client";

import Link from "next/link";

export default function TeamInjuries({
  injuries = [],
  available = false,
}) {
  const hasInjuries =
    available &&
    Array.isArray(injuries) &&
    injuries.length > 0;

  return (
    <section
      id="injuries"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🚑 Injury Report
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Current team injury information.
        </p>
      </div>

      {/* AVAILABLE INJURY DATA */}

      {hasInjuries ? (
        <div className="grid gap-4">
          {injuries.map(
            (injury, index) => {
              const player =
                injury?.player || {};

              const team =
                injury?.team || {};

              const reason =
                injury?.reason ||
                injury?.type ||
                injury?.player?.reason ||
                "Injury information unavailable";

              const date =
                injury?.date ||
                injury?.fixture?.date ||
                null;

              const playerId =
                player?.id ?? null;

              return (
                <article
                  key={
                    playerId ??
                    `injury-${index}`
                  }
                  className="grid grid-cols-1 items-center gap-5 rounded-2xl border border-[#293548] bg-gray-800 p-5 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    {playerId ? (
                      <Link
                        href={`/player/${playerId}`}
                        className="text-[18px] font-extrabold text-white no-underline hover:text-green-500"
                      >
                        {player?.name ||
                          "Unknown Player"}
                      </Link>
                    ) : (
                      <div className="text-[18px] font-extrabold text-white">
                        {player?.name ||
                          "Unknown Player"}
                      </div>
                    )}

                    <div className="mt-1.5 text-[13px] text-slate-400">
                      {team?.name ||
                        "Team"}
                    </div>

                    <div className="mt-2.5 leading-[1.6] text-slate-300">
                      <strong>
                        Reason:
                      </strong>{" "}
                      {reason}
                    </div>

                    {date && (
                      <div className="mt-2 text-xs text-slate-500">
                        Reported:{" "}
                        {new Date(
                          date
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="justify-self-start whitespace-nowrap rounded-full bg-red-800 px-[14px] py-2 text-xs font-extrabold text-red-100 md:justify-self-end">
                    Injured
                  </div>
                </article>
              );
            }
          )}
        </div>
      ) : (
        /* DATA UNAVAILABLE */

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-10 text-center">
          <div className="mb-4 text-[52px]">
            🚑
          </div>

          <h3 className="mb-2.5 text-[20px] text-white">
            Injury Data Unavailable
          </h3>

          <p className="mx-auto m-0 max-w-[650px] text-sm leading-[1.8] text-slate-400">
            The current football-data.org
            data source does not provide
            the team injury information that
            was previously supplied by
            API-Football.
          </p>

          <div className="mt-4 inline-block rounded-full bg-gray-900 px-3 py-[7px] text-[11px] font-bold text-slate-500">
            Source limitation
          </div>
        </div>
      )}

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}