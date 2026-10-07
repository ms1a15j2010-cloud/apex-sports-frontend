import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Apex Sports",
  description:
    "Read the Terms and Conditions for using Apex Sports, including football data, website availability, acceptable use and external links.",
};

export default function Terms() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports
        </div>

        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Terms & Conditions
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          These Terms & Conditions explain the general rules for using the
          Apex Sports website.
        </p>
      </header>

      <section className="space-y-8">
        <article>
          <h2 className="text-2xl font-extrabold">
            Use of the Website
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports provides football scores, fixtures, results, league
            standings, player information, statistics and educational football
            guides for general informational purposes.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            By using this website, you agree to use its pages and services
            responsibly and not to interfere with the normal operation of the
            website.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Football Data and Accuracy
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Football information displayed on Apex Sports may come from
            third-party data services. We aim to present useful and current
            information, but we cannot guarantee that every score, fixture,
            statistic, kickoff time or other piece of information will always
            be complete, accurate or available.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            Visitors should verify important match information with official
            competition or club sources when accuracy is critical.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Football Articles and Guides
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Articles and guides published by Apex Sports are intended to
            explain football concepts, statistics and competition information
            in an accessible way. They should not be treated as official
            competition rules or professional advice.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Availability of the Website
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            We work to keep Apex Sports available and useful, but website
            features, football data and individual pages may occasionally be
            unavailable because of maintenance, technical problems, third-party
            service interruptions or other circumstances outside our control.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            External Links and Services
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports may link to external websites and third-party
            services. These websites operate independently and may have their
            own terms, policies and practices. Apex Sports is not responsible
            for the content, availability or policies of external websites.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Prohibited Use
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Visitors must not use the website to disrupt its operation,
            attempt unauthorized access, misuse website resources, or engage
            in activity that violates applicable laws or regulations.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Changes to These Terms
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports may update these Terms & Conditions when the website,
            services or operating practices change. Updated terms will be
            published on this page.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Contact
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            If you have questions about these Terms & Conditions, you can
            contact Apex Sports through our contact page.
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-block font-semibold text-green-500 transition hover:text-green-400"
          >
            Contact Apex Sports →
          </Link>
        </article>
      </section>

      <div className="mt-10">
        <Link
          href="/"
          className="font-semibold text-green-500 transition hover:text-green-400"
        >
          ← Back to Apex Sports
        </Link>
      </div>
    </main>
  );
}