"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DashboardHero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const data = await api.getDashboard();

      if (mounted) {
        if (data.success) {
          setHero(data.hero);
        }

        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 35,
          color: "white",
        }}
      >
        Loading dashboard...
      </section>
    );
  }

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg,#111827,#1f2937)",
        borderRadius: 20,
        padding: 35,
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: 38,
          marginBottom: 10,
        }}
      >
        ⚽ Apex Sports
      </h1>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: 30,
        }}
      >
        Live football. Fixtures. Statistics. Players.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 20,
        }}
      >
        <Stat title="Leagues" value={hero?.leagues ?? 0} />
        <Stat title="Teams" value={hero?.teams ?? 0} />
        <Stat title="Players" value={hero?.players ?? 0} />
        <Stat title="Fixtures" value={hero?.fixtures ?? 0} />
      </div>
    </section>
  );
}

function Stat({ title, value }) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 15,
        padding: 20,
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: 34,
          color: "#22c55e",
        }}
      >
        {value}
      </h2>

      <p>{title}</p>
    </div>
  );
}