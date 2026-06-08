import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { money, monthLabel } from "@/lib/admin";
import { ConfirmButton } from "@/components/admin/Forms";
import { saveReport, deleteReport } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function ReportsPage() {
  const [reports, clients] = await Promise.all([
    prisma.report.findMany({
      orderBy: [{ month: "desc" }],
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reports</h1>
      <p className="mt-1 text-sm text-muted">
        Monthly performance per client. Clients see their own charts in the
        portal.
      </p>

      <details className="matte mt-5 rounded-2xl" open={reports.length === 0}>
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add / update a monthly report
        </summary>
        {clients.length === 0 ? (
          <p className="border-t border-border p-5 text-sm text-muted">
            Add a client first.
          </p>
        ) : (
          <form
            action={saveReport}
            className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <select name="clientId" required defaultValue="" className={IN}>
              <option value="" disabled>Client *</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input name="month" type="month" required className={IN} />
            <input name="followers" inputMode="numeric" placeholder="Followers" className={IN} />
            <input name="reach" inputMode="numeric" placeholder="Reach" className={IN} />
            <input name="engagements" inputMode="numeric" placeholder="Engagements" className={IN} />
            <input name="leads" inputMode="numeric" placeholder="Leads" className={IN} />
            <input name="spend" inputMode="numeric" placeholder="Ad spend ($)" className={IN} />
            <input name="notes" placeholder="Summary note (optional)" className={IN} />
            <div className="sm:col-span-2 lg:col-span-4">
              <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">
                Save report
              </button>
            </div>
          </form>
        )}
      </details>

      <div className="mt-6 overflow-x-auto">
        {reports.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-16 text-center text-sm text-muted">
            No reports yet.
          </div>
        ) : (
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-1 font-medium">Client</th>
                <th className="px-4 py-1 font-medium">Month</th>
                <th className="px-4 py-1 font-medium">Followers</th>
                <th className="px-4 py-1 font-medium">Reach</th>
                <th className="px-4 py-1 font-medium">Engage</th>
                <th className="px-4 py-1 font-medium">Leads</th>
                <th className="px-4 py-1 font-medium">Spend</th>
                <th className="px-4 py-1" />
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="matte">
                  <td className="rounded-l-xl px-4 py-3">
                    <Link href={`/admin/clients/${r.clientId}`} className="font-medium hover:text-brand">
                      {r.client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{monthLabel(r.month)}</td>
                  <td className="px-4 py-3">{r.followers.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.reach.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.engagements.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.leads.toLocaleString()}</td>
                  <td className="px-4 py-3">{money(r.spend)}</td>
                  <td className="rounded-r-xl px-4 py-3 text-right">
                    <form action={deleteReport} className="inline">
                      <input type="hidden" name="id" value={r.id} />
                      <ConfirmButton message="Delete this report?" ariaLabel="Delete report" className="text-muted hover:text-red-600">
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
