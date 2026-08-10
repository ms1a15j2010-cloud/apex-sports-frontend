"use client";

export default function TeamHistory({ team }) {
  if (!team) return null;

  const founded = team.founded || "-";
  const country = team.country || "-";
  const code = team.code || "-";
  const national = team.national ? "Yes" : "No";

  const venue = team.venue || {};

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
          marginBottom: 30,
        }}
      >
        📖 Club History
      </h2>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <HistoryCard
          icon="📅"
          title="Founded"
          value={founded}
          color="#3b82f6"
        />

        <HistoryCard
          icon="🌍"
          title="Country"
          value={country}
          color="#22c55e"
        />

        <HistoryCard
          icon="🏷"
          title="Team Code"
          value={code}
          color="#f59e0b"
        />

        <HistoryCard
          icon="🇳"
          title="National Team"
          value={national}
          color="#8b5cf6"
        />
      </div>

      {/* Timeline */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 25,
          }}
        >
          Club Timeline
        </h3>

        <TimelineItem
          year={founded}
          title="Club Founded"
          description={`${team.name} was officially established.`}
        />

        <TimelineItem
          year={venue.name || "-"}
          title="Home Stadium"
          description={`${venue.name || "Unknown Stadium"} in ${
            venue.city || "Unknown City"
          }`}
        />

        <TimelineItem
          year={country}
          title="Country"
          description={`Represents ${country}.`}
        />

        <TimelineItem
          year={venue.capacity || "-"}
          title="Current Stadium Capacity"
          description={
            venue.capacity
              ? `${venue.capacity.toLocaleString()} spectators`
              : "Unknown"
          }
        />
      </div>

      {/* Club Identity */}

      <div
        style={{
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
          Club Identity
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          <strong>{team.name}</strong> is a professional football
          club based in <strong>{country}</strong>. The club was
          founded in <strong>{founded}</strong> and currently plays
          its home matches at{" "}
          <strong>{venue.name || "-"}</strong>, located in{" "}
          <strong>{venue.city || "-"}</strong>.

          <br />
          <br />

          Throughout its history, the club has built its identity
          through domestic competitions, international tournaments,
          talented players, and passionate supporters. Information
          shown on this page is automatically synchronized with the
          football data provider whenever new historical information
          becomes available.
        </p>
      </div>
    </section>
  );
}

function HistoryCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 22,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 34,
          marginBottom: 14,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  description,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        marginBottom: 22,
      }}
    >
      <div
        style={{
          width: 90,
          color: "#22c55e",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        {year}
      </div>

      <div
        style={{
          flex: 1,
          borderLeft: "3px solid #22c55e",
          paddingLeft: 18,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: "bold",
            marginBottom: 6,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#cbd5e1",
            lineHeight: 1.7,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}