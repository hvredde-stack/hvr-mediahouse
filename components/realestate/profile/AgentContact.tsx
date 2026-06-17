import Link from "next/link";
import { Mail, Phone, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { agent } from "@/lib/agent";
import { Reveal } from "@/components/Reveal";

const social = [
  { href: agent.socials.instagram, Icon: FaInstagram, label: "Instagram" },
  { href: agent.socials.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  { href: agent.socials.facebook, Icon: FaFacebookF, label: "Facebook" },
];

export function AgentContact() {
  const tel = `tel:${agent.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="contact" className="section-pad">
      <div className="container-page">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] px-8 py-14 sm:px-12 sm:py-16"
            style={{ background: "linear-gradient(160deg,#2c231c 0%,#191108 100%)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle,#c2603f,transparent 70%)" }}
            />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  {agent.contact.title}
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
                  {agent.contact.blurb}
                </p>
                <a
                  href={`mailto:${agent.email}`}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink shadow-xl transition-transform hover:scale-[1.03]"
                >
                  {agent.contact.button}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="lg:justify-self-end">
                <div className="space-y-4">
                  <a
                    href={tel}
                    className="flex items-center gap-3 text-white transition-colors hover:text-brand-soft"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                      <Phone size={18} />
                    </span>
                    <span className="text-lg font-semibold">{agent.phone}</span>
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 text-white transition-colors hover:text-brand-soft"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                      <Mail size={18} />
                    </span>
                    <span className="text-lg font-semibold">{agent.email}</span>
                  </a>
                </div>
                <div className="mt-6 flex gap-3">
                  {social.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* HVR attribution */}
        <Reveal className="mt-6">
          <div className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-brand-soft/40 p-6 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-fg/80">
              <span className="font-semibold text-fg">This is a sample agent website</span> built by
              HVR Media House — want a profile like this that wins you listings?
            </p>
            <Link
              href="/realestate#website"
              className="gradient-bg inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-[1.03]"
            >
              Build your agent brand <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
