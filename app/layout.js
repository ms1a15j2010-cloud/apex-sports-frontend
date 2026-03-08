import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Apex Sports – Live Football Scores",
  description: "Live football scores, fixtures and results",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#020617", color: "#fff" }}>
        
        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {children}

        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            fontSize: 14,
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