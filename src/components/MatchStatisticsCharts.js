"use client";

import { useMemo } from "react";

export default function MatchStatisticsCharts({
  statistics = [],
}) {
  if (!statistics || statistics.length < 2) {
    return (
      <section
        className="match-statistics-charts"
        style={{
          background: "#111827",
          borderRadius: 24,
          padding: 32,
          marginBottom: 32,
          border: "1px solid #1f2937",
        }}
      >
        <h2
          className="charts-title"
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: 800,
            marginBottom: 20,
          }}
        >
          📊 Match Statistics Charts
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Statistics are not available.
        </p>
      </section>
    );
  }

  const home = statistics[0];
  const away = statistics[1];

  const getStat = (team, type) => {
    const item = team.statistics?.find(
      (s) => s.type === type
    );

    return item?.value ?? 0;
  };

  const chartData = useMemo(() => {
    return [
      {
        title: "Ball Possession",
        home: parseFloat(
          String(
            getStat(home, "Ball Possession")
          ).replace("%", "")
        ),
        away: parseFloat(
          String(
            getStat(away, "Ball Possession")
          ).replace("%", "")
        ),
        color: "#22c55e",
      },
      {
        title: "Shots",
        home: Number(
          getStat(home, "Total Shots")
        ),
        away: Number(
          getStat(away, "Total Shots")
        ),
        color: "#3b82f6",
      },
      {
        title: "Shots On Target",
        home: Number(
          getStat(home, "Shots on Goal")
        ),
        away: Number(
          getStat(away, "Shots on Goal")
        ),
        color: "#f59e0b",
      },
      {
        title: "Corners",
        home: Number(
          getStat(home, "Corner Kicks")
        ),
        away: Number(
          getStat(away, "Corner Kicks")
        ),
        color: "#ef4444",
      },
      {
        title: "Pass Accuracy",
        home: parseFloat(
          String(
            getStat(home, "Passes %")
          ).replace("%", "")
        ),
        away: parseFloat(
          String(
            getStat(away, "Passes %")
          ).replace("%", "")
        ),
        color: "#8b5cf6",
      },
    ];
  }, [statistics]);

  return (
    <section
      className="match-statistics-charts"
      style={{
        background:
          "linear-gradient(145deg,#0f172a,#111827)",
        borderRadius: 24,
        padding: 32,
        marginBottom: 32,
        border: "1px solid #1f2937",
      }}
    >
      <div
        className="charts-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div className="charts-header-content">
          <div
            className="charts-badge"
            style={{
              color: "#22c55e",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            Apex Sports
          </div>

          <h2
            className="charts-title"
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
              margin: 0,
            }}
          >
            📊 Match Statistics Charts
          </h2>
        </div>

        <div
          className="charts-live-badge"
          style={{
            background:
              "rgba(34,197,94,.12)",
            border:
              "1px solid rgba(34,197,94,.25)",
            color: "#86efac",
            padding: "8px 16px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          Live Stats
        </div>
      </div>

      <div
        className="charts-list"
        style={{
          display: "grid",
          gap: 22,
        }}
      >
        {chartData.map((item) => (
          <StatChart
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}

function StatChart({
  title,
  home,
  away,
  color,
}) {
  const total = home + away;

  const left =
    total === 0
      ? 50
      : (home / total) * 100;

  const right = 100 - left;

  return (
    <div
      className="stat-chart-card"
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 22,
      }}
    >
      <div
        className="stat-chart-header"
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: 12,
        }}
      >
        <strong
          className="stat-home-value"
          style={{
            color: "#22c55e",
          }}
        >
          {home}
        </strong>

        <span
          className="stat-chart-title"
          style={{
            color: "#fff",
            fontWeight: 700,
          }}
        >
          {title}
        </span>

        <strong
          className="stat-away-value"
          style={{
            color: "#ef4444",
          }}
        >
          {away}
        </strong>
      </div>

      <div
        className="stat-progress"
        style={{
          display: "flex",
          height: 16,
          overflow: "hidden",
          borderRadius: 999,
          background: "#374151",
        }}
      >
        <div
          className="stat-progress-home"
          style={{
            width: `${left}%`,
            background: color,
          }}
        />

        <div
          className="stat-progress-away"
          style={{
            width: `${right}%`,
            background: "#ef4444",
          }}
        />
      </div>
    </div>
  );
}