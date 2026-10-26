"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import SearchBar from "@/components/Search/SearchBar";
import SearchTabs from "@/components/Search/SearchTabs";
import SearchResults from "@/components/Search/SearchResults";
import RecentSearches from "@/components/Search/RecentSearches";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const searchRequestRef = useRef(0);
  const lastSubmittedQueryRef = useRef("");
  const [tab, setTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [results, setResults] = useState({
    teams: [],
    players: [],
    leagues: [],
    matches: [],
  });

  const saveRecent = useCallback((text) => {
    try {
      let history = JSON.parse(
        localStorage.getItem("recent-searches") || "[]"
      );

      history = history.filter((item) => item !== text);
      history.unshift(text);
      history = history.slice(0, 10);

      localStorage.setItem(
        "recent-searches",
        JSON.stringify(history)
      );
    } catch (err) {
      console.error("Unable to save recent search:", err);
    }
  }, []);

  const search = useCallback(async (value) => {
    const term = value.trim();
    const requestId = ++searchRequestRef.current;

    if (term.length < 2) {
      setSearchError("");
      setLoading(false);
      setResults({
        teams: [],
        players: [],
        leagues: [],
        matches: [],
      });
      return;
    }

    setSearchError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api/search?q=${encodeURIComponent(term)}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error(`Search failed with status ${res.status}`);
      }

      const data = await res.json();

      if (requestId !== searchRequestRef.current) return;

      if (data.success) {
        setResults({
          teams: data.teams || [],
          players: data.players || [],
          leagues: data.leagues || [],
          matches: data.matches || [],
        });

        saveRecent(term);
      } else {
        setResults({
          teams: [],
          players: [],
          leagues: [],
          matches: [],
        });
        setSearchError(data?.message || "Search is temporarily unavailable.");
      }
    } catch (err) {
      if (requestId !== searchRequestRef.current) return;

      console.error("Search request failed:", err);
      setSearchError("Search is temporarily unavailable. Please try again.");
      setResults({
        teams: [],
        players: [],
        leagues: [],
        matches: [],
      });
    } finally {
      if (requestId === searchRequestRef.current) {
        setLoading(false);
      }
    }
  }, [saveRecent]);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery?.trim()) {
      setQuery(initialQuery.trim());
    }
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      searchRequestRef.current += 1;
      lastSubmittedQueryRef.current = "";
      setLoading(false);
      setResults({
        teams: [],
        players: [],
        leagues: [],
        matches: [],
      });
      return;
    }

    const timer = setTimeout(() => {
      const term = query.trim();
      if (lastSubmittedQueryRef.current === term) {
        lastSubmittedQueryRef.current = "";
        return;
      }
      lastSubmittedQueryRef.current = "";
      search(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, search]);

  const handleSearchSubmit = useCallback((value) => {
    lastSubmittedQueryRef.current = value.trim();
    search(value);
  }, [search]);

  return (
    <main className="mx-auto my-10 max-w-[1300px] p-5 text-white">
      <h1 className="mb-[30px] text-[40px]">
        🔍 Search
      </h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearchSubmit}
      />

      <RecentSearches
        onSelect={(text) => {
          setQuery(text);
        }}
      />

      <SearchTabs
        active={tab}
        onChange={setTab}
      />

      {loading && (
        <div className="mt-[30px] text-slate-400">
          Searching...
        </div>
      )}

      {!loading && searchError && (
        <p role="alert" className="mt-6 rounded-xl border border-amber-900/60 bg-amber-950/30 p-4 text-amber-200">
          {searchError}
        </p>
      )}

      {!loading &&
        !searchError &&
        query.trim().length >= 2 &&
        !results.teams.length &&
        !results.players.length &&
        !results.leagues.length &&
        !results.matches.length && (
          <p className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-300">
            No football results found for “{query.trim()}”. Try another team, player or league.
          </p>
        )}

      {!loading && !searchError && (
        <SearchResults
          tab={tab}
          data={results}
        />
      )}
    </main>
  );
}
