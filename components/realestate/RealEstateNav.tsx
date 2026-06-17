"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Logo } from "../Logo";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#services", label: "What we make" },
  { href: "#packages", label: "Packages" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
];

export function RealEstateNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5"
      }`}
    >
      <nav className="container-page flex items-center justify-between">
        <a href="#top" aria-label="Real estate marketing home" className="flex items-center gap-2.5">
          <Logo />
          <span className="hidden rounded-full bg-brand-soft px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-strong sm:inline">
            Real Estate
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={15} /> Main site
          </Link>
          <Link
            href="/#contact"
            className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-105"
          >
            Book a brand audit
          </Link>
        </div>

        <button
          className="text-fg md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="glass mt-3 md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-muted transition-colors hover:bg-bg-2 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base text-muted transition-colors hover:bg-bg-2 hover:text-fg"
            >
              ← Main site
            </Link>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="gradient-bg mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Book a brand audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
