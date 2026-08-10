"use client";

import { useState, useEffect } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: "🏠" },
  { id: "venue", label: "Venue", icon: "🏟️" },
  { id: "statistics", label: "Statistics", icon: "📊" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "form", label: "Form", icon: "🔥" },
  { id: "fixtures", label: "Fixtures", icon: "📅" },
  { id: "results", label: "Results", icon: "🏁" },
  { id: "squad", label: "Squad", icon: "👥" },
  { id: "transfers", label: "Transfers", icon: "🔄" },
  { id: "injuries", label: "Injuries", icon: "🏥" },
  { id: "trophies", label: "Trophies", icon: "🏆" },
];

export default function TeamTabs() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const onScroll = () => {
      let current = "overview";

      for (const tab of tabs) {
        const section = document.getElementById(tab.id);

        if (!section) continue;

        const top = section.getBoundingClientRect().top;

        if (top <= 150) {
          current = tab.id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  function goTo(id) {
    const section =
      document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section
      style={{
        position: "sticky",
        top: 10,
        zIndex: 50,
        background: "#111827",
        borderRadius: 16,
        padding: 14,
        marginBottom: 30,
        border: "1px solid #1f2937",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              goTo(tab.id)
            }
            style={{
              flexShrink: 0,
              border: "none",
              cursor: "pointer",
              padding:
                "10px 18px",
              borderRadius: 10,
              background:
                active === tab.id
                  ? "#22c55e"
                  : "#1f2937",
              color: "#fff",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition:
                ".25s",
            }}
          >
            <span>
              {tab.icon}
            </span>

            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}