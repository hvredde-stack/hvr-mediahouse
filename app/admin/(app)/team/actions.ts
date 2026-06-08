"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, str, ROLES } from "@/lib/admin";
import { hashPassword } from "@/lib/auth";

const MANAGERS = ["owner", "admin"] as const;

export async function createUser(fd: FormData) {
  await requireRole(MANAGERS);
  const name = str(fd, "name");
  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");
  const role = str(fd, "role") || "member";
  if (!name || !email || password.length < 8) return;
  if (!(ROLES as readonly string[]).includes(role)) return;
  await prisma.user
    .create({ data: { name, email, role, passwordHash: hashPassword(password) } })
    .catch(() => {}); // ignore duplicate email
  revalidatePath("/admin/team");
}

export async function updateUserRole(fd: FormData) {
  const me = await requireRole(MANAGERS);
  const id = str(fd, "id");
  const role = str(fd, "role");
  if (!id || id === me.id) return; // can't change your own role here
  if (!(ROLES as readonly string[]).includes(role)) return;
  await prisma.user.update({ where: { id }, data: { role } }).catch(() => {});
  revalidatePath("/admin/team");
}

export async function deleteUser(fd: FormData) {
  const me = await requireRole(MANAGERS);
  const id = str(fd, "id");
  if (!id || id === me.id) return; // can't delete yourself
  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "owner") {
    const owners = await prisma.user.count({ where: { role: "owner" } });
    if (owners <= 1) return; // never remove the last owner
  }
  await prisma.user.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/team");
}
