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
  CLIENT_STATUSES,
} from "@/lib/admin";
import { hashPassword } from "@/lib/auth";
import { encryptSecret } from "@/lib/crypto";

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
  if (!id || !(CLIENT_STATUSES as readonly string[]).includes(status)) return;
  await prisma.client.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
}

export async function deleteClient(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (id) {
    // Don't orphan leads that were converted into this client.
    await prisma.lead.updateMany({
      where: { convertedClientId: id },
      data: { convertedClientId: null, status: "contacted" },
    });
    await prisma.client.delete({ where: { id } }).catch(() => {});
  }
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

/** Give a client a portal login (a User with role "client" tied to them). */
export async function createClientUser(fd: FormData) {
  await requireUser();
  const clientId = str(fd, "clientId");
  const name = str(fd, "name");
  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");
  if (!clientId || !name || !email || password.length < 8) return;
  await prisma.user
    .create({
      data: {
        name,
        email,
        role: "client",
        clientId,
        passwordHash: hashPassword(password),
      },
    })
    .catch(() => {}); // ignore duplicate email
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function deleteClientUser(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const clientId = str(fd, "clientId");
  if (id) await prisma.user.delete({ where: { id } }).catch(() => {});
  revalidatePath(`/admin/clients/${clientId}`);
}

/** Configure a client's AI voice agent (persona, voice, slug, toggles). */
export async function saveVoiceConfig(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  if (!id) return;
  const slug = str(fd, "voiceSlug")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  // Encrypt the Twilio auth token only when a new one is entered; blank = keep existing.
  const token = str(fd, "twilioAuthToken").trim();
  const encToken = token ? encryptSecret(token) : null;
  await prisma.client
    .update({
      where: { id },
      data: {
        voiceSlug: slug || null,
        voiceName: str(fd, "voiceName") || "Ara",
        voicePrompt: strOrNull(fd, "voicePrompt"),
        voiceActive: fd.get("voiceActive") != null,
        voiceTranscribe: fd.get("voiceTranscribe") != null,
        twilioAccountSid: strOrNull(fd, "twilioAccountSid"),
        ...(encToken ? { twilioAuthToken: encToken } : {}),
      },
    })
    .catch(() => {}); // likely a duplicate slug — silently ignore (no inline errors yet)
  revalidatePath(`/admin/clients/${id}`);
}

export async function addAgentNumber(fd: FormData) {
  await requireUser();
  const clientId = str(fd, "clientId");
  const phoneNumber = str(fd, "phoneNumber").trim();
  if (!clientId || !phoneNumber) return;
  await prisma.agentNumber
    .create({ data: { clientId, phoneNumber } })
    .catch(() => {}); // ignore duplicate number
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function deleteAgentNumber(fd: FormData) {
  await requireUser();
  const id = str(fd, "id");
  const clientId = str(fd, "clientId");
  if (id) await prisma.agentNumber.delete({ where: { id } }).catch(() => {});
  revalidatePath(`/admin/clients/${clientId}`);
}
