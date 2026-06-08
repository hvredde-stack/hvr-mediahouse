import Link from "next/link";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Tag,
  Wallet,
  Trash2,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { fdate, badgeClass, LEAD_STATUSES } from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { updateLeadStatus, deleteLead, convertLead } from "./actions";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Leads</h1>
      <p className="mt-1 text-sm text-muted">
        {leads.length} total · {counts.new ?? 0} new · {counts.won ?? 0} won
      </p>

      {leads.length === 0 ? (
        <div className="matte mt-6 rounded-2xl px-6 py-16 text-center text-sm text-muted">
          No leads yet. Enquiries from the website contact form land here.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {leads.map((lead) => (
            <article key={lead.id} className="matte rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold">{lead.name}</h3>
                    {lead.convertedClientId && (
                      <Link
                        href={`/admin/clients/${lead.convertedClientId}`}
                        className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                      >
                        Client →
                      </Link>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-fg">
                      <Mail size={14} /> {lead.email}
                    </a>
                    {lead.phone && (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone size={14} /> {lead.phone}
                      </span>
                    )}
                    {lead.company && (
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 size={14} /> {lead.company}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} /> {fdate(lead.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <form action={updateLeadStatus}>
                    <input type="hidden" name="id" value={lead.id} />
                    <SubmitSelect
                      name="status"
                      defaultValue={lead.status}
                      options={LEAD_STATUSES}
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(lead.status)}`}
                    />
                  </form>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <ConfirmButton message="Delete this lead?" ariaLabel="Delete lead" className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted hover:border-red-500/50 hover:text-red-600">
                      <Trash2 size={15} />
                    </ConfirmButton>
                  </form>
                </div>
              </div>

              {(lead.service || lead.budget) && (
                <div className="mt-3 flex flex-wrap gap-2">
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

              <p className="mt-3 whitespace-pre-wrap border-t border-border pt-3 text-sm leading-relaxed text-fg/90">
                {lead.message}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`mailto:${lead.email}?subject=Re: Your enquiry to HVR Media House`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-bg-2"
                >
                  <Mail size={14} /> Reply
                </a>
                {!lead.convertedClientId && (
                  <form action={convertLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button className="gradient-bg inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
                      <UserPlus size={14} /> Convert to client <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
