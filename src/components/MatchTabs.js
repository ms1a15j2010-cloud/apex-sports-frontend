"use client";

import { useState } from "react";

import MatchStatistics from "./MatchStatistics";
import Timeline from "./Timeline";
import Events from "./Events";
import Lineups from "./Lineups";
import PlayerStatistics from "./PlayerStatistics";

export default function MatchTabs({
  statistics = [],
events = [],
lineups = [],
players = [],
}) {
  const [tab, setTab] = useState("statistics");

  const tabs = [
    {
      id: "statistics",
      label: "📊 Statistics",
    },
    {
      id: "timeline",
      label: "⏱ Timeline",
    },
    {
      id: "events",
      label: "📝 Events",
    },
    {
      id: "lineups",
      label: "👥 Lineups",
    },
    {
      id: "players",
      label: "⭐ Players",
    },
  ];

  return (
    <section
      style={{
        marginTop: 30,
      }}
    >
      {/* Tabs */}

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 10,
          marginBottom: 25,
        }}
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: "12px 20px",
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontSize: 15,
              transition: ".25s",
              background:
                tab === item.id
                  ? "#2563eb"
                  : "#1e293b",
              color: "white",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}

      {tab === "statistics" && (
        <MatchStatistics statistics={statistics} />
      )}

      {tab === "timeline" && (
        <Timeline events={events} />
      )}

      {tab === "events" && (
        <Events events={events} />
      )}

      {tab === "lineups" && (
        <Lineups lineups={lineups} />
      )}

      {tab === "players" && (
        <PlayerStatistics players={players} />
      )}
    </section>
  );
}