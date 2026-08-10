"use client";

export default function TeamAchievements({
  team,
}) {
  if (!team) return null;

  const trophies = team.trophies || [];

  const totalTrophies = trophies.length;

  const championships = trophies.filter((t) =>
    String(t.place || "")
      .toLowerCase()
      .includes("winner")
  );

  const runnersUp = trophies.filter((t) =>
    String(t.place || "")
      .toLowerCase()
      .includes("runner")
  );

  const uniqueCompetitions = [
    ...new Set(
      trophies.map((t) => t.league)
    ),
  ];

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
        🏆 Team Achievements
      </h2>

      {/* Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <StatCard
          icon="🏆"
          title="Total Trophies"
          value={totalTrophies}
          color="#facc15"
        />

        <StatCard
          icon="🥇"
          title="Championships"
          value={championships.length}
          color="#22c55e"
        />

        <StatCard
          icon="🥈"
          title="Runner-up"
          value={runnersUp.length}
          color="#3b82f6"
        />

        <StatCard
          icon="🌍"
          title="Competitions"
          value={uniqueCompetitions.length}
          color="#8b5cf6"
        />
      </div>

      {/* Trophy List */}

      {trophies.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: 20,
          }}
        >
          {trophies.map(
            (trophy, index) => (
              <div
                key={index}
                style={{
                  background:
                    "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  border:
                    "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 26,
                    }}
                  >
                    🏆
                  </div>

                  <span
                    style={{
                      background:
                        "#0f172a",
                      padding:
                        "6px 12px",
                      borderRadius: 30,
                      color:
                        "#facc15",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {trophy.place}
                  </span>
                </div>

                <h3
                  style={{
                    color: "#fff",
                    marginBottom: 10,
                    fontSize: 22,
                  }}
                >
                  {trophy.league}
                </h3>

                <div
                  style={{
                    color:
                      "#94a3b8",
                    marginBottom: 8,
                  }}
                >
                  Season
                </div>

                <div
                  style={{
                    color:
                      "#fff",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {trophy.season}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div
          style={{
            background:
              "#1f2937",
            borderRadius: 18,
            padding: 35,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 60,
              marginBottom: 20,
            }}
          >
            🏆
          </div>

          <h3
            style={{
              color: "#fff",
            }}
          >
            No Trophy Information
          </h3>

          <p
            style={{
              color:
                "#94a3b8",
              marginTop: 10,
            }}
          >
            Trophy history is currently
            unavailable.
          </p>
        </div>
      )}
    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 24,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 34,
          marginBottom: 14,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#94a3b8",
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}