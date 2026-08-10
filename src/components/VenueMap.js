"use client";

export default function VenueMap({ venue }) {
  if (!venue) return null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 25,
        color: "white",
        marginTop: 30,
      }}
    >
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        📍 Venue
      </h2>

      <div
        style={{
          display: "grid",
          gap: 10,
        }}
      >
        <div>
          <strong>Stadium:</strong>{" "}
          {venue.name || "Unknown"}
        </div>

        <div>
          <strong>City:</strong>{" "}
          {venue.city || "Unknown"}
        </div>
      </div>

      {venue.name && venue.city && (
        <div
          style={{
            marginTop: 20,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <iframe
            title="Venue Map"
            width="100%"
            height="350"
            loading="lazy"
            style={{
              border: 0,
            }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${venue.name}, ${venue.city}`
            )}&output=embed`}
            allowFullScreen
          />
        </div>
      )}
    </section>
  );
}