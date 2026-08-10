"use client";

import Link from "next/link";

export default function LeagueSidebar({ league, standings }) {
  if (!league) return null;

  // This is the list of leagues shown under "ENGLAND" in your sidebar
  const englandLeagues = [
    { id: "39", name: "Premier League", slug: "epl" },
    { id: "40", name: "Championship", slug: "championship" },
    { id: "45", name: "FA Cup", slug: "fa-cup" },
    { id: "48", name: "League Cup", slug: "league-cup" },
  ];

  return (
    <aside
      style={{
        background: "#111827",
        borderRadius: 22,
        padding: "20px 16px",
        border: "1px solid #1f2937",
        height: "fit-content",
      }}
    >
      {/* ======================================
          MAIN MENU
      ====================================== */}
      <div style={{ marginBottom: 30 }}>
        <div
          style={{
            color: "#64748b",
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 16,
            paddingLeft: 8,
          }}
        >
          MAIN
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <SidebarLink href="/" icon="🏠" label="Home" />
          <SidebarLink href="/live" icon="🔴" label="Live Scores" />
          <SidebarLink href="/fixtures" icon="📅" label="Fixtures" />
          <SidebarLink href="/results" icon="✅" label="Results" />
          <SidebarLink href="/standings" icon="📊" label="Standings" />
          <SidebarLink href="/top-scorers" icon="⚽" label="Top Scorers" />
        </nav>
      </div>

      {/* ======================================
          ENGLAND LEAGUES (Fixed Duplicate Bug)
      ====================================== */}
      <div>
        <div
          style={{
            color: "#64748b",
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 16,
            paddingLeft: 8,
          }}
        >
          ENGLAND
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {englandLeagues
            // ✅ THIS FILTER REMOVES THE DUPLICATE CARD
            .filter((l) => l.id !== league.id)
            .map((l) => (
              <Link
                key={l.id}
                href={`/league/${l.slug || l.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  fontSize: 15,
                  fontWeight: 500,
                }}
                // Hover effect
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1f2937";
                  e.currentTarget.style.color = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                <span style={{ fontSize: 18 }}>🏆</span>
                {l.name}
              </Link>
            ))
          }
        </nav>
      </div>
    </aside>
  );
}

/* ======================================
   Sidebar Link Helper Component
====================================== */

function SidebarLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        color: "#94a3b8",
        textDecoration: "none",
        transition: "all 0.2s",
        fontSize: 15,
        fontWeight: 500,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1f2937";
        e.currentTarget.style.color = "#e2e8f0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#94a3b8";
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </Link>
  );
}