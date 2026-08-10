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
  const item = team?.statistics?.find(
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

function format(value, percent, decimal) {
  if (decimal)
    return Number(value).toFixed(2);

  if (percent)
  return `${numeric(value)}%`;

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
      <section
        style={{
          background: "#111827",
          borderRadius: 24,
          padding: 32,
          marginBottom: 32,
        }}
      >
        <h2
          style={{
            color: "#fff",
            marginBottom: 18,
          }}
        >
          📊 Match Statistics
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
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
      home: statValue(home, stat.key),
      away: statValue(away, stat.key),
    }));
  }, [home, away]);

  const possession =
    rows.find(
      (r) =>
        r.key === "Ball Possession"
    ) || {};

  const xg =
    rows.find(
      (r) =>
        r.key ===
        "expected_goals"
    ) || {};

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 24,
        padding: 32,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 30,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin: 0,
          }}
        >
          📊 Match Statistics
        </h2>

        <span
          style={{
            color: "#94a3b8",
          }}
        >
          Live Comparison
        </span>
      </div>

      {/* CONTINUE IN PART 2 */}
            {/* ===========================
          HIGHLIGHT CARDS
      =========================== */}

      <div
      className="statistics-highlights"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
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

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
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
     className="statistic-card"
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 22,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 18,
        }}
      >
        {icon} {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#22c55e",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          {home}
        </span>

        <span
          style={{
            color: "#94a3b8",
            fontWeight: 700,
          }}
        >
          VS
        </span>

        <span
          style={{
            color: "#ef4444",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
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
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 18,
      }}
    >
      <div
       className="statistic-header"
        style={{
          display: "grid",
          gridTemplateColumns:
            "70px 1fr 70px",
          gap: 15,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            color: homeWinner
              ? "#22c55e"
              : "#fff",
            fontWeight: 800,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {format(
            home,
            percent,
            decimal
          )}
        </div>

        <div
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {icon} {title}
        </div>

        <div
          style={{
            color: awayWinner
              ? "#ef4444"
              : "#fff",
            fontWeight: 800,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {format(
            away,
            percent,
            decimal
          )}
        </div>

      </div>

      {/* CONTINUE IN PART 3 */}
            <div
        style={{
          display: "flex",
          height: 14,
          borderRadius: 999,
          overflow: "hidden",
          background: "#374151",
        }}
      >
        <div
          style={{
            width: `${leftWidth}%`,
            background: "#22c55e",
            transition: "width .6s ease",
          }}
        />

        <div
          style={{
            width: `${rightWidth}%`,
            background: "#ef4444",
            transition: "width .6s ease",
          }}
        />
      </div>
    </div>
  );
}