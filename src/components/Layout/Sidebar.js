"use client";

import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Live", "/live"],
  ["Today", "/today"],
  ["Leagues", "/league"],
  ["Teams", "/team"],
  ["Players", "/player"],
  ["Search", "/search"],
  ["Favorites", "/favorites"],
  ["Settings", "/settings"],
];

export default function Sidebar({ open }) {
  return (
    <aside
      style={{
        width: open ? 250 : 0,
        overflow: "hidden",
        transition: ".3s",
        background: "#111827",
        borderRight: "1px solid #1f2937",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {links.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            style={{
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: 10,
              background: "#1f2937",
            }}
          >
            {name}
          </Link>
        ))}
      </div>
    </aside>
  );
}