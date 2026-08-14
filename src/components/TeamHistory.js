"use client";

export default function TeamHistory({
  team,
  history = [],
}) {
  if (!team) return null;

  const area = team.area || {};
  const venue = team.venue || {};

  const founded =
    team.founded || "-";

  const country =
    area.name ||
    team.country ||
    "-";

  const code =
    team.tla ||
    team.shortName ||
    "-";

  const clubColors =
    team.clubColors ||
    "-";

  const venueName =
    venue.name ||
    "-";

  const venueCity =
    venue.city ||
    "-";

  const venueAddress =
    venue.address ||
    "-";

  const matches =
    Array.isArray(history)
      ? history
      : [];

  return (
    <section
      id="history"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
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
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform:
              "uppercase",
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
          📖 Club History
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Club identity, foundation,
          venue information and recent
          historical results.
        </p>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: 18,
          marginBottom: 30,
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
          icon="🏷️"
          title="Team Code"
          value={code}
          color="#f59e0b"
        />

        <HistoryCard
          icon="🎨"
          title="Club Colors"
          value={clubColors}
          color="#8b5cf6"
        />
      </div>

      {/* =================================================
          CLUB TIMELINE
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 25px",
          }}
        >
          Club Timeline
        </h3>

        <TimelineItem
          year={founded}
          title="Club Founded"
          description={`${team.name || "This club"} was established in ${founded}.`}
        />

        <TimelineItem
          year="Current"
          title="Home Stadium"
          description={
            venueName !== "-"
              ? `${venueName}${venueCity !== "-" ? ` in ${venueCity}` : ""}.`
              : "Home stadium information is unavailable."
          }
        />

        <TimelineItem
          year="Current"
          title="Club Location"
          description={`The club is based in ${country}.`}
        />

        <TimelineItem
          year="Current"
          title="Team Identity"
          description={
            clubColors !== "-"
              ? `The club colors are ${clubColors}.`
              : "Club color information is unavailable."
          }
        />

        {venueAddress !== "-" && (
          <TimelineItem
            year="Current"
            title="Stadium Address"
            description={venueAddress}
          />
        )}
      </div>

      {/* =================================================
          RECENT HISTORY
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 20px",
          }}
        >
          🕘 Recent Match History
        </h3>

        {matches.length === 0 ? (
          <p
            style={{
              color: "#94a3b8",
              margin: 0,
            }}
          >
            Recent historical matches are
            not available.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {matches
              .slice(0, 10)
              .map(
                (
                  match,
                  index
                ) => {
                  const home =
                    match?.homeTeam ||
                    {};

                  const away =
                    match?.awayTeam ||
                    {};

                  const score =
                    match?.score
                      ?.fullTime ||
                    {};

                  const date =
                    match?.utcDate
                      ? new Date(
                          match.utcDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month:
                              "short",
                            year:
                              "numeric",
                          }
                        )
                      : "-";

                  return (
                    <div
                      key={
                        match?.id ??
                        index
                      }
                      style={{
                        background:
                          "#111827",
                        borderRadius:
                          14,
                        padding: 16,
                        display:
                          "grid",
                        gridTemplateColumns:
                          "1fr auto 1fr",
                        alignItems:
                          "center",
                        gap: 12,
                        border:
                          "1px solid #293548",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        {home.name ||
                          "Home Team"}
                      </div>

                      <div
                        style={{
                          textAlign:
                            "center",
                          minWidth: 80,
                        }}
                      >
                        <div
                          style={{
                            color:
                              "#fff",
                            fontWeight:
                              900,
                          }}
                        >
                          {score.home ??
                            0}{" "}
                          -{" "}
                          {score.away ??
                            0}
                        </div>

                        <div
                          style={{
                            color:
                              "#64748b",
                            fontSize:
                              11,
                            marginTop:
                              4,
                          }}
                        >
                          {date}
                        </div>
                      </div>

                      <div
                        style={{
                          color:
                            "#fff",
                          fontWeight:
                            700,
                          textAlign:
                            "right",
                        }}
                      >
                        {away.name ||
                          "Away Team"}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        )}
      </div>

      {/* =================================================
          CLUB IDENTITY
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 18px",
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
          <strong>
            {team.name ||
              "This club"}
          </strong>{" "}
          is a professional football
          club based in{" "}
          <strong>{country}</strong>.
          {founded !== "-" &&
            ` The club was founded in ${founded}.`}
          {venueName !== "-" &&
            ` Its current home stadium is ${venueName}.`}
          {venueCity !== "-" &&
            ` The stadium is located in ${venueCity}.`}
          {clubColors !== "-" &&
            ` The club colors are ${clubColors}.`}
        </p>
      </div>

      {/* =================================================
          SOURCE
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
HISTORY CARD
===================================================== */

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
        border:
          `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          fontSize: 30,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 22,
          fontWeight: 900,
          overflowWrap:
            "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =====================================================
TIMELINE ITEM
===================================================== */

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
          fontWeight: 800,
          flexShrink: 0,
          fontSize: 13,
        }}
      >
        {year}
      </div>

      <div
        style={{
          flex: 1,
          borderLeft:
            "3px solid #22c55e",
          paddingLeft: 18,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#cbd5e1",
            lineHeight: 1.7,
            fontSize: 14,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}