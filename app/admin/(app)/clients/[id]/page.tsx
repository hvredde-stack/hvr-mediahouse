import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Trash2, KeyRound } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  money,
  fdate,
  badgeClass,
  invoiceTotals,
  CLIENT_STATUSES,
} from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { ReportCharts } from "@/components/ReportCharts";
import {
  updateClientStatus,
  deleteClient,
  createClientUser,
  deleteClientUser,
} from "../actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function ClientDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      projects: { orderBy: { createdAt: "desc" } },
      content: { orderBy: [{ scheduledFor: "asc" }, { createdAt: "desc" }] },
      invoices: { orderBy: { createdAt: "desc" } },
      tasks: { where: { done: false }, orderBy: { createdAt: "desc" } },
      users: {
        orderBy: { createdAt: "asc" },
        select: { id: true, name: true, email: true },
      },
      reports: { orderBy: { month: "asc" } },
    },
  });
  if (!client) notFound();

  const { paid, outstanding } = invoiceTotals(client.invoices);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft size={15} /> All clients
      </Link>

      {/* Header */}
      <div className="matte rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">{client.name}</h1>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              {client.contactEmail && (
                <a href={`mailto:${client.contactEmail}`} className="inline-flex items-center gap-1.5 hover:text-fg">
                  <Mail size={14} /> {client.contactEmail}
                </a>
              )}
              {client.contactPhone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone size={14} /> {client.contactPhone}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {client.plan && <span className="rounded-full bg-bg-2 px-2.5 py-1">{client.plan}</span>}
              <span className="rounded-full bg-bg-2 px-2.5 py-1">{money(client.retainer)}/mo</span>
              {client.platforms && <span className="rounded-full bg-bg-2 px-2.5 py-1">{client.platforms}</span>}
              {client.startDate && <span className="rounded-full bg-bg-2 px-2.5 py-1">Since {fdate(client.startDate)}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <form action={updateClientStatus}>
              <input type="hidden" name="id" value={client.id} />
              <SubmitSelect
                name="status"
                defaultValue={client.status}
                options={CLIENT_STATUSES}
                className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium capitalize ${badgeClass(client.status)}`}
              />
            </form>
            <form action={deleteClient}>
              <input type="hidden" name="id" value={client.id} />
              <ConfirmButton
                message={`Delete ${client.name} and all related records?`}
                ariaLabel="Delete client"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted hover:border-red-500/50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </ConfirmButton>
            </form>
          </div>
        </div>
        {client.notes && (
          <p className="mt-4 whitespace-pre-wrap border-t border-border pt-4 text-sm text-fg/80">
            {client.notes}
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Paid to date" value={money(paid)} />
        <Stat label="Outstanding" value={money(outstanding)} />
        <Stat label="Open tasks" value={String(client.tasks.length)} />
      </div>

      {/* Portal access */}
      <section className="matte rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <KeyRound size={16} className="text-brand" />
          <h2 className="font-display text-lg font-semibold">Portal access</h2>
        </div>
        <p className="mt-1 text-xs text-muted">
          Logins for this client to review &amp; approve content at /portal.
        </p>

        {client.users.length > 0 && (
          <ul className="mt-3 divide-y divide-border">
            {client.users.map((u) => (
              <li key={u.id} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium">{u.name}</div>
                  <div className="text-xs text-muted">{u.email}</div>
                </div>
                <form action={deleteClientUser}>
                  <input type="hidden" name="id" value={u.id} />
                  <input type="hidden" name="clientId" value={client.id} />
                  <ConfirmButton
                    message={`Remove portal access for ${u.email}?`}
                    ariaLabel="Remove access"
                    className="text-muted hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </ConfirmButton>
                </form>
              </li>
            ))}
          </ul>
        )}

        <form
          action={createClientUser}
          className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          <input type="hidden" name="clientId" value={client.id} />
          <input name="name" required placeholder="Contact name *" className={IN} />
          <input name="email" type="email" required placeholder="Login email *" className={IN} />
          <input name="password" type="password" required minLength={8} placeholder="Password (min 8) *" className={IN} autoComplete="new-password" />
          <button className="gradient-bg rounded-full px-4 py-2 text-sm font-semibold text-white">
            Add login
          </button>
        </form>
      </section>

      {/* Performance */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Performance</h2>
          <Link href="/admin/reports" className="text-sm font-medium text-brand">
            Add report
          </Link>
        </div>
        <ReportCharts reports={client.reports} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Projects" href="/admin/projects" empty="No projects yet">
          {client.projects.map((p) => (
            <Row
              key={p.id}
              title={p.name}
              sub={`${p.type}${p.dueDate ? ` · due ${fdate(p.dueDate)}` : ""}`}
              status={p.status}
            />
          ))}
        </Panel>

        <Panel title="Content" href="/admin/content" empty="No content yet">
          {client.content.slice(0, 8).map((c) => (
            <Row
              key={c.id}
              title={c.title}
              sub={`${c.platform}${c.scheduledFor ? ` · ${fdate(c.scheduledFor)}` : ""}`}
              status={c.status}
            />
          ))}
        </Panel>

        <Panel title="Invoices" href="/admin/payments" empty="No invoices yet">
          {client.invoices.map((i) => (
            <Row
              key={i.id}
              title={`#${i.number} · ${money(i.amount)}`}
              sub={i.dueDate ? `due ${fdate(i.dueDate)}` : ""}
              status={i.status}
            />
          ))}
        </Panel>

        <Panel title="Open tasks" href="/admin/tasks" empty="No open tasks">
          {client.tasks.map((t) => (
            <Row
              key={t.id}
              title={t.title}
              sub={t.dueDate ? `due ${fdate(t.dueDate)}` : ""}
            />
          ))}
        </Panel>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="matte rounded-2xl p-5">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
    </div>
  );
}

function Panel({
  title,
  href,
  empty,
  children,
}: {
  title: string;
  href: string;
  empty: string;
  children: React.ReactNode;
}) {
  const items = Array.isArray(children) ? children : [children];
  const hasItems = items.some(Boolean);
  return (
    <section className="matte rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <Link href={href} className="text-sm font-medium text-brand">
          Manage
        </Link>
      </div>
      {hasItems ? (
        <ul className="divide-y divide-border">{children}</ul>
      ) : (
        <p className="py-5 text-center text-sm text-muted">{empty}</p>
      )}
    </section>
  );
}

function Row({
  title,
  sub,
  status,
}: {
  title: string;
  sub?: string;
  status?: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{title}</div>
        {sub && <div className="truncate text-xs capitalize text-muted">{sub}</div>}
      </div>
      {status && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${badgeClass(status)}`}
        >
          {status}
        </span>
      )}
    </li>
  );
}
