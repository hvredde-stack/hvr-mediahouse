"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { str } from "@/lib/admin";

export async function approveContent(fd: FormData) {
  const { clientId } = await requirePortalClient();
  const id = str(fd, "id");
  if (!id) return;
  // updateMany with the clientId in the WHERE enforces ownership.
  await prisma.contentItem.updateMany({
    where: { id, clientId },
    data: { approval: "approved", clientComment: null },
  });
  revalidatePath("/portal");
}

export async function requestChanges(fd: FormData) {
  const { clientId } = await requirePortalClient();
  const id = str(fd, "id");
  const comment = str(fd, "comment").slice(0, 1000);
  if (!id) return;
  await prisma.contentItem.updateMany({
    where: { id, clientId },
    data: { approval: "changes", clientComment: comment || null },
  });
  revalidatePath("/portal");
}
