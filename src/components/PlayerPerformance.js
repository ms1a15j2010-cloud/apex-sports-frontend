"use client";

export default function PlayerPerformance({
  statistics = {},
}) {
  if (!statistics) return null;

  const {
    games = {},
    goals = {},
    passes = {},
    shots = {},
    tackles = {},
    dribbles = {},
    duels = {},
    fouls = {},
    cards = {},
  } = statistics;

  const appearances =
    games.appearences || 0;

  const goalsScored =
    goals.total || 0;

  const assists =
    goals.assists || 0;

  const passAccuracy =
    Number(passes.accuracy) || 0;

  const shotsOn =
    shots.on || 0;

  const tacklesWon =
    tackles.total || 0;

  const dribbleSuccess =
    dribbles.success || 0;

  const duelsWon =
    duels.won || 0;

  const yellow =
    cards.yellow || 0;

  const red =
    cards.red || 0;

  const rating =
    parseFloat(games.rating || 0);

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
        📈 Player Performance
      </h2>

      {/* Overall */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <PerformanceCard
          title="Rating"
          value={
            rating
              ? rating.toFixed(2)
              : "-"
          }
          color="#22c55e"
        />

        <PerformanceCard
          title="Appearances"
          value={appearances}
          color="#3b82f6"
        />

        <PerformanceCard
          title="Goals"
          value={goalsScored}
          color="#10b981"
        />

        <PerformanceCard
          title="Assists"
          value={assists}
          color="#f59e0b"
        />
      </div>

      {/* Progress Bars */}

      <ProgressBar
        title="Passing Accuracy"
        value={passAccuracy}
        color="#22c55e"
      />

      <ProgressBar
        title="Dribble Success"
        value={Math.min(
          dribbleSuccess * 10,
          100
        )}
        display={dribbleSuccess}
        color="#3b82f6"
      />

      <ProgressBar
        title="Shots On Target"
        value={Math.min(
          shotsOn * 10,
          100
        )}
        display={shotsOn}
        color="#10b981"
      />

      <ProgressBar
        title="Tackles"
        value={Math.min(
          tacklesWon * 8,
          100
        )}
        display={tacklesWon}
        color="#f97316"
      />

      <ProgressBar
        title="Duels Won"
        value={Math.min(
          duelsWon * 6,
          100
        )}
        display={duelsWon}
        color="#8b5cf6"
      />

      {/* Discipline */}

      <div
        style={{
          marginTop: 40,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          Discipline
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          <PerformanceCard
            title="Yellow Cards"
            value={yellow}
            color="#facc15"
          />

          <PerformanceCard
            title="Red Cards"
            value={red}
            color="#ef4444"
          />

          <PerformanceCard
            title="Fouls Drawn"
            value={
              fouls.drawn || 0
            }
            color="#0ea5e9"
          />

          <PerformanceCard
            title="Fouls Committed"
            value={
              fouls.committed ||
              0
            }
            color="#dc2626"
          />
        </div>
      </div>

      {/* Summary */}

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
          Performance Summary
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          This player has played{" "}
          <strong>
            {appearances}
          </strong>{" "}
          matches, scoring{" "}
          <strong>
            {goalsScored}
          </strong>{" "}
          goals and providing{" "}
          <strong>
            {assists}
          </strong>{" "}
          assists. Passing
          accuracy stands at{" "}
          <strong>
            {passAccuracy}%
          </strong>
          , while contributing{" "}
          <strong>
            {tacklesWon}
          </strong>{" "}
          tackles and{" "}
          <strong>
            {duelsWon}
          </strong>{" "}
          successful duels during
          the season.
        </p>
      </div>
    </section>
  );
}

function PerformanceCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign: "center",
        border: `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ProgressBar({
  title,
  value,
  display,
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
          justifyContent:
            "space-between",
          color: "#fff",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        <span>{title}</span>

        <span>
          {display !== undefined
            ? display
            : `${Math.round(value)}%`}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 14,
          background: "#374151",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.max(
              0,
              Math.min(value, 100)
            )}%`,
            height: "100%",
            background: color,
            borderRadius: 50,
            transition:
              "width .8s ease",
          }}
        />
      </div>
    </div>
  );
}