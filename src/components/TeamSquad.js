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
            player.id ?? null,

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
            calculateAge(birthDate),

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
    const uniquePositions = [
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
    }, [
      formattedPlayers,
      search,
      position,
    ]);

  return (
    <section
      id="squad"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          👥 Team Squad
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Current squad provided by
          football-data.org.
        </p>
      </div>

      {/* CONTROLS */}

      <div className="mb-[30px] flex flex-wrap gap-[15px]">
        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search player..."
          className="min-w-[240px] flex-1 rounded-[10px] border border-[#293548] bg-gray-800 px-[15px] py-[13px] text-sm text-white outline-none placeholder:text-slate-500 focus:border-green-500"
        />

        <select
          value={position}
          onChange={(event) =>
            setPosition(
              event.target.value
            )
          }
          className="rounded-[10px] border border-[#293548] bg-gray-800 px-[15px] py-[13px] text-sm text-white outline-none focus:border-green-500"
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

      {/* RESULT COUNT */}

      <div className="mb-[18px] text-[13px] text-slate-500">
        Showing{" "}
        <strong className="text-slate-300">
          {filteredPlayers.length}
        </strong>{" "}
        of{" "}
        <strong className="text-slate-300">
          {formattedPlayers.length}
        </strong>{" "}
        players
      </div>

      {/* EMPTY STATE */}

      {formattedPlayers.length ===
      0 ? (
        <div className="rounded-2xl bg-gray-800 p-[35px] text-center text-slate-400">
          No squad players are
          available.
        </div>
      ) : filteredPlayers.length ===
        0 ? (
        <div className="rounded-2xl bg-gray-800 p-[35px] text-center text-slate-400">
          No players match your
          search/filter.
        </div>
      ) : (
        /* SQUAD GRID */

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
          {filteredPlayers.map(
            (player) => (
              <Link
                key={player.id}
                href={`/player/${player.id}`}
                className="block text-white no-underline"
              >
                <article className="h-full rounded-[18px] border border-[#293548] bg-gray-800 p-[22px] transition-all duration-300 hover:-translate-y-[5px] hover:border-green-500 hover:shadow-[0_12px_25px_rgba(0,0,0,0.28)]">
                  {/* TOP ROW */}

                  <div className="mb-[18px] flex items-center justify-between gap-3">
                    <div className="text-[24px] font-black text-green-500">
                      #
                      {player.number !==
                      "-"
                        ? player.number
                        : "—"}
                    </div>

                    <div className="rounded-[30px] bg-gray-900 px-3 py-1.5 text-xs font-bold text-slate-300">
                      {player.position}
                    </div>
                  </div>

                  {/* PLAYER IMAGE */}

                  <div className="mb-[18px] flex justify-center">
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
                        className="rounded-full border-[3px] border-[#293548] object-cover"
                      />
                    ) : (
                      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[3px] border-[#293548] bg-gradient-to-br from-gray-900 to-slate-800 text-[32px] font-black text-green-500">
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

                  <h3 className="mb-4 text-center text-[20px] text-white">
                    {player.name}
                  </h3>

                  {/* PLAYER DATA */}

                  <div className="grid gap-2 text-[13px] text-slate-300">
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

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
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
    <div className="flex justify-between gap-3 border-b border-[#293548] py-2">
      <span>{label}</span>

      <strong className="break-words text-right text-white [overflow-wrap:anywhere]">
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