"use client";

export default function TeamOverview({ team }) {
  if (!team) return null;

  const area = team.area || {};
  const venue = team.venue || {};
  const coach = team.coach || {};

  const coachName =
    coach.name ||
    [coach.firstName, coach.lastName]
      .filter(Boolean)
      .join(" ");

  const players = Array.isArray(team.players)
    ? team.players
    : [];

  const fixtures = Array.isArray(team.fixtures)
    ? team.fixtures
    : [];

  const competitions = Array.isArray(
    team.competitions
  )
    ? team.competitions
    : [];

  const primaryCompetition =
    competitions[0] || null;

  const country =
    area.name ||
    team.country ||
    "-";

  return (
    <section
      id="overview"
      className="mb-[30px] rounded-[18px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-7"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[30px] text-white">
          🏆 Club Information
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Official club information and
          current football-data.org data.
        </p>
      </div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-1 gap-[30px] xl:grid-cols-[minmax(320px,1.3fr)_minmax(280px,1fr)]">
        {/* LEFT */}

        <div className="min-w-0">
          <table className="w-full border-collapse">
            <tbody>
              <Row
                title="Team ID"
                value={team.id}
              />

              <Row
                title="Club Name"
                value={team.name || "-"}
              />

              <Row
                title="Country"
                value={country}
              />

              <Row
                title="Founded"
                value={team.founded || "-"}
              />

              <Row
                title="Team Code"
                value={
                  team.tla ||
                  team.shortName ||
                  "-"
                }
              />

              <Row
                title="Club Colors"
                value={
                  team.clubColors || "-"
                }
              />

              <Row
                title="Stadium"
                value={venue.name || "-"}
              />

              <Row
                title="City"
                value={venue.city || "-"}
              />

              <Row
                title="Address"
                value={
                  venue.address || "-"
                }
              />

              <Row
                title="Coach"
                value={coachName || "-"}
              />

              <Row
                title="Competition"
                value={
                  primaryCompetition?.name ||
                  "Premier League"
                }
              />
            </tbody>
          </table>
        </div>

        {/* RIGHT */}

        <div>
          {/* STADIUM */}

          <div className="flex h-[260px] items-center justify-center rounded-[15px] border border-[#293548] bg-gradient-to-br from-gray-800 to-gray-900 p-5 text-center text-lg font-bold text-slate-400">
            🏟{" "}
            {venue.name ||
              "Stadium information unavailable"}
          </div>

          {/* QUICK FACTS */}

          <div className="mt-[18px] grid grid-cols-2 gap-4">
            <MiniCard
              title="Coach"
              value={
                coachName ||
                "Unavailable"
              }
            />

            <MiniCard
              title="Squad"
              value={`${players.length} Players`}
            />

            <MiniCard
              title="Fixtures"
              value={`${fixtures.length}`}
            />

            <MiniCard
              title="Founded"
              value={
                team.founded || "-"
              }
            />

            <MiniCard
              title="Country"
              value={country}
            />

            <MiniCard
              title="Code"
              value={team.tla || "-"}
            />
          </div>
        </div>
      </div>

      {/* ABOUT CLUB */}

      <div className="mt-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-6">
        <h3 className="mb-[14px] text-white">
          About the Club
        </h3>

        <p className="m-0 leading-[1.85] text-slate-300">
          <strong>
            {team.name || "This club"}
          </strong>{" "}
          is a football club based in{" "}
          <strong>{country}</strong>.
          {team.founded
            ? ` The club was founded in ${team.founded}.`
            : ""}
          {venue.name
            ? ` Its home venue is ${venue.name}.`
            : ""}
          {coachName
            ? ` The current head coach is ${coachName}.`
            : ""}
          {primaryCompetition?.name
            ? ` The club is currently associated with ${primaryCompetition.name}.`
            : ""}
        </p>
      </div>

      {/* DATA SOURCE */}

      <div className="mt-[18px] flex flex-wrap justify-between gap-3 text-xs text-slate-500">
        <span>
          Source: football-data.org
        </span>

        <span>
          Team ID: {team.id ?? "-"}
        </span>
      </div>
    </section>
  );
}

/* =====================================================
ROW
===================================================== */

function Row({ title, value }) {
  return (
    <tr className="border-b border-gray-800">
      <td className="w-[180px] align-top py-[14px] pr-4 text-sm text-slate-400">
        {title}
      </td>

      <td className="break-words py-[14px] font-semibold text-white [overflow-wrap:anywhere]">
        {value || "-"}
      </td>
    </tr>
  );
}

/* =====================================================
MINI CARD
===================================================== */

function MiniCard({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-[#293548] bg-gray-800 p-[18px] text-center">
      <div className="mb-2 text-[13px] text-slate-400">
        {title}
      </div>

      <div className="break-words text-[18px] font-extrabold text-white [overflow-wrap:anywhere]">
        {value}
      </div>
    </div>
  );
}