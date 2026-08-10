"use client";

import Image from "next/image";

export default function LiveCommentary({
  events = [],
  homeTeam = {},
  awayTeam = {},
}) {
  if (!events.length) return null;

  const commentary = [...events].reverse();

  const getEventColor = (type = "") => {
    switch (type.toLowerCase()) {
      case "goal":
        return "#22c55e";

      case "card":
      case "yellow card":
        return "#facc15";

      case "red card":
        return "#ef4444";

      case "subst":
      case "substitution":
        return "#3b82f6";

      case "var":
        return "#8b5cf6";

      case "penalty":
        return "#f97316";

      default:
        return "#64748b";
    }
  };

  const getEventIcon = (type = "") => {
    switch (type.toLowerCase()) {
      case "goal":
        return "⚽";

      case "yellow card":
        return "🟨";

      case "red card":
        return "🟥";

      case "subst":
      case "substitution":
        return "🔄";

      case "var":
        return "📺";

      case "penalty":
        return "🎯";

      default:
        return "•";
    }
  };

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 28,
        marginBottom: 30,
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 30,
          }}
        >
          📢 Live Commentary
        </h2>

        <div
          style={{
            background: "#22c55e",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 30,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {events.length} Events
        </div>
      </div>

      {/* Teams */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <TeamBadge team={homeTeam} />

        <div
          style={{
            color: "#94a3b8",
            fontWeight: 700,
          }}
        >
          MATCH TIMELINE
        </div>

        <TeamBadge team={awayTeam} />
      </div>

      {/* Timeline */}

      <div
        style={{
          position: "relative",
        }}
      >
                <div
          style={{
            position: "absolute",
            left: 28,
            top: 0,
            bottom: 0,
            width: 4,
            background: "#374151",
            borderRadius: 20,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxHeight: 700,
            overflowY: "auto",
            paddingLeft: 10,
          }}
        >
          {commentary.map((event, index) => {
            const color = getEventColor(
              event.type
            );

            const icon = getEventIcon(
              event.type
            );

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: 18,
                  position: "relative",
                }}
              >
                {/* Timeline Dot */}

                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                    zIndex: 2,
                    boxShadow:
                      "0 0 12px rgba(0,0,0,.35)",
                  }}
                >
                  {icon}
                </div>

                {/* Event Card */}

                <div
                  style={{
                    flex: 1,
                    background: "#1f2937",
                    borderRadius: 16,
                    padding: 18,
                    borderLeft: `5px solid ${color}`,
                    transition:
                      "transform .25s ease, box-shadow .25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 24px rgba(0,0,0,.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          background: color,
                          color: "#fff",
                          padding:
                            "4px 10px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {event.time?.elapsed || 0}
                      </span>

                      <strong
                        style={{
                          color: "#fff",
                          fontSize: 18,
                        }}
                      >
                        {event.type}
                      </strong>
                    </div>

                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {event.detail || ""}
                    </span>
                  </div>
                                    {/* Player */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 14,
                    }}
                  >
                    {event.team?.logo && (
                      <Image
                        src={event.team.logo}
                        alt={event.team.name || "Team"}
                        width={38}
                        height={38}
                        style={{
                          borderRadius: "50%",
                          background: "#fff",
                          objectFit: "contain",
                        }}
                      />
                    )}

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                      >
                        {event.player?.name ||
                          "Unknown Player"}
                      </div>

                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: 13,
                          marginTop: 3,
                        }}
                      >
                        {event.team?.name || ""}
                      </div>
                    </div>

                    {index === 0 && (
                      <div
                        style={{
                          background: "#22c55e",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        LATEST
                      </div>
                    )}
                  </div>

                  {/* Assist */}

                  {event.assist?.name && (
                    <div
                      style={{
                        background: "#111827",
                        borderRadius: 10,
                        padding: "10px 14px",
                        marginBottom: 12,
                        color: "#cbd5e1",
                      }}
                    >
                      🎯 Assist by{" "}
                      <strong>
                        {event.assist.name}
                      </strong>
                    </div>
                  )}

                  {/* VAR */}

                  {event.type
                    ?.toLowerCase()
                    .includes("var") && (
                    <div
                      style={{
                        background: "#312e81",
                        border: "1px solid #8b5cf6",
                        color: "#ede9fe",
                        padding: "10px 14px",
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                    >
                      📺 VAR Decision:
                      {" "}
                      {event.detail ||
                        "Under Review"}
                    </div>
                  )}

                  {/* Commentary */}

                  {event.comments && (
                    <div
                      style={{
                        color: "#cbd5e1",
                        lineHeight: 1.7,
                        marginBottom: 12,
                      }}
                    >
                      {event.comments}
                    </div>
                  )}

                  {/* Detail */}

                  {event.detail &&
                    !event.type
                      ?.toLowerCase()
                      .includes("var") && (
                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: 14,
                          lineHeight: 1.6,
                        }}
                      >
                        {event.detail}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
          </section>
  );
}

/* -------------------------------- */
/* Team Badge */
/* -------------------------------- */

function TeamBadge({
  team = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        minWidth: 120,
      }}
    >
      {team.logo ? (
        <Image
          src={team.logo}
          alt={team.name || "Team"}
          width={40}
          height={40}
          style={{
            objectFit: "contain",
            background: "#fff",
            borderRadius: "50%",
            padding: 3,
          }}
        />
      ) : (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#374151",
          }}
        />
      )}

      <span
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        {team.name || "Team"}
      </span>
    </div>
  );
}