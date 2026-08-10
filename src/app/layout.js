import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LiveProvider } from "@/context/LiveContext";

export const metadata = {
  metadataBase: new URL("https://apex-sports-frontend.vercel.app"),

  title: {
    default: "Apex Sports | Live Football Scores",
    template: "%s | Apex Sports",
  },

  description:
    "Watch live football scores, fixtures, match details, and real-time updates from leagues around the world.",

  keywords: [
    "football",
    "live scores",
    "soccer",
    "Premier League",
    "Champions League",
    "Apex Sports",
  ],

  verification: {
    google: "eMzm74d1mP9oknPY4pOLjBVGTiPhSvC3zomVjAL7J1k",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Apex Sports",
    description: "Live Football Scores & Match Updates",
    url: "https://apex-sports-frontend.vercel.app",
    siteName: "Apex Sports",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#020617",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",

          /* Prevent browser-level scrolling */
          overflow: "hidden",

          /* Full viewport application */
          height: "100vh",
          width: "100%",
        }}
      >
        <LiveProvider>
          {/* =====================================================
              APP SHELL
          ====================================================== */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            {/* =================================================
                SIDEBAR
            ================================================== */}
            <Sidebar />

            {/* =================================================
                RIGHT SIDE APPLICATION
            ================================================== */}
            <div
              style={{
                flex: 1,

                /*
                  Sidebar is fixed at 280px,
                  so reserve that space here.
                */
                marginLeft: "280px",

                minWidth: 0,
                minHeight: 0,

                height: "100vh",

                display: "flex",
                flexDirection: "column",

                overflow: "hidden",
              }}
            >
              {/* ===============================================
                  HEADER
              ================================================ */}
              <div
                style={{
                  flexShrink: 0,
                }}
              >
                <Header />
              </div>

              {/* ===============================================
                  MAIN SCROLLING AREA
              ================================================ */}
              <main
                style={{
                  flex: 1,

                  /*
                    VERY IMPORTANT for flex scrolling.
                    Without this, the content can force
                    the parent to grow instead of scrolling.
                  */
                  minHeight: 0,
                  minWidth: 0,

                  /*
                    Always show vertical scrollbar.
                  */
                  overflowY: "scroll",

                  /*
                    Prevent horizontal page overflow.
                  */
                  overflowX: "hidden",

                  padding: "25px",

                  background: "#020617",

                  /*
                    Make sizing predictable.
                  */
                  boxSizing: "border-box",
                }}
              >
                <Breadcrumbs />

                {children}
              </main>

              {/* ===============================================
                  FOOTER
              ================================================ */}
              <footer
                style={{
                  flexShrink: 0,

                  padding: "20px",

                  textAlign: "center",

                  fontSize: "14px",

                  borderTop: "1px solid #1e293b",

                  background: "#020617",

                  color: "#94a3b8",
                }}
              >
                <Link
                  href="/about"
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                  }}
                >
                  About
                </Link>

                {" · "}

                <Link
                  href="/privacy-policy"
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                  }}
                >
                  Privacy
                </Link>

                {" · "}

                <Link
                  href="/terms"
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                  }}
                >
                  Terms
                </Link>

                {" · "}

                <Link
                  href="/contact"
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                  }}
                >
                  Contact
                </Link>
              </footer>
            </div>
          </div>
        </LiveProvider>
      </body>
    </html>
  );
}