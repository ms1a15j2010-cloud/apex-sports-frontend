import Link from "next/link";
export default function ContactPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contact Us</h1>
      <p>Email: support@apexsports.com</p>
      <Link href="/">← Back to live scores</Link>
    </div>
  );
}
