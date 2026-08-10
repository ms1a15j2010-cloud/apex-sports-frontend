"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamTransfers({ transfers = [] }) {
  if (!transfers || transfers.length === 0) return null;

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
          marginBottom: 24,
        }}
      >
        🔄 Latest Transfers
      </h2>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {transfers.slice(0, 15).map((transfer, index) => {
          const player = transfer.player || {};
          const teams = transfer.teams || {};
          const type = transfer.type || "Transfer";

          return (
            <div
              key={`${player.id}-${index}`}
              style={{
                background: "#1f2937",
                borderRadius: 16,
                padding: 20,
                border: "1px solid #374151",
                transition: ".25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0,0,0,.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "90px 1fr auto",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                {/* Player */}

                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={player.photo || "/player.png"}
                    alt={player.name || "Player"}
                    width={70}
                    height={70}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                </div>

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
                        fontSize: 20,
                      }}
                    >
                      {player.name || "Unknown Player"}
                    </h3>
                  </Link>

                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      flexWrap: "wrap",
                    }}
                  >
                    {/* From */}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Image
                        src={
                          teams.out?.logo ||
                          "/team.png"
                        }
                        alt={
                          teams.out?.name ||
                          "Old Team"
                        }
                        width={28}
                        height={28}
                      />

                      <span
                        style={{
                          color: "#cbd5e1",
                        }}
                      >
                        {teams.out?.name ||
                          "Unknown"}
                      </span>
                    </div>

                    <span
                      style={{
                        color: "#22c55e",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      →
                    </span>

                    {/* To */}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Image
                        src={
                          teams.in?.logo ||
                          "/team.png"
                        }
                        alt={
                          teams.in?.name ||
                          "New Team"
                        }
                        width={28}
                        height={28}
                      />

                      <span
                        style={{
                          color: "#fff",
                        }}
                      >
                        {teams.in?.name ||
                          "Unknown"}
                      </span>
                    </div>
                  </div>

                  {/* Date */}

                  <div
                    style={{
                      marginTop: 14,
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    📅{" "}
                    {transfer.date
                      ? new Date(
                          transfer.date
                        ).toLocaleDateString()
                      : "Unknown Date"}
                  </div>
                </div>

                {/* Type */}

                <div
                  style={{
                    background:
                      type === "Loan"
                        ? "#2563eb"
                        : "#22c55e",
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: 30,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {type}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}