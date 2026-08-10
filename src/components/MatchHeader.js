"use client";

import Image from "next/image";

export default function MatchHeader({ match }) {
  if (!match) return null;

  const fixture = match.fixture || {};
  const league = match.league || {};
  const home = match.teams?.home || {};
  const away = match.teams?.away || {};
  const goals = match.goals || {};

  const status =
    fixture.status?.short ||
    fixture.status?.long ||
    "NS";

  const statusColor =
    status === "FT"
      ? "#22c55e"
      : status === "HT"
      ? "#f59e0b"
      : ["1H", "2H", "LIVE", "ET", "P"].includes(
          status
        )
      ? "#ef4444"
      : "#3b82f6";

  const formattedDate = fixture.date
    ? new Date(fixture.date).toLocaleString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "-";

  return (
    <section
    className="match-header"
      style={{
        background:
          "linear-gradient(135deg,#111827,#1f2937)",
        borderRadius: 22,
        padding: "clamp(18px,4vw,35px)",
        marginBottom: 30,
        boxShadow:
          "0 12px 35px rgba(0,0,0,.35)",
      }}
    >
      {/* League */}

      <div
      
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        <Image
          src={
  league.logo &&
  league.logo.startsWith("http")
    ? league.logo
    : "/league.png"
}
          alt={league.name}
          width={42}
          height={42}
        />

        <div>
          <div
            
            style={{
              color: "#fff",
              fontSize: "clamp(20px,3vw,28px)",
              fontWeight: "bold",
            }}
          >
            {league.name}
          </div>

          <div
            style={{
              color: "#94a3b8",
              marginTop: 3,
            }}
          >
            {league.country} •{" "}
            {league.round}
          </div>
        </div>
      </div>

      {/* Teams */}

      <div
      className="match-header-row"
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems: "center",
          gap: 25,
        }}
      >
        {/* Home */}

        <div
         className="match-header-home"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={
  home.logo &&
  home.logo.startsWith("http")
    ? home.logo
    : "/team.png"
}
            alt={home.name}
            width={100}
height={100}
style={{
  width: "clamp(80px,10vw,120px)",
  height: "auto",
}}
          />

          <h2
            style={{
              color: "#fff",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            {home.name}
          </h2>
        </div>

        {/* Score */}

        <div
         className="match-header-score"
          style={{
            textAlign: "center",
            minWidth: 260,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background:
                statusColor,
              color: "#fff",
              padding:
                "10px 22px",
              borderRadius: 40,
              fontWeight: "bold",
              marginBottom: 18,
            }}
          >
            {fixture.status?.long ||
              status}
          </div>

          <div
            style={{
              fontSize: "clamp(42px,7vw,70px)",
              color: "#fff",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {goals.home ?? "-"}
            <span
              style={{
                margin:
                  "0 20px",
              }}
            >
              :
            </span>
            {goals.away ?? "-"}
          </div>

          <div
            style={{
              color: "#94a3b8",
              marginTop: 18,
            }}
          >
            {formattedDate}
          </div>
        </div>

        {/* Away */}

        <div
        className="match-header-away"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={
              away.logo &&
    away.logo.startsWith("http")
      ? away.logo
      : "/team.png"
            }
             alt={away.name}
  width={100}
  height={100}
  style={{
    width: "clamp(80px,10vw,120px)",
    height: "auto",
      }}
          />

          <h2
            style={{
              color: "#fff",
              marginTop: 15,
              textAlign: "center",
              fontSize: "clamp(20px,3vw,32px)",
              wordBreak: "break-word",
            }}
          >
            {away.name}
          </h2>
        </div>
      </div>

      {/* Match Details */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          marginTop: 40,
        }}
      >
        <InfoCard
          title="🏟 Stadium"
          value={
            fixture.venue?.name ||
            "-"
          }
        />

        <InfoCard
          title="📍 City"
          value={
            fixture.venue?.city ||
            "-"
          }
        />

        <InfoCard
          title="👨‍⚖️ Referee"
          value={
            fixture.referee ||
            "-"
          }
        />

        <InfoCard
          title="🏆 Season"
          value={
            league.season ||
            "-"
          }
        />

        <InfoCard
          title="⚽ Round"
          value={
            league.round ||
            "-"
          }
        />

        <InfoCard
          title="📊 Status"
          value={
            fixture.status
              ?.long ||
            "-"
          }
        />
      </div>
    </section>
  );
}

function InfoCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 8,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {value}
      </div>
    </div>
  );
}