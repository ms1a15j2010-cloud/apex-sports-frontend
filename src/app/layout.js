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
    "Apex Sports brings together football scores, fixtures, results, league standings, match details, team information and football guides for supported competitions.",

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
      "Football scores, fixtures, results, league standings, match details and guides for supported competitions.",
    url: "https://apex-sports-frontend.vercel.app/",
    siteName: "Apex Sports",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Apex Sports | Live Football Scores",
    description:
      "Follow football scores, fixtures, results, league standings and match details for supported competitions.",
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
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3611920956024218"
      crossOrigin="anonymous"
    />
  </head>
      <body className="m-0 min-h-screen w-full overflow-x-hidden bg-slate-950 p-0 font-[Arial,sans-serif] text-white">
        <LiveProvider>
          {/* =====================================================
              APP SHELL
          ====================================================== */}

          <div className="flex min-h-screen w-full md:h-screen md:overflow-hidden">
            {/* =================================================
                SIDEBAR
            ================================================== */}

            <Sidebar />

            {/* =================================================
                RIGHT SIDE APPLICATION
            ================================================== */}

            <div className="apex-main-shell ml-0 flex min-h-screen min-w-0 flex-1 flex-col md:ml-[280px] md:h-screen md:min-h-0 md:overflow-hidden">
              {/* ===============================================
                  HEADER
              ================================================ */}

              <div className="shrink-0">
                <Header />
              </div>

              {/* ===============================================
                  MAIN SCROLLING AREA
              ================================================ */}

              <div className="box-border min-w-0 flex-1 overflow-x-hidden bg-slate-950 p-4 sm:p-[25px] md:min-h-0 md:overflow-y-auto">
                <Breadcrumbs />

                {children}

                {/* ===============================================
                    FOOTER
                ================================================ */}

                <Footer />
              </div>
            </div>
          </div>
        </LiveProvider>
      </body>
    </html>
  );
}

