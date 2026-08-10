"use client";

export default function LeagueStatistics({
  statistics = {},
}) {
  if (
    !statistics ||
    Object.keys(statistics).length === 0
  ) {
    return (
      <section
        className="league-statistics"
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          className="league-statistics-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          📊 League Statistics
        </h2>

        <p
          className="league-statistics-empty"
          style={{
            color: "#94a3b8",
          }}
        >
          League statistics are unavailable.
        </p>
      </section>
    );
  }

  const {
    matches = 0,
    goals = 0,
    homeWins = 0,
    awayWins = 0,
    draws = 0,
    yellowCards = 0,
    redCards = 0,
    penalties = 0,
    cleanSheets = 0,
    avgGoals = 0,
  } = statistics;

  const totalResults =
    homeWins +
    awayWins +
    draws;

  const homePercent =
    totalResults > 0
      ? Math.round(
          (homeWins /
            totalResults) *
            100
        )
      : 0;

  const drawPercent =
    totalResults > 0
      ? Math.round(
          (draws /
            totalResults) *
            100
        )
      : 0;

  const awayPercent =
    totalResults > 0
      ? Math.round(
          (awayWins /
            totalResults) *
            100
        )
      : 0;

  return (
    <section
      className="league-statistics"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        className="league-statistics-title"
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        📊 League Statistics
      </h2>

      {/* Summary Cards */}

      <div
        className="league-statistics-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Matches"
          value={matches}
        />

        <Card
          title="Goals"
          value={goals}
        />

        <Card
          title="Avg Goals"
          value={avgGoals}
        />

        <Card
          title="Clean Sheets"
          value={cleanSheets}
        />
      </div>

      {/* Match Results */}

      <div
        className="league-outcomes"
        style={{
          marginBottom: 40,
        }}
      >
        <h3
          className="league-outcomes-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          Match Outcomes
        </h3>

        <Bar
          label="Home Wins"
          value={homePercent}
          color="#22c55e"
        />

        <Bar
          label="Draws"
          value={drawPercent}
          color="#eab308"
        />

        <Bar
          label="Away Wins"
          value={awayPercent}
          color="#3b82f6"
        />
      </div>

      {/* Discipline */}

      <div
        className="league-discipline-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
        }}
      >
        <Card
          title="Yellow Cards"
          value={yellowCards}
        />

        <Card
          title="Red Cards"
          value={redCards}
        />

        <Card
          title="Penalties"
          value={penalties}
        />
      </div>
    </section>
  );
}

/* ====================================== */

function Card({
  title,
  value,
}) {
  return (
    <div
      className="league-stat-card"
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign: "center",
      }}
    >
      <div
        className="league-stat-card-title"
        style={{
          color: "#94a3b8",
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        className="league-stat-card-value"
        style={{
          color: "#fff",
          fontSize: 34,
          fontWeight: "bold",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ====================================== */

function Bar({
  label,
  value,
  color,
}) {
  return (
    <div
      className="league-stat-bar"
      style={{
        marginBottom: 20,
      }}
    >
      <div
        className="league-stat-bar-header"
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          color: "#fff",
          marginBottom: 8,
        }}
      >
        <span>{label}</span>

        <span>{value}%</span>
      </div>

      <div
        className="league-stat-bar-track"
        style={{
          background: "#374151",
          height: 14,
          borderRadius: 999,
        }}
      >
        <div
          className="league-stat-bar-fill"
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 999,
            background: color,
            transition:
              "width .8s ease",
          }}
        />
      </div>
    </div>
  );
}