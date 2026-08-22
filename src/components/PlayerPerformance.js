"use client";

export default function PlayerPerformance({
  statistics = [],
}) {
  if (
    !Array.isArray(statistics) ||
    statistics.length === 0
  ) {
    return null;
  }

  const stat = statistics[0] || {};

  const games = stat.games || {};
  const goals = stat.goals || {};
  const passes = stat.passes || {};
  const shots = stat.shots || {};
  const tackles = stat.tackles || {};
  const dribbles = stat.dribbles || {};
  const duels = stat.duels || {};
  const fouls = stat.fouls || {};
  const cards = stat.cards || {};

  /* =================================================
     VALUES
  ================================================= */

  const appearances = Number(
    games.appearances ??
      games.appearences ??
      0
  );

  const goalsScored = Number(
    goals.total ?? 0
  );

  const assists = Number(
    goals.assists ?? 0
  );

  const passAccuracy = Number(
    passes.accuracy ?? 0
  );

  const shotsTotal = Number(
    shots.total ?? 0
  );

  const shotsOnTarget = Number(
    shots.on ?? 0
  );

  const tacklesTotal = Number(
    tackles.total ?? 0
  );

  const dribbleSuccess = Number(
    dribbles.success ?? 0
  );

  const duelsWon = Number(
    duels.won ?? 0
  );

  const yellow = Number(
    cards.yellow ?? 0
  );

  const red = Number(
    cards.red ?? 0
  );

  const foulsDrawn = Number(
    fouls.drawn ?? 0
  );

  const foulsCommitted = Number(
    fouls.committed ?? 0
  );

  const rating = parseFloat(
    games.rating || 0
  );

  /* =================================================
     DISPLAY HELPERS
  ================================================= */

  const getRatingColor = (value) => {
    if (!value) {
      return "#94a3b8";
    }

    if (value >= 8) {
      return "#22c55e";
    }

    if (value >= 6.5) {
      return "#eab308";
    }

    return "#ef4444";
  };

  const getRatingStars = (value) => {
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

  const shotProgress =
    shotsTotal > 0
      ? Math.min(
          (shotsOnTarget / shotsTotal) *
            100,
          100
        )
      : 0;

  const duelProgress =
    duelsWon > 0
      ? Math.min(duelsWon * 10, 100)
      : 0;

  const dribbleProgress =
    dribbleSuccess > 0
      ? Math.min(
          dribbleSuccess * 10,
          100
        )
      : 0;

  return (
    <section className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]">
      {/* HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          📈 Player Performance
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Season performance overview
          based on the available
          football-data.org statistics.
        </p>
      </div>

      {/* OVERALL */}

      <div className="mb-[35px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[15px]">
        <PerformanceCard
          title="Rating"
          value={
            rating
              ? rating.toFixed(2)
              : "-"
          }
          color="#22c55e"
        />

        <PerformanceCard
          title="Appearances"
          value={appearances}
          color="#3b82f6"
        />

        <PerformanceCard
          title="Goals"
          value={goalsScored}
          color="#10b981"
        />

        <PerformanceCard
          title="Assists"
          value={assists}
          color="#f59e0b"
        />
      </div>

      {/* RATING */}

      <div className="mb-[30px] flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-gray-800 p-5">
        <div>
          <div className="mb-1.5 text-[13px] text-slate-400">
            Current Rating
          </div>

          <div
            className="text-[30px] font-extrabold"
            style={{
              color: getRatingColor(rating),
            }}
          >
            {rating
              ? rating.toFixed(2)
              : "-"}
          </div>
        </div>

        <div className="text-xl tracking-[2px] text-yellow-400">
          {getRatingStars(rating)}
        </div>
      </div>

      {/* PROGRESS BARS */}

      <ProgressBar
        title="Passing Accuracy"
        value={Math.max(
          0,
          Math.min(passAccuracy, 100)
        )}
        display={
          passAccuracy
            ? `${passAccuracy}%`
            : "-"
        }
        color="#22c55e"
      />

      <ProgressBar
        title="Shots On Target"
        value={shotProgress}
        display={`${shotsOnTarget} / ${shotsTotal}`}
        color="#10b981"
      />

      <ProgressBar
        title="Dribble Success"
        value={dribbleProgress}
        display={dribbleSuccess}
        color="#3b82f6"
      />

      <ProgressBar
        title="Duels Won"
        value={duelProgress}
        display={duelsWon}
        color="#8b5cf6"
      />

      {/* PERFORMANCE DETAILS */}

      <div className="mt-[35px]">
        <h3 className="mb-5 text-xl text-white">
          Performance Details
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[14px]">
          <PerformanceStat
            title="Shots"
            value={shotsTotal}
          />

          <PerformanceStat
            title="Shots On Target"
            value={shotsOnTarget}
          />

          <PerformanceStat
            title="Tackles"
            value={tacklesTotal}
          />

          <PerformanceStat
            title="Dribbles Won"
            value={dribbleSuccess}
          />

          <PerformanceStat
            title="Duels Won"
            value={duelsWon}
          />

          <PerformanceStat
            title="Fouls Drawn"
            value={foulsDrawn}
          />

          <PerformanceStat
            title="Fouls Committed"
            value={foulsCommitted}
          />
        </div>
      </div>

      {/* DISCIPLINE */}

      <div className="mt-10">
        <h3 className="mb-5 text-xl text-white">
          Discipline
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[15px]">
          <PerformanceCard
            title="Yellow Cards"
            value={yellow}
            color="#facc15"
          />

          <PerformanceCard
            title="Red Cards"
            value={red}
            color="#ef4444"
          />

          <PerformanceCard
            title="Fouls Drawn"
            value={foulsDrawn}
            color="#0ea5e9"
          />

          <PerformanceCard
            title="Fouls Committed"
            value={foulsCommitted}
            color="#dc2626"
          />
        </div>
      </div>

      {/* SUMMARY */}

      <div className="mt-[35px] rounded-[18px] bg-gray-800 p-6">
        <h3 className="mb-[15px] text-white">
          Performance Summary
        </h3>

        <p className="m-0 leading-[1.8] text-slate-300">
          The player has made{" "}
          <strong>
            {appearances}
          </strong>{" "}
          appearances and scored{" "}
          <strong>
            {goalsScored}
          </strong>{" "}
          goals with{" "}
          <strong>
            {assists}
          </strong>{" "}
          assists. They have recorded{" "}
          <strong>
            {shotsTotal}
          </strong>{" "}
          shots, including{" "}
          <strong>
            {shotsOnTarget}
          </strong>{" "}
          on target, and contributed{" "}
          <strong>
            {tacklesTotal}
          </strong>{" "}
          tackles and{" "}
          <strong>
            {duelsWon}
          </strong>{" "}
          successful duels.
        </p>
      </div>
    </section>
  );
}

/* =====================================================
PERFORMANCE CARD
===================================================== */

function PerformanceCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="rounded-2xl bg-gray-800 p-[22px] text-center"
      style={{
        border: `1px solid ${color}40`,
      }}
    >
      <div className="mb-2.5 text-[13px] text-slate-400">
        {title}
      </div>

      <div
        className="text-[30px] font-extrabold"
        style={{
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =====================================================
PERFORMANCE STAT
===================================================== */

function PerformanceStat({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
      <div className="mb-[7px] text-xs text-slate-400">
        {title}
      </div>

      <strong className="text-xl font-extrabold text-white">
        {value ?? 0}
      </strong>
    </div>
  );
}

/* =====================================================
PROGRESS BAR
===================================================== */

function ProgressBar({
  title,
  value,
  display,
  color,
}) {
  const safeValue = Math.max(
    0,
    Math.min(
      Number(value) || 0,
      100
    )
  );

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between gap-[15px] text-sm font-semibold text-white">
        <span>{title}</span>

        <span className="text-slate-400">
          {display ??
            `${Math.round(
              safeValue
            )}%`}
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full rounded-full transition-[width] duration-[800ms] ease-in-out"
          style={{
            width: `${safeValue}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}