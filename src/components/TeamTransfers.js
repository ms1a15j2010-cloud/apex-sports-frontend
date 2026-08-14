"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamTransfers({
  transfers = [],
  available = false,
}) {
  const hasTransfers =
    available &&
    Array.isArray(transfers) &&
    transfers.length > 0;

  return (
    <section
      id="transfers"
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
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          🔄 Latest Transfers
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Player transfer activity associated
          with this team.
        </p>
      </div>

      {/* =================================================
          AVAILABLE TRANSFERS
      ================================================= */}

      {hasTransfers ? (
        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {transfers
            .slice(0, 15)
            .map((transfer, index) => {
              const player =
                transfer?.player || {};

              const move =
                transfer?.transfers?.[0] ||
                transfer;

              const from =
                move?.teams?.out ||
                {};

              const to =
                move?.teams?.in ||
                {};

              const type =
                move?.type ||
                "Transfer";

              const date =
                move?.date ||
                null;

              return (
                <article
                  key={
                    player?.id ??
                    `transfer-${index}`
                  }
                  style={{
                    background: "#1f2937",
                    borderRadius: 16,
                    padding: 20,
                    border:
                      "1px solid #293548",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "70px 1fr auto",
                      gap: 18,
                      alignItems:
                        "center",
                    }}
                  >
                    {/* PLAYER */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "center",
                      }}
                    >
                      {player?.photo ? (
                        <Image
                          src={
                            player.photo
                          }
                          alt={
                            player?.name ||
                            "Player"
                          }
                          width={60}
                          height={60}
                          unoptimized
                          style={{
                            borderRadius:
                              "50%",
                            objectFit:
                              "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 60,
                            height: 60,
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
                            fontWeight:
                              900,
                            fontSize: 22,
                          }}
                        >
                          {player?.name
                            ?.slice(
                              0,
                              1
                            )
                            ?.toUpperCase() ||
                            "P"}
                        </div>
                      )}
                    </div>

                    {/* DETAILS */}

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      {player?.id ? (
                        <Link
                          href={`/player/${player.id}`}
                          style={{
                            color: "#fff",
                            textDecoration:
                              "none",
                            fontSize: 18,
                            fontWeight: 800,
                          }}
                        >
                          {player?.name ||
                            "Unknown Player"}
                        </Link>
                      ) : (
                        <div
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: 800,
                          }}
                        >
                          {player?.name ||
                            "Unknown Player"}
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: 10,
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 12,
                          flexWrap:
                            "wrap",
                          color:
                            "#cbd5e1",
                          fontSize: 13,
                        }}
                      >
                        <span>
                          {from?.name ||
                            "Unknown Team"}
                        </span>

                        <span
                          style={{
                            color:
                              "#22c55e",
                            fontSize: 20,
                            fontWeight: 900,
                          }}
                        >
                          →
                        </span>

                        <span>
                          {to?.name ||
                            "Unknown Team"}
                        </span>
                      </div>

                      {date && (
                        <div
                          style={{
                            color:
                              "#64748b",
                            marginTop: 8,
                            fontSize: 12,
                          }}
                        >
                          📅{" "}
                          {new Date(
                            date
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* TYPE */}

                    <div
                      style={{
                        background:
                          type
                            .toLowerCase()
                            .includes(
                              "loan"
                            )
                            ? "#2563eb"
                            : "#22c55e",
                        color: "#fff",
                        padding:
                          "8px 15px",
                        borderRadius:
                          999,
                        fontSize: 12,
                        fontWeight: 800,
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {type}
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      ) : (
        /* =================================================
           UNAVAILABLE
        ================================================= */

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 40,
            textAlign: "center",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 54,
              marginBottom: 18,
            }}
          >
            🔄
          </div>

          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 10px",
              fontSize: 21,
            }}
          >
            Transfer History Unavailable
          </h3>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              maxWidth: 650,
              marginInline: "auto",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            The current football-data.org
            source does not provide the
            team transfer-history data that
            was previously supplied by
            API-Football.
          </p>

          <div
            style={{
              display:
                "inline-block",
              marginTop: 16,
              padding:
                "7px 12px",
              borderRadius: 999,
              background:
                "#111827",
              color:
                "#64748b",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Source limitation
          </div>
        </div>
      )}

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