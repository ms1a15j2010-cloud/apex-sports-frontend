"use client";

export default function TeamComparison({
  statistics = {},
}) {
  if (!statistics) return null;

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

  const cleanSheetRate =
    played > 0
      ? Math.round(
          (cleanSheets / played) * 100
        )
      : 0;

  const failedScoreRate =
    played > 0
      ? Math.round(
          (failedToScore / played) * 100
        )
      : 0;

  const goalsPerMatch =
    played > 0
      ? (
          goalsFor / played
        ).toFixed(2)
      : "0.00";

  const concededPerMatch =
    played > 0
      ? (
          goalsAgainst / played
        ).toFixed(2)
      : "0.00";

  const pointsPerGame =
    played > 0
      ? (
          points / played
        ).toFixed(2)
      : "0.00";

  const goalDifference =
    goalsFor - goalsAgainst;

  return (
    <section
      id="comparison"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          📊 Performance Comparison
        </h2>

        <p className="mt-2 text-sm leading-[1.6] text-slate-400">
          A normalized comparison of the
          team's current-season performance.
        </p>
      </div>

      {/* RATE COMPARISON */}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px]">
        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-6">
          <h3 className="mb-[25px] text-[20px] text-white">
            📈 Result Rates
          </h3>

          <ProgressBar
            title="Win Rate"
            value={winRate}
            color="#22c55e"
          />

          <ProgressBar
            title="Draw Rate"
            value={drawRate}
            color="#facc15"
          />

          <ProgressBar
            title="Loss Rate"
            value={lossRate}
            color="#ef4444"
          />

          <ProgressBar
            title="Clean Sheet Rate"
            value={cleanSheetRate}
            color="#8b5cf6"
          />

          <ProgressBar
            title="Failed To Score"
            value={failedScoreRate}
            color="#6b7280"
          />
        </div>

        {/* EFFICIENCY */}

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-6">
          <h3 className="mb-[25px] text-[20px] text-white">
            ⚡ Team Efficiency
          </h3>

          <InfoRow
            label="Matches Played"
            value={played}
          />

          <InfoRow
            label="Points"
            value={points}
          />

          <InfoRow
            label="Points / Match"
            value={pointsPerGame}
          />

          <InfoRow
            label="Goals / Match"
            value={goalsPerMatch}
          />

          <InfoRow
            label="Conceded / Match"
            value={concededPerMatch}
          />

          <InfoRow
            label="Goal Difference"
            value={
              goalDifference > 0
                ? `+${goalDifference}`
                : goalDifference
            }
          />
        </div>
      </div>

      {/* RECORD SUMMARY */}

      <div className="mt-[25px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[15px]">
        <MetricCard
          label="Wins"
          value={wins}
          color="#22c55e"
        />

        <MetricCard
          label="Draws"
          value={draws}
          color="#facc15"
        />

        <MetricCard
          label="Losses"
          value={losses}
          color="#ef4444"
        />

        <MetricCard
          label="Goals For"
          value={goalsFor}
          color="#3b82f6"
        />

        <MetricCard
          label="Goals Against"
          value={goalsAgainst}
          color="#f97316"
        />

        <MetricCard
          label="Clean Sheets"
          value={cleanSheets}
          color="#8b5cf6"
        />
      </div>

      {/* ANALYSIS */}

      <div className="mt-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-6">
        <h3 className="mb-[15px] text-white">
          📌 Analysis
        </h3>

        <p className="m-0 leading-[1.85] text-slate-300">
          The team has played{" "}
          <strong>{played}</strong>{" "}
          matches, winning{" "}
          <strong>{wins}</strong>, drawing{" "}
          <strong>{draws}</strong> and losing{" "}
          <strong>{losses}</strong>. The
          team has scored{" "}
          <strong>{goalsFor}</strong>{" "}
          goals and conceded{" "}
          <strong>{goalsAgainst}</strong>,
          giving a goal difference of{" "}
          <strong>
            {goalDifference > 0
              ? `+${goalDifference}`
              : goalDifference}
          </strong>
          . The current points total is{" "}
          <strong>{points}</strong> with an
          average of{" "}
          <strong>{pointsPerGame}</strong>{" "}
          points per match.
        </p>
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
PROGRESS BAR
===================================================== */

function ProgressBar({
  title,
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
      <div className="mb-2 flex justify-between text-[13px] font-semibold text-white">
        <span>{title}</span>

        <span>{safeValue}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-[30px] bg-gray-700">
        <div
          className="h-full rounded-[30px] transition-[width] duration-[800ms] ease"
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
INFO ROW
===================================================== */

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between gap-[15px] border-b border-white/[0.08] py-[11px]">
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
METRIC CARD
===================================================== */

function MetricCard({
  label,
  value,
  color,
}) {
  return (
    <div
      className="rounded-[14px] bg-gray-800 p-[18px] text-center"
      style={{
        border: `1px solid ${color}40`,
      }}
    >
      <div className="mb-2 text-xs text-slate-400">
        {label}
      </div>

      <div
        className="text-[24px] font-black"
        style={{
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}