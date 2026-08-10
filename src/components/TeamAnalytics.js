"use client";

export default function TeamAnalytics({
  statistics = {},
}) {
  // Support both API-Football raw statistics
  // and already formatted statistics.

  const played =
    statistics.played ||
    statistics.fixtures?.played?.total ||
    0;

  const wins =
    statistics.wins ||
    statistics.fixtures?.wins?.total ||
    0;

  const draws =
    statistics.draws ||
    statistics.fixtures?.draws?.total ||
    0;

  const losses =
    statistics.losses ||
    statistics.fixtures?.loses?.total ||
    statistics.fixtures?.losses?.total ||
    0;

  const goalsFor =
    statistics.goalsFor ||
    statistics.goals?.for?.total?.total ||
    0;

  const goalsAgainst =
    statistics.goalsAgainst ||
    statistics.goals?.against?.total?.total ||
    0;

  const cleanSheets =
    statistics.cleanSheets ||
    statistics.clean_sheet?.total ||
    statistics.cleanSheet?.total ||
    0;

  const failedToScore =
    statistics.failedToScore ||
    statistics.failed_to_score?.total ||
    0;

  const winRate =
    played > 0
      ? Math.round((wins / played) * 100)
      : 0;

  const drawRate =
    played > 0
      ? Math.round((draws / played) * 100)
      : 0;

  const lossRate =
    played > 0
      ? Math.round((losses / played) * 100)
      : 0;

  const avgGoalsFor =
    played > 0
      ? (goalsFor / played).toFixed(2)
      : "0.00";

  const avgGoalsAgainst =
    played > 0
      ? (goalsAgainst / played).toFixed(2)
      : "0.00";

  const cleanSheetRate =
    played > 0
      ? Math.round((cleanSheets / played) * 100)
      : 0;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 30,
          fontSize: 28,
        }}
      >
        📈 Performance Analytics
      </h2>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <AnalyticsCard
          title="Matches Played"
          value={played}
          color="#3b82f6"
          icon="🏟"
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
      </div>

      {/* Progress Bars */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 16,
          padding: 25,
        }}
      >
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

      {/* Detailed Stats */}

      <div
        style={{
          marginTop: 35,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 20,
        }}
      >
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
          label="Clean Sheets"
          value={cleanSheets}
        />

        <SmallStat
          label="Failed To Score"
          value={failedToScore}
        />
      </div>
    </section>
  );
}

/* ===================================== */

function AnalyticsCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        border: `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          fontSize: 34,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontWeight: "bold",
          fontSize: 32,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ===================================== */

function ProgressBar({
  label,
  value,
  color,
}) {
  return (
    <div
      style={{
        marginBottom: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#fff",
          marginBottom: 8,
        }}
      >
        <span>{label}</span>

        <span>{value}%</span>
      </div>

      <div
        style={{
          width: "100%",
          height: 14,
          background: "#374151",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(value, 100)}%`,
            height: "100%",
            background: color,
            transition: "width .8s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ===================================== */

function SmallStat({
  label,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 18,
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
          fontSize: 14,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 26,
        }}
      >
        {value}
      </div>
    </div>
  );
}