import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  money,
  fdate,
  badgeClass,
  PROJECT_STATUSES,
  PROJECT_TYPES,
} from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { createProject, updateProjectStatus, deleteProject } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function ProjectsPage() {
  const [projects, clients] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Projects</h1>
      <p className="mt-1 text-sm text-muted">
        {projects.length} {projects.length === 1 ? "project" : "projects"}
      </p>

      <details className="matte mt-5 rounded-2xl">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add a project
        </summary>
        {clients.length === 0 ? (
          <p className="border-t border-border p-5 text-sm text-muted">
            Add a client first, then you can create projects for them.
          </p>
        ) : (
          <form
            action={createProject}
            className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <select name="clientId" required defaultValue="" className={IN}>
              <option value="" disabled>Client *</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input name="name" required placeholder="Project name *" className={IN} />
            <select name="type" defaultValue="campaign" className={`${IN} capitalize`}>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select name="status" defaultValue="planning" className={`${IN} capitalize`}>
              {PROJECT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input name="budget" inputMode="numeric" placeholder="Budget ($)" className={IN} />
            <input name="dueDate" type="date" className={IN} />
            <textarea name="notes" placeholder="Notes" rows={2} className={`${IN} sm:col-span-2 lg:col-span-3`} />
            <div className="sm:col-span-2 lg:col-span-3">
              <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">
                Save project
              </button>
            </div>
          </form>
        )}
      </details>

      <div className="mt-6 overflow-x-auto">
        {projects.length === 0 ? (
          <div className="matte rounded-2xl px-6 py-16 text-center text-sm text-muted">
            No projects yet.
          </div>
        ) : (
          <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-1 font-medium">Project</th>
                <th className="px-4 py-1 font-medium">Type</th>
                <th className="px-4 py-1 font-medium">Due</th>
                <th className="px-4 py-1 font-medium">Budget</th>
                <th className="px-4 py-1 font-medium">Status</th>
                <th className="px-4 py-1" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="matte">
                  <td className="rounded-l-xl px-4 py-3">
                    <div className="font-semibold">{p.name}</div>
                    <Link href={`/admin/clients/${p.clientId}`} className="text-xs text-muted hover:text-brand">
                      {p.client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 capitalize text-muted">{p.type}</td>
                  <td className="px-4 py-3 text-muted">{fdate(p.dueDate)}</td>
                  <td className="px-4 py-3">{p.budget ? money(p.budget) : "—"}</td>
                  <td className="px-4 py-3">
                    <form action={updateProjectStatus}>
                      <input type="hidden" name="id" value={p.id} />
                      <SubmitSelect
                        name="status"
                        defaultValue={p.status}
                        options={PROJECT_STATUSES}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(p.status)}`}
                      />
                    </form>
                  </td>
                  <td className="rounded-r-xl px-4 py-3 text-right">
                    <form action={deleteProject} className="inline">
                      <input type="hidden" name="id" value={p.id} />
                      <ConfirmButton message="Delete this project?" ariaLabel="Delete project" className="text-muted hover:text-red-600">
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
