"use client";

export default function MatchPrediction({ prediction = null }) {
  const home = prediction?.home;
  const away = prediction?.away;
  const homePercent = toPercent(home?.percent);
  const awayPercent = toPercent(away?.percent);
  const hasProbabilities = homePercent !== null && awayPercent !== null;

  if (!prediction || (!hasProbabilities && !prediction.winner && !prediction.advice)) {
    return (
      <section className="mb-[30px] rounded-[20px] bg-gray-900 p-6 sm:p-[30px]">
        <h2 className="mb-3 text-xl font-bold text-white">Match Prediction</h2>
        <p className="text-slate-400">
          A verified prediction is not available for this match. Apex Sports does not estimate win probabilities without supporting data.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-[30px] rounded-[20px] bg-gray-900 p-6 sm:p-[30px]">
      <h2 className="mb-5 text-xl font-bold text-white">Match Prediction</h2>

      {hasProbabilities ? (
        <>
          <div className="grid grid-cols-1 items-center gap-4 rounded-[18px] bg-gray-800 p-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-5 sm:p-6">
            <TeamPrediction team={home} percent={homePercent} />
            <div className="text-center text-lg font-bold text-slate-400">VS</div>
            <TeamPrediction team={away} percent={awayPercent} />
          </div>
          <div
            className="mt-5 flex h-4 overflow-hidden rounded-full bg-gray-700"
            role="img"
            aria-label={`Home win probability ${homePercent} percent; away win probability ${awayPercent} percent`}
          >
            <div className="h-full bg-green-500" style={{ width: `${homePercent}%` }} />
            <div className="h-full bg-red-500" style={{ width: `${awayPercent}%` }} />
          </div>
        </>
      ) : (
        <p className="rounded-xl bg-gray-800 p-4 text-slate-300">
          Win probabilities are not available for this match.
        </p>
      )}

      {prediction.winner ? (
        <div className="mt-5 rounded-2xl bg-gray-800 p-5 text-center">
          <h3 className="mb-2 font-semibold text-green-500">Expected Winner</h3>
          <p className="text-xl font-bold text-white">{prediction.winner}</p>
        </div>
      ) : null}

      {prediction.advice ? (
        <div className="mt-5 rounded-2xl bg-gray-800 p-5">
          <h3 className="mb-3 font-semibold text-white">Analysis</h3>
          <p className="leading-7 text-slate-300">{prediction.advice}</p>
        </div>
      ) : null}
    </section>
  );
}

function toPercent(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(String(value).replace("%", "").trim());
  return Number.isFinite(number) && number >= 0 && number <= 100
    ? number
    : null;
}

function TeamPrediction({ team = {}, percent }) {
  return (
    <div className="text-center">
      <h3 className="mb-2 font-semibold text-white">{team?.name || "Team"}</h3>
      <div className="text-3xl font-bold text-green-500">{percent}%</div>
      <p className="mt-1 text-sm text-slate-400">Win chance</p>
    </div>
  );
}
