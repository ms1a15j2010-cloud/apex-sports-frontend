// src/app/results/[league]/page.js

import ResultsClient from "@/components/ResultsClient";

/* =====================================================
   API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   LEAGUE NAME
===================================================== */

function formatLeagueName(slug) {
  if (!slug) return "League Results";

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

/* =====================================================
   LOAD RESULTS
===================================================== */

async function getLeagueResults(league) {
  try {
    const response = await fetch(
      `${API}/api/league/${encodeURIComponent(
        league
      )}/results`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Results API error:",
        response.status
      );

      return [];
    }

    const data =
      await response.json();

    if (
      Array.isArray(data?.matches)
    ) {
      return data.matches;
    }

    if (
      Array.isArray(data?.results)
    ) {
      return data.results;
    }

    return [];
  } catch (error) {
    console.error(
      "Failed to load league results:",
      error
    );

    return [];
  }
}

/* =====================================================
   METADATA
===================================================== */

export async function generateMetadata({
  params,
}) {
  const { league } = await params;

  const leagueName =
    formatLeagueName(league);

  return {
    title:
      `${leagueName} Results | Apex Sports`,

    description:
      `Latest football results, scores and completed matches from ${leagueName}.`,
  };
}

/* =====================================================
   PAGE
===================================================== */

export default async function ResultsLeaguePage({
  params,
}) {
  const { league } = await params;

  const matches =
    await getLeagueResults(league);

  const leagueName =
    formatLeagueName(league);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#fff",
        padding: "30px 20px 60px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <ResultsClient
          league={league}
          leagueName={leagueName}
          initialMatches={matches}
        />
      </div>
    </main>
  );
}