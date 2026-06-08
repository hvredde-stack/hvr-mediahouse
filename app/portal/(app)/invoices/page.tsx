import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { money, fdate, badgeClass } from "@/lib/admin";

export default async function PortalInvoices() {
  const { clientId } = await requirePortalClient();
  const invoices = await prisma.invoice.findMany({
    where: { clientId, status: { not: "draft" } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Invoices</h1>
      <p className="mt-1 text-sm text-muted">Your billing with HVR Media House.</p>

      <div className="mt-6 overflow-x-auto">
        {invoices.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-16 text-center text-sm text-muted">
            No invoices yet.
          </div>
        ) : (
          <table className="w-full min-w-[520px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-1 font-medium">Invoice</th>
                <th className="px-4 py-1 font-medium">Amount</th>
                <th className="px-4 py-1 font-medium">Due</th>
                <th className="px-4 py-1 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="matte">
                  <td className="rounded-l-xl px-4 py-3 font-semibold">
                    #{i.number}
                  </td>
                  <td className="px-4 py-3">{money(i.amount)}</td>
                  <td className="px-4 py-3 text-muted">{fdate(i.dueDate)}</td>
                  <td className="rounded-r-xl px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(i.status)}`}
                    >
                      {i.status}
                    </span>
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
