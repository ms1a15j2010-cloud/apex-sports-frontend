"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TeamSquad({ players = [] }) {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");

  const formattedPlayers = useMemo(() => {
    return players.map((p) => {
      if (p.player) {
        return {
          id: p.player.id,
          name: p.player.name,
          photo: p.player.photo,
          age: p.player.age,
          nationality: p.player.nationality,
          height: p.player.height,
          weight: p.player.weight,
          position:
            p.statistics?.[0]?.games?.position ||
            "Unknown",
          number:
            p.statistics?.[0]?.games?.number || "-",
          appearances:
            p.statistics?.[0]?.games?.appearences ||
            0,
          rating:
            p.statistics?.[0]?.games?.rating ||
            "-",
        };
      }

      return {
        id: p.id,
        name: p.name,
        photo: p.photo,
        age: p.age,
        nationality: p.nationality,
        height: p.height,
        weight: p.weight,
        position: p.position || "Unknown",
        number: p.number || "-",
        appearances: p.appearances || 0,
        rating: p.rating || "-",
      };
    });
  }, [players]);

  const positions = [
    "All",
    ...new Set(
      formattedPlayers.map((p) => p.position)
    ),
  ];

  const filtered = formattedPlayers.filter(
    (player) => {
      const matchSearch =
        player.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchPosition =
        position === "All" ||
        player.position === position;

      return matchSearch && matchPosition;
    }
  );

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
        }}
      >
        👥 Team Squad
      </h2>

      {/* Controls */}

      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search player..."
          style={{
            flex: 1,
            minWidth: 240,
            background: "#1f2937",
            color: "#fff",
            border: "none",
            padding: 12,
            borderRadius: 10,
          }}
        />

        <select
          value={position}
          onChange={(e) =>
            setPosition(e.target.value)
          }
          style={{
            background: "#1f2937",
            color: "#fff",
            border: "none",
            padding: 12,
            borderRadius: 10,
          }}
        >
          {positions.map((p) => (
            <option
              key={p}
              value={p}
            >
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Squad */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(260px,1fr))",
          gap: 22,
        }}
      >
        {filtered.map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.id}`}
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <div
              style={{
                background: "#1f2937",
                borderRadius: 18,
                padding: 22,
                transition: ".25s",
                height: "100%",
                border:
                  "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px)";
                e.currentTarget.style.border =
                  "1px solid #22c55e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.border =
                  "1px solid transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    color: "#22c55e",
                  }}
                >
                  #{player.number}
                </div>

                <div
                  style={{
                    background: "#111827",
                    borderRadius: 30,
                    padding:
                      "6px 12px",
                    fontSize: 13,
                  }}
                >
                  {player.position}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  marginBottom: 18,
                }}
              >
                <Image
                  src={
                    player.photo ||
                    "/player.png"
                  }
                  alt={player.name}
                  width={100}
                  height={100}
                  style={{
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                  }}
                />
              </div>

              <h3
                style={{
                  textAlign:
                    "center",
                  marginBottom: 15,
                  fontSize: 20,
                }}
              >
                {player.name}
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: 8,
                  color: "#cbd5e1",
                  fontSize: 14,
                }}
              >
                <Row
                  label="Age"
                  value={player.age}
                />

                <Row
                  label="Nation"
                  value={
                    player.nationality
                  }
                />

                <Row
                  label="Height"
                  value={
                    player.height ||
                    "-"
                  }
                />

                <Row
                  label="Weight"
                  value={
                    player.weight ||
                    "-"
                  }
                />

                <Row
                  label="Apps"
                  value={
                    player.appearances
                  }
                />

                <Row
                  label="Rating"
                  value={
                    player.rating
                  }
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Row({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}