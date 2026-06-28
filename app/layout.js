import "./globals.css";

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
          background: "#020617",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {children}

        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <a href="/about">About</a> ·{" "}
          <a href="/privacy-policy">Privacy</a> ·{" "}
          <a href="/terms">Terms</a> ·{" "}
          <a href="/contact">Contact</a>
        </footer>
      </body>
    </html>
  );
}