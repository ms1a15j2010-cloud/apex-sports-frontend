"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
      console.log("Searching for:", query); // Debug log
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for teams, leagues, or matches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 bg-white text-gray-800 border-2 border-gray-300 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 placeholder:text-gray-400 shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
        >
          Search
        </button>
      </div>
    </form>
  );
}