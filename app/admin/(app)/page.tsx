import Link from "next/link";
import {
  Users,
  CreditCard,
  CalendarDays,
  Inbox,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { money, fdate, badgeClass, invoiceTotals } from "@/lib/admin";

export default async function Dashboard() {
  const now = new Date();
  const weekAhead = new Date(now.getTime() + 7 * 864e5);

  const [
    activeClients,
    retainerRows,
    contentDue,
    invoiceRows,
    newLeads,
    recentLeads,
    upcomingContent,
  ] = await Promise.all([
    prisma.client.count({ where: { status: "active" } }),
    prisma.client.findMany({
      where: { status: { in: ["active", "onboarding"] } },
      select: { retainer: true },
    }),
    prisma.contentItem.count({
      where: { status: "scheduled", scheduledFor: { gte: now, lte: weekAhead } },
    }),
    prisma.invoice.findMany({
      where: { status: { in: ["sent", "overdue"] } },
      select: { status: true, amount: true, dueDate: true },
    }),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.contentItem.findMany({
      where: { status: "scheduled", scheduledFor: { gte: now } },
      orderBy: { scheduledFor: "asc" },
      take: 6,
      include: { client: { select: { name: true } } },
    }),
  ]);

  const mrr = retainerRows.reduce((s, c) => s + (c.retainer || 0), 0);
  const { outstanding, overdue: overdueTotal } = invoiceTotals(invoiceRows);

  const kpis = [
    { label: "Active clients", value: String(activeClients), Icon: Users, href: "/admin/clients" },
    { label: "Monthly recurring", value: money(mrr), Icon: TrendingUp, href: "/admin/clients" },
    { label: "Content due (7d)", value: String(contentDue), Icon: CalendarDays, href: "/admin/content" },
    { label: "Outstanding", value: money(outstanding), Icon: CreditCard, href: "/admin/payments" },
    { label: "Overdue", value: money(overdueTotal), Icon: AlertTriangle, href: "/admin/payments", warn: overdueTotal > 0 },
    { label: "New leads", value: String(newLeads), Icon: Inbox, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Your agency at a glance.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {kpis.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className="matte matte-hover rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{k.label}</span>
              <k.Icon
                size={18}
                className={k.warn ? "text-red-500" : "text-brand"}
              />
            </div>
            <div
              className={`mt-2 font-display text-2xl font-bold ${
                k.warn ? "text-red-600" : ""
              }`}
            >
              {k.value}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Upcoming content */}
        <section className="matte rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              Upcoming content
            </h2>
            <Link href="/admin/content" className="text-sm font-medium text-brand">
              View all
            </Link>
          </div>
          {upcomingContent.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">
              Nothing scheduled yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {upcomingContent.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-2.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{c.title}</div>
                    <div className="text-xs capitalize text-muted">
                      {c.client.name} · {c.platform}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    {fdate(c.scheduledFor)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent leads */}
        <section className="matte rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm font-medium text-brand">
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No leads yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentLeads.map((l) => (
                <li key={l.id} className="flex items-center justify-between py-2.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{l.name}</div>
                    <div className="truncate text-xs text-muted">{l.email}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${badgeClass(
                      l.status,
                    )}`}
                  >
                    {l.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
