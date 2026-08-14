"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function Header({ onMenu }) {
  return (
    <header
      style={{
        height: 70,
        background: "#111827",
        borderBottom: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <button
          onClick={onMenu}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Menu size={26} />
        </button>

        <Link
          href="/dashboard"
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Apex Sports
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Link
          href="/search"
          aria-label="Search"
        >
          <Search color="white" />
        </Link>
      </div>
    </header>
  );
}