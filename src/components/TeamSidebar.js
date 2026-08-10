"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamSidebar({ team }) {
  if (!team) return null;

  return (
    <aside
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 24,
        color: "#fff",
        position: "sticky",
        top: 20,
      }}
    >
      {/* Logo */}

      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <Image
          src={team.logo || "/team.png"}
          alt={team.name || "Team"}
          width={120}
          height={120}
        />

        <h2
          style={{
            marginTop: 15,
            marginBottom: 5,
            fontSize: 24,
          }}
        >
          {team.name}
        </h2>

        <div
          style={{
            color: "#94a3b8",
          }}
        >
          {team.country}
        </div>
      </div>

      {/* Team Information */}

      <div
        style={{
          display: "grid",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <SidebarItem
          title="Founded"
          value={team.founded || "-"}
        />

        <SidebarItem
          title="Code"
          value={team.code || "-"}
        />

        <SidebarItem
          title="Stadium"
          value={team.venue?.name || "-"}
        />

        <SidebarItem
          title="Capacity"
          value={
            team.venue?.capacity
              ? team.venue.capacity.toLocaleString()
              : "-"
          }
        />

        <SidebarItem
          title="Coach"
          value={
            team.coach?.name || "Unknown"
          }
        />
      </div>

      {/* Quick Navigation */}

      <div
        style={{
          borderTop: "1px solid #1f2937",
          paddingTop: 20,
        }}
      >
        <h3
          style={{
            marginBottom: 15,
          }}
        >
          Quick Navigation
        </h3>

        <SidebarLink
          href="#overview"
          text="Overview"
        />

        <SidebarLink
          href="#statistics"
          text="Statistics"
        />

        <SidebarLink
          href="#fixtures"
          text="Fixtures"
        />

        <SidebarLink
          href="#results"
          text="Results"
        />

        <SidebarLink
          href="#squad"
          text="Squad"
        />

        <SidebarLink
          href="#transfers"
          text="Transfers"
        />

        <SidebarLink
          href="#injuries"
          text="Injuries"
        />

        <SidebarLink
          href="#trophies"
          text="Trophies"
        />
      </div>

      {/* League */}

      {team.league && (
        <div
          style={{
            marginTop: 28,
            borderTop: "1px solid #1f2937",
            paddingTop: 20,
          }}
        >
          <h3
            style={{
              marginBottom: 12,
            }}
          >
            League
          </h3>

          <Link
            href={`/league/${team.league.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "#22c55e",
            }}
          >
            <Image
              src={
                team.league.logo ||
                "/league.png"
              }
              alt={team.league.name}
              width={28}
              height={28}
            />

            {team.league.name}
          </Link>
        </div>
      )}

      {/* Website */}

      {team.website && (
        <div
          style={{
            marginTop: 25,
            borderTop: "1px solid #1f2937",
            paddingTop: 20,
          }}
        >
          <a
            href={team.website}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              wordBreak: "break-word",
            }}
          >
            Official Website
          </a>
        </div>
      )}
    </aside>
  );
}

function SidebarItem({
  title,
  value,
}) {
  return (
    <div>
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 4,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  text,
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        color: "#cbd5e1",
        textDecoration: "none",
        padding: "8px 0",
        borderBottom:
          "1px solid #1f2937",
      }}
    >
      {text}
    </Link>
  );
}