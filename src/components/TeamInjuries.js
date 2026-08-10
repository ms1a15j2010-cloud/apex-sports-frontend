"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamInjuries({ injuries = [] }) {
  if (!injuries || injuries.length === 0) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          🚑 Injury Report
        </h2>

        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
            color: "#94a3b8",
            fontSize: 18,
          }}
        >
          ✅ No injury information available.
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
        }}
      >
        🚑 Injury Report
      </h2>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {injuries.map((injury, index) => {
          const player = injury.player || {};
          const team = injury.team || {};
          const fixture = injury.fixture || {};

          return (
            <div
              key={player.id || index}
              style={{
                background: "#1f2937",
                borderRadius: 18,
                padding: 20,
                border: "1px solid #374151",
                transition: ".25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(0,0,0,.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "none";
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                {/* Player Photo */}

                <Image
                  src={player.photo || "/player.png"}
                  alt={player.name || "Player"}
                  width={70}
                  height={70}
                  style={{
                    borderRadius: "50%",
                  }}
                />

                {/* Details */}

                <div>
                  <Link
                    href={`/player/${player.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 21,
                      }}
                    >
                      {player.name || "Unknown Player"}
                    </h3>
                  </Link>

                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#94a3b8",
                      flexWrap: "wrap",
                    }}
                  >
                    <Image
                      src={team.logo || "/team.png"}
                      alt={team.name || "Team"}
                      width={24}
                      height={24}
                    />

                    <span>{team.name}</span>
                  </div>

                  <div
                    style={{
                      marginTop: 12,
                      color: "#cbd5e1",
                      lineHeight: 1.7,
                    }}
                  >
                    <strong>Reason:</strong>{" "}
                    {injury.player?.reason ||
                      injury.reason ||
                      "Unknown"}

                    <br />

                    <strong>Type:</strong>{" "}
                    {injury.player?.type ||
                      injury.type ||
                      "-"}

                    <br />

                    <strong>Date:</strong>{" "}
                    {fixture.date
                      ? new Date(
                          fixture.date
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                </div>

                {/* Status */}

                <div
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Injured
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}