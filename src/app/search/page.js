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
  const [tab, setTab] = useState("All");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
      setResults({
        teams: [],
        players: [],
        leagues: [],
        matches: [],
      });
      return;
    }

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
      }
    } catch (err) {
      if (requestId !== searchRequestRef.current) return;

      console.error("Search request failed:", err);
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
    if (query.trim().length < 2) {
      searchRequestRef.current += 1;
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
      search(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <main className="mx-auto my-10 max-w-[1300px] p-5 text-white">
      <h1 className="mb-[30px] text-[40px]">
        🔍 Search
      </h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={search}
      />

      <RecentSearches
        onSelect={(text) => {
          setQuery(text);
          search(text);
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

      {!loading && (
        <SearchResults
          tab={tab}
          data={results}
        />
      )}
    </main>
  );
}
