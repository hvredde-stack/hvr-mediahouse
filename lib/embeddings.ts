/**
 * Text embeddings for the per-client knowledge base (RAG).
 *
 * Uses OpenAI text-embedding-3-small (1536 dims) — the same model the Python
 * voice agent uses, so vectors are comparable. Set OPENAI_API_KEY in the
 * environment (Vercel). Throws if the key is missing or the API errors.
 */

const MODEL = "text-embedding-3-small";

export function embeddingsEnabled() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function embed(text: string): Promise<number[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model: MODEL, input: text }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Embedding request failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as { data: { embedding: number[] }[] };
  return data.data[0].embedding;
}

/** Format a vector as a pgvector literal, e.g. "[0.1,0.2,...]". */
export function toVectorLiteral(vec: number[]): string {
  return `[${vec.join(",")}]`;
}
