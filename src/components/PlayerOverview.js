"use client";

export default function PlayerOverview({ player }) {
  if (!player) return null;

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
          marginBottom: 25,
        }}
      >
        📋 Player Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: 20,
        }}
      >
        <InfoCard
          title="Player ID"
          value={player.id || "-"}
        />

        <InfoCard
          title="Full Name"
          value={player.name || "-"}
        />

        <InfoCard
          title="First Name"
          value={player.firstname || "-"}
        />

        <InfoCard
          title="Last Name"
          value={player.lastname || "-"}
        />

        <InfoCard
          title="Nationality"
          value={player.nationality || "-"}
        />

        <InfoCard
          title="Age"
          value={player.age || "-"}
        />

        <InfoCard
          title="Height"
          value={player.height || "-"}
        />

        <InfoCard
          title="Weight"
          value={player.weight || "-"}
        />

        <InfoCard
          title="Position"
          value={player.position || "-"}
        />

        <InfoCard
          title="Jersey Number"
          value={player.number || "-"}
        />

        <InfoCard
          title="Current Club"
          value={player.team?.name || "-"}
        />

        <InfoCard
          title="Country"
          value={player.team?.country || "-"}
        />

        <InfoCard
          title="Birth Date"
          value={player.birth?.date || "-"}
        />

        <InfoCard
          title="Birth Place"
          value={[
            player.birth?.place,
            player.birth?.country,
          ]
            .filter(Boolean)
            .join(", ") || "-"}
        />

        <InfoCard
          title="Captain"
          value={player.captain ? "Yes" : "No"}
        />

        <InfoCard
          title="Injured"
          value={player.injured ? "Yes" : "No"}
        />
      </div>

      <div
        style={{
          marginTop: 30,
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 15,
          }}
        >
          About Player
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          <strong>{player.name}</strong> currently plays for{" "}
          <strong>{player.team?.name || "-"}</strong> as a{" "}
          <strong>{player.position || "-"}</strong>. He represents{" "}
          <strong>{player.nationality || "-"}</strong> and all player
          information is automatically synchronized with the football
          data provider.
        </p>
      </div>
    </section>
  );
}

function InfoCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}