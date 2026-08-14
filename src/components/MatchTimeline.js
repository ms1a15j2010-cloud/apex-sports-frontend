"use client";

export default function MatchTimeline({
  timeline = [],
}) {
  if (!timeline || timeline.length === 0) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 18,
          padding: 28,
          marginBottom: 24,
          border: "1px solid #1f2937",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            Match Timeline
          </h2>
        </div>

        <div
          style={{
            padding: "30px 20px",
            textAlign: "center",
            background: "#0f172a",
            borderRadius: 14,
            color: "#64748b",
            fontSize: 14,
          }}
        >
          No timeline events available.
        </div>
      </section>
    );
  }

  const sortedTimeline = [...timeline].sort(
    (a, b) => {
      const minuteA =
        Number(a?.time?.elapsed ?? a?.minute ?? 0);

      const minuteB =
        Number(b?.time?.elapsed ?? b?.minute ?? 0);

      return minuteA - minuteB;
    }
  );

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        marginBottom: 24,
        border: "1px solid #1f2937",
      }}
    >
      <h2
        style={{
          margin: "0 0 24px",
          color: "#fff",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        Match Timeline
      </h2>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {sortedTimeline.map(
          (event, index) => {
            const minute =
              event?.time?.elapsed ??
              event?.minute ??
              null;

            const extra =
              event?.time?.extra ??
              event?.injuryTime ??
              null;

            const team =
              event?.team || {};

            const player =
              event?.player || {};

            const assist =
              event?.assist || {};

            const eventType =
              String(
                event?.type ||
                  event?.detail ||
                  "Event"
              ).toUpperCase();

            const isGoal =
              eventType.includes("GOAL");

            const isCard =
              eventType.includes("CARD");

            const teamName =
              team?.name ||
              "Match Event";

            const playerName =
              player?.name ||
              event?.scorer?.name ||
              null;

            const assistName =
              assist?.name ||
              null;

            return (
              <div
                key={
                  event?.id ||
                  `${eventType}-${index}`
                }
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "70px minmax(0, 1fr)",
                  gap: 16,
                  alignItems: "start",
                  background: "#0f172a",
                  borderRadius: 14,
                  padding: 16,
                  border:
                    "1px solid #1e293b",
                }}
              >
                {/* TIME */}

                <div
                  style={{
                    color:
                      isGoal
                        ? "#22c55e"
                        : "#94a3b8",
                    fontWeight: 800,
                    fontSize: 14,
                    textAlign: "center",
                    paddingTop: 3,
                  }}
                >
                  {minute !== null
                    ? `${minute}'${
                        extra
                          ? `+${extra}`
                          : ""
                      }`
                    : "—"}
                </div>

                {/* EVENT */}

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      minWidth: 38,
                      borderRadius: "50%",
                      background:
                        isGoal
                          ? "rgba(34,197,94,.12)"
                          : isCard
                          ? "rgba(245,158,11,.12)"
                          : "#1e293b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 17,
                    }}
                  >
                    {isGoal
                      ? "⚽"
                      : isCard
                      ? "🟨"
                      : "•"}
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 15,
                      }}
                    >
                      {eventType}
                    </div>

                    {playerName && (
                      <div
                        style={{
                          marginTop: 5,
                          color: "#e2e8f0",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {playerName}
                      </div>
                    )}

                    {assistName && (
                      <div
                        style={{
                          marginTop: 3,
                          color: "#64748b",
                          fontSize: 12,
                        }}
                      >
                        Assist: {assistName}
                      </div>
                    )}

                    <div
                      style={{
                        marginTop: 6,
                        color: "#64748b",
                        fontSize: 12,
                      }}
                    >
                      {teamName}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}