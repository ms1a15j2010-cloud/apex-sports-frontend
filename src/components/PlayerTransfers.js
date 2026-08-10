"use client";

import Image from "next/image";

export default function PlayerTransfers({
  transfers = [],
}) {
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
        🔄 Transfer History
      </h2>

      {!transfers.length ? (
        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 30,
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          No transfer history available.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {transfers.map((item, index) => {
            const move =
              item.transfers?.[0] || {};

            return (
              <div
                key={
                  move.date ||
                  index
                }
                style={{
                  background:
                    "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                }}
              >
                {/* Date */}

                <div
                  style={{
                    color:
                      "#94a3b8",
                    marginBottom: 18,
                    fontSize: 14,
                  }}
                >
                  {move.date ||
                    "Unknown Date"}
                </div>

                {/* Teams */}

                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems:
                      "center",
                    gap: 20,
                  }}
                >
                  {/* From */}

                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      src={
                        move.teams?.out
                          ?.logo ||
                        "/team.png"
                      }
                      alt={
                        move.teams?.out
                          ?.name ||
                        "Old Team"
                      }
                      width={45}
                      height={45}
                    />

                    <div>
                      <div
                        style={{
                          color:
                            "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        From
                      </div>

                      <strong
                        style={{
                          color:
                            "#fff",
                        }}
                      >
                        {move
                          .teams
                          ?.out
                          ?.name ||
                          "-"}
                      </strong>
                    </div>
                  </div>

                  {/* Arrow */}

                  <div
                    style={{
                      textAlign:
                        "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 28,
                      }}
                    >
                      ➜
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        color:
                          "#22c55e",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {move.type ||
                        "-"}
                    </div>
                  </div>

                  {/* To */}

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "flex-end",
                      alignItems:
                        "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        textAlign:
                          "right",
                      }}
                    >
                      <div
                        style={{
                          color:
                            "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        To
                      </div>

                      <strong
                        style={{
                          color:
                            "#fff",
                        }}
                      >
                        {move
                          .teams
                          ?.in
                          ?.name ||
                          "-"}
                      </strong>
                    </div>

                    <Image
                      src={
                        move.teams?.in
                          ?.logo ||
                        "/team.png"
                      }
                      alt={
                        move.teams?.in
                          ?.name ||
                        "New Team"
                      }
                      width={45}
                      height={45}
                    />
                  </div>
                </div>

                {/* Details */}

                <div
                  style={{
                    marginTop: 22,
                    display:
                      "flex",
                    flexWrap:
                      "wrap",
                    gap: 20,
                    color:
                      "#cbd5e1",
                  }}
                >
                  <span>
                    <strong>
                      Season:
                    </strong>{" "}
                    {move.season ||
                      "-"}
                  </span>

                  <span>
                    <strong>
                      Type:
                    </strong>{" "}
                    {move.type ||
                      "-"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}