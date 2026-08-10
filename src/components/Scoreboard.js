"use client";

import Link from "next/link";

export default function Scoreboard({ matches = [] }) {
  if (!matches.length) {
    return (
      <div
        style={{
          background: "#111827",
          color: "#fff",
          padding: 30,
          borderRadius: 18,
          textAlign: "center",
        }}
      >
        No matches available.
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid #1f2937",
      }}
    >
      {matches.map((m) => {
        const statusColor =
          m.status === "LIVE"
            ? "#22c55e"
            : m.status === "FT"
            ? "#ef4444"
            : "#f59e0b";

        return (
          <Link
            key={m.id}
            href={`/match/${m.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                alignItems: "center",
                padding: "18px 22px",
                borderBottom: "1px solid #1f2937",
                transition: ".25s",
                color: "#fff",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {m.home}
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {m.away}
                </div>
              </div>

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginRight: 25,
                }}
              >
                {m.goalsHome} - {m.goalsAway}
              </div>

              <span
                style={{
                  background: statusColor,
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 30,
                  fontWeight: 700,
                  fontSize: 13,
                  minWidth: 60,
                  textAlign: "center",
                }}
              >
                {m.status}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}