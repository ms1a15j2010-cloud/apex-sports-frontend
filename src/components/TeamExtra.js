"use client";

import Image from "next/image";

export default function TeamExtras({ team }) {
  if (!team) return null;

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
          marginBottom: 30,
        }}
      >
        ⭐ Team Information
      </h2>

      {/* ================================
          Coach
      ================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            marginBottom: 20,
            color: "#fff",
          }}
        >
          👔 Head Coach
        </h3>

        {team.coach ? (
          <div
            style={{
              display: "flex",
              gap: 25,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Image
              src={
                team.coach.photo ||
                "/coach.png"
              }
              alt={team.coach.name}
              width={110}
              height={110}
              style={{
                borderRadius: "50%",
              }}
            />

            <div>
              <h2>{team.coach.name}</h2>

              <p>
                Nationality:
                {" "}
                {team.coach.nationality || "-"}
              </p>

              <p>
                Age:
                {" "}
                {team.coach.age || "-"}
              </p>

              <p>
                Birth:
                {" "}
                {team.coach.birth?.date || "-"}
              </p>
            </div>
          </div>
        ) : (
          <p>No coach information available.</p>
        )}
      </div>

      {/* ================================
          Transfers
      ================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            marginBottom: 20,
            color: "#fff",
          }}
        >
          🔄 Latest Transfers
        </h3>

        {team.transfers?.length ? (
          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            {team.transfers
              .slice(0, 10)
              .map((transfer) => (
                <div
                  key={
                    transfer.player?.id
                  }
                  style={{
                    background:
                      "#111827",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <strong>
                    {
                      transfer.player
                        ?.name
                    }
                  </strong>

                  <div
                    style={{
                      marginTop: 6,
                      color:
                        "#94a3b8",
                    }}
                  >
                    {transfer.transfers?.[0]
                      ?.type || "-"}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                    }}
                  >
                    {transfer.transfers?.[0]
                      ?.teams?.out
                      ?.name || "-"}
                    {"  "}
                    ➜
                    {"  "}
                    {transfer.transfers?.[0]
                      ?.teams?.in
                      ?.name || "-"}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No transfers available.</p>
        )}
      </div>

      {/* ================================
          Injuries
      ================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            marginBottom: 20,
            color: "#fff",
          }}
        >
          🚑 Injuries
        </h3>

        {team.injuries?.length ? (
          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {team.injuries.map(
              (injury) => (
                <div
                  key={
                    injury.player?.id
                  }
                  style={{
                    background:
                      "#111827",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <strong>
                    {
                      injury.player
                        ?.name
                    }
                  </strong>

                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {injury.player
                      ?.reason ||
                      "Injured"}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p>
            No injuries reported.
          </p>
        )}
      </div>

      {/* ================================
          Trophies
      ================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
        }}
      >
        <h3
          style={{
            marginBottom: 20,
            color: "#fff",
          }}
        >
          🏆 Trophies
        </h3>

        {team.trophies?.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: 18,
            }}
          >
            {team.trophies.map(
              (trophy, i) => (
                <div
                  key={i}
                  style={{
                    background:
                      "#111827",
                    borderRadius: 14,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      fontWeight:
                        "bold",
                      fontSize: 18,
                    }}
                  >
                    {
                      trophy.league
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#22c55e",
                      marginTop: 8,
                    }}
                  >
                    {
                      trophy.place
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#94a3b8",
                      marginTop: 6,
                    }}
                  >
                    {
                      trophy.season
                    }
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p>
            No trophies available.
          </p>
        )}
      </div>
    </section>
  );
}