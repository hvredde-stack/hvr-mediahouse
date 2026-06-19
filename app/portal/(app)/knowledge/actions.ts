"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePortalClient } from "@/lib/portal";
import { str } from "@/lib/admin";
import { embed, embeddingsEnabled, toVectorLiteral } from "@/lib/embeddings";

/** Add a knowledge entry for the logged-in client and embed it for retrieval. */
export async function addKnowledge(fd: FormData) {
  const { clientId } = await requirePortalClient();
  const content = str(fd, "content").trim().slice(0, 4000);
  if (!content) return;

  // Create the row first (Prisma sets the id); embedding is written separately
  // because the pgvector column isn't part of Prisma's typed client.
  const doc = await prisma.knowledgeDoc.create({
    data: { clientId, content },
    select: { id: true },
  });

  if (embeddingsEnabled()) {
    try {
      const vec = toVectorLiteral(await embed(content));
      await prisma.$executeRaw`UPDATE kb_docs SET embedding = ${vec}::vector WHERE id = ${doc.id}`;
    } catch (e) {
      // Keep the entry; it just won't be retrievable until re-embedded.
      console.error("Knowledge embedding failed:", e);
    }
  }

  revalidatePath("/portal/knowledge");
}

/** Delete one of the client's own knowledge entries (ownership enforced). */
export async function deleteKnowledge(fd: FormData) {
  const { clientId } = await requirePortalClient();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.knowledgeDoc.deleteMany({ where: { id, clientId } });
  revalidatePath("/portal/knowledge");
}
