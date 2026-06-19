import { BookOpen, Plus, Trash2, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { embeddingsEnabled } from "@/lib/embeddings";
import { fdate } from "@/lib/admin";
import { addKnowledge, deleteKnowledge } from "./actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Knowledge base",
  robots: { index: false, follow: false },
};

export default async function KnowledgePage() {
  const { clientId } = await requirePortalClient();
  const docs = await prisma.knowledgeDoc.findMany({
    where: { clientId },
    select: { id: true, content: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  const ready = embeddingsEnabled();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Knowledge base</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Add facts about your business — listings, pricing, areas you serve, hours,
        financing, FAQs. Your AI phone agent uses these to answer callers
        accurately. Keep each entry short and focused (one fact or Q&amp;A per entry).
      </p>

      {!ready && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>
            Entries are saved, but search isn&apos;t active yet — embeddings need an
            <span className="font-semibold"> OPENAI_API_KEY</span> configured. Contact HVR to switch it on.
          </span>
        </div>
      )}

      {/* Add */}
      <form action={addKnowledge} className="matte mt-6 rounded-2xl p-5">
        <label htmlFor="content" className="text-sm font-semibold">
          Add knowledge
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={3}
          maxLength={4000}
          placeholder="e.g. We serve Whitby, Oshawa, Ajax and Pickering. Free home valuations, no obligation. Office hours Mon–Sat 9am–7pm."
          className="mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm leading-relaxed focus:border-brand focus:outline-none"
        />
        <button className="gradient-bg mt-3 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white">
          <Plus size={15} /> Add entry
        </button>
      </form>

      {/* List */}
      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Your entries {docs.length > 0 && `· ${docs.length}`}
        </h2>

        {docs.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-14 text-center text-sm text-muted">
            <BookOpen size={26} className="mx-auto mb-3 text-muted/50" />
            No knowledge yet. Add your first fact above so your agent can answer
            callers about your business.
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((d) => (
              <article
                key={d.id}
                className="matte flex items-start justify-between gap-4 rounded-2xl p-5"
              >
                <div className="min-w-0">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg/90">
                    {d.content}
                  </p>
                  <p className="mt-2 text-xs text-muted">Added {fdate(d.createdAt)}</p>
                </div>
                <form action={deleteKnowledge}>
                  <input type="hidden" name="id" value={d.id} />
                  <button
                    aria-label="Delete entry"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors hover:border-red-300 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </form>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
