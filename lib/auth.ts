import crypto from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const ADMIN_COOKIE = "hvr_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SECONDS;

/** The signing secret, or null if it isn't configured (fail closed). */
function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

/* ── Password hashing (scrypt) ─────────────────────────────────────── */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const salt = Buffer.from(parts[1], "hex");
  const expected = Buffer.from(parts[2], "hex");
  const key = crypto.scryptSync(password, salt, expected.length);
  return (
    expected.length === key.length && crypto.timingSafeEqual(expected, key)
  );
}

/* ── Signed session tokens (carry the user id) ─────────────────────── */

export function createSessionToken(userId: string): string {
  const s = secret();
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp })).toString(
    "base64url",
  );
  const sig = crypto.createHmac("sha256", s).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function readToken(token?: string | null): { uid: string } | null {
  const s = secret();
  if (!s || !token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = crypto
    .createHmac("sha256", s)
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const { uid, exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    );
    if (typeof exp !== "number" || exp <= Date.now()) return null;
    if (typeof uid !== "string") return null;
    return { uid };
  } catch {
    return null;
  }
}

/* ── Session helpers ───────────────────────────────────────────────── */

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

/** Loads the logged-in team member from the request cookie, or null. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const parsed = readToken(store.get(ADMIN_COOKIE)?.value);
  if (!parsed) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parsed.uid },
      select: { id: true, name: true, email: true, role: true },
    });
    return user ?? null;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSessionUser()) !== null;
}

/** Validates an email + password against the team-member table. */
export async function authenticate(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  if (!email || !password) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user || !verifyPassword(password, user.passwordHash)) return null;
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  } catch {
    return null;
  }
}
