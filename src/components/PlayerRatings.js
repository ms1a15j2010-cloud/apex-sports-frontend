"use client";

export default function PlayerRatings({
  player = null,
  statistics = [],
}) {
  if (!player) {
    return null;
  }

  const stat =
    Array.isArray(statistics) &&
    statistics.length > 0
      ? statistics[0]
      : player.statistics?.[0] || {};

  const games =
    stat.games || {};

  const goals =
    stat.goals || {};

  const shots =
    stat.shots || {};

  const passes =
    stat.passes || {};

  const tackles =
    stat.tackles || {};

  const duels =
    stat.duels || {};

  const dribbles =
    stat.dribbles || {};

  const fouls =
    stat.fouls || {};

  const cards =
    stat.cards || {};

  const penalty =
    stat.penalty || {};

  const rating =
    Number(games.rating || 0);

  const appearances =
    Number(
      games.appearances ??
        games.appearences ??
        0
    );

  const minutes =
    Number(
      games.minutes || 0
    );

  const goalsScored =
    Number(
      goals.total || 0
    );

  const assists =
    Number(
      goals.assists || 0
    );

  const shotsTotal =
    Number(
      shots.total || 0
    );

  const shotsOnTarget =
    Number(
      shots.on || 0
    );

  const passesTotal =
    Number(
      passes.total || 0
    );

  const keyPasses =
    Number(
      passes.key || 0
    );

  const tacklesTotal =
    Number(
      tackles.total || 0
    );

  const duelsTotal =
    Number(
      duels.total || 0
    );

  const duelsWon =
    Number(
      duels.won || 0
    );

  const dribbleAttempts =
    Number(
      dribbles.attempts || 0
    );

  const dribbleSuccess =
    Number(
      dribbles.success || 0
    );

  const yellowCards =
    Number(
      cards.yellow || 0
    );

  const redCards =
    Number(
      cards.red || 0
    );

  const foulsCommitted =
    Number(
      fouls.committed || 0
    );

  const foulsDrawn =
    Number(
      fouls.drawn || 0
    );

  const ratingProgress =
    Math.min(
      Math.max(
        (rating / 10) * 100,
        0
      ),
      100
    );

  const shotAccuracy =
    shotsTotal > 0
      ? Math.round(
          (shotsOnTarget /
            shotsTotal) *
            100
        )
      : 0;

  const duelWinRate =
    duelsTotal > 0
      ? Math.round(
          (duelsWon /
            duelsTotal) *
            100
        )
      : 0;

  const dribbleRate =
    dribbleAttempts > 0
      ? Math.round(
          (dribbleSuccess /
            dribbleAttempts) *
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
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        <div>
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
              fontWeight: 800,
            }}
          >
            ⭐ Player Ratings
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin:
                "8px 0 0",
              fontSize: 14,
            }}
          >
            Current performance rating
            and player efficiency.
          </p>
        </div>

        <div
          style={{
            padding:
              "10px 16px",
            borderRadius: 999,
            background:
              "rgba(34,197,94,.12)",
            color: "#22c55e",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {stat.league?.name ||
            "Premier League"}
        </div>
      </div>

      {/* =================================================
          PLAYER SUMMARY
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 22,
          marginBottom: 25,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: 25,
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
            Player
          </div>

          <h3
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 22,
            }}
          >
            {player.name ||
              "Unknown Player"}
          </h3>

          <div
            style={{
              color: "#64748b",
              marginTop: 6,
              fontSize: 13,
            }}
          >
            {player.team?.name ||
              stat.team?.name ||
              "Unknown Team"}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            minWidth: 120,
          }}
        >
          <div
            style={{
              color:
                getRatingColor(
                  rating
                ),
              fontSize: 34,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            {rating
              ? rating.toFixed(1)
              : "-"}
          </div>

          <div
            style={{
              color: "#facc15",
              fontSize: 18,
              marginTop: 7,
              letterSpacing: 2,
            }}
          >
            {getStars(rating)}
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: 12,
              marginTop: 5,
            }}
          >
            Rating
          </div>
        </div>
      </div>

      {/* =================================================
          RATING BAR
      ================================================= */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: 8,
            color: "#cbd5e1",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <span>
            Overall Rating
          </span>

          <span>
            {rating
              ? `${rating.toFixed(1)}/10`
              : "Not available"}
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: 12,
            background: "#374151",
            borderRadius: 999,
            overflow:
              "hidden",
          }}
        >
          <div
            style={{
              width:
                `${ratingProgress}%`,
              height: "100%",
              background:
                getRatingColor(
                  rating
                ),
              borderRadius: 999,
              transition:
                "width .8s ease",
            }}
          />
        </div>
      </div>

      {/* =================================================
          CORE RATINGS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <RatingCard
          title="Appearances"
          value={appearances}
          color="#3b82f6"
        />

        <RatingCard
          title="Minutes"
          value={minutes}
          color="#8b5cf6"
        />

        <RatingCard
          title="Goals"
          value={goalsScored}
          color="#22c55e"
        />

        <RatingCard
          title="Assists"
          value={assists}
          color="#f59e0b"
        />
      </div>

      {/* =================================================
          ATTACKING
      ================================================= */}

      <SectionTitle title="Attacking" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard
          title="Goals"
          value={goalsScored}
        />

        <StatCard
          title="Assists"
          value={assists}
        />

        <StatCard
          title="Shots"
          value={shotsTotal}
        />

        <StatCard
          title="Shots On Target"
          value={shotsOnTarget}
        />

        <StatCard
          title="Shot Accuracy"
          value={
            shotsTotal > 0
              ? `${shotAccuracy}%`
              : "-"
          }
        />

        <StatCard
          title="Dribble Attempts"
          value={dribbleAttempts}
        />

        <StatCard
          title="Dribbles Won"
          value={dribbleSuccess}
        />

        <StatCard
          title="Dribble Success"
          value={
            dribbleAttempts > 0
              ? `${dribbleRate}%`
              : "-"
          }
        />
      </div>

      {/* =================================================
          PASSING
      ================================================= */}

      <SectionTitle title="Passing" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard
          title="Total Passes"
          value={passesTotal}
        />

        <StatCard
          title="Key Passes"
          value={keyPasses}
        />

        <StatCard
          title="Pass Accuracy"
          value={
            passes.accuracy
              ? `${passes.accuracy}%`
              : "-"
          }
        />
      </div>

      {/* =================================================
          DEFENDING
      ================================================= */}

      <SectionTitle title="Defending" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard
          title="Tackles"
          value={tacklesTotal}
        />

        <StatCard
          title="Duels"
          value={duelsTotal}
        />

        <StatCard
          title="Duels Won"
          value={duelsWon}
        />

        <StatCard
          title="Duel Win Rate"
          value={
            duelsTotal > 0
              ? `${duelWinRate}%`
              : "-"
          }
        />

        <StatCard
          title="Fouls Drawn"
          value={foulsDrawn}
        />

        <StatCard
          title="Fouls Committed"
          value={foulsCommitted}
        />
      </div>

      {/* =================================================
          DISCIPLINE
      ================================================= */}

      <SectionTitle title="Discipline" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard
          title="🟨 Yellow Cards"
          value={yellowCards}
        />

        <StatCard
          title="🟥 Red Cards"
          value={redCards}
        />
      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div
        style={{
          marginTop: 10,
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
          Rating Summary
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {player.name ||
            "This player"}{" "}
          has a current rating of{" "}
          <strong
            style={{
              color:
                getRatingColor(
                  rating
                ),
            }}
          >
            {rating
              ? rating.toFixed(1)
              : "N/A"}
          </strong>
          . During the current season,
          the player has made{" "}
          <strong>
            {appearances}
          </strong>{" "}
          appearances, scored{" "}
          <strong>
            {goalsScored}
          </strong>{" "}
          goals and provided{" "}
          <strong>
            {assists}
          </strong>{" "}
          assists.
        </p>
      </div>
    </section>
  );
}

/* =====================================================
SECTION TITLE
===================================================== */

function SectionTitle({
  title,
}) {
  return (
    <h3
      style={{
        color: "#22c55e",
        margin:
          "10px 0 16px",
        fontSize: 19,
      }}
    >
      {title}
    </h3>
  );
}

/* =====================================================
RATING CARD
===================================================== */

function RatingCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 20,
        textAlign: "center",
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 9,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =====================================================
STAT CARD
===================================================== */

function StatCard({
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
          fontSize: 19,
          fontWeight: 800,
        }}
      >
        {value ?? 0}
      </strong>
    </div>
  );
}

/* =====================================================
STARS
===================================================== */

function getStars(
  rating
) {
  if (!rating) {
    return "☆☆☆☆☆";
  }

  if (rating >= 9) {
    return "★★★★★";
  }

  if (rating >= 8) {
    return "★★★★☆";
  }

  if (rating >= 7) {
    return "★★★☆☆";
  }

  if (rating >= 6) {
    return "★★☆☆☆";
  }

  return "★☆☆☆☆";
}

/* =====================================================
RATING COLOR
===================================================== */

function getRatingColor(
  rating
) {
  if (!rating) {
    return "#64748b";
  }

  if (rating >= 8.5) {
    return "#22c55e";
  }

  if (rating >= 7) {
    return "#84cc16";
  }

  if (rating >= 6) {
    return "#facc15";
  }

  if (rating >= 5) {
    return "#f97316";
  }

  return "#ef4444";
}