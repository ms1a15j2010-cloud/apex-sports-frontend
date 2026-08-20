"use client";

import Image from "next/image";

export default function MatchStandings({
  standings = [],
}) {
  if (!standings || standings.length === 0) {
    return (
      <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
        <h2 className="mb-5 text-white">
          📊 League Standings
        </h2>

        <p className="text-slate-400">
          Standings unavailable.
        </p>
      </section>
    );
  }

  const table =
    standings[0].league?.standings?.[0] ||
    standings[0].standings ||
    standings;

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
      <h2 className="mb-[30px] text-white">
        📊 League Standings
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-gray-800">
              {[
                "#",
                "Team",
                "P",
                "W",
                "D",
                "L",
                "GF",
                "GA",
                "GD",
                "Pts",
              ].map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-700 p-4 text-center text-white"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.map((club) => (
              <StandingsRow
                key={club.team.id}
                club={club}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ====================================== */

function StandingsRow({ club }) {
  return (
    <tr className="border-b border-gray-700 bg-gray-900">
      <Cell>
        {club.rank}
      </Cell>

      <td className="p-[14px]">
        <div className="flex items-center gap-3">
          <Image
            src={club.team.logo}
            alt={club.team.name}
            width={32}
            height={32}
            className="object-contain"
          />

          <span className="font-semibold text-white">
            {club.team.name}
          </span>
        </div>
      </td>

      <Cell>
        {club.all.played}
      </Cell>

      <Cell>
        {club.all.win}
      </Cell>

      <Cell>
        {club.all.draw}
      </Cell>

      <Cell>
        {club.all.lose}
      </Cell>

      <Cell>
        {club.all.goals.for}
      </Cell>

      <Cell>
        {club.all.goals.against}
      </Cell>

      <Cell>
        {club.goalsDiff}
      </Cell>

      <Cell bold>
        {club.points}
      </Cell>
    </tr>
  );
}

/* ====================================== */

function Cell({
  children,
  bold,
}) {
  return (
    <td
      className={`p-[14px] text-center text-white ${
        bold
          ? "font-bold"
          : "font-normal"
      }`}
    >
      {children}
    </td>
  );
}