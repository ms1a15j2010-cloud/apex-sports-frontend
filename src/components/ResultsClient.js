// src/components/ResultsClient.js

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* =====================================================
   HELPERS
===================================================== */

function getTeamName(team) {
  if (!team) return "Unknown";

  if (typeof team === "string") {
    return team;
  }

  return (
    team.name ||
    team.team?.name ||
    "Unknown"
  );
}

function getTeamLogo(team) {
  if (!team || typeof team === "string") {
    return null;
  }

  return (
    team.logo ||
    team.team?.logo ||
    null
  );
}

function getScore(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  return value;
}

function getMatchId(match) {
  return (
    match?.fixture?.id ||
    match?.fixtureId ||
    match?.id ||
    null
  );
}

function getMatchDate(match) {
  return (
    match?.fixture?.date ||
    match?.date ||
    null
  );
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function formatTime(date) {
  if (!date) return "";

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  return parsed.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

function getStatus(match) {
  return (
    match?.status?.short ||
    match?.fixture?.status?.short ||
    "FT"
  );
}

function getStatusLabel(match) {
  const status =
    getStatus(match);

  switch (status) {
    case "FT":
      return "Full Time";

    case "AET":
      return "After Extra Time";

    case "PEN":
      return "Penalties";

    case "CANC":
      return "Cancelled";

    case "ABD":
      return "Abandoned";

    default:
      return status;
  }
}

/* =====================================================
   NORMALIZE MATCH
===================================================== */

function normalizeMatch(match) {
  const home =
    match?.home ||
    match?.teams?.home ||
    {};

  const away =
    match?.away ||
    match?.teams?.away ||
    {};

  const goals =
    match?.goals || {};

  return {
    id: getMatchId(match),

    date:
      getMatchDate(match),

    homeName:
      getTeamName(home),

    homeLogo:
      getTeamLogo(home),

    awayName:
      getTeamName(away),

    awayLogo:
      getTeamLogo(away),

    homeScore:
      getScore(
        goals?.home ??
          match?.homeScore ??
          home?.goals
      ),

    awayScore:
      getScore(
        goals?.away ??
          match?.awayScore ??
          away?.goals
      ),

    status:
      getStatus(match),

    statusLabel:
      getStatusLabel(match),

    venue:
      match?.fixture?.venue?.name ||
      match?.venue?.name ||
      null,
  };
}

/* =====================================================
   TEAM LOGO
===================================================== */

function TeamLogo({
  src,
  name,
}) {
  if (!src) {
    return (
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background:
            "#1f2937",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color: "#9ca3af",
          fontSize: 18,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {name
          ?.charAt(0)
          ?.toUpperCase() || "?"}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={42}
      height={42}
      loading="lazy"
      style={{
        width: 42,
        height: 42,
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
}

/* =====================================================
   MATCH CARD
===================================================== */

function ResultCard({
  match,
}) {
  const matchId =
    match.id;

  const content = (
    <article
      style={{
        background:
          "linear-gradient(145deg, #111827, #0b1220)",
        border:
          "1px solid #1f2937",
        borderRadius: 18,
        padding: 20,
        transition:
          "transform .2s ease, border-color .2s ease",
      }}
    >
      {/* DATE */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          gap: 12,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            color: "#9ca3af",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {formatDate(
            match.date
          )}
        </div>

        <div
          style={{
            color: "#6b7280",
            fontSize: 12,
          }}
        >
          {formatTime(
            match.date
          )}
        </div>
      </div>

      {/* TEAMS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",
          alignItems:
            "center",
          gap: 16,
        }}
      >
        {/* HOME */}

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          <TeamLogo
            src={
              match.homeLogo
            }
            name={
              match.homeName
            />

          <span
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.3,
              overflowWrap:
                "anywhere",
            }}
          >
            {match.homeName}
          </span>
        </div>

        {/* SCORE */}

        <div
          style={{
            textAlign:
              "center",
            minWidth: 70,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 25,
              fontWeight: 800,
              letterSpacing: 1,
              whiteSpace:
                "nowrap",
            }}
          >
            {match.homeScore}
            <span
              style={{
                color: "#6b7280",
                margin:
                  "0 7px",
              }}
            >
              -
            </span>
            {match.awayScore}
          </div>

          <div
            style={{
              marginTop: 5,
              color: "#22c55e",
              fontSize: 11,
              fontWeight: 700,
              textTransform:
                "uppercase",
              letterSpacing:
                ".5px",
            }}
          >
            {match.statusLabel}
          </div>
        </div>

        {/* AWAY */}

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "flex-end",
            gap: 12,
            minWidth: 0,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.3,
              textAlign:
                "right",
              overflowWrap:
                "anywhere",
            }}
          >
            {match.awayName}
          </span>

          <TeamLogo
            src={
              match.awayLogo
            }
            name={
              match.awayName
            }
          />
        </div>
      </div>

      {/* VENUE */}

      {match.venue && (
        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop:
              "1px solid #1f2937",
            color: "#6b7280",
            fontSize: 12,
          }}
        >
          📍 {match.venue}
        </div>
      )}
    </article>
  );

  if (!matchId) {
    return content;
  }

  return (
    <Link
      href={`/match/${matchId}`}
      style={{
        display: "block",
        color: "inherit",
        textDecoration:
          "none",
      }}
    >
      {content}
    </Link>
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function ResultsClient({
  initialMatches = [],
  league = "",
  leagueName = "League Results",
}) {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedDate,
    setSelectedDate,
  ] = useState("all");

  const normalizedMatches =
    useMemo(() => {
      if (
        !Array.isArray(
          initialMatches
        )
      ) {
        return [];
      }

      return initialMatches
        .map(normalizeMatch)
        .sort((a, b) => {
          const dateA =
            new Date(
              a.date || 0
            ).getTime();

          const dateB =
            new Date(
              b.date || 0
            ).getTime();

          return dateB - dateA;
        });
    }, [initialMatches]);

  const filteredMatches =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return normalizedMatches.filter(
        (match) => {
          const matchesSearch =
            !query ||
            match.homeName
              .toLowerCase()
              .includes(query) ||
            match.awayName
              .toLowerCase()
              .includes(query);

          if (!matchesSearch) {
            return false;
          }

          if (
            selectedDate ===
            "all"
          ) {
            return true;
          }

          if (!match.date) {
            return false;
          }

          const date =
            new Date(
              match.date
            );

          const today =
            new Date();

          if (
            selectedDate ===
            "today"
          ) {
            return (
              date.toDateString() ===
              today.toDateString()
            );
          }

          if (
            selectedDate ===
            "yesterday"
          ) {
            const yesterday =
              new Date(
                today
              );

            yesterday.setDate(
              yesterday.getDate() -
                1
            );

            return (
              date.toDateString() ===
              yesterday.toDateString()
            );
          }

          return true;
        }
      );
    }, [
      normalizedMatches,
      search,
      selectedDate,
    ]);

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (
    normalizedMatches.length ===
    0
  ) {
    return (
      <section>
        <header
          style={{
            marginBottom: 30,
          }}
        >
          <div
            style={{
              color: "#ef4444",
              fontSize: 12,
              fontWeight: 800,
              textTransform:
                "uppercase",
              letterSpacing:
                "1.2px",
              marginBottom: 8,
            }}
          >
            ⚽ Apex Sports
          </div>

          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize:
                "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
            }}
          >
            {leagueName}
          </h1>

          <p
            style={{
              margin:
                "10px 0 0",
              color: "#9ca3af",
              fontSize: 15,
            }}
          >
            No completed matches are
            available for this league
            right now.
          </p>
        </header>

        <div
          style={{
            background:
              "#111827",
            border:
              "1px solid #1f2937",
            borderRadius: 20,
            padding:
              "55px 25px",
            textAlign:
              "center",
          }}
        >
          <div
            style={{
              fontSize: 42,
              marginBottom: 15,
            }}
          >
            ⚽
          </div>

          <h2
            style={{
              margin:
                "0 0 8px",
              color: "#fff",
              fontSize: 22,
            }}
          >
            No results found
          </h2>

          <p
            style={{
              margin: 0,
              color: "#9ca3af",
              fontSize: 14,
            }}
          >
            There are currently no
            results available for
            {leagueName}.
          </p>
        </div>
      </section>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <section>
      {/* HEADER */}

      <header
        style={{
          marginBottom: 28,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            textTransform:
              "uppercase",
            letterSpacing:
              "1.2px",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h1
          style={{
            margin: 0,
            color: "#fff",
            fontSize:
              "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
          }}
        >
          {leagueName}
        </h1>

        <p
          style={{
            margin:
              "8px 0 0",
            color: "#9ca3af",
            fontSize: 15,
          }}
        >
          Latest completed matches,
          scores and results.
        </p>
      </header>

      {/* FILTERS */}

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search team..."
          aria-label="Search team"
          style={{
            flex: "1 1 240px",
            minWidth: 0,
            background:
              "#111827",
            color: "#fff",
            border:
              "1px solid #1f2937",
            borderRadius: 12,
            padding:
              "12px 15px",
            outline: "none",
            fontSize: 14,
          }}
        />

        <select
          value={selectedDate}
          onChange={(event) =>
            setSelectedDate(
              event.target.value
            )
          }
          aria-label="Filter results by date"
          style={{
            flex:
              "0 1 180px",
            background:
              "#111827",
            color: "#fff",
            border:
              "1px solid #1f2937",
            borderRadius: 12,
            padding:
              "12px 15px",
            outline: "none",
            fontSize: 14,
          }}
        >
          <option value="all">
            All Results
          </option>

          <option value="today">
            Today
          </option>

          <option value="yesterday">
            Yesterday
          </option>
        </select>
      </div>

      {/* RESULT COUNT */}

      <div
        style={{
          marginBottom: 16,
          color: "#6b7280",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Showing{" "}
        {filteredMatches.length}{" "}
        of{" "}
        {normalizedMatches.length}{" "}
        results
      </div>

      {/* RESULTS */}

      {filteredMatches.length >
      0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {filteredMatches.map(
            (match, index) => (
              <ResultCard
                key={
                  match.id ||
                  `${match.homeName}-${match.awayName}-${match.date}-${index}`
                }
                match={match}
              />
            )
          )}
        </div>
      ) : (
        <div
          style={{
            background:
              "#111827",
            border:
              "1px solid #1f2937",
            borderRadius: 18,
            padding: 40,
            textAlign:
              "center",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            No matching results
          </div>

          <p
            style={{
              margin: 0,
              color: "#9ca3af",
              fontSize: 14,
            }}
          >
            Try another team name or
            change the date filter.
          </p>
        </div>
      )}
    </section>
  );
}