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
    <main className="mx-auto my-10 flex w-full max-w-[1400px] flex-col gap-[30px] px-5">
      <DashboardHero />

      <FeaturedMatch />

      <LiveNow />

      <TodayMatches />

      <TopLeagues />

      <TrendingTeams />

      <LatestResults />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[25px]">
        <TopScorersMini />

        <StandingsMini />
      </div>

      <QuickActions />
    </main>
  );
}