
import Link from "next/link";

export default function Terms() {
  return (
    <main className="mx-auto max-w-[800px] p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Terms & Conditions
      </h1>

      <p className="mb-4 text-slate-300">
        Apex Sports provides football match data for informational purposes only.
        We do not guarantee accuracy or availability.
      </p>

      <p className="mb-4 text-slate-300">
        By using this website, you agree not to misuse the content or services.
      </p>

      <p className="mb-6 text-slate-300">
        Apex Sports reserves the right to modify or discontinue services at any time.
      </p>

      <Link
        href="/"
        className="font-semibold text-blue-400 transition hover:text-blue-300"
      >
        ← Back to live scores
      </Link>
    </main>
  );
}
