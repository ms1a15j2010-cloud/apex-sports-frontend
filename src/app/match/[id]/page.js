import MatchClient from "./MatchClient";

/* =====================================================
   MATCH PAGE
===================================================== */

/*
  The actual match data is loaded by MatchClient.

  We intentionally keep metadata static here instead of
  making another server-side API request during
  generateMetadata().

  This avoids:
  - HeadersTimeoutError
  - duplicate match API requests
  - unnecessary backend/provider load
*/

export const metadata = {
  title:
    "Match Center | Apex Sports",

  description:
    "Football match center with score, timeline, statistics, lineups and team information.",
};


/* =====================================================
   MATCH PAGE
===================================================== */

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