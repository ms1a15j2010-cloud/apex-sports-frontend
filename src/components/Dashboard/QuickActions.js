"use client";

import Link from "next/link";

const actions = [
  {
    title: "Live Matches",
    href: "/live",
    icon: "🔴",
    color: "#ef4444",
  },
  {
    title: "Today's Matches",
    href: "/today",
    icon: "📅",
    color: "#3b82f6",
  },
  {
    title: "Leagues",
    href: "/leagues",
    icon: "🏆",
    color: "#f59e0b",
  },
  {
    title: "Search",
    href: "/search",
    icon: "🔍",
    color: "#06b6d4",
  },
];

export default function QuickActions() {
  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 25,
        color: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: 28,
          marginBottom: 25,
        }}
      >
        ⚡ Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 20,
        }}
      >
        {actions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <div
              style={{
                background: "#1f2937",
                borderRadius: 16,
                padding: 25,
                textAlign: "center",
                border: `2px solid ${item.color}`,
                transition: "0.25s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  marginBottom: 12,
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </h3>

              <span
                style={{
                  color: item.color,
                  fontWeight: 700,
                }}
              >
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}