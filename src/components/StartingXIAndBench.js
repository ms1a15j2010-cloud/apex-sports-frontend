"use client";

import Image from "next/image";
import FormationPitch from "./FormationPitch";

export default function StartingXIAndBench({
  lineups = [],
}) {
  // ============================
  // NO DATA
  // ============================

  if (!lineups || lineups.length < 2) {
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
          👥 Starting XI & Bench
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Lineups are not available.
        </p>
      </section>
    );
  }

  // ============================
  // TEAM DATA
  // ============================

  const home = lineups[0];
  const away = lineups[1];

  const homeXI = home.startXI || [];
  const awayXI = away.startXI || [];

  const homeBench = home.substitutes || [];
  const awayBench = away.substitutes || [];

  return (
    <section
      style={{
        background:
          "linear-gradient(145deg,#0f172a,#111827)",
        borderRadius: 24,
        padding: 32,
        marginBottom: 30,
        border: "1px solid #1f2937",
      }}
    >
      {/* =========================
          SECTION HEADER
      ========================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <div
            style={{
              color: "#22c55e",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
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
            👥 Starting XI & Bench
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
          Official Lineups
        </div>
      </div>

      {/* =========================
         GRID CONTAINER FOR TEAMS
      ========================== */}

      <div
        className="lineups-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28,
  }}
      >
        {/* HOME TEAM */}

        <TeamPanel
          title={home.team?.name || "Home Team"}
          logo={home.team?.logo}
          formation={home.formation}
          players={homeXI}
          bench={homeBench}
          accent="#22c55e"
        />

        {/* AWAY TEAM */}

        <TeamPanel
          title={away.team?.name || "Away Team"}
          logo={away.team?.logo}
          formation={away.formation}
          players={awayXI}
          bench={awayBench}
          accent="#3b82f6"
        />
      </div>

    </section>
  );
}

function TeamPanel({
  title,
  logo,
  formation,
  players,
  bench,
  accent,
}) {
  return (
    <div
    className="team-panel"
      style={{
        background: "#1f2937",
        borderRadius: 20,
        padding: 24,
        border: `1px solid ${accent}30`,
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <Image
          src={logo || "/team.png"}
          unoptimized
          width={48}
          height={48}
          alt={title}
        />

        <div>
          <h3
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {title}
          </h3>

          <div
            style={{
              color: accent,
              fontSize: 14,
              fontWeight: 700,
              marginTop: 4,
            }}
          >

           
            Formation • {formation || "-"}
          </div>
        </div>
      </div>

      {/* Starting XI */}

      <h4
        style={{
          color: "#fff",
          marginBottom: 14,
          fontSize: 18,
        }}
      >

        {/* Formation Pitch */}

<FormationPitch
  lineup={{
    startXI: players,
    formation: formation,
  }}
/> 

        Starting XI
      </h4>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {players.map((item, index) => (
          <PlayerRow
            key={item.player?.id || index}
            player={item.player}
            accent={accent}
          />
        ))}
      </div>

      {/* Bench */}

      <h4
        style={{
          color: "#fff",
          marginTop: 28,
          marginBottom: 14,
          fontSize: 18,
        }}
      >
        Bench Players
      </h4>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {bench.map((item, index) => (
          <PlayerRow
            key={item.player?.id || index}
            player={item.player}
            accent="#64748b"
            bench
          />
        ))}
      </div>

    </div>
  );
}

function PlayerRow({
  player,
  accent,
  bench = false,
}) {
  return (
    <div
     className="player-row"
      style={{
        background: "#111827",
        borderRadius: 16,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: `1px solid ${accent}25`,
        transition: ".25s",
      }}
    >
      {/* Photo */}

      <Image
        src={player?.photo || "/player.png"}
        unoptimized
        width={52}
        height={52}
        alt={player?.name || "Player"}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      {/* Info */}

      <div
      className="player-info"
        style={{
          flex: 1,
        }}
      >
        <div
        className="player-info"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <strong
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            {player?.name}
          </strong>

          {player?.captain && (
            <span
              style={{
                background: "#f59e0b",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              C
            </span>
          )}

          {bench && (
            <span
              style={{
                background: "#475569",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              BENCH
            </span>
          )}
        </div>

        <div
          style={{
            marginTop: 5,
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          #{player?.number || "-"} • {player?.pos || "-"}
        </div>
      </div>

      {/* Shirt Number */}

      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontSize: 15,
          flexShrink: 0,
          boxShadow: `0 0 20px ${accent}55`,
        }}
      >
        {player?.number || "-"}
      </div>
    </div>
  );
}