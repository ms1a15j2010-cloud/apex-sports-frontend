import "./globals.css";
import Head from "next/head";
export const metadata = {
  title: "Live Football Scores Today | Apex Sports",
  description: "Watch live football scores with real-time updates.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Head>
        <meta
          name="google-site-verification"
          content="eMzm74d1mP9oknPY4pOLjBVGTiPhSvC3zomVjAL7J1k"
        />
      </Head>
      <body style={{ margin: 0, background: "#020617", color: "#fff" }}>
        {children}

        <footer style={{ padding: "2rem", textAlign: "center", fontSize: 14 }}>
          <a href="/about">About</a> ·{" "}
          <a href="/privacy-policy">Privacy</a> ·{" "}
          <a href="/terms">Terms</a> ·{" "}
          <a href="/contact">Contact</a>
        </footer>
      </body>
    </html>
  );
}