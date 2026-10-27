import LeaguePointsCalculator from "./LeaguePointsCalculator";

export const metadata = {
  title: "Football Points & Goal Difference Calculator | Apex Sports",
  description:
    "Calculate football league points, matches played and goal difference from wins, draws, losses, goals scored and goals conceded.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/tools/league-points-calculator",
  },
};

export default function LeaguePointsCalculatorPage() {
  return <LeaguePointsCalculator />;
}
