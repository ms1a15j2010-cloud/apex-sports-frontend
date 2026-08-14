"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TeamSquad({
  players = [],
}) {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");

  /* =====================================================
     NORMALIZE SQUAD
  ===================================================== */

  const formattedPlayers = useMemo(() => {
    if (!Array.isArray(players)) {
      return [];
    }

    return players
      .map((item) => {
        const player =
          item?.player || item || {};

        const statistics =
          Array.isArray(
            item?.statistics
          )
            ? item.statistics[0] || {}
            : {};

        const games =
          statistics.games || {};

        const birthDate =
          player.dateOfBirth ||
          player.birth?.date ||
          null;

        return {
          id:
            player.id ??
            null,

          name:
            player.name ||
            "Unknown Player",

          firstName:
            player.firstName ||
            player.firstname ||
            null,

          lastName:
            player.lastName ||
            player.lastname ||
            null,

          photo:
            player.photo ||
            null,

          nationality:
            player.nationality ||
            "-",

          birthDate,

          age:
            player.age ??
            calculateAge(
              birthDate
            ),

          height:
            player.height ||
            null,

          weight:
            player.weight ||
            null,

          position:
            player.position ||
            games.position ||
            "Unknown",

          number:
            player.shirtNumber ??
            player.number ??
            games.number ??
            "-",

          appearances:
            games.appearances ??
            games.appearences ??
            0,

          rating:
            games.rating ||
            "-",

          goals:
            statistics.goals?.total ??
            0,

          assists:
            statistics.goals?.assists ??
            0,
        };
      })
      .filter(
        (player) =>
          player.id !== null
      );
  }, [players]);

  /* =====================================================
     POSITIONS
  ===================================================== */

  const positions = useMemo(() => {
    const uniquePositions =
      [
        ...new Set(
          formattedPlayers
            .map(
              (player) =>
                player.position
            )
            .filter(Boolean)
        ),
      ].sort();

    return [
      "All",
      ...uniquePositions,
    ];
  }, [formattedPlayers]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredPlayers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return formattedPlayers.filter(
        (player) => {
          const matchesSearch =
            !query ||
            player.name
              .toLowerCase()
              .includes(query);

          const matchesPosition =
            position === "All" ||
            player.position ===
              position;

          return (
            matchesSearch &&
            matchesPosition
          );
        }
      );
    },
    [
      formattedPlayers,
      search,
      position,
    ]
  );

  return (
    <section
      id="squad"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform:
              "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          👥 Team Squad
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
          }}
        >
          Current squad provided by
          football-data.org.
        </p>
      </div>

      {/* =================================================
          CONTROLS
      ================================================= */}

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
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search player..."
          style={{
            flex: 1,
            minWidth: 240,
            background:
              "#1f2937",
            color: "#fff",
            border:
              "1px solid #293548",
            outline: "none",
            padding:
              "13px 15px",
            borderRadius: 10,
            fontSize: 14,
          }}
        />

        <select
          value={position}
          onChange={(event) =>
            setPosition(
              event.target.value
            )
          }
          style={{
            background:
              "#1f2937",
            color: "#fff",
            border:
              "1px solid #293548",
            outline: "none",
            padding:
              "13px 15px",
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          {positions.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      {/* =================================================
          RESULT COUNT
      ================================================= */}

      <div
        style={{
          color: "#64748b",
          fontSize: 13,
          marginBottom: 18,
        }}
      >
        Showing{" "}
        <strong
          style={{
            color: "#cbd5e1",
          }}
        >
          {filteredPlayers.length}
        </strong>{" "}
        of{" "}
        <strong
          style={{
            color: "#cbd5e1",
          }}
        >
          {formattedPlayers.length}
        </strong>{" "}
        players
      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {formattedPlayers.length ===
      0 ? (
        <div
          style={{
            background:
              "#1f2937",
            borderRadius: 16,
            padding: 35,
            textAlign:
              "center",
            color:
              "#94a3b8",
          }}
        >
          No squad players are
          available.
        </div>
      ) : filteredPlayers.length ===
        0 ? (
        <div
          style={{
            background:
              "#1f2937",
            borderRadius: 16,
            padding: 35,
            textAlign:
              "center",
            color:
              "#94a3b8",
          }}
        >
          No players match your
          search/filter.
        </div>
      ) : (
        /* =================================================
           SQUAD GRID
        ================================================= */

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(270px,1fr))",
            gap: 20,
          }}
        >
          {filteredPlayers.map(
            (player) => (
              <Link
                key={player.id}
                href={`/player/${player.id}`}
                style={{
                  textDecoration:
                    "none",
                  color: "#fff",
                  display:
                    "block",
                }}
              >
                <article
                  style={{
                    background:
                      "#1f2937",
                    borderRadius:
                      18,
                    padding: 22,
                    border:
                      "1px solid #293548",
                    height:
                      "100%",
                    transition:
                      "transform .25s ease, border-color .25s ease, box-shadow .25s ease",
                  }}
                  onMouseEnter={(
                    event
                  ) => {
                    event.currentTarget.style.transform =
                      "translateY(-5px)";

                    event.currentTarget.style.borderColor =
                      "#22c55e";

                    event.currentTarget.style.boxShadow =
                      "0 12px 25px rgba(0,0,0,.28)";
                  }}
                  onMouseLeave={(
                    event
                  ) => {
                    event.currentTarget.style.transform =
                      "translateY(0)";

                    event.currentTarget.style.borderColor =
                      "#293548";

                    event.currentTarget.style.boxShadow =
                      "none";
                  }}
                >
                  {/* TOP ROW */}

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      gap: 12,
                      marginBottom:
                        18,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color:
                          "#22c55e",
                      }}
                    >
                      #
                      {player.number !==
                      "-"
                        ? player.number
                        : "—"}
                    </div>

                    <div
                      style={{
                        background:
                          "#111827",
                        borderRadius:
                          30,
                        padding:
                          "6px 12px",
                        fontSize: 12,
                        color:
                          "#cbd5e1",
                        fontWeight:
                          700,
                      }}
                    >
                      {
                        player.position
                      }
                    </div>
                  </div>

                  {/* PLAYER IMAGE */}

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "center",
                      marginBottom:
                        18,
                    }}
                  >
                    {player.photo ? (
                      <Image
                        src={
                          player.photo
                        }
                        alt={
                          player.name
                        }
                        width={100}
                        height={100}
                        unoptimized
                        style={{
                          borderRadius:
                            "50%",
                          objectFit:
                            "cover",
                          border:
                            "3px solid #293548",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius:
                            "50%",
                          background:
                            "linear-gradient(135deg,#111827,#293548)",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color:
                            "#22c55e",
                          fontSize: 32,
                          fontWeight:
                            900,
                          border:
                            "3px solid #293548",
                        }}
                      >
                        {player.name
                          ?.slice(
                            0,
                            1
                          )
                          ?.toUpperCase() ||
                          "P"}
                      </div>
                    )}
                  </div>

                  {/* NAME */}

                  <h3
                    style={{
                      textAlign:
                        "center",
                      margin:
                        "0 0 16px",
                      fontSize: 20,
                      color:
                        "#fff",
                    }}
                  >
                    {player.name}
                  </h3>

                  {/* PLAYER DATA */}

                  <div
                    style={{
                      display:
                        "grid",
                      gap: 8,
                      color:
                        "#cbd5e1",
                      fontSize: 13,
                    }}
                  >
                    <Row
                      label="Age"
                      value={
                        player.age ??
                        "-"
                      }
                    />

                    <Row
                      label="Nationality"
                      value={
                        player.nationality
                      }
                    />

                    <Row
                      label="Appearances"
                      value={
                        player.appearances
                      }
                    />

                    <Row
                      label="Goals"
                      value={
                        player.goals
                      }
                    />

                    <Row
                      label="Assists"
                      value={
                        player.assists
                      }
                    />

                    <Row
                      label="Rating"
                      value={
                        player.rating
                      }
                    />
                  </div>
                </article>
              </Link>
            )
          )}
        </div>
      )}

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
          fontSize: 12,
        }}
      >
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
ROW
===================================================== */

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
        gap: 12,
        padding:
          "8px 0",
        borderBottom:
          "1px solid #293548",
      }}
    >
      <span>
        {label}
      </span>

      <strong
        style={{
          color: "#fff",
          textAlign: "right",
          overflowWrap:
            "anywhere",
        }}
      >
        {value ?? "-"}
      </strong>
    </div>
  );
}

/* =====================================================
AGE
===================================================== */

function calculateAge(
  birthDate
) {
  if (!birthDate) {
    return null;
  }

  const birth =
    new Date(birthDate);

  if (
    Number.isNaN(
      birth.getTime()
    )
  ) {
    return null;
  }

  const today =
    new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    today.getMonth() -
    birth.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() <
        birth.getDate()
    )
  ) {
    age--;
  }

  return age;
}