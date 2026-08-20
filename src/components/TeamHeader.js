"use client";

import Image from "next/image";

export default function TeamHeader({ team }) {
  if (!team) return null;

  const coach = team.coach || {};
  const venue = team.venue || {};
  const area = team.area || {};

  const teamLogo =
    team.logo ||
    team.crest ||
    null;

  const coachName =
    coach.name ||
    [coach.firstName, coach.lastName]
      .filter(Boolean)
      .join(" ");

  return (
    <section className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      {/* =================================================
          TEAM HEADER
      ================================================= */}

      <div className="flex flex-wrap items-center gap-[30px]">
        {/* TEAM LOGO */}

        <div className="flex h-[140px] w-[140px] shrink-0 items-center justify-center rounded-full border border-[#293548] bg-gray-800">
          {teamLogo ? (
            <Image
              src={teamLogo}
              alt={team.name || "Team"}
              width={110}
              height={110}
              priority
              unoptimized
              className="object-contain"
            />
          ) : (
            <div className="text-[32px] font-black text-green-500">
              {team.tla ||
                team.name
                  ?.slice(0, 3)
                  ?.toUpperCase() ||
                "FC"}
            </div>
          )}
        </div>

        {/* TEAM INFORMATION */}

        <div className="min-w-[260px] flex-1">
          <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
            ⚽ Apex Sports
          </div>

          <h1 className="m-0 mb-2.5 text-[40px] font-extrabold text-white">
            {team.name ||
              "Unknown Team"}
          </h1>

          <div className="mb-4 text-sm text-slate-400">
            {area.name ||
              team.country ||
              "England"}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 text-slate-300">
            <Info
              label="Country"
              value={
                area.name ||
                team.country ||
                "-"
              }
            />

            <Info
              label="Founded"
              value={
                team.founded || "-"
              }
            />

            <Info
              label="Code"
              value={
                team.tla ||
                team.shortName ||
                "-"
              }
            />

            <Info
              label="Colors"
              value={
                team.clubColors || "-"
              }
            />
          </div>
        </div>

        {/* COACH */}

        <div className="min-w-[260px] max-w-[340px] rounded-2xl border border-[#293548] bg-gray-800 p-5">
          <h3 className="mb-4 text-white">
            👔 Head Coach
          </h3>

          {coachName ? (
            <div className="flex items-center gap-[15px]">
              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-gray-900 text-[22px] font-extrabold text-green-500">
                {coachName
                  .slice(0, 1)
                  .toUpperCase()}
              </div>

              <div>
                <div className="text-[18px] font-bold text-white">
                  {coachName}
                </div>

                <div className="mt-[5px] text-slate-400">
                  {coach.nationality ||
                    "-"}
                </div>

                {coach.dateOfBirth && (
                  <div className="mt-[5px] text-xs text-slate-500">
                    Born{" "}
                    {coach.dateOfBirth}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="m-0 text-slate-400">
              Coach information unavailable.
            </p>
          )}
        </div>
      </div>

      {/* =================================================
          STADIUM
      ================================================= */}

      <div className="mt-[35px] grid grid-cols-1 gap-[25px] xl:grid-cols-[minmax(320px,1fr)_minmax(280px,360px)]">
        {/* STADIUM IMAGE */}

        <div className="relative h-[280px] w-full overflow-hidden rounded-[18px] border border-[#293548] bg-gray-800">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-lg font-bold text-slate-500">
            🏟 {venue.name || "Stadium"}
          </div>
        </div>

        {/* STADIUM DETAILS */}

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
          <h2 className="mb-[18px] text-white">
            🏟 Stadium
          </h2>

          <Info
            label="Name"
            value={
              venue.name || "-"
            }
          />

          <Info
            label="City"
            value={
              venue.city || "-"
            }
          />

          <Info
            label="Address"
            value={
              venue.address || "-"
            }
          />

          <Info
            label="Capacity"
            value={
              venue.capacity
                ? Number(
                    venue.capacity
                  ).toLocaleString()
                : "-"
            }
          />
        </div>
      </div>
    </section>
  );
}

/* =====================================================
INFO
===================================================== */

function Info({ label, value }) {
  return (
    <div className="mb-3">
      <div className="mb-[3px] text-[13px] text-slate-400">
        {label}
      </div>

      <div className="break-words text-base font-semibold text-white [overflow-wrap:anywhere]">
        {value || "-"}
      </div>
    </div>
  );
}