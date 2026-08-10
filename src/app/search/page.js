"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/components/Search/SearchBar";
import SearchTabs from "@/components/Search/SearchTabs";
import SearchResults from "@/components/Search/SearchResults";
import RecentSearches from "@/components/Search/RecentSearches";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [tab, setTab] = useState("All");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({
    teams: [],
    players: [],
    leagues: [],
    matches: [],
  });

  async function search(value) {
    if (!value.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api/search?q=${encodeURIComponent(value)}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (data.success) {
        setResults({
          teams: data.teams || [],
          players: data.players || [],
          leagues: data.leagues || [],
          matches: data.matches || [],
        });

        saveRecent(value);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function saveRecent(text) {
    let history =
      JSON.parse(
        localStorage.getItem("recent-searches") ||
          "[]"
      );

    history = history.filter((x) => x !== text);

    history.unshift(text);

    history = history.slice(0, 10);

    localStorage.setItem(
      "recent-searches",
      JSON.stringify(history)
    );
  }

  useEffect(() => {
    if (query.length < 2) return;

    const timer = setTimeout(() => {
      search(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main
      style={{
        maxWidth: 1300,
        margin: "40px auto",
        padding: 20,
        color: "white",
      }}
    >
      <h1
        style={{
          marginBottom: 30,
          fontSize: 40,
        }}
      >
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
        <div
          style={{
            marginTop: 30,
            color: "#94a3b8",
          }}
        >
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