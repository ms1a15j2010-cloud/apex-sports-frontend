"use client";

export default function TeamStats({ statistics }) {
  if (!statistics) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 24,
          marginBottom: 25,
          color: "#fff",
        }}
      >
        <h2>Team Statistics</h2>
        <p>No statistics available.</p>
      </section>
    );
  }

  const fixtures = statistics.fixtures || {};
  const goals = statistics.goals || {};
  const cleanSheet = statistics.clean_sheet || {};
  const failedToScore = statistics.failed_to_score || {};
  const penalty = statistics.penalty || {};
  const lineups = statistics.lineups || [];

  const played = fixtures.played?.total || 0;
  const wins = fixtures.wins?.total || 0;
  const draws = fixtures.draws?.total || 0;
  const losses = fixtures.loses?.total || 0;

  const goalsFor = goals.for?.total?.total || 0;
  const goalsAgainst = goals.against?.total?.total || 0;

  const goalsPerGame =
    goals.for?.average?.total || "0";

  const concededPerGame =
    goals.against?.average?.total || "0";

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 24,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
        }}
      >
        📊 Team Statistics
      </h2>

      {/* Top Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 18,
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
          color="#16a34a"
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
          title="Goals"
          value={goalsFor}
          color="#22c55e"
        />

        <Card
          title="Conceded"
          value={goalsAgainst}
          color="#dc2626"
        />
      </div>

      {/* Performance */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: 25,
        }}
      >
        {/* Left */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3
            style={{
              marginBottom: 20,
            }}
          >
            Goal Statistics
          </h3>

          <Stat
            label="Goals per Match"
            value={goalsPerGame}
          />

          <Stat
            label="Conceded per Match"
            value={concededPerGame}
          />

          <Stat
            label="Clean Sheets"
            value={
              cleanSheet.total || 0
            }
          />

          <Stat
            label="Failed To Score"
            value={
              failedToScore.total || 0
            }
          />
        </div>

        {/* Right */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3
            style={{
              marginBottom: 20,
            }}
          >
            Penalties
          </h3>

          <Stat
            label="Scored"
            value={
              penalty.scored?.total || 0
            }
          />

          <Stat
            label="Missed"
            value={
              penalty.missed?.total || 0
            }
          />

          <Stat
            label="Success Rate"
            value={
              penalty.scored?.percentage ||
              "-"
            }
          />
        </div>
      </div>

      {/* Formations */}

      {lineups.length > 0 && (
        <div
          style={{
            marginTop: 30,
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3
            style={{
              marginBottom: 20,
            }}
          >
            Most Used Formations
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: 15,
            }}
          >
            {lineups.map((item) => (
              <div
                key={item.formation}
                style={{
                  background:
                    "#111827",
                  borderRadius: 12,
                  padding: 18,
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight:
                      "bold",
                  }}
                >
                  {
                    item.formation
                  }
                </div>

                <div
                  style={{
                    color:
                      "#94a3b8",
                    marginTop: 8,
                  }}
                >
                  Played{" "}
                  {item.played}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

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
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

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
        padding: "10px 0",
        borderBottom:
          "1px solid #374151",
      }}
    >
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}