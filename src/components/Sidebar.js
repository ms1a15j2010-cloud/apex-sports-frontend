"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "MAIN",
    items: [
      { name: "Home", href: "/", icon: "🏠" },
      { name: "Live Scores", href: "/live", icon: "🔴" },
      { name: "Fixtures", href: "/fixtures/epl", icon: "📅" },
      { name: "Results", href: "/results/epl", icon: "✅" },
      { name: "Standings", href: "/standings/epl", icon: "📊" },
      { name: "Top Scorers", href: "/top-scorers/epl", icon: "⚽" },
    ],
  },

  {
    title: "ENGLAND",
    items: [
      { name: "Premier League", href: "/league/epl", icon: "🏆" },
      { name: "Championship", href: "/league/championship", icon: "🥈" },
      { name: "FA Cup", href: "/league/fa-cup", icon: "🏅" },
      { name: "League Cup", href: "/league/league-cup", icon: "🥇" },
    ],
  },

  {
    title: "SPAIN",
    items: [
      { name: "La Liga", href: "/league/la-liga", icon: "🇪🇸" },
      { name: "Copa del Rey", href: "/league/copa-del-rey", icon: "🏆" },
    ],
  },

  {
    title: "GERMANY",
    items: [
      { name: "Bundesliga", href: "/league/bundesliga", icon: "🇩🇪" },
    ],
  },

  {
    title: "ITALY",
    items: [
      { name: "Serie A", href: "/league/serie-a", icon: "🇮🇹" },
    ],
  },

  {
    title: "FRANCE",
    items: [
      { name: "Ligue 1", href: "/league/ligue-1", icon: "🇫🇷" },
    ],
  },

  {
    title: "EUROPE",
    items: [
      {
        name: "Champions League",
        href: "/league/champions-league",
        icon: "⭐",
      },
      {
        name: "Europa League",
        href: "/league/europa-league",
        icon: "✨",
      },
      {
        name: "Conference League",
        href: "/league/conference-league",
        icon: "🏆",
      },
    ],
  },

  {
    title: "INTERNATIONAL",
    items: [
      { name: "World Cup", href: "/league/world-cup", icon: "🌍" },
      { name: "Euro Cup", href: "/league/euro", icon: "🇪🇺" },
      { name: "Copa America", href: "/league/copa-america", icon: "🏆" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 280,
        boxSizing: "border-box",
        background: "#0f172a",
        color: "white",
        height: "100vh",
        overflowY: "auto",
        position: "fixed",
        left: 0,
        top: 0,
        borderRight: "1px solid #1e293b",
        paddingBottom: 50,
      }}
    >
      <div
        style={{
          padding: 20,
          fontSize: 26,
          fontWeight: 700,
          borderBottom: "1px solid #1e293b",
          position: "sticky",
          top: 0,
          background: "#0f172a",
          zIndex: 10,
        }}
      >
        ⚽ Apex Sports
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <div
            style={{
              padding: "18px 20px 10px",
              color: "#94a3b8",
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
            }}
          >
            {section.title}
          </div>

          {section.items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 20px",
                  color: active ? "#22c55e" : "#e5e7eb",
                  textDecoration: "none",
                  background: active ? "#1e293b" : "transparent",
                  borderLeft: active
                    ? "4px solid #22c55e"
                    : "4px solid transparent",
                  transition: ".25s",
                  fontWeight: active ? 700 : 500,
                }}
              >
                <span
                  style={{
                    width: 24,
                    textAlign: "center",
                  }}
                >
                  {item.icon}
                </span>

                {item.name}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}