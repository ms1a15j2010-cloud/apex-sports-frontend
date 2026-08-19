"use client";

export default function MatchLineups({
  lineups = [],
}) {
  if (!lineups || lineups.length === 0) {
    return (
      <section className="mb-6 rounded-[18px] border border-gray-800 bg-gray-900 p-7">
        <h2 className="mb-5 text-[22px] font-extrabold text-white">
          Lineups
        </h2>

        <div className="rounded-[14px] bg-slate-900 px-5 py-7 text-center text-sm text-slate-500">
          Lineup information is not available for this match yet.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6 rounded-[18px] border border-gray-800 bg-gray-900 p-7">
      <h2 className="mb-6 text-[22px] font-extrabold text-white">
        Starting XI & Bench
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        {lineups.map((teamLineup, index) => {
          const team =
            teamLineup?.team ||
            {};

          const startXI =
            Array.isArray(
              teamLineup?.startXI
            )
              ? teamLineup.startXI
              : [];

          const substitutes =
            Array.isArray(
              teamLineup?.substitutes
            )
              ? teamLineup.substitutes
              : [];

          return (
            <div
              key={
                team?.id ||
                `${team?.name}-${index}`
              }
              className="rounded-2xl border border-slate-800 bg-slate-900 p-[18px]"
            >
              {/* TEAM HEADER */}

              <div className="mb-[18px] flex items-center gap-3">
                {team?.logo ? (
                  <img
                    src={team.logo}
                    alt={
                      team.name ||
                      "Team"
                    }
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-[10px] font-extrabold text-slate-500">
                    FC
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="m-0 text-[17px] font-extrabold text-white">
                    {team?.name ||
                      "Unknown Team"}
                  </h3>

                  {teamLineup?.formation && (
                    <div className="mt-1 text-xs font-bold text-green-500">
                      Formation:{" "}
                      {
                        teamLineup.formation
                      }
                    </div>
                  )}
                </div>
              </div>

              {/* STARTING XI */}

              <div className="mb-5">
                <div className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-400">
                  Starting XI
                </div>

                {startXI.length ===
                0 ? (
                  <div className="py-3 text-[13px] text-slate-500">
                    Starting lineup
                    unavailable.
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {startXI.map(
                      (
                        entry,
                        playerIndex
                      ) => {
                        const player =
                          entry?.player ||
                          entry ||
                          {};

                        return (
                          <PlayerRow
                            key={
                              player?.id ||
                              `${player?.name}-${playerIndex}`
                            }
                            player={
                              player
                            }
                            starter
                            number={
                              player?.number ??
                              entry?.number
                            }
                          />
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              {/* BENCH */}

              <div>
                <div className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-400">
                  Bench
                </div>

                {substitutes.length ===
                0 ? (
                  <div className="py-3 text-[13px] text-slate-500">
                    Bench information
                    unavailable.
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {substitutes.map(
                      (
                        entry,
                        playerIndex
                      ) => {
                        const player =
                          entry?.player ||
                          entry ||
                          {};

                        return (
                          <PlayerRow
                            key={
                              player?.id ||
                              `${player?.name}-bench-${playerIndex}`
                            }
                            player={
                              player
                            }
                            number={
                              player?.number ??
                              entry?.number
                            }
                          />
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =====================================================
PLAYER ROW
===================================================== */

function PlayerRow({
  player = {},
  starter = false,
  number,
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[10px] bg-gray-900 px-3 py-2.5">
      <div className="flex h-7 w-7 min-w-7 items-center justify-center rounded-lg bg-slate-800 text-[11px] font-extrabold text-slate-400">
        {number ?? "—"}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className={`overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-white ${
            starter
              ? "font-bold"
              : "font-semibold"
          }`}
        >
          {player?.name ||
            "Unknown Player"}
        </div>

        {player?.position && (
          <div className="mt-0.5 text-[10px] text-slate-500">
            {
              player.position
            }
          </div>
        )}
      </div>
    </div>
  );
}