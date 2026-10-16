"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { useEffect, useRef, type FormEvent } from "react";
import { Reveal } from "@/components/common/Reveal";
import {
  Choices,
  Consent,
  FailureMessage,
  Field,
  FileField,
  FormAlert,
  FormSection,
  Honeypot,
  RequiredNote,
  Select,
  SubmitButton,
  controlClass,
  describe,
  detectTimeZone,
  mailtoHref,
  useFocusField,
  useFormState,
  useSubmission,
} from "@/components/forms/FormKit";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import {
  budgetRanges,
  contactMethods,
  emptyConsultation,
  genreSuggestions,
  projectStages,
  supportOptions,
  timelines,
  validateConsultation,
  validateFile,
  type ConsultationValues,
} from "@/lib/inquiry";
import { cn } from "@/lib/cn";

type V = ConsultationValues & { file: File | null };

const initial: V = { ...emptyConsultation, file: null };
const validate = (v: V) => {
  const e = validateConsultation(v);
  const f = validateFile(v.file);
  if (f) e.file = f;
  return e;
};
/** DOM order, used to focus the first invalid field. */
const order = [
  "name",
  "email",
  "phone",
  "timeZone",
  "contactMethod",
  "bookTitle",
  "genre",
  "wordCount",
  "stage",
  "previouslyPublished",
  "platform",
  "support",
  "goal",
  "challenge",
  "timeline",
  "budget",
  "message",
  "file",
  "consent",
];

const SUCCESS =
  "Thank you. Your consultation request has been received. A member of the Blue Book Press team will review your information and contact you using your preferred method.";

/**
 * The consultation request form. Posts multipart data to /api/consultation
 * and only shows the success message once the server confirms delivery.
 */
export function ConsultationForm() {
  const { values: v, errors, set, blur, check, setErrors } = useFormState<V>(initial, validate);
  const { status, failure, send, loading } = useSubmission("/api/consultation");
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const focusField = useFocusField("cons");

  // Prefill the visitor's time zone (editable).
  useEffect(() => {
    const tz = detectTimeZone();
    if (tz) set("timeZone", tz);
  }, []);

  const text = (key: keyof ConsultationValues, hint = false) => ({
    ...describe(`cons-${key}`, errors[key], hint),
    name: key,
    value: v[key] as string,
    onChange: (e: { target: { value: string } }) => set(key, e.target.value),
    onBlur: blur(key),
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const first = check(order);
    if (first) return focusField(formRef.current, first);

    const fd = new FormData();
    for (const [k, val] of Object.entries(v)) {
      if (k === "file") continue;
      if (Array.isArray(val)) val.forEach((x) => fd.append(k, x));
      else if (typeof val === "boolean") fd.set(k, val ? "yes" : "");
      else fd.set(k, String(val));
    }
    if (v.file) fd.set("file", v.file);
    fd.set("company", (formRef.current?.querySelector<HTMLInputElement>('input[name="company"]')?.value ?? "").trim());

    const res = await send(fd);
    if (res.ok) {
      requestAnimationFrame(() => doneRef.current?.focus());
      return;
    }
    if (res.fields) {
      setErrors(res.fields);
      const firstServer = order.find((k) => res.fields![k]);
      if (firstServer) focusField(formRef.current, firstServer);
      return;
    }
    requestAnimationFrame(() => alertRef.current?.focus());
  };

  const mailto = mailtoHref(`Consultation request from ${v.name || "a website visitor"}`, [
    ["Name", v.name],
    ["Phone", v.phone],
    ["Preferred contact", v.contactMethod],
    ["Time zone", v.timeZone],
    ["Book title", v.bookTitle],
    ["Genre", v.genre],
    ["Word count", v.wordCount],
    ["Stage", v.stage],
    ["Previously published", v.previouslyPublished],
    ["Platform", v.platform],
    ["Support needed", v.support.join(", ")],
    ["Main goal", v.goal],
    ["Biggest challenge", v.challenge],
    ["Timeline", v.timeline],
    ["Budget", v.budget],
    ["Message", v.message],
  ]);

  return (
    <section id="request" aria-labelledby="request-title" className="bg-white pb-[clamp(4rem,8vw,6.5rem)]">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-4" y={18}>
          <div className="lg:sticky lg:top-28">
            <h2 id="request-title" className="text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.08] tracking-[-0.03em] text-ink">
              Request a Consultation
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-muted">
              Share as much or as little as you know today. Only a few fields are required, and there are no wrong answers.
            </p>
            <ul className="mt-7 space-y-3 border-t border-line pt-6 text-[0.98rem] leading-relaxed text-ink-soft">
              {[
                "A real person on our team reads every request.",
                "We will contact you using the method you choose.",
                "Requesting a consultation does not commit you to anything.",
              ].map((s) => (
                <li key={s} className="relative pl-7">
                  <span aria-hidden className="absolute left-0 top-[0.8em] h-0.5 w-3.5 bg-brand" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[0.95rem] text-ink-muted">Prefer email?</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
            >
              <Mail aria-hidden className="size-4.5 text-brand" />
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.1} y={18}>
          <div className="border-2 border-ink p-[clamp(1.25rem,3.5vw,2.75rem)]">
            {status === "success" ? (
              <div ref={doneRef} tabIndex={-1} role="status" className="py-10 text-center outline-none">
                <CheckCircle2 aria-hidden className="mx-auto size-12 text-brand" />
                <p className="mt-5 font-serif text-[1.8rem] font-semibold text-ink">Request received</p>
                <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">{SUCCESS}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href={pages["author-resources"].path}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    Read our articles
                  </Link>
                  <Link href="/" className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
                    Return to home
                  </Link>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate aria-busy={loading} className="space-y-10">
                <RequiredNote />

                <FormSection n={1} title="Contact Information">
                  <Field label="Full Name" required htmlFor="cons-name" error={errors.name}>
                    <input type="text" autoComplete="name" required {...text("name")} className={cn(controlClass(errors.name), "h-13")} />
                  </Field>
                  <Field label="Email Address" required htmlFor="cons-email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      {...text("email")}
                      className={cn(controlClass(errors.email), "h-13")}
                    />
                  </Field>
                  <Field label="Phone Number" optional htmlFor="cons-phone" error={errors.phone}>
                    <input type="tel" autoComplete="tel" inputMode="tel" {...text("phone")} className={cn(controlClass(errors.phone), "h-13")} />
                  </Field>
                  <Field label="Time Zone" optional hint="Detected from your device — change it if needed." htmlFor="cons-timeZone" error={errors.timeZone}>
                    <input type="text" placeholder="e.g. America/New_York" {...text("timeZone", true)} className={cn(controlClass(errors.timeZone), "h-13")} />
                  </Field>
                  <Choices
                    name="contactMethod"
                    label="Preferred Contact Method"
                    required
                    options={contactMethods}
                    value={v.contactMethod}
                    onChange={(x) => set("contactMethod", x as string, true)}
                    error={errors.contactMethod}
                    className="sm:col-span-2"
                  />
                </FormSection>

                <FormSection n={2} title="Book Information">
                  <Field label="Book Title" optional htmlFor="cons-bookTitle" error={errors.bookTitle}>
                    <input type="text" placeholder="Working titles are welcome" {...text("bookTitle")} className={cn(controlClass(errors.bookTitle), "h-13")} />
                  </Field>
                  <Field label="Genre" required htmlFor="cons-genre" error={errors.genre}>
                    <input type="text" list="cons-genres" required placeholder="e.g. Memoir, Thriller" {...text("genre")} className={cn(controlClass(errors.genre), "h-13")} />
                    <datalist id="cons-genres">
                      {genreSuggestions.map((g) => (
                        <option key={g} value={g} />
                      ))}
                    </datalist>
                  </Field>
                  <Field label="Approximate Word Count" optional htmlFor="cons-wordCount" error={errors.wordCount}>
                    <input type="text" inputMode="numeric" placeholder="e.g. 60,000" {...text("wordCount")} className={cn(controlClass(errors.wordCount), "h-13")} />
                  </Field>
                  <Field label="Current Project Stage" required htmlFor="cons-stage" error={errors.stage}>
                    <Select required {...text("stage")} onChange={(e) => set("stage", e.target.value, true)} options={projectStages} className={controlClass(errors.stage)} />
                  </Field>
                  <Choices
                    name="previouslyPublished"
                    label="Previously Published?"
                    optional
                    options={["Yes", "No"]}
                    value={v.previouslyPublished}
                    onChange={(x) => set("previouslyPublished", x as string, true)}
                    error={errors.previouslyPublished}
                  />
                  <Field label="Existing Publishing Platform" optional htmlFor="cons-platform" error={errors.platform}>
                    <input type="text" placeholder="e.g. Amazon KDP, IngramSpark" {...text("platform")} className={cn(controlClass(errors.platform), "h-13")} />
                  </Field>
                </FormSection>

                <FormSection n={3} title="Support Needed" text="Choose any that might apply. If you are unsure, choose Not Sure Yet — we will help you work it out.">
                  <Choices
                    name="support"
                    label="Areas of support"
                    optional
                    multiple
                    options={supportOptions}
                    value={v.support}
                    onChange={(x) => set("support", x as string[], true)}
                    error={errors.support}
                    className="sm:col-span-2"
                  />
                </FormSection>

                <FormSection n={4} title="Your Goals">
                  <Field label="Main Project Goal" required htmlFor="cons-goal" error={errors.goal} className="sm:col-span-2">
                    <textarea
                      rows={3}
                      required
                      placeholder="What would you most like to achieve with this book?"
                      {...text("goal")}
                      className={cn(controlClass(errors.goal), "min-h-28 resize-y py-3.5 leading-relaxed")}
                    />
                  </Field>
                  <Field label="Biggest Challenge" optional htmlFor="cons-challenge" error={errors.challenge} className="sm:col-span-2">
                    <textarea
                      rows={3}
                      placeholder="For example: finishing the draft, choosing a platform, reaching readers"
                      {...text("challenge")}
                      className={cn(controlClass(errors.challenge), "min-h-28 resize-y py-3.5 leading-relaxed")}
                    />
                  </Field>
                  <Field label="Desired Timeline" optional htmlFor="cons-timeline" error={errors.timeline}>
                    <Select {...text("timeline")} onChange={(e) => set("timeline", e.target.value, true)} options={timelines} className={controlClass(errors.timeline)} />
                  </Field>
                  <Field label="Estimated Budget Range" optional htmlFor="cons-budget" error={errors.budget}>
                    <Select {...text("budget")} onChange={(e) => set("budget", e.target.value, true)} options={budgetRanges} className={controlClass(errors.budget)} />
                  </Field>
                  <Field label="Additional Message" optional htmlFor="cons-message" error={errors.message} className="sm:col-span-2">
                    <textarea
                      rows={4}
                      placeholder="Anything else you would like us to know?"
                      {...text("message")}
                      className={cn(controlClass(errors.message), "min-h-32 resize-y py-3.5 leading-relaxed")}
                    />
                  </Field>
                  <FileField id="cons-file" file={v.file} onChange={(f) => set("file", f, true)} error={errors.file} className="sm:col-span-2" />
                </FormSection>

                <Honeypot />

                <div className="space-y-6 border-t border-line pt-8">
                  <Consent id="cons-consent" checked={v.consent} onChange={(c) => set("consent", c, true)} error={errors.consent}>
                    I agree that Blue Book Press may use the details I have shared to respond to my request, as described in the{" "}
                    <Link href={pages.privacy.path} className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
                      Privacy Policy
                    </Link>
                    .
                  </Consent>

                  {status === "error" && (
                    <FormAlert alertRef={alertRef}>
                      <FailureMessage failure={failure} mailto={mailto} hasFile={!!v.file} />
                    </FormAlert>
                  )}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex max-w-sm items-start gap-2 text-[0.88rem] leading-relaxed text-ink-muted">
                      <ShieldCheck aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand" />
                      Authors retain 100% of their rights and royalties.
                    </p>
                    <SubmitButton loading={loading}>
                      Request Consultation
                      <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
                    </SubmitButton>
                  </div>
                  <p aria-live="polite" className="sr-only">
                    {loading ? "Sending your request…" : ""}
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
