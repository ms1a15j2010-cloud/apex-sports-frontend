"use client";

export default function Events({ events }) {
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
      No events available.
    </section>
  );
}

  const badge = (type, detail) => {
    const t = (type || "").toLowerCase();
    const d = (detail || "").toLowerCase();
if (d.includes("own goal"))
  return {
    icon: "🥅",
    color: "#ea580c",
  };
    if (t.includes("goal"))
      return { icon: "⚽", color: "#16a34a" };

    if (d.includes("yellow"))
      return { icon: "🟨", color: "#ca8a04" };

    if (d.includes("red"))
      return { icon: "🟥", color: "#dc2626" };

    if (
  t.includes("subst") ||
  t.includes("substitution")
)

if (
  t.includes("penalty") ||
  d.includes("penalty")
)
  return {
     icon: "❌",
    color: "#b91c1c",
  };

    if (t.includes("var"))
      return { icon: "📺", color: "#9333ea" };

    return { icon: "•", color: "#475569" };
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
          marginBottom: 25,
          fontSize: 28,
        }}
      >
        📝 Match Events
      </h2>

      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {events.map((event, index) => {
          const b = badge(event.type, event.detail);

          return (
            <div
             key={`${event.time?.elapsed}-${event.type}-${event.player?.id || index}`}
              style={{
                background: "#1e293b",
                borderRadius: 12,
                padding: 18,
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 70,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#22c55e",
                }}
              >
               {event.time?.elapsed ?? "-"}

              </div>

              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: b.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {b.icon}
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {event.player?.name || "Unknown Player"}
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    marginTop: 4,
                  }}
                >
                  {event.team?.name || "Unknown Team"}
                </div>

                <div
                  style={{
                    marginTop: 8,
                    color: "#e2e8f0",
                  }}
                >
                  {event.type || "Event"}

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
                      marginTop: 6,
                      color: "#22c55e",
                    }}
                  >
                    Assist: {event.assist.name}
                  </div>
                )}

                {event.comments && (
                  <div
                    style={{
                      marginTop: 6,
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    {event.comments}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}