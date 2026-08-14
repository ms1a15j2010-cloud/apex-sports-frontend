"use client";

export default function PlayerHistory({
  player,
  history = [],
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
    player.position ||
    player.statistics?.[0]?.games?.position ||
    "-";

  const club =
    player.team?.name ||
    player.club?.name ||
    player.statistics?.[0]?.team?.name ||
    "-";

  const season =
    player.statistics?.[0]?.league?.season ||
    "-";

  const competition =
    player.statistics?.[0]?.league?.name ||
    "Premier League";

  const appearances =
    player.statistics?.[0]?.games?.appearances ??
    player.statistics?.[0]?.games?.appearences ??
    0;

  const goals =
    player.statistics?.[0]?.goals?.total ??
    0;

  const assists =
    player.statistics?.[0]?.goals?.assists ??
    0;

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
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 28,
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
          📖 Player History
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Personal and professional history
          currently available for{" "}
          {player.name || "this player"}.
        </p>
      </div>

      {/* =================================================
          HISTORY TIMELINE
      ================================================= */}

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {/* BIRTH */}

        <TimelineCard
          title="Birth"
          icon="👶"
        >
          <HistoryRow
            label="Date"
            value={birthDate}
          />

          <HistoryRow
            label="Place"
            value={birthPlace || "-"}
          />
        </TimelineCard>

        {/* NATIONALITY */}

        <TimelineCard
          title="Nationality"
          icon="🌍"
        >
          <HistoryRow
            label="Country"
            value={nationality}
          />
        </TimelineCard>

        {/* PROFESSIONAL CAREER */}

        <TimelineCard
          title="Professional Career"
          icon="⚽"
        >
          <HistoryRow
            label="Current Club"
            value={club}
          />

          <HistoryRow
            label="Position"
            value={position}
          />

          <HistoryRow
            label="Age"
            value={age}
          />

          <HistoryRow
            label="Competition"
            value={competition}
          />

          <HistoryRow
            label="Season"
            value={season}
          />
        </TimelineCard>

        {/* CURRENT SEASON */}

        <TimelineCard
          title="Current Season"
          icon="🏆"
        >
          <HistoryRow
            label="Appearances"
            value={appearances}
          />

          <HistoryRow
            label="Goals"
            value={goals}
          />

          <HistoryRow
            label="Assists"
            value={assists}
          />
        </TimelineCard>

        {/* PHYSICAL PROFILE */}

        <TimelineCard
          title="Physical Profile"
          icon="💪"
        >
          <HistoryRow
            label="Height"
            value={height}
          />

          <HistoryRow
            label="Weight"
            value={weight}
          />
        </TimelineCard>
      </div>

      {/* =================================================
          MATCH HISTORY
      ================================================= */}

      {Array.isArray(history) &&
        history.length > 0 && (
          <div
            style={{
              marginTop: 35,
            }}
          >
            <h3
              style={{
                color: "#fff",
                marginBottom: 18,
              }}
            >
              Recent Match History
            </h3>

            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {history
                .slice(0, 10)
                .map((match, index) => (
                  <MatchHistoryCard
                    key={
                      match?.id ||
                      index
                    }
                    match={match}
                  />
                ))}
            </div>
          </div>
        )}

      {/* =================================================
          CAREER OVERVIEW
      ================================================= */}

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
            {player.name ||
              "This player"}
          </strong>{" "}
          is a professional football player
          currently associated with{" "}
          <strong>{club}</strong>.
          {position !== "-" &&
            ` The player is listed as a ${position}.`}
          {nationality !== "-" &&
            ` The player represents ${nationality}.`}
          {age !== "-" &&
            ` The current recorded age is ${age}.`}
          {season !== "-" &&
            ` The available season data is from ${competition}, season ${season}.`}
        </p>
      </div>
    </section>
  );
}

/* =====================================================
TIMELINE CARD
===================================================== */

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
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 26,
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
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* =====================================================
HISTORY ROW
===================================================== */

function HistoryRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        gap: 20,
        padding:
          "10px 0",
        borderBottom:
          "1px solid #293548",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#fff",
          textAlign: "right",
          fontSize: 14,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =====================================================
MATCH HISTORY CARD
===================================================== */

function MatchHistoryCard({
  match,
}) {
  const home =
    match?.homeTeam?.name ||
    match?.teams?.home?.name ||
    "Home";

  const away =
    match?.awayTeam?.name ||
    match?.teams?.away?.name ||
    "Away";

  const date =
    match?.utcDate ||
    match?.fixture?.date ||
    null;

  const status =
    match?.status ||
    match?.fixture?.status?.short ||
    "";

  const homeScore =
    match?.score?.fullTime?.home ??
    match?.goals?.home ??
    null;

  const awayScore =
    match?.score?.fullTime?.away ??
    match?.goals?.away ??
    null;

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 14,
        padding: 16,
        border: "1px solid #293548",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          gap: 15,
        }}
      >
        <strong
          style={{
            color: "#fff",
            textAlign: "left",
          }}
        >
          {home}
        </strong>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
            }}
          >
            {homeScore ?? "-"}
            {" - "}
            {awayScore ?? "-"}
          </div>

          <div
            style={{
              color:
                status === "FINISHED" ||
                status === "FT"
                  ? "#22c55e"
                  : "#f59e0b",
              fontSize: 11,
              marginTop: 4,
              textTransform:
                "uppercase",
            }}
          >
            {status ||
              "Unknown"}
          </div>
        </div>

        <strong
          style={{
            color: "#fff",
            textAlign: "right",
          }}
        >
          {away}
        </strong>
      </div>

      {date && (
        <div
          style={{
            marginTop: 10,
            color: "#64748b",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {new Date(
            date
          ).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </div>
      )}
    </div>
  );
}