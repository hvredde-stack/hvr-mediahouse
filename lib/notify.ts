import { site } from "@/lib/site";

export type LeadEmailData = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
};

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

/**
 * Emails the owner the moment a lead comes in, via Resend's REST API.
 * No-ops silently if RESEND_API_KEY is unset, so the contact form keeps
 * working before the key is configured. Never throws to the caller's flow
 * unless awaited inside a try/catch (the contact route does exactly that).
 */
export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // not configured yet — skip

  const to = process.env.LEAD_NOTIFY_TO || site.email;
  const from =
    process.env.LEAD_NOTIFY_FROM || `${site.name} Leads <onboarding@resend.dev>`;
  const adminUrl = `${site.url}/admin`;

  const fields: [string, string | null | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Service", lead.service],
    ["Budget", lead.budget],
  ];
  const rows = fields.filter(([, v]) => v && String(v).trim());

  const text =
    `New enquiry from ${lead.name}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${lead.message}\n\n` +
    `Reply to: ${lead.email}\nDashboard: ${adminUrl}`;

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#2a211a">
    <div style="background:linear-gradient(135deg,#cf6a44,#a8482b);color:#fff;padding:22px 28px;border-radius:14px 14px 0 0">
      <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.85">New website enquiry</div>
      <div style="font-size:24px;font-weight:700;margin-top:4px">${escapeHtml(lead.name)}</div>
    </div>
    <div style="border:1px solid #e9e1d4;border-top:none;border-radius:0 0 14px 14px;padding:22px 28px">
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:5px 0;color:#7a6f63;width:90px;vertical-align:top">${k}</td><td style="padding:5px 0;font-weight:600">${escapeHtml(String(v))}</td></tr>`,
          )
          .join("")}
      </table>
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e9e1d4">
        <div style="color:#7a6f63;font-size:13px;margin-bottom:6px">Message</div>
        <div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(lead.message)}</div>
      </div>
      <div style="margin-top:22px">
        <a href="mailto:${escapeHtml(lead.email)}" style="background:#a8482b;color:#fff;text-decoration:none;padding:10px 18px;border-radius:999px;font-size:14px;font-weight:600">Reply</a>
        <a href="${adminUrl}" style="margin-left:12px;color:#a8482b;text-decoration:none;font-size:14px;font-weight:600">Open dashboard &rarr;</a>
      </div>
    </div>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New lead: ${lead.name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
}
