// src/app/live/page.js

import LiveClient from "./LiveClient";

/* =====================================================
   FORCE DYNAMIC RENDERING
   ===================================================== */

export const dynamic = "force-dynamic";

/* =====================================================
   API
   ===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   LOAD LIVE MATCHES
   ===================================================== */

async function getLiveMatches() {
  try {
    const res = await fetch(`${API}/api/live`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "LivePage: API request failed",
        res.status
      );

      return [];
    }

    const data = await res.json();

    return Array.isArray(data?.matches)
      ? data.matches
      : [];
  } catch (err) {
    console.error("LivePage:", err);

    return [];
  }
}

/* =====================================================
   METADATA
   ===================================================== */

export const metadata = {
  title: "Live Football | Apex Sports",

  description:
    "Live football scores and real-time match updates from leagues around the world.",

  alternates: {
    canonical: "/live",
  },

  openGraph: {
    title: "Live Football | Apex Sports",

    description:
      "Live football scores and real-time match updates from leagues around the world.",

    url: "/live",

    siteName: "Apex Sports",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =====================================================
   PAGE
   ===================================================== */

export default async function LivePage() {
  const matches = await getLiveMatches();

  return (
    <LiveClient
      initialMatches={matches}
    />
  );
}