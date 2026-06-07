"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Search,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Tag,
  Wallet,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const STATUSES = [
  { key: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  {
    key: "contacted",
    label: "Contacted",
    color: "bg-amber-100 text-amber-700",
  },
  { key: "won", label: "Won", color: "bg-green-100 text-green-700" },
  { key: "lost", label: "Lost", color: "bg-red-100 text-red-700" },
];

function statusColor(status: string) {
  return STATUSES.find((s) => s.key === status)?.color ?? "bg-bg-2 text-muted";
}

export function AdminDashboard({
  leads: initial,
  dbError = false,
}: {
  leads: Lead[];
  dbError?: boolean;
}) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initial);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    for (const s of STATUSES) c[s.key] = 0;
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!q) return true;
      return [l.name, l.email, l.company, l.message, l.service]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    });
  }, [leads, filter, query]);

  async function updateStatus(id: string, status: string) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l)),
    );
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => router.refresh());
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" }).catch(() =>
      router.refresh(),
    );
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="glass sticky top-0 z-40 border-b border-border">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-bg-2 px-2.5 py-0.5 text-xs font-medium text-muted sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden text-sm text-muted transition-colors hover:text-fg sm:block"
            >
              View site
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="container-page py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Leads</h1>
          <p className="mt-1 text-muted">
            Inquiries from your website contact form.
          </p>
        </div>

        {dbError && (
          <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-800">
            <p className="font-semibold">Database not connected</p>
            <p className="mt-1 text-amber-700">
              This deployment has no database configured, so leads can&apos;t be
              loaded or saved yet. Add a <code>DATABASE_URL</code> (and{" "}
              <code>DATABASE_AUTH_TOKEN</code>) in your Vercel project settings,
              then redeploy to enable lead capture.
            </p>
          </div>
        )}

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <StatCard label="Total" value={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
          {STATUSES.map((s) => (
            <StatCard
              key={s.key}
              label={s.label}
              value={counts[s.key] ?? 0}
              active={filter === s.key}
              onClick={() => setFilter(s.key)}
            />
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, company…"
            className="w-full rounded-full border border-border bg-bg-2 py-2.5 pl-10 pr-4 text-sm focus:border-brand-purple/60 focus:outline-none"
          />
        </div>

        {/* Leads */}
        {visible.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-16 text-center text-muted">
            No leads here yet.
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onStatus={updateStatus}
                onDelete={remove}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-all ${
        active
          ? "border-brand-purple/50 bg-brand-soft"
          : "border-border bg-white/5 hover:bg-white/10"
      }`}
    >
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </button>
  );
}

function LeadCard({
  lead,
  onStatus,
  onDelete,
}: {
  lead: Lead;
  onStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const date = new Date(lead.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className="matte rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg font-semibold">{lead.name}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor(
                lead.status,
              )}`}
            >
              {lead.status}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-1.5 hover:text-fg"
            >
              <Mail size={14} /> {lead.email}
            </a>
            {lead.phone && (
              <a
                href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-1.5 hover:text-fg"
              >
                <Phone size={14} /> {lead.phone}
              </a>
            )}
            {lead.company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={14} /> {lead.company}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} /> {date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={lead.status}
            onChange={(e) => onStatus(lead.id, e.target.value)}
            className="rounded-lg border border-border bg-bg-2 px-3 py-1.5 text-sm focus:border-brand-purple/60 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.key} value={s.key} className="bg-bg-2">
                {s.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => onDelete(lead.id)}
            aria-label="Delete lead"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {(lead.service || lead.budget) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {lead.service && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-2 px-3 py-1 text-xs text-fg/80">
              <Tag size={12} /> {lead.service}
            </span>
          )}
          {lead.budget && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-2 px-3 py-1 text-xs text-fg/80">
              <Wallet size={12} /> {lead.budget}
            </span>
          )}
        </div>
      )}

      <p className="mt-4 whitespace-pre-wrap border-t border-border pt-4 text-sm leading-relaxed text-fg/90">
        {lead.message}
      </p>

      <div className="mt-4">
        <a
          href={`mailto:${lead.email}?subject=Re: Your inquiry to HVR Media House`}
          className="gradient-bg inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          <Mail size={14} /> Reply
        </a>
      </div>
    </article>
  );
}
