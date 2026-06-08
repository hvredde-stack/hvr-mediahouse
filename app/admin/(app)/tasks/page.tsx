import Link from "next/link";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { fdate } from "@/lib/admin";
import { ConfirmButton } from "@/components/admin/Forms";
import { createTask, toggleTask, deleteTask } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function TasksPage() {
  const [tasks, clients, users] = await Promise.all([
    prisma.task.findMany({
      orderBy: [{ done: "asc" }, { dueDate: { sort: "asc", nulls: "last" } }],
      include: {
        client: { select: { id: true, name: true } },
        assignee: { select: { name: true } },
      },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Tasks</h1>
      <p className="mt-1 text-sm text-muted">{open.length} open</p>

      <details className="matte mt-5 rounded-2xl" open={tasks.length === 0}>
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add a task
        </summary>
        <form action={createTask} className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-4">
          <input name="title" required placeholder="What needs doing? *" className={`${IN} sm:col-span-2`} />
          <select name="clientId" defaultValue="" className={IN}>
            <option value="">Client (optional)</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="assigneeId" defaultValue="" className={IN}>
            <option value="">Assignee (optional)</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <input name="dueDate" type="date" className={IN} />
          <div className="sm:col-span-2 lg:col-span-4">
            <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">Add task</button>
          </div>
        </form>
      </details>

      <div className="mt-6 space-y-2">
        {[...open, ...done].map((t) => (
          <div key={t.id} className="matte flex items-center gap-3 rounded-xl px-4 py-3">
            <form action={toggleTask} className="flex">
              <input type="hidden" name="id" value={t.id} />
              <input type="hidden" name="done" value={(!t.done).toString()} />
              <button type="submit" aria-label="Toggle done" className={t.done ? "text-emerald-600" : "text-muted hover:text-brand"}>
                {t.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </button>
            </form>
            <div className="min-w-0 flex-1">
              <div className={`text-sm font-medium ${t.done ? "text-muted line-through" : ""}`}>{t.title}</div>
              <div className="flex flex-wrap gap-x-3 text-xs text-muted">
                {t.client && (
                  <Link href={`/admin/clients/${t.client.id}`} className="hover:text-brand">{t.client.name}</Link>
                )}
                {t.assignee && <span>{t.assignee.name}</span>}
                {t.dueDate && <span>due {fdate(t.dueDate)}</span>}
              </div>
            </div>
            <form action={deleteTask}>
              <input type="hidden" name="id" value={t.id} />
              <ConfirmButton message="Delete this task?" ariaLabel="Delete task" className="text-muted hover:text-red-600">
                <Trash2 size={16} />
              </ConfirmButton>
            </form>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="matte rounded-2xl px-6 py-16 text-center text-sm text-muted">No tasks yet.</div>
        )}
      </div>
    </div>
  );
}
