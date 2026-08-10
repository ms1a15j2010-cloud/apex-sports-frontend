"use client";

import Image from "next/image";

export default function MatchLineups({
  lineups = [],
}) {
  if (!lineups || lineups.length < 2) {
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
            marginBottom: 20,
          }}
        >
          🧩 Match Lineups
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Lineups are not available.
        </p>
      </section>
    );
  }

  const home = lineups[0];
  const away = lineups[1];

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
          marginBottom: 30,
        }}
      >
        🧩 Starting XI & Bench
      </h2>

      {/* Formation */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          gap: 30,
          alignItems: "center",
          marginBottom: 35,
        }}
      >
        <FormationCard
          lineup={home}
        />

        <div
          style={{
            color: "#94a3b8",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          VS
        </div>

        <FormationCard
          lineup={away}
        />
      </div>

      {/* Players */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 30,
        }}
      >
        <SquadColumn
          title="Starting XI"
          leftPlayers={
            home.startXI || []
          }
          rightPlayers={
            away.startXI || []
          }
        />

        <SquadColumn
          title="Substitutes"
          leftPlayers={
            home.substitutes || []
          }
          rightPlayers={
            away.substitutes || []
          }
        />
      </div>
    </section>
  );
}

/* =====================================================
   Formation
===================================================== */

function FormationCard({
  lineup,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 20,
        textAlign: "center",
      }}
    >
      <Image
        src={
          lineup.team?.logo ||
          "/team.png"
        }
        alt={
          lineup.team?.name
        }
        width={70}
        height={70}
      />

      <h3
        style={{
          color: "#fff",
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        {lineup.team?.name}
      </h3>

      <div
        style={{
          color: "#22c55e",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        {lineup.formation ||
          "-"}
      </div>

      <div
        style={{
          color: "#94a3b8",
          marginTop: 12,
        }}
      >
        Coach:
        {" "}
        {lineup.coach?.name ||
          "-"}
      </div>
    </div>
  );
}

/* =====================================================
   Squad Columns
===================================================== */

function SquadColumn({
  title,
  leftPlayers,
  rightPlayers,
}) {
  const max = Math.max(
    leftPlayers.length,
    rightPlayers.length
  );

  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 20,
      }}
    >
      <h3
        style={{
          color: "#fff",
          marginBottom: 22,
          textAlign: "center",
        }}
      >
        {title}
      </h3>

      {Array.from({
        length: max,
      }).map((_, index) => {
        const left =
          leftPlayers[index]
            ?.player || {};

        const right =
          rightPlayers[index]
            ?.player || {};

        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr auto 1fr",
              gap: 12,
              alignItems:
                "center",
              padding:
                "12px 0",
              borderBottom:
                "1px solid #374151",
            }}
          >
            {/* Home */}

            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {left.name ||
                  "-"}
              </div>

              <div
                style={{
                  color:
                    "#94a3b8",
                  fontSize: 13,
                }}
              >
                #{left.number ||
                  "-"}
              </div>
            </div>

            <div
              style={{
                color: "#64748b",
                fontWeight: "bold",
              }}
            >
              │
            </div>

            {/* Away */}

            <div
              style={{
                textAlign:
                  "right",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {right.name ||
                  "-"}
              </div>

              <div
                style={{
                  color:
                    "#94a3b8",
                  fontSize: 13,
                }}
              >
                #{right.number ||
                  "-"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}