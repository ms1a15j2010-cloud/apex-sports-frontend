import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Apex Sports",
  description:
    "Read the Apex Sports Privacy Policy covering cookies, advertising, analytics, third-party services and visitor information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-10 text-white sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-green-500">
          Apex Sports
        </div>

        <h1 className="text-[clamp(30px,5vw,46px)] font-extrabold leading-tight">
          Privacy Policy
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          This Privacy Policy explains how Apex Sports handles information
          when visitors use our website.
        </p>
      </header>

      <section className="space-y-8">
        <article>
          <h2 className="text-2xl font-extrabold">
            Information We Collect
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports does not require an account to browse football scores,
            fixtures, results, standings, statistics or articles. Like most
            websites, our hosting, analytics and advertising services may
            process technical information such as an IP address, browser and
            device details, page requests, approximate location derived from
            an IP address, and cookie or advertising identifiers. The data
            processed depends on which services are enabled and the visitor's
            settings.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Cookies and Similar Technologies
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports may use cookies and similar technologies to support
            website functionality, understand how visitors use the site and
            improve the overall experience.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            Some cookies may be placed by third-party services used on the
            website. Your browser may provide controls for managing or
            disabling cookies.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Advertising
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports may display advertisements provided by third-party
            advertising services, including Google. These services may use
            cookies or similar technologies to help deliver and measure
            advertising.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            Google and other advertising providers may use cookies or similar
            technologies to deliver, measure and limit advertising, subject to
            the applicable settings and consent requirements. Visitors can
            review Google's information about how it uses data on partner
            sites at https://policies.google.com/technologies/partner-sites
            and manage personal ad settings at https://adssettings.google.com/.
            Some regions require additional consent choices before certain
            advertising technologies are used.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Analytics and Website Usage
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            We may use analytics services to understand general website
            traffic, such as which pages are visited and how visitors
            interact with the site. This information helps us improve the
            content and usability of Apex Sports.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Third-Party Services
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Apex Sports may rely on third-party services to provide football
            data, hosting, analytics, advertising and other website
            functionality. Those services may process information according
            to their own privacy policies and terms.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            External Links
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Our website may contain links to external websites or services.
            Apex Sports is not responsible for the privacy practices or
            content of websites that are outside our control. Visitors should
            review the privacy policies of external websites they choose to
            visit.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Changes to This Policy
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            This Privacy Policy may be updated when our website, services or
            privacy practices change. Any updated version will be published on
            this page.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-extrabold">
            Contact Us
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            If you have questions about this Privacy Policy, you can contact
            Apex Sports at:
          </p>

          <a
            href="mailto:support@apexsports.com"
            className="mt-3 inline-block font-semibold text-green-500 transition hover:text-green-400"
          >
            support@apexsports.com
          </a>
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

