"use client";

import Image from "next/image";

export default function TeamHeader({ team }) {
  if (!team) return null;

  const coach = team.coach || {};
  const venue = team.venue || {};
  const area = team.area || {};

  const teamLogo =
    team.logo ||
    team.crest ||
    null;

  const coachName =
    coach.name ||
    [coach.firstName, coach.lastName]
      .filter(Boolean)
      .join(" ");

  return (
    <section
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border: "1px solid #1e293b",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.35)",
      }}
    >
      {/* =================================================
          TEAM HEADER
      ================================================= */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          alignItems: "center",
        }}
      >
        {/* TEAM LOGO */}

        <div
          style={{
            width: 140,
            height: 140,
            background: "#1f2937",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            border:
              "1px solid #293548",
          }}
        >
          {teamLogo ? (
            <Image
              src={teamLogo}
              alt={team.name || "Team"}
              width={110}
              height={110}
              priority
              unoptimized
              style={{
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                color: "#22c55e",
                fontSize: 32,
                fontWeight: 900,
              }}
            >
              {team.tla ||
                team.name
                  ?.slice(0, 3)
                  ?.toUpperCase() ||
                "FC"}
            </div>
          )}
        </div>

        {/* TEAM INFORMATION */}

        <div
          style={{
            flex: 1,
            minWidth: 260,
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

          <h1
            style={{
              fontSize: 40,
              margin:
                "0 0 10px",
              color: "#fff",
              fontWeight: 800,
            }}
          >
            {team.name ||
              "Unknown Team"}
          </h1>

          <div
            style={{
              color: "#94a3b8",
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {area.name ||
              team.country ||
              "England"}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(170px,1fr))",
              gap: 12,
              color: "#cbd5e1",
            }}
          >
            <Info
              label="Country"
              value={
                area.name ||
                team.country ||
                "-"
              }
            />

            <Info
              label="Founded"
              value={
                team.founded ||
                "-"
              }
            />

            <Info
              label="Code"
              value={
                team.tla ||
                team.shortName ||
                "-"
              }
            />

            <Info
              label="Colors"
              value={
                team.clubColors ||
                "-"
              }
            />
          </div>
        </div>

        {/* COACH */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 20,
            minWidth: 260,
            maxWidth: 340,
            border:
              "1px solid #293548",
          }}
        >
          <h3
            style={{
              margin:
                "0 0 16px",
              color: "#fff",
            }}
          >
            👔 Head Coach
          </h3>

          {coachName ? (
            <div
              style={{
                display: "flex",
                gap: 15,
                alignItems:
                  "center",
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius:
                    "50%",
                  background:
                    "#111827",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  color:
                    "#22c55e",
                  fontSize: 22,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {coachName
                  .slice(0, 1)
                  .toUpperCase()}
              </div>

              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {coachName}
                </div>

                <div
                  style={{
                    color:
                      "#94a3b8",
                    marginTop: 5,
                  }}
                >
                  {coach.nationality ||
                    "-"}
                </div>

                {coach.dateOfBirth && (
                  <div
                    style={{
                      color:
                        "#64748b",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    Born{" "}
                    {coach.dateOfBirth}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p
              style={{
                color: "#94a3b8",
                margin: 0,
              }}
            >
              Coach information unavailable.
            </p>
          )}
        </div>
      </div>

      {/* =================================================
          STADIUM
      ================================================= */}

      <div
        style={{
          marginTop: 35,
          display: "grid",
          gridTemplateColumns:
            "minmax(320px,1fr) minmax(280px,360px)",
          gap: 25,
        }}
      >
        {/* STADIUM IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 280,
            borderRadius: 18,
            overflow: "hidden",
            background: "#1f2937",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,#111827,#1f2937)",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              color: "#64748b",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            🏟 {venue.name || "Stadium"}
          </div>
        </div>

        {/* STADIUM DETAILS */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            border:
              "1px solid #293548",
          }}
        >
          <h2
            style={{
              margin:
                "0 0 18px",
              color: "#fff",
            }}
          >
            🏟 Stadium
          </h2>

          <Info
            label="Name"
            value={
              venue.name || "-"
            }
          />

          <Info
            label="City"
            value={
              venue.city || "-"
            }
          />

          <Info
            label="Address"
            value={
              venue.address || "-"
            }
          />

          <Info
            label="Capacity"
            value={
              venue.capacity
                ? Number(
                    venue.capacity
                  ).toLocaleString()
                : "-"
            }
          />
        </div>
      </div>
    </section>
  );
}

/* =====================================================
INFO
===================================================== */

function Info({
  label,
  value,
}) {
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
          overflowWrap:
            "anywhere",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}