"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/api";

export default function StandingsMini() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.getStandingsMini();

        if (!mounted) return;

        if (data?.success) {
          const standings = Array.isArray(data.standings)
            ? data.standings
            : Array.isArray(data.table)
            ? data.table
            : [];

          setTeams(standings.slice(0, 5));
        } else {
          setTeams([]);
        }
      } catch (err) {
        console.error("StandingsMini:", err);
        if (mounted) setTeams([]);
      } finally {
        if (mounted) setLoading(false);
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
          padding: 25,
          color: "#fff",
        }}
      >
        <h2>🏆 League Standings</h2>
        <p style={{ color: "#94a3b8" }}>Loading...</p>
      </section>
    );
  }

  if (teams.length === 0) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 25,
          color: "#fff",
        }}
      >
        <h2>🏆 League Standings</h2>
        <p style={{ color: "#94a3b8" }}>
          Standings unavailable.
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 25,
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        🏆 League Standings
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              color: "#94a3b8",
              borderBottom: "1px solid #1f2937",
            }}
          >
            <th align="center">#</th>
            <th align="left">Club</th>
            <th align="center">Pts</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => {
            const key =
              team?.team?.id ??
              team?.id ??
              `${team?.rank ?? index}-${index}`;

            return (
              <tr
                key={key}
                style={{
                  borderBottom: "1px solid #1f2937",
                }}
              >
                <td align="center">
                  {team?.rank ?? "-"}
                </td>

                <td>
                  <Link
                    href={`/team/${team?.team?.id ?? team?.id ?? ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <Image
                      src={
                        team?.team?.logo ||
                        "/images/team-placeholder.png"
                      }
                      alt={team?.team?.name || "Team"}
                      width={28}
                      height={28}
                    />

                    <span>
                      {team?.team?.name || "Unknown Team"}
                    </span>
                  </Link>
                </td>

                <td
                  align="center"
                  style={{
                    color: "#22c55e",
                    fontWeight: 700,
                  }}
                >
                  {team?.points ?? 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}