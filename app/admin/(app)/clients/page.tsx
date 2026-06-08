import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  money,
  badgeClass,
  CLIENT_STATUSES,
  PLANS,
} from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { createClient, updateClientStatus, deleteClient } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { projects: true, content: true, invoices: true } },
    },
  });

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Clients</h1>
          <p className="mt-1 text-sm text-muted">
            {clients.length} {clients.length === 1 ? "client" : "clients"}
          </p>
        </div>
      </div>

      {/* Add client */}
      <details className="matte mt-5 rounded-2xl">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add a client
        </summary>
        <form
          action={createClient}
          className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <input name="name" required placeholder="Client / company name *" className={IN} />
          <input name="contactName" placeholder="Contact name" className={IN} />
          <input name="contactEmail" type="email" placeholder="Contact email" className={IN} />
          <input name="contactPhone" placeholder="Contact phone" className={IN} />
          <input name="platforms" placeholder="Platforms (Instagram, TikTok…)" className={IN} />
          <input name="retainer" inputMode="numeric" placeholder="Monthly retainer ($)" className={IN} />
          <select name="plan" defaultValue="" className={IN}>
            <option value="">Plan…</option>
            {PLANS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select name="status" defaultValue="onboarding" className={`${IN} capitalize`}>
            {CLIENT_STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
          <input name="startDate" type="date" className={IN} />
          <textarea name="notes" placeholder="Notes" rows={2} className={`${IN} sm:col-span-2 lg:col-span-3`} />
          <div className="sm:col-span-2 lg:col-span-3">
            <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">
              Save client
            </button>
          </div>
        </form>
      </details>

      {/* List */}
      <div className="mt-6 overflow-x-auto">
        {clients.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-16 text-center text-sm text-muted">
            No clients yet — add your first one above.
          </div>
        ) : (
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-1 font-medium">Client</th>
                <th className="px-4 py-1 font-medium">Plan</th>
                <th className="px-4 py-1 font-medium">Retainer</th>
                <th className="px-4 py-1 font-medium">Pipeline</th>
                <th className="px-4 py-1 font-medium">Status</th>
                <th className="px-4 py-1" />
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="matte">
                  <td className="rounded-l-xl px-4 py-3">
                    <Link href={`/admin/clients/${c.id}`} className="font-semibold hover:text-brand">
                      {c.name}
                    </Link>
                    {c.contactName && (
                      <div className="text-xs text-muted">{c.contactName}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{c.plan ?? "—"}</td>
                  <td className="px-4 py-3 font-medium">{money(c.retainer)}/mo</td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {c._count.projects}p · {c._count.content}c · {c._count.invoices}i
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateClientStatus}>
                      <input type="hidden" name="id" value={c.id} />
                      <SubmitSelect
                        name="status"
                        defaultValue={c.status}
                        options={CLIENT_STATUSES}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(c.status)}`}
                      />
                    </form>
                  </td>
                  <td className="rounded-r-xl px-4 py-3 text-right">
                    <form action={deleteClient} className="inline">
                      <input type="hidden" name="id" value={c.id} />
                      <ConfirmButton
                        message={`Delete ${c.name} and all their projects, content and invoices?`}
                        ariaLabel="Delete client"
                        className="text-muted hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
