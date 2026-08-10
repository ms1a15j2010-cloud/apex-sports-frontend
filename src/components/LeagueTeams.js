"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeagueTeams({
  teams = [],
}) {
  if (!teams || teams.length === 0) {
    return (
      <section
        className="league-teams"
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          className="league-teams-title"
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          🏟 League Teams
        </h2>

        <p
          className="league-teams-empty"
          style={{
            color: "#94a3b8",
          }}
        >
          No teams available.
        </p>
      </section>
    );
  }

  return (
    <section
      className="league-teams"
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        className="league-teams-title"
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        🏟 League Clubs
      </h2>

      <div
        className="league-teams-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(240px,1fr))",
          gap: 22,
        }}
      >
        {teams.map((club) => {
          const team =
            club.team || club;

          const venue =
            club.venue || {};

          return (
            <Link
              key={team.id}
              href={`/team/${team.id}`}
              className="league-team-link"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                className="league-team-card"
                style={{
                  background: "#1f2937",
                  borderRadius: 18,
                  padding: 24,
                  transition: ".25s",
                  textAlign: "center",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                {/* Logo */}

                <Image
                  className="league-team-logo"
                  src={
                    team.logo ||
                    "/team.png"
                  }
                  alt={
                    team.name
                  }
                  width={90}
                  height={90}
                  style={{
                    objectFit:
                      "contain",
                    margin:
                      "0 auto 18px",
                  }}
                />

                {/* Name */}

                <h3
                  className="league-team-name"
                  style={{
                    color: "#fff",
                    marginBottom: 10,
                    fontSize: 20,
                  }}
                >
                  {team.name}
                </h3>

                {/* Country */}

                <p
                  className="league-team-country"
                  style={{
                    color: "#94a3b8",
                    marginBottom: 14,
                  }}
                >
                  🌍{" "}
                  {team.country ||
                    "-"}
                </p>

                {/* Details */}

                <div
                  className="league-team-info-list"
                  style={{
                    display: "grid",
                    gap: 10,
                    marginTop: 18,
                    textAlign: "left",
                  }}
                >
                  <Info
                    label="Founded"
                    value={
                      team.founded ||
                      "-"
                    }
                  />

                  <Info
                    label="Stadium"
                    value={
                      venue.name ||
                      "-"
                    }
                  />

                  <Info
                    label="City"
                    value={
                      venue.city ||
                      "-"
                    }
                  />
                </div>

                {/* Button */}

                <div
                  className="league-team-button-wrapper"
                  style={{
                    marginTop: 24,
                  }}
                >
                  <span
                    className="league-team-button"
                    style={{
                      display:
                        "inline-block",
                      background:
                        "#22c55e",
                      color: "#fff",
                      padding:
                        "10px 18px",
                      borderRadius: 12,
                      fontWeight:
                        "bold",
                    }}
                  >
                    View Team →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
/* ====================================== */

function Info({
  label,
  value,
}) {
  return (
    <div
      className="league-team-info"
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        color: "#cbd5e1",
        fontSize: 14,
      }}
    >
      <span
        className="league-team-info-label"
        style={{
          color: "#94a3b8",
        }}
      >
        {label}
      </span>

      <span
        className="league-team-info-value"
        style={{
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  );
}