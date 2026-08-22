"use client";

export default function PlayerRatings({
  player = null,
  statistics = [],
}) {
  if (!player) {
    return null;
  }

  const stat =
    Array.isArray(statistics) &&
    statistics.length > 0
      ? statistics[0]
      : player.statistics?.[0] || {};

  const games = stat.games || {};
  const goals = stat.goals || {};
  const shots = stat.shots || {};
  const passes = stat.passes || {};
  const tackles = stat.tackles || {};
  const duels = stat.duels || {};
  const dribbles = stat.dribbles || {};
  const fouls = stat.fouls || {};
  const cards = stat.cards || {};
  const penalty = stat.penalty || {};

  const rating = Number(games.rating || 0);

  const appearances = Number(
    games.appearances ??
      games.appearences ??
      0
  );

  const minutes = Number(
    games.minutes || 0
  );

  const goalsScored = Number(
    goals.total || 0
  );

  const assists = Number(
    goals.assists || 0
  );

  const shotsTotal = Number(
    shots.total || 0
  );

  const shotsOnTarget = Number(
    shots.on || 0
  );

  const passesTotal = Number(
    passes.total || 0
  );

  const keyPasses = Number(
    passes.key || 0
  );

  const tacklesTotal = Number(
    tackles.total || 0
  );

  const duelsTotal = Number(
    duels.total || 0
  );

  const duelsWon = Number(
    duels.won || 0
  );

  const dribbleAttempts = Number(
    dribbles.attempts || 0
  );

  const dribbleSuccess = Number(
    dribbles.success || 0
  );

  const yellowCards = Number(
    cards.yellow || 0
  );

  const redCards = Number(
    cards.red || 0
  );

  const foulsCommitted = Number(
    fouls.committed || 0
  );

  const foulsDrawn = Number(
    fouls.drawn || 0
  );

  const ratingProgress = Math.min(
    Math.max((rating / 10) * 100, 0),
    100
  );

  const shotAccuracy =
    shotsTotal > 0
      ? Math.round(
          (shotsOnTarget / shotsTotal) *
            100
        )
      : 0;

  const duelWinRate =
    duelsTotal > 0
      ? Math.round(
          (duelsWon / duelsTotal) * 100
        )
      : 0;

  const dribbleRate =
    dribbleAttempts > 0
      ? Math.round(
          (dribbleSuccess /
            dribbleAttempts) *
            100
        )
      : 0;

  return (
    <section className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-4 sm:p-5 md:p-6 lg:p-[30px]">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-[30px] flex flex-wrap items-center justify-between gap-5">
        <div className="min-w-0">
          <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
            ⚽ Apex Sports
          </div>

          <h2 className="m-0 text-2xl font-extrabold text-white sm:text-[28px]">
            ⭐ Player Ratings
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Current performance rating and
            player efficiency.
          </p>
        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2 text-[13px] font-bold text-green-500">
          {stat.league?.name ||
            "Premier League"}
        </div>
      </div>

      {/* =================================================
          PLAYER SUMMARY
      ================================================= */}

      <div className="mb-[25px] flex flex-wrap items-center justify-between gap-6 rounded-[18px] bg-gray-800 p-5 sm:p-[22px]">
        <div className="min-w-0">
          <div className="mb-1.5 text-[13px] text-slate-400">
            Player
          </div>

          <h3 className="m-0 break-words text-xl font-bold text-white sm:text-[22px]">
            {player.name ||
              "Unknown Player"}
          </h3>

          <div className="mt-1.5 text-[13px] text-slate-500">
            {player.team?.name ||
              stat.team?.name ||
              "Unknown Team"}
          </div>
        </div>

        <div className="min-w-[120px] text-center">
          <div
            className="text-[34px] font-black leading-none"
            style={{
              color: getRatingColor(
                rating
              ),
            }}
          >
            {rating
              ? rating.toFixed(1)
              : "-"}
          </div>

          <div className="mt-1.5 text-lg tracking-[2px] text-yellow-400">
            {getStars(rating)}
          </div>

          <div className="mt-1 text-xs text-slate-400">
            Rating
          </div>
        </div>
      </div>

      {/* =================================================
          RATING BAR
      ================================================= */}

      <div className="mb-[30px]">
        <div className="mb-2 flex items-center justify-between gap-4 text-[13px] font-bold text-slate-300">
          <span>
            Overall Rating
          </span>

          <span>
            {rating
              ? `${rating.toFixed(1)}/10`
              : "Not available"}
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full rounded-full transition-all duration-700 ease-in-out"
            style={{
              width: `${ratingProgress}%`,
              backgroundColor:
                getRatingColor(
                  rating
                ),
            }}
          />
        </div>
      </div>

      {/* =================================================
          CORE RATINGS
      ================================================= */}

      <div className="mb-[25px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[15px]">
        <RatingCard
          title="Appearances"
          value={appearances}
          color="blue"
        />

        <RatingCard
          title="Minutes"
          value={minutes}
          color="purple"
        />

        <RatingCard
          title="Goals"
          value={goalsScored}
          color="green"
        />

        <RatingCard
          title="Assists"
          value={assists}
          color="amber"
        />
      </div>

      {/* =================================================
          ATTACKING
      ================================================= */}

      <SectionTitle title="Attacking" />

      <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5">
        <StatCard
          title="Goals"
          value={goalsScored}
        />

        <StatCard
          title="Assists"
          value={assists}
        />

        <StatCard
          title="Shots"
          value={shotsTotal}
        />

        <StatCard
          title="Shots On Target"
          value={shotsOnTarget}
        />

        <StatCard
          title="Shot Accuracy"
          value={
            shotsTotal > 0
              ? `${shotAccuracy}%`
              : "-"
          }
        />

        <StatCard
          title="Dribble Attempts"
          value={dribbleAttempts}
        />

        <StatCard
          title="Dribbles Won"
          value={dribbleSuccess}
        />

        <StatCard
          title="Dribble Success"
          value={
            dribbleAttempts > 0
              ? `${dribbleRate}%`
              : "-"
          }
        />
      </div>

      {/* =================================================
          PASSING
      ================================================= */}

      <SectionTitle title="Passing" />

      <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5">
        <StatCard
          title="Total Passes"
          value={passesTotal}
        />

        <StatCard
          title="Key Passes"
          value={keyPasses}
        />

        <StatCard
          title="Pass Accuracy"
          value={
            passes.accuracy
              ? `${passes.accuracy}%`
              : "-"
          }
        />
      </div>

      {/* =================================================
          DEFENDING
      ================================================= */}

      <SectionTitle title="Defending" />

      <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5">
        <StatCard
          title="Tackles"
          value={tacklesTotal}
        />

        <StatCard
          title="Duels"
          value={duelsTotal}
        />

        <StatCard
          title="Duels Won"
          value={duelsWon}
        />

        <StatCard
          title="Duel Win Rate"
          value={
            duelsTotal > 0
              ? `${duelWinRate}%`
              : "-"
          }
        />

        <StatCard
          title="Fouls Drawn"
          value={foulsDrawn}
        />

        <StatCard
          title="Fouls Committed"
          value={foulsCommitted}
        />
      </div>

      {/* =================================================
          DISCIPLINE
      ================================================= */}

      <SectionTitle title="Discipline" />

      <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5">
        <StatCard
          title="🟨 Yellow Cards"
          value={yellowCards}
        />

        <StatCard
          title="🟥 Red Cards"
          value={redCards}
        />
      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="mt-2 rounded-[18px] bg-gray-800 p-5 sm:p-6">
        <h3 className="mb-[15px] text-lg font-bold text-white">
          Rating Summary
        </h3>

        <p className="m-0 leading-[1.8] text-slate-300">
          {player.name ||
            "This player"}{" "}
          has a current rating of{" "}
          <strong
            style={{
              color: getRatingColor(
                rating
              ),
            }}
          >
            {rating
              ? rating.toFixed(1)
              : "N/A"}
          </strong>
          . During the current season,
          the player has made{" "}
          <strong>
            {appearances}
          </strong>{" "}
          appearances, scored{" "}
          <strong>
            {goalsScored}
          </strong>{" "}
          goals and provided{" "}
          <strong>
            {assists}
          </strong>{" "}
          assists.
        </p>
      </div>
    </section>
  );
}

/* =====================================================
SECTION TITLE
===================================================== */

function SectionTitle({
  title,
}) {
  return (
    <h3 className="my-[10px] mb-4 text-[19px] font-semibold text-green-500">
      {title}
    </h3>
  );
}

/* =====================================================
RATING CARD
===================================================== */

function RatingCard({
  title,
  value,
  color,
}) {
  const colorClasses = {
    blue: "border-blue-500/25 text-blue-500",
    purple:
      "border-purple-500/25 text-purple-500",
    green:
      "border-green-500/25 text-green-500",
    amber:
      "border-amber-500/25 text-amber-500",
  };

  return (
    <div
      className={`rounded-2xl border bg-gray-800 p-5 text-center ${
        colorClasses[color] ||
        "border-slate-700 text-white"
      }`}
    >
      <div className="mb-2 text-[13px] text-slate-400">
        {title}
      </div>

      <div className="text-[28px] font-extrabold">
        {value}
      </div>
    </div>
  );
}

/* =====================================================
STAT CARD
===================================================== */

function StatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
      <div className="mb-1.5 text-xs text-slate-400">
        {title}
      </div>

      <strong className="text-[19px] font-extrabold text-white">
        {value ?? 0}
      </strong>
    </div>
  );
}

/* =====================================================
STARS
===================================================== */

function getStars(rating) {
  if (!rating) {
    return "☆☆☆☆☆";
  }

  if (rating >= 9) {
    return "★★★★★";
  }

  if (rating >= 8) {
    return "★★★★☆";
  }

  if (rating >= 7) {
    return "★★★☆☆";
  }

  if (rating >= 6) {
    return "★★☆☆☆";
  }

  return "★☆☆☆☆";
}

/* =====================================================
RATING COLOR
===================================================== */

function getRatingColor(rating) {
  if (!rating) {
    return "#64748b";
  }

  if (rating >= 8.5) {
    return "#22c55e";
  }

  if (rating >= 7) {
    return "#84cc16";
  }

  if (rating >= 6) {
    return "#facc15";
  }

  if (rating >= 5) {
    return "#f97316";
  }

  return "#ef4444";
}