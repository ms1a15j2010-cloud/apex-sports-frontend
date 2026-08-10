"use client";

import Image from "next/image";

export default function TeamVenue({ venue }) {
  if (!venue) return null;

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
          marginBottom: 25,
          color: "#fff",
        }}
      >
        🏟 Stadium Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 30,
          alignItems: "center",
        }}
      >
        {/* Stadium Image */}

        <div>
          <Image
            src={venue.image || "/stadium.png"}
            alt={venue.name || "Stadium"}
            width={700}
            height={420}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 18,
              objectFit: "cover",
            }}
          />
        </div>

        {/* Stadium Details */}

        <div>
          <StatRow
            title="Name"
            value={venue.name}
          />

          <StatRow
            title="City"
            value={venue.city}
          />

          <StatRow
            title="Address"
            value={venue.address}
          />

          <StatRow
            title="Capacity"
            value={
              venue.capacity
                ? venue.capacity.toLocaleString()
                : "-"
            }
          />

          <StatRow
            title="Surface"
            value={venue.surface}
          />
        </div>
      </div>
    </section>
  );
}

function StatRow({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding: 18,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          marginBottom: 6,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}