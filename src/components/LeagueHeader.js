"use client";

import Image from "next/image";

export default function LeagueHeader({
  league,
}) {
  if (!league) return null;

  const logo =
    league.logo ||
    "/league.png";

  const flag =
    league.country?.flag ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='16'%3E%3Crect width='24' height='16' fill='%23333'/%3E%3C/svg%3E";

  const season =
    league.season || "-";

  const round =
    league.round || "-";

  return (
    <section
      className="league-header"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#111827)",
        borderRadius: 22,
        padding: 32,
        marginBottom: 30,
        border:
          "1px solid #1f2937",
      }}
    >
      <div
        className="league-header-top"
        style={{
          display: "grid",
          gridTemplateColumns:
            "140px minmax(0,1fr) auto",
          gap: 30,
          alignItems: "center",
        }}
      >
        {/* =========================
            League Logo
        ========================= */}

        <div
          className="league-logo-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={logo}
            alt={
              league.name ||
              "League"
            }
            width={120}
            height={120}
            priority
            style={{
              objectFit:
                "contain",
            }}
          />
        </div>

        {/* =========================
            League Information
        ========================= */}

        <div className="league-header-info">
          <h1
            className="league-header-title"
            style={{
              color: "#fff",
              fontSize: 38,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            {league.name}
          </h1>

          <div
            className="league-header-badges"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <Badge>
              ⚽ Football
            </Badge>

            <Badge>
              🏆 {round}
            </Badge>

            <Badge>
              📅 Season {season}
            </Badge>
          </div>

          <div
            className="league-country"
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 12,
            }}
          >
            <Image
              src={flag}
              alt={
                league.country
                  ?.name ||
                "Country"
              }
              width={30}
              height={30}
              style={{
                borderRadius:
                  "2px",
              }}
            />

            <span
              style={{
                color:
                  "#cbd5e1",
                fontSize: 18,
              }}
            >
              {
                league.country
                  ?.name
              }
            </span>
          </div>
        </div>

        {/* =========================
            Current Season Card
        ========================= */}

        <div
          className="league-season-card"
          style={{
            background:
              "#1f2937",
            borderRadius: 18,
            padding: 24,
            minWidth: 230,
          }}
        >
          <div
            style={{
              color:
                "#94a3b8",
              marginBottom: 12,
            }}
          >
            Current Season
          </div>

          <div
            className="league-season-number"
            style={{
              color: "#fff",
              fontSize: 36,
              fontWeight:
                "bold",
            }}
          >
            {season}
          </div>

          <div
            style={{
              marginTop: 18,
              color:
                "#22c55e",
              fontWeight:
                "bold",
            }}
          >
            {round}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================== */

function Badge({
  children,
}) {
  return (
    <span
      className="league-badge"
      style={{
        background:
          "#1f2937",
        color: "#e2e8f0",
        padding:
          "8px 14px",
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}