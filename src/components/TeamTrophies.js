"use client";

import Image from "next/image";

export default function TeamTrophies({ trophies = [] }) {
  if (!trophies || trophies.length === 0) return null;

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
          marginBottom: 25,
        }}
      >
        🏆 Club Honours
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
        }}
      >
        {trophies.map((trophy, index) => (
          <div
            key={index}
            style={{
              background: "#1f2937",
              borderRadius: 18,
              padding: 22,
              border: "1px solid #374151",
              transition: ".25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(0,0,0,.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
              e.currentTarget.style.boxShadow =
                "none";
            }}
          >
            {/* Trophy Header */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <Image
                src="/trophy.png"
                alt="Trophy"
                width={60}
                height={60}
              />

              <div>
                <h3
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: 20,
                  }}
                >
                  {trophy.league || "Competition"}
                </h3>

                <div
                  style={{
                    color: "#94a3b8",
                    marginTop: 6,
                  }}
                >
                  {trophy.country || ""}
                </div>
              </div>
            </div>

            {/* Trophy Info */}

            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              <Info
                label="🏅 Title"
                value={trophy.place || "-"}
              />

              <Info
                label="📅 Season"
                value={trophy.season || "-"}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {value}
      </div>
    </div>
  );
}