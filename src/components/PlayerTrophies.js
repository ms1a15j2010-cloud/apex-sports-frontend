"use client";

export default function PlayerTrophies({
  trophies = [],
  available = false,
}) {
  return (
    <section
      style={{
        background:
          "linear-gradient(145deg, #111827, #0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
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
          🏆 Player Trophies
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Major trophies and titles
          won throughout the player's
          career.
        </p>
      </div>

      {!available ? (
        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 35,
            textAlign: "center",
            border: "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 42,
              marginBottom: 15,
            }}
          >
            🏆
          </div>

          <h3
            style={{
              margin: "0 0 10px",
              color: "#fff",
              fontSize: 20,
            }}
          >
            Trophy History Unavailable
          </h3>

          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            Player trophy history is
            not provided by the current
            football-data.org data source.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: 999,
              background: "#0f172a",
              color: "#64748b",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Source: football-data.org
          </div>
        </div>
      ) : !Array.isArray(trophies) ||
        trophies.length === 0 ? (
        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 30,
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          No trophy history available.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
          }}
        >
          {trophies.map(
            (trophy, index) => (
              <div
                key={
                  trophy?.id ||
                  index
                }
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
                    fontSize: 30,
                    marginBottom: 12,
                  }}
                >
                  🏆
                </div>

                <h3
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: 17,
                  }}
                >
                  {trophy?.name ||
                    "Trophy"}
                </h3>

                {trophy?.season && (
                  <div
                    style={{
                      marginTop: 8,
                      color: "#22c55e",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Season{" "}
                    {trophy.season}
                  </div>
                )}

                {trophy?.team && (
                  <div
                    style={{
                      marginTop: 6,
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    {typeof trophy.team ===
                    "string"
                      ? trophy.team
                      : trophy.team?.name ||
                        ""}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}