import MatchClient from "./MatchClient";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://apex-sports-backend.vercel.app";

export const metadata = {
  title: "Football Match Center | Apex Sports",
  description:
    "Match details, score, goals, teams and available match information from Apex Sports.",
};

async function getMatch(id) {
  try {
    const response = await fetch(
      `${API}/api/match/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok || data?.success !== true || !data?.match) {
      return {
        success: false,
        message:
          data?.message ||
          `Match information is currently unavailable (HTTP ${response.status}).`,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.message ||
        "Match information is temporarily unavailable.",
    };
  }
}

export default async function MatchPage({ params }) {
  const { id } = await params;
  const initialData = await getMatch(id);

  return (
    <MatchClient
      matchId={id}
      initialData={initialData}
    />
  );
}
