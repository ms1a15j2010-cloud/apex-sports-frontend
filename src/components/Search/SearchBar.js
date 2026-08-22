"use client";

import { useEffect, useState } from "react";

export default function RecentSearches({
  onSelect,
}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("recent-searches") || "[]"
    );

    setHistory(data);
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
            onClick={() => onSelect(item)}
            className="
              cursor-pointer
              rounded-[30px]
              border
              border-gray-700
              bg-gray-900
              px-4
              py-2
              text-white
              transition
              hover:border-gray-600
              hover:bg-gray-800
            "
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}