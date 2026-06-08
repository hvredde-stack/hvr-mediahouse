import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

const UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="section-pad">
        <div className="container-page max-w-3xl">
          <p className="overline mb-3">Legal</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

          <div className="mt-10 space-y-8 leading-relaxed text-muted">
            <p>
              {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a social media
              marketing agency based in the {site.location}. This policy explains
              what information we collect through {site.url}, why, and the choices
              you have. Questions? Email{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand">
                {site.email}
              </a>
              .
            </p>

            <Section title="Information we collect">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-fg">Details you give us</strong> via
                  our contact form or by email — your name, email, phone, company,
                  selected service/budget, and your message.
                </li>
                <li>
                  <strong className="text-fg">Basic usage data</strong> — we use
                  privacy-friendly, cookieless analytics to count page views and
                  understand which pages are popular. It does not identify you.
                </li>
                <li>
                  <strong className="text-fg">Advertising data (only with your
                  consent)</strong> — if you accept cookies, a Meta (Facebook)
                  Pixel may record your visit so we can measure ads and show
                  relevant ones. You can decline, and it stays off.
                </li>
              </ul>
            </Section>

            <Section title="How we use it">
              <p>
                To reply to your enquiry and provide our services, to improve the
                website, and — only with consent — to measure and target
                advertising. We do not sell your personal information.
              </p>
            </Section>

            <Section title="Who we share it with">
              <p>
                We use trusted service providers purely to operate this site:
                hosting (Vercel), our database (Neon), and email delivery
                (Resend). They process data on our behalf under their own privacy
                terms. We may disclose information if required by law.
              </p>
            </Section>

            <Section title="Cookies & analytics">
              <p>
                Our analytics is cookieless and needs no consent. A Meta Pixel, if
                enabled, uses cookies and only loads after you accept the cookie
                banner — you can decline or clear your choice at any time in your
                browser.
              </p>
            </Section>

            <Section title="Data retention">
              <p>
                We keep enquiry details only as long as needed to respond and to
                maintain our client records, then delete them on request.
              </p>
            </Section>

            <Section title="Your rights (PIPEDA)">
              <p>
                Under Canada&apos;s privacy law you may request access to,
                correction of, or deletion of your personal information. Email{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-brand">
                  {site.email}
                </a>{" "}
                and we&apos;ll action it promptly.
              </p>
            </Section>

            <Section title="Security & changes">
              <p>
                We take reasonable measures to protect your information, though no
                method is perfectly secure. We may update this policy; the date
                above reflects the latest version.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-fg">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
