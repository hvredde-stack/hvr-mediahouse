"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, str, strOrNull, dateOrNull } from "@/lib/admin";

export async function createTask(fd: FormData) {
  await requireUser();
  const title = str(fd, "title");
  if (!title) return;
  await prisma.task.create({
    data: {
      title,
      clientId: strOrNull(fd, "clientId"),
      assigneeId: strOrNull(fd, "assigneeId"),
      dueDate: dateOrNull(fd, "dueDate"),
    },
  });
  revalidatePath("/admin/tasks");
}

export async function toggleTask(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const done = str(fd, "done") === "true";
  if (!id) return;
  await prisma.task.update({ where: { id }, data: { done } }).catch(() => {});
  revalidatePath("/admin/tasks");
}

export async function deleteTask(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.task.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/tasks");
}
