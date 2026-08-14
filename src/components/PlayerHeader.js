"use client";

import Image from "next/image";

export default function PlayerHeader({ player }) {
  if (!player) return null;

  const playerPhoto = player.photo || null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* PLAYER PHOTO */}

        <div
          style={{
            textAlign: "center",
            minWidth: 220,
          }}
        >
          {playerPhoto ? (
            <Image
              src={playerPhoto}
              alt={player.name || "Player"}
              width={180}
              height={180}
              priority
              unoptimized
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #22c55e",
              }}
            />
          ) : (
            <div
              aria-label={
                player.name || "Player"
              }
              style={{
                width: 180,
                height: 180,
                margin: "0 auto",
                borderRadius: "50%",
                background:
                  "linear-gradient(145deg, #1f2937, #111827)",
                border:
                  "4px solid #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22c55e",
                fontSize: 64,
                fontWeight: 800,
              }}
            >
              {(player.name || "P")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            {player.name || "Unknown Player"}
          </h2>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            {player.position ||
              "Football Player"}
          </div>
        </div>

        {/* INFORMATION */}

        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 18,
          }}
        >
          <InfoCard
            title="Nationality"
            value={
              player.nationality || "-"
            }
          />

          <InfoCard
            title="Age"
            value={
              player.age || "-"
            }
          />

          <InfoCard
            title="Height"
            value={
              player.height || "-"
            }
          />

          <InfoCard
            title="Weight"
            value={
              player.weight || "-"
            }
          />

          <InfoCard
            title="Birth Date"
            value={
              player.birth?.date || "-"
            }
          />

          <InfoCard
            title="Birth Place"
            value={
              [
                player.birth?.place,
                player.birth?.country,
              ]
                .filter(Boolean)
                .join(", ") || "-"
            }
          />

          <InfoCard
            title="Current Club"
            value={
              player.team?.name ||
              player.club?.name ||
              "-"
            }
          />

          <InfoCard
            title="Jersey Number"
            value={
              player.number || "-"
            }
          />
        </div>
      </div>

      {/* SUMMARY */}

      <div
        style={{
          marginTop: 35,
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 15,
          }}
        >
          Player Overview
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          <strong>
            {player.name ||
              "This player"}
          </strong>{" "}
          is a professional football
          player representing{" "}
          <strong>
            {player.team?.name ||
              player.club?.name ||
              "his club"}
          </strong>
          . He plays primarily as{" "}
          <strong>
            {player.position || "-"}
          </strong>{" "}
          and represents{" "}
          <strong>
            {player.nationality || "-"}
          </strong>
          . Personal information, career
          statistics, transfers, injuries
          and performance data are
          automatically updated from the
          football data provider whenever
          new information becomes
          available.
        </p>
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
        borderRadius: 14,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          marginBottom: 8,
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
        {value}
      </div>
    </div>
  );
}