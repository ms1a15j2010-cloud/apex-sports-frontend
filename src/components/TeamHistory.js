"use client";

export default function TeamHistory({
  team,
  history = [],
}) {
  if (!team) return null;

  const area = team.area || {};
  const venue = team.venue || {};

  const founded =
    team.founded || "-";

  const country =
    area.name ||
    team.country ||
    "-";

  const code =
    team.tla ||
    team.shortName ||
    "-";

  const clubColors =
    team.clubColors ||
    "-";

  const venueName =
    venue.name ||
    "-";

  const venueCity =
    venue.city ||
    "-";

  const venueAddress =
    venue.address ||
    "-";

  const matches =
    Array.isArray(history)
      ? history
      : [];

  return (
    <section
      id="history"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          📖 Club History
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Club identity, foundation,
          venue information and recent
          historical results.
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
        <HistoryCard
          icon="📅"
          title="Founded"
          value={founded}
          color="#3b82f6"
        />

        <HistoryCard
          icon="🌍"
          title="Country"
          value={country}
          color="#22c55e"
        />

        <HistoryCard
          icon="🏷️"
          title="Team Code"
          value={code}
          color="#f59e0b"
        />

        <HistoryCard
          icon="🎨"
          title="Club Colors"
          value={clubColors}
          color="#8b5cf6"
        />
      </div>

      {/* CLUB TIMELINE */}

      <div className="mb-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-[25px] text-white">
          Club Timeline
        </h3>

        <TimelineItem
          year={founded}
          title="Club Founded"
          description={`${team.name || "This club"} was established in ${founded}.`}
        />

        <TimelineItem
          year="Current"
          title="Home Stadium"
          description={
            venueName !== "-"
              ? `${venueName}${
                  venueCity !== "-"
                    ? ` in ${venueCity}`
                    : ""
                }.`
              : "Home stadium information is unavailable."
          }
        />

        <TimelineItem
          year="Current"
          title="Club Location"
          description={`The club is based in ${country}.`}
        />

        <TimelineItem
          year="Current"
          title="Team Identity"
          description={
            clubColors !== "-"
              ? `The club colors are ${clubColors}.`
              : "Club color information is unavailable."
          }
        />

        {venueAddress !== "-" && (
          <TimelineItem
            year="Current"
            title="Stadium Address"
            description={venueAddress}
          />
        )}
      </div>

      {/* RECENT HISTORY */}

      <div className="mb-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-5 text-white">
          🕘 Recent Match History
        </h3>

        {matches.length === 0 ? (
          <p className="m-0 text-slate-400">
            Recent historical matches are
            not available.
          </p>
        ) : (
          <div className="grid gap-3">
            {matches
              .slice(0, 10)
              .map(
                (
                  match,
                  index
                ) => {
                  const home =
                    match?.homeTeam ||
                    {};

                  const away =
                    match?.awayTeam ||
                    {};

                  const score =
                    match?.score
                      ?.fullTime ||
                    {};

                  const date =
                    match?.utcDate
                      ? new Date(
                          match.utcDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-";

                  return (
                    <div
                      key={
                        match?.id ??
                        index
                      }
                      className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[14px] border border-[#293548] bg-gray-900 p-4"
                    >
                      <div className="break-words font-bold text-white [overflow-wrap:anywhere]">
                        {home.name ||
                          "Home Team"}
                      </div>

                      <div className="min-w-[80px] text-center">
                        <div className="font-black text-white">
                          {score.home ??
                            0}{" "}
                          -{" "}
                          {score.away ??
                            0}
                        </div>

                        <div className="mt-1 text-[11px] text-slate-500">
                          {date}
                        </div>
                      </div>

                      <div className="break-words text-right font-bold text-white [overflow-wrap:anywhere]">
                        {away.name ||
                          "Away Team"}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        )}
      </div>

      {/* CLUB IDENTITY */}

      <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-[18px] text-white">
          Club Identity
        </h3>

        <p className="m-0 leading-[1.9] text-slate-300">
          <strong>
            {team.name ||
              "This club"}
          </strong>{" "}
          is a professional football
          club based in{" "}
          <strong>{country}</strong>.
          {founded !== "-" &&
            ` The club was founded in ${founded}.`}
          {venueName !== "-" &&
            ` Its current home stadium is ${venueName}.`}
          {venueCity !== "-" &&
            ` The stadium is located in ${venueCity}.`}
          {clubColors !== "-" &&
            ` The club colors are ${clubColors}.`}
        </p>
      </div>

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
HISTORY CARD
===================================================== */

function HistoryCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      className="rounded-2xl bg-gray-800 p-[22px] text-center"
      style={{
        border: `1px solid ${color}40`,
      }}
    >
      <div className="mb-3 text-[30px]">
        {icon}
      </div>

      <div className="mb-2 text-[13px] text-slate-400">
        {title}
      </div>

      <div
        className="break-words text-[22px] font-black [overflow-wrap:anywhere]"
        style={{
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =====================================================
TIMELINE ITEM
===================================================== */

function TimelineItem({
  year,
  title,
  description,
}) {
  return (
    <div className="mb-[22px] flex gap-5">
      <div className="w-[90px] shrink-0 text-[13px] font-extrabold text-green-500">
        {year}
      </div>

      <div className="flex-1 border-l-[3px] border-green-500 pl-[18px]">
        <div className="mb-1.5 font-extrabold text-white">
          {title}
        </div>

        <div className="text-sm leading-[1.7] text-slate-300">
          {description}
        </div>
      </div>
    </div>
  );
}