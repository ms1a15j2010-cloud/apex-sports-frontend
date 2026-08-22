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
    icon: "📜",
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
    icon: "🚑",
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
          document.getElementById(tab.id);

        if (!section) {
          continue;
        }

        const rect =
          section.getBoundingClientRect();

        if (rect.top <= offset) {
          current = tab.id;
        }
      }

      setActive(current);
    };

    updateActiveTab();

    const main =
      document.querySelector("main");

    window.addEventListener(
      "resize",
      updateActiveTab
    );

    main?.addEventListener(
      "scroll",
      updateActiveTab,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateActiveTab
      );

      main?.removeEventListener(
        "scroll",
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

    const main =
      document.querySelector("main");

    if (!main) {
      return;
    }

    const mainRect =
      main.getBoundingClientRect();

    const sectionRect =
      section.getBoundingClientRect();

    const y =
      sectionRect.top -
      mainRect.top +
      main.scrollTop -
      135;

    main.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActive(id);
  }

  return (
    <section className="sticky top-2.5 z-50 mb-[30px] rounded-2xl border border-[#293548] bg-gray-900/[0.96] p-3 shadow-[0_8px_25px_rgba(0,0,0,0.25)] backdrop-blur-[12px]">
      <div className="flex gap-2.5 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
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
              className={`flex shrink-0 cursor-pointer items-center gap-[7px] whitespace-nowrap rounded-[10px] px-[15px] py-2.5 font-bold text-white transition-all duration-200 ${
                isActive
                  ? "bg-green-500"
                  : "bg-gray-800"
              }`}
            >
              <span>{tab.icon}</span>

              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}