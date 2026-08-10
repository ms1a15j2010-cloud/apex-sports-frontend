"use client";

/* ============================================================
   APEX SPORTS - MATCH TIMELINE
   ------------------------------------------------------------
   This component displays every match event in chronological
   order (Goals, Cards, VAR, Substitutions, etc.)
   ============================================================ */

import Image from "next/image";

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function MatchTimeline({
  events = [],
}) {
  /* ==========================================================
     EMPTY STATE
     ----------------------------------------------------------
     If there are no events, show a professional empty card.
     ========================================================== */

  if (!events || events.length === 0) {
    return (
      <section
        style={{
          position: "relative",
          overflow: "hidden",

          background:
            "linear-gradient(145deg,#0f172a,#111827)",

          border: "1px solid #1f2937",

          borderRadius: 24,

          padding: 32,

          marginBottom: 32,

          boxShadow:
            "0 20px 45px rgba(0,0,0,.35)",
        }}
      >
        {/* Decorative Glow */}

        <div
          style={{
            position: "absolute",
            inset: 0,

            pointerEvents: "none",

            background:
              "radial-gradient(circle at top right, rgba(34,197,94,.10), transparent 45%)",
          }}
        />

        {/* Content */}

        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Header */}

          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",

              gap: 20,

              flexWrap: "wrap",

              marginBottom: 28,
            }}
          >
            <div>
              <div
                style={{
                  color: "#22c55e",

                  fontWeight: 700,

                  fontSize: 13,

                  textTransform:
                    "uppercase",

                  letterSpacing: 1.4,

                  marginBottom: 8,
                }}
              >
                Apex Sports
              </div>

              <h2
                style={{
                  margin: 0,

                  color: "#fff",

                  fontWeight: 800,

                  fontSize: 30,
                }}
              >
                ⏱ Match Timeline
              </h2>
            </div>

            <div
              style={{
                padding: "8px 16px",

                borderRadius: 999,

                background:
                  "rgba(34,197,94,.12)",

                border:
                  "1px solid rgba(34,197,94,.25)",

                color: "#86efac",

                fontWeight: 700,

                fontSize: 13,
              }}
            >
              LIVE EVENTS
            </div>
          </div>

          {/* Empty Message */}

          <div
            style={{
              textAlign: "center",

              background:
                "rgba(255,255,255,.03)",

              border:
                "1px dashed rgba(255,255,255,.08)",

              borderRadius: 18,

              padding: "40px 24px",
            }}
          >
            <div
              style={{
                fontSize: 54,

                marginBottom: 14,
              }}
            >
              ⏱
            </div>

            <h3
              style={{
                color: "#fff",

                margin: 0,

                marginBottom: 10,

                fontSize: 22,
              }}
            >
              No Timeline Yet
            </h3>

            <p
              style={{
                margin: 0,

                color: "#94a3b8",

                lineHeight: 1.7,
              }}
            >
              Match events will appear here automatically
              once live data becomes available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ==========================================================
     SORT EVENTS
     ----------------------------------------------------------
     Football API events are not always sorted correctly.
     We sort them using elapsed minute + extra time.
     ========================================================== */

  const sortedEvents = [...events].sort(
    (a, b) => {
      const minuteA =
        (a.time?.elapsed || 0) * 100 +
        (a.time?.extra || 0);

      const minuteB =
        (b.time?.elapsed || 0) * 100 +
        (b.time?.extra || 0);

      return minuteA - minuteB;
    }
  );

  /* The main timeline UI starts below. */
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(145deg,#0f172a,#111827)",

        border: "1px solid #1f2937",

        borderRadius: 24,

        padding: 32,

        marginBottom: 32,

        boxShadow:
          "0 20px 45px rgba(0,0,0,.35)",
      }}
    >
      {/* =====================================================
         Background Glow
      ====================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          pointerEvents: "none",

          background:
            "radial-gradient(circle at top right, rgba(34,197,94,.10), transparent 45%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* =====================================================
           Header
        ====================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          {/* Left */}

          <div>
            <div
              style={{
                color: "#22c55e",
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              Apex Sports
            </div>

            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              ⏱ Match Timeline
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: 8,
                marginBottom: 0,
                fontSize: 15,
              }}
            >
              Every important match event in chronological order
            </p>
          </div>

          {/* Right */}

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {/* Total Events */}

            <div
              style={{
                padding: "9px 16px",
                borderRadius: 999,
                background:
                  "rgba(34,197,94,.12)",
                border:
                  "1px solid rgba(34,197,94,.25)",

                color: "#86efac",

                fontWeight: 700,

                fontSize: 13,
              }}
            >
              {sortedEvents.length} Events
            </div>

            {/* Timeline */}

            <div
              style={{
                padding: "9px 16px",
                borderRadius: 999,

                background:
                  "rgba(59,130,246,.12)",

                border:
                  "1px solid rgba(59,130,246,.25)",

                color: "#93c5fd",

                fontWeight: 700,

                fontSize: 13,
              }}
            >
              Chronological
            </div>
          </div>
        </div>

        {/* =====================================================
           Timeline Container
        ====================================================== */}

        <div
          className="timeline-container"
  style={{
    position: "relative",
    paddingLeft: 70,
  }}
        >
          {/* Vertical Timeline */}

          <div
            style={{
              position: "absolute",
              left: 28,
              top: 0,
              bottom: 0,
              width: 4,
              borderRadius: 50,

              background:
                "linear-gradient(to bottom,#22c55e,#3b82f6)",
            }}
          />

          {/* Timeline events will be rendered here */}

          {sortedEvents.map((event, index) => (
            <TimelineItem
              key={`${event.time?.elapsed}-${event.player?.id}-${index}`}
              event={event}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TIMELINE ITEM
============================================================ */

function TimelineItem({ event }) {
  const minute = event.time?.elapsed || 0;
  const extra = event.time?.extra;

  const team = event.team || {};
  const player = event.player || {};
  const assist = event.assist || {};

  const type = event.type || "";
  const detail = event.detail || "";
  const comments = event.comments || "";

  const icon = getIcon(type, detail);
  const color = getEventColor(type, detail);

  return (
    <div
      style={{
        position: "relative",
        marginBottom: 34,
      }}
    >
      {/* Timeline Dot */}

      <div
        style={{
          position: "absolute",
          left: -31,
          top: 28,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#22c55e",
          border: "4px solid #111827",
          boxShadow: "0 0 15px rgba(34,197,94,.45)",
          zIndex: 5,
        }}
      />

      {/* Event Card */}

      <div
        style={{
          background: "#1f2937",
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 12px 25px rgba(0,0,0,.25)",
        }}
      >
        {/* Top Strip */}

        <div
          style={{
            background:
              "linear-gradient(90deg,#22c55e,#16a34a)",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            {minute}'
            {extra ? `+${extra}` : ""}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
              src={team.logo || "/team.png"}
              alt={team.name || "Team"}
              width={28}
              height={28}
            />

            <span
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {team.name}
            </span>
          </div>
        </div>

        {/* Main Content */}

        <div
          style={{
            padding: 24,
          }}
        >
          <div
            className="timeline-content"
  style={{
    display: "grid",
    gridTemplateColumns: "70px 1fr",
    gap: 20,
  }}
          >
            {/* Icon */}

            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 18,
                background: "#111827",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 36,
              }}
            >
              {icon}
            </div>

            {/* Details */}

            <div>
              <h3
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                {type}
              </h3>

              <div
                style={{
                  color: "#cbd5e1",
                  marginBottom: 10,
                }}
              >
                <strong>Player:</strong>{" "}
                {player.name || "-"}
              </div>

              {assist.name && (
                <div
                  style={{
                    color: "#60a5fa",
                    marginBottom: 10,
                  }}
                >
                  <strong>Assist:</strong>{" "}
                  {assist.name}
                </div>
              )}

              {detail && (
                <div
                  style={{
                    color: "#fbbf24",
                    marginBottom: 10,
                  }}
                >
                  <strong>Detail:</strong>{" "}
                  {detail}
                </div>
              )}

              {comments && (
                <div
                  style={{
                    color: "#94a3b8",
                    lineHeight: 1.6,
                  }}
                >
                  {comments}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EVENT ICON HELPER
============================================================ */

function getIcon(type, detail) {
  // Goal
  if (type === "Goal") return "⚽";

  // Substitution
  if (
    type === "subst" ||
    type === "Substitution"
  ) {
    return "🔄";
  }

  // Cards
  if (type === "Card") {
    if (detail === "Yellow Card") return "🟨";
    if (detail === "Second Yellow card") return "🟨🟥";
    if (detail === "Red Card") return "🟥";
  }

  // VAR
  if (
    type === "Var" ||
    type === "VAR"
  ) {
    return "📺";
  }

  // Penalties
  if (detail === "Missed Penalty") {
    return "❌";
  }

  if (detail === "Penalty Shootout") {
    return "🎯";
  }

  // Injury
  if (
    detail === "Injury" ||
    type === "Injury"
  ) {
    return "🤕";
  }

  // Offside
  if (
    detail === "Offside" ||
    type === "Offside"
  ) {
    return "🚩";
  }

  // Fouls
  if (
    detail === "Foul" ||
    type === "Foul"
  ) {
    return "🚫";
  }

  // Kickoff
  if (
    detail === "Kick Off" ||
    detail === "Kick-Off"
  ) {
    return "🟢";
  }

  // Half Time
  if (
    detail === "Half Time"
  ) {
    return "⏸️";
  }

  // Full Time
  if (
    detail === "Match Finished" ||
    detail === "Full Time"
  ) {
    return "🏁";
  }

  // Default
  return "📍";
}

/* ============================================================
   EVENT COLOR HELPER
============================================================ */

function getEventColor(type, detail) {
  if (type === "Goal") return "#22c55e";
  if (type === "subst" || type === "Substitution") return "#3b82f6";
  if (detail === "Yellow Card") return "#facc15";
  if (detail === "Second Yellow card") return "#facc15";
  if (detail === "Red Card") return "#ef4444";
  if (detail === "Penalty" || detail === "Penalty Shootout") return "#06b6d4";
  if (detail === "Missed Penalty") return "#f97316";
  if (type === "Var" || type === "VAR") return "#8b5cf6";
  if (type === "Injury" || detail === "Injury") return "#f43f5e";
  return "#94a3b8";
}