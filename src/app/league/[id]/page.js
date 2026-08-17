
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
    <main className="mx-auto max-w-[1200px] px-5 py-10 text-white sm:px-6 lg:px-8">
      {/* ============================================
          LEAGUE HEADER
      ============================================ */}

      <div className="mb-[30px] flex flex-wrap items-center gap-5 rounded-[18px] bg-gray-900 p-5 sm:p-[25px]">
        {/* League Logo */}

        {leagueLogo && (
          <Image
            src={leagueLogo}
            alt={leagueName}
            width={70}
            height={70}
            unoptimized
            className="h-[70px] w-[70px] shrink-0 object-contain"
          />
        )}

        {/* League Information */}

        <div>
          <h1 className="m-0 text-[clamp(28px,5vw,34px)] font-extrabold text-white">
            {leagueName}
          </h1>

          <p className="m-0 mt-2 text-sm text-slate-400">
            {country}
          </p>

          <p className="m-0 mt-1 font-bold text-green-500">
            Season {season}
          </p>
        </div>
      </div>

      {/* ============================================
          NAVIGATION
      ============================================ */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* STANDINGS */}

        <Link
          href={`/standings/${id}`}
          className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
        >
          <h2 className="m-0 text-xl font-bold">
            📊 Standings
          </h2>

          <p className="m-0 mt-2 text-sm text-slate-400">
            View league table
          </p>
        </Link>

        {/* RESULTS */}

        <Link
          href={`/results/${id}`}
          className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
        >
          <h2 className="m-0 text-xl font-bold">
            📋 Results
          </h2>

          <p className="m-0 mt-2 text-sm text-slate-400">
            Latest match results
          </p>
        </Link>

        {/* FIXTURES */}

        <Link
          href={`/fixtures/${id}`}
          className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
        >
          <h2 className="m-0 text-xl font-bold">
            📅 Fixtures
          </h2>

          <p className="m-0 mt-2 text-sm text-slate-400">
            Upcoming matches
          </p>
        </Link>

        {/* TOP SCORERS */}

        <Link
          href={`/topscorers/${id}`}
          className="rounded-xl border border-slate-800 bg-gray-900 p-[30px] text-center text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800"
        >
          <h2 className="m-0 text-xl font-bold">
            ⚽ Top Scorers
          </h2>

          <p className="m-0 mt-2 text-sm text-slate-400">
            Goal leaders
          </p>
        </Link>
      </div>
    </main>
  );
}

