import { deliver, once, readFile, readMultipart, respond, text, texts, toAttachment } from "@/lib/delivery";
import { validateFile, validateProject, type ProjectValues } from "@/lib/inquiry";

/**
 * Book project enquiries (/start-your-book). Accepts multipart/form-data with
 * an optional manuscript or sample, validates everything again on the server
 * and delivers by email and/or PROJECT_WEBHOOK_URL (see src/lib/delivery.ts).
 */
export async function POST(req: Request) {
  const fd = await readMultipart(req);
  if (fd === "too_large") return respond({ ok: false, error: "invalid", fields: { file: "That file is larger than 4 MB. Please upload a shorter sample." } });
  if (!fd) return respond({ ok: false, error: "invalid" });

  // Bots fill the hidden field; accept silently without delivering.
  if (text(fd, "company")) return respond({ ok: true });

  const v: ProjectValues = {
    startingPoint: text(fd, "startingPoint"),
    name: text(fd, "name"),
    email: text(fd, "email"),
    phone: text(fd, "phone"),
    contactMethod: text(fd, "contactMethod"),
    timeZone: text(fd, "timeZone"),
    bookTitle: text(fd, "bookTitle"),
    genre: text(fd, "genre"),
    audience: text(fd, "audience"),
    stage: text(fd, "stage"),
    wordCount: text(fd, "wordCount"),
    formats: texts(fd, "formats"),
    description: text(fd, "description"),
    reason: text(fd, "reason"),
    outcome: text(fd, "outcome"),
    support: texts(fd, "support"),
    timeline: text(fd, "timeline"),
    budget: text(fd, "budget"),
    notes: text(fd, "notes"),
    consent: text(fd, "consent") === "yes",
  };
  const file = readFile(fd);
  const fields = validateProject(v);
  const fileError = validateFile(file);
  if (fileError) fields.file = fileError;
  if (Object.keys(fields).length) return respond({ ok: false, error: "invalid", fields });

  const result = await once(text(fd, "submissionId"), async () =>
    deliver({
      type: "project",
      source: "/start-your-book",
      subject: `New book project — ${v.name}${v.bookTitle ? ` (${v.bookTitle})` : ""}`,
      replyTo: v.email,
      webhookUrl: process.env.PROJECT_WEBHOOK_URL,
      attachment: await toAttachment(file),
      data: { ...v, file: file?.name ?? null },
      rows: [
        ["Starting point", v.startingPoint],
        ["Full name", v.name],
        ["Email", v.email],
        ["Phone", v.phone],
        ["Preferred contact method", v.contactMethod],
        ["Time zone", v.timeZone],
        ["Project or book title", v.bookTitle],
        ["Genre", v.genre],
        ["Target audience", v.audience],
        ["Current stage", v.stage],
        ["Estimated word count", v.wordCount],
        ["Desired formats", v.formats.join(", ")],
        ["Short book description", v.description],
        ["Why create this book", v.reason],
        ["Hoped-for outcome", v.outcome],
        ["Services they may need", v.support.join(", ")],
        ["Desired completion timeline", v.timeline],
        ["Budget range", v.budget],
        ["Additional notes", v.notes],
        ["Attached file", file ? file.name : "None"],
        ["Privacy consent", "Given"],
      ],
    }),
  );
  return respond(result);
}
