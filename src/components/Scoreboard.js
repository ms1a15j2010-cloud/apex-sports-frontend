"use client";

import Link from "next/link";

export default function Scoreboard({
  matches = [],
}) {
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
      {matches.map((m, index) => {
        const statusColor =
          m.status === "LIVE"
            ? "#22c55e"
            : m.status === "FT"
            ? "#ef4444"
            : "#f59e0b";

        const homeScore =
          m.goalsHome ??
          null;

        const awayScore =
          m.goalsAway ??
          null;

        const matchId =
          m.id ??
          `match-${index}`;

        return (
          <Link
            key={matchId}
            href={
              m.id
                ? `/match/${m.id}`
                : "#"
            }
            style={{
              textDecoration: "none",
              pointerEvents: m.id
                ? "auto"
                : "none",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr auto auto",
                alignItems: "center",
                padding: "18px 22px",
                borderBottom:
                  "1px solid #1f2937",
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
                  {m.home ||
                    "Home Team"}
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {m.away ||
                    "Away Team"}
                </div>
              </div>

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginRight: 25,
                  whiteSpace: "nowrap",
                }}
              >
                {homeScore ?? "—"}{" "}
                -{" "}
                {awayScore ?? "—"}
              </div>

              <span
                style={{
                  background:
                    statusColor,
                  color: "#fff",
                  padding:
                    "6px 14px",
                  borderRadius: 30,
                  fontWeight: 700,
                  fontSize: 13,
                  minWidth: 60,
                  textAlign:
                    "center",
                }}
              >
                {m.status ||
                  "NS"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}