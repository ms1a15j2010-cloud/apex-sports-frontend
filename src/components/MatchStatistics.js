"use client";

import { useMemo } from "react";

/* =====================================================
   STAT DEFINITIONS
===================================================== */

const STAT_CONFIG = [
  {
    key: "expected_goals",
    label: "Expected Goals (xG)",
    color: "#60a5fa",
    icon: "⚽",
    decimal: true,
  },
  {
    key: "Ball Possession",
    label: "Possession",
    color: "#22c55e",
    icon: "📊",
    percent: true,
  },
  {
    key: "Total Shots",
    label: "Total Shots",
    color: "#38bdf8",
    icon: "🎯",
  },
  {
    key: "Shots on Goal",
    label: "Shots on Target",
    color: "#10b981",
    icon: "🥅",
  },
  {
    key: "Shots off Goal",
    label: "Shots off Target",
    color: "#f59e0b",
    icon: "🚀",
  },
  {
    key: "Blocked Shots",
    label: "Blocked Shots",
    color: "#f97316",
    icon: "🛡",
  },
  {
    key: "Corner Kicks",
    label: "Corners",
    color: "#8b5cf6",
    icon: "🚩",
  },
  {
    key: "Offsides",
    label: "Offsides",
    color: "#ef4444",
    icon: "⛳",
  },
  {
    key: "Fouls",
    label: "Fouls",
    color: "#f43f5e",
    icon: "🚫",
  },
  {
    key: "Yellow Cards",
    label: "Yellow Cards",
    color: "#eab308",
    icon: "🟨",
  },
  {
    key: "Red Cards",
    label: "Red Cards",
    color: "#dc2626",
    icon: "🟥",
  },
  {
    key: "Goalkeeper Saves",
    label: "Saves",
    color: "#14b8a6",
    icon: "🧤",
  },
  {
    key: "Total passes",
    label: "Passes",
    color: "#06b6d4",
    icon: "🎟",
  },
  {
    key: "Passes %",
    label: "Pass Accuracy",
    color: "#22c55e",
    icon: "✅",
    percent: true,
  },
  {
    key: "Big Chances",
    label: "Big Chances",
    color: "#ec4899",
    icon: "🔥",
  },
];

/* =====================================================
   HELPERS
===================================================== */

function statValue(team, key) {
  const item =
    team?.statistics?.find(
      (s) => s.type === key
    );

  return item?.value ?? 0;
}

function numeric(value) {
  if (value === null) return 0;
  if (value === undefined) return 0;

  return (
    parseFloat(
      String(value).replace("%", "")
    ) || 0
  );
}

function format(
  value,
  percent,
  decimal
) {
  if (decimal) {
    return Number(value).toFixed(2);
  }

  if (percent) {
    return `${numeric(value)}%`;
  }

  return numeric(value);
}

/* =====================================================
   COMPONENT
===================================================== */

export default function MatchStatistics({
  statistics = [],
}) {
  if (
    !statistics ||
    statistics.length < 2
  ) {
    return (
      <section className="mb-8 rounded-[24px] bg-gray-900 p-5 sm:p-8">
        <h2 className="mb-[18px] text-2xl font-bold text-white">
          📊 Match Statistics
        </h2>

        <p className="m-0 text-slate-400">
          Statistics unavailable.
        </p>
      </section>
    );
  }

  const home = statistics[0];
  const away = statistics[1];

  const rows = useMemo(() => {
    return STAT_CONFIG.map((stat) => ({
      ...stat,
      home: statValue(
        home,
        stat.key
      ),
      away: statValue(
        away,
        stat.key
      ),
    }));
  }, [home, away]);

  const possession =
    rows.find(
      (row) =>
        row.key ===
        "Ball Possession"
    ) || {};

  const xg =
    rows.find(
      (row) =>
        row.key ===
        "expected_goals"
    ) || {};

  return (
    <section className="mb-8 rounded-[24px] bg-gray-900 p-5 sm:p-8">
      <div className="mb-[30px] flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-2xl font-bold text-white">
          📊 Match Statistics
        </h2>

        <span className="text-sm text-slate-400">
          Live Comparison
        </span>
      </div>

      {/* ===========================
          HIGHLIGHT CARDS
      =========================== */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <HighlightCard
          title="Possession"
          icon="📊"
          color="#22c55e"
          home={format(
            possession.home,
            true
          )}
          away={format(
            possession.away,
            true
          )}
        />

        <HighlightCard
          title="Expected Goals"
          icon="⚽"
          color="#3b82f6"
          home={format(
            xg.home,
            false,
            true
          )}
          away={format(
            xg.away,
            false,
            true
          )}
        />
      </div>

      {/* ===========================
          STAT BARS
      =========================== */}

      <div className="grid gap-[18px]">
        {rows.map((row) => (
          <StatisticBar
            key={row.key}
            title={row.label}
            icon={row.icon}
            color={row.color}
            home={row.home}
            away={row.away}
            percent={row.percent}
            decimal={row.decimal}
          />
        ))}
      </div>
    </section>
  );
}

/* =====================================================
   HIGHLIGHT CARD
===================================================== */

function HighlightCard({
  title,
  icon,
  color,
  home,
  away,
}) {
  return (
    <div
      className="rounded-[18px] bg-gray-800 p-[22px]"
      style={{
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div className="mb-[18px] text-[18px] font-bold text-white">
        {icon} {title}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[28px] font-extrabold text-green-500">
          {home}
        </span>

        <span className="font-bold text-slate-400">
          VS
        </span>

        <span className="text-[28px] font-extrabold text-red-500">
          {away}
        </span>
      </div>
    </div>
  );
}

/* =====================================================
   STAT BAR
===================================================== */

function StatisticBar({
  title,
  icon,
  color,
  home,
  away,
  percent,
  decimal,
}) {
  const left = numeric(home);
  const right = numeric(away);

  const total = left + right;

  const leftWidth =
    total === 0
      ? 50
      : (left / total) * 100;

  const rightWidth =
    total === 0
      ? 50
      : (right / total) * 100;

  const homeWinner =
    left > right;

  const awayWinner =
    right > left;

  return (
    <div className="rounded-[18px] bg-gray-800 p-[18px]">
      <div className="mb-3 grid grid-cols-[60px_minmax(0,1fr)_60px] items-center gap-3 sm:grid-cols-[70px_minmax(0,1fr)_70px] sm:gap-[15px]">
        <div
          className={`text-center text-[18px] font-extrabold ${
            homeWinner
              ? "text-green-500"
              : "text-white"
          }`}
        >
          {format(
            home,
            percent,
            decimal
          )}
        </div>

        <div className="text-center font-bold text-white">
          {icon} {title}
        </div>

        <div
          className={`text-center text-[18px] font-extrabold ${
            awayWinner
              ? "text-red-500"
              : "text-white"
          }`}
        >
          {format(
            away,
            percent,
            decimal
          )}
        </div>
      </div>

      <div className="flex h-3.5 overflow-hidden rounded-full bg-gray-700">
        <div
          className="bg-green-500 transition-[width] duration-500 ease-in-out"
          style={{
            width: `${leftWidth}%`,
          }}
        />

        <div
          className="bg-red-500 transition-[width] duration-500 ease-in-out"
          style={{
            width: `${rightWidth}%`,
          }}
        />
      </div>
    </div>
  );
}
