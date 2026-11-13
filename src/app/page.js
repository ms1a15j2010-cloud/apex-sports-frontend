import HomePageClient from "./HomePageClient";

export const metadata = {
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/",
  },
};

const API_BASE = "https://apex-sports-backend.vercel.app";

function getLondonDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function getInitialMatches() {
  try {
    const response = await fetch(
      `${API_BASE}/api/today?league=PL`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        matches: [],
        message: "Premier League match data is temporarily unavailable. Please try again shortly.",
      };
    }

    const data = await response.json();

    if (!data || data.success !== true || !Array.isArray(data.matches)) {
      return {
        success: false,
        matches: [],
        message: data?.message || "Premier League match data is temporarily unavailable.",
      };
    }

    return data;
  } catch (error) {
    console.error("Homepage initial match request failed:", error);
    return {
      success: false,
      matches: [],
      message: "Premier League match data is temporarily unavailable. Please try again shortly.",
    };
  }
}

export default async function HomePage() {
  const [initialData, londonDate] = await Promise.all([
    getInitialMatches(),
    Promise.resolve(getLondonDate()),
  ]);

  const isInternationalBreak =
    londonDate >= "2026-11-09" &&
    londonDate <= "2026-11-17";

  return (
    <HomePageClient
      initialData={initialData}
      isInternationalBreak={isInternationalBreak}
    />
  );
}
