"use client";

import { useState } from "react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
}) {
  const [text, setText] = useState(value || "");

  function handleSubmit(e) {
    e.preventDefault();

    onSearch(text);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 25,
      }}
    >
      <input
        type="text"
        placeholder="Search teams, players, leagues..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange?.(e.target.value);
        }}
        style={{
          flex: 1,
          padding: "14px 18px",
          borderRadius: 12,
          border: "1px solid #374151",
          background: "#111827",
          color: "white",
          fontSize: 16,
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "14px 25px",
          borderRadius: 12,
          border: "none",
          background: "#22c55e",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Search
      </button>
    </form>
  );
}