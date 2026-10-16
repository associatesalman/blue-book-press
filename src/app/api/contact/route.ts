import { NextResponse } from "next/server";
import { deliver } from "@/lib/delivery";
import { validateContact, type ContactPayload, type FormResult } from "@/lib/forms";

/**
 * Contact enquiries (FAQ page form). Delivered by email and/or
 * CONTACT_WEBHOOK_URL (see src/lib/delivery.ts); with neither configured the
 * endpoint answers 503.
 */
export async function POST(req: Request) {
  let data: Partial<ContactPayload>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json<FormResult>({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Bots fill the hidden field; accept silently without forwarding.
  if (data.company) return NextResponse.json<FormResult>({ ok: true });

  const fields = validateContact(data);
  if (Object.keys(fields).length) {
    return NextResponse.json<FormResult>({ ok: false, error: "invalid", fields: fields as Record<string, string> }, { status: 422 });
  }

  const v = {
    name: data.name!.trim(),
    email: data.email!.trim(),
    phone: data.phone?.trim() ?? "",
    bookTitle: data.bookTitle?.trim() ?? "",
    stage: data.stage!,
    topic: data.topic!,
    message: data.message!.trim(),
  };
  const result = await deliver({
    type: "contact",
    source: "/faqs",
    subject: `Question from ${v.name}`,
    replyTo: v.email,
    webhookUrl: process.env.CONTACT_WEBHOOK_URL,
    data: v,
    rows: [
      ["Full name", v.name],
      ["Email", v.email],
      ["Phone", v.phone],
      ["Book title", v.bookTitle],
      ["Current stage", v.stage],
      ["Needs help with", v.topic],
      ["Message", v.message],
    ],
  });
  const status = result.ok ? 200 : result.error === "not_configured" ? 503 : 502;
  return NextResponse.json<FormResult>(result, { status });
}
