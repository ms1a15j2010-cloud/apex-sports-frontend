export default function InjurySuspension({
  injuries = [],
  suspensions = [],
}) {
  if (
    injuries.length === 0 &&
    suspensions.length === 0
  )
    return null;

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
          marginBottom: 24,
        }}
      >
        Injuries & Suspensions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: 30,
        }}
      >
        <div>
          <h3
            style={{
              color: "#ef4444",
              marginBottom: 15,
            }}
          >
            🚑 Injuries
          </h3>

          {injuries.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No injured players.
            </p>
          ) : (
            injuries.map((player, index) => (
              <div
                key={index}
                style={{
                  background: "#1f2937",
                  padding: 14,
                  borderRadius: 10,
                  marginBottom: 12,
                }}
              >
                <strong>{player.name}</strong>

                <div
                  style={{
                    color: "#94a3b8",
                    marginTop: 4,
                  }}
                >
                  {player.reason}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <h3
            style={{
              color: "#facc15",
              marginBottom: 15,
            }}
          >
            🚫 Suspensions
          </h3>

          {suspensions.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No suspended players.
            </p>
          ) : (
            suspensions.map((player, index) => (
              <div
                key={index}
                style={{
                  background: "#1f2937",
                  padding: 14,
                  borderRadius: 10,
                  marginBottom: 12,
                }}
              >
                <strong>{player.name}</strong>

                <div
                  style={{
                    color: "#94a3b8",
                    marginTop: 4,
                  }}
                >
                  {player.reason}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}