import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { serviceAreas, images } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const advantages = [
  {
    title: "On the ground in the GTA",
    text: "We live and work here — so we know the neighbourhoods, the events and the audience your brand is actually talking to.",
  },
  {
    title: "Posts built on local trends",
    text: "We create content around what's trending across Toronto right now — not generic, copy-paste templates.",
  },
  {
    title: "Speaks to your locals",
    text: "Content that sounds like the GTA, so the people down the street stop scrolling and pay attention.",
  },
];

export function LocalGTA() {
  return (
    <section id="local" className="section-pad">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Proudly local · GTA"
          title={
            <>
              Local problems need{" "}
              <span className="italic text-brand">local solutions</span>.
            </>
          }
          subtitle="We're local to the GTA — we know what's happening here. We build your content around the trends, events and culture your Toronto audience actually cares about."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Toronto image + service areas */}
          <Reveal>
            <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem]">
              <Image
                src={images.toronto}
                alt="Toronto skyline at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,16,30,0.94) 0%, rgba(10,16,30,0.6) 38%, rgba(10,16,30,0.2) 62%, rgba(43,91,176,0.22) 100%)",
                }}
              />
              <div className="relative flex h-full min-h-[24rem] flex-col justify-end p-8">
                <p className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
                  <MapPin size={14} className="shrink-0" /> Serving across the
                  Greater Toronto Area
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* local advantages */}
          <div className="flex flex-col gap-5">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="matte matte-hover rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {a.text}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <a
                href="#contact"
                className="gradient-bg group mt-1 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-[1.03]"
              >
                Work with a local team
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
