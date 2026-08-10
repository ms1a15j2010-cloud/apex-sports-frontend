"use client";

import Image from "next/image";

export default function HeadToHeadHistory({
  h2h = [],
  homeTeam,
  awayTeam,
}) {
  if (!h2h || h2h.length === 0) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 22,
          padding: 32,
          marginBottom: 30,
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
          🏆 Head-to-Head History
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Head-to-head history is not available.
        </p>
      </section>
    );
  }

  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  let homeGoals = 0;
  let awayGoals = 0;

  h2h.forEach((match) => {
    const home =
      match.goals?.home ?? 0;

    const away =
      match.goals?.away ?? 0;

    homeGoals += home;
    awayGoals += away;

    if (home > away) homeWins++;
    else if (away > home) awayWins++;
    else draws++;
  });

  const total =
    h2h.length || 1;

  const homePercent =
    (homeWins / total) * 100;

  const awayPercent =
    (awayWins / total) * 100;

  const drawPercent =
    (draws / total) * 100;

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg,#111827,#0f172a)",
        borderRadius: 24,
        padding: 32,
        marginBottom: 30,
        border: "1px solid #1f2937",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              color: "#22c55e",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform:
                "uppercase",
              marginBottom: 8,
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
            🏆 Head-to-Head History
          </h2>
        </div>

        <div
          style={{
            background:
              "rgba(34,197,94,.12)",
            border:
              "1px solid rgba(34,197,94,.25)",
            color: "#86efac",
            padding: "8px 18px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          Previous Meetings
        </div>
      </div>

      {/* SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: 18,
          marginBottom: 30,
        }}
      >
        <SummaryCard
          title="Home Wins"
          value={homeWins}
          color="#22c55e"
          percent={homePercent}
        />

        <SummaryCard
          title="Draws"
          value={draws}
          color="#facc15"
          percent={drawPercent}
        />

        <SummaryCard
          title="Away Wins"
          value={awayWins}
          color="#3b82f6"
          percent={awayPercent}
        />
      </div>

      {/* GOALS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 20,
          marginBottom: 32,
        }}
      >
        <GoalCard
          title="Goals Scored"
          team={homeTeam}
          goals={homeGoals}
          color="#22c55e"
        />

        <GoalCard
          title="Goals Scored"
          team={awayTeam}
          goals={awayGoals}
          color="#3b82f6"
        />
      </div>

      {/* MATCH LIST */}

      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {h2h.map((match, index) => (
          <MatchCard
            key={
              match.fixture?.id ||
              index
            }
            match={match}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />
        ))}
      </div>
    </section>
  );
}

// =========================================
// SUMMARY CARD
// =========================================

function SummaryCard({
  title,
  value,
  color,
  percent,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 22,
        border: `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 34,
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {value}
      </div>

      <div
        style={{
          height: 8,
          background: "#374151",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>

      <div
        style={{
          color,
          marginTop: 10,
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {percent.toFixed(0)}%
      </div>
    </div>
  );
}

// =========================================
// GOAL CARD
// =========================================

function GoalCard({
  title,
  team,
  goals,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 22,
        display: "flex",
        alignItems: "center",
        gap: 16,
        border: `1px solid ${color}40`,
      }}
    >
      <Image
        src={
          team?.logo ||
          "/team.png"
        }
        alt={
          team?.name ||
          "Team"
        }
        width={50}
        height={50}
        unoptimized
      />

      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {team?.name}
        </div>
      </div>

      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontSize: 26,
          boxShadow: `0 0 20px ${color}66`,
        }}
      >
        {goals}
      </div>
    </div>
  );
}

// =========================================
// MATCH CARD START
// =========================================

function MatchCard({
  match,
  homeTeam,
  awayTeam,
}) {
  const home =
    match.teams?.home;

  const away =
    match.teams?.away;

  const homeGoals =
    match.goals?.home ?? 0;

  const awayGoals =
    match.goals?.away ?? 0;

  const date =
    match.fixture?.date
      ? new Date(
          match.fixture.date
        ).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "-";

  const league =
    match.league?.name ||
    "-";
      
  let winner = "Draw";
  let winnerColor = "#facc15";

  if (homeGoals > awayGoals) {
    winner = home?.name;
    winnerColor = "#22c55e";
  } else if (awayGoals > homeGoals) {
    winner = away?.name;
    winnerColor = "#3b82f6";
  }

  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 20,
        border: "1px solid #374151",
        transition: ".25s ease",
      }}
    >
      {/* Date & League */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          📅 {date}
        </div>

        <div
          style={{
            color: "#22c55e",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {league}
        </div>
      </div>

      {/* Teams */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          gap: 18,
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
              home?.logo ||
              "/team.png"
            }
            alt={
              home?.name ||
              "Home"
            }
            width={44}
            height={44}
            unoptimized
          />

          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {home?.name}
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              Home
            </div>
          </div>
        </div>

        {/* Score */}

        <div
          style={{
            textAlign: "center",
            minWidth: 90,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            {homeGoals} - {awayGoals}
          </div>

          <div
            style={{
              marginTop: 8,
              display: "inline-block",
              background: winnerColor,
              color: "#fff",
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {winner}
          </div>
        </div>

        {/* Away */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
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
                fontWeight: 700,
              }}
            >
              {away?.name}
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              Away
            </div>
          </div>

          <Image
            src={
              away?.logo ||
              "/team.png"
            }
            alt={
              away?.name ||
              "Away"
            }
            width={44}
            height={44}
            unoptimized
          />
        </div>
      </div>
      
      {/* Bottom Statistics */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop: "1px solid #374151",
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: 12,
        }}
      >
        <StatBox
          label="Winner"
          value={winner}
          color={winnerColor}
        />

        <StatBox
          label="Goal Diff"
          value={Math.abs(
            homeGoals - awayGoals
          )}
          color="#38bdf8"
        />

        <StatBox
          label="Total Goals"
          value={
            homeGoals + awayGoals
          }
          color="#f97316"
        />

        <StatBox
          label="Result"
          value={
            homeGoals === awayGoals
              ? "Draw"
              : `${homeGoals}-${awayGoals}`
          }
          color="#a855f7"
        />
      </div>
    </div>
  );
}

// =========================================
// SMALL STAT BOX
// =========================================

function StatBox({
  label,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 14,
        padding: 14,
        textAlign: "center",
        border: `1px solid ${color}30`,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color,
          fontWeight: 800,
          fontSize: 16,
        }}
      >
        {value}
      </div>
    </div>
  );
}