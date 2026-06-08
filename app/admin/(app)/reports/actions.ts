"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, str, strOrNull, intVal } from "@/lib/admin";

function monthDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}$/.test(value)) return null;
  const [y, m] = value.split("-").map(Number);
  if (!y || !m || m < 1 || m > 12) return null;
  return new Date(Date.UTC(y, m - 1, 1));
}

export async function saveReport(fd: FormData) {
  await requireUser();
  const clientId = str(fd, "clientId");
  const month = monthDate(str(fd, "month"));
  if (!clientId || !month) return;
  const data = {
    followers: intVal(fd, "followers"),
    reach: intVal(fd, "reach"),
    engagements: intVal(fd, "engagements"),
    leads: intVal(fd, "leads"),
    spend: intVal(fd, "spend"),
    notes: strOrNull(fd, "notes"),
  };
  // Same client + month updates the existing snapshot.
  await prisma.report.upsert({
    where: { clientId_month: { clientId, month } },
    update: data,
    create: { clientId, month, ...data },
  });
  revalidatePath("/admin/reports");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function deleteReport(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.report.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/reports");
}
