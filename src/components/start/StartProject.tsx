"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Pencil } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLenis } from "@/components/common/Providers";
import { Reveal } from "@/components/common/Reveal";
import {
  Choices,
  Consent,
  FailureMessage,
  Field,
  FileField,
  FormAlert,
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
import {
  bookFormats,
  budgetRanges,
  contactMethods,
  emptyProject,
  formatBytes,
  genreSuggestions,
  projectStages,
  projectSteps,
  supportOptions,
  timelines,
  validateFile,
  validateProject,
  type ProjectValues,
} from "@/lib/inquiry";
import { cn } from "@/lib/cn";
import { guidance, startingPoints, type StartingPoint } from "./startingPoints";

type V = ProjectValues & { file: File | null };

const initial: V = { ...emptyProject, file: null };
const validate = (v: V) => {
  const e = validateProject(v);
  const f = validateFile(v.file);
  if (f) e.file = f;
  return e;
};

const stepNames = ["About You", "About Your Book", "Your Goals", "Review and Submit"];

const SUCCESS = "Your book project details have been received. Our team will review your goals and contact you to discuss the most suitable path forward.";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Choose your starting point" selector and the four-step book project form.
 * The chosen starting point updates the guidance shown and prefills the
 * stage and suggested services (unless the visitor has already set them).
 */
export function StartProject() {
  const { values: v, setValues, errors, setErrors, set, blur, check } = useFormState<V>(initial, validate);
  const { status, failure, send, loading } = useSubmission("/api/start-your-book");
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const edited = useRef({ stage: false, support: false });
  const pendingFocus = useRef<string | null>(null);
  const navigated = useRef(false);

  const formSection = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const focusField = useFocusField("proj");

  useEffect(() => {
    const tz = detectTimeZone();
    if (tz) setValues((prev) => (prev.timeZone ? prev : { ...prev, timeZone: tz }));
  }, [setValues]);

  const scrollToForm = () => {
    const el = formSection.current;
    if (!el) return;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // After a step change: focus the requested field, or the step heading.
  useEffect(() => {
    if (!navigated.current) return;
    if (pendingFocus.current) {
      focusField(formRef.current, pendingFocus.current);
      pendingFocus.current = null;
    } else {
      stepHeading.current?.focus({ preventScroll: true });
      scrollToForm();
    }
  }, [step]);

  const goTo = (n: number, field?: string) => {
    navigated.current = true;
    pendingFocus.current = field ?? null;
    setReached((r) => Math.max(r, n));
    if (n !== step) return setStep(n);
    // Same step: nothing re-renders, so move focus here.
    if (field) focusField(formRef.current, field);
    else {
      stepHeading.current?.focus({ preventScroll: true });
      scrollToForm();
    }
  };

  const choose = (sp: StartingPoint) => {
    const g = guidance[sp];
    setValues((prev) => ({
      ...prev,
      startingPoint: sp,
      stage: edited.current.stage && prev.stage ? prev.stage : g.stage,
      support: edited.current.support ? prev.support : g.support,
    }));
    setErrors(({ stage: _s, startingPoint: _p, ...rest }) => rest);
  };

  const text = (key: keyof ProjectValues, hint = false) => ({
    ...describe(`proj-${key}`, errors[key], hint),
    name: key,
    value: v[key] as string,
    onChange: (e: { target: { value: string } }) => set(key, e.target.value),
    onBlur: blur(key),
  });

  const stepOf = (key: string) => projectSteps.findIndex((keys) => (keys as string[]).includes(key));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (step < 3) {
      const first = check(projectSteps[step]);
      if (first) return focusField(formRef.current, first);
      return goTo(step + 1);
    }

    const all = projectSteps.flat();
    const first = check(all);
    if (first) return goTo(stepOf(first), first);

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
      requestAnimationFrame(() => {
        doneRef.current?.focus({ preventScroll: true });
        scrollToForm();
      });
      return;
    }
    if (res.fields) {
      setErrors(res.fields);
      const bad = all.find((k) => res.fields![k]);
      if (bad) goTo(stepOf(bad), bad);
      return;
    }
    requestAnimationFrame(() => alertRef.current?.focus());
  };

  const chosen = v.startingPoint ? guidance[v.startingPoint as StartingPoint] : null;

  const mailto = mailtoHref(`Book project from ${v.name || "a website visitor"}`, [
    ["Starting point", v.startingPoint],
    ["Name", v.name],
    ["Phone", v.phone],
    ["Preferred contact", v.contactMethod],
    ["Time zone", v.timeZone],
    ["Title", v.bookTitle],
    ["Genre", v.genre],
    ["Audience", v.audience],
    ["Stage", v.stage],
    ["Word count", v.wordCount],
    ["Formats", v.formats.join(", ")],
    ["Description", v.description],
    ["Why", v.reason],
    ["Outcome", v.outcome],
    ["Services", v.support.join(", ")],
    ["Timeline", v.timeline],
    ["Budget", v.budget],
    ["Notes", v.notes],
  ]);

  return (
    <>
      {/* Choose your starting point */}
      <section id="starting-point" aria-labelledby="sp-title" className="border-t border-line bg-white py-section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <p className="eyebrow flex items-center gap-3 text-brand">
                <span aria-hidden className="h-0.5 w-8 bg-brand" />
                Step one
              </p>
              <h2 id="sp-title" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ink">
                Choose Your Starting Point
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-muted">Select the option closest to where you are today. You can change it at any time.</p>
            </Reveal>
            <fieldset className="mt-8">
              <legend className="sr-only">Where are you starting from?</legend>
              <div className="space-y-2.5">
                {startingPoints.map((sp) => {
                  const on = v.startingPoint === sp;
                  return (
                    <label
                      key={sp}
                      className={cn(
                        "flex min-h-14 cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-3 text-[1.02rem] font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                        on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-ink/50",
                      )}
                    >
                      <input type="radio" name="startingPoint" value={sp} checked={on} onChange={() => choose(sp)} className="sr-only" />
                      <span aria-hidden className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border-2", on ? "border-white" : "border-ink/40")}>
                        {on && <span className="size-2.5 rounded-full bg-white" />}
                      </span>
                      {sp}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-7">
            <div aria-live="polite" className="h-full border-2 border-ink p-[clamp(1.5rem,3.5vw,2.75rem)] lg:sticky lg:top-28 lg:h-auto">
              <AnimatePresence mode="wait" initial={false}>
                {chosen ? (
                  <motion.div key={v.startingPoint} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
                    <p className="eyebrow text-[0.75rem] text-brand">{v.startingPoint}</p>
                    <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-ink">{chosen.title}</h3>
                    <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{chosen.text}</p>
                    <p className="mt-7 text-[0.95rem] font-semibold text-ink">Possible support paths</p>
                    <ul className="mt-3 space-y-2.5">
                      {chosen.paths.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[1rem] leading-relaxed text-ink-soft">
                          <Check aria-hidden className="mt-1 size-4.5 shrink-0 text-brand" strokeWidth={2.5} />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t border-line pt-5 text-[0.9rem] leading-relaxed text-ink-muted">
                      These are possible paths, not fixed packages. We confirm what genuinely suits your book after reviewing your project.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p className="eyebrow text-[0.75rem] text-brand">Next-step guidance</p>
                    <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-ink">Every starting point has a way forward</h3>
                    <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
                      Choose an option to see the kinds of support that often help at that stage. Your choice also fills in parts of the project form below.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => goTo(0)}
                className="group mt-8 inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-7 font-semibold text-white transition-colors duration-300 hover:bg-ink"
              >
                Continue to Project Details
                <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Book project form */}
      <section ref={formSection} id="project" aria-labelledby="project-title" className="bg-mist py-section">
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow flex items-center gap-3 text-brand">
              <span aria-hidden className="h-0.5 w-8 bg-brand" />
              Book project form
            </p>
            <h2 id="project-title" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ink">
              Tell Us About Your Project
            </h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted">
              Four short steps. You can go back at any time without losing what you have entered.
            </p>

            <div className="mt-10 border-2 border-ink bg-white p-[clamp(1.25rem,3.5vw,2.75rem)]">
              {status === "success" ? (
                <div ref={doneRef} tabIndex={-1} role="status" className="py-10 text-center outline-none">
                  <CheckCircle2 aria-hidden className="mx-auto size-12 text-brand" />
                  <p className="mt-5 font-serif text-[1.8rem] font-semibold text-ink">Project details received</p>
                  <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">{SUCCESS}</p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      href={pages["publishing-pathways"].path}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                    >
                      Explore Publishing Pathways
                    </Link>
                    <Link href="/" className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
                      Return to home
                    </Link>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={loading}>
                  <Progress step={step} reached={reached} onGo={(n) => goTo(n)} />

                  <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-7">
                    <h3 ref={stepHeading} tabIndex={-1} className="text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight text-ink outline-none">
                      <span className="mr-2 font-serif tabular-nums text-brand">{String(step + 1).padStart(2, "0")}</span>
                      {stepNames[step]}
                    </h3>
                    {v.startingPoint && step < 3 && (
                      <p className="text-[0.9rem] text-ink-muted">
                        Starting point: <span className="font-semibold text-ink">{v.startingPoint}</span>{" "}
                        <a href="#starting-point" className="ml-1 font-semibold text-ink underline underline-offset-4 hover:text-brand">
                          Change
                        </a>
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    {step < 3 && <RequiredNote />}

                    {step === 0 && (
                      <div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                        <Field label="Full Name" required htmlFor="proj-name" error={errors.name}>
                          <input type="text" autoComplete="name" required {...text("name")} className={cn(controlClass(errors.name), "h-13")} />
                        </Field>
                        <Field label="Email" required htmlFor="proj-email" error={errors.email}>
                          <input type="email" autoComplete="email" inputMode="email" required {...text("email")} className={cn(controlClass(errors.email), "h-13")} />
                        </Field>
                        <Field label="Phone" optional htmlFor="proj-phone" error={errors.phone}>
                          <input type="tel" autoComplete="tel" inputMode="tel" {...text("phone")} className={cn(controlClass(errors.phone), "h-13")} />
                        </Field>
                        <Field label="Time Zone" optional hint="Detected from your device — change it if needed." htmlFor="proj-timeZone" error={errors.timeZone}>
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
                      </div>
                    )}

                    {step === 1 && (
                      <div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                        <Field label="Project or Book Title" optional htmlFor="proj-bookTitle" error={errors.bookTitle}>
                          <input type="text" placeholder="Working titles are welcome" {...text("bookTitle")} className={cn(controlClass(errors.bookTitle), "h-13")} />
                        </Field>
                        <Field label="Book Genre" required htmlFor="proj-genre" error={errors.genre}>
                          <input type="text" list="proj-genres" required placeholder="e.g. Memoir, Fantasy" {...text("genre")} className={cn(controlClass(errors.genre), "h-13")} />
                          <datalist id="proj-genres">
                            {genreSuggestions.map((g) => (
                              <option key={g} value={g} />
                            ))}
                          </datalist>
                        </Field>
                        <Field label="Target Audience" optional htmlFor="proj-audience" error={errors.audience}>
                          <input type="text" placeholder="Who is this book for?" {...text("audience")} className={cn(controlClass(errors.audience), "h-13")} />
                        </Field>
                        <Field
                          label="Current Stage"
                          required
                          hint={v.startingPoint && !edited.current.stage ? "Suggested from your starting point." : undefined}
                          htmlFor="proj-stage"
                          error={errors.stage}
                        >
                          <Select
                            required
                            {...text("stage", Boolean(v.startingPoint && !edited.current.stage))}
                            onChange={(e) => {
                              edited.current.stage = true;
                              set("stage", e.target.value, true);
                            }}
                            options={projectStages}
                            className={controlClass(errors.stage)}
                          />
                        </Field>
                        <Field label="Estimated Word Count" optional htmlFor="proj-wordCount" error={errors.wordCount}>
                          <input type="text" inputMode="numeric" placeholder="e.g. 45,000 or not sure" {...text("wordCount")} className={cn(controlClass(errors.wordCount), "h-13")} />
                        </Field>
                        <Choices
                          name="formats"
                          label="Desired Book Formats"
                          optional
                          multiple
                          options={bookFormats}
                          value={v.formats}
                          onChange={(x) => set("formats", x as string[], true)}
                          error={errors.formats}
                          className="sm:col-span-2"
                        />
                        <Field label="Short Book Description" required htmlFor="proj-description" error={errors.description} className="sm:col-span-2">
                          <textarea
                            rows={4}
                            required
                            placeholder="A few sentences about what the book is about."
                            {...text("description")}
                            className={cn(controlClass(errors.description), "min-h-32 resize-y py-3.5 leading-relaxed")}
                          />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                        <Field label="Why do you want to create this book?" required htmlFor="proj-reason" error={errors.reason} className="sm:col-span-2">
                          <textarea rows={3} required {...text("reason")} className={cn(controlClass(errors.reason), "min-h-28 resize-y py-3.5 leading-relaxed")} />
                        </Field>
                        <Field label="What outcome are you hoping for?" required htmlFor="proj-outcome" error={errors.outcome} className="sm:col-span-2">
                          <textarea
                            rows={3}
                            required
                            placeholder="For example: a finished book for family, a professional launch, reaching new readers"
                            {...text("outcome")}
                            className={cn(controlClass(errors.outcome), "min-h-28 resize-y py-3.5 leading-relaxed")}
                          />
                        </Field>
                        <Choices
                          name="support"
                          label="Services you may need"
                          optional
                          multiple
                          hint={v.startingPoint && !edited.current.support ? "Suggested from your starting point — change anything." : "Choose any that might apply."}
                          options={supportOptions}
                          value={v.support}
                          onChange={(x) => {
                            edited.current.support = true;
                            set("support", x as string[], true);
                          }}
                          error={errors.support}
                          className="sm:col-span-2"
                        />
                        <Field label="Desired Completion Timeline" optional htmlFor="proj-timeline" error={errors.timeline}>
                          <Select {...text("timeline")} onChange={(e) => set("timeline", e.target.value, true)} options={timelines} className={controlClass(errors.timeline)} />
                        </Field>
                        <Field label="Budget Range" optional htmlFor="proj-budget" error={errors.budget}>
                          <Select {...text("budget")} onChange={(e) => set("budget", e.target.value, true)} options={budgetRanges} className={controlClass(errors.budget)} />
                        </Field>
                        <Field label="Additional Notes" optional htmlFor="proj-notes" error={errors.notes} className="sm:col-span-2">
                          <textarea rows={3} {...text("notes")} className={cn(controlClass(errors.notes), "min-h-28 resize-y py-3.5 leading-relaxed")} />
                        </Field>
                        <FileField id="proj-file" file={v.file} onChange={(f) => set("file", f, true)} error={errors.file} className="sm:col-span-2" />
                      </div>
                    )}

                    {step === 3 && <Review v={v} onEdit={(n) => goTo(n)} />}
                  </div>

                  <Honeypot />

                  {step === 3 && (
                    <div className="mt-8 space-y-6">
                      <Consent id="proj-consent" checked={v.consent} onChange={(c) => set("consent", c, true)} error={errors.consent}>
                        I agree that Blue Book Press may use the details I have shared to respond to my enquiry, as described in the{" "}
                        <Link href={pages.privacy.path} className="font-semibold text-ink underline underline-offset-4 hover:text-brand">
                          Privacy Policy
                        </Link>
                        . I understand that sending this form does not transfer ownership of my book or enrol me in a paid service.
                      </Consent>
                      {status === "error" && (
                        <FormAlert alertRef={alertRef}>
                          <FailureMessage failure={failure} mailto={mailto} hasFile={!!v.file} />
                        </FormAlert>
                      )}
                    </div>
                  )}

                  <div className="mt-9 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        disabled={loading}
                        className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border-2 border-ink px-7 font-semibold text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-60"
                      >
                        <ArrowLeft aria-hidden className="size-4.5 transition-transform group-hover:-translate-x-1" />
                        Back
                      </button>
                    ) : (
                      <span className="hidden sm:block" />
                    )}
                    {step < 3 ? (
                      <button
                        type="submit"
                        className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-8 font-semibold text-white transition-colors duration-300 hover:bg-ink"
                      >
                        Continue
                        <span className="sr-only"> to {stepNames[step + 1]}</span>
                        <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <SubmitButton loading={loading}>
                        Submit Project Details
                        <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
                      </SubmitButton>
                    )}
                  </div>
                  <p aria-live="polite" className="sr-only">
                    {loading ? "Sending your project details…" : `Step ${step + 1} of 4: ${stepNames[step]}`}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Progress({ step, reached, onGo }: { step: number; reached: number; onGo: (n: number) => void }) {
  return (
    <nav aria-label="Form progress">
      <p className="text-[0.9rem] font-semibold text-ink sm:hidden">
        Step {step + 1} of 4 <span className="font-normal text-ink-muted">· {stepNames[step]}</span>
      </p>
      <ol className="mt-3 grid grid-cols-4 gap-2 sm:mt-0 sm:gap-3">
        {stepNames.map((name, i) => {
          const done = i < step;
          const current = i === step;
          const canGo = i !== step && i <= reached;
          const body = (
            <>
              <span aria-hidden className={cn("block h-1 rounded-full transition-colors duration-500", i <= step ? "bg-brand" : "bg-line")} />
              <span className="mt-3 hidden items-center gap-2 text-left text-[0.88rem] leading-tight sm:flex">
                <span
                  aria-hidden
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[0.75rem] font-bold tabular-nums",
                    done ? "border-brand bg-brand text-white" : current ? "border-brand text-brand" : "border-line text-ink-muted",
                  )}
                >
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn(current ? "font-semibold text-ink" : "text-ink-muted")}>{name}</span>
              </span>
              <span className="sr-only">
                Step {i + 1}: {name}
                {done ? " (completed)" : ""}
              </span>
            </>
          );
          return (
            <li key={name} aria-current={current ? "step" : undefined}>
              {canGo ? (
                <button type="button" onClick={() => onGo(i)} className="block w-full rounded-sm text-left hover:[&_span]:text-ink">
                  {body}
                </button>
              ) : (
                <div>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Review({ v, onEdit }: { v: V; onEdit: (step: number) => void }) {
  const groups: { title: string; step: number; rows: [string, string][] }[] = [
    {
      title: "About You",
      step: 0,
      rows: [
        ["Full name", v.name],
        ["Email", v.email],
        ["Phone", v.phone],
        ["Preferred contact", v.contactMethod],
        ["Time zone", v.timeZone],
      ],
    },
    {
      title: "About Your Book",
      step: 1,
      rows: [
        ["Starting point", v.startingPoint],
        ["Title", v.bookTitle],
        ["Genre", v.genre],
        ["Target audience", v.audience],
        ["Current stage", v.stage],
        ["Word count", v.wordCount],
        ["Formats", v.formats.join(", ")],
        ["Description", v.description],
      ],
    },
    {
      title: "Your Goals",
      step: 2,
      rows: [
        ["Why this book", v.reason],
        ["Hoped-for outcome", v.outcome],
        ["Services", v.support.join(", ")],
        ["Timeline", v.timeline],
        ["Budget", v.budget],
        ["Notes", v.notes],
        ["File", v.file ? `${v.file.name} (${formatBytes(v.file.size)})` : ""],
      ],
    },
  ];
  return (
    <div className="space-y-8">
      <p className="text-[1rem] text-ink-muted">Please check your details. Use Edit to change anything before you submit.</p>
      {groups.map((g) => (
        <section key={g.title} aria-label={g.title} className="border-t border-line pt-5">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-serif text-[1.2rem] font-semibold text-ink">{g.title}</h4>
            <button
              type="button"
              onClick={() => onEdit(g.step)}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-[0.92rem] font-semibold text-ink underline underline-offset-4 hover:text-brand"
            >
              <Pencil aria-hidden className="size-4" />
              Edit<span className="sr-only"> {g.title}</span>
            </button>
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
            {g.rows.map(([k, val]) => (
              <div key={k} className="contents">
                <dt className="text-[0.92rem] text-ink-muted">{k}</dt>
                <dd className={cn("whitespace-pre-line break-words text-[0.98rem] text-ink", !val && "text-ink-muted")}>{val || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
