import MatchClient from "./MatchClient";


const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* ============================================================
   API HELPERS
============================================================ */

async function fetchData(url) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed: ${url}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error(err);

    return {
      success: false,
    };
  }
}

async function getMatch(id) {
  return fetchData(
    `${API}/api/match/${id}`
  );
}

async function getTimeline(id) {
  return fetchData(
    `${API}/api/match/${id}/timeline`
  );
}

async function getStatistics(id) {
  return fetchData(
    `${API}/api/match/${id}/statistics`
  );
}

async function getEvents(id) {
  return fetchData(
    `${API}/api/match/${id}/events`
  );
}

async function getLineups(id) {
  return fetchData(
    `${API}/api/match/${id}/lineups`
  );
}

async function getPrediction(id) {
  return fetchData(
    `${API}/api/match/${id}/prediction`
  );
}

async function getStandings(id) {
  return fetchData(
    `${API}/api/match/${id}/standings`
  );
}

async function getHeadToHead(id) {
  return fetchData(
    `${API}/api/match/${id}/headtohead`
  );
}

/* ============================================================
   PAGE METADATA
============================================================ */

export async function generateMetadata({
  params,
}) {
  const { id } =
    await params;

  const data =
    await getMatch(id);

  if (
    !data.success ||
    !data.match
  ) {
    return {
    title: "Match | Apex Sports",
    description:
      "Live football match center",
  };
}

  const match =
    data.match;

  return {
    title: `${match.teams.home.name} vs ${match.teams.away.name} | Apex Sports`,
    description:
      "Live football match details, statistics, lineups, timeline and predictions.",
  };
}
export default async function MatchPage({
  params,
}) {
  const { id } =
    await params;

   return (
    <MatchClient
      matchId={id}
    />
  );
}

  