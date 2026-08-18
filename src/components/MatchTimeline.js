"use client";

export default function MatchTimeline({
  timeline = [],
}) {
  if (!timeline || timeline.length === 0) {
    return (
      <section className="mb-6 rounded-[18px] border border-gray-800 bg-gray-900 p-5 sm:p-7">
        <div className="mb-[22px] flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 text-[22px] font-extrabold text-white">
            Match Timeline
          </h2>
        </div>

        <div className="rounded-[14px] bg-slate-950 px-5 py-[30px] text-center text-sm text-slate-500">
          No timeline events available.
        </div>
      </section>
    );
  }

  const sortedTimeline = [...timeline].sort(
    (a, b) => {
      const minuteA = Number(
        a?.time?.elapsed ??
          a?.minute ??
          0
      );

      const minuteB = Number(
        b?.time?.elapsed ??
          b?.minute ??
          0
      );

      return minuteA - minuteB;
    }
  );

  return (
    <section className="mb-6 rounded-[18px] border border-gray-800 bg-gray-900 p-5 sm:p-7">
      <h2 className="mb-6 text-[22px] font-extrabold text-white">
        Match Timeline
      </h2>

      <div className="grid gap-3">
        {sortedTimeline.map(
          (event, index) => {
            const minute =
              event?.time?.elapsed ??
              event?.minute ??
              null;

            const extra =
              event?.time?.extra ??
              event?.injuryTime ??
              null;

            const team =
              event?.team || {};

            const player =
              event?.player || {};

            const assist =
              event?.assist || {};

            const eventType = String(
              event?.type ||
                event?.detail ||
                "Event"
            ).toUpperCase();

            const isGoal =
              eventType.includes("GOAL");

            const isCard =
              eventType.includes("CARD");

            const teamName =
              team?.name ||
              "Match Event";

            const playerName =
              player?.name ||
              event?.scorer?.name ||
              null;

            const assistName =
              assist?.name ||
              null;

            const timeClasses = isGoal
              ? "text-green-500"
              : "text-slate-400";

            const iconClasses = isGoal
              ? "bg-green-500/10"
              : isCard
              ? "bg-amber-500/10"
              : "bg-slate-800";

            return (
              <div
                key={
                  event?.id ||
                  `${eventType}-${index}`
                }
                className="grid grid-cols-[55px_minmax(0,1fr)] items-start gap-3 rounded-[14px] border border-slate-800 bg-slate-950 p-4 sm:grid-cols-[70px_minmax(0,1fr)] sm:gap-4"
              >
                {/* TIME */}

                <div
                  className={`pt-[3px] text-center text-sm font-extrabold ${timeClasses}`}
                >
                  {minute !== null
                    ? `${minute}'${
                        extra
                          ? `+${extra}`
                          : ""
                      }`
                    : "—"}
                </div>

                {/* EVENT */}

                <div className="flex min-w-0 items-start gap-3.5">
                  <div
                    className={`flex h-[38px] w-[38px] min-w-[38px] items-center justify-center rounded-full text-[17px] ${iconClasses}`}
                  >
                    {isGoal
                      ? "⚽"
                      : isCard
                      ? "🟨"
                      : "•"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold text-white">
                      {eventType}
                    </div>

                    {playerName && (
                      <div className="mt-[5px] break-words text-sm font-semibold text-slate-200">
                        {playerName}
                      </div>
                    )}

                    {assistName && (
                      <div className="mt-[3px] break-words text-xs text-slate-500">
                        Assist: {assistName}
                      </div>
                    )}

                    <div className="mt-1.5 break-words text-xs text-slate-500">
                      {teamName}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

