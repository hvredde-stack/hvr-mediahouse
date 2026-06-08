import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of ${site.name} and our services.`,
};

const UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="section-pad">
        <div className="container-page max-w-3xl">
          <p className="overline mb-3">Legal</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

          <div className="mt-10 space-y-8 leading-relaxed text-muted">
            <p>
              These terms govern your use of {site.url} and the marketing services
              provided by {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By
              using the site or engaging our services, you agree to them.
            </p>

            <Section title="Our services">
              <p>
                We provide social media management, content creation, paid
                advertising and related marketing services. The specific scope,
                deliverables and fees for an engagement are set out in a separate
                proposal or agreement we provide to you.
              </p>
            </Section>

            <Section title="Engagements & billing">
              <p>
                Unless agreed otherwise in writing, retainers are billed monthly
                and are month-to-month — you may cancel with reasonable notice as
                stated in your agreement. Prices shown on this site are in{" "}
                {site.currencyCode} and are indicative; your agreement governs the
                actual fees.
              </p>
            </Section>

            <Section title="Your responsibilities">
              <p>
                You agree to provide timely access, approvals, brand assets and
                accurate information, and to hold the rights to any materials you
                give us to use. You are responsible for the legality of the
                products and claims you ask us to promote.
              </p>
            </Section>

            <Section title="Results & third-party platforms">
              <p>
                Marketing outcomes depend on many factors outside our control. We
                work to industry best practices but do not guarantee specific
                results, reach, or revenue. Services on platforms such as
                Instagram, TikTok, YouTube and Meta are subject to those
                platforms&apos; own rules, which may change at any time.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                On full payment, you own the final content we deliver for your
                brand. We retain ownership of our underlying tools, templates and
                know-how, and may showcase non-confidential work in our portfolio
                unless you ask us not to.
              </p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                To the fullest extent permitted by law, our total liability for any
                claim is limited to the fees you paid us for the month in which the
                claim arose. We are not liable for indirect or consequential
                losses.
              </p>
            </Section>

            <Section title="Governing law & contact">
              <p>
                These terms are governed by the laws of the Province of Ontario,
                Canada. Questions? Email{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-brand">
                  {site.email}
                </a>
                .
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
