import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">
        About Apex Sports
      </h1>

      <p className="mb-6 text-slate-300">
        Apex Sports provides real-time football scores, fixtures,
        and match data for fans worldwide.
      </p>

      <Link
        href="/"
        className="font-semibold text-blue-400 transition hover:text-blue-300"
      >
        ← Back to live scores
      </Link>
    </div>
  );
}