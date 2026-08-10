"use client";

export default function PlayerHistory({
  player,
}) {
  if (!player) return null;

  const birthDate =
    player.birth?.date || "-";

  const birthPlace = [
    player.birth?.place,
    player.birth?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const age =
    player.age ||
    player.birth?.age ||
    "-";

  const nationality =
    player.nationality ||
    player.country ||
    "-";

  const height =
    player.height || "-";

  const weight =
    player.weight || "-";

  const position =
    player.position || "-";

  const club =
    player.team?.name ||
    player.club?.name ||
    "-";

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
          marginBottom: 28,
        }}
      >
        📖 Player History
      </h2>

      {/* Timeline */}

      <div
        style={{
          display: "grid",
          gap: 22,
        }}
      >
        <TimelineCard
          title="Birth"
          icon="👶"
        >
          <p>
            <strong>Date:</strong>{" "}
            {birthDate}
          </p>

          <p>
            <strong>Place:</strong>{" "}
            {birthPlace || "-"}
          </p>
        </TimelineCard>

        <TimelineCard
          title="Nationality"
          icon="🌍"
        >
          <p>
            <strong>Country:</strong>{" "}
            {nationality}
          </p>
        </TimelineCard>

        <TimelineCard
          title="Professional Career"
          icon="⚽"
        >
          <p>
            <strong>
              Current Club:
            </strong>{" "}
            {club}
          </p>

          <p>
            <strong>
              Position:
            </strong>{" "}
            {position}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {age}
          </p>
        </TimelineCard>

        <TimelineCard
          title="Physical Profile"
          icon="💪"
        >
          <p>
            <strong>
              Height:
            </strong>{" "}
            {height}
          </p>

          <p>
            <strong>
              Weight:
            </strong>{" "}
            {weight}
          </p>
        </TimelineCard>
      </div>

      {/* Biography */}

      <div
        style={{
          marginTop: 35,
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 18,
          }}
        >
          Career Overview
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          <strong>
            {player.name}
          </strong>{" "}
          is a professional football
          player representing{" "}
          <strong>{club}</strong>.

          {player.position &&
            ` He primarily plays as a ${player.position}.`}

          {player.nationality &&
            ` He represents ${player.nationality}.`}

          {player.age &&
            ` At ${player.age} years old, he continues to build his professional football career.`}

          {" "}
          Player information,
          statistics and history are
          automatically synchronized
          from the football data
          provider to ensure current
          and accurate records.
        </p>
      </div>
    </section>
  );
}

function TimelineCard({
  title,
  icon,
  children,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 22,
        borderLeft:
          "5px solid #22c55e",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 15,
        }}
      >
        <span
          style={{
            fontSize: 28,
          }}
        >
          {icon}
        </span>

        <h3
          style={{
            color: "#fff",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      <div
        style={{
          color: "#cbd5e1",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}