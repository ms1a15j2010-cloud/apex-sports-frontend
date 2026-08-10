export default function VenueMap({
  venue,
}) {
  if (!venue) return null;

  const query = encodeURIComponent(
    `${venue.name}, ${venue.city}`
  );

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 24,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          marginBottom: 22,
        }}
      >
        🏟 Match Venue
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "#1f2937",
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              marginBottom: 8,
            }}
          >
            Stadium
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {venue.name}
          </div>

          <div
            style={{
              marginTop: 10,
              color: "#cbd5e1",
            }}
          >
            📍 {venue.city}
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 20,
              background: "#22c55e",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Open in Google Maps
          </a>
        </div>

        <div
          style={{
            borderRadius: 14,
            overflow: "hidden",
            minHeight: 320,
          }}
        >
          <iframe
            title="Venue Map"
            width="100%"
            height="320"
            loading="lazy"
            style={{
              border: 0,
            }}
            src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
          />
        </div>
      </div>
    </section>
  );
}