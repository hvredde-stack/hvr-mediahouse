import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { monthLabel } from "@/lib/admin";
import { ReportCharts } from "@/components/ReportCharts";

export default async function PortalReports() {
  const { clientId } = await requirePortalClient();
  const reports = await prisma.report.findMany({
    where: { clientId },
    orderBy: { month: "asc" },
  });
  const latest = reports[reports.length - 1];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Your performance</h1>
      <p className="mt-1 text-sm text-muted">
        How your channels are tracking month over month.
      </p>

      {reports.length === 0 ? (
        <div className="matte mt-6 rounded-2xl px-6 py-16 text-center text-sm text-muted">
          Your first monthly report will appear here soon.
        </div>
      ) : (
        <>
          <div className="mt-6">
            <ReportCharts reports={reports} />
          </div>
          {latest?.notes && (
            <div className="matte mt-5 rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {monthLabel(latest.month)} summary
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-fg/85">
                {latest.notes}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
