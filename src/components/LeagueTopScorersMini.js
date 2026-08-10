"use client";

import Image from "next/image";
import Link from "next/link";

function ratingColor(rating = 0) {
  if (rating >= 8.5) return "#16a34a";
  if (rating >= 7.8) return "#22c55e";
  if (rating >= 7.0) return "#eab308";
  if (rating >= 6.5) return "#f97316";
  return "#64748b";
}

export default function LeagueTopScorersMini({
  players = [],
  league = {},
}) {
  if (!players.length) return null;

  const leader = players[0];

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 26,
        marginBottom: 25,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {league.logo && (
            <Image
              src={league.logo}
              alt={league.name || "League"}
              width={42}
              height={42}
            />
          )}

          <div>
            <h2
              style={{
                color: "#fff",
                margin: 0,
                fontSize: 28,
              }}
            >
              🥇 Top Scorers
            </h2>

            <div
              style={{
                color: "#94a3b8",
                marginTop: 4,
              }}
            >
              {league.name || "League"}
            </div>
          </div>
        </div>

        <Link
          href={`/league/${league.id}/topscorers`}
          style={{
            color: "#3b82f6",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          View All →
        </Link>
      </div>

      {/* Golden Boot Leader */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#ca8a04,#facc15)",
          borderRadius: 18,
          padding: 24,
          marginBottom: 28,
          display: "grid",
          gridTemplateColumns: "110px 1fr auto",
          gap: 20,
          alignItems: "center",
          color: "#111827",
        }}
      >
        <Image
          src={
            leader.player?.photo ||
            "/player.png"
          }
          alt={leader.player?.name || "Player"}
          width={100}
          height={100}
          style={{
            borderRadius: "50%",
            border: "4px solid white",
          }}
        />

        <div>
          <div
            style={{
              display: "inline-block",
              background: "#111827",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 30,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            👑 Golden Boot Leader
          </div>

          <h3
            style={{
              margin: "0 0 10px",
              fontSize: 30,
            }}
          >
            {leader.player?.name}
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {leader.statistics?.[0]?.team
              ?.logo && (
              <Image
                src={
                  leader.statistics[0].team.logo
                }
                alt={
                  leader.statistics[0].team.name
                }
                width={28}
                height={28}
              />
            )}

            <span
              style={{
                fontWeight: 600,
              }}
            >
              {
                leader.statistics?.[0]?.team
                  ?.name
              }
            </span>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {
              leader.statistics?.[0]?.goals
                ?.total
            }
          </div>

          <div
            style={{
              fontWeight: 700,
              marginTop: 6,
            }}
          >
            Goals
          </div>
        </div>
      </div>

      {/* Scorers Table */}

      <div
        style={{
          display: "grid",
          gap: 14,
        }}
      ></div>
              {players.slice(0, 10).map((item, index) => {
          const stat =
            item.statistics?.[0] || {};

          const goals =
            stat.goals?.total || 0;

          const assists =
            stat.goals?.assists || 0;

          const games =
            stat.games?.appearences || 0;

          const rating = Number(
            stat.games?.rating || 0
          );

          const gpm =
            games > 0
              ? (
                  goals / games
                ).toFixed(2)
              : "0.00";

          const form =
            goals >= 15
              ? "🔥"
              : goals >= 10
              ? "⭐"
              : "";

          return (
            <Link
              key={item.player.id}
              href={`/player/${item.player.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background:
                    index === 0
                      ? "#1e293b"
                      : "#0f172a",
                  borderRadius: 16,
                  padding: 18,
                  display: "grid",
                  gridTemplateColumns:
                    "50px 70px 1fr auto auto auto auto",
                  alignItems: "center",
                  gap: 16,
                  border:
                    index === 0
                      ? "2px solid #facc15"
                      : "1px solid #1f2937",
                  transition:
                    ".25s ease",
                }}
              >
                {/* Rank */}

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color:
                      index === 0
                        ? "#facc15"
                        : "#cbd5e1",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </div>

                {/* Player Photo */}

                <Image
                  src={
                    item.player.photo ||
                    "/player.png"
                  }
                  alt={item.player.name}
                  width={60}
                  height={60}
                  style={{
                    borderRadius: "50%",
                    border: `3px solid ${ratingColor(
                      rating
                    )}`,
                  }}
                />

                {/* Player Info */}

                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    {item.player.name}{" "}
                    {form}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 8,
                      color:
                        "#94a3b8",
                      fontSize: 14,
                    }}
                  >
                    {stat.team
                      ?.logo && (
                      <Image
                        src={
                          stat.team.logo
                        }
                        alt={
                          stat.team.name
                        }
                        width={20}
                        height={20}
                      />
                    )}

                    <span>
                      {
                        stat.team
                          ?.name
                      }
                    </span>
                  </div>
                </div>

                {/* Goals */}

                <StatBadge
                  title="Goals"
                  value={goals}
                  color="#16a34a"
                />

                {/* Assists */}

                <StatBadge
                  title="Assists"
                  value={assists}
                  color="#2563eb"
                />

                {/* Goals/Game */}

                <StatBadge
                  title="G/Match"
                  value={gpm}
                  color="#8b5cf6"
                />

                {/* Rating */}

                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background:
                      ratingColor(
                        rating
                      ),
                    display: "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {rating > 0
                      ? rating.toFixed(
                          1
                        )
                      : "-"}
                  </div>

                  <div
                    style={{
                      fontSize: 9,
                    }}
                  >
                    Rating
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

function StatBadge({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        minWidth: 74,
        background: "#111827",
        border: `2px solid ${color}`,
        borderRadius: 14,
        padding: "10px 12px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 11,
          marginBottom: 4,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}