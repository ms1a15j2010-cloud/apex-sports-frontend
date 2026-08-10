"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamResults({ results = [] }) {
  if (!results || results.length === 0) return null;

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
        🏁 Latest Results
      </h2>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {results.slice(0, 10).map((match) => (
          <Link
            key={match.fixture?.id}
            href={`/match/${match.fixture?.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#1f2937",
                borderRadius: 16,
                padding: 20,
                transition: ".25s",
                border: "1px solid #374151",
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
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Date */}

              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {match.fixture?.date
                  ? new Date(
                      match.fixture.date
                    ).toLocaleString()
                  : "Unknown Date"}
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
                {/* Home */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Image
                    src={
                      match.teams?.home?.logo ||
                      "/team.png"
                    }
                    alt={
                      match.teams?.home?.name ||
                      "Home"
                    }
                    width={42}
                    height={42}
                  />

                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {match.teams?.home?.name}
                    </div>

                    {match.teams?.home?.winner && (
                      <div
                        style={{
                          color: "#22c55e",
                          fontSize: 12,
                        }}
                      >
                        Winner
                      </div>
                    )}
                  </div>
                </div>

                {/* Score */}

                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#22c55e",
                    }}
                  >
                    {match.goals?.home ?? 0}
                    {" - "}
                    {match.goals?.away ?? 0}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      display: "inline-block",
                      padding:
                        "4px 12px",
                      borderRadius: 20,
                      background:
                        "#dc2626",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {match.fixture?.status?.short ||
                      "FT"}
                  </div>
                </div>

                {/* Away */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {match.teams?.away?.name}
                    </div>

                    {match.teams?.away?.winner && (
                      <div
                        style={{
                          color: "#22c55e",
                          fontSize: 12,
                        }}
                      >
                        Winner
                      </div>
                    )}
                  </div>

                  <Image
                    src={
                      match.teams?.away?.logo ||
                      "/team.png"
                    }
                    alt={
                      match.teams?.away?.name ||
                      "Away"
                    }
                    width={42}
                    height={42}
                  />
                </div>
              </div>

              {/* Stadium */}

              <div
                style={{
                  marginTop: 18,
                  color: "#94a3b8",
                  fontSize: 13,
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>
                  📍{" "}
                  {match.fixture?.venue?.name ||
                    "Unknown Stadium"}
                </span>

                <span>
                  {match.league?.round || ""}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}