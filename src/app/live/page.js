import LiveClient from "./LiveClient";

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
    const res = await fetch(
      `${API}/api/live`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(
        "LivePage: API request failed",
        res.status
      );

      return [];
    }

    const data =
      await res.json();

    return Array.isArray(
      data?.matches
    )
      ? data.matches
      : [];

  } catch (err) {
    console.error(
      "LivePage:",
      err
    );

    return [];
  }
}

/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title:
    "Live Football | Apex Sports",

  description:
    "Live football scores and real-time match updates.",
};

/* =====================================================
   PAGE
===================================================== */

export default async function LivePage() {
  const matches =
    await getLiveMatches();

  return (
    <LiveClient
      initialMatches={matches}
    />
  );
}