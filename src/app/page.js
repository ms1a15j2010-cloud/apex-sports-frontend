"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import HomeHero from "@/components/HomeHero";
import HomeTabs from "@/components/HomeTabs";
import SectionHeader from "@/components/SectionHeader";
import MatchList from "@/components/MatchList";

export default function HomePage() {
  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tab, setTab] = useState("today");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMatches() {
      setLoading(true);
      setError("");

      try {
        const data = await api.getTodayMatches();

        if (!data.success) {
          setMatches([]);
          setFiltered([]);
          setError(data.message || "Unable to load matches");
          return;
        }

        const list = Array.isArray(data.matches) ? data.matches : [];

        setMatches(list);
        setFiltered(list);
      } catch (err) {
        console.error(err);
        setMatches([]);
        setFiltered([]);
        setError("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  function handleSearch(value) {
    const text = value.toLowerCase();
    const result = matches.filter((m) => {
      return (
        m.home?.name?.toLowerCase().includes(text) ||
        m.away?.name?.toLowerCase().includes(text) ||
        m.league?.name?.toLowerCase().includes(text)
      );
    });
    setFiltered(result);
  }

  useEffect(() => {
    let result = [...matches];

    switch (tab) {
      case "live":
        result = matches.filter((m) =>
          ["LIVE", "1H", "2H", "HT"].includes(m.status?.short)
        );
        break;

      case "finished":
        result = matches.filter((m) => m.status?.short === "FT");
        break;

      case "upcoming":
        result = matches.filter((m) => m.status?.short === "NS");
        break;

      default:
        result = matches;
    }

    setFiltered(result);
  }, [tab, matches]);

  return (
    <main className="w-full">
      <HomeHero onSearch={handleSearch} />

      <HomeTabs activeTab={tab} setActiveTab={setTab} />

      <SectionHeader
        title="Today's Matches"
        subtitle={`${filtered.length} matches`}
      />

      {loading && (
        <div className="text-center py-[60px] text-[20px] text-slate-300">
          Loading today's matches...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 py-[40px] text-[18px]">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-[60px] text-slate-400 text-[18px]">
          No matches found.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <MatchList matches={filtered} />
      )}
    </main>
  );
}