"use client";

import { AlertCircle, Check, ChevronDown, FileText, Loader2, Paperclip, X } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode, type SelectHTMLAttributes } from "react";
import { useLenis } from "@/components/common/Providers";
import { site } from "@/data/site";
import type { FormResult } from "@/lib/forms";
import { UPLOAD, formatBytes, type Errors } from "@/lib/inquiry";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------
   Shared form building blocks for the contact, consultation and
   Start Your Book forms: one look, one set of accessibility rules.
   ------------------------------------------------------------------ */

/** Text input / textarea / select styling. */
export const controlClass = (error?: string) =>
  cn(
    "mt-2 w-full rounded-xl border-2 bg-white px-4 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand",
    error ? "border-ink" : "border-line hover:border-ink/40",
  );

export function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.9rem] font-medium text-ink">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
      {children}
    </p>
  );
}

/** Label + control + hint + error. The control must use `id={htmlFor}`. */
export function Field({
  label,
  htmlFor,
  required,
  optional,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-[0.95rem] font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-brand">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="mt-1 text-[0.86rem] text-ink-muted">
          {hint}
        </p>
      )}
      {children}
      <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>
    </div>
  );
}

/** aria wiring for a control inside <Field>. */
export const describe = (id: string, error?: string, hint?: boolean) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined,
});

export function Select({
  options,
  className,
  value,
  placeholder = "Choose one…",
  ...rest
}: {
  options: readonly string[];
  className: string;
  value: string;
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "value">) {
  return (
    <div className="relative">
      <select value={value} {...rest} className={cn(className, "h-13 appearance-none pr-11", !value && "text-ink-muted")}>
        <option value="" disabled={rest.required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 mt-1 size-5 -translate-y-1/2 text-brand" />
    </div>
  );
}

/** Group of related fields with a numbered legend. */
export function FormSection({ n, title, text, children }: { n: number; title: string; text?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <legend className="float-left w-full">
        <span className="flex items-baseline gap-3">
          <span aria-hidden className="font-serif text-[1.05rem] font-semibold tabular-nums text-brand">
            {String(n).padStart(2, "0")}
          </span>
          <span className="font-serif text-[clamp(1.3rem,2vw,1.55rem)] font-semibold leading-tight text-ink">{title}</span>
        </span>
      </legend>
      {text && <p className="clear-both pt-2 text-[0.95rem] text-ink-muted">{text}</p>}
      <div className="clear-both grid gap-x-5 gap-y-5 pt-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/** Multiple choice (checkboxes) or single choice (radios) rendered as tappable pills. */
export function Choices({
  name,
  label,
  options,
  value,
  onChange,
  multiple = false,
  required,
  optional,
  hint,
  error,
  className,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string | string[];
  onChange: (next: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
}) {
  const selected = (o: string) => (Array.isArray(value) ? value.includes(o) : value === o);
  const toggle = (o: string) => {
    if (!multiple) return onChange(o);
    const list = value as string[];
    // "Not Sure Yet" is exclusive of specific choices.
    if (o === "Not Sure Yet") return onChange(list.includes(o) ? [] : [o]);
    const without = list.filter((x) => x !== "Not Sure Yet");
    onChange(without.includes(o) ? without.filter((x) => x !== o) : [...without, o]);
  };
  const id = `${name}-group`;
  return (
    <fieldset
      className={className}
      aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined}
      aria-invalid={error ? true : undefined}
      data-field={name}
    >
      <legend className="text-[0.95rem] font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-brand">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.86rem] text-ink-muted">
          {hint}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((o) => {
          const on = selected(o);
          return (
            <label
              key={o}
              className={cn(
                "relative inline-flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-full border-2 px-4 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-ink/50",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o}
                checked={on}
                onChange={() => toggle(o)}
                className="sr-only"
              />
              {multiple && (
                <span
                  aria-hidden
                  className={cn("flex size-4.5 items-center justify-center rounded-[5px] border-2", on ? "border-white bg-white text-brand" : "border-ink/40")}
                >
                  {on && <Check className="size-3.5" strokeWidth={3} />}
                </span>
              )}
              {o}
            </label>
          );
        })}
      </div>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </fieldset>
  );
}

/** Optional manuscript / sample upload with client-side type and size checks. */
export function FileField({
  id,
  file,
  onChange,
  error,
  className,
}: {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={className} data-field="file">
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-ink">
        Manuscript or sample
        <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>
      </label>
      <p id={`${id}-hint`} className="mt-1 text-[0.86rem] text-ink-muted">
        {UPLOAD.hint}. A few chapters is plenty for a first look.
      </p>
      <div
        className={cn(
          "mt-2 flex flex-col gap-3 rounded-xl border-2 border-dashed p-4 sm:flex-row sm:items-center sm:justify-between",
          error ? "border-ink" : "border-line",
        )}
      >
        {file ? (
          <p className="flex min-w-0 items-center gap-3 text-[0.95rem] text-ink">
            <FileText aria-hidden className="size-6 shrink-0 text-brand" />
            <span className="min-w-0">
              <span className="block truncate font-semibold">{file.name}</span>
              <span className="text-[0.86rem] text-ink-muted">{formatBytes(file.size)}</span>
            </span>
          </p>
        ) : (
          <p className="flex items-center gap-3 text-[0.95rem] text-ink-muted">
            <Paperclip aria-hidden className="size-5 shrink-0 text-brand" />
            No file selected
          </p>
        )}
        <div className="flex shrink-0 gap-2">
          <input
            ref={input}
            id={id}
            name="file"
            type="file"
            accept={UPLOAD.accept}
            className="peer sr-only"
            aria-describedby={[`${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ")}
            aria-invalid={error ? true : undefined}
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
          <label
            htmlFor={id}
            aria-hidden
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 border-ink px-5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"
          >
            {file ? "Replace file" : "Choose file"}
          </label>
          {file && (
            <button
              type="button"
              onClick={() => {
                if (input.current) input.current.value = "";
                onChange(null);
              }}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.95rem] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <X aria-hidden className="size-4" />
              Remove<span className="sr-only"> {file.name}</span>
            </button>
          )}
        </div>
      </div>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

export function Consent({ id, checked, onChange, error, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: ReactNode }) {
  return (
    <div data-field="consent">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          required
          className="mt-1 size-5 shrink-0 cursor-pointer accent-[var(--brand-blue)]"
        />
        <span>
          {children}
          <span aria-hidden className="ml-1 text-brand">
            *
          </span>
        </span>
      </label>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

export function RequiredNote() {
  return (
    <p className="text-[0.9rem] text-ink-muted">
      Fields marked <span aria-hidden className="font-semibold text-brand">*</span>
      <span className="sr-only">with an asterisk</span> are required.
    </p>
  );
}

/** Hidden field that only bots fill in. */
export function Honeypot() {
  return (
    <div aria-hidden className="hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ loading, children, loadingText = "Sending…", className }: { loading: boolean; children: ReactNode; loadingText?: string; className?: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-disabled={loading}
      className={cn(
        "group inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-[1rem] font-semibold text-white transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-80",
        className,
      )}
    >
      {loading ? (
        <>
          <Loader2 aria-hidden className="size-4.5 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormAlert({ children, alertRef }: { children: ReactNode; alertRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={alertRef}
      tabIndex={-1}
      role="alert"
      className="flex items-start gap-3 border-l-4 border-brand bg-mist p-4 text-[0.98rem] leading-relaxed text-ink outline-none"
    >
      <AlertCircle aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
      <div>{children}</div>
    </div>
  );
}

/** The visitor's time zone, e.g. "Europe/London", for prefilling. */
export function detectTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`);

/** Prefilled email for when online delivery is unavailable (attachments can't be prefilled). */
export function mailtoHref(subject: string, lines: [string, string][]) {
  let body = lines
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  if (body.length > 1800) body = `${body.slice(0, 1800)}…`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type Outcome = { ok: true } | { ok: false; fields?: Record<string, string> };

/**
 * Posts a multipart form to an enquiry endpoint. Guards against double
 * submission, sends a per-fill submission id (so the server can drop
 * repeats), and only reports success when the server confirms delivery.
 * Entered data is never cleared on failure.
 */
export function useSubmission(endpoint: string) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [failure, setFailure] = useState<"not_configured" | "failed" | "network" | null>(null);
  const busy = useRef(false);
  const submissionId = useRef<string | null>(null);

  async function send(fd: FormData): Promise<Outcome> {
    if (busy.current) return { ok: false };
    busy.current = true;
    submissionId.current ??= newId();
    fd.set("submissionId", submissionId.current);
    setStatus("loading");
    setFailure(null);
    try {
      const res = await fetch(endpoint, { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({ ok: false, error: "failed" }))) as FormResult;
      if (data.ok) {
        setStatus("success");
        submissionId.current = null;
        return { ok: true };
      }
      if (data.error === "invalid" && data.fields) {
        setStatus("idle");
        return { ok: false, fields: data.fields };
      }
      setStatus("error");
      setFailure(data.error === "not_configured" ? "not_configured" : "failed");
      return { ok: false };
    } catch {
      setStatus("error");
      setFailure("network");
      return { ok: false };
    } finally {
      busy.current = false;
    }
  }

  const reset = () => {
    setStatus("idle");
    setFailure(null);
    submissionId.current = null;
  };

  return { status, failure, send, reset, loading: status === "loading" };
}

/** Honest failure message with an email fallback that carries the visitor's details. */
export function FailureMessage({ failure, mailto, hasFile }: { failure: "not_configured" | "failed" | "network" | null; mailto: string; hasFile?: boolean }) {
  if (!failure) return null;
  const email = (
    <a href={mailto} className="font-semibold underline underline-offset-4">
      {site.email}
    </a>
  );
  if (failure === "network")
    return <p>We couldn't reach our server, so your request has not been sent. Please check your connection and try again — everything you entered is still here.</p>;
  if (failure === "not_configured")
    return (
      <p>
        Our online form isn't accepting requests just yet, so nothing has been sent. Please email us at {email} — your details will be filled in for you
        {hasFile ? ", and you can attach your file to the email" : ""}.
      </p>
    );
  return (
    <p>
      Something went wrong and your request was not sent. Please try again in a moment — everything you entered is still here — or email us at {email}.
    </p>
  );
}

/**
 * Controlled form state with gentle validation: a field shows its error once
 * it has been left (blur) or the form was submitted, and the error updates
 * as the visitor corrects it.
 */
export function useFormState<V extends Record<string, unknown>>(initial: V, validate: (v: V) => Errors) {
  const [values, setValues] = useState<V>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const touched = useRef(new Set<string>());

  const refresh = (next: V) => {
    const all = validate(next);
    setErrors((prev) => {
      const out = { ...prev };
      for (const k of touched.current) {
        if (all[k]) out[k] = all[k];
        else delete out[k];
      }
      return out;
    });
  };

  /** Update a value; `touch` shows its error straight away (choices, files, checkboxes). */
  const set = <K extends keyof V>(key: K, value: V[K], touch = false) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touch) touched.current.add(key as string);
    refresh(next);
  };

  const blur = (key: keyof V) => () => {
    touched.current.add(key as string);
    refresh(values);
  };

  /** Validates the given fields, shows their errors and returns the first invalid one. */
  const check = (keys: readonly string[], extra: Errors = {}) => {
    const all = { ...validate(values), ...extra };
    keys.forEach((k) => touched.current.add(k));
    setErrors((prev) => {
      const out = { ...prev };
      for (const k of keys) {
        if (all[k]) out[k] = all[k];
        else delete out[k];
      }
      return out;
    });
    return keys.find((k) => all[k]);
  };

  const reset = (to: V) => {
    setValues(to);
    setErrors({});
    touched.current.clear();
  };

  return { values, setValues, errors, setErrors, set, blur, check, reset };
}

/** Moves focus (and the smooth scroll) to a field by key. */
export function useFocusField(prefix: string) {
  const lenis = useLenis();
  return useCallback(
    (root: HTMLElement | null, key: string) => {
      const el = root?.querySelector<HTMLElement>(`#${prefix}-${key}`) ?? root?.querySelector<HTMLElement>(`[data-field="${key}"] input`);
      if (!el) return;
      el.focus({ preventScroll: true });
      if (lenis) lenis.scrollTo(el, { offset: -72 }); // keep the label above the field in view
      else el.scrollIntoView({ block: "center", behavior: "smooth" });
    },
    [lenis, prefix],
  );
}
