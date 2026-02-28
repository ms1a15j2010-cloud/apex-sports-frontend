"use client";

import Link from "next/link";

export default function Scoreboard({ matches }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#020617",
        }}
      >
        <thead>
          <tr style={{ background: "#020617" }}>
            <th align="left">Match</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr
              key={m.id}
              style={{ cursor: "pointer", borderBottom: "1px solid #1e293b" }}
            >
              <td>
                <Link href={`/match/${m.id}`}>
                  {m.home} vs {m.away}
                </Link>
              </td>
              <td align="center">
                {m.goalsHome} – {m.goalsAway}
              </td>
              <td align="center">
                <span
                  style={{
                    color:
                      m.status === "LIVE"
                        ? "lime"
                        : m.status === "FT"
                        ? "red"
                        : "gold",
                  }}
                >
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
