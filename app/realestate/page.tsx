import type { Metadata } from "next";
import { site } from "@/lib/site";
import { RealEstateNav } from "@/components/realestate/RealEstateNav";
import { Footer } from "@/components/Footer";
import { ReHero } from "@/components/realestate/ReHero";
import { ReShift } from "@/components/realestate/ReShift";
import { ReMultiplier } from "@/components/realestate/ReMultiplier";
import { ReModel } from "@/components/realestate/ReModel";
import { ReDeliverables } from "@/components/realestate/ReDeliverables";
import { RePackages } from "@/components/realestate/RePackages";
import { ReResume } from "@/components/realestate/ReResume";
import { ReProcess } from "@/components/realestate/ReProcess";
import { ReFaq } from "@/components/realestate/ReFaq";
import { ReCta } from "@/components/realestate/ReCta";
import { realEstate } from "@/lib/realestate";

const TITLE = "Real Estate Marketing for Agents — Agent Brand Retainers";
const DESCRIPTION =
  "Social media marketing built for real estate agents across the GTA & Durham Region. We turn your listing footage into an always-on Agent Brand — reels, carousels, stories and strategy on a simple monthly retainer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/realestate" },
  keywords: [
    "real estate social media marketing",
    "real estate agent branding",
    "realtor marketing GTA",
    "realtor social media management",
    "real estate reels",
    "agent brand retainer",
    "real estate marketing Durham Region",
    site.name,
  ],
  openGraph: {
    title: `${TITLE} · ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/realestate`,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ${site.name}`,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Real Estate Social Media Marketing",
  serviceType: "Social media marketing for real estate agents",
  provider: {
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
  },
  areaServed: ["Greater Toronto Area", "Durham Region", "Ontario"],
  url: `${site.url}/realestate`,
  description: DESCRIPTION,
  offers: realEstate.packages.tiers.map((t) => ({
    "@type": "Offer",
    name: `${t.name} retainer`,
    description: t.forWho,
    priceCurrency: site.currencyCode,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: t.priceLow,
      maxPrice: t.priceHigh,
      priceCurrency: site.currencyCode,
      unitText: "MONTH",
    },
  })),
};

export default function RealEstatePage() {
  return (
    <>
      <RealEstateNav />
      <main>
        <ReHero />
        <ReShift />
        <ReMultiplier />
        <ReModel />
        <ReDeliverables />
        <RePackages />
        <ReResume />
        <ReProcess />
        <ReFaq />
        <ReCta />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
