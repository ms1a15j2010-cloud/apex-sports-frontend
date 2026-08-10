"use client";

import Image from "next/image";

export default function MatchEvents({
  events = [],
}) {
  if (!events || events.length === 0) {
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
            marginBottom: 20,
          }}
        >
          📝 Match Events
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          No match events available.
        </p>
      </section>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => {
      const aTime =
        (a.time?.elapsed || 0) * 100 +
        (a.time?.extra || 0);

      const bTime =
        (b.time?.elapsed || 0) * 100 +
        (b.time?.extra || 0);

      return aTime - bTime;
    }
  );

  return (
    <section
    className="match-events"
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
        📝 Match Events
      </h2>

      <div
      className="events-list"
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {sortedEvents.map(
          (event, index) => (
            <EventCard
              key={`${event.time?.elapsed}-${index}`}
              event={event}
            />
          )
        )}
      </div>
    </section>
  );
}

function EventCard({
  event,
}) {
  const minute =
    event.time?.elapsed || 0;

  const extra =
    event.time?.extra;

  const team =
    event.team || {};

  const player =
    event.player || {};

  const assist =
    event.assist || {};

  const type =
    event.type || "";

  const detail =
    event.detail || "";

  const comments =
    event.comments || "";

  const icon =
    getEventIcon(
      type,
      detail
    );

  return (
    <div
     className="event-card"
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 20,
      }}
    >
      {/* Top */}

      <div
       className="event-header"
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 18,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
         className="event-team"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Image
            src={
              team.logo ||
              "/team.png"
            }
            alt={
              team.name ||
              "Team"
            }
            width={34}
            height={34}
          />

          <strong
            style={{
              color: "#fff",
            }}
          >
            {team.name}
          </strong>
        </div>

        <div
         className="event-minute"
          style={{
            background:
              "#22c55e",
            color: "#fff",
            padding:
              "6px 14px",
            borderRadius: 40,
            fontWeight: "bold",
          }}
        >
          {minute}'
          {extra
            ? `+${extra}`
            : ""}
        </div>
      </div>

      {/* Body */}

      <div
       className="event-body"
        style={{
          display: "grid",
          gridTemplateColumns:
            "60px 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div
         className="event-icon"
          style={{
            fontSize: 32,
            textAlign: "center",
          }}
        >
          {icon}
        </div>

        <div>
          <div
          className="event-details"
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            {type}
          </div>

          <div
           className="event-player"
            style={{
              color: "#cbd5e1",
              marginBottom: 8,
            }}
          >
            <strong>
              Player:
            </strong>{" "}
            {player.name ||
              "-"}
          </div>

          {assist.name && (
            <div
             className="event-assist"
              style={{
                color: "#60a5fa",
                marginBottom: 8,
              }}
            >
              <strong>
                Assist:
              </strong>{" "}
              {assist.name}
            </div>
          )}

          {detail && (
            <div
             className="event-detail"
              style={{
                color: "#fbbf24",
                marginBottom: 8,
              }}
            >
              <strong>
                Detail:
              </strong>{" "}
              {detail}
            </div>
          )}

          {comments ? (
            <div
              className="event-comments"
              style={{
                color: "#94a3b8",
              }}
            >
              {comments}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getEventIcon(type, detail) {
  switch (type) {
    case "Goal":
      if (detail === "Own Goal") return "🥅";
      if (detail === "Penalty") return "🎯";
      return "⚽";

    case "Card":
      if (detail === "Yellow Card") return "🟨";
      if (detail === "Second Yellow card") return "🟨🟥";
      if (detail === "Red Card") return "🟥";
      return "🟨";

    case "Substitution":
      return "🔄";

    case "Var":
      return "📺";

    default:
      if (detail === "Missed Penalty") return "❌";
      return "📍";
  }
}