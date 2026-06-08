"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  FolderKanban,
  CalendarDays,
  CreditCard,
  CheckSquare,
  UserCog,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import type { SessionUser } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", Icon: Inbox },
  { href: "/admin/clients", label: "Clients", Icon: Users },
  { href: "/admin/projects", label: "Projects", Icon: FolderKanban },
  { href: "/admin/content", label: "Content", Icon: CalendarDays },
  { href: "/admin/payments", label: "Payments", Icon: CreditCard },
  { href: "/admin/tasks", label: "Tasks", Icon: CheckSquare },
  { href: "/admin/team", label: "Team", Icon: UserCog },
];

export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[238px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-bg-2/40 p-4 md:flex">
        <div className="px-2 py-2">
          <Logo />
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-brand-soft text-brand-strong"
                  : "text-muted hover:bg-bg-2 hover:text-fg"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:text-fg"
        >
          <ExternalLink size={16} /> View site
        </a>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-bg/80 px-5 py-3 backdrop-blur">
          {/* Mobile nav */}
          <div className="flex items-center gap-1 overflow-x-auto md:hidden">
            {NAV.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                  isActive(href)
                    ? "bg-brand-soft text-brand-strong"
                    : "text-muted"
                }`}
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-xs capitalize text-muted">{user.role}</div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-bg-2"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
