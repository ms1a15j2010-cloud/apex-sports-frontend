"use client";

export default function MatchPrediction({
  prediction = {},
}) {
  if (!prediction) {
    return (
      <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
        <h2 className="mb-5 text-white">
          🔮 Match Prediction
        </h2>

        <p className="text-slate-400">
          Prediction data unavailable.
        </p>
      </section>
    );
  }

  const {
    home = {},
    away = {},
    winner = null,
    advice = "",
  } = prediction;

  const homePercent =
    home.percent || 50;

  const awayPercent =
    away.percent || 50;

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-[30px]">
      <h2 className="mb-[30px] text-white">
        🔮 Match Prediction
      </h2>

      {/* Win Probability */}

      <div className="mb-[25px] rounded-[18px] bg-gray-800 p-[25px]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
          <TeamPrediction
            team={home}
            percent={homePercent}
          />

          <div className="text-[24px] font-bold text-slate-400">
            VS
          </div>

          <TeamPrediction
            team={away}
            percent={awayPercent}
          />
        </div>

        {/* Progress Bar */}

        <div className="mt-[30px] flex h-[18px] overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${homePercent}%`,
            }}
          />

          <div
            className="h-full bg-red-500"
            style={{
              width: `${awayPercent}%`,
            }}
          />
        </div>
      </div>

      {/* Winner */}

      {winner && (
        <div className="mb-[25px] rounded-2xl bg-gray-800 p-5 text-center">
          <h3 className="mb-2.5 text-green-500">
            Expected Winner
          </h3>

          <p className="text-[22px] font-bold text-white">
            {winner}
          </p>
        </div>
      )}

      {/* AI Advice */}

      <div className="rounded-2xl bg-gray-800 p-[22px]">
        <h3 className="mb-3 text-white">
          🤖 Analysis
        </h3>

        <p className="m-0 leading-[1.8] text-slate-300">
          {advice ||
            "Prediction is generated using team form, statistics and previous performance."}
        </p>
      </div>
    </section>
  );
}

/* ===================================== */

function TeamPrediction({
  team,
  percent,
}) {
  return (
    <div className="text-center">
      <h3 className="mb-3 text-white">
        {team.name || "Team"}
      </h3>

      <div className="text-[42px] font-bold text-green-500">
        {percent}%
      </div>

      <p className="mt-2 text-slate-400">
        Win Chance
      </p>
    </div>
  );
}