"use client";

import SearchTeams from "./SearchTeams";
import SearchPlayers from "./SearchPlayers";
import SearchLeagues from "./SearchLeagues";
import SearchMatches from "./SearchMatches";

export default function SearchResults({
  tab,
  data,
}) {
  if (!data) return null;

  return (
    <>
      {(tab === "All" || tab === "Teams") && (
        <SearchTeams
          teams={data.teams || []}
        />
      )}

      {(tab === "All" || tab === "Players") && (
        <SearchPlayers
          players={data.players || []}
        />
      )}

      {(tab === "All" || tab === "Leagues") && (
        <SearchLeagues
          leagues={data.leagues || []}
        />
      )}

      {(tab === "All" || tab === "Matches") && (
        <SearchMatches
          matches={data.matches || []}
        />
      )}
    </>
  );
}