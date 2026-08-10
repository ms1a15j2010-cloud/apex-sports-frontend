"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlayerSidebar({
  player,
}) {
  if (!player) return null;

  const nationality =
    player.nationality ||
    player.country ||
    "-";

  const age =
    player.age ||
    player.birth?.age ||
    "-";

  const position =
    player.position || "-";

  const number =
    player.number || "-";

  const height =
    player.height || "-";

  const weight =
    player.weight || "-";

  const club =
    player.team?.name ||
    player.club?.name ||
    "-";

  const clubLogo =
    player.team?.logo ||
    player.club?.logo ||
    "/team.png";

  return (
    <aside
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 25,
        marginBottom: 30,
        boxShadow:
          "0 8px 24px rgba(0,0,0,.35)",
      }}
    >
      {/* Player */}

      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <Image
          src={
            player.photo ||
            "/player.png"
          }
          alt={
            player.name ||
            "Player"
          }
          width={170}
          height={170}
          priority
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border:
              "4px solid #22c55e",
          }}
        />

        <h2
          style={{
            color: "#fff",
            marginTop: 18,
            marginBottom: 8,
          }}
        >
          {player.name}
        </h2>

        <div
          style={{
            color: "#94a3b8",
          }}
        >
          {position}
        </div>
      </div>

      {/* Club */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 16,
          padding: 18,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          Current Club
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Image
            src={clubLogo}
            alt={club}
            width={42}
            height={42}
          />

          <strong
            style={{
              color: "#fff",
            }}
          >
            {club}
          </strong>
        </div>
      </div>

      {/* Information */}

      <div
        style={{
          display: "grid",
          gap: 14,
          marginBottom: 25,
        }}
      >
        <InfoRow
          label="Nationality"
          value={nationality}
        />

        <InfoRow
          label="Age"
          value={age}
        />

        <InfoRow
          label="Position"
          value={position}
        />

        <InfoRow
          label="Shirt Number"
          value={number}
        />

        <InfoRow
          label="Height"
          value={height}
        />

        <InfoRow
          label="Weight"
          value={weight}
        />
      </div>

      {/* Quick Links */}

      <div
        style={{
          borderTop:
            "1px solid #374151",
          paddingTop: 20,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 15,
            fontSize: 18,
          }}
        >
          Quick Links
        </h3>

        <SidebarLink
          href="/today"
          text="Today's Matches"
          icon="⚽"
        />

        <SidebarLink
          href="/leagues"
          text="Leagues"
          icon="🏆"
        />

        <SidebarLink
          href="/search"
          text="Search Players"
          icon="🔍"
        />
      </div>
    </aside>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding: "14px 18px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#fff",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function SidebarLink({
  href,
  text,
  icon,
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        marginBottom: 10,
        borderRadius: 12,
        textDecoration: "none",
        background: "#1f2937",
        color: "#fff",
        transition:
          "all .25s ease",
      }}
    >
      <span
        style={{
          fontSize: 18,
        }}
      >
        {icon}
      </span>

      <span>{text}</span>
    </Link>
  );
}