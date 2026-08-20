"use client";

export default function TeamAnalytics({
  statistics = {},
}) {
  if (!statistics) {
    return null;
  }

  /* =====================================================
     NORMALIZED FOOTBALL-DATA.ORG STATISTICS
  ===================================================== */

  const played =
    Number(statistics.played) || 0;

  const wins =
    Number(statistics.wins) || 0;

  const draws =
    Number(statistics.draws) || 0;

  const losses =
    Number(statistics.losses) || 0;

  const goalsFor =
    Number(statistics.goalsFor) || 0;

  const goalsAgainst =
    Number(statistics.goalsAgainst) || 0;

  const cleanSheets =
    Number(statistics.cleanSheets) || 0;

  const failedToScore =
    Number(statistics.failedToScore) || 0;

  const points =
    Number(statistics.points) || 0;

  const form =
    statistics.form || "";

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const winRate =
    played > 0
      ? Math.round(
          (wins / played) * 100
        )
      : 0;

  const drawRate =
    played > 0
      ? Math.round(
          (draws / played) * 100
        )
      : 0;

  const lossRate =
    played > 0
      ? Math.round(
          (losses / played) * 100
        )
      : 0;

  const avgGoalsFor =
    played > 0
      ? (
          goalsFor / played
        ).toFixed(2)
      : "0.00";

  const avgGoalsAgainst =
    played > 0
      ? (
          goalsAgainst / played
        ).toFixed(2)
      : "0.00";

  const cleanSheetRate =
    played > 0
      ? Math.round(
          (cleanSheets / played) * 100
        )
      : 0;

  const pointsPerMatch =
    played > 0
      ? (
          points / played
        ).toFixed(2)
      : "0.00";

  const goalDifference =
    goalsFor - goalsAgainst;

  const home =
    statistics.home || {};

  const away =
    statistics.away || {};

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      id="analytics"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          📈 Performance Analytics
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Current-season team performance
          calculated from football-data.org
          results.
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
        <AnalyticsCard
          title="Matches Played"
          value={played}
          color="#3b82f6"
          icon="🏟️"
        />

        <AnalyticsCard
          title="Win Rate"
          value={`${winRate}%`}
          color="#22c55e"
          icon="📈"
        />

        <AnalyticsCard
          title="Goals / Match"
          value={avgGoalsFor}
          color="#10b981"
          icon="⚽"
        />

        <AnalyticsCard
          title="Conceded / Match"
          value={avgGoalsAgainst}
          color="#ef4444"
          icon="🥅"
        />

        <AnalyticsCard
          title="Points"
          value={points}
          color="#a855f7"
          icon="🏆"
        />

        <AnalyticsCard
          title="Goal Difference"
          value={
            goalDifference > 0
              ? `+${goalDifference}`
              : goalDifference
          }
          color={
            goalDifference >= 0
              ? "#22c55e"
              : "#ef4444"
          }
          icon="⚡"
        />
      </div>

      {/* PERFORMANCE BARS */}

      <div className="mb-[30px] rounded-2xl border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-[22px] text-white">
          Performance Breakdown
        </h3>

        <ProgressBar
          label="Win Percentage"
          value={winRate}
          color="#22c55e"
        />

        <ProgressBar
          label="Draw Percentage"
          value={drawRate}
          color="#facc15"
        />

        <ProgressBar
          label="Loss Percentage"
          value={lossRate}
          color="#ef4444"
        />

        <ProgressBar
          label="Clean Sheet Rate"
          value={cleanSheetRate}
          color="#8b5cf6"
        />
      </div>

      {/* DETAILED STATISTICS */}

      <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        <SmallStat
          label="Wins"
          value={wins}
        />

        <SmallStat
          label="Draws"
          value={draws}
        />

        <SmallStat
          label="Losses"
          value={losses}
        />

        <SmallStat
          label="Goals Scored"
          value={goalsFor}
        />

        <SmallStat
          label="Goals Against"
          value={goalsAgainst}
        />

        <SmallStat
          label="Goal Difference"
          value={
            goalDifference > 0
              ? `+${goalDifference}`
              : goalDifference
          }
        />

        <SmallStat
          label="Clean Sheets"
          value={cleanSheets}
        />

        <SmallStat
          label="Failed To Score"
          value={failedToScore}
        />

        <SmallStat
          label="Points / Match"
          value={pointsPerMatch}
        />
      </div>

      {/* HOME / AWAY ANALYSIS */}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        <RecordPanel
          title="🏠 Home Performance"
          record={home}
        />

        <RecordPanel
          title="✈️ Away Performance"
          record={away}
        />
      </div>

      {/* FORM */}

      <div className="mt-[30px] rounded-2xl border border-[#293548] bg-gray-800 p-[22px]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-[15px]">
          <h3 className="m-0 text-white">
            📋 Recent Form
          </h3>

          <span className="text-xs text-slate-400">
            Last 5 matches
          </span>
        </div>

        {form ? (
          <div className="flex flex-wrap gap-2.5">
            {form
              .slice(-5)
              .split("")
              .map(
                (result, index) => (
                  <FormBadge
                    key={`${result}-${index}`}
                    result={result}
                  />
                )
              )}
          </div>
        ) : (
          <div className="text-sm text-slate-400">
            Recent form is unavailable.
          </div>
        )}
      </div>

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
        {statistics.season
          ? ` • Season ${statistics.season}`
          : ""}
      </div>
    </section>
  );
}

/* =====================================================
ANALYTICS CARD
===================================================== */

function AnalyticsCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      className="rounded-2xl bg-gray-800 p-[22px] text-center"
      style={{
        border: `1px solid ${color}40`,
      }}
    >
      <div className="mb-2.5 text-[30px]">
        {icon}
      </div>

      <div className="mb-[7px] text-[13px] text-slate-400">
        {title}
      </div>

      <div
        className="text-[28px] font-black"
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
PROGRESS BAR
===================================================== */

function ProgressBar({
  label,
  value,
  color,
}) {
  const safeValue =
    Math.max(
      0,
      Math.min(
        Number(value) || 0,
        100
      )
    );

  return (
    <div className="mb-[22px]">
      <div className="mb-2 flex justify-between text-[13px] font-bold text-white">
        <span>{label}</span>

        <span>{safeValue}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-[20px] bg-gray-700">
        <div
          className="h-full rounded-[20px] transition-[width] duration-[800ms] ease"
          style={{
            width: `${safeValue}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

/* =====================================================
SMALL STAT
===================================================== */

function SmallStat({
  label,
  value,
}) {
  return (
    <div className="rounded-[14px] border border-[#293548] bg-gray-800 p-[18px] text-center">
      <div className="mb-2 text-[13px] text-slate-400">
        {label}
      </div>

      <div className="text-[24px] font-black text-white">
        {value ?? 0}
      </div>
    </div>
  );
}

/* =====================================================
HOME / AWAY RECORD
===================================================== */

function RecordPanel({
  title,
  record = {},
}) {
  const played =
    Number(record.played) || 0;

  const wins =
    Number(record.wins) || 0;

  const draws =
    Number(record.draws) || 0;

  const losses =
    Number(record.losses) || 0;

  const winRate =
    played > 0
      ? Math.round(
          (wins / played) * 100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-[#293548] bg-gray-800 p-5">
      <h3 className="mb-[18px] text-white">
        {title}
      </h3>

      <StatRow
        label="Played"
        value={played}
      />

      <StatRow
        label="Wins"
        value={wins}
      />

      <StatRow
        label="Draws"
        value={draws}
      />

      <StatRow
        label="Losses"
        value={losses}
      />

      <StatRow
        label="Win Rate"
        value={`${winRate}%`}
      />
    </div>
  );
}

/* =====================================================
STAT ROW
===================================================== */

function StatRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between gap-[15px] border-b border-gray-700 py-[11px]">
      <span className="text-[13px] text-slate-400">
        {label}
      </span>

      <strong className="text-sm text-white">
        {value ?? "-"}
      </strong>
    </div>
  );
}

/* =====================================================
FORM BADGE
===================================================== */

function FormBadge({
  result,
}) {
  const config = {
    W: {
      background: "#166534",
      color: "#dcfce7",
    },

    D: {
      background: "#92400e",
      color: "#fef3c7",
    },

    L: {
      background: "#991b1b",
      color: "#fee2e2",
    },
  };

  const current =
    config[result] || {
      background: "#374151",
      color: "#cbd5e1",
    };

  return (
    <div
      className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] text-[13px] font-black"
      style={{
        background: current.background,
        color: current.color,
      }}
    >
      {result}
    </div>
  );
}