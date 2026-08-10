"use client";

export default function TeamComparison({
  statistics = {},
}) {
  if (!statistics) return null;

  const {
    played = 0,
    wins = 0,
    draws = 0,
    losses = 0,
    goalsFor = 0,
    goalsAgainst = 0,
    cleanSheets = 0,
    failedToScore = 0,
    points = 0,
  } = statistics;

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

  const goalsPerMatch =
    played > 0
      ? (goalsFor / played).toFixed(2)
      : "0.00";

  const concededPerMatch =
    played > 0
      ? (goalsAgainst / played).toFixed(2)
      : "0.00";

  const cleanSheetRate =
    played > 0
      ? Math.round((cleanSheets / played) * 100)
      : 0;

  const failedScoreRate =
    played > 0
      ? Math.round((failedToScore / played) * 100)
      : 0;

  const pointsPerGame =
    played > 0
      ? (points / played).toFixed(2)
      : "0.00";

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
        }}
      >
        📊 Performance Comparison
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: 30,
        }}
      >
        <div>
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

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h3
            style={{
              color: "#fff",
              marginBottom: 25,
            }}
          >
            📈 Team Efficiency
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
            label="Wins"
            value={wins}
          />

          <InfoRow
            label="Draws"
            value={draws}
          />

          <InfoRow
            label="Losses"
            value={losses}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 35,
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 15,
          }}
        >
          📌 Analysis
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          This comparison summarizes the team's overall
          performance during the current season. A higher
          win rate, more clean sheets, and stronger points
          per game generally indicate a better-performing
          team. Goals scored and conceded per match provide
          an overall view of attacking and defensive
          efficiency.
        </p>
      </div>
    </section>
  );
}

function ProgressBar({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        <span>{title}</span>

        <span>{value}%</span>
      </div>

      <div
        style={{
          background: "#374151",
          height: 14,
          borderRadius: 30,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.max(
              0,
              Math.min(value, 100)
            )}%`,
            background: color,
            height: "100%",
            borderRadius: 30,
            transition: "width .8s ease",
          }}
        />
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#fff",
        }}
      >
        {value}
      </strong>
    </div>
  );
}