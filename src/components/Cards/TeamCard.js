"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamCard({ team }) {
  if (!team) return null;

  return (
    <Link
      href={`/team/${team.id}`}
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
          transition: ".25s",
          cursor: "pointer",
        }}
      >
        <Image
          src={team.logo}
          alt={team.name}
          width={60}
          height={60}
        />

        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              color: "white",
            }}
          >
            {team.name}
          </h3>

          <p
            style={{
              color: "#94a3b8",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            {team.country}
          </p>
        </div>
      </div>
    </Link>
  );
}