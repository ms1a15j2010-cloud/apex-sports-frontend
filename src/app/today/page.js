"use client";

import DashboardHero from "@/components/Dashboard/DashboardHero";
import LiveNow from "@/components/Dashboard/LiveNow";
import TodayMatches from "@/components/Dashboard/TodayMatches";
import LatestResults from "@/components/Dashboard/LatestResults";

export default function TodayPage() {
  return (
    <main className="mx-auto my-10 flex w-full max-w-[1400px] flex-col gap-[30px] px-5">
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