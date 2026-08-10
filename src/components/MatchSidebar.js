"use client";

import Image from "next/image";
import Link from "next/link";

export default function MatchSidebar({
  match,
}) {
  if (!match) return null;

  const fixture = match.fixture || {};
  const league = match.league || {};
  const home = match.teams?.home || {};
  const away = match.teams?.away || {};
  const goals = match.goals || {};

  return (
    <aside
    className="match-sidebar"
      style={{
        position: "sticky",
        top: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Match Summary */}

      <SidebarCard title="⚽ Match Summary">
        <div
        className="sidebar-card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <TeamMini team={home} />

          <div
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 26,
            }}
          >
            {goals.home ?? "-"} - {goals.away ?? "-"}
          </div>

          <TeamMini team={away} />
        </div>

        <Info
          label="Status"
          value={fixture.status?.long || "-"}
        />

        <Info
          label="Date"
          value={
            fixture.date
              ? new Date(fixture.date).toLocaleString()
              : "-"
          }
        />

        <Info
          label="Referee"
          value={fixture.referee || "-"}
        />
      </SidebarCard>

      {/* Competition */}

      <SidebarCard title="🏆 Competition">
        <Info
          label="League"
          value={league.name || "-"}
        />

        <Info
          label="Country"
          value={league.country || "-"}
        />

        <Info
          label="Season"
          value={league.season || "-"}
        />

        <Info
          label="Round"
          value={league.round || "-"}
        />
      </SidebarCard>

      {/* Venue */}

      <SidebarCard title="🏟 Venue">
        <Info
          label="Stadium"
          value={fixture.venue?.name || "-"}
        />

        <Info
          label="City"
          value={fixture.venue?.city || "-"}
        />
      </SidebarCard>

      {/* Quick Links */}

      <SidebarCard title="🔗 Quick Links">
        <SidebarLink
          href={`/team/${home.id}`}
          text={`${home.name} Team`}
        />

        <SidebarLink
          href={`/team/${away.id}`}
          text={`${away.name} Team`}
        />

        {league.id && (
          <SidebarLink
            href={`/league/${league.id}`}
            text={`${league.name}`}
          />
        )}
      </SidebarCard>
    </aside>
  );
}

/* ===================================== */

function SidebarCard({
  title,
  children,
}) {
  return (
    <div className="sidebar-score"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 22,
      }}
    >
      <h3
        style={{
          color: "#fff",
          marginBottom: 18,
          fontSize: 20,
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

/* ===================================== */

function TeamMini({
  team,
}) {
  return (
    <div
    className="sidebar-info"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        width: 90,
      }}
    >
      <Image
        src={
  team.logo &&
  team.logo.startsWith("http")
    ? team.logo
    : "/team.png"
}
        alt={team.name || "Team"}
        width={46}
        height={46}
      />

      <span
       className="sidebar-team-name"
  style={{
    color: "#fff",
    fontWeight: 600,
    textAlign: "right",
    marginLeft: 10,
    maxWidth: "60%",
    overflowWrap: "break-word",
  }}
>
        {team.name}
      </span>
    </div>
  );
}

/* ===================================== */

function Info({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #374151",
      }}
    >
      <span
      className="sidebar-label"
        style={{
          color: "#94a3b8",
        }}
      >
        {label}
      </span>

      <span
       className="sidebar-value"
        style={{
          color: "#fff",
          fontWeight: 600,
          textAlign: "right",
          marginLeft: 10,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ===================================== */

function SidebarLink({
  href,
  text,
}) {
  return (
    <Link
     className="sidebar-link"
      href={href}
      style={{
        display: "block",
        background: "#1f2937",
        color: "#fff",
        textDecoration: "none",
        padding: "12px 16px",
        borderRadius: 12,
        marginBottom: 12,
        transition: ".2s",
        fontWeight: 600,
      }}
    >
      {text}
    </Link>
  );
}