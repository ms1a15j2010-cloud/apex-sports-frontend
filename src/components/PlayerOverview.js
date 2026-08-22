"use client";

export default function PlayerOverview({
  player,
}) {
  if (!player) return null;

  const statistics =
    Array.isArray(player.statistics)
      ? player.statistics[0] || {}
      : {};

  const league =
    statistics.league || {};

  const team =
    player.team ||
    statistics.team ||
    {};

  const games =
    statistics.games || {};

  const birthDate =
    player.birth?.date || "-";

  const birthPlace = [
    player.birth?.place,
    player.birth?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const age =
    player.age ??
    calculateAge(
      player.birth?.date
    );

  const nationality =
    player.nationality ||
    "-";

  const position =
    player.position ||
    games.position ||
    "-";

  const number =
    player.number ??
    games.number ??
    "-";

  const appearances =
    games.appearances ??
    games.appearences ??
    0;

  const goals =
    statistics.goals?.total ??
    0;

  const assists =
    statistics.goals?.assists ??
    0;

  return (
    <section className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]">
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          📋 Player Overview
        </h2>

        <p className="mt-2 text-sm leading-[1.6] text-slate-400">
          Profile information and current-season details
          for {player.name || "this player"}.
        </p>
      </div>

      {/* PROFILE INFORMATION */}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <InfoCard
          title="Player ID"
          value={player.id ?? "-"}
        />

        <InfoCard
          title="Full Name"
          value={player.name || "-"}
        />

        <InfoCard
          title="First Name"
          value={player.firstname || "-"}
        />

        <InfoCard
          title="Last Name"
          value={player.lastname || "-"}
        />

        <InfoCard
          title="Nationality"
          value={nationality}
        />

        <InfoCard
          title="Age"
          value={age ?? "-"}
        />

        <InfoCard
          title="Position"
          value={position}
        />

        <InfoCard
          title="Jersey Number"
          value={number ?? "-"}
        />

        <InfoCard
          title="Current Club"
          value={team?.name || "-"}
        />

        <InfoCard
          title="Competition"
          value={league?.name || "Premier League"}
        />

        <InfoCard
          title="Season"
          value={league?.season || "-"}
        />

        <InfoCard
          title="Birth Date"
          value={birthDate}
        />

        <InfoCard
          title="Birth Place"
          value={birthPlace || "-"}
        />

        <InfoCard
          title="Appearances"
          value={appearances}
        />

        <InfoCard
          title="Goals"
          value={goals}
          highlight
        />

        <InfoCard
          title="Assists"
          value={assists}
        />
      </div>

      {/* AVAILABLE PERSONAL DATA */}

      {(player.height || player.weight) && (
        <div className="mt-[25px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {player.height && (
            <InfoCard
              title="Height"
              value={player.height}
            />
          )}

          {player.weight && (
            <InfoCard
              title="Weight"
              value={player.weight}
            />
          )}
        </div>
      )}

      {/* ABOUT PLAYER */}

      <div className="mt-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-6">
        <h3 className="mb-[15px] text-white">
          About Player
        </h3>

        <p className="m-0 leading-[1.85] text-slate-300">
          <strong>
            {player.name || "This player"}
          </strong>{" "}
          is a professional football player currently
          associated with{" "}
          <strong>
            {team?.name || "their club"}
          </strong>
          . The player is listed as a{" "}
          <strong>{position}</strong>{" "}
          and represents{" "}
          <strong>{nationality}</strong>.
          {age
            ? ` The current recorded age is ${age}.`
            : ""}
          {league?.season
            ? ` This profile is using ${
                league?.name || "league"
              } season ${league.season}.`
            : ""}
        </p>
      </div>

      {/* DATA SOURCE */}

      <div className="mt-[18px] flex flex-wrap justify-between gap-3 text-xs text-slate-500">
        <span>
          Source:
          football-data.org
        </span>

        <span>
          Player ID: {player.id ?? "-"}
        </span>
      </div>
    </section>
  );
}

/* =====================================================
AGE CALCULATOR
===================================================== */

function calculateAge(birthDate) {
  if (!birthDate) {
    return null;
  }

  const birth = new Date(birthDate);

  if (Number.isNaN(birth.getTime())) {
    return null;
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    today.getMonth() -
    birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birth.getDate())
  ) {
    age--;
  }

  return age;
}

/* =====================================================
INFO CARD
===================================================== */

function InfoCard({
  title,
  value,
  highlight = false,
}) {
  return (
    <div className="rounded-[14px] border border-[#293548] bg-gray-800 p-[18px]">
      <div className="mb-2 text-[13px] text-slate-400">
        {title}
      </div>

      <div
        className={`text-xl font-extrabold [overflow-wrap:anywhere] ${
          highlight
            ? "text-green-500"
            : "text-white"
        }`}
      >
        {value ?? "-"}
      </div>
    </div>
  );
}