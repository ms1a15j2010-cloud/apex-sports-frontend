"use client";

function getStrictnessColor(yellow = 0) {
  if (yellow >= 5) return "#dc2626";
  if (yellow >= 4) return "#f97316";
  if (yellow >= 3) return "#facc15";
  return "#22c55e";
}

function getExperience(matches = 0) {
  if (matches >= 500) return "Elite FIFA Referee";
  if (matches >= 300) return "International Referee";
  if (matches >= 150) return "Experienced Referee";
  return "Professional Referee";
}

export default function RefereeCard({
  referee,
}) {
  if (!referee) return null;

  const accent = getStrictnessColor(
    Number(referee.yellowCards || 0)
  );

  const experience = getExperience(
    Number(referee.matches || 0)
  );

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 28,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
          fontSize: 28,
        }}
      >
        👨‍⚖️ Match Referee
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "320px 1fr",
          gap: 28,
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {/* Referee Profile */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 24,
            textAlign: "center",
            border: `2px solid ${accent}`,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              margin: "0 auto 18px",
              borderRadius: "50%",
              background: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
            }}
          >
            👨‍⚖️
          </div>

          <h3
            style={{
              color: "#fff",
              fontSize: 26,
              marginBottom: 10,
            }}
          >
            {referee.name || "Unknown"}
          </h3>

          <div
            style={{
              display: "inline-block",
              background: accent,
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 30,
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            {experience}
          </div>

          <div
            style={{
              color: "#cbd5e1",
              fontSize: 16,
            }}
          >
            🌍{" "}
            {referee.country ||
              "Unknown Country"}
          </div>
        </div>

        {/* Quick Summary */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: 18,
          }}
        >
                      <StatCard
            icon="🏟️"
            title="Matches"
            value={
              referee.matches || "-"
            }
            color="#22c55e"
          />

          <StatCard
            icon="🟨"
            title="Yellow / Match"
            value={
              referee.yellowCards || "-"
            }
            color="#eab308"
          />

          <StatCard
            icon="🟥"
            title="Red / Match"
            value={
              referee.redCards || "-"
            }
            color="#ef4444"
          />

          <StatCard
            icon="🎯"
            title="Penalties"
            value={
              referee.penalties || "-"
            }
            color="#3b82f6"
          />
        </div>
      </div>

      {/* Referee Tendencies */}

      <div
        style={{
          display: "grid",
          gap: 22,
        }}
      >
        <ProgressBar
          title="Yellow Card Strictness"
          value={
            Number(
              referee.yellowCards || 0
            )
          }
          max={6}
          color="#eab308"
        />

        <ProgressBar
          title="Red Card Strictness"
          value={
            Number(
              referee.redCards || 0
            )
          }
          max={1}
          color="#ef4444"
        />

        <ProgressBar
          title="Penalty Frequency"
          value={
            Number(
              referee.penalties || 0
            )
          }
          max={1}
          color="#3b82f6"
        />

        <ProgressBar
          title="Experience"
          value={
            Number(
              referee.matches || 0
            )
          }
          max={600}
          color="#22c55e"
        />
      </div>

      <div
        style={{
          marginTop: 28,
          background: "#1f2937",
          borderLeft: `5px solid ${accent}`,
          borderRadius: 14,
          padding: 20,
          color: "#cbd5e1",
          lineHeight: 1.7,
        }}
      >
        <strong
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 8,
          }}
        >
          📋 Referee Analysis
        </strong>

        This referee has officiated{" "}
        <strong>
          {referee.matches || "-"}
        </strong>{" "}
        professional matches, averaging{" "}
        <strong>
          {referee.yellowCards || "-"}
        </strong>{" "}
        yellow cards,
        <strong>
          {" "}
          {referee.redCards || "-"}
        </strong>{" "}
        red cards and{" "}
        <strong>
          {referee.penalties || "-"}
        </strong>{" "}
        penalties per match.
      </div>
          </section>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 16,
        padding: 18,
        border: `2px solid ${color}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({
  title,
  value,
  max,
  color,
}) {
  const percent = Math.min(
    (value / max) * 100,
    100
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        <span>{title}</span>

        <span>
          {typeof value === "number"
            ? value.toFixed(1)
            : value}
        </span>
      </div>

      <div
        style={{
          height: 14,
          borderRadius: 50,
          overflow: "hidden",
          background: "#374151",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
            transition: ".4s ease",
          }}
        />
      </div>
    </div>
  );
}