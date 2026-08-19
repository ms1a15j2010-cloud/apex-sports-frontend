"use client";

export default function MatchEvents({
  events = [],
}) {
  if (!events || events.length === 0) {
    return (
      <section className="mb-6 rounded-[18px] border border-gray-800 bg-gray-900 p-5 sm:p-7">
        <h2 className="mb-5 text-[22px] font-extrabold text-white">
          Match Events
        </h2>

        <div className="rounded-[14px] bg-slate-950 px-5 py-7 text-center text-sm text-slate-500">
          No match events available.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6 rounded-[18px] border border-gray-800 bg-gray-900 p-5 sm:p-7">
      <h2 className="mb-6 text-[22px] font-extrabold text-white">
        Match Events
      </h2>

      <div className="grid gap-3">
        {events.map(
          (event, index) => {
            const minute =
              event?.time?.elapsed ??
              event?.minute ??
              null;

            const extra =
              event?.time?.extra ??
              event?.injuryTime ??
              null;

            const type =
              String(
                event?.type ||
                  event?.detail ||
                  "Event"
              );

            const detail =
              String(
                event?.detail ||
                  type
              );

            const player =
              event?.player?.name ||
              event?.scorer?.name ||
              null;

            const assist =
              event?.assist?.name ||
              null;

            const team =
              event?.team || {};

            const homeScore =
              event?.score?.home;

            const awayScore =
              event?.score?.away;

            const upperType =
              type.toUpperCase();

            let icon = "•";

            if (
              upperType.includes(
                "GOAL"
              )
            ) {
              icon = "⚽";
            } else if (
              upperType.includes(
                "CARD"
              )
            ) {
              icon = "🟨";
            } else if (
              upperType.includes(
                "SUB"
              )
            ) {
              icon = "🔄";
            }

            return (
              <div
                key={
                  event?.id ||
                  `${index}-${type}`
                }
                className="rounded-[14px] border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-[15px]">
                  {/* LEFT */}

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-[38px] w-[38px] min-w-[38px] items-center justify-center rounded-full bg-slate-800 text-[17px]">
                      {icon}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-white">
                        {detail}
                      </div>

                      {player && (
                        <div className="mt-1 break-words text-[13px] text-slate-300">
                          {player}
                        </div>
                      )}

                      {assist && (
                        <div className="mt-[3px] break-words text-[11px] text-slate-500">
                          Assist: {assist}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-green-500">
                      {minute !== null
                        ? `${minute}'${
                            extra
                              ? `+${extra}`
                              : ""
                          }`
                        : "—"}
                    </div>

                    {(homeScore !==
                      undefined ||
                      awayScore !==
                        undefined) && (
                      <div className="mt-1 text-[11px] text-slate-500">
                        {homeScore ?? "—"} -{" "}
                        {awayScore ?? "—"}
                      </div>
                    )}
                  </div>
                </div>

                {team?.name && (
                  <div className="mt-3 border-t border-slate-800 pt-2.5 text-[11px] text-slate-500">
                    {team.name}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

