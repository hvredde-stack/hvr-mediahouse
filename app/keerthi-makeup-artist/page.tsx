import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { BookingForm } from "@/components/keerthi/BookingForm";
import { keerthi } from "@/lib/keerthi";
import { site } from "@/lib/site";

const TITLE = "Keerthi Makeup Artist | Bridal & Event Makeup";
const DESCRIPTION =
  "Bridal, soft glam and event makeup by Keerthi Makeup Artist. View services and starting prices, then request your date online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: keerthi.route },
  keywords: [
    "Keerthi Makeup Artist",
    "bridal makeup artist GTA",
    "Indian bridal makeup",
    "event makeup artist",
    "soft glam makeup",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}${keerthi.route}`,
    siteName: keerthi.name,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: keerthi.heroImage,
        width: 1200,
        height: 630,
        alt: "Traditional bridal makeup by Keerthi Makeup Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [keerthi.heroImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: keerthi.name,
  description: DESCRIPTION,
  url: `${site.url}${keerthi.route}`,
  areaServed: keerthi.serviceArea,
  priceRange: "$$",
  image: [keerthi.heroImage, ...keerthi.gallery.map((image) => image.src)],
  makesOffer: keerthi.packages.map((item) => ({
    "@type": "Offer",
    priceCurrency: keerthi.currency,
    price: item.price,
    itemOffered: {
      "@type": "Service",
      name: item.name,
      description: item.description,
    },
  })),
};

export default function KeerthiMakeupArtistPage() {
  return (
    <div id="top" className="bg-white text-[#20191d]">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/20 text-white">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href={keerthi.route}
            className="text-lg font-semibold"
            aria-label={`${keerthi.name} home`}
          >
            Keerthi
            <span className="ml-2 text-xs font-medium uppercase text-white/65">
              Makeup Artist
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#services" className="text-white/80 hover:text-white">
              Services
            </a>
            <a href="#work" className="text-white/80 hover:text-white">
              Work
            </a>
            <a href="#about" className="text-white/80 hover:text-white">
              Experience
            </a>
          </div>

          <a
            href="#book"
            className="inline-flex min-h-11 items-center bg-white px-5 text-sm font-semibold text-[#20191d] transition-colors hover:bg-[#e8fffb]"
          >
            Book your date
          </a>
        </nav>
      </header>

      <main>
        <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#20191d]">
          <Image
            src={keerthi.heroImage}
            alt="Bride with finished traditional makeup"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,15,20,0.88)_0%,rgba(24,15,20,0.56)_46%,rgba(24,15,20,0.14)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,15,20,0.72)_0%,transparent_45%)]" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-40 text-white sm:px-8 sm:pb-20">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase text-[#8cf0dc]">
                <Sparkles size={15} />
                {keerthi.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.96] sm:text-6xl lg:text-8xl">
                {keerthi.headline}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
                {keerthi.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#services"
                  className="inline-flex min-h-12 items-center gap-2 bg-[#d92f70] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#a51d52]"
                >
                  View services and prices
                  <ArrowDown size={16} />
                </a>
                <span className="inline-flex items-center gap-2 text-sm text-white/72">
                  <MapPin size={16} className="text-[#8cf0dc]" />
                  {keerthi.serviceArea}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e2e5] bg-[#f4fffd]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#d8ece8] px-5 sm:px-8 md:grid-cols-4">
            {keerthi.packages.map((item) => (
              <a
                key={item.name}
                href="#services"
                className="group px-4 py-6 first:pl-0 md:px-7"
              >
                <span className="block text-xs font-semibold uppercase text-[#71656b]">
                  {item.name}
                </span>
                <span className="mt-1 block text-xl font-semibold text-[#20191d]">
                  from ${item.price}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="services" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase text-[#a51d52]">
                  Services + pricing
                </p>
                <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                  Choose your finish, then make it personal.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-[#665960] lg:justify-self-end">
                Every appointment begins with a quick consultation about your
                skin, outfit, event and preferred level of glam. All rates are
                starting prices in Canadian dollars.
              </p>
            </div>

            <div className="mt-14 grid gap-px bg-[#ddd6da] md:grid-cols-2">
              {keerthi.packages.map((item) => (
                <article
                  key={item.name}
                  className={`relative flex min-h-[31rem] flex-col p-7 sm:p-9 ${
                    item.featured
                      ? "bg-[#20191d] text-white"
                      : "bg-[#fbfafb] text-[#20191d]"
                  }`}
                >
                  {item.featured && (
                    <span className="absolute right-7 top-7 bg-[#8cf0dc] px-3 py-1 text-xs font-semibold uppercase text-[#164e45]">
                      Complete bridal
                    </span>
                  )}
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase ${
                        item.featured ? "text-[#8cf0dc]" : "text-[#a51d52]"
                      }`}
                    >
                      {item.duration}
                    </p>
                    <h3 className="mt-4 max-w-xs text-3xl font-semibold">
                      {item.name}
                    </h3>
                    <p
                      className={`mt-4 max-w-md leading-relaxed ${
                        item.featured ? "text-white/68" : "text-[#665960]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className={`mt-0.5 shrink-0 ${
                            item.featured ? "text-[#8cf0dc]" : "text-[#a51d52]"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex items-end justify-between border-t border-current/15 pt-6">
                    <div>
                      <span
                        className={`block text-xs uppercase ${
                          item.featured ? "text-white/55" : "text-[#7d7077]"
                        }`}
                      >
                        Starting at
                      </span>
                      <span className="mt-1 block text-4xl font-semibold">
                        ${item.price}
                      </span>
                    </div>
                    <a
                      href="#book"
                      aria-label={`Request ${item.name}`}
                      className={`grid h-12 w-12 place-items-center transition-colors ${
                        item.featured
                          ? "bg-[#d92f70] text-white hover:bg-[#a51d52]"
                          : "bg-[#20191d] text-white hover:bg-[#a51d52]"
                      }`}
                    >
                      <ArrowRight size={19} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 border-y border-[#e5dfe2]">
              {keerthi.addons.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between gap-6 border-b border-[#e5dfe2] py-5 last:border-b-0"
                >
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-sm font-semibold text-[#a51d52]">
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="bg-[#20191d] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase text-[#8cf0dc]">
                  The artistry
                </p>
                <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                  Detail in every layer.
                </h2>
              </div>
              <p className="max-w-lg leading-relaxed text-white/62">
                Skin that looks like skin. Thoughtful colour. Definition that
                reads beautifully in person and on camera.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-12">
              {keerthi.gallery.map((image, index) => (
                <figure
                  key={image.src}
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "aspect-[4/5] md:col-span-5"
                      : index === 1
                        ? "aspect-[4/5] md:col-span-4 md:mt-16"
                        : "aspect-[4/5] md:col-span-3 md:mt-32"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#f4fffd] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase text-[#a51d52]">
                  Your appointment
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                  Calm, prepared and built around your day.
                </h2>
                <p className="mt-6 leading-relaxed text-[#665960]">
                  From the first reference photo to the final lip check, the
                  experience is structured so you can relax and enjoy getting
                  ready.
                </p>
              </div>

              <ol className="border-t border-[#cfe3df]">
                {[
                  [
                    "01",
                    "Share the details",
                    "Send your date, location, service and inspiration so availability and timing can be checked.",
                  ],
                  [
                    "02",
                    "Confirm the look",
                    "We align on finish, coverage, colours and any cultural draping or jewellery requirements.",
                  ],
                  [
                    "03",
                    "Get ready",
                    "Arrive with clean skin or follow the prep notes provided before your appointment.",
                  ],
                  [
                    "04",
                    "Final details",
                    "Lashes, lip colour and finishing touches are checked under natural light before you leave.",
                  ],
                ].map(([number, title, copy]) => (
                  <li
                    key={number}
                    className="grid gap-3 border-b border-[#cfe3df] py-7 sm:grid-cols-[4rem_12rem_1fr] sm:items-start"
                  >
                    <span className="text-sm font-semibold text-[#a51d52]">
                      {number}
                    </span>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#665960]">
                      {copy}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase text-[#a51d52]">
                  Good to know
                </p>
                <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                  Before you book.
                </h2>
                <div className="mt-8 space-y-4 text-sm text-[#665960]">
                  <p className="flex items-center gap-3">
                    <Clock3 size={17} className="text-[#a51d52]" />
                    Appointment time varies by service.
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin size={17} className="text-[#a51d52]" />
                    Mobile service available across the GTA.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#e5dfe2]">
                {keerthi.faqs.map((item) => (
                  <details
                    key={item.question}
                    className="group border-b border-[#e5dfe2] py-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                      {item.question}
                      <span className="text-2xl font-light text-[#a51d52] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pt-4 text-sm leading-relaxed text-[#665960]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="bg-[#f7f3f5] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase text-[#a51d52]">
                  Request availability
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                  Tell us about your date.
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-[#665960]">
                  Share the essentials below. Your appointment is not confirmed
                  until availability and the booking retainer are completed.
                </p>
              </div>
              <BookingForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#20191d] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">{keerthi.name}</p>
            <p className="mt-1 text-sm text-white/55">
              Bridal and event makeup by appointment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/65">
            <a href="#top" className="hover:text-white">
              Back to top
            </a>
            <Link href="/" className="hover:text-white">
              Website by {site.name}
            </Link>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
