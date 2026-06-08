import { Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser, fdate, badgeClass, ROLES } from "@/lib/admin";
import { SubmitSelect, ConfirmButton } from "@/components/admin/Forms";
import { createUser, updateUserRole, deleteUser } from "./actions";

const IN =
  "w-full rounded-lg border border-border bg-bg-2 px-3 py-2 text-sm focus:border-brand focus:outline-none";

export default async function TeamPage() {
  const me = await requireUser();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Team</h1>
      <p className="mt-1 text-sm text-muted">
        {users.length} {users.length === 1 ? "member" : "members"}
      </p>

      <details className="matte mt-5 rounded-2xl">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 text-sm font-semibold">
          <Plus size={16} className="text-brand" /> Add a team member
        </summary>
        <form action={createUser} className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-4">
          <input name="name" required placeholder="Name *" className={IN} />
          <input name="email" type="email" required placeholder="Email *" className={IN} />
          <input name="password" type="password" required minLength={8} placeholder="Password (min 8) *" className={IN} autoComplete="new-password" />
          <select name="role" defaultValue="member" className={`${IN} capitalize`}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="sm:col-span-2 lg:col-span-4">
            <button className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white">Add member</button>
          </div>
        </form>
      </details>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-1 font-medium">Member</th>
              <th className="px-4 py-1 font-medium">Role</th>
              <th className="px-4 py-1 font-medium">Added</th>
              <th className="px-4 py-1" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = u.id === me.id;
              return (
                <tr key={u.id} className="matte">
                  <td className="rounded-l-xl px-4 py-3">
                    <div className="font-semibold">
                      {u.name}
                      {isSelf && <span className="ml-2 text-xs text-muted">(you)</span>}
                    </div>
                    <div className="text-xs text-muted">{u.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {isSelf ? (
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badgeClass(u.role)}`}>{u.role}</span>
                    ) : (
                      <form action={updateUserRole}>
                        <input type="hidden" name="id" value={u.id} />
                        <SubmitSelect name="role" defaultValue={u.role} options={ROLES} />
                      </form>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{fdate(u.createdAt)}</td>
                  <td className="rounded-r-xl px-4 py-3 text-right">
                    {!isSelf && (
                      <form action={deleteUser} className="inline">
                        <input type="hidden" name="id" value={u.id} />
                        <ConfirmButton message={`Remove ${u.name}?`} ariaLabel="Remove member" className="text-muted hover:text-red-600">
                          <Trash2 size={16} />
                        </ConfirmButton>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
