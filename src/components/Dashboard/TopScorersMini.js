"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

export default function TopScorersMini() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.getTopScorersMini();

        if (!mounted) return;

        if (data?.success) {
          setPlayers(Array.isArray(data.players) ? data.players : []);
        } else {
          setPlayers([]);
        }
      } catch (err) {
        console.error("TopScorersMini:", err);
        if (mounted) setPlayers([]);
      } finally {
        if (mounted) setLoading(false);
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
        color: "#fff",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        ⚽ Top Scorers
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && players.length === 0 && (
        <p style={{ color: "#94a3b8" }}>
          No top scorers available.
        </p>
      )}

      {!loading &&
        players.map((player, index) => {
          const id =
            player?.player?.id ??
            player?.id ??
            `${player?.name}-${index}`;

          const photo =
            player?.player?.photo ??
            player?.photo ??
            "/player.png";

          const name =
            player?.player?.name ??
            player?.name ??
            "Unknown Player";

          const teamName =
            player?.statistics?.[0]?.team?.name ??
            player?.team?.name ??
            player?.team ??
            "Unknown Team";

          const goals =
            player?.statistics?.[0]?.goals?.total ??
            player?.goals ??
            0;

          return (
            <Link
              key={id}
              href={`/player/${id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "35px 50px 1fr auto",
                  alignItems: "center",
                  gap: 15,
                  padding: "14px 0",
                  borderBottom:
                    index !== players.length - 1
                      ? "1px solid #1f2937"
                      : "none",
                }}
              >
                <strong
                  style={{
                    color: "#22c55e",
                  }}
                >
                  {index + 1}
                </strong>

                <Image
                  src={photo}
                  alt={name}
                  width={50}
                  height={50}
                  unoptimized
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {name}
                  </div>

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    {teamName}
                  </div>
                </div>

                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#22c55e",
                  }}
                >
                  {goals}
                </div>
              </div>
            </Link>
          );
        })}
    </section>
  );
}