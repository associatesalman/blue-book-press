/**
 * Server-only delivery for enquiry forms (contact, consultation, Start Your
 * Book). Never import this from a client component — it reads secrets from
 * the environment.
 *
 * Two channels, either or both can be configured in .env.local:
 *  - Email through Resend's HTTP API: RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL
 *  - A webhook per form (CRM, form service or automation tool), which
 *    receives the submission as JSON with any file base64-encoded.
 *
 * With neither configured the endpoints answer `not_configured`, so the site
 * never reports a submission as received when it was not.
 */
import type { FormResult } from "./forms";

export type Attachment = { filename: string; contentType: string; content: Buffer };

export type Submission = {
  type: "contact" | "consultation" | "project";
  /** Page the form was sent from. */
  source: string;
  subject: string;
  replyTo: string;
  /** Ordered label → value pairs, used for the email body. */
  rows: [label: string, value: string][];
  /** Structured fields for webhook consumers. */
  data: Record<string, unknown>;
  attachment?: Attachment | null;
  webhookUrl?: string;
};

const TIMEOUT = 15_000;

async function sendEmail(s: Submission): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL?.split(",").map((t) => t.trim()).filter(Boolean);
  const from = process.env.FORMS_FROM_EMAIL;
  if (!key || !to?.length || !from) return false;

  const text = [
    s.subject,
    "",
    ...s.rows.map(([label, value]) => (value.includes("\n") || value.length > 80 ? `${label}:\n${value || "—"}\n` : `${label}: ${value || "—"}`)),
    "",
    `Sent from ${s.source} on ${new Date().toUTCString()}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: s.replyTo,
        subject: s.subject,
        text,
        attachments: s.attachment ? [{ filename: s.attachment.filename, content: s.attachment.content.toString("base64") }] : undefined,
      }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) console.error(`[forms] email delivery failed for ${s.type}: HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error(`[forms] email delivery failed for ${s.type}:`, (err as Error).name);
    return false;
  }
}

async function sendWebhook(s: Submission): Promise<boolean> {
  if (!s.webhookUrl) return false;
  try {
    const res = await fetch(s.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: s.type,
        source: s.source,
        submittedAt: new Date().toISOString(),
        ...s.data,
        attachment: s.attachment
          ? { filename: s.attachment.filename, contentType: s.attachment.contentType, size: s.attachment.content.length, base64: s.attachment.content.toString("base64") }
          : null,
      }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) console.error(`[forms] webhook delivery failed for ${s.type}: HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error(`[forms] webhook delivery failed for ${s.type}:`, (err as Error).name);
    return false;
  }
}

const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.FORMS_TO_EMAIL && process.env.FORMS_FROM_EMAIL);

/** Sends a submission to every configured channel; succeeds if at least one accepted it. */
export async function deliver(s: Submission): Promise<FormResult> {
  const channels: Promise<boolean>[] = [];
  if (emailConfigured()) channels.push(sendEmail(s));
  if (s.webhookUrl) channels.push(sendWebhook(s));
  if (!channels.length) return { ok: false, error: "not_configured" };
  const results = await Promise.all(channels);
  return results.some(Boolean) ? { ok: true } : { ok: false, error: "failed" };
}

/* ------------------------------------------------------------------
   Duplicate protection. Each form fill carries a random submission id;
   a repeat of an id that is in flight or was delivered recently returns
   the same result instead of sending the enquiry twice. Best effort:
   memory is per server instance.
   ------------------------------------------------------------------ */
const WINDOW = 15 * 60 * 1000;
const recent = new Map<string, { at: number; result: Promise<FormResult> }>();

export function once(id: unknown, run: () => Promise<FormResult>): Promise<FormResult> {
  if (typeof id !== "string" || !/^[\w-]{8,64}$/.test(id)) return run();
  const now = Date.now();
  for (const [k, v] of recent) if (now - v.at > WINDOW) recent.delete(k);
  const hit = recent.get(id);
  if (hit) return hit.result;
  const result = run().then((r) => {
    if (!r.ok) recent.delete(id); // let a failed attempt be retried
    return r;
  });
  recent.set(id, { at: now, result });
  return result;
}

/* ------------------------------------------------------------------
   Multipart helpers
   ------------------------------------------------------------------ */

/** Largest request accepted: the 4 MB upload plus room for the text fields. */
export const MAX_REQUEST_BYTES = 5 * 1024 * 1024;

export async function readMultipart(req: Request): Promise<FormData | "too_large" | null> {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_REQUEST_BYTES) return "too_large";
  try {
    return await req.formData();
  } catch {
    return null;
  }
}

/** The uploaded file, or null when the field was left empty. */
export function readFile(fd: FormData, key = "file"): File | null {
  const v = fd.get(key);
  return v instanceof File && (v.name || v.size) ? v : null;
}

export const text = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

export const texts = (fd: FormData, key: string) => fd.getAll(key).filter((v): v is string => typeof v === "string");

export async function toAttachment(file: File | null): Promise<Attachment | null> {
  if (!file) return null;
  const safe = file.name.replace(/[^\w.\- ]+/g, "_").slice(-120) || "upload";
  return { filename: safe, contentType: file.type || "application/octet-stream", content: Buffer.from(await file.arrayBuffer()) };
}

/** JSON response with the status code that matches a delivery result. */
export function respond(result: FormResult) {
  const status = result.ok ? 200 : result.error === "invalid" ? 422 : result.error === "not_configured" ? 503 : 502;
  return Response.json(result, { status });
}
