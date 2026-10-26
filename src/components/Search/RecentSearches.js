"use client";

import { useEffect, useState } from "react";

export default function RecentSearches({
  onSelect,
}) {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("recent-searches") || "[]"
      );
      setHistory(
        Array.isArray(stored)
          ? stored.filter((item) => typeof item === "string")
          : []
      );
    } catch {
      setHistory([]);
    }
  }, []);

  if (!history.length) return null;

  return (
    <section className="mb-[30px]">
      <h2 className="mb-[15px] text-white">
        🕒 Recent Searches
      </h2>

      <div className="flex flex-wrap gap-[10px]">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              onSelect(item)
            }
            className="cursor-pointer rounded-[30px] border border-gray-700 bg-gray-900 px-4 py-2 text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}