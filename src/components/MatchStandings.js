"use client";

import Image from "next/image";

export default function MatchStandings({
  standings = [],
}) {
  if (!standings || standings.length === 0) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          📊 League Standings
        </h2>

        <p
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
    standings[0].league?.standings?.[0] ||
    standings[0].standings ||
    standings;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        📊 League Standings
      </h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            minWidth: 900,
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "#1f2937",
              }}
            >
              {[
                "#",
                "Team",
                "P",
                "W",
                "D",
                "L",
                "GF",
                "GA",
                "GD",
                "Pts",
              ].map(
                (head) => (
                  <th
                    key={head}
                    style={{
                      padding: 16,
                      color:
                        "#fff",
                      textAlign:
                        "center",
                      borderBottom:
                        "1px solid #374151",
                    }}
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {table.map(
              (club) => (
                <StandingsRow
                  key={
                    club.team.id
                  }
                  club={club}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ====================================== */

function StandingsRow({
  club,
}) {
  return (
    <tr
      style={{
        background:
          "#111827",
        borderBottom:
          "1px solid #374151",
      }}
    >
      <Cell>
        {club.rank}
      </Cell>

      <td
        style={{
          padding: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: 12,
          }}
        >
          <Image
            src={
              club.team.logo
            }
            alt={
              club.team.name
            }
            width={32}
            height={32}
          />

          <span
            style={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {club.team.name}
          </span>
        </div>
      </td>

      <Cell>
        {club.all.played}
      </Cell>

      <Cell>
        {club.all.win}
      </Cell>

      <Cell>
        {club.all.draw}
      </Cell>

      <Cell>
        {club.all.lose}
      </Cell>

      <Cell>
        {club.all.goals.for}
      </Cell>

      <Cell>
        {club.all.goals.against}
      </Cell>

      <Cell>
        {club.goalsDiff}
      </Cell>

      <Cell
        bold
      >
        {club.points}
      </Cell>
    </tr>
  );
}

/* ====================================== */

function Cell({
  children,
  bold,
}) {
  return (
    <td
      style={{
        padding: 14,
        color: "#fff",
        textAlign:
          "center",
        fontWeight: bold
          ? "bold"
          : "normal",
      }}
    >
      {children}
    </td>
  );
}