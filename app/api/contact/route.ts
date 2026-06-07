import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Prisma needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));

    const name = clean(data.name, 120);
    const email = clean(data.email, 200);
    const message = clean(data.message, 4000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email and message." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        message,
        phone: clean(data.phone, 60) || null,
        company: clean(data.company, 160) || null,
        service: clean(data.service, 160) || null,
        budget: clean(data.budget, 60) || null,
        source: "contact_form",
      },
    });

    // ── Future: send an email / Slack notification here ─────────────
    // e.g. with Resend, using process.env.RESEND_API_KEY.

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[contact] failed to save lead:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}
