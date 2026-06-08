import { monthLabel } from "@/lib/admin";

type R = {
  month: Date;
  followers: number;
  reach: number;
  engagements: number;
  leads: number;
  spend: number;
};

const METRICS: {
  key: "followers" | "reach" | "engagements" | "leads";
  label: string;
}[] = [
  { key: "followers", label: "Followers" },
  { key: "reach", label: "Reach" },
  { key: "engagements", label: "Engagements" },
  { key: "leads", label: "Leads" },
];

/** Pure-CSS monthly trend charts. `reports` must be ascending by month. */
export function ReportCharts({ reports }: { reports: R[] }) {
  if (reports.length === 0) {
    return (
      <p className="matte rounded-2xl px-6 py-10 text-center text-sm text-muted">
        No reports yet.
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {METRICS.map((m) => (
        <MiniChart
          key={m.key}
          label={m.label}
          series={reports.map((r) => ({ month: r.month, value: r[m.key] }))}
        />
      ))}
    </div>
  );
}

function MiniChart({
  label,
  series,
}: {
  label: string;
  series: { month: Date; value: number }[];
}) {
  const max = Math.max(1, ...series.map((s) => s.value));
  const latest = series[series.length - 1]?.value ?? 0;
  const prev = series.length >= 2 ? series[series.length - 2].value : null;
  const delta = prev != null ? latest - prev : null;
  return (
    <div className="matte rounded-2xl p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        {delta != null && (
          <span
            className={`text-xs font-semibold ${
              delta >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {delta >= 0 ? "+" : ""}
            {delta.toLocaleString()}
          </span>
        )}
      </div>
      <div className="mt-1 font-display text-xl font-bold">
        {latest.toLocaleString()}
      </div>
      <div className="mt-3 flex h-16 items-end gap-1">
        {series.map((s, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-brand/70"
            style={{ height: `${Math.max(4, (s.value / max) * 100)}%` }}
            title={`${monthLabel(s.month)}: ${s.value.toLocaleString()}`}
          />
        ))}
      </div>
    </div>
  );
}
