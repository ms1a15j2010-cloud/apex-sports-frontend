"use client";

export default function TeamStats({
  statistics,
}) {
  if (!statistics) {
    return (
      <section
        id="statistics"
        style={{
          background:
            "linear-gradient(145deg,#111827,#0f172a)",
          borderRadius: 18,
          padding: 28,
          marginBottom: 30,
          color: "#fff",
          border:
            "1px solid #1e293b",
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            margin: 0,
          }}
        >
          📊 Team Statistics
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: 12,
          }}
        >
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
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 18,
        padding: 28,
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
          marginBottom: 25,
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
            margin: 0,
            color: "#fff",
            fontSize: 30,
          }}
        >
          📊 Team Statistics
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Current-season performance
          calculated from football-data.org
          match results.
        </p>
      </div>

      {/* =================================================
          TOP CARDS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: 16,
          marginBottom: 30,
        }}
      >
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

      {/* =================================================
          GOAL STATISTICS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 20,
        }}
      >
        <InfoPanel
          title="⚽ Goal Statistics"
        >
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

        {/* =================================================
            PERFORMANCE
        ================================================= */}

        <InfoPanel
          title="📈 Performance"
        >
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
            value={
              form || "N/A"
            }
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

      {/* =================================================
          HOME / AWAY BREAKDOWN
      ================================================= */}

      <div
        style={{
          marginTop: 25,
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
          BIGGEST RESULTS
      ================================================= */}

      {(statistics.biggestWin ||
        statistics.biggestLoss) && (
        <div
          style={{
            marginTop: 25,
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            border:
              "1px solid #293548",
          }}
        >
          <h3
            style={{
              margin:
                "0 0 18px",
              color: "#fff",
            }}
          >
            🏅 Biggest Results
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: 15,
            }}
          >
            <Stat
              label="Biggest Win"
              value={
                statistics
                  .biggestWin
                  ?.score ||
                "N/A"
              }
            />

            <Stat
              label="Biggest Loss"
              value={
                statistics
                  .biggestLoss
                  ?.score ||
                "N/A"
              }
            />
          </div>
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <div
        style={{
          marginTop: 25,
          background: "#1f2937",
          borderRadius: 16,
          padding: 20,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            margin:
              "0 0 15px",
            color: "#fff",
          }}
        >
          📋 Recent Form
        </h3>

        {form ? (
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
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
          <div
            style={{
              color:
                "#94a3b8",
              fontSize: 14,
            }}
          >
            Form data unavailable.
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
CARD
===================================================== */

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 20,
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
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
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
          fontSize: 19,
        }}
      >
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
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
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
          textAlign: "right",
        }}
      >
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
    config[result] ||
    {
      background: "#374151",
      color: "#cbd5e1",
      label: result,
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
        color: current.color,
        fontWeight: 900,
      }}
    >
      {current.label}
    </div>
  );
}