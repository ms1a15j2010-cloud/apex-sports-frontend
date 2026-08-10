"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueStandings({
  standings = [],
}) {
  if (
    !standings ||
    standings.length === 0
  ) {
    return (
      <section
        className="league-standings"
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          className="league-standings-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          📊 League Standings
        </h2>

        <p
          className="league-standings-empty"
          style={{
            color: "#94a3b8",
          }}
        >
          Standings unavailable.
        </p>
      </section>
    );
  }

  const table =
    standings[0]?.league?.standings?.[0] ||
    standings[0]?.standings ||
    standings;

  return (
    <section
      className="league-standings"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        className="league-standings-title"
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        📊 League Table
      </h2>

      <div
        className="league-table-wrapper"
        style={{
          overflowX: "auto",
        }}
      >
        <table
          className="league-table"
          style={{
            width: "100%",
            minWidth: 950,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              className="league-table-head"
              style={{
                background: "#1f2937",
              }}
            >
              {[
                "#",
                "Club",
                "P",
                "W",
                "D",
                "L",
                "GF",
                "GA",
                "GD",
                "PTS",
              ].map((item) => (
                <th
                  key={item}
                  className="league-table-th"
                  style={{
                    padding: 16,
                    color: "#fff",
                    borderBottom:
                      "1px solid #374151",
                  }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.map((club) => (
              <StandingsRow
                key={club.team.id}
                club={club}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ===================================== */

function StandingsRow({
  club,
}) {
  const rowColor =
    club.rank <= 4
      ? "#16a34a"
      : club.rank <= 6
      ? "#2563eb"
      : club.rank >= 18
      ? "#dc2626"
      : "#374151";

  return (
    <tr
      className="league-table-row"
      style={{
        borderBottom:
          "1px solid #374151",
      }}
    >
      <td
        className="league-rank-cell"
        style={{
          padding: 14,
          textAlign: "center",
        }}
      >
        <div
          className="league-rank-badge"
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: rowColor,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            fontWeight: "bold",
          }}
        >
          {club.rank}
        </div>
      </td>

      <td
        className="league-club-cell"
        style={{
          padding: 14,
        }}
      >
        <Link
          href={`/team/${club.team.id}`}
          className="league-team-link"
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <div
            className="league-team-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
              className="league-team-logo"
              src={club.team.logo}
              alt={club.team.name}
              width={34}
              height={34}
            />

            <strong className="league-team-name">
              {club.team.name}
            </strong>
          </div>
        </Link>
      </td>

      <Cell>{club.all.played}</Cell>

      <Cell>{club.all.win}</Cell>

      <Cell>{club.all.draw}</Cell>

      <Cell>{club.all.lose}</Cell>

      <Cell>{club.all.goals.for}</Cell>

      <Cell>{club.all.goals.against}</Cell>

      <Cell>{club.goalsDiff}</Cell>

      <Cell bold>{club.points}</Cell>
    </tr>
  );
}

/* ===================================== */

function Cell({
  children,
  bold,
}) {
  return (
    <td
      className={`league-table-cell ${
        bold ? "league-table-cell-bold" : ""
      }`}
      style={{
        padding: 14,
        textAlign: "center",
        color: "#fff",
        fontWeight: bold
          ? "bold"
          : "normal",
      }}
    >
      {children}
    </td>
  );
}