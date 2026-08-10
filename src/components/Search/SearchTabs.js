"use client";

const tabs = [
  "All",
  "Teams",
  "Players",
  "Leagues",
  "Matches",
];

export default function SearchTabs({
  active,
  onChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 25,
        flexWrap: "wrap",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: "10px 20px",
            borderRadius: 30,
            cursor: "pointer",
            border:
              active === tab
                ? "none"
                : "1px solid #374151",

            background:
              active === tab
                ? "#22c55e"
                : "#111827",

            color: "white",

            fontWeight: "bold",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}