"use client";

export default function TeamAchievements({
  team,
}) {
  if (!team) return null;

  const trophies = Array.isArray(
    team.trophies
  )
    ? team.trophies
    : [];

  /* =================================================
     FOOTBALL-DATA.ORG CURRENT LIMITATION

     Keep the UI ready for future trophy data,
     but do not invent historical trophies.
  ================================================= */

  const available =
    trophies.length > 0;

  const championships =
    trophies.filter((trophy) =>
      String(
        trophy?.place || ""
      )
        .toLowerCase()
        .includes("winner")
    );

  const runnersUp =
    trophies.filter((trophy) =>
      String(
        trophy?.place || ""
      )
        .toLowerCase()
        .includes("runner")
    );

  const competitions = [
    ...new Set(
      trophies
        .map(
          (trophy) =>
            trophy?.league
        )
        .filter(Boolean)
    ),
  ];

  return (
    <section
      id="achievements"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🏆 Team Achievements
        </h2>

        <p className="mt-2 text-sm leading-[1.6] text-slate-400">
          Major trophies and
          championship history.
        </p>
      </div>

      {/* TROPHIES AVAILABLE */}

      {available ? (
        <>
          {/* SUMMARY */}

          <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
            <StatCard
              icon="🏆"
              title="Total Trophies"
              value={trophies.length}
              color="#facc15"
            />

            <StatCard
              icon="🥇"
              title="Championships"
              value={
                championships.length
              }
              color="#22c55e"
            />

            <StatCard
              icon="🥈"
              title="Runner-up"
              value={runnersUp.length}
              color="#3b82f6"
            />

            <StatCard
              icon="🌍"
              title="Competitions"
              value={competitions.length}
              color="#8b5cf6"
            />
          </div>

          {/* TROPHY LIST */}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {trophies.map(
              (trophy, index) => (
                <div
                  key={
                    trophy?.id ??
                    index
                  }
                  className="rounded-[18px] border border-[#293548] bg-gray-800 p-[22px]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-[30px]">
                      🏆
                    </span>

                    <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-extrabold text-yellow-400">
                      {trophy?.place ||
                        "Achievement"}
                    </span>
                  </div>

                  <h3 className="mb-2.5 text-[20px] text-white">
                    {trophy?.league ||
                      "Competition"}
                  </h3>

                  <div className="text-[13px] text-slate-400">
                    Season
                  </div>

                  <div className="mt-[5px] text-[18px] font-extrabold text-white">
                    {trophy?.season ||
                      "-"}
                  </div>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        /* UNAVAILABLE STATE */

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-10 text-center">
          <div className="mb-[18px] text-[58px]">
            🏆
          </div>

          <h3 className="mb-2.5 text-[21px] text-white">
            Trophy History Unavailable
          </h3>

          <p className="mx-auto m-0 max-w-[600px] leading-[1.8] text-slate-400">
            Historical team trophy data
            is not provided by the current
            football-data.org source.
            This section is intentionally
            left empty rather than displaying
            unverified trophy information.
          </p>

          <div className="mt-[18px] inline-block rounded-full bg-slate-900 px-[14px] py-2 text-xs font-bold text-slate-500">
            Source: football-data.org
          </div>
        </div>
      )}

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
STAT CARD
===================================================== */

function StatCard({
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
        className="text-[28px] font-black"
        style={{
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}