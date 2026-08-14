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
          📊 Performance Comparison
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          A normalized comparison of the
          team's current-season performance.
        </p>
      </div>

      {/* =================================================
          RATE COMPARISON
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 30,
        }}
      >
        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 24,
            border:
              "1px solid #293548",
          }}
        >
          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 25px",
              fontSize: 20,
            }}
          >
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

        {/* =================================================
            EFFICIENCY
        ================================================= */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 24,
            border:
              "1px solid #293548",
          }}
        >
          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 25px",
              fontSize: 20,
            }}
          >
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

      {/* =================================================
          RECORD SUMMARY
      ================================================= */}

      <div
        style={{
          marginTop: 25,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(160px,1fr))",
          gap: 15,
        }}
      >
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

      {/* =================================================
          ANALYSIS
      ================================================= */}

      <div
        style={{
          marginTop: 30,
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 15px",
          }}
        >
          📌 Analysis
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          The team has played{" "}
          <strong>{played}</strong>{" "}
          matches, winning{" "}
          <strong>{wins}</strong>,
          drawing{" "}
          <strong>{draws}</strong> and
          losing{" "}
          <strong>{losses}</strong>.
          The team has scored{" "}
          <strong>{goalsFor}</strong>{" "}
          goals and conceded{" "}
          <strong>{goalsAgainst}</strong>,
          giving a goal difference of{" "}
          <strong>
            {goalDifference > 0
              ? `+${goalDifference}`
              : goalDifference}
          </strong>
          .
          {" "}
          The current points total is{" "}
          <strong>{points}</strong>{" "}
          with an average of{" "}
          <strong>
            {pointsPerGame}
          </strong>{" "}
          points per match.
        </p>
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
          marginBottom: 8,
          color: "#fff",
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        <span>{title}</span>

        <span>
          {safeValue}%
        </span>
      </div>

      <div
        style={{
          background: "#374151",
          height: 12,
          borderRadius: 30,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width:
              `${safeValue}%`,
            background: color,
            height: "100%",
            borderRadius: 30,
            transition:
              "width .8s ease",
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
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        gap: 15,
        padding:
          "11px 0",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
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
METRIC CARD
===================================================== */

function MetricCard({
  label,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 18,
        textAlign: "center",
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color,
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}