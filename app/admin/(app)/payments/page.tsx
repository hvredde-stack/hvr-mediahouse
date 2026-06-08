import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  money,
  fdate,
  badgeClass,
  invoiceTotals,
  INVOICE_STATUSES,
} from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { createInvoice, updateInvoiceStatus, deleteInvoice } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function PaymentsPage() {
  const [invoices, clients] = await Promise.all([
    prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const { paid, outstanding, overdue } = invoiceTotals(invoices);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Payments</h1>
      <p className="mt-1 text-sm text-muted">{invoices.length} invoices</p>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="matte rounded-2xl p-5">
          <div className="text-xs text-muted">Paid</div>
          <div className="mt-1 font-display text-xl font-bold text-emerald-600">{money(paid)}</div>
        </div>
        <div className="matte rounded-2xl p-5">
          <div className="text-xs text-muted">Outstanding</div>
          <div className="mt-1 font-display text-xl font-bold">{money(outstanding)}</div>
        </div>
        <div className="matte rounded-2xl p-5">
          <div className="text-xs text-muted">Overdue</div>
          <div className={`mt-1 font-display text-xl font-bold ${overdue ? "text-red-600" : ""}`}>{money(overdue)}</div>
        </div>
      </div>

      <details className="matte mt-5 rounded-2xl">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add an invoice
        </summary>
        {clients.length === 0 ? (
          <p className="border-t border-border p-5 text-sm text-muted">Add a client first.</p>
        ) : (
          <form action={createInvoice} className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-3">
            <select name="clientId" required defaultValue="" className={IN}>
              <option value="" disabled>Client *</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input name="number" placeholder="Invoice # (auto if blank)" className={IN} />
            <input name="amount" inputMode="numeric" placeholder="Amount ($) *" className={IN} />
            <select name="status" defaultValue="draft" className={`${IN} capitalize`}>
              {INVOICE_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input name="issueDate" type="date" className={IN} />
            <input name="dueDate" type="date" className={IN} />
            <div className="sm:col-span-2 lg:col-span-3">
              <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">Save invoice</button>
            </div>
          </form>
        )}
      </details>

      <div className="mt-6 overflow-x-auto">
        {invoices.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-16 text-center text-sm text-muted">No invoices yet.</div>
        ) : (
          <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-1 font-medium">Invoice</th>
                <th className="px-4 py-1 font-medium">Client</th>
                <th className="px-4 py-1 font-medium">Amount</th>
                <th className="px-4 py-1 font-medium">Due</th>
                <th className="px-4 py-1 font-medium">Status</th>
                <th className="px-4 py-1" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="matte">
                  <td className="rounded-l-xl px-4 py-3 font-semibold">#{i.number}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/clients/${i.clientId}`} className="text-muted hover:text-brand">
                      {i.client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium">{money(i.amount)}</td>
                  <td className="px-4 py-3 text-muted">{fdate(i.dueDate)}</td>
                  <td className="px-4 py-3">
                    <form action={updateInvoiceStatus}>
                      <input type="hidden" name="id" value={i.id} />
                      <SubmitSelect
                        name="status"
                        defaultValue={i.status}
                        options={INVOICE_STATUSES}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(i.status)}`}
                      />
                    </form>
                  </td>
                  <td className="rounded-r-xl px-4 py-3 text-right">
                    <form action={deleteInvoice} className="inline">
                      <input type="hidden" name="id" value={i.id} />
                      <ConfirmButton message="Delete this invoice?" ariaLabel="Delete invoice" className="text-muted hover:text-red-600">
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
