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
    let mounted = true;

    async function loadMatches() {
      if (!mounted) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        let data;

        switch (tab) {
          case "live":
            data = await api.getLiveMatches();
            break;

          case "finished":
            data = await api.getLatestResults();
            break;

          case "upcoming":
            data = await api.getFixtures(
              "epl",
              2026,
              1,
              10
            );
            break;

          case "today":
          default:
            data = await api.getTodayMatches();
            break;
        }

        if (!mounted) {
          return;
        }

        if (!data?.success) {
          setMatches([]);
          setFiltered([]);
          setError(
            data?.message ||
              "Unable to load matches"
          );
          return;
        }

        const list = Array.isArray(data.matches)
          ? data.matches
          : [];

        setMatches(list);
        setFiltered(list);
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error(
          "HomePage matches:",
          err
        );

        setMatches([]);
        setFiltered([]);

        setError(
          err?.message ||
            "Unable to connect to server."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, [tab]);

  function handleSearch(value) {
    const text = value
      .toLowerCase()
      .trim();

    if (!text) {
      setFiltered(matches);
      return;
    }

    const result = matches.filter((m) => {
      return (
        m.home?.name
          ?.toLowerCase()
          .includes(text) ||
        m.away?.name
          ?.toLowerCase()
          .includes(text) ||
        m.teams?.home?.name
          ?.toLowerCase()
          .includes(text) ||
        m.teams?.away?.name
          ?.toLowerCase()
          .includes(text) ||
        m.league?.name
          ?.toLowerCase()
          .includes(text)
      );
    });

    setFiltered(result);
  }

  return (
    <main className="w-full">
      <HomeHero
        onSearch={handleSearch}
      />

      <HomeTabs
        activeTab={tab}
        setActiveTab={setTab}
      />

      <SectionHeader
        title={
          tab === "live"
            ? "Live Matches"
            : tab === "finished"
              ? "Finished Matches"
              : tab === "upcoming"
                ? "Upcoming Matches"
                : "Today's Matches"
        }
        subtitle={`${filtered.length} matches`}
      />

      {loading && (
        <div className="py-[60px] text-center text-[20px] text-slate-300">
          Loading matches...
        </div>
      )}

      {!loading && error && (
        <div className="py-[40px] text-center text-[18px] text-red-500">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filtered.length === 0 && (
          <div className="py-[60px] text-center text-[18px] text-slate-400">
            {tab === "live"
              ? "No live matches."
              : tab === "finished"
                ? "No finished matches available."
                : tab === "upcoming"
                  ? "No upcoming matches available."
                  : "No matches scheduled today."}
          </div>
        )}

      {!loading &&
        !error &&
        filtered.length > 0 && (
          <MatchList matches={filtered} />
        )}
    </main>
  );
}