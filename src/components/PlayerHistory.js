"use client";

export default function PlayerHistory({
  player,
  history = [],
}) {
  if (!player) return null;

  const birthDate =
    player.birth?.date || "-";

  const birthPlace = [
    player.birth?.place,
    player.birth?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const age =
    player.age ||
    player.birth?.age ||
    "-";

  const nationality =
    player.nationality ||
    player.country ||
    "-";

  const height =
    player.height || "-";

  const weight =
    player.weight || "-";

  const position =
    player.position ||
    player.statistics?.[0]?.games?.position ||
    "-";

  const club =
    player.team?.name ||
    player.club?.name ||
    player.statistics?.[0]?.team?.name ||
    "-";

  const season =
    player.statistics?.[0]?.league?.season ||
    "-";

  const competition =
    player.statistics?.[0]?.league?.name ||
    "Premier League";

  const appearances =
    player.statistics?.[0]?.games?.appearances ??
    player.statistics?.[0]?.games?.appearences ??
    0;

  const goals =
    player.statistics?.[0]?.goals?.total ??
    0;

  const assists =
    player.statistics?.[0]?.goals?.assists ??
    0;

  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1e293b] bg-gradient-to-br from-[#111827] to-[#0f172a] p-[30px]">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-7">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          📖 Player History
        </h2>

        <p className="m-[8px_0_0] text-[14px] text-slate-400">
          Personal and professional history currently available
          for {player.name || "this player"}.
        </p>
      </div>

      {/* =================================================
          HISTORY TIMELINE
      ================================================= */}

      <div className="grid gap-[18px]">
        {/* BIRTH */}

        <TimelineCard
          title="Birth"
          icon="👶"
        >
          <HistoryRow
            label="Date"
            value={birthDate}
          />

          <HistoryRow
            label="Place"
            value={birthPlace || "-"}
          />
        </TimelineCard>

        {/* NATIONALITY */}

        <TimelineCard
          title="Nationality"
          icon="🌍"
        >
          <HistoryRow
            label="Country"
            value={nationality}
          />
        </TimelineCard>

        {/* PROFESSIONAL CAREER */}

        <TimelineCard
          title="Professional Career"
          icon="⚽"
        >
          <HistoryRow
            label="Current Club"
            value={club}
          />

          <HistoryRow
            label="Position"
            value={position}
          />

          <HistoryRow
            label="Age"
            value={age}
          />

          <HistoryRow
            label="Competition"
            value={competition}
          />

          <HistoryRow
            label="Season"
            value={season}
          />
        </TimelineCard>

        {/* CURRENT SEASON */}

        <TimelineCard
          title="Current Season"
          icon="🏆"
        >
          <HistoryRow
            label="Appearances"
            value={appearances}
          />

          <HistoryRow
            label="Goals"
            value={goals}
          />

          <HistoryRow
            label="Assists"
            value={assists}
          />
        </TimelineCard>

        {/* PHYSICAL PROFILE */}

        <TimelineCard
          title="Physical Profile"
          icon="💪"
        >
          <HistoryRow
            label="Height"
            value={height}
          />

          <HistoryRow
            label="Weight"
            value={weight}
          />
        </TimelineCard>
      </div>

      {/* =================================================
          MATCH HISTORY
      ================================================= */}

      {Array.isArray(history) &&
        history.length > 0 && (
          <div className="mt-[35px]">
            <h3 className="mb-[18px] text-white">
              Recent Match History
            </h3>

            <div className="grid gap-3">
              {history
                .slice(0, 10)
                .map((match, index) => (
                  <MatchHistoryCard
                    key={
                      match?.id ||
                      index
                    }
                    match={match}
                  />
                ))}
            </div>
          </div>
        )}

      {/* =================================================
          CAREER OVERVIEW
      ================================================= */}

      <div className="mt-[35px] rounded-[18px] bg-[#1f2937] p-[25px]">
        <h3 className="mb-[18px] text-white">
          Career Overview
        </h3>

        <p className="m-0 text-[#cbd5e1] leading-[1.9]">
          <strong>
            {player.name ||
              "This player"}
          </strong>{" "}
          is a professional football player
          currently associated with{" "}
          <strong>{club}</strong>.
          {position !== "-" &&
            ` The player is listed as a ${position}.`}
          {nationality !== "-" &&
            ` The player represents ${nationality}.`}
          {age !== "-" &&
            ` The current recorded age is ${age}.`}
          {season !== "-" &&
            ` The available season data is from ${competition}, season ${season}.`}
        </p>
      </div>
    </section>
  );
}

/* =====================================================
TIMELINE CARD
===================================================== */

function TimelineCard({
  title,
  icon,
  children,
}) {
  return (
    <div className="rounded-[18px] border-l-[5px] border-green-500 bg-[#1f2937] p-[22px]">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="text-[26px]">
          {icon}
        </span>

        <h3 className="m-0 text-white">
          {title}
        </h3>
      </div>

      <div className="text-[#cbd5e1]">
        {children}
      </div>
    </div>
  );
}

/* =====================================================
HISTORY ROW
===================================================== */

function HistoryRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-[#293548] py-2.5 last:border-b-0 max-[500px]:items-start max-[500px]:flex-col max-[500px]:gap-1">
      <span className="text-[14px] text-slate-400">
        {label}
      </span>

      <strong className="break-words text-right text-[14px] text-white max-[500px]:text-left">
        {value}
      </strong>
    </div>
  );
}

/* =====================================================
MATCH HISTORY CARD
===================================================== */

function MatchHistoryCard({
  match,
}) {
  const home =
    match?.homeTeam?.name ||
    match?.teams?.home?.name ||
    "Home";

  const away =
    match?.awayTeam?.name ||
    match?.teams?.away?.name ||
    "Away";

  const date =
    match?.utcDate ||
    match?.fixture?.date ||
    null;

  const status =
    match?.status ||
    match?.fixture?.status?.short ||
    "";

  const homeScore =
    match?.score?.fullTime?.home ??
    match?.goals?.home ??
    null;

  const awayScore =
    match?.score?.fullTime?.away ??
    match?.goals?.away ??
    null;

  const isFinished =
    status === "FINISHED" ||
    status === "FT";

  return (
    <div className="rounded-[14px] border border-[#293548] bg-[#0f172a] p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[15px] max-[600px]:grid-cols-1 max-[600px]:gap-3">
        <strong className="break-words text-left text-white max-[600px]:text-center">
          {home}
        </strong>

        <div className="text-center">
          <div className="font-extrabold text-white">
            {homeScore ?? "-"}
            {" - "}
            {awayScore ?? "-"}
          </div>

          <div
            className={`mt-1 text-[11px] uppercase ${
              isFinished
                ? "text-green-500"
                : "text-amber-500"
            }`}
          >
            {status || "Unknown"}
          </div>
        </div>

        <strong className="break-words text-right text-white max-[600px]:text-center">
          {away}
        </strong>
      </div>

      {date && (
        <div className="mt-2.5 text-center text-[12px] text-slate-500">
          {new Date(date).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </div>
      )}
    </div>
  );
}