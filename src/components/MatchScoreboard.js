"use client";

export default function MatchScoreboard({
  match,
  statistics = [],
}) {
  if (!match) return null;

  const home = match.teams?.home || {};
  const away = match.teams?.away || {};
  const goals = match.goals || {};

  const homeStats = statistics[0] || {};
  const awayStats = statistics[1] || {};

  function statValue(team, type) {
    const stat = team.statistics?.find(
      (s) => s.type === type
    );

    return stat?.value ?? 0;
  }

  const possessionHome =
    statValue(
      homeStats,
      "Ball Possession"
    ) || 0;

  const possessionAway =
    statValue(
      awayStats,
      "Ball Possession"
    ) || 0;

  const shotsHome =
    statValue(
      homeStats,
      "Total Shots"
    );

  const shotsAway =
    statValue(
      awayStats,
      "Total Shots"
    );

  const shotsTargetHome =
    statValue(
      homeStats,
      "Shots on Goal"
    );

  const shotsTargetAway =
    statValue(
      awayStats,
      "Shots on Goal"
    );

  const cornersHome =
    statValue(
      homeStats,
      "Corner Kicks"
    );

  const cornersAway =
    statValue(
      awayStats,
      "Corner Kicks"
    );

  const foulsHome =
    statValue(
      homeStats,
      "Fouls"
    );

  const foulsAway =
    statValue(
      awayStats,
      "Fouls"
    );

  const yellowHome =
    statValue(
      homeStats,
      "Yellow Cards"
    );

  const yellowAway =
    statValue(
      awayStats,
      "Yellow Cards"
    );

  const redHome =
    statValue(
      homeStats,
      "Red Cards"
    );

  const redAway =
    statValue(
      awayStats,
      "Red Cards"
    );

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
      <h2 className="mb-[30px] text-white">
        📊 Match Scoreboard
      </h2>

      {/* SCORE */}

      <div className="mb-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="text-center">
          <h3 className="text-white">
            {home.name}
          </h3>
        </div>

        <div className="text-[50px] font-bold text-white">
          {goals.home ?? 0}
          {" : "}
          {goals.away ?? 0}
        </div>

        <div className="text-center">
          <h3 className="text-white">
            {away.name}
          </h3>
        </div>
      </div>

      {/* POSSESSION */}

      <StatBar
        title="Ball Possession"
        left={possessionHome}
        right={possessionAway}
        leftLabel="%"
        rightLabel="%"
        leftColor="#22c55e"
        rightColor="#ef4444"
      />

      <StatRow
        title="Shots"
        left={shotsHome}
        right={shotsAway}
      />

      <StatRow
        title="Shots on Target"
        left={shotsTargetHome}
        right={shotsTargetAway}
      />

      <StatRow
        title="Corner Kicks"
        left={cornersHome}
        right={cornersAway}
      />

      <StatRow
        title="Fouls"
        left={foulsHome}
        right={foulsAway}
      />

      <StatRow
        title="Yellow Cards"
        left={yellowHome}
        right={yellowAway}
      />

      <StatRow
        title="Red Cards"
        left={redHome}
        right={redAway}
      />
    </section>
  );
}

function StatRow({
  title,
  left,
  right,
}) {
  return (
    <div className="mb-[18px] grid grid-cols-[70px_1fr_70px] items-center gap-[15px]">
      <div className="text-center font-bold text-green-500">
        {left}
      </div>

      <div className="rounded-xl bg-gray-800 p-[14px] text-center font-semibold text-white">
        {title}
      </div>

      <div className="text-center font-bold text-red-500">
        {right}
      </div>
    </div>
  );
}

function StatBar({
  title,
  left,
  right,
  leftColor,
  rightColor,
  leftLabel,
  rightLabel,
}) {
  return (
    <div className="mb-[35px]">
      <div className="mb-2.5 flex justify-between text-white">
        <span>
          {left}
          {leftLabel}
        </span>

        <strong>{title}</strong>

        <span>
          {right}
          {rightLabel}
        </span>
      </div>

      <div className="flex h-4 overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full"
          style={{
            width: `${left}%`,
            background: leftColor,
          }}
        />

        <div
          className="h-full"
          style={{
            width: `${right}%`,
            background: rightColor,
          }}
        />
      </div>
    </div>
  );
}