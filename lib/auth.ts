import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "hvr_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SECONDS;

/** The signing secret, or null if it isn't configured (fail closed). */
function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

/** Validates a username/password against the env credentials. */
export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  // Fail closed: with no configured credentials or signing secret, the admin
  // is disabled entirely — never fall back to default/guessable values.
  if (!u || !p || !process.env.ADMIN_SESSION_SECRET) return false;
  // constant-time-ish comparison
  const okU = safeEqual(username, u);
  const okP = safeEqual(password, p);
  return okU && okP;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Creates a signed session token for the given user. */
export function createSessionToken(username: string): string {
  const s = secret();
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString(
    "base64url",
  );
  const sig = crypto.createHmac("sha256", s).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

/** Returns true if the token is well-formed, correctly signed and unexpired. */
export function verifySessionToken(token?: string | null): boolean {
  const s = secret();
  if (!s || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto
    .createHmac("sha256", s)
    .update(payload)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** Server-side check using the request cookies. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}
