"use client";

export default function HomeTabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "live",
      label: "🔴 Live",
    },
    {
      id: "today",
      label: "📅 Today",
    },
    {
      id: "finished",
      label: "✅ Finished",
    },
    {
      id: "upcoming",
      label: "⏰ Upcoming",
    },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${
            activeTab === tab.id ? "active" : ""
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}