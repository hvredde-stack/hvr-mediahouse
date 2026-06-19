import { Phone, PhoneIncoming, PhoneOutgoing, CalendarCheck, UserCheck, ArrowRightLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { fdate } from "@/lib/admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leads & calls",
  robots: { index: false, follow: false },
};

type Turn = { role?: string; content?: string };

export default async function LeadsPage() {
  const { clientId } = await requirePortalClient();
  const calls = await prisma.voiceCall.findMany({
    where: { clientId },
    include: { lead: true },
    orderBy: { startedAt: "desc" },
    take: 100,
  });
  const leadCount = await prisma.voiceLead.count({ where: { clientId } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Leads &amp; calls</h1>
      <p className="mt-1 text-sm text-muted">
        Every AI call, who it was with, and what happened — {leadCount} lead
        {leadCount === 1 ? "" : "s"} captured.
      </p>

      {calls.length === 0 ? (
        <div className="matte mt-6 rounded-2xl px-6 py-16 text-center text-sm text-muted">
          <Phone size={26} className="mx-auto mb-3 text-muted/50" />
          No calls yet. When a lead comes in or someone calls your number, it shows up here.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {calls.map((c) => {
            const turns = (Array.isArray(c.transcript) ? c.transcript : []) as Turn[];
            const convo = turns.filter((t) => t.role === "user" || t.role === "assistant");
            return (
              <article key={c.id} className="matte rounded-2xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {c.direction === "inbound" ? (
                        <PhoneIncoming size={15} className="text-brand" />
                      ) : (
                        <PhoneOutgoing size={15} className="text-brand" />
                      )}
                      <h3 className="font-display font-semibold">
                        {c.lead?.name || "Unknown caller"}
                      </h3>
                      {c.lead?.phone && (
                        <span className="text-sm text-muted">· {c.lead.phone}</span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs capitalize text-muted">
                      {c.direction || "call"} · {fdate(c.startedAt)}
                    </div>
                  </div>
                  <OutcomeBadge outcome={c.outcome} />
                </div>

                {c.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-fg/85">{c.summary}</p>
                )}

                {convo.length > 0 && (
                  <details className="group mt-3">
                    <summary className="cursor-pointer text-xs font-semibold text-brand">
                      View transcript ({convo.length} turns)
                    </summary>
                    <div className="mt-2 space-y-1.5 rounded-xl border border-border bg-bg-2 p-3">
                      {convo.map((t, i) => (
                        <p key={i} className="text-sm leading-snug">
                          <span className="font-semibold capitalize text-muted">
                            {t.role === "assistant" ? "Agent" : "Caller"}:
                          </span>{" "}
                          <span className="text-fg/85">{t.content}</span>
                        </p>
                      ))}
                    </div>
                  </details>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function OutcomeBadge({ outcome }: { outcome: string | null }) {
  const map: Record<string, { label: string; cls: string; Icon: typeof CalendarCheck }> = {
    booked: { label: "Booked", cls: "bg-emerald-100 text-emerald-700", Icon: CalendarCheck },
    qualified: { label: "Qualified", cls: "bg-blue-100 text-blue-700", Icon: UserCheck },
    transferred: { label: "Transferred", cls: "bg-amber-100 text-amber-700", Icon: ArrowRightLeft },
  };
  const m = map[outcome ?? ""] ?? { label: "Completed", cls: "bg-bg-2 text-muted", Icon: Phone };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${m.cls}`}>
      <m.Icon size={12} /> {m.label}
    </span>
  );
}
