import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/content/content";

/**
 * POST /api/contact
 * - 201 when the message was accepted
 * - 422 when validation fails (field errors returned)
 *
 * Email delivery is optional: set RESEND_API_KEY (and optionally CONTACT_TO / CONTACT_FROM)
 * to deliver via Resend. Without a key, messages are logged to the server console.
 */
export async function POST(request: Request) {
  const started = performance.now();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ status: 400, error: "Body must be valid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { status: 422, error: "Unprocessable Entity", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, message, company } = parsed.data;
  const id = `msg_${crypto.randomUUID().slice(0, 8)}`;

  // Honeypot filled: pretend success, do nothing.
  if (!company) {
    const key = process.env.RESEND_API_KEY;
    if (key) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: process.env.CONTACT_TO ?? profile.email,
          reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `${message}\n\n— ${name} <${email}>`,
        }),
      });
      if (!res.ok) {
        console.error("[contact] resend failed", res.status, await res.text());
        return Response.json({ status: 502, error: "Upstream mail service failed" }, { status: 502 });
      }
    } else {
      console.log(`[contact] ${id} from ${name} <${email}>:\n${message}`);
    }
  }

  return Response.json(
    {
      status: 201,
      id,
      message: `Thanks ${name.split(" ")[0]}, I'll reply to ${email} soon.`,
      elapsed_ms: Math.round(performance.now() - started),
    },
    { status: 201 },
  );
}
