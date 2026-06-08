"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  requireUser,
  str,
  strOrNull,
  intVal,
  dateOrNull,
} from "@/lib/admin";

export async function createProject(fd: FormData) {
  await requireUser();
  const clientId = str(fd, "clientId");
  const name = str(fd, "name");
  if (!clientId || !name) return;
  await prisma.project.create({
    data: {
      clientId,
      name,
      type: str(fd, "type") || "campaign",
      status: str(fd, "status") || "planning",
      budget: intVal(fd, "budget"),
      startDate: dateOrNull(fd, "startDate"),
      dueDate: dateOrNull(fd, "dueDate"),
      notes: strOrNull(fd, "notes"),
    },
  });
  revalidatePath("/admin/projects");
}

export async function updateProjectStatus(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !status) return;
  await prisma.project.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/admin/projects");
}

export async function deleteProject(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.project.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/projects");
}
