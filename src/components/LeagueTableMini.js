"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueTableMini({
  standings = [],
  league = "",
  homeTeamId = null,
  awayTeamId = null,
}) {
  // Support both API formats
  const table = Array.isArray(standings[0])
    ? standings[0]
    : standings;

  if (!table.length) return null;

  /* ================================
      HELPERS
  ================================= */

  function positionColor(rank) {
    if (rank === 1) return "#16a34a";
    if (rank <= 4) return "#2563eb";
    if (rank <= 6) return "#9333ea";
    if (rank >= table.length - 2) return "#dc2626";

    return "#475569";
  }

  function positionIcon(rank) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
  }

  function formColor(letter) {
    if (letter === "W") return "#22c55e";
    if (letter === "D") return "#facc15";
    if (letter === "L") return "#ef4444";

    return "#475569";
  }

  function isCurrentTeam(id) {
    return (
      id === homeTeamId ||
      id === awayTeamId
    );
  }

  const legend = [
    {
      color: "#16a34a",
      label: "Champion",
    },
    {
      color: "#2563eb",
      label: "Champions League",
    },
    {
      color: "#9333ea",
      label: "Europa",
    },
    {
      color: "#dc2626",
      label: "Relegation",
    },
  ];

  return (
    <section className="league-table-mini">

      {/* Header */}

      <div className="league-table-header">

        <h2 className="league-table-title">
          🏆 League Table
        </h2>

        <Link
          href={`/standings/${league}`}
          className="league-table-link"
        >
          View Full Table →
        </Link>

      </div>

      {/* Table */}

      <div className="league-table-wrapper">

        <table className="league-table">

          <thead className="league-table-head">

            <tr className="league-table-head-row">

              <th className="league-table-th league-table-th-rank">
                #
              </th>

              <th className="league-table-th league-table-th-club">
                Club
              </th>

              <th className="league-table-th">
                P
              </th>

              <th className="league-table-th">
                W
              </th>

              <th className="league-table-th">
                D
              </th>

              <th className="league-table-th">
                L
              </th>

              <th className="league-table-th">
                GF
              </th>

              <th className="league-table-th">
                GA
              </th>

              <th className="league-table-th">
                GD
              </th>

              <th className="league-table-th">
                Pts
              </th>

              <th className="league-table-th">
                Form
              </th>

            </tr>

          </thead>

          <tbody>

            {table.map((team) => {

              const current =
                isCurrentTeam(team.team.id);

              return (

                <tr
                  key={team.team.id}
                  className={`league-table-row ${
                    current
                      ? "league-table-row-current"
                      : ""
                  }`}
                >

                  {/* Position */}

                  <td className="league-table-position">

                    <div
                      className="league-table-position-badge"
                      style={{
                        background: positionColor(
                          team.rank
                        ),
                      }}
                    >
                      {positionIcon(team.rank)}
                    </div>

                  </td>

                  {/* Club */}

                  <td className="league-table-club">

                    <Link
                      href={`/team/${team.team.id}`}
                      className="league-table-team-link"
                    >

                      <div className="league-table-team">

                        <Image
                          src={team.team.logo}
                          alt={team.team.name}
                          width={34}
                          height={34}
                          className="league-table-team-logo"
                        />

                        <div>

                          <div
                            className={`league-table-team-name ${
                              current
                                ? "league-table-team-name-current"
                                : ""
                            }`}
                          >
                            {team.team.name}
                          </div>

                          {current && (
                            <div className="league-table-current-match">
                              Current Match
                            </div>
                          )}

                        </div>

                      </div>

                    </Link>

                  </td>

                  {/* Played */}

                  <td className="league-table-cell">
                    {team.all.played}
                  </td>

                  {/* Wins */}

                  <td className="league-table-cell league-table-win">
                    {team.all.win}
                  </td>

                  {/* Draw */}

                  <td className="league-table-cell league-table-draw">
                    {team.all.draw}
                  </td>

                  {/* Loss */}

                  <td className="league-table-cell league-table-loss">
                    {team.all.lose}
                  </td>

                  {/* Goals For */}

                  <td className="league-table-cell">
                    {team.all.goals.for}
                  </td>

                  {/* Goals Against */}

                  <td className="league-table-cell">
                    {team.all.goals.against}
                  </td>
                                    {/* Goals Against */}

                  <td className="league-table-cell">
                    {team.all.goals.against}
                  </td>

                  {/* Goal Difference */}

                  <td
                    className={`league-table-cell league-table-goal-diff ${
                      team.goalsDiff >= 0
                        ? "league-table-goal-positive"
                        : "league-table-goal-negative"
                    }`}
                  >
                    {team.goalsDiff > 0
                      ? `+${team.goalsDiff}`
                      : team.goalsDiff}
                  </td>

                  {/* Points */}

                  <td className="league-table-cell">

                    <span className="league-table-points">
                      {team.points}
                    </span>

                  </td>

                  {/* Form */}

                  <td className="league-table-form-cell">

                    <div className="league-table-form">

                      {(team.form || "")
                        .split("")
                        .slice(-5)
                        .map((letter, index) => (

                          <div
                            key={index}
                            className="league-table-form-item"
                            style={{
                              background: formColor(letter),
                            }}
                          >
                            {letter}
                          </div>

                        ))}

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* Legend */}

      <div className="league-table-legend">

        {legend.map((item) => (

          <div
            key={item.label}
            className="league-table-legend-item"
          >

            <div
              className="league-table-legend-color"
              style={{
                background: item.color,
              }}
            />

            <span className="league-table-legend-label">
              {item.label}
            </span>

          </div>

        ))}

      </div>

      {/* League Summary */}

      <div className="league-table-summary">

        <div className="league-table-summary-card">

          <div className="league-table-summary-label">
            Teams
          </div>

          <div className="league-table-summary-number">
            {table.length}
          </div>

        </div>

        <div className="league-table-summary-card">

          <div className="league-table-summary-label">
            Leader
          </div>

          <div className="league-table-summary-leader">
            {table[0]?.team?.name}
          </div>

        </div>

        <div className="league-table-summary-card">

          <div className="league-table-summary-label">
            Leader Points
          </div>

          <div className="league-table-summary-points">
            {table[0]?.points}
          </div>

        </div>

        <div className="league-table-summary-card">

          <div className="league-table-summary-label">
            Average Points
          </div>

          <div className="league-table-summary-average">
            {(
              table.reduce(
                (sum, t) => sum + t.points,
                0
              ) / table.length
            ).toFixed(1)}
          </div>

        </div>

      </div>
            {/* Footer */}

      <div className="league-table-footer">

        <span className="league-table-footer-text">
          Current league standings
        </span>

        <Link
          href={`/standings/${league}`}
          className="league-table-footer-link"
        >
          Full Standings →
        </Link>

      </div>

    </section>
  );
}