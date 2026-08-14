"use client";

export default function TeamAchievements({
  team,
}) {
  if (!team) return null;

  const trophies = Array.isArray(
    team.trophies
  )
    ? team.trophies
    : [];

  /* =================================================
     FOOTBALL-DATA.ORG CURRENT LIMITATION

     Keep the UI ready for future trophy data,
     but do not invent historical trophies.
  ================================================= */

  const available =
    trophies.length > 0;

  const championships =
    trophies.filter((trophy) =>
      String(
        trophy?.place || ""
      )
        .toLowerCase()
        .includes("winner")
    );

  const runnersUp =
    trophies.filter((trophy) =>
      String(
        trophy?.place || ""
      )
        .toLowerCase()
        .includes("runner")
    );

  const competitions = [
    ...new Set(
      trophies
        .map(
          (trophy) =>
            trophy?.league
        )
        .filter(Boolean)
    ),
  ];

  return (
    <section
      id="achievements"
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
          }}
        >
          🏆 Team Achievements
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Major trophies and
          championship history.
        </p>
      </div>

      {/* =================================================
          TROPHIES AVAILABLE
      ================================================= */}

      {available ? (
        <>
          {/* SUMMARY */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(200px,1fr))",
              gap: 18,
              marginBottom: 30,
            }}
          >
            <StatCard
              icon="🏆"
              title="Total Trophies"
              value={
                trophies.length
              }
              color="#facc15"
            />

            <StatCard
              icon="🥇"
              title="Championships"
              value={
                championships.length
              }
              color="#22c55e"
            />

            <StatCard
              icon="🥈"
              title="Runner-up"
              value={
                runnersUp.length
              }
              color="#3b82f6"
            />

            <StatCard
              icon="🌍"
              title="Competitions"
              value={
                competitions.length
              }
              color="#8b5cf6"
            />
          </div>

          {/* TROPHY LIST */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: 18,
            }}
          >
            {trophies.map(
              (trophy, index) => (
                <div
                  key={
                    trophy?.id ??
                    index
                  }
                  style={{
                    background:
                      "#1f2937",
                    borderRadius: 18,
                    padding: 22,
                    border:
                      "1px solid #293548",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      gap: 12,
                      marginBottom:
                        16,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 30,
                      }}
                    >
                      🏆
                    </span>

                    <span
                      style={{
                        background:
                          "#0f172a",
                        color:
                          "#facc15",
                        padding:
                          "6px 12px",
                        borderRadius:
                          999,
                        fontSize: 12,
                        fontWeight:
                          800,
                      }}
                    >
                      {trophy?.place ||
                        "Achievement"}
                    </span>
                  </div>

                  <h3
                    style={{
                      color: "#fff",
                      margin:
                        "0 0 10px",
                      fontSize: 20,
                    }}
                  >
                    {trophy?.league ||
                      "Competition"}
                  </h3>

                  <div
                    style={{
                      color:
                        "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    Season
                  </div>

                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 18,
                      marginTop: 5,
                    }}
                  >
                    {trophy?.season ||
                      "-"}
                  </div>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        /* =================================================
           UNAVAILABLE STATE
        ================================================= */

        <div
          style={{
            background:
              "#1f2937",
            borderRadius: 18,
            padding: 40,
            textAlign: "center",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 58,
              marginBottom: 18,
            }}
          >
            🏆
          </div>

          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 10px",
              fontSize: 21,
            }}
          >
            Trophy History Unavailable
          </h3>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              lineHeight: 1.8,
              maxWidth: 600,
              marginInline:
                "auto",
            }}
          >
            Historical team trophy data
            is not provided by the current
            football-data.org source.
            This section is intentionally
            left empty rather than displaying
            unverified trophy information.
          </p>

          <div
            style={{
              display:
                "inline-block",
              marginTop: 18,
              padding:
                "8px 14px",
              borderRadius: 999,
              background:
                "#0f172a",
              color:
                "#64748b",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Source: football-data.org
          </div>
        </div>
      )}

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
      </div>
    </section>
  );
}

/* =====================================================
STAT CARD
===================================================== */

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background:
          "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign:
          "center",
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          fontSize: 30,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color:
            "#94a3b8",
          marginBottom: 8,
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 28,
          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}