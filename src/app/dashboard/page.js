"use client";

import DashboardHero from "@/components/Dashboard/DashboardHero";
import FeaturedMatch from "@/components/Dashboard/FeaturedMatch";
import LiveNow from "@/components/Dashboard/LiveNow";
import TodayMatches from "@/components/Dashboard/TodayMatches";
import TopLeagues from "@/components/Dashboard/TopLeagues";
import TrendingTeams from "@/components/Dashboard/TrendingTeams";
import LatestResults from "@/components/Dashboard/LatestResults";
import TopScorersMini from "@/components/Dashboard/TopScorersMini";
import StandingsMini from "@/components/Dashboard/StandingsMini";
import QuickActions from "@/components/Dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <main
      style={{
        maxWidth: 1400,
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <DashboardHero />

      <FeaturedMatch />

      <LiveNow />

      <TodayMatches />

      <TopLeagues />

      <TrendingTeams />

      <LatestResults />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: 25,
        }}
      >
        <TopScorersMini />

        <StandingsMini />
      </div>

      <QuickActions />
    </main>
  );
}