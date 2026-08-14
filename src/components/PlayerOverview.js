"use client";

export default function PlayerOverview({
  player,
}) {
  if (!player) return null;

  const statistics =
    Array.isArray(player.statistics)
      ? player.statistics[0] || {}
      : {};

  const league =
    statistics.league || {};

  const team =
    player.team ||
    statistics.team ||
    {};

  const games =
    statistics.games || {};

  const birthDate =
    player.birth?.date || "-";

  const birthPlace = [
    player.birth?.place,
    player.birth?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const age =
    player.age ??
    calculateAge(
      player.birth?.date
    );

  const nationality =
    player.nationality ||
    "-";

  const position =
    player.position ||
    games.position ||
    "-";

  const number =
    player.number ??
    games.number ??
    "-";

  const appearances =
    games.appearances ??
    games.appearences ??
    0;

  const goals =
    statistics.goals?.total ??
    0;

  const assists =
    statistics.goals?.assists ??
    0;

  return (
    <section
      style={{
        background:
          "linear-gradient(145deg, #111827, #0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
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
            fontSize: 26,
          }}
        >
          📋 Player Overview
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Profile information and
          current-season details for{" "}
          {player.name ||
            "this player"}.
        </p>
      </div>

      {/* =================================================
          PROFILE INFORMATION
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
        }}
      >
        <InfoCard
          title="Player ID"
          value={
            player.id ?? "-"
          }
        />

        <InfoCard
          title="Full Name"
          value={
            player.name || "-"
          }
        />

        <InfoCard
          title="First Name"
          value={
            player.firstname ||
            "-"
          }
        />

        <InfoCard
          title="Last Name"
          value={
            player.lastname ||
            "-"
          }
        />

        <InfoCard
          title="Nationality"
          value={
            nationality
          }
        />

        <InfoCard
          title="Age"
          value={
            age ?? "-"
          }
        />

        <InfoCard
          title="Position"
          value={
            position
          }
        />

        <InfoCard
          title="Jersey Number"
          value={
            number ?? "-"
          }
        />

        <InfoCard
          title="Current Club"
          value={
            team?.name ||
            "-"
          }
        />

        <InfoCard
          title="Competition"
          value={
            league?.name ||
            "Premier League"
          }
        />

        <InfoCard
          title="Season"
          value={
            league?.season ||
            "-"
          }
        />

        <InfoCard
          title="Birth Date"
          value={
            birthDate
          }
        />

        <InfoCard
          title="Birth Place"
          value={
            birthPlace ||
            "-"
          }
        />

        <InfoCard
          title="Appearances"
          value={
            appearances
          }
        />

        <InfoCard
          title="Goals"
          value={
            goals
          }
          highlight
        />

        <InfoCard
          title="Assists"
          value={
            assists
          }
        />
      </div>

      {/* =================================================
          AVAILABLE PERSONAL DATA
      ================================================= */}

      {(player.height ||
        player.weight) && (
        <>
          <div
            style={{
              marginTop: 25,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: 16,
            }}
          >
            {player.height && (
              <InfoCard
                title="Height"
                value={
                  player.height
                }
              />
            )}

            {player.weight && (
              <InfoCard
                title="Weight"
                value={
                  player.weight
                }
              />
            )}
          </div>
        </>
      )}

      {/* =================================================
          ABOUT PLAYER
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
            marginBottom: 15,
          }}
        >
          About Player
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          <strong>
            {player.name ||
              "This player"}
          </strong>{" "}
          is a professional football
          player currently associated
          with{" "}
          <strong>
            {team?.name ||
              "their club"}
          </strong>
          . The player is listed as a{" "}
          <strong>
            {position}
          </strong>{" "}
          and represents{" "}
          <strong>
            {nationality}
          </strong>
          .
          {age
            ? ` The current recorded age is ${age}.`
            : ""}
          {league?.season
            ? ` This profile is using ${league?.name || "league"} season ${league.season}.`
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
          Source:
          football-data.org
        </span>

        <span>
          Player ID:{" "}
          {player.id ?? "-"}
        </span>
      </div>
    </section>
  );
}

/* =====================================================
AGE CALCULATOR
===================================================== */

function calculateAge(
  birthDate
) {
  if (!birthDate) {
    return null;
  }

  const birth =
    new Date(birthDate);

  if (
    Number.isNaN(
      birth.getTime()
    )
  ) {
    return null;
  }

  const today =
    new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    today.getMonth() -
    birth.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() <
        birth.getDate()
    )
  ) {
    age--;
  }

  return age;
}

/* =====================================================
INFO CARD
===================================================== */

function InfoCard({
  title,
  value,
  highlight = false,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 18,
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
          color: highlight
            ? "#22c55e"
            : "#fff",
          fontSize: 20,
          fontWeight: 800,
          overflowWrap:
            "anywhere",
        }}
      >
        {value ?? "-"}
      </div>
    </div>
  );
}