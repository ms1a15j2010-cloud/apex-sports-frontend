"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export const metadata = {
  title: "Football Points & Goal Difference Calculator | Apex Sports",
  description:
    "Calculate football league points, matches played and goal difference from wins, draws, losses, goals scored and goals conceded.",
};

export default function LeaguePointsCalculatorPage() {
  const [wins, setWins] = useState("10");
  const [draws, setDraws] = useState("4");
  const [losses, setLosses] = useState("3");
  const [goalsFor, setGoalsFor] = useState("31");
  const [goalsAgainst, setGoalsAgainst] = useState("18");

  const values = useMemo(() => {
    const parsed = [wins, draws, losses, goalsFor, goalsAgainst].map((v) =>
      v === "" ? 0 : Number(v)
    );
    const valid = parsed.every((v) => Number.isInteger(v) && v >= 0 && v <= 999);
    if (!valid) return { valid: false };
    const [w, d, l, gf, ga] = parsed;
    return {
      valid: true,
      played: w + d + l,
      points: w * 3 + d,
      goalDifference: gf - ga,
      wins: w,
      draws: d,
      losses: l,
      goalsFor: gf,
      goalsAgainst: ga,
    };
  }, [wins, draws, losses, goalsFor, goalsAgainst]);

  const fields = [
    { label: "Wins", value: wins, set: setWins },
    { label: "Draws", value: draws, set: setDraws },
    { label: "Losses", value: losses, set: setLosses },
    { label: "Goals scored", value: goalsFor, set: setGoalsFor },
    { label: "Goals conceded", value: goalsAgainst, set: setGoalsAgainst },
  ];

  return (
    <main className="mx-auto max-w-[1000px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">Football tool</p>
        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Football Points &amp; Goal Difference Calculator
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Enter a team's wins, draws, losses, goals scored and goals conceded to calculate
          its basic league totals. The calculator uses the common three-points-for-a-win
          system; competition-specific deductions and tie-break rules are not included.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-5 text-xl font-bold">Team record</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.label} className="block text-sm font-semibold text-slate-300">
                {field.label}
                <input
                  type="number"
                  min="0"
                  max="999"
                  step="1"
                  inputMode="numeric"
                  value={field.value}
                  onChange={(event) => field.set(event.target.value)}
                  className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-base text-white outline-none focus:border-green-500"
                />
              </label>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Use whole numbers from 0 to 999. This is a calculator, not a live league table.
          </p>
          {!values.valid && (
            <p role="alert" className="mt-3 text-sm font-semibold text-red-400">
              Enter a whole number between 0 and 999 in every field.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-green-900/70 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-5 text-xl font-bold">Calculated totals</h2>
          {values.valid ? (
            <dl className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <dt className="text-slate-400">Matches played</dt>
                <dd className="text-2xl font-extrabold tabular-nums">{values.played}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <dt className="text-slate-400">League points</dt>
                <dd className="text-3xl font-extrabold text-green-400 tabular-nums">{values.points}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <dt className="text-slate-400">Goal difference</dt>
                <dd className={`text-2xl font-extrabold tabular-nums ${values.goalDifference > 0 ? "text-green-400" : values.goalDifference < 0 ? "text-red-400" : "text-white"}`}>
                  {values.goalDifference > 0 ? "+" : ""}{values.goalDifference}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-400">Record (W-D-L)</dt>
                <dd className="font-bold tabular-nums">{values.wins}-{values.draws}-{values.losses}</dd>
              </div>
            </dl>
          ) : (
            <p className="leading-7 text-slate-400">Your totals will appear when all fields contain valid whole numbers.</p>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <h2 className="mb-3 text-2xl font-extrabold">How the calculation works</h2>
        <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-300">
          <li><strong className="text-white">Points:</strong> wins × 3 + draws × 1. Losses earn no points.</li>
          <li><strong className="text-white">Matches played:</strong> wins + draws + losses.</li>
          <li><strong className="text-white">Goal difference:</strong> goals scored − goals conceded.</li>
        </ul>
        <p className="mt-4 leading-7 text-slate-300">
          For example, 10 wins, 4 draws and 3 losses produce 34 points from 17 matches.
          If that team scored 31 goals and conceded 18, its goal difference would be +13.
          A real competition may apply deductions or additional ranking rules, so always
          use the competition's official table for a team's confirmed position.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/articles/how-football-points-work" className="font-semibold text-green-500 hover:text-green-400">How football points work →</Link>
          <Link href="/articles/how-football-goal-difference-works" className="font-semibold text-green-500 hover:text-green-400">How goal difference works →</Link>
          <Link href="/standings/epl" className="font-semibold text-green-500 hover:text-green-400">View Premier League standings →</Link>
        </div>
      </section>
    </main>
  );
}
