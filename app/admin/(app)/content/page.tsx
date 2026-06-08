import Link from "next/link";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  fdate,
  badgeClass,
  CONTENT_STATUSES,
  PLATFORMS,
} from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { createContent, updateContentStatus, deleteContent } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function ContentPage() {
  const [items, clients] = await Promise.all([
    prisma.contentItem.findMany({
      orderBy: [{ scheduledFor: { sort: "asc", nulls: "last" } }, { createdAt: "desc" }],
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const scheduled = items.filter((i) => i.scheduledFor);
  const ideas = items.filter((i) => !i.scheduledFor);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Content calendar</h1>
      <p className="mt-1 text-sm text-muted">
        {scheduled.length} scheduled · {ideas.length} ideas
      </p>

      <details className="matte mt-5 rounded-2xl">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add content / idea
        </summary>
        {clients.length === 0 ? (
          <p className="border-t border-border p-5 text-sm text-muted">
            Add a client first, then you can plan content for them.
          </p>
        ) : (
          <form
            action={createContent}
            className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <select name="clientId" required defaultValue="" className={IN}>
              <option value="" disabled>Client *</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input name="title" required placeholder="Title / hook *" className={IN} />
            <select name="platform" defaultValue="instagram" className={`${IN} capitalize`}>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select name="status" defaultValue="idea" className={`${IN} capitalize`}>
              {CONTENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input name="scheduledFor" type="date" className={IN} />
            <input name="assetUrl" placeholder="Asset link (Drive/Dropbox)" className={IN} />
            <textarea name="caption" placeholder="Caption" rows={2} className={`${IN} sm:col-span-2 lg:col-span-3`} />
            <div className="sm:col-span-2 lg:col-span-3">
              <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </form>
        )}
      </details>

      <Section title="Scheduled & published" items={scheduled} />
      <Section title="Ideas backlog" items={ideas} />
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
  scheduledFor: Date | null;
  assetUrl: string | null;
  clientId: string;
  client: { id: string; name: string };
};

function Section({ title, items }: { title: string; items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-7">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-sm">
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="matte">
                <td className="rounded-l-xl px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    {c.title}
                    {c.assetUrl && (
                      <a href={c.assetUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-brand">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <Link href={`/admin/clients/${c.clientId}`} className="text-xs text-muted hover:text-brand">
                    {c.client.name}
                  </Link>
                  {c.approval === "approved" && (
                    <span className="mt-0.5 block text-xs font-medium text-emerald-600">
                      Client approved
                    </span>
                  )}
                  {c.approval === "changes" && (
                    <span className="mt-0.5 block text-xs font-medium text-amber-600">
                      Changes requested
                      {c.clientComment ? `: ${c.clientComment}` : ""}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 capitalize text-muted">{c.platform}</td>
                <td className="px-4 py-3 text-muted">{fdate(c.scheduledFor)}</td>
                <td className="px-4 py-3">
                  <form action={updateContentStatus}>
                    <input type="hidden" name="id" value={c.id} />
                    <SubmitSelect
                      name="status"
                      defaultValue={c.status}
                      options={CONTENT_STATUSES}
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(c.status)}`}
                    />
                  </form>
                </td>
                <td className="rounded-r-xl px-4 py-3 text-right">
                  <form action={deleteContent} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <ConfirmButton message="Delete this content item?" ariaLabel="Delete content" className="text-muted hover:text-red-600">
                      <Trash2 size={16} />
                    </ConfirmButton>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
