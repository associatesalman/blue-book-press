import { deliver, once, readFile, readMultipart, respond, text, texts, toAttachment } from "@/lib/delivery";
import { validateConsultation, validateFile, type ConsultationValues } from "@/lib/inquiry";

/**
 * Consultation requests (/consultation). Accepts multipart/form-data with an
 * optional manuscript or sample, validates everything again on the server and
 * delivers by email and/or CONSULTATION_WEBHOOK_URL (see src/lib/delivery.ts).
 */
export async function POST(req: Request) {
  const fd = await readMultipart(req);
  if (fd === "too_large") return respond({ ok: false, error: "invalid", fields: { file: "That file is larger than 4 MB. Please upload a shorter sample." } });
  if (!fd) return respond({ ok: false, error: "invalid" });

  // Bots fill the hidden field; accept silently without delivering.
  if (text(fd, "company")) return respond({ ok: true });

  const v: ConsultationValues = {
    name: text(fd, "name"),
    email: text(fd, "email"),
    phone: text(fd, "phone"),
    contactMethod: text(fd, "contactMethod"),
    timeZone: text(fd, "timeZone"),
    bookTitle: text(fd, "bookTitle"),
    genre: text(fd, "genre"),
    wordCount: text(fd, "wordCount"),
    stage: text(fd, "stage"),
    previouslyPublished: text(fd, "previouslyPublished"),
    platform: text(fd, "platform"),
    support: texts(fd, "support"),
    goal: text(fd, "goal"),
    challenge: text(fd, "challenge"),
    timeline: text(fd, "timeline"),
    budget: text(fd, "budget"),
    message: text(fd, "message"),
    consent: text(fd, "consent") === "yes",
  };
  const file = readFile(fd);
  const fields = validateConsultation(v);
  const fileError = validateFile(file);
  if (fileError) fields.file = fileError;
  if (Object.keys(fields).length) return respond({ ok: false, error: "invalid", fields });

  const result = await once(text(fd, "submissionId"), async () =>
    deliver({
      type: "consultation",
      source: "/consultation",
      subject: `Consultation request — ${v.name}${v.bookTitle ? ` (${v.bookTitle})` : ""}`,
      replyTo: v.email,
      webhookUrl: process.env.CONSULTATION_WEBHOOK_URL,
      attachment: await toAttachment(file),
      data: { ...v, file: file?.name ?? null },
      rows: [
        ["Full name", v.name],
        ["Email", v.email],
        ["Phone", v.phone],
        ["Preferred contact method", v.contactMethod],
        ["Time zone", v.timeZone],
        ["Book title", v.bookTitle],
        ["Genre", v.genre],
        ["Approximate word count", v.wordCount],
        ["Current project stage", v.stage],
        ["Previously published", v.previouslyPublished],
        ["Existing publishing platform", v.platform],
        ["Support needed", v.support.join(", ")],
        ["Main project goal", v.goal],
        ["Biggest challenge", v.challenge],
        ["Desired timeline", v.timeline],
        ["Estimated budget", v.budget],
        ["Additional message", v.message],
        ["Attached file", file ? file.name : "None"],
        ["Privacy consent", "Given"],
      ],
    }),
  );
  return respond(result);
}
