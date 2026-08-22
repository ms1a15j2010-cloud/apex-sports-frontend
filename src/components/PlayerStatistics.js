"use client";

import Image from "next/image";

export default function PlayerStatistics({
  statistics = [],
  player = null,
}) {
  if (
    !Array.isArray(statistics) ||
    statistics.length === 0
  ) {
    return null;
  }

  const getRatingColor = (rating) => {
    if (!rating) {
      return "#94a3b8";
    }

    const value = Number(rating);

    if (value >= 8) {
      return "#22c55e";
    }

    if (value >= 6.5) {
      return "#eab308";
    }

    return "#ef4444";
  };

  const getRatingStars = (rating) => {
    const value = Number(rating || 0);

    if (value >= 9) {
      return "★★★★★";
    }

    if (value >= 8) {
      return "★★★★☆";
    }

    if (value >= 7) {
      return "★★★☆☆";
    }

    if (value >= 6) {
      return "★★☆☆☆";
    }

    if (value > 0) {
      return "★☆☆☆☆";
    }

    return "☆☆☆☆☆";
  };

  const getInitial = (name) => {
    return (
      name?.charAt(0)?.toUpperCase() || "P"
    );
  };

  return (
    <section className="mt-[35px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-slate-900 to-gray-900 p-[30px]">
      {/* SECTION HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          Player Statistics
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Performance statistics for{" "}
          {player?.name || "this player"}.
        </p>
      </div>

      {/* STATISTICS BY COMPETITION / TEAM */}

      {statistics.map((stat, index) => {
        const team = stat?.team || {};
        const league = stat?.league || {};
        const games = stat?.games || {};
        const goals = stat?.goals || {};
        const shots = stat?.shots || {};
        const passes = stat?.passes || {};
        const tackles = stat?.tackles || {};
        const duels = stat?.duels || {};
        const dribbles = stat?.dribbles || {};
        const fouls = stat?.fouls || {};
        const cards = stat?.cards || {};
        const penalty = stat?.penalty || {};

        const teamLogo = team.logo || null;
        const playerPhoto = player?.photo || null;

        return (
          <div
            key={`${team.id || "team"}-${index}`}
            className={
              index < statistics.length - 1
                ? "mb-[30px]"
                : ""
            }
          >
            {/* COMPETITION / TEAM HEADER */}

            <div className="mb-5 flex flex-wrap items-center justify-between gap-5">
              <div className="flex min-w-0 items-center gap-3.5">
                {teamLogo ? (
                  <Image
                    src={teamLogo}
                    width={52}
                    height={52}
                    alt={team.name || "Team"}
                    unoptimized
                    className="h-[52px] w-[52px] shrink-0 object-contain"
                  />
                ) : (
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-slate-800 font-extrabold text-green-500">
                    FC
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-white">
                    {team.name || "Unknown Team"}
                  </h3>

                  <span className="text-[13px] text-slate-400">
                    {league.name || "Premier League"}
                    {" • "}
                    Season {league.season || ""}
                  </span>
                </div>
              </div>

              {/* PLAYER */}

              <div className="flex items-center gap-2.5">
                {playerPhoto ? (
                  <Image
                    src={playerPhoto}
                    width={44}
                    height={44}
                    alt={player?.name || "Player"}
                    unoptimized
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-green-500 bg-slate-800 font-extrabold text-green-500">
                    {getInitial(player?.name)}
                  </div>
                )}

                <strong className="text-white">
                  {player?.name || "Unknown Player"}
                </strong>
              </div>
            </div>

            {/* PRIMARY PERFORMANCE CARDS */}

            <div className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[14px]">
              <Stat
                title="Appearances"
                value={games.appearances}
              />

              <Stat
                title="Minutes"
                value={games.minutes}
              />

              <Stat
                title="Goals"
                value={goals.total}
                highlight
              />

              <Stat
                title="Assists"
                value={goals.assists}
              />

              <Stat
                title="Shots"
                value={shots.total}
              />

              <Stat
                title="Tackles"
                value={tackles.total}
              />
            </div>

            {/* RATING */}

            <div className="mb-[18px] flex flex-wrap items-center justify-between gap-[15px] rounded-[14px] bg-slate-900 p-4">
              <span className="font-semibold text-slate-400">
                Player Rating
              </span>

              <div className="flex items-center gap-3">
                <span
                  className="text-xl font-extrabold"
                  style={{
                    color: getRatingColor(
                      games.rating
                    ),
                  }}
                >
                  {games.rating || "-"}
                </span>

                <span className="text-base tracking-[1px] text-yellow-400">
                  {getRatingStars(games.rating)}
                </span>
              </div>
            </div>

            {/* DETAILED STATISTICS */}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[14px]">
              <Stat
                title="Lineups"
                value={games.lineups}
              />

              <Stat
                title="Passes"
                value={passes.total}
              />

              <Stat
                title="Key Passes"
                value={passes.key}
              />

              <Stat
                title="Pass Accuracy"
                value={
                  passes.accuracy
                    ? `${passes.accuracy}%`
                    : "-"
                }
              />

              <Stat
                title="Duels"
                value={duels.total}
              />

              <Stat
                title="Duels Won"
                value={duels.won}
              />

              <Stat
                title="Dribble Attempts"
                value={dribbles.attempts}
              />

              <Stat
                title="Dribbles Won"
                value={dribbles.success}
              />

              <Stat
                title="Fouls Drawn"
                value={fouls.drawn}
              />

              <Stat
                title="Fouls Committed"
                value={fouls.committed}
              />

              <Stat
                title="🟨 Yellow"
                value={cards.yellow}
              />

              <Stat
                title="🟥 Red"
                value={cards.red}
              />

              <Stat
                title="Penalty Goals"
                value={penalty.scored}
              />

              <Stat
                title="Penalty Missed"
                value={penalty.missed}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* =====================================================
STAT CARD
===================================================== */

function Stat({
  title,
  value,
  highlight = false,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
      <div className="mb-[7px] text-xs text-slate-400">
        {title}
      </div>

      <strong
        className={`text-xl font-extrabold ${
          highlight
            ? "text-green-500"
            : "text-white"
        }`}
      >
        {value ?? 0}
      </strong>
    </div>
  );
}