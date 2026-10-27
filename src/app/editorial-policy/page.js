import Link from "next/link";

export const metadata = {
  title: "Editorial Policy & Data Standards | Apex Sports",
  description:
    "Learn how Apex Sports prepares football guides and match analysis, checks statistics, cites sources and handles corrections.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-[950px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports standards
        </p>
        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Editorial Policy &amp; Data Standards
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Apex Sports publishes football information and explanatory guides to help readers
          understand matches, competitions and statistics. Accuracy, clear sourcing and
          honest limits matter more than publishing a claim we cannot verify.
        </p>
      </header>

      <div className="space-y-6 text-[16px] leading-8 text-slate-300">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-extrabold text-white">What we publish</h2>
          <p>
            Our coverage includes fixture and result information, competition tables,
            player statistics, football explainers and selected match analysis. Live scores
            and statistical pages are data-led services; they are different from editorial
            articles, which should explain context rather than merely repeat a score or table.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-extrabold text-white">Sources and verification</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>For rules, competition formats and official decisions, we prioritise the relevant governing body or competition organiser.</li>
            <li>For club-specific events, line-ups and statements, we look for the club's official publication or a clearly attributed report.</li>
            <li>Match statistics can differ between providers. When a figure is provider-specific, we identify the provider where practical instead of presenting it as a universal value.</li>
            <li>Expected goals (xG) and other model-based metrics are estimates. They are not official scores, guarantees or proof that one team deserved to win.</li>
            <li>If a claim or statistic cannot be verified, it should be omitted or clearly labelled as unavailable rather than invented.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-extrabold text-white">Originality and attribution</h2>
          <p>
            Apex Sports aims to add explanation and context instead of copying another
            publisher's article. External sources are linked when they support a factual
            statement or provide the underlying statistics. Names, logos, photographs and
            other third-party material remain the property of their respective owners;
            a link does not imply endorsement or affiliation.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-extrabold text-white">Corrections and updates</h2>
          <p>
            Football information can change, and mistakes can happen. If you find a wrong
            score, statistic, link or explanation, please send the page URL and the details
            of the issue. We will review the report and update the page when a correction
            is supported by reliable evidence.
          </p>
          <p className="mt-4">
            Contact: <a className="font-semibold text-green-500 underline hover:text-green-400" href="mailto:Impeccablesports@gmail.com">Impeccablesports@gmail.com</a>
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-extrabold text-white">Data limitations</h2>
          <p>
            Coverage depends on the competitions and data feeds available to Apex Sports.
            Some matches or statistics may be delayed, incomplete or unavailable. We do not
            claim to provide every competition, every event or an independent official record.
            When data is missing, the page should communicate that limitation clearly.
          </p>
        </section>
      </div>

      <nav className="mt-10 flex flex-wrap gap-5" aria-label="Related pages">
        <Link href="/about" className="font-semibold text-green-500 hover:text-green-400">About Apex Sports →</Link>
        <Link href="/articles" className="font-semibold text-green-500 hover:text-green-400">Football guides →</Link>
        <Link href="/contact" className="font-semibold text-green-500 hover:text-green-400">Contact and corrections →</Link>
      </nav>
    </main>
  );
}
