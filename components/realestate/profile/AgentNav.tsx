"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { agent } from "@/lib/agent";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#expertise", label: "Expertise" },
  { href: "#listings", label: "Listings" },
  { href: "#reviews", label: "Reviews" },
];

export function AgentNav() {
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
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${agent.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
            {agent.initials}
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-fg">
            {agent.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
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

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/realestate#website"
            className="rounded-full border border-border bg-white/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-fg"
          >
            Sample · by HVR
          </Link>
          <a
            href="#contact"
            className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-105"
          >
            Book a valuation
          </a>
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
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="gradient-bg mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Book a valuation
            </a>
            <Link
              href="/realestate#website"
              onClick={() => setOpen(false)}
              className="mt-1 px-2 py-2 text-center text-xs text-muted"
            >
              Sample agent site — built by HVR Media House
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
