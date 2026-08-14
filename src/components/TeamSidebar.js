"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamSidebar({
  team,
}) {
  if (!team) return null;

  const teamLogo =
    team.logo ||
    team.crest ||
    null;

  const area =
    team.area || {};

  const venue =
    team.venue || {};

  const coach =
    team.coach || {};

  const coachName =
    coach.name ||
    [
      coach.firstName,
      coach.lastName,
    ]
      .filter(Boolean)
      .join(" ");

  const competitions =
    Array.isArray(
      team.competitions
    )
      ? team.competitions
      : Array.isArray(
          team.runningCompetitions
        )
      ? team.runningCompetitions
      : [];

  const primaryCompetition =
    competitions[0] || null;

  return (
    <aside
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 18,
        padding: 24,
        color: "#fff",
        position: "sticky",
        top: 20,
        border:
          "1px solid #1e293b",
        boxShadow:
          "0 8px 24px rgba(0,0,0,.30)",
      }}
    >
      {/* =================================================
          TEAM
      ================================================= */}

      <div
        style={{
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            margin: "0 auto",
            borderRadius: "50%",
            background: "#1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border:
              "1px solid #293548",
          }}
        >
          {teamLogo ? (
            <Image
              src={teamLogo}
              alt={
                team.name ||
                "Team"
              }
              width={105}
              height={105}
              priority
              unoptimized
              style={{
                objectFit:
                  "contain",
              }}
            />
          ) : (
            <div
              style={{
                color: "#22c55e",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              {team.tla ||
                team.name
                  ?.slice(0, 3)
                  ?.toUpperCase() ||
                "FC"}
            </div>
          )}
        </div>

        <h2
          style={{
            margin:
              "16px 0 6px",
            fontSize: 24,
          }}
        >
          {team.name ||
            "Unknown Team"}
        </h2>

        <div
          style={{
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          {area.name ||
            team.country ||
            "England"}
        </div>
      </div>

      {/* =================================================
          TEAM INFORMATION
      ================================================= */}

      <div
        style={{
          display: "grid",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <SidebarItem
          title="Founded"
          value={
            team.founded ||
            "-"
          }
        />

        <SidebarItem
          title="Team Code"
          value={
            team.tla ||
            team.shortName ||
            "-"
          }
        />

        <SidebarItem
          title="Country"
          value={
            area.name ||
            team.country ||
            "-"
          }
        />

        <SidebarItem
          title="Stadium"
          value={
            venue.name ||
            "-"
          }
        />

        <SidebarItem
          title="City"
          value={
            venue.city ||
            "-"
          }
        />

        <SidebarItem
          title="Coach"
          value={
            coachName ||
            "Unavailable"
          }
        />
      </div>

      {/* =================================================
          QUICK NAVIGATION
      ================================================= */}

      <div
        style={{
          borderTop:
            "1px solid #1f2937",
          paddingTop: 20,
        }}
      >
        <h3
          style={{
            margin:
              "0 0 15px",
            fontSize: 18,
          }}
        >
          Quick Navigation
        </h3>

        <SidebarLink
          href="#overview"
          text="Overview"
        />

        <SidebarLink
          href="#statistics"
          text="Statistics"
        />

        <SidebarLink
          href="#analytics"
          text="Analytics"
        />

        <SidebarLink
          href="#fixtures"
          text="Fixtures"
        />

        <SidebarLink
          href="#results"
          text="Results"
        />

        <SidebarLink
          href="#squad"
          text="Squad"
        />

        <SidebarLink
          href="#history"
          text="History"
        />

        <SidebarLink
          href="#transfers"
          text="Transfers"
        />

        <SidebarLink
          href="#injuries"
          text="Injuries"
        />

        <SidebarLink
          href="#trophies"
          text="Trophies"
        />
      </div>

      {/* =================================================
          COMPETITION
      ================================================= */}

      {primaryCompetition && (
        <div
          style={{
            marginTop: 28,
            borderTop:
              "1px solid #1f2937",
            paddingTop: 20,
          }}
        >
          <h3
            style={{
              margin:
                "0 0 12px",
            }}
          >
            Competition
          </h3>

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 12,
            }}
          >
            {primaryCompetition.emblem ? (
              <Image
                src={
                  primaryCompetition.emblem
                }
                alt={
                  primaryCompetition.name ||
                  "Competition"
                }
                width={30}
                height={30}
                unoptimized
                style={{
                  objectFit:
                    "contain",
                }}
              />
            ) : (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background:
                    "#1f2937",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  color:
                    "#22c55e",
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                FC
              </div>
            )}

            <span
              style={{
                color: "#22c55e",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {primaryCompetition.name ||
                "Premier League"}
            </span>
          </div>
        </div>
      )}

      {/* =================================================
          OFFICIAL WEBSITE
      ================================================= */}

      {team.website && (
        <div
          style={{
            marginTop: 25,
            borderTop:
              "1px solid #1f2937",
            paddingTop: 20,
          }}
        >
          <a
            href={team.website}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              color: "#3b82f6",
              textDecoration:
                "none",
              fontWeight: 700,
              wordBreak:
                "break-word",
            }}
          >
            🌐 Official Website
          </a>
        </div>
      )}
    </aside>
  );
}

/* =====================================================
SIDEBAR ITEM
===================================================== */

function SidebarItem({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding:
          "12px 14px",
        border:
          "1px solid #293548",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginBottom: 5,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: 14,
          overflowWrap:
            "anywhere",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}

/* =====================================================
SIDEBAR LINK
===================================================== */

function SidebarLink({
  href,
  text,
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        color: "#cbd5e1",
        textDecoration: "none",
        padding:
          "9px 4px",
        borderBottom:
          "1px solid #1f2937",
        fontSize: 14,
        transition:
          "color .2s ease",
      }}
    >
      {text}
    </Link>
  );
}