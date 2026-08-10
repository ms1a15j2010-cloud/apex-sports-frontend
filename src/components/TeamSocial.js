"use client";

import Image from "next/image";

export default function TeamSocial({ team }) {
  if (!team) return null;

  const website =
    team.website ||
    team.venue?.website ||
    null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 30,
        }}
      >
        🌐 Club Social & Contact
      </h2>

      {/* Club Identity */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "320px 1fr",
          gap: 30,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            textAlign: "center",
          }}
        >
          <Image
            src={team.logo || "/team.png"}
            alt={team.name}
            width={140}
            height={140}
            style={{
              objectFit: "contain",
            }}
          />

          <h2
            style={{
              color: "#fff",
              marginTop: 20,
            }}
          >
            {team.name}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: 10,
            }}
          >
            {team.country || "-"}
          </p>
        </div>

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
          }}
        >
          <h3
            style={{
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Club Information
          </h3>

          <InfoRow
            title="Country"
            value={team.country || "-"}
          />

          <InfoRow
            title="Founded"
            value={team.founded || "-"}
          />

          <InfoRow
            title="Code"
            value={team.code || "-"}
          />

          <InfoRow
            title="Stadium"
            value={team.venue?.name || "-"}
          />

          <InfoRow
            title="City"
            value={team.venue?.city || "-"}
          />

          <InfoRow
            title="Capacity"
            value={
              team.venue?.capacity
                ? team.venue.capacity.toLocaleString()
                : "-"
            }
          />
        </div>
      </div>

      {/* Social Buttons */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 22,
          }}
        >
          Official Links
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
          }}
        >
          <SocialButton
            icon="🌍"
            title="Website"
            url={website}
            color="#2563eb"
          />

          <SocialButton
            icon="📘"
            title="Facebook"
            color="#1877F2"
          />

          <SocialButton
            icon="📷"
            title="Instagram"
            color="#E1306C"
          />

          <SocialButton
            icon="🐦"
            title="Twitter / X"
            color="#0f172a"
          />

          <SocialButton
            icon="▶️"
            title="YouTube"
            color="#dc2626"
          />
        </div>
      </div>

      {/* About */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 18,
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
          <strong>{team.name}</strong> is a professional football
          club representing{" "}
          <strong>{team.country || "-"}</strong>.
          The club plays its home matches at{" "}
          <strong>{team.venue?.name || "-"}</strong>.
          Club profile, stadium details, squad information,
          fixtures, transfers, coach, trophies and statistics
          are automatically synchronized from the football data
          provider whenever new information becomes available.
        </p>
      </div>
    </section>
  );
}

function InfoRow({
  title,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
        }}
      >
        {title}
      </span>

      <strong
        style={{
          color: "#fff",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function SocialButton({
  icon,
  title,
  url,
  color,
}) {
  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        color: "#fff",
        background: color,
        padding: "14px 22px",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontWeight: 700,
        transition: ".25s",
      }}
    >
      <span
        style={{
          fontSize: 22,
        }}
      >
        {icon}
      </span>

      {title}
    </a>
  );
}