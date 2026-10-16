import { NextResponse } from "next/server";
import { forward, isEmail, type FormResult } from "@/lib/forms";

/**
 * Newsletter sign-ups (Articles page). Set NEWSLETTER_WEBHOOK_URL to your
 * email platform's subscribe endpoint or an automation webhook; until then
 * the endpoint answers 503.
 */
export async function POST(req: Request) {
  let data: { email?: string; company?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json<FormResult>({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (data.company) return NextResponse.json<FormResult>({ ok: true });
  if (!data.email || !isEmail(data.email)) {
    return NextResponse.json<FormResult>(
      { ok: false, error: "invalid", fields: { email: "Please enter a valid email address." } },
      { status: 422 },
    );
  }

  const result = await forward(process.env.NEWSLETTER_WEBHOOK_URL, {
    type: "newsletter",
    source: "/author-resources",
    submittedAt: new Date().toISOString(),
    email: data.email.trim(),
  });
  const status = result.ok ? 200 : result.error === "not_configured" ? 503 : 502;
  return NextResponse.json<FormResult>(result, { status });
}
