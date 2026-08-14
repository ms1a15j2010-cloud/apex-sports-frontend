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
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform:
              "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          🌐 Club Social & Contact
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Official club information and
          available contact links.
        </p>
      </div>

      {/* =================================================
          CLUB IDENTITY
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(260px,320px) 1fr",
          gap: 25,
          marginBottom: 30,
        }}
      >
        {/* LOGO */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            textAlign: "center",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              margin: "0 auto",
              borderRadius: "50%",
              background:
                "#111827",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
            }}
          >
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
                style={{
                  objectFit:
                    "contain",
                }}
              />
            ) : (
              <span
                style={{
                  color:
                    "#22c55e",
                  fontSize: 30,
                  fontWeight: 900,
                }}
              >
                {team.tla ||
                  "FC"}
              </span>
            )}
          </div>

          <h2
            style={{
              color: "#fff",
              margin:
                "18px 0 6px",
              fontSize: 23,
            }}
          >
            {team.name ||
              "Unknown Team"}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: 14,
            }}
          >
            {country}
          </p>
        </div>

        {/* INFORMATION */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            border:
              "1px solid #293548",
          }}
        >
          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 20px",
            }}
          >
            Club Information
          </h3>

          <InfoRow
            title="Country"
            value={country}
          />

          <InfoRow
            title="Founded"
            value={
              team.founded ||
              "-"
            }
          />

          <InfoRow
            title="Team Code"
            value={code}
          />

          <InfoRow
            title="Stadium"
            value={
              venue.name ||
              "-"
            }
          />

          <InfoRow
            title="City"
            value={
              venue.city ||
              "-"
            }
          />

          <InfoRow
            title="Address"
            value={
              venue.address ||
              "-"
            }
          />

          <InfoRow
            title="Club Colors"
            value={
              team.clubColors ||
              "-"
            }
          />
        </div>
      </div>

      {/* =================================================
          OFFICIAL LINKS
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 20px",
          }}
        >
          Official Links
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
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
          <p
            style={{
              color: "#64748b",
              margin:
                "18px 0 0",
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            The current football-data.org
            team resource does not provide
            the club's social-media URLs or
            official website for this team.
          </p>
        )}
      </div>

      {/* =================================================
          CONTACT
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 18px",
          }}
        >
          📍 Club Contact
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: 16,
          }}
        >
          <ContactCard
            title="Country"
            value={country}
          />

          <ContactCard
            title="City"
            value={
              venue.city ||
              "-"
            }
          />

          <ContactCard
            title="Address"
            value={
              venue.address ||
              "-"
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

      {/* =================================================
          ABOUT
      ================================================= */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          border:
            "1px solid #293548",
        }}
      >
        <h3
          style={{
            color: "#fff",
            margin:
              "0 0 18px",
          }}
        >
          About This Club
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
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

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
          fontSize: 12,
        }}
      >
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
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "flex-start",
        gap: 20,
        padding:
          "12px 0",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
      }}
    >
      <span
        style={{
          color:
            "#94a3b8",
          fontSize: 13,
          flexShrink: 0,
        }}
      >
        {title}
      </span>

      <strong
        style={{
          color: "#fff",
          fontSize: 14,
          textAlign: "right",
          overflowWrap:
            "anywhere",
        }}
      >
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
      style={{
        textDecoration:
          "none",
        color: "#fff",
        background: color,
        padding:
          "13px 18px",
        borderRadius: 14,
        display: "flex",
        alignItems:
          "center",
        gap: 10,
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      <span
        style={{
          fontSize: 20,
        }}
      >
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
      style={{
        color: "#64748b",
        background:
          "#111827",
        border:
          "1px solid #293548",
        padding:
          "13px 18px",
        borderRadius: 14,
        display: "flex",
        alignItems:
          "center",
        gap: 10,
        fontWeight: 700,
        fontSize: 14,
        opacity: 0.75,
        cursor: "default",
      }}
    >
      <span
        style={{
          fontSize: 20,
        }}
      >
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
    <div
      style={{
        background:
          "#111827",
        borderRadius: 14,
        padding: 18,
        border:
          "1px solid #293548",
      }}
    >
      <div
        style={{
          color:
            "#94a3b8",
          fontSize: 12,
          marginBottom: 7,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          overflowWrap:
            "anywhere",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}