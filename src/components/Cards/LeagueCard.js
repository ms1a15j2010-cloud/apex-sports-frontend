"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueCard({ league }) {
  if (!league?.league) return null;

  return (
    <Link
      href={`/league/${league.league.id}`}
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
          src={league.league.logo}
          alt={league.league.name}
          width={60}
          height={60}
        />

        <div>
          <h3
            style={{
              margin: 0,
              color: "white",
            }}
          >
            {league.league.name}
          </h3>

          <p
            style={{
              color: "#94a3b8",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            {league.country?.name}
          </p>

          <p
            style={{
              color: "#22c55e",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Season {league.seasons?.[0]?.year}
          </p>
        </div>
      </div>
    </Link>
  );
}