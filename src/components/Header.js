"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Live", href: "/live" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Results", href: "/results" },
    { name: "Standings", href: "/standings/39" },
    { name: "Top Scorers", href: "/top-scorers/39" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#020617",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 20px",
        }}
      >
        {/* <Link
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          ▲ Apex Sports
        </Link> */}

        <nav
          style={{
            display: "flex",
            gap: 25,
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: 26,
            cursor: "pointer",
          }}
          className="mobile-menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          style={{
            background: "#111827",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "white",
                textDecoration: "none",
              }}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}