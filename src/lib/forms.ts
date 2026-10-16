/**
 * Shared form rules for the contact and newsletter endpoints, used by both the
 * client (instant validation) and the API routes (authoritative validation).
 */
export const currentStages = [
  "Writing",
  "Manuscript Completed",
  "Editing",
  "Design and Formatting",
  "Ready to Publish",
  "Already Published",
  "Marketing and Visibility",
  "Not Sure Yet",
] as const;

export const helpTopics = [
  "Editing and proofreading",
  "Cover design",
  "Interior formatting",
  "Publishing setup (KDP, IngramSpark)",
  "Distribution",
  "Marketing and visibility",
  "Author website or branding",
  "Audiobook production",
  "Something else / not sure",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  bookTitle: string;
  stage: string;
  topic: string;
  message: string;
  /** Honeypot — must stay empty. */
  company?: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isEmail = (v: string) => EMAIL.test(v.trim());

export function validateContact(p: Partial<ContactPayload>): FieldErrors<ContactPayload> {
  const e: FieldErrors<ContactPayload> = {};
  const name = p.name?.trim() ?? "";
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (name.length > 120) e.name = "Please shorten your name to 120 characters.";
  if (!p.email?.trim()) e.email = "Please enter your email address.";
  else if (!isEmail(p.email)) e.email = "Please enter a valid email address, like name@example.com.";
  if (p.phone?.trim() && !/^[+()\d\s.-]{6,24}$/.test(p.phone.trim())) e.phone = "Please enter a valid phone number, or leave it blank.";
  if ((p.bookTitle?.length ?? 0) > 200) e.bookTitle = "Please shorten the title to 200 characters.";
  if (!currentStages.includes(p.stage as (typeof currentStages)[number])) e.stage = "Please choose your current stage.";
  if (!helpTopics.includes(p.topic as (typeof helpTopics)[number])) e.topic = "Please choose what you need help with.";
  const msg = p.message?.trim() ?? "";
  if (msg.length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  else if (msg.length > 4000) e.message = "Please keep your message under 4,000 characters.";
  return e;
}

/** Response shape shared by both endpoints. */
export type FormResult = { ok: true } | { ok: false; error: "invalid" | "not_configured" | "failed"; fields?: Record<string, string> };

/**
 * Forwards a submission to the webhook configured in the environment
 * (e.g. a CRM, form service or automation endpoint). Without one, the
 * endpoint reports `not_configured` — it never pretends to succeed.
 */
export async function forward(url: string | undefined, body: unknown): Promise<FormResult> {
  if (!url) return { ok: false, error: "not_configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { ok: true } : { ok: false, error: "failed" };
  } catch {
    return { ok: false, error: "failed" };
  }
}
