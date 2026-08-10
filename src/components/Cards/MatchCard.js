"use client";

import Link from "next/link";
import Image from "next/image";

export default function MatchCard({ match }) {
  if (!match) return null;

  return (
    <Link
      href={`/match/${match.fixture?.id}`}
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
          padding: 18,
        }}
      >
        {/* League */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {match.league?.logo && (
            <Image
              src={match.league.logo}
              alt={match.league.name}
              width={22}
              height={22}
            />
          )}

          <span
            style={{
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            {match.league?.name}
          </span>
        </div>

        {/* Teams */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {match.home?.logo && (
              <Image
                src={match.home.logo}
                alt={match.home.name}
                width={32}
                height={32}
              />
            )}

            <span>{match.home?.name}</span>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {match.goals?.home ?? "-"} : {match.goals?.away ?? "-"}
            </div>

            <div
              style={{
                color: "#22c55e",
                fontSize: 13,
              }}
            >
              {match.status?.short}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span>{match.away?.name}</span>

            {match.away?.logo && (
              <Image
                src={match.away.logo}
                alt={match.away.name}
                width={32}
                height={32}
              />
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: 15,
            display: "flex",
            justifyContent: "space-between",
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          <span>{match.fixture?.venue?.name || "Unknown Venue"}</span>

          <span>{match.status?.long}</span>
        </div>
      </div>
    </Link>
  );
}