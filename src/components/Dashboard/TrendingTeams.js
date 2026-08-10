"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

export default function TrendingTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.getTrendingTeams();

        if (!mounted) return;

        if (data?.success && Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          setTeams([]);
        }
      } catch (err) {
        console.error("Trending Teams:", err);
        setTeams([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 25,
        color: "white",
      }}
    >
      <h2
        style={{
          marginBottom: 25,
          fontSize: 28,
        }}
      >
        🔥 Trending Teams
      </h2>

      {loading && (
        <div
          style={{
            textAlign: "center",
            color: "#94a3b8",
            padding: "30px 0",
          }}
        >
          Loading teams...
        </div>
      )}

      {!loading && teams.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#94a3b8",
            padding: "30px 0",
          }}
        >
          No teams available.
        </div>
      )}

      {!loading && teams.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: 20,
          }}
        >
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: "#1f2937",
                  borderRadius: 15,
                  padding: 20,
                  textAlign: "center",
                  border: "1px solid #374151",
                  transition: ".2s",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={70}
                  height={70}
                />

                <h3
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    fontSize: 18,
                  }}
                >
                  {team.name}
                </h3>

                <p
                  style={{
                    color: "#9ca3af",
                    marginBottom: 5,
                  }}
                >
                  {team.country}
                </p>

                <small
                  style={{
                    color: "#22c55e",
                  }}
                >
                  Founded {team.founded}
                </small>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}