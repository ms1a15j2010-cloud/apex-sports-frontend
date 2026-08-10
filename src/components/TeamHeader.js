import Image from "next/image";

export default function TeamHeader({ team }) {
  if (!team) return null;

  const coach = team.coach || {};
  const venue = team.venue || {};

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          alignItems: "center",
        }}
      >
        {/* Team Logo */}

        <div
          style={{
            width: 140,
            height: 140,
            background: "#1f2937",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={team.logo || "/team.png"}
            alt={team.name}
            width={110}
            height={110}
            priority
          />
        </div>

        {/* Team Information */}

        <div
          style={{
            flex: 1,
            minWidth: 260,
          }}
        >
          <h1
            style={{
              fontSize: 40,
              marginBottom: 10,
              color: "#fff",
            }}
          >
            {team.name}
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(170px,1fr))",
              gap: 12,
              color: "#cbd5e1",
              marginTop: 15,
            }}
          >
            <Info label="Country" value={team.country} />

            <Info label="Founded" value={team.founded} />

            <Info label="Code" value={team.code || "-"} />

            <Info
              label="National"
              value={team.national ? "Yes" : "No"}
            />
          </div>
        </div>

        {/* Coach */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            minWidth: 260,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: 16,
              color: "#fff",
            }}
          >
            👔 Head Coach
          </h3>

          {coach?.name ? (
            <>
              <div
                style={{
                  display: "flex",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <Image
                  src={coach.photo || "/coach.png"}
                  alt={coach.name}
                  width={70}
                  height={70}
                  style={{
                    borderRadius: "50%",
                  }}
                />

                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {coach.name}
                  </div>

                  <div
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    {coach.nationality || "-"}
                  </div>

                  <div
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    Age {coach.age || "-"}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p style={{ color: "#94a3b8" }}>
              Coach information unavailable.
            </p>
          )}
        </div>
      </div>

      {/* ================= STADIUM ================= */}

      <div
        style={{
          marginTop: 35,
          display: "grid",
          gridTemplateColumns:
            "minmax(320px,1fr) minmax(280px,360px)",
          gap: 25,
        }}
      >
        {/* Stadium Image */}

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 280,
            borderRadius: 18,
            overflow: "hidden",
            background: "#1f2937",
          }}
        >
          <Image
            src={venue.image || "/stadium.jpg"}
            alt={venue.name || "Stadium"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {/* Stadium Details */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 18,
              color: "#fff",
            }}
          >
            🏟 Stadium
          </h2>

          <Info
            label="Name"
            value={venue.name || "-"}
          />

          <Info
            label="City"
            value={venue.city || "-"}
          />

          <Info
            label="Address"
            value={venue.address || "-"}
          />

          <Info
            label="Surface"
            value={venue.surface || "-"}
          />

          <Info
            label="Capacity"
            value={
              venue.capacity
                ? venue.capacity.toLocaleString()
                : "-"
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENT ================= */

function Info({ label, value }) {
  return (
    <div
      style={{
        marginBottom: 12,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 3,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}