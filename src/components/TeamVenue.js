"use client";

export default function TeamVenue({
  venue,
}) {
  if (!venue) return null;

  return (
    <section
      id="venue"
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
            margin: 0,
            color: "#fff",
            fontSize: 28,
          }}
        >
          🏟 Stadium Information
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Official venue information available
          from football-data.org.
        </p>
      </div>

      {/* =================================================
          VENUE LAYOUT
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(280px,1fr) minmax(280px,1fr)",
          gap: 25,
          alignItems: "stretch",
        }}
      >
        {/* =================================================
            VISUAL PANEL
        ================================================= */}

        <div
          style={{
            minHeight: 280,
            borderRadius: 18,
            background:
              "linear-gradient(135deg,#1f2937,#111827)",
            border: "1px solid #293548",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 64,
                marginBottom: 15,
              }}
            >
              🏟️
            </div>

            <h3
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 24,
              }}
            >
              {venue.name ||
                "Stadium"}
            </h3>

            <p
              style={{
                margin:
                  "8px 0 0",
                color: "#94a3b8",
                fontSize: 14,
              }}
            >
              {venue.city ||
                "City unavailable"}
            </p>
          </div>
        </div>

        {/* =================================================
            DETAILS
        ================================================= */}

        <div>
          <StatRow
            title="Stadium Name"
            value={
              venue.name || "-"
            }
          />

          <StatRow
            title="City"
            value={
              venue.city || "-"
            }
          />

          <StatRow
            title="Address"
            value={
              venue.address || "-"
            }
          />

          <StatRow
            title="Capacity"
            value={
              venue.capacity
                ? Number(
                    venue.capacity
                  ).toLocaleString()
                : "Not provided"
            }
          />

          <StatRow
            title="Surface"
            value={
              venue.surface ||
              "Not provided"
            }
          />
        </div>
      </div>

      {/* =================================================
          SOURCE NOTE
      ================================================= */}

      <div
        style={{
          marginTop: 20,
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
STAT ROW
===================================================== */

function StatRow({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding: 18,
        marginBottom: 14,
        border:
          "1px solid #293548",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 6,
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          overflowWrap:
            "anywhere",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}