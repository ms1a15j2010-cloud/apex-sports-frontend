import { redirect } from "next/navigation";

export const metadata = {
  title: "Football Results | Apex Sports",
  description:
    "View completed football matches and scores from the current season on Apex Sports.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/results/epl",
  },
};

export default function ResultsIndexPage() {
  redirect("/results/epl");
}
