"use client";

import Image from "next/image";

export default function PlayerTransfers({
  transfers = [],
  available = false,
}) {
  return (
    <section
      style={{
        background:
          "linear-gradient(145deg, #111827, #0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border: "1px solid #1e293b",
      }}
    >
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
            fontSize: 26,
          }}
        >
          🔄 Transfer History
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Player transfer and club
          movement history.
        </p>
      </div>

      {!available ? (
        <div
          style={{
            background: "#1f2937",
            borderRadius: 16,
            padding: 35,
            textAlign: "center",
            border: "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 42,
              marginBottom: 15,
            }}
          >
            🔄
          </div>

          <h3
            style={{
              margin: "0 0 10px",
              color: "#fff",
              fontSize: 20,
            }}
          >
            Transfer History Unavailable
          </h3>

          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            Transfer history is not
            provided by the current
            football-data.org data source.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: 999,
              background: "#0f172a",
              color: "#64748b",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Source: football-data.org
          </div>
        </div>
      ) : !Array.isArray(transfers) ||
        transfers.length === 0 ? (
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
          {transfers.map(
            (item, index) => {
              const move =
                item?.transfers?.[0] ||
                item ||
                {};

              const fromTeam =
                move?.teams?.out ||
                move?.from ||
                {};

              const toTeam =
                move?.teams?.in ||
                move?.to ||
                {};

              const fromLogo =
                fromTeam?.logo ||
                fromTeam?.crest ||
                null;

              const toLogo =
                toTeam?.logo ||
                toTeam?.crest ||
                null;

              return (
                <div
                  key={
                    move?.date ||
                    move?.id ||
                    index
                  }
                  style={{
                    background: "#1f2937",
                    borderRadius: 18,
                    padding: 22,
                    border:
                      "1px solid #293548",
                  }}
                >
                  <div
                    style={{
                      color: "#94a3b8",
                      marginBottom: 18,
                      fontSize: 14,
                    }}
                  >
                    {move?.date ||
                      move?.transferDate ||
                      "Unknown Date"}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr auto 1fr",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <TeamTransferSide
                      label="From"
                      team={fromTeam}
                      logo={fromLogo}
                    />

                    <div
                      style={{
                        textAlign: "center",
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
                          color: "#22c55e",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {move?.type || "-"}
                      </div>
                    </div>

                    <TeamTransferSide
                      label="To"
                      team={toTeam}
                      logo={toLogo}
                      align="right"
                    />
                  </div>

                  <div
                    style={{
                      marginTop: 22,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 20,
                      color: "#cbd5e1",
                      fontSize: 14,
                    }}
                  >
                    <span>
                      <strong>Season:</strong>{" "}
                      {move?.season || "-"}
                    </span>

                    <span>
                      <strong>Type:</strong>{" "}
                      {move?.type || "-"}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

function TeamTransferSide({
  label,
  team = {},
  logo,
  align = "left",
}) {
  const isRight =
    align === "right";

  const name =
    team?.name ||
    "Unknown Club";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isRight
          ? "flex-end"
          : "flex-start",
        gap: 12,
        minWidth: 0,
      }}
    >
      {!isRight && (
        <TeamLogo
          src={logo}
          name={name}
        />
      )}

      <div
        style={{
          textAlign: isRight
            ? "right"
            : "left",
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            marginBottom: 5,
          }}
        >
          {label}
        </div>

        <strong
          style={{
            color: "#fff",
            overflowWrap: "anywhere",
          }}
        >
          {name}
        </strong>
      </div>

      {isRight && (
        <TeamLogo
          src={logo}
          name={name}
        />
      )}
    </div>
  );
}

function TeamLogo({
  src,
  name,
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={45}
        height={45}
        unoptimized
        style={{
          width: 45,
          height: 45,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 45,
        height: 45,
        borderRadius: 10,
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#22c55e",
        fontSize: 12,
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      FC
    </div>
  );
}