"use client";

export default function PlayerCareer({
  statistics = [],
}) {
  if (
    !Array.isArray(statistics) ||
    statistics.length === 0
  ) {
    return null;
  }

  /*
    The backend now returns:

    statistics = [
      {
        league,
        team,
        games,
        goals,
        passes,
        shots,
        tackles,
        duels,
        dribbles,
        fouls,
        cards,
        penalty
      }
    ]
  */

  const stat =
    statistics[0] || {};

  const league =
    stat.league || {};

  const team =
    stat.team || {};

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

  /* =================================================
     SAFE VALUES
  ================================================= */

  const appearances =
    Number(
      games.appearances ??
        games.appearences ??
        0
    );

  const starts =
    Number(
      games.lineups ?? 0
    );

  const minutes =
    Number(
      games.minutes ?? 0
    );

  const goalsScored =
    Number(
      goals.total ?? 0
    );

  const assists =
    Number(
      goals.assists ?? 0
    );

  const conceded =
    Number(
      goals.conceded ?? 0
    );

  const saves =
    Number(
      goals.saves ?? 0
    );

  const totalPasses =
    Number(
      passes.total ?? 0
    );

  const keyPasses =
    Number(
      passes.key ?? 0
    );

  const totalShots =
    Number(
      shots.total ?? 0
    );

  const shotsOnTarget =
    Number(
      shots.on ?? 0
    );

  const totalTackles =
    Number(
      tackles.total ?? 0
    );

  const blocks =
    Number(
      tackles.blocks ?? 0
    );

  const interceptions =
    Number(
      tackles.interceptions ?? 0
    );

  const totalDuels =
    Number(
      duels.total ?? 0
    );

  const duelsWon =
    Number(
      duels.won ?? 0
    );

  const dribbleAttempts =
    Number(
      dribbles.attempts ?? 0
    );

  const dribbleSuccess =
    Number(
      dribbles.success ?? 0
    );

  const dribblesPast =
    Number(
      dribbles.past ?? 0
    );

  const foulsDrawn =
    Number(
      fouls.drawn ?? 0
    );

  const foulsCommitted =
    Number(
      fouls.committed ?? 0
    );

  const yellowCards =
    Number(
      cards.yellow ?? 0
    );

  const yellowRedCards =
    Number(
      cards.yellowred ?? 0
    );

  const redCards =
    Number(
      cards.red ?? 0
    );

  const penaltyScored =
    Number(
      penalty.scored ?? 0
    );

  const penaltyMissed =
    Number(
      penalty.missed ?? 0
    );

  const penaltyWon =
    Number(
      penalty.won ?? 0
    );

  const penaltyCommitted =
    Number(
      penalty.committed ??
        penalty.commited ??
        0
    );

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
          📈 Career Statistics
        </h2>

        <p
          style={{
            margin:
              "8px 0 0",
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          {league.name ||
            "Premier League"}
          {" • "}
          Season{" "}
          {league.season || ""}
        </p>
      </div>

      {/* =================================================
          TEAM / LEAGUE
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 16,
          padding: 18,
          marginBottom: 35,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
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
            Competition
          </div>

          <strong
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            {league.name ||
              "Premier League"}
          </strong>
        </div>

        <div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            Club
          </div>

          <strong
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            {team.name ||
              "Unknown Team"}
          </strong>
        </div>

        <div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            Position
          </div>

          <strong
            style={{
              color: "#22c55e",
              fontSize: 18,
            }}
          >
            {games.position ||
              "Football Player"}
          </strong>
        </div>
      </div>

      {/* =================================================
          MATCH STATISTICS
      ================================================= */}

      <SectionTitle
        title="Match Statistics"
      />

      <StatGrid>
        <Card
          title="Appearances"
          value={appearances}
        />

        <Card
          title="Starts"
          value={starts}
        />

        <Card
          title="Minutes"
          value={minutes}
        />

        <Card
          title="Rating"
          value={
            games.rating || "-"
          }
        />
      </StatGrid>

      {/* =================================================
          GOAL CONTRIBUTION
      ================================================= */}

      <SectionTitle
        title="Goal Contribution"
      />

      <StatGrid>
        <Card
          title="Goals"
          value={goalsScored}
          highlight
        />

        <Card
          title="Assists"
          value={assists}
        />

        <Card
          title="Conceded"
          value={conceded}
        />

        <Card
          title="Saves"
          value={saves}
        />
      </StatGrid>

      {/* =================================================
          PASSING
      ================================================= */}

      <SectionTitle
        title="Passing"
      />

      <StatGrid>
        <Card
          title="Total Passes"
          value={totalPasses}
        />

        <Card
          title="Key Passes"
          value={keyPasses}
        />

        <Card
          title="Accuracy"
          value={
            passes.accuracy
              ? `${passes.accuracy}%`
              : "-"
          }
        />
      </StatGrid>

      {/* =================================================
          SHOOTING
      ================================================= */}

      <SectionTitle
        title="Shooting"
      />

      <StatGrid>
        <Card
          title="Total Shots"
          value={totalShots}
        />

        <Card
          title="On Target"
          value={shotsOnTarget}
        />

        <Card
          title="Target Accuracy"
          value={
            totalShots > 0
              ? `${Math.round(
                  (
                    shotsOnTarget /
                    totalShots
                  ) *
                    100
                )}%`
              : "-"
          }
        />
      </StatGrid>

      {/* =================================================
          DEFENSIVE ACTIONS
      ================================================= */}

      <SectionTitle
        title="Defensive Actions"
      />

      <StatGrid>
        <Card
          title="Tackles"
          value={totalTackles}
        />

        <Card
          title="Blocks"
          value={blocks}
        />

        <Card
          title="Interceptions"
          value={interceptions}
        />
      </StatGrid>

      {/* =================================================
          DUELS
      ================================================= */}

      <SectionTitle
        title="Duels"
      />

      <StatGrid>
        <Card
          title="Total"
          value={totalDuels}
        />

        <Card
          title="Won"
          value={duelsWon}
        />

        <Card
          title="Win Rate"
          value={
            totalDuels > 0
              ? `${Math.round(
                  (
                    duelsWon /
                    totalDuels
                  ) *
                    100
                )}%`
              : "-"
          }
        />
      </StatGrid>

      {/* =================================================
          DRIBBLES
      ================================================= */}

      <SectionTitle
        title="Dribbles"
      />

      <StatGrid>
        <Card
          title="Attempts"
          value={
            dribbleAttempts
          }
        />

        <Card
          title="Success"
          value={
            dribbleSuccess
          }
        />

        <Card
          title="Past"
          value={
            dribblesPast
          }
        />
      </StatGrid>

      {/* =================================================
          DISCIPLINE
      ================================================= */}

      <SectionTitle
        title="Discipline"
      />

      <StatGrid>
        <Card
          title="Fouls Drawn"
          value={
            foulsDrawn
          }
        />

        <Card
          title="Fouls Committed"
          value={
            foulsCommitted
          }
        />

        <Card
          title="🟨 Yellow Cards"
          value={
            yellowCards
          }
        />

        <Card
          title="🟨🟥 Yellow-Red"
          value={
            yellowRedCards
          }
        />

        <Card
          title="🟥 Red Cards"
          value={
            redCards
          }
        />
      </StatGrid>

      {/* =================================================
          PENALTIES
      ================================================= */}

      <SectionTitle
        title="Penalty Statistics"
      />

      <StatGrid>
        <Card
          title="Scored"
          value={
            penaltyScored
          }
        />

        <Card
          title="Missed"
          value={
            penaltyMissed
          }
        />

        <Card
          title="Won"
          value={
            penaltyWon
          }
        />

        <Card
          title="Committed"
          value={
            penaltyCommitted
          }
        />
      </StatGrid>

      {/* =================================================
          CAREER SUMMARY
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
          Career Summary
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          This player has made{" "}
          <strong>
            {appearances}
          </strong>{" "}
          appearances and{" "}
          <strong>
            {starts}
          </strong>{" "}
          starts, playing{" "}
          <strong>
            {minutes}
          </strong>{" "}
          minutes. They have scored{" "}
          <strong>
            {goalsScored}
          </strong>{" "}
          goals and provided{" "}
          <strong>
            {assists}
          </strong>{" "}
          assists.
          {totalShots > 0
            ? ` They have recorded ${totalShots} shots, with ${shotsOnTarget} on target.`
            : ""}
          {totalTackles > 0
            ? ` Defensively, they have made ${totalTackles} tackles and ${interceptions} interceptions.`
            : ""}
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
        marginBottom: 18,
        marginTop: 10,
        fontSize: 19,
      }}
    >
      {title}
    </h3>
  );
}

/* =====================================================
STAT GRID
===================================================== */

function StatGrid({
  children,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(180px,1fr))",
        gap: 15,
        marginBottom: 35,
      }}
    >
      {children}
    </div>
  );
}

/* =====================================================
CARD
===================================================== */

function Card({
  title,
  value,
  highlight = false,
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
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: highlight
            ? "#22c55e"
            : "#fff",
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        {value ?? 0}
      </div>
    </div>
  );
}