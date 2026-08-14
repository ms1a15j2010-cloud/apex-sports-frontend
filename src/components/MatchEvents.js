"use client";

export default function MatchEvents({
  events = [],
}) {
  if (!events || events.length === 0) {
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
            margin: "0 0 20px",
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          Match Events
        </h2>

        <div
          style={{
            background: "#0f172a",
            borderRadius: 14,
            padding: "28px 20px",
            textAlign: "center",
            color: "#64748b",
            fontSize: 14,
          }}
        >
          No match events available.
        </div>
      </section>
    );
  }

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
        Match Events
      </h2>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {events.map(
          (event, index) => {
            const minute =
              event?.time?.elapsed ??
              event?.minute ??
              null;

            const extra =
              event?.time?.extra ??
              event?.injuryTime ??
              null;

            const type =
              String(
                event?.type ||
                  event?.detail ||
                  "Event"
              );

            const detail =
              String(
                event?.detail ||
                  type
              );

            const player =
              event?.player?.name ||
              event?.scorer?.name ||
              null;

            const assist =
              event?.assist?.name ||
              null;

            const team =
              event?.team || {};

            const homeScore =
              event?.score?.home;

            const awayScore =
              event?.score?.away;

            const upperType =
              type.toUpperCase();

            let icon = "•";

            if (
              upperType.includes(
                "GOAL"
              )
            ) {
              icon = "⚽";
            } else if (
              upperType.includes(
                "CARD"
              )
            ) {
              icon = "🟨";
            } else if (
              upperType.includes(
                "SUB"
              )
            ) {
              icon = "🔄";
            }

            return (
              <div
                key={
                  event?.id ||
                  `${index}-${type}`
                }
                style={{
                  background:
                    "#0f172a",
                  borderRadius:
                    14,
                  padding:
                    16,
                  border:
                    "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    gap: 15,
                    flexWrap:
                      "wrap",
                  }}
                >
                  {/* LEFT */}

                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 12,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        minWidth: 38,
                        borderRadius:
                          "50%",
                        background:
                          "#1e293b",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontSize: 17,
                      }}
                    >
                      {icon}
                    </div>

                    <div
                      style={{
                        minWidth:
                          0,
                      }}
                    >
                      <div
                        style={{
                          color:
                            "#fff",
                          fontWeight:
                            800,
                          fontSize:
                            14,
                        }}
                      >
                        {detail}
                      </div>

                      {player && (
                        <div
                          style={{
                            marginTop:
                              4,
                            color:
                              "#cbd5e1",
                            fontSize:
                              13,
                          }}
                        >
                          {player}
                        </div>
                      )}

                      {assist && (
                        <div
                          style={{
                            marginTop:
                              3,
                            color:
                              "#64748b",
                            fontSize:
                              11,
                          }}
                        >
                          Assist:{" "}
                          {assist}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#22c55e",
                        fontSize:
                          14,
                        fontWeight:
                          800,
                      }}
                    >
                      {minute !==
                      null
                        ? `${minute}'${
                            extra
                              ? `+${extra}`
                              : ""
                          }`
                        : "—"}
                    </div>

                    {(
                      homeScore !==
                        undefined ||
                      awayScore !==
                        undefined
                    ) && (
                      <div
                        style={{
                          marginTop:
                            4,
                          color:
                            "#64748b",
                          fontSize:
                            11,
                        }}
                      >
                        {homeScore ??
                          "—"}{" "}
                        -{" "}
                        {awayScore ??
                          "—"}
                      </div>
                    )}
                  </div>
                </div>

                {team?.name && (
                  <div
                    style={{
                      marginTop:
                        12,
                      paddingTop:
                        10,
                      borderTop:
                        "1px solid #1e293b",
                      color:
                        "#64748b",
                      fontSize:
                        11,
                    }}
                  >
                    {team.name}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}