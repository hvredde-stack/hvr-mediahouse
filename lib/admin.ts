import { redirect } from "next/navigation";
import { getSessionUser, type SessionUser } from "@/lib/auth";

/** Page-level guard for the team admin: returns the user or redirects. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (user.role === "client") redirect("/portal"); // clients use the portal
  return user;
}

/** Requires the logged-in user to hold one of the given roles. */
export async function requireRole(
  roles: readonly string[],
): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect("/admin");
  return user;
}

export function canManageTeam(role: string): boolean {
  return role === "owner" || role === "admin";
}

/** Canonical invoice money math — used everywhere so figures always agree. */
export function invoiceTotals(
  invoices: { status: string; amount: number; dueDate: Date | null }[],
): { paid: number; outstanding: number; overdue: number } {
  const now = Date.now();
  let paid = 0;
  let outstanding = 0;
  let overdue = 0;
  for (const i of invoices) {
    if (i.status === "paid") {
      paid += i.amount;
    } else if (i.status === "sent" || i.status === "overdue") {
      outstanding += i.amount; // billed but not paid (drafts excluded)
      const isOverdue =
        i.status === "overdue" ||
        (i.dueDate != null && i.dueDate.getTime() < now);
      if (isOverdue) overdue += i.amount;
    }
  }
  return { paid, outstanding, overdue };
}

export function money(n: number | null | undefined): string {
  return "$" + (n ?? 0).toLocaleString("en-US");
}

export function fdate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** value for an <input type="date"> */
export function dateInput(d: Date | string | null | undefined): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export const CLIENT_STATUSES = [
  "onboarding",
  "active",
  "paused",
  "churned",
] as const;
export const PROJECT_STATUSES = [
  "planning",
  "active",
  "review",
  "complete",
  "on-hold",
] as const;
export const PROJECT_TYPES = ["campaign", "retainer", "one-off"] as const;
export const CONTENT_STATUSES = [
  "idea",
  "drafting",
  "scheduled",
  "published",
] as const;
export const INVOICE_STATUSES = ["draft", "sent", "paid", "overdue"] as const;
export const LEAD_STATUSES = ["new", "contacted", "won", "lost"] as const;
export const PLATFORMS = [
  "instagram",
  "tiktok",
  "youtube",
  "facebook",
  "other",
] as const;
export const PLANS = ["Starter", "Growth", "Scale", "Custom"] as const;
export const ROLES = ["owner", "admin", "member"] as const;

/** Tailwind classes for a status pill. */
export function badgeClass(status: string): string {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    complete: "bg-emerald-100 text-emerald-700",
    published: "bg-emerald-100 text-emerald-700",
    paid: "bg-emerald-100 text-emerald-700",
    won: "bg-emerald-100 text-emerald-700",
    new: "bg-blue-100 text-blue-700",
    scheduled: "bg-blue-100 text-blue-700",
    planning: "bg-blue-100 text-blue-700",
    sent: "bg-blue-100 text-blue-700",
    onboarding: "bg-amber-100 text-amber-700",
    drafting: "bg-amber-100 text-amber-700",
    review: "bg-amber-100 text-amber-700",
    contacted: "bg-amber-100 text-amber-700",
    "on-hold": "bg-amber-100 text-amber-700",
    draft: "bg-amber-100 text-amber-700",
    overdue: "bg-red-100 text-red-700",
    churned: "bg-red-100 text-red-700",
    lost: "bg-red-100 text-red-700",
    idea: "bg-bg-2 text-muted",
    paused: "bg-bg-2 text-muted",
  };
  return map[status] ?? "bg-bg-2 text-muted";
}

/* ── FormData parsing helpers (for server actions) ─────────────────── */
export function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}
export function strOrNull(fd: FormData, key: string): string | null {
  return str(fd, key) || null;
}
export function intVal(fd: FormData, key: string): number {
  // digits only → never negative, never keeps stray dashes/symbols
  const n = parseInt(str(fd, key).replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}
export function dateOrNull(fd: FormData, key: string): Date | null {
  const s = str(fd, key);
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
