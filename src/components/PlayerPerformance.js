"use client";

export default function PlayerPerformance({
  statistics = [],
}) {
  if (
    !Array.isArray(statistics) ||
    statistics.length === 0
  ) {
    return null;
  }

  /*
    The new football-data.org adapter returns
    an array of competition/team statistics.

    For the current Premier League player page,
    the first entry is the main statistics block.
  */

  const stat =
    statistics[0] || {};

  const games =
    stat.games || {};

  const goals =
    stat.goals || {};

  const passes =
    stat.passes || {};

  const shots =
    stat.shots || {};

  const tackles =
    stat.tackles || {};

  const dribbles =
    stat.dribbles || {};

  const duels =
    stat.duels || {};

  const fouls =
    stat.fouls || {};

  const cards =
    stat.cards || {};

  /* =================================================
     VALUES
  ================================================= */

  const appearances =
    Number(
      games.appearances ??
        games.appearences ??
        0
    );

  const goalsScored =
    Number(
      goals.total ?? 0
    );

  const assists =
    Number(
      goals.assists ?? 0
    );

  /*
    football-data.org may not provide all of the old
    API-Football advanced metrics.

    Therefore missing values safely become 0 / "-".
  */

  const passAccuracy =
    Number(
      passes.accuracy ?? 0
    );

  const shotsTotal =
    Number(
      shots.total ?? 0
    );

  const shotsOnTarget =
    Number(
      shots.on ?? 0
    );

  const tacklesTotal =
    Number(
      tackles.total ?? 0
    );

  const dribbleSuccess =
    Number(
      dribbles.success ?? 0
    );

  const duelsWon =
    Number(
      duels.won ?? 0
    );

  const yellow =
    Number(
      cards.yellow ?? 0
    );

  const red =
    Number(
      cards.red ?? 0
    );

  const foulsDrawn =
    Number(
      fouls.drawn ?? 0
    );

  const foulsCommitted =
    Number(
      fouls.committed ?? 0
    );

  const rating =
    parseFloat(
      games.rating || 0
    );

  /* =================================================
     DISPLAY HELPERS
  ================================================= */

  const getRatingColor = (
    value
  ) => {
    if (!value) {
      return "#94a3b8";
    }

    if (value >= 8) {
      return "#22c55e";
    }

    if (value >= 6.5) {
      return "#eab308";
    }

    return "#ef4444";
  };

  const getRatingStars = (
    value
  ) => {
    if (value >= 9) {
      return "★★★★★";
    }

    if (value >= 8) {
      return "★★★★☆";
    }

    if (value >= 7) {
      return "★★★☆☆";
    }

    if (value >= 6) {
      return "★★☆☆☆";
    }

    if (value > 0) {
      return "★☆☆☆☆";
    }

    return "☆☆☆☆☆";
  };

  /*
    Progress bars are illustrative for counting
    statistics rather than pretending that 8 tackles
    means an 80% success rate.
  */

  const shotProgress =
    shotsTotal > 0
      ? Math.min(
          (shotsOnTarget /
            shotsTotal) *
            100,
          100
        )
      : 0;

  const duelProgress =
    duelsWon > 0
      ? Math.min(
          duelsWon * 10,
          100
        )
      : 0;

  const dribbleProgress =
    dribbleSuccess > 0
      ? Math.min(
          dribbleSuccess * 10,
          100
        )
      : 0;

  return (
    <section
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
            letterSpacing:
              "1.2px",
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
            fontSize: 26,
          }}
        >
          📈 Player Performance
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Season performance overview
          based on the available
          football-data.org statistics.
        </p>
      </div>

      {/* =================================================
          OVERALL
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 15,
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

      {/* =================================================
          RATING
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 16,
          padding: 20,
          marginBottom: 30,
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            Current Rating
          </div>

          <div
            style={{
              color:
                getRatingColor(
                  rating
                ),
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            {rating
              ? rating.toFixed(2)
              : "-"}
          </div>
        </div>

        <div
          style={{
            color: "#facc15",
            fontSize: 20,
            letterSpacing: 2,
          }}
        >
          {getRatingStars(
            rating
          )}
        </div>
      </div>

      {/* =================================================
          PROGRESS BARS
      ================================================= */}

      <ProgressBar
        title="Passing Accuracy"
        value={Math.max(
          0,
          Math.min(
            passAccuracy,
            100
          )
        )}
        display={
          passAccuracy
            ? `${passAccuracy}%`
            : "-"
        }
        color="#22c55e"
      />

      <ProgressBar
        title="Shots On Target"
        value={shotProgress}
        display={`${shotsOnTarget} / ${shotsTotal}`}
        color="#10b981"
      />

      <ProgressBar
        title="Dribble Success"
        value={dribbleProgress}
        display={dribbleSuccess}
        color="#3b82f6"
      />

      <ProgressBar
        title="Duels Won"
        value={duelProgress}
        display={duelsWon}
        color="#8b5cf6"
      />

      {/* =================================================
          PERFORMANCE DETAILS
      ================================================= */}

      <div
        style={{
          marginTop: 35,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          Performance Details
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(170px,1fr))",
            gap: 14,
          }}
        >
          <PerformanceStat
            title="Shots"
            value={shotsTotal}
          />

          <PerformanceStat
            title="Shots On Target"
            value={shotsOnTarget}
          />

          <PerformanceStat
            title="Tackles"
            value={tacklesTotal}
          />

          <PerformanceStat
            title="Dribbles Won"
            value={dribbleSuccess}
          />

          <PerformanceStat
            title="Duels Won"
            value={duelsWon}
          />

          <PerformanceStat
            title="Fouls Drawn"
            value={foulsDrawn}
          />

          <PerformanceStat
            title="Fouls Committed"
            value={foulsCommitted}
          />
        </div>
      </div>

      {/* =================================================
          DISCIPLINE
      ================================================= */}

      <div
        style={{
          marginTop: 40,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          Discipline
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: 15,
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
            value={foulsDrawn}
            color="#0ea5e9"
          />

          <PerformanceCard
            title="Fouls Committed"
            value={
              foulsCommitted
            }
            color="#dc2626"
          />
        </div>
      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

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
          The player has made{" "}
          <strong>
            {appearances}
          </strong>{" "}
          appearances and scored{" "}
          <strong>
            {goalsScored}
          </strong>{" "}
          goals with{" "}
          <strong>
            {assists}
          </strong>{" "}
          assists. They have recorded{" "}
          <strong>
            {shotsTotal}
          </strong>{" "}
          shots, including{" "}
          <strong>
            {shotsOnTarget}
          </strong>{" "}
          on target, and contributed{" "}
          <strong>
            {tacklesTotal}
          </strong>{" "}
          tackles and{" "}
          <strong>
            {duelsWon}
          </strong>{" "}
          successful duels.
        </p>
      </div>
    </section>
  );
}

/* =====================================================
PERFORMANCE CARD
===================================================== */

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
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =====================================================
PERFORMANCE STAT
===================================================== */

function PerformanceStat({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        border:
          "1px solid #1e293b",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginBottom: 7,
        }}
      >
        {title}
      </div>

      <strong
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        {value ?? 0}
      </strong>
    </div>
  );
}

/* =====================================================
PROGRESS BAR
===================================================== */

function ProgressBar({
  title,
  value,
  display,
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
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 15,
          color: "#fff",
          marginBottom: 8,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        <span>{title}</span>

        <span
          style={{
            color: "#94a3b8",
          }}
        >
          {display ??
            `${Math.round(
              safeValue
            )}%`}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 12,
          background: "#374151",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width:
              `${safeValue}%`,
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