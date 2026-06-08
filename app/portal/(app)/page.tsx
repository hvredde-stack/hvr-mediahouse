import {
  CheckCircle2,
  ExternalLink,
  Clock,
  MessageSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { fdate } from "@/lib/admin";
import { approveContent, requestChanges } from "./actions";

export default async function PortalHome() {
  const { clientId } = await requirePortalClient();
  const items = await prisma.contentItem.findMany({
    where: { clientId, status: { not: "idea" } },
    orderBy: [
      { scheduledFor: { sort: "asc", nulls: "last" } },
      { createdAt: "desc" },
    ],
  });
  const pending = items.filter((i) => i.approval === "pending");
  const reviewed = items.filter((i) => i.approval !== "pending");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Your content</h1>
      <p className="mt-1 text-sm text-muted">
        Review what we&apos;ve planned for you and approve it — or tell us what to
        change.
      </p>

      {items.length === 0 ? (
        <div className="matte mt-6 rounded-2xl px-6 py-16 text-center text-sm text-muted">
          Nothing to review yet. We&apos;ll add content here as we plan it.
        </div>
      ) : (
        <>
          <Group
            title="Needs your review"
            count={pending.length}
            items={pending}
            empty="You're all caught up — nothing waiting on you."
          />
          <Group
            title="Reviewed"
            count={reviewed.length}
            items={reviewed}
            empty=""
          />
        </>
      )}
    </div>
  );
}

type Item = {
  id: string;
  title: string;
  platform: string;
  status: string;
  approval: string;
  clientComment: string | null;
  caption: string | null;
  assetUrl: string | null;
  scheduledFor: Date | null;
};

function Group({
  title,
  count,
  items,
  empty,
}: {
  title: string;
  count: number;
  items: Item[];
  empty: string;
}) {
  if (count === 0 && !empty) return null;
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {title} {count > 0 && `· ${count}`}
      </h2>
      {count === 0 ? (
        <p className="matte rounded-2xl px-6 py-8 text-center text-sm text-muted">
          {empty}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((c) => (
            <Card key={c.id} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}

function ApprovalBadge({ approval }: { approval: string }) {
  if (approval === "approved")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
        <CheckCircle2 size={12} /> Approved
      </span>
    );
  if (approval === "changes")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
        <MessageSquare size={12} /> Changes requested
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
      <Clock size={12} /> Awaiting you
    </span>
  );
}

function Card({ c }: { c: Item }) {
  return (
    <article className="matte flex flex-col rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold">{c.title}</h3>
            {c.assetUrl && (
              <a
                href={c.assetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-brand"
                aria-label="Open asset"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <div className="mt-0.5 text-xs capitalize text-muted">
            {c.platform}
            {c.scheduledFor ? ` · ${fdate(c.scheduledFor)}` : ""}
          </div>
        </div>
        <ApprovalBadge approval={c.approval} />
      </div>

      {c.caption && (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg/85">
          {c.caption}
        </p>
      )}

      {c.approval === "changes" && c.clientComment && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <span className="font-semibold">Your note:</span> {c.clientComment}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <form action={approveContent}>
          <input type="hidden" name="id" value={c.id} />
          <button className="gradient-bg inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white">
            <CheckCircle2 size={14} />
            {c.approval === "approved" ? "Approved" : "Approve"}
          </button>
        </form>
        <details className="group">
          <summary className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-bg-2">
            <MessageSquare size={14} /> Request changes
          </summary>
          <form
            action={requestChanges}
            className="mt-3 w-full rounded-xl border border-border bg-bg-2 p-3"
          >
            <input type="hidden" name="id" value={c.id} />
            <textarea
              name="comment"
              required
              rows={3}
              placeholder="What would you like changed?"
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
            <button className="mt-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
              Send to HVR
            </button>
          </form>
        </details>
      </div>
    </article>
  );
}
