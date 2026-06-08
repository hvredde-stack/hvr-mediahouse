import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const socialLinks = [
  { href: site.socials.instagram, label: "Instagram", Icon: FaInstagram },
  { href: site.socials.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: site.socials.tiktok, label: "TikTok", Icon: FaTiktok },
  { href: site.socials.youtube, label: "YouTube", Icon: FaYoutube },
].filter((s) => s.href); // only render platforms that have a real profile URL

const footerLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-tint-lav">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-semibold text-fg">Explore</h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-fg">Get in touch</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-fg"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:text-fg"
                  >
                    {site.phone}
                  </a>
                </li>
                <li>{site.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <a href="/privacy" className="text-muted transition-colors hover:text-fg">
                Privacy
              </a>
              <a href="/terms" className="text-muted transition-colors hover:text-fg">
                Terms
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-all hover:border-brand-purple/50 hover:text-fg"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
