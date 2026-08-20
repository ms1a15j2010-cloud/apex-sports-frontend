"use client";

export default function TeamStats({
  statistics,
}) {
  if (!statistics) {
    return (
      <section
        id="statistics"
        className="mb-[30px] rounded-[18px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-7 text-white"
      >
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0">
          📊 Team Statistics
        </h2>

        <p className="mt-3 text-slate-400">
          No team statistics available.
        </p>
      </section>
    );
  }

  /* =====================================================
     NORMALIZED FOOTBALL-DATA.ORG DATA
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
    Number(
      statistics.cleanSheets
    ) || 0;

  const failedToScore =
    Number(
      statistics.failedToScore
    ) || 0;

  const points =
    Number(statistics.points) || 0;

  const form =
    statistics.form || "";

  const home =
    statistics.home || {};

  const away =
    statistics.away || {};

  /* =====================================================
     CALCULATED VALUES
  ===================================================== */

  const goalsPerGame =
    played > 0
      ? (
          goalsFor / played
        ).toFixed(2)
      : "0.00";

  const concededPerGame =
    played > 0
      ? (
          goalsAgainst / played
        ).toFixed(2)
      : "0.00";

  const winRate =
    played > 0
      ? Math.round(
          (wins / played) * 100
        )
      : 0;

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
      id="statistics"
      className="mb-[30px] rounded-[18px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-7"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[30px] text-white">
          📊 Team Statistics
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Current-season performance
          calculated from football-data.org
          match results.
        </p>
      </div>

      {/* TOP CARDS */}

      <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">
        <Card
          title="Matches"
          value={played}
          color="#3b82f6"
        />

        <Card
          title="Wins"
          value={wins}
          color="#22c55e"
        />

        <Card
          title="Draws"
          value={draws}
          color="#f59e0b"
        />

        <Card
          title="Losses"
          value={losses}
          color="#ef4444"
        />

        <Card
          title="Points"
          value={points}
          color="#a855f7"
        />

        <Card
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
        />
      </div>

      {/* GOAL STATISTICS */}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        <InfoPanel title="⚽ Goal Statistics">
          <Stat
            label="Goals For"
            value={goalsFor}
          />

          <Stat
            label="Goals Against"
            value={goalsAgainst}
          />

          <Stat
            label="Goals Per Match"
            value={goalsPerGame}
          />

          <Stat
            label="Conceded Per Match"
            value={concededPerGame}
          />

          <Stat
            label="Clean Sheets"
            value={cleanSheets}
          />

          <Stat
            label="Failed To Score"
            value={failedToScore}
          />
        </InfoPanel>

        {/* PERFORMANCE */}

        <InfoPanel title="📈 Performance">
          <Stat
            label="Win Rate"
            value={`${winRate}%`}
          />

          <Stat
            label="Points"
            value={points}
          />

          <Stat
            label="Points Per Match"
            value={pointsPerGame}
          />

          <Stat
            label="Current Form"
            value={form || "N/A"}
          />

          <Stat
            label="Home Record"
            value={`${home.wins || 0}W - ${
              home.draws || 0
            }D - ${
              home.losses || 0
            }L`}
          />

          <Stat
            label="Away Record"
            value={`${away.wins || 0}W - ${
              away.draws || 0
            }D - ${
              away.losses || 0
            }L`}
          />
        </InfoPanel>
      </div>

      {/* HOME / AWAY BREAKDOWN */}

      <div className="mt-[25px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        <RecordPanel
          title="🏠 Home Performance"
          record={home}
        />

        <RecordPanel
          title="✈️ Away Performance"
          record={away}
        />
      </div>

      {/* BIGGEST RESULTS */}

      {(statistics.biggestWin ||
        statistics.biggestLoss) && (
        <div className="mt-[25px] rounded-2xl border border-[#293548] bg-gray-800 p-5">
          <h3 className="mb-[18px] text-white">
            🏅 Biggest Results
          </h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[15px]">
            <Stat
              label="Biggest Win"
              value={
                statistics
                  .biggestWin
                  ?.score || "N/A"
              }
            />

            <Stat
              label="Biggest Loss"
              value={
                statistics
                  .biggestLoss
                  ?.score || "N/A"
              }
            />
          </div>
        </div>
      )}

      {/* FORM */}

      <div className="mt-[25px] rounded-2xl border border-[#293548] bg-gray-800 p-5">
        <h3 className="mb-[15px] text-white">
          📋 Recent Form
        </h3>

        {form ? (
          <div className="flex flex-wrap gap-2.5">
            {form
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
            Form data unavailable.
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
CARD
===================================================== */

function Card({
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-[14px] border border-[#293548] bg-gray-800 p-5 text-center">
      <div className="mb-2 text-[13px] text-slate-400">
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
INFO PANEL
===================================================== */

function InfoPanel({
  title,
  children,
}) {
  return (
    <div className="rounded-2xl border border-[#293548] bg-gray-800 p-5">
      <h3 className="mb-[18px] text-[19px] text-white">
        {title}
      </h3>

      {children}
    </div>
  );
}

/* =====================================================
STAT
===================================================== */

function Stat({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-[15px] border-b border-gray-700 py-[11px]">
      <span className="text-[13px] text-slate-400">
        {label}
      </span>

      <strong className="text-right text-sm text-white">
        {value ?? "-"}
      </strong>
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

      <Stat
        label="Played"
        value={played}
      />

      <Stat
        label="Wins"
        value={wins}
      />

      <Stat
        label="Draws"
        value={draws}
      />

      <Stat
        label="Losses"
        value={losses}
      />

      <Stat
        label="Win Rate"
        value={`${winRate}%`}
      />
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
      label: "W",
    },

    D: {
      background: "#92400e",
      color: "#fef3c7",
      label: "D",
    },

    L: {
      background: "#991b1b",
      color: "#fee2e2",
      label: "L",
    },
  };

  const current =
    config[result] || {
      background: "#374151",
      color: "#cbd5e1",
      label: result,
    };

  return (
    <div
      className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] font-black"
      style={{
        background:
          current.background,
        color: current.color,
      }}
    >
      {current.label}
    </div>
  );
}