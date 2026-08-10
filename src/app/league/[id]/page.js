import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLeagueId } from "../../../utils/leagueMap";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";

/* ============================================
   GET LEAGUE DATA
============================================ */

async function getLeagueData(league) {
  try {
    const leagueId = getLeagueId(league);

    if (!leagueId) {
      return {
        success: false,
        league: null,
        error: "Invalid league identifier",
      };
    }

    console.log(
      `🔍 Fetching league data | League ID: ${leagueId}`
    );

    const res = await fetch(
      `${API}/api/league/${leagueId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(
        `❌ Backend error: ${res.status}`
      );

      return {
        success: false,
        league: null,
        error: `Backend error: ${res.status}`,
      };
    }

    const data = await res.json();

    console.log(
      `✅ League data received | Success: ${data.success}`
    );

    return data;
  } catch (err) {
    console.error(
      "🔥 Error fetching league:",
      err.message
    );

    return {
      success: false,
      league: null,
      error: err.message,
    };
  }
}

/* ============================================
   SEO
============================================ */

export async function generateMetadata({ params }) {
  const { id } = await params;

  const leagueName =
    typeof id === "string"
      ? id.toUpperCase()
      : "League";

  return {
    title: `${leagueName} League | Apex Sports`,
    description: `${leagueName} football league information, standings, fixtures, results and top scorers.`,
  };
}

/* ============================================
   PAGE
============================================ */

export default async function LeaguePage({
  params,
}) {
  const { id } = await params;

  const data = await getLeagueData(id);

  /* ---------------------------------------------
     Validate backend response
  --------------------------------------------- */

  if (!data?.success || !data?.league) {
    notFound();
  }

  const league = data.league;

  /* ---------------------------------------------
     SAFE LEAGUE NAME
  --------------------------------------------- */

  const leagueName =
    typeof league.name === "string"
      ? league.name
      : "Football League";

  /* ---------------------------------------------
     SAFE COUNTRY
  --------------------------------------------- */

  let country = "England";

  if (
    league.country &&
    typeof league.country === "object"
  ) {
    country =
      league.country.name ||
      league.country.code ||
      "England";
  } else if (
    typeof league.country === "string"
  ) {
    country = league.country;
  }

  /* ---------------------------------------------
     SAFE LOGO
  --------------------------------------------- */

  const leagueLogo =
    typeof league.logo === "string"
      ? league.logo
      : null;

  /* ---------------------------------------------
     SAFE SEASON
  --------------------------------------------- */

  const season =
    data.season ||
    league.season ||
    2024;

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        color: "white",
      }}
    >
      {/* ============================================
          LEAGUE HEADER
      ============================================ */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "#111827",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
        }}
      >
        {/* League Logo */}

        {leagueLogo && (
          <Image
            src={leagueLogo}
            alt={leagueName}
            width={70}
            height={70}
            unoptimized
          />
        )}

        {/* League Information */}

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 34,
            }}
          >
            {leagueName}
          </h1>

          <p
            style={{
              color: "#94a3b8",
              margin: "8px 0",
            }}
          >
            {country}
          </p>

          <p
            style={{
              color: "#22c55e",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Season {season}
          </p>
        </div>
      </div>

      {/* ============================================
          NAVIGATION
      ============================================ */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {/* STANDINGS */}

        <Link
          href={`/standings/${id}`}
          style={{
            background: "#111827",
            padding: 30,
            borderRadius: 12,
            textAlign: "center",
            color: "white",
            textDecoration: "none",
            border: "1px solid #1e293b",
          }}
        >
          <h2>📊 Standings</h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            View league table
          </p>
        </Link>

        {/* RESULTS */}

        <Link
          href={`/results/${id}`}
          style={{
            background: "#111827",
            padding: 30,
            borderRadius: 12,
            textAlign: "center",
            color: "white",
            textDecoration: "none",
            border: "1px solid #1e293b",
          }}
        >
          <h2>📋 Results</h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Latest match results
          </p>
        </Link>

        {/* FIXTURES */}

        <Link
          href={`/fixtures/${id}`}
          style={{
            background: "#111827",
            padding: 30,
            borderRadius: 12,
            textAlign: "center",
            color: "white",
            textDecoration: "none",
            border: "1px solid #1e293b",
          }}
        >
          <h2>📅 Fixtures</h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Upcoming matches
          </p>
        </Link>

        {/* TOP SCORERS */}

        <Link
          href={`/topscorers/${id}`}
          style={{
            background: "#111827",
            padding: 30,
            borderRadius: 12,
            textAlign: "center",
            color: "white",
            textDecoration: "none",
            border: "1px solid #1e293b",
          }}
        >
          <h2>⚽ Top Scorers</h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Goal leaders
          </p>
        </Link>
      </div>
    </main>
  );
}