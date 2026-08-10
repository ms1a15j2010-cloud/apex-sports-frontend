"use client";

const COLORS = {
  green: "#22c55e",
  blue: "#3b82f6",
  red: "#ef4444",
  yellow: "#eab308",
  purple: "#8b5cf6",
  slate: "#64748b",
};

export default function MatchInsights({
  statistics = [],
}) {
  if (!statistics.length || statistics.length < 2) {
    return null;
  }

  const homeStats =
    statistics[0]?.statistics || [];

  const awayStats =
    statistics[1]?.statistics || [];

  function parse(value) {
    if (
      value === null ||
      value === undefined ||
      value === "-"
    )
      return 0;

    if (typeof value === "number")
      return value;

    return (
      Number(
        String(value).replace("%", "")
      ) || 0
    );
  }

  function getStat(type) {
    const home =
      homeStats.find(
        (s) => s.type === type
      )?.value ?? 0;

    const away =
      awayStats.find(
        (s) => s.type === type
      )?.value ?? 0;

    return {
      home,
      away,
      homeNum: parse(home),
      awayNum: parse(away),
    };
  }

  const cards = [
    {
      icon: "⚽",
      title: "Ball Possession",
      color: COLORS.green,
      ...getStat("Ball Possession"),
    },
    {
      icon: "🎯",
      title: "Total Shots",
      color: COLORS.blue,
      ...getStat("Total Shots"),
    },
    {
      icon: "🥅",
      title: "Shots on Goal",
      color: COLORS.yellow,
      ...getStat("Shots on Goal"),
    },
    {
      icon: "🚩",
      title: "Corner Kicks",
      color: COLORS.purple,
      ...getStat("Corner Kicks"),
    },
    {
      icon: "🔥",
      title: "Dangerous Attacks",
      color: COLORS.red,
      ...getStat("Dangerous Attacks"),
    },
    {
      icon: "🛑",
      title: "Fouls",
      color: "#f97316",
      ...getStat("Fouls"),
    },
    {
      icon: "🟨",
      title: "Yellow Cards",
      color: "#ca8a04",
      ...getStat("Yellow Cards"),
    },
    {
      icon: "🟥",
      title: "Red Cards",
      color: "#dc2626",
      ...getStat("Red Cards"),
    },
  ];

  const possessionWinner =
    cards[0].homeNum >
    cards[0].awayNum
      ? "Home"
      : cards[0].awayNum >
        cards[0].homeNum
      ? "Away"
      : "Even";

  const shotWinner =
    cards[1].homeNum >
    cards[1].awayNum
      ? "Home"
      : cards[1].awayNum >
        cards[1].homeNum
      ? "Away"
      : "Even";

  const discipline =
    cards[6].homeNum +
      cards[7].homeNum +
      cards[6].awayNum +
      cards[7].awayNum <
    5
      ? "Very Disciplined"
      : "Physical Match";

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          marginBottom: 26,
          color: "#fff",
          fontSize: 28,
        }}
      >
        📊 Match Insights
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 28,
        }}
      >
                <InsightBox
          title="Possession"
          value={possessionWinner}
          icon="⚽"
          color={COLORS.green}
        />

        <InsightBox
          title="Shot Dominance"
          value={shotWinner}
          icon="🎯"
          color={COLORS.blue}
        />

        <InsightBox
          title="Discipline"
          value={discipline}
          icon="🟨"
          color="#f59e0b"
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        {cards.map((card) => {
          const total =
            card.homeNum + card.awayNum;

          const homeWidth =
            total === 0
              ? 50
              : (card.homeNum / total) * 100;

          const awayWidth =
            100 - homeWidth;

          const homeWinner =
            card.homeNum > card.awayNum;

          const awayWinner =
            card.awayNum > card.homeNum;

          return (
            <div
              key={card.title}
              style={{
                background: "#1f2937",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {card.icon}
                  </span>

                  {card.title}
                </div>

                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  Comparison
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: 10,
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    color: homeWinner
                      ? card.color
                      : "#fff",
                  }}
                >
                  {card.home}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  :
                </span>

                <span
                  style={{
                    color: awayWinner
                      ? card.color
                      : "#fff",
                  }}
                >
                  {card.away}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  overflow: "hidden",
                  borderRadius: 50,
                  height: 14,
                  background: "#334155",
                }}
              >
                <div
                  style={{
                    width: `${homeWidth}%`,
                    background: card.color,
                    transition: ".4s",
                  }}
                />

                <div
                  style={{
                    width: `${awayWidth}%`,
                    background: "#475569",
                    transition: ".4s",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginTop: 8,
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              >
                <span>Home</span>

                <span>Away</span>
              </div>
            </div>
          );
        })}
      </div>
          </section>
  );
}

function InsightBox({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 20,
        border: `2px solid ${color}`,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}