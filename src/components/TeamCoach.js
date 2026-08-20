"use client";

export default function TeamCoach({ coach }) {
  if (!coach) {
    return (
      <section className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="mb-5 text-white">
          👔 Head Coach
        </h2>

        <p className="m-0 text-slate-400">
          Coach information unavailable.
        </p>
      </section>
    );
  }

  const coachName =
    coach.name ||
    [coach.firstName, coach.lastName]
      .filter(Boolean)
      .join(" ") ||
    "Unknown Coach";

  const firstName =
    coach.firstName || "-";

  const lastName =
    coach.lastName || "-";

  const nationality =
    coach.nationality || "-";

  const birthDate =
    coach.dateOfBirth || "-";

  return (
    <section
      id="coach"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          👔 Head Coach
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Current coaching information
          provided by football-data.org.
        </p>
      </div>

      {/* COACH CONTENT */}

      <div className="grid grid-cols-1 items-stretch gap-[30px] xl:grid-cols-[minmax(260px,320px)_1fr]">
        {/* LEFT PROFILE */}

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-[25px] text-center">
          <div className="mx-auto flex h-[150px] w-[150px] items-center justify-center rounded-full border-[3px] border-green-500 bg-gradient-to-br from-gray-900 to-slate-800 text-[48px] font-black text-green-500">
            {coachName
              .slice(0, 1)
              .toUpperCase()}
          </div>

          <h2 className="my-5 mb-1.5 text-[24px] text-white">
            {coachName}
          </h2>

          <p className="m-0 text-sm text-slate-400">
            Head Coach
          </p>
        </div>

        {/* RIGHT INFORMATION */}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
          <InfoCard
            title="Coach ID"
            value={coach.id ?? "-"}
          />

          <InfoCard
            title="First Name"
            value={firstName}
          />

          <InfoCard
            title="Last Name"
            value={lastName}
          />

          <InfoCard
            title="Nationality"
            value={nationality}
          />

          <InfoCard
            title="Date of Birth"
            value={birthDate}
          />
        </div>
      </div>

      {/* PROFILE SUMMARY */}

      <div className="mt-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-[15px] text-white">
          Coach Profile
        </h3>

        <p className="m-0 leading-[1.85] text-slate-300">
          <strong>{coachName}</strong>{" "}
          is the current head coach
          associated with this football
          club.
          {nationality !== "-" &&
            ` The coach is from ${nationality}.`}
          {birthDate !== "-" &&
            ` The recorded date of birth is ${birthDate}.`}
        </p>
      </div>

      {/* DATA SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
INFO CARD
===================================================== */

function InfoCard({
  title,
  value,
}) {
  return (
    <div className="rounded-[14px] border border-[#293548] bg-gray-800 p-5">
      <div className="mb-2 text-[13px] text-slate-400">
        {title}
      </div>

      <div className="break-words text-[18px] font-extrabold text-white [overflow-wrap:anywhere]">
        {value ?? "-"}
      </div>
    </div>
  );
}