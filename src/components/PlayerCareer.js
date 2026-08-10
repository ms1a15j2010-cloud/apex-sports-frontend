"use client";

export default function PlayerCareer({
  statistics = {},
}) {
  if (!statistics) return null;

  const {
    games = {},
    goals = {},
    passes = {},
    shots = {},
    tackles = {},
    duels = {},
    dribbles = {},
    fouls = {},
    cards = {},
    penalty = {},
  } = statistics;

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
          marginBottom: 28,
        }}
      >
        📈 Career Statistics
      </h2>

      {/* Match Statistics */}

      <SectionTitle title="Match Statistics" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Appearances"
          value={games.appearences || 0}
        />

        <Card
          title="Starts"
          value={games.lineups || 0}
        />

        <Card
          title="Minutes"
          value={games.minutes || 0}
        />

        <Card
          title="Rating"
          value={games.rating || "-"}
        />

        <Card
          title="Captain"
          value={games.captain ? "Yes" : "No"}
        />
      </div>

      {/* Goals */}

      <SectionTitle title="Goal Contribution" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Goals"
          value={goals.total || 0}
        />

        <Card
          title="Assists"
          value={goals.assists || 0}
        />

        <Card
          title="Conceded"
          value={goals.conceded || 0}
        />

        <Card
          title="Saves"
          value={goals.saves || 0}
        />
      </div>

      {/* Passing */}

      <SectionTitle title="Passing" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Total Passes"
          value={passes.total || 0}
        />

        <Card
          title="Key Passes"
          value={passes.key || 0}
        />

        <Card
          title="Accuracy"
          value={
            passes.accuracy
              ? `${passes.accuracy}%`
              : "-"
          }
        />
      </div>

      {/* Shooting */}

      <SectionTitle title="Shooting" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Total Shots"
          value={shots.total || 0}
        />

        <Card
          title="On Target"
          value={shots.on || 0}
        />
      </div>

      {/* Defensive */}

      <SectionTitle title="Defensive Actions" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Tackles"
          value={tackles.total || 0}
        />

        <Card
          title="Blocks"
          value={tackles.blocks || 0}
        />

        <Card
          title="Interceptions"
          value={tackles.interceptions || 0}
        />
      </div>

      {/* Duels */}

      <SectionTitle title="Duels" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Total"
          value={duels.total || 0}
        />

        <Card
          title="Won"
          value={duels.won || 0}
        />
      </div>

      {/* Dribbles */}

      <SectionTitle title="Dribbles" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Attempts"
          value={dribbles.attempts || 0}
        />

        <Card
          title="Success"
          value={dribbles.success || 0}
        />

        <Card
          title="Past"
          value={dribbles.past || 0}
        />
      </div>

      {/* Discipline */}

      <SectionTitle title="Discipline" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 35,
        }}
      >
        <Card
          title="Fouls Drawn"
          value={fouls.drawn || 0}
        />

        <Card
          title="Fouls Committed"
          value={fouls.committed || 0}
        />

        <Card
          title="Yellow Cards"
          value={cards.yellow || 0}
        />

        <Card
          title="Red Cards"
          value={cards.red || 0}
        />
      </div>

      {/* Penalties */}

      <SectionTitle title="Penalty Statistics" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
        }}
      >
        <Card
          title="Scored"
          value={penalty.scored || 0}
        />

        <Card
          title="Missed"
          value={penalty.missed || 0}
        />

        <Card
          title="Won"
          value={penalty.won || 0}
        />

        <Card
          title="Committed"
          value={penalty.commited || 0}
        />
      </div>
    </section>
  );
}

function SectionTitle({ title }) {
  return (
    <h3
      style={{
        color: "#22c55e",
        marginBottom: 18,
        marginTop: 10,
      }}
    >
      {title}
    </h3>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}