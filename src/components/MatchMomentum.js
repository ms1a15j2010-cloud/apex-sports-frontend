"use client";

import Image from "next/image";
import { useMemo } from "react";

export default function MatchMomentum({
  statistics = [],
}) {
  if (!statistics || statistics.length < 2) {
    return (
      <section
        style={{
          background:
            "linear-gradient(145deg,#0f172a,#111827)",
          borderRadius: 24,
          padding: 32,
          marginBottom: 32,
          border: "1px solid #1f2937",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: 800,
            marginBottom: 18,
          }}
        >
          📈 Match Momentum
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Match momentum data is unavailable.
        </p>
      </section>
    );
  }

  const home = statistics[0];
  const away = statistics[1];

  const homeStats = home.statistics || [];
  const awayStats = away.statistics || [];

  const parse = (value) => {
    if (value === null || value === undefined)
      return 0;

    if (typeof value === "number")
      return value;

    return (
      Number(
        String(value).replace("%", "")
      ) || 0
    );
  };

  const getValue = (type) => ({
    home: parse(
      homeStats.find(
        (s) => s.type === type
      )?.value
    ),
    away: parse(
      awayStats.find(
        (s) => s.type === type
      )?.value
    ),
  });

  const chartData = useMemo(
    () => [
      {
        title: "Ball Possession",
        ...getValue("Ball Possession"),
        color: "#22c55e",
        icon: "⚽",
      },
      {
        title: "Shots",
        ...getValue("Total Shots"),
        color: "#3b82f6",
        icon: "🎯",
      },
      {
        title: "Shots On Goal",
        ...getValue("Shots on Goal"),
        color: "#f59e0b",
        icon: "🥅",
      },
      {
        title: "Corner Kicks",
        ...getValue("Corner Kicks"),
        color: "#8b5cf6",
        icon: "🚩",
      },
      {
        title: "Dangerous Attacks",
        ...getValue("Dangerous Attacks"),
        color: "#ef4444",
        icon: "🔥",
      },
      {
        title: "Pass Accuracy",
        ...getValue("Passes %"),
        color: "#06b6d4",
        icon: "🎯",
      },
    ],
    [statistics]
  );

  const homePossession =
    chartData[0]?.home || 0;

  const awayPossession =
    chartData[0]?.away || 0;

  const homeShots =
    chartData[1]?.home || 0;

  const awayShots =
    chartData[1]?.away || 0;

  const homeDanger =
    chartData[4]?.home || 0;

  const awayDanger =
    chartData[4]?.away || 0;

  const homeScore =
    homePossession * 0.4 +
    homeShots * 2 +
    homeDanger * 1.2;

  const awayScore =
    awayPossession * 0.4 +
    awayShots * 2 +
    awayDanger * 1.2;

  let dominance = "Balanced";
  let dominanceColor = "#facc15";

  if (homeScore > awayScore + 8) {
    dominance =
      `${home.team?.name} Dominating`;
    dominanceColor = "#22c55e";
  }

  if (awayScore > homeScore + 8) {
    dominance =
      `${away.team?.name} Dominating`;
    dominanceColor = "#3b82f6";
  }
    const momentumPoints = [
    homePossession,
    homeShots * 5,
    chartData[2]?.home * 8 || 0,
    chartData[3]?.home * 4 || 0,
    homeDanger * 2,
    chartData[5]?.home || 0,
  ];

  const awayMomentum = [
    awayPossession,
    awayShots * 5,
    chartData[2]?.away * 8 || 0,
    chartData[3]?.away * 4 || 0,
    awayDanger * 2,
    chartData[5]?.away || 0,
  ];

  return (
    <section
      style={{
        background:
          "linear-gradient(145deg,#0f172a,#111827)",
        borderRadius: 24,
        padding: 32,
        marginBottom: 32,
        border: "1px solid #1f2937",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              color: "#22c55e",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 13,
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            Apex Sports
          </div>

          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            📈 Match Momentum
          </h2>
        </div>

        <div
          style={{
            background: dominanceColor,
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            boxShadow:
              "0 10px 25px rgba(0,0,0,.35)",
          }}
        >
          {dominance}
        </div>
      </div>

      {/* Team Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          gap: 24,
          alignItems: "center",
          marginBottom: 35,
        }}
      >
        {/* Home */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Image
            src={
              home.team?.logo ||
              "/team.png"
            }
            unoptimized
            width={60}
            height={60}
            alt={home.team?.name}
            style={{
              borderRadius: 12,
            }}
          />

          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {home.team?.name}
            </div>

            <div
              style={{
                color: "#94a3b8",
                marginTop: 6,
              }}
            >
              Momentum Score

              <strong
                style={{
                  color: "#22c55e",
                  marginLeft: 8,
                }}
              >
                {homeScore.toFixed(0)}
              </strong>
            </div>
          </div>
        </div>

        {/* VS */}

        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#22c55e,#3b82f6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 22,
          }}
        >
          VS
        </div>

        {/* Away */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 15,
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
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {away.team?.name}
            </div>

            <div
              style={{
                color: "#94a3b8",
                marginTop: 6,
              }}
            >
              Momentum Score

              <strong
                style={{
                  color: "#3b82f6",
                  marginLeft: 8,
                }}
              >
                {awayScore.toFixed(0)}
              </strong>
            </div>
          </div>

          <Image
            src={
              away.team?.logo ||
              "/team.png"
            }
            unoptimized
            width={60}
            height={60}
            alt={away.team?.name}
            style={{
              borderRadius: 12,
            }}
          />
        </div>
      </div>
            {/* Momentum Graph */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 20,
          padding: 24,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          🔥 Pressure Timeline
        </div>

        <svg
          viewBox="0 0 1000 260"
          style={{
            width: "100%",
            height: 260,
            overflow: "visible",
          }}
        >
          {/* Mid Line */}

          <line
            x1="0"
            y1="130"
            x2="1000"
            y2="130"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {/* Home Area */}

          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={momentumPoints
              .map((v, i) => {
                const x = i * 200;
                const y =
                  130 -
                  Math.min(v, 100);

                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Away Area */}

          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={awayMomentum
              .map((v, i) => {
                const x = i * 200;
                const y =
                  130 +
                  Math.min(v, 100);

                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Home Points */}

          {momentumPoints.map(
            (v, i) => (
              <circle
                key={`h${i}`}
                cx={i * 200}
                cy={
                  130 -
                  Math.min(v, 100)
                }
                r="7"
                fill="#22c55e"
              />
            )
          )}

          {/* Away Points */}

          {awayMomentum.map(
            (v, i) => (
              <circle
                key={`a${i}`}
                cx={i * 200}
                cy={
                  130 +
                  Math.min(v, 100)
                }
                r="7"
                fill="#3b82f6"
              />
            )
          )}
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: 18,
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          <span>Possession</span>
          <span>Shots</span>
          <span>On Target</span>
          <span>Corners</span>
          <span>Danger</span>
          <span>Passing</span>
        </div>
      </div>

      {/* Statistics Bars */}

      <div
        style={{
          display: "grid",
          gap: 22,
        }}
      >
        {chartData.map((metric) => {
          const total =
            metric.home +
            metric.away;

          const left =
            total === 0
              ? 50
              : (metric.home /
                  total) *
                100;

          return (
            <div
              key={metric.title}
              style={{
                background:
                  "#1f2937",
                padding: 20,
                borderRadius: 18,
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  marginBottom: 10,
                }}
              >
                <strong
                  style={{
                    color:
                      "#22c55e",
                  }}
                >
                  {metric.home}
                </strong>

                <span
                  style={{
                    color:
                      "#fff",
                    fontWeight:
                      700,
                  }}
                >
                  {metric.icon}{" "}
                  {metric.title}
                </span>

                <strong
                  style={{
                    color:
                      "#3b82f6",
                  }}
                >
                  {metric.away}
                </strong>
              </div>

              <div
                style={{
                  display:
                    "flex",
                  height: 16,
                  borderRadius: 999,
                  overflow:
                    "hidden",
                  background:
                    "#374151",
                }}
              >
                <div
                  style={{
                    width: `${left}%`,
                    background:
                      metric.color,
                  }}
                />

                <div
                  style={{
                    width: `${
                      100 -
                      left
                    }%`,
                    background:
                      "#3b82f6",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
    
  );
  
}
      {/* Final Match Verdict */}

      <div
        style={{
          marginTop: 35,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: 22,
        }}
      >
        {/* Home Momentum */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#166534,#15803d)",
            borderRadius: 20,
            padding: 24,
            color: "#fff",
            boxShadow:
              "0 12px 30px rgba(34,197,94,.25)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              opacity: .8,
              marginBottom: 10,
            }}
          >
            HOME MOMENTUM
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            {homeScore.toFixed(0)}
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {home.team?.name}
          </div>
        </div>

        {/* Match Verdict */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#1e293b,#0f172a)",
            borderRadius: 20,
            padding: 24,
            textAlign: "center",
            border: `2px solid ${dominanceColor}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: 14,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            MATCH VERDICT
          </div>

          <div
            style={{
              color: dominanceColor,
              fontSize: 34,
              fontWeight: 900,
              marginBottom: 10,
            }}
          >
            {dominance}
          </div>

          <div
            style={{
              color: "#cbd5e1",
              lineHeight: 1.7,
              fontSize: 15,
            }}
          >
            {homeScore > awayScore
              ? `${home.team?.name} controlled most phases of the match with stronger attacking momentum and possession.`
              : awayScore > homeScore
              ? `${away.team?.name} dominated the game through superior pressure and attacking efficiency.`
              : "Both teams produced a balanced performance with nearly identical momentum."}
          </div>
        </div>

        {/* Away Momentum */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#1d4ed8,#2563eb)",
            borderRadius: 20,
            padding: 24,
            color: "#fff",
            boxShadow:
              "0 12px 30px rgba(59,130,246,.25)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              opacity: .8,
              marginBottom: 10,
            }}
          >
            AWAY MOMENTUM
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            {awayScore.toFixed(0)}
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {away.team?.name}
          </div>
        </div>
      </div>

      {/* Match Quality Meter */}

      <div
        style={{
          marginTop: 30,
          background: "#1f2937",
          borderRadius: 20,
          padding: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          <span>⚡ Match Quality</span>

          <span>
            {Math.round(
              (homeScore + awayScore) / 2
            )}
            /100
          </span>
        </div>

        <div
          style={{
            height: 18,
            background: "#374151",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(
                (homeScore + awayScore) / 2,
                100
              )}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#22c55e,#84cc16,#f59e0b)",
              transition: ".5s",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          <span>Low Intensity</span>
          <span>Competitive</span>
          <span>World Class</span>
        </div>
      </div>
