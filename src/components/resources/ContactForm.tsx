"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Field, Select } from "@/components/forms/FormKit";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/common/Reveal";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { currentStages, helpTopics, validateContact, type ContactPayload, type FieldErrors, type FormResult } from "@/lib/forms";
import { cn } from "@/lib/cn";

type Values = Omit<ContactPayload, "company">;
type Status = "idle" | "loading" | "success" | "error";

const empty: Values = { name: "", email: "", phone: "", bookTitle: "", stage: "", topic: "", message: "" };
const order: (keyof Values)[] = ["name", "email", "phone", "bookTitle", "stage", "topic", "message"];

const steps = [
  "We read every message personally.",
  "We reply by email, usually with a few questions about your book.",
  "If it helps, we suggest a short call — there's no obligation.",
];

/**
 * Compact contact form for the FAQ page. Validates on blur and on submit,
 * posts to /api/contact (which forwards to CONTACT_WEBHOOK_URL) and shows
 * loading, success and error states. It never reports success unless the
 * endpoint confirms delivery.
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors<Values>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<ReactNode>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof Values;
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validateContact(next)[key] }));
  };
  const onBlur = (key: keyof Values) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateContact(values)[key] }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    const first = order.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    setFailure(null);
    const company = (new FormData(e.currentTarget).get("company") as string) ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      const data = (await res.json()) as FormResult;
      if (data.ok) {
        setStatus("success");
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (data.error === "invalid" && data.fields) {
        setErrors(data.fields as FieldErrors<Values>);
        setStatus("idle");
        return;
      }
      setStatus("error");
      setFailure(
        data.error === "not_configured" ? (
          <>
            Our online form isn't accepting messages just yet. Please email us at{" "}
            <a href={mailto(values)} className="font-semibold underline underline-offset-4">
              {site.email}
            </a>{" "}
            — your details will be filled in for you.
          </>
        ) : (
          <>
            Something went wrong and your message wasn't sent. Please try again, or email{" "}
            <a href={mailto(values)} className="font-semibold underline underline-offset-4">
              {site.email}
            </a>
            .
          </>
        ),
      );
    } catch {
      setStatus("error");
      setFailure("We couldn't reach the server. Please check your connection and try again.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const field = (key: keyof Values) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange,
    onBlur: onBlur(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    className: cn(
      "mt-2 w-full rounded-xl border-2 bg-white px-4 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand",
      errors[key] ? "border-ink" : "border-line hover:border-ink/40",
    ),
  });

  return (
    <section id="ask" aria-labelledby="ask-title" className="bg-white py-[clamp(4rem,8vw,6.5rem)]">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-4" y={18}>
          <p className="eyebrow flex items-center gap-3 text-brand">
            <span aria-hidden className="h-0.5 w-8 bg-brand" />
            Ask our team
          </p>
          <h2 id="ask-title" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ink">
            Send Us Your Question
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
            Share a few details about your book and what you need. A member of our team will reply personally.
          </p>
          <ol className="mt-8 space-y-4 border-t border-line pt-6">
            {steps.map((s, i) => (
              <li key={s} className="grid grid-cols-[2rem_1fr] text-[0.98rem] leading-relaxed text-ink-soft">
                <span aria-hidden className="font-serif font-semibold tabular-nums text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.1} y={18}>
          <div className="border-2 border-ink p-[clamp(1.25rem,3.5vw,2.5rem)]">
            {status === "success" ? (
              <div ref={statusRef} tabIndex={-1} role="status" className="py-8 text-center outline-none">
                <CheckCircle2 aria-hidden className="mx-auto size-12 text-brand" />
                <p className="mt-5 font-serif text-[1.8rem] font-semibold text-ink">Thank you, {values.name.trim().split(/\s+/)[0]}.</p>
                <p className="mx-auto mt-3 max-w-md text-ink-muted">
                  Your message has been sent. We'll reply to <span className="font-semibold text-ink">{values.email}</span> as soon as we can.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues(empty);
                    setTouched({});
                    setErrors({});
                    setStatus("idle");
                  }}
                  className="mt-7 font-semibold text-ink underline underline-offset-4 hover:text-brand"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate aria-describedby="contact-consent">
                <p className="text-[0.9rem] text-ink-muted">
                  Fields marked <span aria-hidden className="font-semibold text-brand">*</span>
                  <span className="sr-only">with an asterisk</span> are required.
                </p>

                <div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Field label="Full Name" required error={errors.name} htmlFor="contact-name">
                    <input type="text" autoComplete="name" required {...field("name")} className={cn(field("name").className, "h-13")} />
                  </Field>
                  <Field label="Email Address" required error={errors.email} htmlFor="contact-email">
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      {...field("email")}
                      className={cn(field("email").className, "h-13")}
                    />
                  </Field>
                  <Field label="Phone Number" optional error={errors.phone} htmlFor="contact-phone">
                    <input type="tel" autoComplete="tel" {...field("phone")} className={cn(field("phone").className, "h-13")} />
                  </Field>
                  <Field label="Book Title" optional error={errors.bookTitle} htmlFor="contact-bookTitle">
                    <input type="text" {...field("bookTitle")} className={cn(field("bookTitle").className, "h-13")} />
                  </Field>
                  <Field label="Current Stage" required error={errors.stage} htmlFor="contact-stage">
                    <Select required {...field("stage")} options={currentStages} />
                  </Field>
                  <Field label="What do you need help with?" required error={errors.topic} htmlFor="contact-topic">
                    <Select required {...field("topic")} options={helpTopics} />
                  </Field>
                  <Field label="Message" required error={errors.message} htmlFor="contact-message" className="sm:col-span-2">
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your book and your question."
                      {...field("message")}
                      className={cn(field("message").className, "min-h-36 resize-y py-3.5 leading-relaxed")}
                    />
                  </Field>
                </div>

                {/* Honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                {status === "error" && failure && (
                  <div
                    ref={statusRef}
                    tabIndex={-1}
                    role="alert"
                    className="mt-6 flex items-start gap-3 border-l-4 border-brand bg-mist p-4 text-[0.98rem] leading-relaxed text-ink outline-none"
                  >
                    <AlertCircle aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                    <p>{failure}</p>
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p id="contact-consent" className="max-w-md text-[0.86rem] leading-relaxed text-ink-muted">
                    By sending this form, you agree that Blue Book Press may use these details to respond to your enquiry. We never sell your
                    information. See our{" "}
                    <Link href={pages.privacy.path} className="underline underline-offset-4 hover:text-brand">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-[1rem] font-semibold text-white transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 aria-hidden className="size-4.5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function mailto(v: Values) {
  const body = [
    v.message,
    "",
    `Name: ${v.name}`,
    v.phone && `Phone: ${v.phone}`,
    v.bookTitle && `Book title: ${v.bookTitle}`,
    `Current stage: ${v.stage}`,
    `Help with: ${v.topic}`,
  ]
    .filter((l) => l !== "")
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(`Question from ${v.name}`)}&body=${encodeURIComponent(body)}`;
}
