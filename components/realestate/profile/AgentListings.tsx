import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { agent } from "@/lib/agent";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function AgentListings() {
  return (
    <section id="listings" className="section-pad">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Recent sales & listings"
          title="Results that speak for themselves"
          subtitle="A snapshot of recent homes sold and listed across Durham and the east GTA."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agent.listings.map((l, i) => (
            <Reveal key={l.address} delay={(i % 3) * 0.06}>
              <article className="matte matte-hover h-full overflow-hidden rounded-[1.5rem]">
                {/* image placeholder band */}
                <div
                  className="relative grid h-36 place-items-center"
                  style={{ background: `linear-gradient(150deg, ${l.accent}, ${l.accent}cc)` }}
                >
                  <span
                    className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold"
                    style={{ color: l.accent }}
                  >
                    {l.status}
                  </span>
                  <MapPin size={30} className="text-white/70" />
                </div>

                <div className="p-5">
                  <div className="font-display text-xl font-bold tracking-tight text-fg">
                    {l.price}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{l.address}</p>

                  <div className="mt-3 flex items-center gap-4 text-sm text-fg/70">
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble size={15} className="text-muted" /> {l.beds}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Bath size={15} className="text-muted" /> {l.baths}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Maximize size={14} className="text-muted" /> {l.sqft} sqft
                    </span>
                  </div>

                  <p className="mt-3 border-t border-border pt-3 text-sm font-medium text-brand">
                    {l.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted/70">
          Sample listings shown for illustration.
        </p>
      </div>
    </section>
  );
}
