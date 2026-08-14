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
    goalsFor -
    goalsAgainst;

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
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform:
              "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          📈 Performance Analytics
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Current-season team performance
          calculated from football-data.org
          results.
        </p>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: 18,
          marginBottom: 30,
        }}
      >
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

      {/* =================================================
          PERFORMANCE BARS
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 16,
          padding: 25,
          border:
            "1px solid #293548",
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 22px",
          }}
        >
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

      {/* =================================================
          DETAILED STATISTICS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 16,
          marginBottom: 30,
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

      {/* =================================================
          HOME / AWAY ANALYSIS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 20,
        }}
      >
        <RecordPanel
          title="🏠 Home Performance"
          record={home}
        />

        <RecordPanel
          title="✈️ Away Performance"
          record={away}
        />
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <div
        style={{
          marginTop: 30,
          background: "#1f2937",
          borderRadius: 16,
          padding: 22,
          border:
            "1px solid #293548",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 15,
            flexWrap:
              "wrap",
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              color: "#fff",
              margin: 0,
            }}
          >
            📋 Recent Form
          </h3>

          <span
            style={{
              color: "#94a3b8",
              fontSize: 12,
            }}
          >
            Last 5 matches
          </span>
        </div>

        {form ? (
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {form
              .slice(-5)
              .split("")
              .map(
                (
                  result,
                  index
                ) => (
                  <FormBadge
                    key={`${result}-${index}`}
                    result={result}
                  />
                )
              )}
          </div>
        ) : (
          <div
            style={{
              color:
                "#94a3b8",
              fontSize: 14,
            }}
          >
            Recent form is
            unavailable.
          </div>
        )}
      </div>

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
          fontSize: 12,
        }}
      >
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
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign: "center",
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          fontSize: 30,
          marginBottom: 10,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 7,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontWeight: 900,
          fontSize: 28,
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
    <div
      style={{
        marginBottom: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          color: "#fff",
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        <span>{label}</span>

        <span>
          {safeValue}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 12,
          background:
            "#374151",
          borderRadius: 20,
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            width:
              `${safeValue}%`,
            height: "100%",
            background: color,
            borderRadius: 20,
            transition:
              "width .8s ease",
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
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 18,
        textAlign: "center",
        border:
          "1px solid #293548",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
          fontSize: 13,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: 900,
          fontSize: 24,
        }}
      >
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
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 20,
        border:
          "1px solid #293548",
      }}
    >
      <h3
        style={{
          color: "#fff",
          margin:
            "0 0 18px",
        }}
      >
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
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        gap: 15,
        padding:
          "11px 0",
        borderBottom:
          "1px solid #374151",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
          fontSize: 13,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#fff",
          fontSize: 14,
        }}
      >
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
      background:
        "#374151",
      color:
        "#cbd5e1",
    };

  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          current.background,
        color:
          current.color,
        fontWeight: 900,
        fontSize: 13,
      }}
    >
      {result}
    </div>
  );
}