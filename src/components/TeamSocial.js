"use client";

import Image from "next/image";

export default function TeamSocial({
  team,
}) {
  if (!team) return null;

  const area =
    team.area || {};

  const venue =
    team.venue || {};

  const website =
    team.website || null;

  const teamLogo =
    team.logo ||
    team.crest ||
    null;

  const country =
    area.name ||
    team.country ||
    "-";

  const code =
    team.tla ||
    team.shortName ||
    "-";

  return (
    <section
      id="social"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[30px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🌐 Club Social & Contact
        </h2>

        <p className="mt-2 text-sm leading-[1.6] text-slate-400">
          Official club information and
          available contact links.
        </p>
      </div>

      {/* CLUB IDENTITY */}

      <div className="mb-[30px] grid grid-cols-1 gap-[25px] xl:grid-cols-[minmax(260px,320px)_1fr]">
        {/* LOGO */}

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-[25px] text-center">
          <div className="mx-auto flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-900">
            {teamLogo ? (
              <Image
                src={teamLogo}
                alt={
                  team.name ||
                  "Team"
                }
                width={120}
                height={120}
                unoptimized
                className="object-contain"
              />
            ) : (
              <span className="text-[30px] font-black text-green-500">
                {team.tla || "FC"}
              </span>
            )}
          </div>

          <h2 className="my-[18px] mb-1.5 text-[23px] text-white">
            {team.name ||
              "Unknown Team"}
          </h2>

          <p className="m-0 text-sm text-slate-400">
            {country}
          </p>
        </div>

        {/* INFORMATION */}

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
          <h3 className="mb-5 text-white">
            Club Information
          </h3>

          <InfoRow
            title="Country"
            value={country}
          />

          <InfoRow
            title="Founded"
            value={
              team.founded || "-"
            }
          />

          <InfoRow
            title="Team Code"
            value={code}
          />

          <InfoRow
            title="Stadium"
            value={
              venue.name || "-"
            }
          />

          <InfoRow
            title="City"
            value={
              venue.city || "-"
            }
          />

          <InfoRow
            title="Address"
            value={
              venue.address || "-"
            }
          />

          <InfoRow
            title="Club Colors"
            value={
              team.clubColors || "-"
            }
          />
        </div>
      </div>

      {/* OFFICIAL LINKS */}

      <div className="mb-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-5 text-white">
          Official Links
        </h3>

        <div className="flex flex-wrap gap-[14px]">
          <SocialButton
            icon="🌍"
            title="Official Website"
            url={website}
            color="#2563eb"
            available={Boolean(
              website
            )}
          />

          <UnavailableButton
            icon="📘"
            title="Facebook"
          />

          <UnavailableButton
            icon="📷"
            title="Instagram"
          />

          <UnavailableButton
            icon="𝕏"
            title="Twitter / X"
          />

          <UnavailableButton
            icon="▶️"
            title="YouTube"
          />
        </div>

        {!website && (
          <p className="mt-[18px] text-xs leading-[1.6] text-slate-500">
            The current football-data.org
            team resource does not provide
            the club's social-media URLs or
            official website for this team.
          </p>
        )}
      </div>

      {/* CONTACT */}

      <div className="mb-[30px] rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-[18px] text-white">
          📍 Club Contact
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          <ContactCard
            title="Country"
            value={country}
          />

          <ContactCard
            title="City"
            value={
              venue.city || "-"
            }
          />

          <ContactCard
            title="Address"
            value={
              venue.address || "-"
            }
          />

          <ContactCard
            title="Website"
            value={
              website ||
              "Not available"
            }
          />
        </div>
      </div>

      {/* ABOUT */}

      <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-[25px]">
        <h3 className="mb-[18px] text-white">
          About This Club
        </h3>

        <p className="m-0 leading-[1.9] text-slate-300">
          <strong>
            {team.name ||
              "This club"}
          </strong>{" "}
          is a professional football club
          representing{" "}
          <strong>{country}</strong>.
          {team.founded
            ? ` The club was founded in ${team.founded}.`
            : ""}
          {venue.name
            ? ` Its home venue is ${venue.name}.`
            : ""}
          {venue.city
            ? ` The stadium is located in ${venue.city}.`
            : ""}
        </p>
      </div>

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
INFO ROW
===================================================== */

function InfoRow({
  title,
  value,
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-white/[0.08] py-3">
      <span className="shrink-0 text-[13px] text-slate-400">
        {title}
      </span>

      <strong className="break-words text-right text-sm text-white [overflow-wrap:anywhere]">
        {value || "-"}
      </strong>
    </div>
  );
}

/* =====================================================
WEBSITE BUTTON
===================================================== */

function SocialButton({
  icon,
  title,
  url,
  color,
  available,
}) {
  if (!available || !url) {
    return (
      <UnavailableButton
        icon={icon}
        title={title}
      />
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 rounded-[14px] px-[18px] py-[13px] text-sm font-bold text-white no-underline transition-opacity hover:opacity-90"
      style={{
        background: color,
      }}
    >
      <span className="text-[20px]">
        {icon}
      </span>

      {title}
    </a>
  );
}

/* =====================================================
UNAVAILABLE BUTTON
===================================================== */

function UnavailableButton({
  icon,
  title,
}) {
  return (
    <div
      title={`${title} link is not available from the current data source`}
      className="flex cursor-default items-center gap-2.5 rounded-[14px] border border-[#293548] bg-gray-900 px-[18px] py-[13px] text-sm font-bold text-slate-500 opacity-75"
    >
      <span className="text-[20px]">
        {icon}
      </span>

      {title}
    </div>
  );
}

/* =====================================================
CONTACT CARD
===================================================== */

function ContactCard({
  title,
  value,
}) {
  return (
    <div className="rounded-[14px] border border-[#293548] bg-gray-900 p-[18px]">
      <div className="mb-[7px] text-xs text-slate-400">
        {title}
      </div>

      <div className="break-words text-sm font-bold text-white [overflow-wrap:anywhere]">
        {value || "-"}
      </div>
    </div>
  );
}