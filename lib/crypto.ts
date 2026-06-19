import crypto from "node:crypto";

/**
 * Encrypt a per-tenant secret (a client's Twilio auth token) for storage.
 *
 * AES-256-GCM, layout: base64( iv[12] + ciphertext + tag[16] ) — the exact
 * format the Python voice agent's crypto.py decrypts. Use the SAME
 * ENCRYPTION_KEY (standard-base64 of 32 random bytes) in Vercel and on Render.
 * Generate one with:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
 *
 * Returns null if no/invalid key, so callers can skip storing a token.
 */
export function encryptSecret(plaintext: string): string | null {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw || !plaintext) return null;
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag(); // 16 bytes
  return Buffer.concat([iv, ct, tag]).toString("base64");
}
