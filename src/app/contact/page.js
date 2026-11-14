import Link from "next/link";

export const metadata = {
  title: "Contact Apex Sports | Get in Touch",
  description:
    "Contact Apex Sports with questions, feedback, corrections or suggestions about our football coverage, scores, fixtures, statistics and guides.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports
        </div>

        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Contact Us
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Have a question, suggestion or feedback about Apex Sports? We
          welcome messages from football fans and visitors.
        </p>
      </header>

      <section className="space-y-6">
        <article className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">Get in Touch</h2>

          <p className="mt-4 leading-7 text-slate-300">
            For general questions, feedback, corrections or suggestions
            regarding Apex Sports, contact us by email.
          </p>

          <div className="mt-5 rounded-xl border border-gray-800 bg-[#0b1220] p-4">
            <p className="text-sm text-slate-400">Email</p>

            <a
              href="mailto:impeccablesports@gmail.com"
              className="mt-1 inline-block font-semibold text-green-500 transition hover:text-green-400"
            >
              impeccablesports@gmail.com
            </a>
          </div>
        </article>

        <article className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">
            What You Can Contact Us About
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-slate-300">
            <li>Questions about football scores, fixtures and results</li>
            <li>Feedback about our football guides and articles</li>
            <li>Suggestions for improving the website</li>
            <li>Reports of incorrect, incomplete or outdated information</li>
          </ul>

          <p className="mt-5 leading-7 text-slate-300">
            If you are reporting a possible error in a match or statistic,
            please include the competition, teams, match date and a link to
            the relevant page so we can identify the information you mean.
          </p>
        </article>
      </section>

      <div className="mt-10 flex flex-wrap gap-5">
        <Link
          href="/"
          className="font-semibold text-green-500 transition hover:text-green-400"
        >
          ← Back to Apex Sports
        </Link>

        <Link
          href="/articles"
          className="font-semibold text-green-500 transition hover:text-green-400"
        >
          Explore football guides →
        </Link>
      </div>
    </main>
  );
}
