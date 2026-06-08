"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarCheck, CreditCard, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/portal", label: "Content", Icon: CalendarCheck },
  { href: "/portal/invoices", label: "Invoices", Icon: CreditCard },
];

export function PortalShell({
  clientName,
  children,
}: {
  clientName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="container-page flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-bg-2 px-2.5 py-0.5 text-xs font-medium text-muted sm:inline">
              Client portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium sm:inline">
              {clientName}
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-bg-2"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
        <nav className="container-page flex gap-1 pb-2 pt-2">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-brand-soft text-brand-strong"
                  : "text-muted hover:text-fg"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
