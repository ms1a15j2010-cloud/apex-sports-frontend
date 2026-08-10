"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LeagueList({
  leagues = [],
  title = "Football Leagues",
  showSearch = true,
  showCountry = true,
  showSeason = true,
  compact = false,
}) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");

  const countries = useMemo(() => {
    const list = [
      "All",
      ...new Set(
        leagues
          .map((l) => l.country?.name)
          .filter(Boolean)
      ),
    ];

    return list.sort();
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    return leagues.filter((league) => {
      const matchSearch =
        !search ||
        league.league?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        league.country?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchCountry =
        countryFilter === "All" ||
        league.country?.name === countryFilter;

      return matchSearch && matchCountry;
    });
  }, [leagues, search, countryFilter]);

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 28,
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            🏆 {title}
          </h2>

          <div
            style={{
              color: "#94a3b8",
              marginTop: 6,
            }}
          >
            {filteredLeagues.length} leagues
          </div>
        </div>

        {showSearch && (
          <input
            type="text"
            placeholder="Search league..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 280,
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #374151",
              background: "#1f2937",
              color: "#fff",
              outline: "none",
            }}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 25,
        }}
      >
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setCountryFilter(country)}
            style={{
              padding: "8px 16px",
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background:
                countryFilter === country ? "#2563eb" : "#1f2937",
              color: "#fff",
            }}
          >
            {country}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {filteredLeagues.map((league, index) => {
          const leagueId = league.league?.id;
          const leagueName = league.league?.name || "Unknown League";
          const leagueLogo = league.league?.logo;
          const country = league.country?.name || "Unknown";
          const countryFlag = league.country?.flag;
          const season =
            league.seasons?.find((s) => s.current)?.year ||
            league.seasons?.[league.seasons.length - 1]?.year ||
            "-";

          return (
            <div
              key={leagueId || index}
              style={{
                background: "#1f2937",
                borderRadius: 18,
                padding: 22,
                transition: ".25s ease",
                border: "1px solid #374151",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              {/* Left Side */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  flex: 1,
                  minWidth: 260,
                }}
              >
                <Image
                  src={leagueLogo || "/league.png"}
                  alt={leagueName}
                  width={70}
                  height={70}
                  style={{
                    borderRadius: 14,
                    background: "#fff",
                    padding: 6,
                  }}
                />

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {leagueName}
                  </h3>

                  {showCountry && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 8,
                        color: "#cbd5e1",
                      }}
                    >
                      {countryFlag && (
                        <Image
                          src={countryFlag}
                          alt={country}
                          width={22}
                          height={16}
                        />
                      )}

                      <span>{country}</span>
                    </div>
                  )}

                  {showSeason && (
                    <div
                      style={{
                        marginTop: 8,
                        color: "#94a3b8",
                        fontSize: 14,
                      }}
                    >
                      Season {season}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <InfoBadge color="#16a34a" label="ACTIVE" />

                <Link
                  href={`/league/${leagueId}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ActionButton
                    icon="📊"
                    text="Overview"
                    color="#2563eb"
                  />
                </Link>

                <Link
                  href={`/standings/${leagueId}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ActionButton
                    icon="🏆"
                    text="Standings"
                    color="#16a34a"
                  />
                </Link>

                <Link
                  href={`/fixtures/${leagueId}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ActionButton
                    icon="📅"
                    text="Fixtures"
                    color="#ea580c"
                  />
                </Link>

                <Link
                className="league-list-link"
                  href={`/topscorers/${leagueId}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ActionButton
                    icon="⚽"
                    text="Top Scorers"
                    color="#7c3aed"
                  />
                </Link>
              </div>
            </div>
          );
        })}

                {filteredLeagues.length === 0 && (
          <div className="league-list-empty">
            <div className="league-list-empty-icon">
              🔍
            </div>

            <h3 className="league-list-empty-title">
              No leagues found
            </h3>

            <p className="league-list-empty-text">
              Try another search or country filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* =======================================
   INFO BADGE
======================================= */

function InfoBadge({
  color = "#2563eb",
  label,
}) {
  return (
    <div
      className="league-list-badge"
      style={{
        background: color,
      }}
    >
      {label}
    </div>
  );
}

/* =======================================
   ACTION BUTTON
======================================= */

function ActionButton({
  icon,
  text,
  color,
}) {
  return (
    <div
      className="league-list-button"
      style={{
        background: color,
      }}
    >
      <span className="league-list-button-icon">
        {icon}
      </span>

      <span className="league-list-button-text">
        {text}
      </span>
    </div>
  );
}

function InfoBadge({ color = "#2563eb", label }) {
  return (
    <div
    className="league-list-badge"
      style={{
        background: color,
        color: "#fff",
        padding: "6px 14px",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: ".4px",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 80,
        boxShadow: "0 6px 18px rgba(0,0,0,.25)",
      }}
    >
      {label}
    </div>
  );
}

function ActionButton({ icon, text, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        borderRadius: 12,
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minWidth: 130,
        fontWeight: 700,
        fontSize: 14,
        boxShadow: "0 10px 24px rgba(0,0,0,.25)",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 16px 30px rgba(0,0,0,.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.25)";
      }}
    >
      <span className="league-list-button-icon"
        style={{
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        {icon}
      </span>

      <span className="league-list-button-text">
      {text}
      </span>
    </div>
  );
}