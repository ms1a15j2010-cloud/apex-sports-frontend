import Image from "next/image";

export default function TeamOverview({ team }) {
  if (!team) return null;

  const area = team.area || {};
  const venue = team.venue || {};
  const coach = team.coach || {};

  const coachName =
    coach.name ||
    [coach.firstName, coach.lastName]
      .filter(Boolean)
      .join(" ");

  const players = Array.isArray(team.players)
    ? team.players
    : [];

  const fixtures = Array.isArray(team.fixtures)
    ? team.fixtures
    : [];

  const competitions = Array.isArray(
    team.competitions
  )
    ? team.competitions
    : [];

  const primaryCompetition =
    competitions[0] || null;

  const country =
    area.name ||
    team.country ||
    "-";

  return (
    <section
      id="overview"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 18,
        padding: 28,
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
            margin: 0,
            fontSize: 30,
            color: "#fff",
          }}
        >
          🏆 Club Information
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Official club information and
          current football-data.org data.
        </p>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(320px,1.3fr) minmax(280px,1fr)",
          gap: 30,
        }}
      >
        {/* =================================================
            LEFT
        ================================================= */}

        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <Row
                title="Team ID"
                value={team.id}
              />

              <Row
                title="Club Name"
                value={
                  team.name || "-"
                }
              />

              <Row
                title="Country"
                value={country}
              />

              <Row
                title="Founded"
                value={
                  team.founded || "-"
                }
              />

              <Row
                title="Team Code"
                value={
                  team.tla ||
                  team.shortName ||
                  "-"
                }
              />

              <Row
                title="Club Colors"
                value={
                  team.clubColors ||
                  "-"
                }
              />

              <Row
                title="Stadium"
                value={
                  venue.name || "-"
                }
              />

              <Row
                title="City"
                value={
                  venue.city || "-"
                }
              />

              <Row
                title="Address"
                value={
                  venue.address || "-"
                }
              />

              <Row
                title="Coach"
                value={
                  coachName || "-"
                }
              />

              <Row
                title="Competition"
                value={
                  primaryCompetition?.name ||
                  "Premier League"
                }
              />
            </tbody>
          </table>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div>
          {/* STADIUM */}

          <div
            style={{
              height: 260,
              background:
                "linear-gradient(135deg,#1f2937,#111827)",
              borderRadius: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#94a3b8",
              fontSize: 18,
              fontWeight: 700,
              border:
                "1px solid #293548",
              textAlign: "center",
              padding: 20,
            }}
          >
            🏟{" "}
            {venue.name ||
              "Stadium information unavailable"}
          </div>

          {/* QUICK FACTS */}

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns:
                "repeat(2,1fr)",
              gap: 16,
            }}
          >
            <MiniCard
              title="Coach"
              value={
                coachName ||
                "Unavailable"
              }
            />

            <MiniCard
              title="Squad"
              value={`${players.length} Players`}
            />

            <MiniCard
              title="Fixtures"
              value={`${fixtures.length}`}
            />

            <MiniCard
              title="Founded"
              value={
                team.founded ||
                "-"
              }
            />

            <MiniCard
              title="Country"
              value={country}
            />

            <MiniCard
              title="Code"
              value={
                team.tla ||
                "-"
              }
            />
          </div>
        </div>
      </div>

      {/* =================================================
          ABOUT CLUB
      ================================================= */}

      <div
        style={{
          marginTop: 30,
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 14,
          }}
        >
          About the Club
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          <strong>
            {team.name ||
              "This club"}
          </strong>{" "}
          is a football club based in{" "}
          <strong>{country}</strong>.
          {team.founded
            ? ` The club was founded in ${team.founded}.`
            : ""}
          {venue.name
            ? ` Its home venue is ${venue.name}.`
            : ""}
          {coachName
            ? ` The current head coach is ${coachName}.`
            : ""}
          {primaryCompetition?.name
            ? ` The club is currently associated with ${primaryCompetition.name}.`
            : ""}
        </p>
      </div>

      {/* =================================================
          DATA SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          display: "flex",
          justifyContent:
            "space-between",
          gap: 12,
          flexWrap: "wrap",
          color: "#64748b",
          fontSize: 12,
        }}
      >
        <span>
          Source: football-data.org
        </span>

        <span>
          Team ID: {team.id ?? "-"}
        </span>
      </div>
    </section>
  );
}

/* =====================================================
ROW
===================================================== */

function Row({ title, value }) {
  return (
    <tr
      style={{
        borderBottom:
          "1px solid #1f2937",
      }}
    >
      <td
        style={{
          padding: "14px 0",
          color: "#94a3b8",
          width: 180,
          verticalAlign: "top",
          fontSize: 14,
        }}
      >
        {title}
      </td>

      <td
        style={{
          padding: "14px 0",
          color: "#fff",
          fontWeight: 600,
          overflowWrap: "anywhere",
        }}
      >
        {value || "-"}
      </td>
    </tr>
  );
}

/* =====================================================
MINI CARD
===================================================== */

function MiniCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding: 18,
        textAlign: "center",
        border:
          "1px solid #293548",
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
          fontWeight: 800,
          fontSize: 18,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  );
}