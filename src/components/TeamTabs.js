"use client";

import { useEffect, useState } from "react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: "🏠",
  },
  {
    id: "venue",
    label: "Venue",
    icon: "🏟️",
  },
  {
    id: "coach",
    label: "Coach",
    icon: "👔",
  },
  {
    id: "statistics",
    label: "Statistics",
    icon: "📊",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📈",
  },
  {
    id: "comparison",
    label: "Comparison",
    icon: "⚖️",
  },
  {
    id: "form",
    label: "Form",
    icon: "🔥",
  },
  {
    id: "fixtures",
    label: "Fixtures",
    icon: "📅",
  },
  {
    id: "results",
    label: "Results",
    icon: "🏁",
  },
  {
    id: "squad",
    label: "Squad",
    icon: "👥",
  },
  {
    id: "history",
    label: "History",
    icon: "📖",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: "🏆",
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: "🔄",
  },
  {
    id: "injuries",
    label: "Injuries",
    icon: "🏥",
  },
  {
    id: "trophies",
    label: "Trophies",
    icon: "🏆",
  },
  {
    id: "social",
    label: "Social",
    icon: "🌐",
  },
];

export default function TeamTabs() {
  const [active, setActive] =
    useState("overview");

  useEffect(() => {
    const updateActiveTab = () => {
      let current = "overview";

      const offset = 180;

      for (const tab of tabs) {
        const section =
          document.getElementById(
            tab.id
          );

        if (!section) {
          continue;
        }

        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <= offset
        ) {
          current = tab.id;
        }
      }

      setActive(current);
    };

    updateActiveTab();

    window.addEventListener(
      "scroll",
      updateActiveTab,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveTab
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveTab
      );

      window.removeEventListener(
        "resize",
        updateActiveTab
      );
    };
  }, []);

  function goTo(id) {
    const section =
      document.getElementById(id);

    if (!section) {
      return;
    }

    const y =
      section.getBoundingClientRect()
        .top +
      window.scrollY -
      135;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActive(id);
  }

  return (
    <section
      style={{
        position: "sticky",
        top: 10,
        zIndex: 50,
        background:
          "rgba(17,24,39,.96)",
        backdropFilter:
          "blur(12px)",
        WebkitBackdropFilter:
          "blur(12px)",
        borderRadius: 16,
        padding: 12,
        marginBottom: 30,
        border:
          "1px solid #293548",
        boxShadow:
          "0 8px 25px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          scrollbarWidth: "none",
          WebkitOverflowScrolling:
            "touch",
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                goTo(tab.id)
              }
              aria-current={
                isActive
                  ? "page"
                  : undefined
              }
              style={{
                flexShrink: 0,
                border: "none",
                cursor: "pointer",
                padding:
                  "10px 15px",
                borderRadius: 10,
                background:
                  isActive
                    ? "#22c55e"
                    : "#1f2937",
                color: "#fff",
                fontWeight: 700,
                display: "flex",
                alignItems:
                  "center",
                gap: 7,
                transition:
                  "all .2s ease",
                whiteSpace:
                  "nowrap",
              }}
            >
              <span>
                {tab.icon}
              </span>

              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}