"use client";

export default function TeamVenue({
  venue,
}) {
  if (!venue) return null;

  return (
    <section
      id="venue"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🏟 Stadium Information
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Official venue information available
          from football-data.org.
        </p>
      </div>

      {/* VENUE LAYOUT */}

      <div className="grid grid-cols-1 items-stretch gap-[25px] xl:grid-cols-2">
        {/* VISUAL PANEL */}

        <div className="flex min-h-[280px] items-center justify-center rounded-[18px] border border-[#293548] bg-gradient-to-br from-gray-800 to-gray-900 p-[30px] text-center">
          <div>
            <div className="mb-[15px] text-[64px]">
              🏟️
            </div>

            <h3 className="m-0 text-[24px] text-white">
              {venue.name ||
                "Stadium"}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {venue.city ||
                "City unavailable"}
            </p>
          </div>
        </div>

        {/* DETAILS */}

        <div>
          <StatRow
            title="Stadium Name"
            value={
              venue.name || "-"
            }
          />

          <StatRow
            title="City"
            value={
              venue.city || "-"
            }
          />

          <StatRow
            title="Address"
            value={
              venue.address || "-"
            }
          />

          <StatRow
            title="Capacity"
            value={
              venue.capacity
                ? Number(
                    venue.capacity
                  ).toLocaleString()
                : "Not provided"
            }
          />

          <StatRow
            title="Surface"
            value={
              venue.surface ||
              "Not provided"
            }
          />
        </div>
      </div>

      {/* SOURCE NOTE */}

      <div className="mt-5 border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
STAT ROW
===================================================== */

function StatRow({
  title,
  value,
}) {
  return (
    <div className="mb-[14px] rounded-xl border border-[#293548] bg-gray-800 p-[18px]">
      <div className="mb-1.5 text-[13px] text-slate-400">
        {title}
      </div>

      <div className="break-words text-[18px] font-bold text-white [overflow-wrap:anywhere]">
        {value || "-"}
      </div>
    </div>
  );
}