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
        className={`container-page flex items-center justify-between gap-3 py-4 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Logo pill */}
        <a
          href="#top"
          aria-label="Home"
          className="nav-pill flex shrink-0 items-center px-4 py-2.5 shadow-sm sm:px-5"
        >
          <Logo />
        </a>

        {/* Center link pill — desktop only */}
        <nav
          aria-label="Primary"
          className="nav-pill hidden items-center gap-1 px-2 py-2 shadow-sm md:flex"
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

        {/* Right actions — desktop only */}
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
          className="nav-pill flex h-11 w-11 items-center justify-center text-fg shadow-sm md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
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
