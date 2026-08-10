"use client";

import Link from "next/link";
import Image from "next/image";

export default function SimilarMatches({
  matches = [],
}) {
  if (!matches.length) return null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 30,
          }}
        >
          🔥 Similar Matches
        </h2>

        <div
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 30,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {matches.length} Matches
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
                {matches.map((match) => {
          const status =
            match.status || "Finished";

          const statusColor =
            status === "Live"
              ? "#22c55e"
              : status === "Scheduled"
              ? "#3b82f6"
              : "#64748b";

          return (
            <Link
              key={match.id}
              href={`/match/${match.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  border: "1px solid #374151",
                  transition:
                    "transform .25s ease, box-shadow .25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 30px rgba(0,0,0,.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              >
                {/* Top Row */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {match.leagueLogo && (
                      <Image
                        src={match.leagueLogo}
                        alt={match.league}
                        width={26}
                        height={26}
                      />
                    )}

                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      {match.league}
                    </span>

                    {match.country && (
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        • {match.country}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      background:
                        statusColor,
                      color: "#fff",
                      padding:
                        "6px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {status}
                  </div>
                </div>

                {/* Teams */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  {/* Home Team */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      src={match.home.logo}
                      alt={match.home.name}
                      width={42}
                      height={42}
                    />

                    <strong
                      style={{
                        color: "#fff",
                        fontSize: 17,
                      }}
                    >
                      {match.home.name}
                    </strong>
                  </div>
                                    {/* Score */}

                  <div
                    style={{
                      textAlign: "center",
                      minWidth: 130,
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontSize: 30,
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      {match.goals?.home ?? "-"}
                      <span
                        style={{
                          margin: "0 10px",
                          color: "#94a3b8",
                        }}
                      >
                        -
                      </span>
                      {match.goals?.away ?? "-"}
                    </div>

                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: 13,
                        marginTop: 10,
                      }}
                    >
                      {match.date
                        ? new Date(
                            match.date
                          ).toLocaleDateString()
                        : "-"}
                    </div>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {match.date
                        ? new Date(
                            match.date
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>

                  {/* Away Team */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 12,
                      textAlign: "right",
                    }}
                  >
                    <strong
                      style={{
                        color: "#fff",
                        fontSize: 17,
                      }}
                    >
                      {match.away.name}
                    </strong>

                    <Image
                      src={match.away.logo}
                      alt={match.away.name}
                      width={42}
                      height={42}
                    />
                  </div>
                </div>

                {/* Bottom Row */}

                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    🏟{" "}
                    {match.venue ||
                      "Venue not available"}
                  </div>

                  <div
                    style={{
                      background: "#111827",
                      color: "#22c55e",
                      padding: "8px 14px",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {match.importance ||
                      "Related Match"}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}