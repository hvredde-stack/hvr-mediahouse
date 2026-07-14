"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-sans">
      <div
        className={`container-page transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        {/* One continuous floating bar — logo, links and actions together */}
        <div className="nav-pill flex items-center justify-between gap-2 py-2 pl-4 pr-2 shadow-sm sm:pl-5">
          <a href="#top" aria-label="Home" className="flex shrink-0 items-center">
            <Logo />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-border/70 bg-white/60 p-1 md:flex"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-fg/70 transition-colors hover:bg-black/5 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <a
              href="/portal/login"
              className="rounded-full px-4 py-2.5 text-sm font-medium text-fg/70 transition-colors hover:text-fg"
            >
              Client login
            </a>
            <a href="#contact" className="btn-pill btn-pill-solid shadow-sm">
              Get started
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-fg transition-colors hover:bg-black/5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="container-page md:hidden">
          <div className="nav-pill mt-2 flex flex-col gap-1 rounded-[1.75rem] p-3 shadow-lg">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base text-fg/80 transition-colors hover:bg-black/5 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <div className="my-1 h-px bg-border" />
            <a
              href="/portal/login"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base text-fg/80 transition-colors hover:bg-black/5 hover:text-fg"
            >
              Client login
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-pill btn-pill-solid mt-1 justify-center"
            >
              Get started
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
