import HomePageClient from "./HomePageClient";
import UpcomingFixturesPreview from "@/components/UpcomingFixturesPreview";

export const metadata = {
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/",
  },
};

const API_BASE = "https://apex-sports-backend.vercel.app";
const CURRENT_SEASON = new Date().getMonth() >= 6
  ? new Date().getFullYear()
  : new Date().getFullYear() - 1;

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
    const response = await fetch(`${API_BASE}/api/today?league=PL`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

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

async function getUpcomingFixtures() {
  try {
    const url = new URL(`${API_BASE}/api/fixtures/epl`);
    url.searchParams.set("season", String(CURRENT_SEASON));
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", "6");
    url.searchParams.set("upcoming", "true");

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    const candidates = Array.isArray(data?.fixtures)
      ? data.fixtures
      : Array.isArray(data?.matches)
        ? data.matches
        : [];

    const now = Date.now();
    return candidates
      .filter((match) => {
        const kickoff = match?.fixture?.date || match?.date;
        const timestamp = kickoff ? new Date(kickoff).getTime() : NaN;
        return Number.isFinite(timestamp) && timestamp >= now;
      })
      .sort((a, b) => {
        const aDate = new Date(a?.fixture?.date || a?.date).getTime();
        const bDate = new Date(b?.fixture?.date || b?.date).getTime();
        return aDate - bDate;
      })
      .slice(0, 6);
  } catch (error) {
    console.error("Homepage upcoming fixtures request failed:", error);
    return [];
  }
}

export default async function HomePage() {
  const [initialData, upcomingFixtures, londonDate] = await Promise.all([
    getInitialMatches(),
    getUpcomingFixtures(),
    Promise.resolve(getLondonDate()),
  ]);

  const isInternationalBreak =
    londonDate >= "2026-11-09" &&
    londonDate <= "2026-11-17";

  return (
    <>
      <HomePageClient
        initialData={initialData}
        isInternationalBreak={isInternationalBreak}
      />
      {initialData?.success && initialData.matches.length === 0 && (
        <UpcomingFixturesPreview fixtures={upcomingFixtures} />
      )}
    </>
  );
}
