import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Apex Sports",
  description:
    "Read the Apex Sports Privacy Policy covering cookies, advertising, analytics, third-party services and visitor information.",
  alternates: {
    canonical: "https://apex-sports-frontend.vercel.app/privacy-policy",
  },
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
            Google and other third-party advertising vendors may place and read
            cookies on a visitor's browser, use web beacons, receive IP addresses
            or use similar identifiers when ads are requested, delivered or
            measured. Depending on the visitor's settings and applicable law,
            these technologies may be used to show, limit and measure ads and
            may use information about a visitor's previous visits to this site
            or other websites.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            Visitors can manage Google's personalised advertising choices in
            <a className="ml-1 text-green-500 underline" href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a>.
            Visitors can also review Google's
            <a className="ml-1 text-green-500 underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">explanation of data use on partner sites</a>
            and use
            <a className="ml-1 text-green-500 underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">AboutAds.info choices</a>
            to learn about opting out of some participating third-party vendors'
            personalised advertising. These choices may change personalisation;
            they do not necessarily remove all advertising from the website.
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            Advertising and consent settings can vary by country. Where consent
            is required by applicable law or Google's publisher policies,
            advertising technologies that require consent must not be used
            before the required choice is obtained. Publishers serving
            personalised ads to visitors in the EEA, the United Kingdom or
            Switzerland must use a Google-certified consent management platform
            that integrates with the IAB Transparency and Consent Framework.
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

