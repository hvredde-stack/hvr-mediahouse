import { realEstate } from "@/lib/realestate";
import { accents } from "@/lib/site";
import { Icon } from "../Icon";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { deliverables } = realEstate;

export function ReDeliverables() {
  return (
    <section id="services" className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading
          eyebrow={deliverables.eyebrow}
          title={deliverables.title}
          subtitle={deliverables.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.items.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.07}>
              <article className="matte matte-hover h-full rounded-[1.5rem] p-7">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                  style={{ background: accents[i % accents.length] }}
                >
                  <Icon name={d.icon} size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
