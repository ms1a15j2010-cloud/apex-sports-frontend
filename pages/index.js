import { useEffect, useState } from "react";
import AdSense from "../components/AdSense";
import { fetchHello } from "../lib/api";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHello().then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Apex Sports</h1>
      <p>{message || "Loading backend message..."}</p>

      <AdSense />

      <h2>Top Matches</h2>
      <p>Live scores, match analysis, and expert opinions.</p>

      <AdSense />

      <footer style={{ marginTop: "40px" }}>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}
