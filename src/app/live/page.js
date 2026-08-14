import LiveClient from "./LiveClient";

/* =====================================================
SEO
===================================================== */

export const metadata = {
  title: "Live Football | Apex Sports",

  description:
    "Live football matches and scores from Apex Sports.",
};

/* =====================================================
LIVE PAGE

IMPORTANT:

This page intentionally does NOT fetch /api/live.

Live data is loaded client-side by:

LiveClient.jsx
    ↓
/api/live
    ↓
footballDataApi.js
    ↓
football-data.org

This prevents Next.js from trying to execute the
live API request during production build/prerendering.
===================================================== */

export default function LivePage() {
  return <LiveClient initialMatches={[]} />;
}