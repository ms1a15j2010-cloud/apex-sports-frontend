"use client";

export default function Timeline({ events }) {
  if (!events?.length) {
  return (
    <section
      style={{
        marginTop: 30,
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        color: "white",
        textAlign: "center",
      }}
    >
      No timeline available.
    </section>
  );
}
  const getIcon = (type, detail) => {
    const t = (type || "").toLowerCase();
    const d = (detail || "").toLowerCase();

    if (t.includes("goal")) return "⚽";
    if (d.includes("yellow")) return "🟨";
    if (d.includes("red")) return "🟥";
    if (t.includes("subst") || t.includes("substitution")) return "🔄";
    if (t.includes("var")) return "📺";
    if (t.includes("penalty")) return "🎯";
    return "•";
  };

  return (
    <section
      style={{
        marginTop: 30,
        background: "#111827",
        borderRadius: 18,
        padding: 28,
      }}
    >
      <h2
        style={{
          marginBottom: 30,
          fontSize: 28,
        }}
      >
        ⏱ Match Timeline
      </h2>

      <div
        style={{
          position: "relative",
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 0,
            bottom: 20,
            width: 3,
            background: "#334155",
          }}
        />

        {events.map((event, index) => (
          <div
            key={`${event.time?.elapsed}-${event.type}-${event.player?.id || index}`}
            style={{
              position: "relative",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -30,
                top: 6,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#22c55e",
                border: "3px solid #111827",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 18,
              }}
            >
              <div
                style={{
                  minWidth: 70,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: "#dc2626",
                    padding: "6px 12px",
                    borderRadius: 30,
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  {event.time?.elapsed ?? "-"}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "#1e293b",
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {getIcon(event.type, event.detail)}{" "}
                    {event.player?.name || "Unknown Player"}
                  </strong>

                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: 14,
                    }}
                  >
                    {event.team?.name || "Unknown Team"}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    color: "#cbd5e1",
                  }}
                >
                  <strong>{event.type || "Event"}</strong>

                  {event.detail && (
                    <>
                      {" • "}
                      {event.detail}
                    </>
                  )}
                </div>

                {event.assist?.name && (
                  <div
                    style={{
                      marginTop: 8,
                      color: "#22c55e",
                      fontSize: 14,
                    }}
                  >
                    Assist: {event.assist.name}
                  </div>
                )}

                {event.comments && (
                  <div
                    style={{
                      marginTop: 8,
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    {event.comments}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}