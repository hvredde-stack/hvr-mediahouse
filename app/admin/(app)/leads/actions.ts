"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser, str, LEAD_STATUSES } from "@/lib/admin";

export async function updateLeadStatus(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !(LEAD_STATUSES as readonly string[]).includes(status)) return;
  await prisma.lead.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) await prisma.lead.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function convertLead(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (!id) return;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead || lead.convertedClientId) return;

  const notes = [
    lead.service && `Interested in: ${lead.service}`,
    lead.budget && `Budget: ${lead.budget}`,
    lead.message && `\nOriginal message:\n${lead.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const client = await prisma.client.create({
    data: {
      name: lead.company || lead.name,
      contactName: lead.name,
      contactEmail: lead.email,
      contactPhone: lead.phone,
      status: "onboarding",
      notes: notes || null,
    },
  });
  await prisma.lead.update({
    where: { id },
    data: { status: "won", convertedClientId: client.id },
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin/clients");
  redirect(`/admin/clients/${client.id}`);
}
