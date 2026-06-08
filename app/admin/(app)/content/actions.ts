"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, str, strOrNull, dateOrNull } from "@/lib/admin";

export async function createContent(fd: FormData) {
  await requireUser();
  const clientId = str(fd, "clientId");
  const title = str(fd, "title");
  if (!clientId || !title) return;
  await prisma.contentItem.create({
    data: {
      clientId,
      title,
      platform: str(fd, "platform") || "instagram",
      status: str(fd, "status") || "idea",
      caption: strOrNull(fd, "caption"),
      assetUrl: strOrNull(fd, "assetUrl"),
      scheduledFor: dateOrNull(fd, "scheduledFor"),
      notes: strOrNull(fd, "notes"),
    },
  });
  revalidatePath("/admin/content");
  revalidatePath("/admin");
}

export async function updateContentStatus(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !status) return;
  await prisma.contentItem
    .update({ where: { id }, data: { status } })
    .catch(() => {});
  revalidatePath("/admin/content");
  revalidatePath("/admin");
}

export async function deleteContent(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.contentItem.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/content");
}
