import HomePageClient from "./HomePageClient";

export const metadata = {
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
