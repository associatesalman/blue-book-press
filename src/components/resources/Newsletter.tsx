"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { EASE } from "@/components/portfolio/motion";
import { isEmail, type FormResult } from "@/lib/forms";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Minimal email sign-up. Posts to /api/newsletter, which forwards to the
 * NEWSLETTER_WEBHOOK_URL integration; until that is configured the request
 * fails honestly and the visitor is offered the email address instead.
 */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("company") as string) ?? "";
    if (!isEmail(email)) {
      setStatus("error");
      setError("Please enter a valid email address, like name@example.com.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot }),
      });
      const data = (await res.json()) as FormResult;
      if (data.ok) {
        setStatus("success");
        return;
      }
      setStatus("error");
      setError(
        data.error === "invalid"
          ? (data.fields?.email ?? "Please check your email address.")
          : data.error === "not_configured"
            ? `Sign-ups aren't open just yet. Email ${site.email} and we'll add you personally.`
            : `We couldn't complete your sign-up. Please try again, or email ${site.email}.`,
      );
    } catch {
      setStatus("error");
      setError(`We couldn't reach the server. Please check your connection and try again.`);
    }
  };

  const invalid = status === "error";

  return (
    <section aria-labelledby="newsletter-title" className="border-t border-line bg-white py-[clamp(4rem,8vw,6.5rem)]">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-6"
        >
          <p className="eyebrow flex items-center gap-3 text-brand">
            <span aria-hidden className="h-0.5 w-8 bg-brand" />
            Resource updates
          </p>
          <h2 id="newsletter-title" className="mt-5 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-ink">
            Publishing Insight, Without the Noise
          </h2>
          <p className="mt-5 max-w-xl text-lead text-ink-muted">
            Receive practical guidance about book development, publishing, distribution, and visibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          className="lg:col-span-6"
        >
          {status === "success" ? (
            <div role="status" className="flex items-start gap-4 border-l-4 border-brand bg-mist p-6">
              <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-brand" />
              <div>
                <p className="font-serif text-[1.3rem] font-semibold text-ink">You're on the list.</p>
                <p className="mt-1 text-ink-muted">Thank you. New guidance will arrive at {email}.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-describedby={`${id}-note`}>
              <label htmlFor={`${id}-email`} className="block text-[0.95rem] font-semibold text-ink">
                Email address
              </label>
              <div className="mt-2.5 flex flex-col gap-3 sm:flex-row">
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? `${id}-error` : undefined}
                  className={cn(
                    "h-14 min-w-0 flex-1 rounded-full border-2 bg-white px-6 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand",
                    invalid ? "border-ink" : "border-line",
                  )}
                />
                {/* Honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-[1rem] font-semibold text-white transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-80"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 aria-hidden className="size-4.5 animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
              {invalid && (
                <p id={`${id}-error`} role="alert" className="mt-3 flex items-start gap-2 text-[0.95rem] font-medium text-ink">
                  <AlertCircle aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                  {error}
                </p>
              )}
              <p id={`${id}-note`} className="mt-4 text-[0.88rem] leading-relaxed text-ink-muted">
                We'll only use your email to send publishing guidance from Blue Book Press. Unsubscribe at any time. Read our{" "}
                <Link href={pages.privacy.path} className="underline underline-offset-4 hover:text-brand">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
