"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TestAPI() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/api/live");
        const data = await res.json();

        setMatches(data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // Initial load
    load();

    // Auto refresh every 30 seconds
    const interval = setInterval(load, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main
        style={{
          padding: "40px",
          color: "#fff",
          background: "#020617",
          minHeight: "100vh",
        }}
      >
        <h2>Loading live matches...</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "#fff",
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        ⚽ Live Football Matches
      </h1>

      {matches.length === 0 ? (
        <p>No live matches currently.</p>
      ) : (
        matches.map((match) => (
          <div
            key={match.id}
            style={{
              background: "#111827",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "22px",
              border: "1px solid #1f2937",
              boxShadow: "0 8px 20px rgba(0,0,0,.35)",
            }}
          >
            {/* League */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src={match.league.logo}
                  alt={match.league.name}
                  width={22}
                  height={22}
                />

                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {match.league.name}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  {match.league.country}
                </span>
              </div>

              <div
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                🔴 {match.status.short}
                {match.liveMinute ? ` ${match.liveMinute}'` : ""}
              </div>
            </div>

            {/* Home Team */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Image
                  src={match.home.logo}
                  alt={match.home.name}
                  width={34}
                  height={34}
                />

                <strong>{match.home.name}</strong>
              </div>

              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                {match.goals.home}
              </span>
            </div>

            {/* Away Team */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderTop: "1px solid #1f2937",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Image
                  src={match.away.logo}
                  alt={match.away.name}
                  width={34}
                  height={34}
                />

                <strong>{match.away.name}</strong>
              </div>

              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                {match.goals.away}
              </span>
            </div>
          </div>
        ))
      )}
    </main>
  );
}