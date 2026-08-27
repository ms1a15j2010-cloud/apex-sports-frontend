import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LiveProvider } from "@/context/LiveContext";

/* =====================================================
   GLOBAL SEO METADATA
===================================================== */

export const metadata = {
  metadataBase: new URL(
    "https://apex-sports-frontend.vercel.app"
  ),

  title: {
    default: "Apex Sports | Live Football Scores",
    template: "%s | Apex Sports",
  },

  description:
    "Apex Sports provides live football scores, fixtures, results, standings, match statistics, player ratings, team information, and real-time football updates.",

  keywords: [
    "Apex Sports",
    "football",
    "football scores",
    "live football scores",
    "live scores",
    "soccer scores",
    "football fixtures",
    "football results",
    "football standings",
    "match statistics",
    "football teams",
    "football players",
    "Premier League",
    "Champions League",
  ],

  authors: [
    {
      name: "Apex Sports",
    },
  ],

  creator: "Apex Sports",
  publisher: "Apex Sports",

  applicationName: "Apex Sports",

  category: "sports",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  verification: {
    google:
      "eMzm74d1mP9oknPY4pOLjBVGTiPhSvC3zomVjAL7J1k",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Apex Sports | Live Football Scores",
    description:
      "Live football scores, fixtures, results, standings, match statistics, and real-time football updates.",
    url: "https://apex-sports-frontend.vercel.app/",
    siteName: "Apex Sports",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Apex Sports | Live Football Scores",
    description:
      "Live football scores, fixtures, results, standings, and real-time match updates.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =====================================================
   ROOT LAYOUT
===================================================== */

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
      <meta name="p:domain_verify" content="8ba1cefbab1bcb1855dc60ef7ec80935"/>
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1963005458652987"
      crossOrigin="anonymous"
    />
  </head>
      <body className="m-0 h-screen w-full overflow-hidden bg-slate-950 p-0 font-[Arial,sans-serif] text-white">
        <LiveProvider>
          {/* =====================================================
              APP SHELL
          ====================================================== */}

          <div className="flex h-screen w-full overflow-hidden">
            {/* =================================================
                SIDEBAR
            ================================================== */}

            <Sidebar />

            {/* =================================================
                RIGHT SIDE APPLICATION
            ================================================== */}

            <div className="apex-main-shell ml-[280px] flex h-screen min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              {/* ===============================================
                  HEADER
              ================================================ */}

              <div className="shrink-0">
                <Header />
              </div>

              {/* ===============================================
                  MAIN SCROLLING AREA
              ================================================ */}

              <main className="box-border min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-scroll bg-slate-950 p-[25px]">
                <Breadcrumbs />

                {children}

                {/* ===============================================
                    FOOTER
                ================================================ */}

                <Footer />
              </main>
            </div>
          </div>
        </LiveProvider>
      </body>
    </html>
  );
}

