"use client";

export default function TeamTrophies({
  trophies = [],
  available = false,
}) {
  const hasTrophies =
    available &&
    Array.isArray(trophies) &&
    trophies.length > 0;

  return (
    <section
      id="trophies"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🏆 Club Honours
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Historical trophy and honours information.
        </p>
      </div>

      {/* AVAILABLE TROPHIES */}

      {hasTrophies ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
          {trophies.map(
            (trophy, index) => (
              <article
                key={
                  trophy?.id ??
                  index
                }
                className="rounded-[18px] border border-[#293548] bg-gray-800 p-[22px]"
              >
                {/* Trophy icon */}

                <div className="mb-[18px] flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-[32px]">
                  🏆
                </div>

                <h3 className="mb-2 text-[20px] text-white">
                  {trophy?.league ||
                    "Competition"}
                </h3>

                {trophy?.country && (
                  <div className="mb-4 text-[13px] text-slate-400">
                    {trophy.country}
                  </div>
                )}

                <Info
                  label="🏅 Result"
                  value={
                    trophy?.place ||
                    "-"
                  }
                />

                <Info
                  label="📅 Season"
                  value={
                    trophy?.season ||
                    "-"
                  }
                />
              </article>
            )
          )}
        </div>
      ) : (
        /* UNAVAILABLE */

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-10 text-center">
          <div className="mb-4 text-[58px]">
            🏆
          </div>

          <h3 className="mb-2.5 text-[21px] text-white">
            Trophy History Unavailable
          </h3>

          <p className="mx-auto m-0 max-w-[650px] text-sm leading-[1.8] text-slate-400">
            Historical club trophy data is
            not provided by the current
            football-data.org source.
            This section is intentionally
            left empty rather than displaying
            unverified honours.
          </p>

          <div className="mt-4 inline-block rounded-full bg-gray-900 px-3 py-[7px] text-[11px] font-bold text-slate-500">
            Source limitation
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
INFO
===================================================== */

function Info({
  label,
  value,
}) {
  return (
    <div className="mt-2.5 rounded-xl border border-[#293548] bg-gray-900 p-[14px]">
      <div className="mb-1.5 text-xs text-slate-400">
        {label}
      </div>

      <div className="text-base font-extrabold text-white">
        {value || "-"}
      </div>
    </div>
  );
}