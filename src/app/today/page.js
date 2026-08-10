"use client";

import DashboardHero from "@/components/Dashboard/DashboardHero";
import LiveNow from "@/components/Dashboard/LiveNow";
import TodayMatches from "@/components/Dashboard/TodayMatches";
import LatestResults from "@/components/Dashboard/LatestResults";

export default function TodayPage() {
  return (
    <main
      style={{
        maxWidth: 1400,
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      {/* Hero */}

      <DashboardHero />

      {/* Live Right Now */}

      <LiveNow />

      {/* Today's Fixtures */}

      <TodayMatches />

      {/* Latest Finished Today */}

      <LatestResults />
    </main>
  );
}