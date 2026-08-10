"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerCard({ player }) {
  if (!player) return null;

  return (
    <Link
      href={`/player/${player.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 16,
          padding: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Image
          src={player.photo}
          alt={player.name}
          width={70}
          height={70}
          style={{
            borderRadius: "50%",
          }}
        />

        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              color: "white",
            }}
          >
            {player.name}
          </h3>

          <p
            style={{
              color: "#94a3b8",
              marginTop: 5,
              marginBottom: 0,
            }}
          >
            {player.team}
          </p>

          <p
            style={{
              color: "#22c55e",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            {player.position}
          </p>
        </div>
      </div>
    </Link>
  );
}