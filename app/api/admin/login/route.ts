import { NextResponse } from "next/server";
import {
  authenticate,
  createSessionToken,
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  const email = typeof data.email === "string" ? data.email : "";
  const password = typeof data.password === "string" ? data.password : "";

  const user = await authenticate(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Incorrect email or password." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
