"use client";

import { useEffect, useState } from "react";

export default function RecentSearches({
  onSelect,
}) {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem(
          "recent-searches"
        ) || "[]"
      );

    setHistory(data);
  }, []);

  if (!history.length) return null;

  return (
    <section
      style={{
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 15,
        }}
      >
        🕒 Recent Searches
      </h2>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              onSelect(item)
            }
            style={{
              background: "#111827",
              color: "white",
              border:
                "1px solid #374151",
              borderRadius: 30,
              padding:
                "8px 16px",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}