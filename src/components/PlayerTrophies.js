"use client";

export default function PlayerTrophies({
  trophies = [],
  available = false,
}) {
  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1e293b] bg-gradient-to-br from-[#111827] to-[#0f172a] p-[30px]">
      <div className="mb-[25px]">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          🏆 Player Trophies
        </h2>

        <p className="m-[8px_0_0] text-[14px] text-slate-400">
          Major trophies and titles won throughout the player's
          career.
        </p>
      </div>

      {!available ? (
        <div className="rounded-2xl border border-[#293548] bg-[#1f2937] p-[35px] text-center">
          <div className="mb-[15px] text-[42px]">
            🏆
          </div>

          <h3 className="m-[0_0_10px] text-[20px] text-white">
            Trophy History Unavailable
          </h3>

          <p className="m-0 text-[14px] leading-[1.7] text-slate-400">
            Player trophy history is not provided by the current
            football-data.org data source.
          </p>

          <div className="mt-[18px] inline-block rounded-full bg-[#0f172a] px-[14px] py-2 text-[12px] font-bold text-slate-500">
            Source: football-data.org
          </div>
        </div>
      ) : !Array.isArray(trophies) ||
        trophies.length === 0 ? (
        <div className="rounded-2xl bg-[#1f2937] p-[30px] text-center text-slate-400">
          No trophy history available.
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {trophies.map((trophy, index) => (
            <div
              key={trophy?.id || index}
              className="rounded-2xl border border-[#293548] bg-[#1f2937] p-5"
            >
              <div className="mb-3 text-[30px]">
                🏆
              </div>

              <h3 className="m-0 text-[17px] text-white">
                {trophy?.name || "Trophy"}
              </h3>

              {trophy?.season && (
                <div className="mt-2 text-[13px] font-bold text-green-500">
                  Season {trophy.season}
                </div>
              )}

              {trophy?.team && (
                <div className="mt-[6px] text-[13px] text-slate-400">
                  {typeof trophy.team === "string"
                    ? trophy.team
                    : trophy.team?.name || ""}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}