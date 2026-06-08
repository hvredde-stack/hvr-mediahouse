"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  requireUser,
  str,
  strOrNull,
  intVal,
  dateOrNull,
} from "@/lib/admin";

export async function createClient(fd: FormData) {
  await requireUser();
  const name = str(fd, "name");
  if (!name) return;
  await prisma.client.create({
    data: {
      name,
      contactName: strOrNull(fd, "contactName"),
      contactEmail: strOrNull(fd, "contactEmail"),
      contactPhone: strOrNull(fd, "contactPhone"),
      platforms: strOrNull(fd, "platforms"),
      plan: strOrNull(fd, "plan"),
      retainer: intVal(fd, "retainer"),
      status: str(fd, "status") || "onboarding",
      startDate: dateOrNull(fd, "startDate"),
      notes: strOrNull(fd, "notes"),
    },
  });
  revalidatePath("/admin/clients");
  revalidatePath("/admin");
}

export async function updateClientStatus(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !status) return;
  await prisma.client.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
}

export async function deleteClient(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.client.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}
