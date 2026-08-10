"use client";

export default function MatchScoreboard({
  match,
  statistics = [],
}) {
  if (!match) return null;

  const home = match.teams?.home || {};
  const away = match.teams?.away || {};
  const goals = match.goals || {};

  const homeStats = statistics[0] || {};
  const awayStats = statistics[1] || {};

  function statValue(team, type) {
    const stat =
      team.statistics?.find(
        (s) => s.type === type
      );

    return stat?.value ?? 0;
  }

  const possessionHome =
    statValue(
      homeStats,
      "Ball Possession"
    ) || 0;

  const possessionAway =
    statValue(
      awayStats,
      "Ball Possession"
    ) || 0;

  const shotsHome =
    statValue(
      homeStats,
      "Total Shots"
    );

  const shotsAway =
    statValue(
      awayStats,
      "Total Shots"
    );

  const shotsTargetHome =
    statValue(
      homeStats,
      "Shots on Goal"
    );

  const shotsTargetAway =
    statValue(
      awayStats,
      "Shots on Goal"
    );

  const cornersHome =
    statValue(
      homeStats,
      "Corner Kicks"
    );

  const cornersAway =
    statValue(
      awayStats,
      "Corner Kicks"
    );

  const foulsHome =
    statValue(
      homeStats,
      "Fouls"
    );

  const foulsAway =
    statValue(
      awayStats,
      "Fouls"
    );

  const yellowHome =
    statValue(
      homeStats,
      "Yellow Cards"
    );

  const yellowAway =
    statValue(
      awayStats,
      "Yellow Cards"
    );

  const redHome =
    statValue(
      homeStats,
      "Red Cards"
    );

  const redAway =
    statValue(
      awayStats,
      "Red Cards"
    );

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
        📊 Match Scoreboard
      </h2>

      {/* SCORE */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#fff",
            }}
          >
            {home.name}
          </h3>
        </div>

        <div
          style={{
            fontSize: 50,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {goals.home ?? 0}
          {" : "}
          {goals.away ?? 0}
        </div>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#fff",
            }}
          >
            {away.name}
          </h3>
        </div>
      </div>

      {/* POSSESSION */}

      <StatBar
        title="Ball Possession"
        left={possessionHome}
        right={possessionAway}
        leftLabel="%"
        rightLabel="%"
        leftColor="#22c55e"
        rightColor="#ef4444"
      />

      <StatRow
        title="Shots"
        left={shotsHome}
        right={shotsAway}
      />

      <StatRow
        title="Shots on Target"
        left={shotsTargetHome}
        right={shotsTargetAway}
      />

      <StatRow
        title="Corner Kicks"
        left={cornersHome}
        right={cornersAway}
      />

      <StatRow
        title="Fouls"
        left={foulsHome}
        right={foulsAway}
      />

      <StatRow
        title="Yellow Cards"
        left={yellowHome}
        right={yellowAway}
      />

      <StatRow
        title="Red Cards"
        left={redHome}
        right={redAway}
      />
    </section>
  );
}

function StatRow({
  title,
  left,
  right,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "70px 1fr 70px",
        alignItems: "center",
        marginBottom: 18,
        gap: 15,
      }}
    >
      <div
        style={{
          color: "#22c55e",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {left}
      </div>

      <div
        style={{
          background: "#1f2937",
          borderRadius: 12,
          padding: 14,
          textAlign: "center",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#ef4444",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {right}
      </div>
    </div>
  );
}

function StatBar({
  title,
  left,
  right,
  leftColor,
  rightColor,
  leftLabel,
  rightLabel,
}) {
  return (
    <div
      style={{
        marginBottom: 35,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          color: "#fff",
          marginBottom: 10,
        }}
      >
        <span>
          {left}
          {leftLabel}
        </span>

        <strong>{title}</strong>

        <span>
          {right}
          {rightLabel}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          height: 16,
          borderRadius: 50,
          overflow: "hidden",
          background: "#374151",
        }}
      >
        <div
          style={{
            width: `${left}%`,
            background: leftColor,
          }}
        />

        <div
          style={{
            width: `${right}%`,
            background: rightColor,
          }}
        />
      </div>
    </div>
  );
}