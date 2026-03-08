import Link from "next/link";
export default function AboutPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>About Apex Sports</h1>
      <p>
        Apex Sports provides real-time football scores, fixtures,
        and match data for fans worldwide.
      </p>
      <Link href="/">← Back to live scores</Link>
    </div>
  );
}
