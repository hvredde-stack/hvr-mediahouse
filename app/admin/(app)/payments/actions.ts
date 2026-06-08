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

export async function createInvoice(fd: FormData) {
  await requireUser();
  const clientId = str(fd, "clientId");
  if (!clientId) return;
  let number = str(fd, "number");
  if (!number) {
    const count = await prisma.invoice.count();
    number = `INV-${String(count + 1).padStart(4, "0")}`;
  }
  await prisma.invoice.create({
    data: {
      clientId,
      number,
      amount: intVal(fd, "amount"),
      status: str(fd, "status") || "draft",
      issueDate: dateOrNull(fd, "issueDate"),
      dueDate: dateOrNull(fd, "dueDate"),
      notes: strOrNull(fd, "notes"),
    },
  });
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

export async function updateInvoiceStatus(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !status) return;
  await prisma.invoice.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

export async function deleteInvoice(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.invoice.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}
