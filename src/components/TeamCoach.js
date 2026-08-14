"use client";

export default function TeamCoach({ coach }) {
  if (!coach) {
    return (
      <section
        style={{
          background:
            "linear-gradient(145deg,#111827,#0f172a)",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
          border: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: "0 0 20px",
          }}
        >
          👔 Head Coach
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Coach information unavailable.
        </p>
      </section>
    );
  }

  const coachName =
    coach.name ||
    [coach.firstName, coach.lastName]
      .filter(Boolean)
      .join(" ") ||
    "Unknown Coach";

  const firstName =
    coach.firstName ||
    "-";

  const lastName =
    coach.lastName ||
    "-";

  const nationality =
    coach.nationality ||
    "-";

  const birthDate =
    coach.dateOfBirth ||
    "-";

  return (
    <section
      id="coach"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border: "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          👔 Head Coach
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Current coaching information
          provided by football-data.org.
        </p>
      </div>

      {/* =================================================
          COACH CONTENT
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(260px,320px) 1fr",
          gap: 30,
          alignItems: "stretch",
        }}
      >
        {/* LEFT PROFILE */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            textAlign: "center",
            border: "1px solid #293548",
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              margin: "0 auto",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#111827,#293548)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:
                "3px solid #22c55e",
              color: "#22c55e",
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            {coachName
              .slice(0, 1)
              .toUpperCase()}
          </div>

          <h2
            style={{
              margin:
                "20px 0 6px",
              color: "#fff",
              fontSize: 24,
            }}
          >
            {coachName}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            Head Coach
          </p>
        </div>

        {/* RIGHT INFORMATION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(210px,1fr))",
            gap: 16,
          }}
        >
          <InfoCard
            title="Coach ID"
            value={
              coach.id ?? "-"
            }
          />

          <InfoCard
            title="First Name"
            value={firstName}
          />

          <InfoCard
            title="Last Name"
            value={lastName}
          />

          <InfoCard
            title="Nationality"
            value={nationality}
          />

          <InfoCard
            title="Date of Birth"
            value={birthDate}
          />
        </div>
      </div>

      {/* =================================================
          PROFILE SUMMARY
      ================================================= */}

      <div
        style={{
          marginTop: 30,
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          border: "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin: "0 0 15px",
          }}
        >
          Coach Profile
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          <strong>{coachName}</strong>{" "}
          is the current head coach
          associated with this football
          club.
          {nationality !== "-" &&
            ` The coach is from ${nationality}.`}
          {birthDate !== "-" &&
            ` The recorded date of birth is ${birthDate}.`}
        </p>
      </div>

      {/* =================================================
          DATA SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
          fontSize: 12,
        }}
      >
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
INFO CARD
===================================================== */

function InfoCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 20,
        border: "1px solid #293548",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: 800,
          overflowWrap: "anywhere",
        }}
      >
        {value ?? "-"}
      </div>
    </div>
  );
}