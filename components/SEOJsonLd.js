"use client";

export default function SEOJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Live Football Matches",
    sport: "Soccer",
    location: {
      "@type": "Place",
      name: "Worldwide",
    },
    organizer: {
      "@type": "Organization",
      name: "Apex Sports",
      url: "https://apex-sports.vercel.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
