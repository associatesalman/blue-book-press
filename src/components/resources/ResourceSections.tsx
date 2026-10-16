"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Button } from "@/components/common/Button";
import { EASE, LineReveal } from "@/components/portfolio/motion";
import { cn } from "@/lib/cn";

type Action = { label: string; href: string };

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

/** Simple white page hero: label, heading with line reveal, description. */
export function ResourceHero({
  label,
  lines,
  description,
  centered = false,
  children,
}: {
  label: string;
  lines: ReactNode[];
  description: string;
  centered?: boolean;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="resource-hero-title" className="bg-white pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(3.5rem,8vw,6.5rem)]">
      <div className={cn("container-site", centered && "text-center")}>
        <motion.p {...rise(0.05)} className={cn("eyebrow flex items-center gap-3 text-brand", centered && "justify-center")}>
          <span aria-hidden className="h-0.5 w-8 bg-brand" />
          {label}
          {centered && <span aria-hidden className="h-0.5 w-8 bg-brand" />}
        </motion.p>
        <LineReveal
          id="resource-hero-title"
          as="h1"
          onMount
          delay={0.12}
          className={cn(
            "mt-6 text-[clamp(2.35rem,5.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink",
            centered ? "mx-auto max-w-4xl" : "max-w-5xl",
          )}
          lines={lines}
        />
        <motion.p {...rise(0.4)} className={cn("mt-7 max-w-2xl text-lead text-ink-muted", centered && "mx-auto")}>
          {description}
        </motion.p>
        {children && <motion.div {...rise(0.55)}>{children}</motion.div>}
      </div>
    </section>
  );
}

/** Slim brand-blue contact strip placed between content groups. */
export function ContactStrip({
  title,
  text,
  primary,
  secondary,
  className,
}: {
  title: string;
  text: string;
  primary: Action;
  secondary: Action;
  className?: string;
}) {
  return (
    <motion.aside {...inView()} aria-label="Contact our team" className={cn("bg-brand text-white", className)}>
      <div className="grid gap-7 px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2.25rem,4.5vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div>
          <h2 className="max-w-2xl text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.12] tracking-[-0.02em]">{title}</h2>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/85">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primary.href} variant="light" arrow className="whitespace-nowrap">
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="outline-light" className="whitespace-nowrap">
            {secondary.label}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}

/** Closing brand-blue call to action. */
export function ResourcesCta({
  id,
  label,
  title,
  text,
  primary,
  secondary,
}: {
  id: string;
  label: string;
  title: string;
  text: string;
  primary: Action;
  secondary: Action;
}) {
  return (
    <section aria-labelledby={id} className="bg-brand py-[clamp(4.5rem,9vw,7.5rem)] text-white">
      <div className="container-site grid gap-y-9 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-white/80">
            <span aria-hidden className="h-0.5 w-8 bg-white" />
            {label}
          </p>
          <LineReveal
            id={id}
            className="mt-6 text-[clamp(2.3rem,5vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            lines={[title]}
          />
        </div>
        <motion.div {...inView(0.2)} className="lg:col-span-5">
          <p className="text-lead text-white/85">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={primary.href} variant="light" arrow className="whitespace-nowrap">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="outline-light" className="whitespace-nowrap">
              {secondary.label}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
