"use client";

import Image from "next/image";
import FormationPitch from "./FormationPitch";
import { parseFormation } from "./Formation/FormationParser";

export default function Lineups({ lineups = [] }) {
  if (!lineups?.length) {
    return (
      <section
        style={{
          marginTop: 30,
          background: "#111827",
          borderRadius: 18,
          padding: 30,
          color: "white",
          textAlign: "center",
        }}
      >
        No lineup available.
      </section>
    );
  }

  const home =
  lineups[0]
    ? parseFormation(
        lineups[0].formation,
        lineups[0].startXI
      )
    : [];

const away =
  lineups[1]
    ? parseFormation(
        lineups[1].formation,
        lineups[1].startXI
      )
    : [];

  return (
    <section
      style={{
        marginTop: 30,
      }}
    >
      {/* Formation Pitch */}

      {lineups.length >= 2 && (
        <FormationPitch
          home={home}
          away={away}
        />
      )}

      {/* Team Lists */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(380px,1fr))",
          gap: 25,
          marginTop: 30,
        }}
      >
        {lineups.map((team) => (
          <div
            key={team.team?.id}
            style={{
              background: "#111827",
              borderRadius: 16,
              padding: 22,
            }}
          >
            {/* Team Header */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <Image
                src={team.team?.logo || "/team.png"}
                alt={team.team?.name || "Team"}
                width={45}
                height={45}
              />

              <div>
                <h3
                  style={{
                    color: "white",
                    margin: 0,
                  }}
                >
                  {team.team?.name || "Unknown Team"}
                </h3>

                <div
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Formation {team.formation || "-"}
                </div>
              </div>
            </div>

            {/* Coach */}

            <h4
              style={{
                color: "#38bdf8",
                marginBottom: 10,
              }}
            >
              Coach
            </h4>

            <div
              style={{
                color: "white",
                marginBottom: 22,
              }}
            >
              {team.coach?.name || "Unknown Coach"}
            </div>

            {/* Starting XI */}

            <h4
              style={{
                color: "#22c55e",
                marginBottom: 12,
              }}
            >
              Starting XI
            </h4>

            {(team.startXI || []).map(({ player }) => (
              <div
                key={player.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #1f2937",
                  color: "white",
                }}
              >
                <span>
                  #{player.number ?? "-"}{" "}
                  {player.name || "Unknown"}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {player.pos || "-"}
                </span>
              </div>
            ))}

            {/* Bench */}

            <h4
              style={{
                marginTop: 25,
                marginBottom: 12,
                color: "#facc15",
              }}
            >
              Bench
            </h4>

            {(team.substitutes || []).map(({ player }) => (
              <div
                key={player.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #1f2937",
                  color: "white",
                }}
              >
                <span>
                  #{player.number ?? "-"}{" "}
                  {player.name || "Unknown"}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {player.pos || "-"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}