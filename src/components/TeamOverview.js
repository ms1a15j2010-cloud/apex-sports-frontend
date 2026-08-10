import Image from "next/image";

export default function TeamOverview({ team }) {
  if (!team) return null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          marginBottom: 25,
          fontSize: 30,
          color: "#fff",
        }}
      >
        🏆 Club Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 30,
        }}
      >
        {/* LEFT */}

        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <Row title="Team ID" value={team.id} />
              <Row title="Club Name" value={team.name} />
              <Row title="Country" value={team.country} />
              <Row title="Founded" value={team.founded} />
              <Row title="Code" value={team.code || "-"} />
              <Row
                title="National Team"
                value={team.national ? "Yes" : "No"}
              />
              <Row
                title="Stadium"
                value={team.venue?.name || "-"}
              />
              <Row
                title="City"
                value={team.venue?.city || "-"}
              />
              <Row
                title="Capacity"
                value={
                  team.venue?.capacity
                    ? team.venue.capacity.toLocaleString()
                    : "-"
                }
              />
            </tbody>
          </table>
        </div>

        {/* RIGHT */}

        <div>
          {team.venue?.image ? (
            <Image
              src={team.venue.image}
              alt={team.venue.name}
              width={500}
              height={320}
              style={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                borderRadius: 15,
              }}
            />
          ) : (
            <div
              style={{
                height: 260,
                background: "#1f2937",
                borderRadius: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#94a3b8",
                fontSize: 18,
              }}
            >
              Stadium Image Unavailable
            </div>
          )}

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 16,
            }}
          >
            <MiniCard
              title="Coach"
              value={
                team.coach?.name || "Unknown"
              }
            />

            <MiniCard
              title="Squad"
              value={`${team.players?.length || 0} Players`}
            />

            <MiniCard
              title="Fixtures"
              value={`${team.fixtures?.length || 0}`}
            />

            <MiniCard
              title="Transfers"
              value={`${team.transfers?.length || 0}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ title, value }) {
  return (
    <tr
      style={{
        borderBottom: "1px solid #1f2937",
      }}
    >
      <td
        style={{
          padding: "14px 0",
          color: "#94a3b8",
          width: 180,
        }}
      >
        {title}
      </td>

      <td
        style={{
          padding: "14px 0",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {value}
      </td>
    </tr>
  );
}

function MiniCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding: 18,
        textAlign: "center",
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
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {value}
      </div>
    </div>
  );
}