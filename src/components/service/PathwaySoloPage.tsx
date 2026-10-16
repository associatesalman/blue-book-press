"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Button } from "@/components/common/Button";
import { DrawLine, Reveal } from "@/components/common/Reveal";
import { useServicePageReady } from "@/components/common/ServicePageLoader";
import { pages } from "@/data/pages";
import type { PageImage, PathwayPage } from "@/data/pathwayPages";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type Related = { slug: string; title: string; href: string };

type Props = {
  slug: string;
  title: string;
  content: PathwayPage;
  related: Related[];
  category: { label: string; href: string };
};

/**
 * Solo page for Publishing Pathways services: full-width bands alternating
 * brand blue (white type) and white (ink/blue type). The white bands open out
 * from a rounded inset to full bleed as they scroll in.
 * Hero → Overview → What we handle → Why it matters → Process → Best fit → CTA.
 */
export function PathwaySoloPage({ slug, title, content, related, category }: Props) {
  return (
    <div className="overflow-x-clip bg-brand text-white">
      <Hero title={title} content={content} category={category} slug={slug} />
      <Overview content={content} />
      <Handles content={content} />
      <Matters content={content} />
      <Process content={content} />
      <Fit content={content} related={related} />
      <Closing content={content} slug={slug} />
    </div>
  );
}

// ── Shared bits ─────────────────────────────────────────────────────────────

const startHref = (slug: string) => `${pages["start-your-book"].path}?service=${slug}`;
const consultHref = pages["book-consultation"].path;

const H2 = "text-[clamp(2.2rem,4.4vw,3.9rem)] font-bold leading-[1.05] tracking-[-0.03em]";

function Eyebrow({ index, children, tone = "light", center }: { index: string; children: ReactNode; tone?: "light" | "ink"; center?: boolean }) {
  return (
    <Reveal>
      <p className={cn("eyebrow flex items-center gap-3", center && "justify-center", tone === "light" ? "text-white/75" : "text-brand")}>
        <span className="font-serif tabular-nums">{index}</span>
        <span aria-hidden className={cn("h-px w-10", tone === "light" ? "bg-white/45" : "bg-brand/50")} />
        {children}
      </p>
    </Reveal>
  );
}

/** White band that widens from a rounded inset to full bleed as it enters. */
function WhiteBand({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const clipPath = useTransform(p, (v) => {
    if (reduced) return "none";
    const t = Math.min(1, Math.max(0, v));
    return `inset(0% ${(1 - t) * 4}% 0% ${(1 - t) * 4}% round ${(1 - t) * 48}px)`;
  });
  return (
    <motion.section ref={ref} style={{ clipPath }} className={cn("bg-white text-ink", className)}>
      {children}
    </motion.section>
  );
}

/** Photo that unveils softly and drifts a little with scroll. */
function EditorialImage({ image, className, sizes }: { image: PageImage; className?: string; sizes: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-4%", "4%"]);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(8% 6% 8% 6% round 1.5rem)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
      className={cn("relative overflow-hidden rounded-[1.5rem] bg-mist", className)}
    >
      <motion.div className="absolute -inset-y-[5%] inset-x-0" style={{ y }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/** Splits a sentence into words, marking those inside `highlight`. */
function splitStatement(text: string, highlight: string) {
  const [before, after = ""] = text.split(highlight);
  // Punctuation right after the highlight stays attached to its last word.
  const [, punct = "", rest = ""] = after.match(/^([.,!?;:]*)(.*)$/) ?? [];
  const hl = highlight.split(" ");
  hl[hl.length - 1] += punct;
  return [
    ...before.trim().split(" ").filter(Boolean).map((w) => ({ w, hl: false })),
    ...hl.map((w) => ({ w, hl: true })),
    ...rest.trim().split(" ").filter(Boolean).map((w) => ({ w, hl: false })),
  ];
}

const wordParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const wordChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

// ── 1 · Hero (centred, text only) ──────────────────────────────────────────

function Hero({ title, content, category, slug }: Omit<Props, "related">) {
  const ready = useServicePageReady();
  const reduced = useReducedMotion();
  const words = title.split(" ");

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section className="relative flex min-h-[calc(92svh-var(--spacing-header))] items-center overflow-hidden py-[clamp(4rem,9vw,7rem)]">
      {/* Two hairline rings and a soft light — the only decoration. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute size-[min(46rem,120vw)] rounded-full border border-white/[0.12]"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE, delay: 0.15 }}
          className="absolute size-[min(72rem,190vw)] rounded-full border border-white/[0.07]"
        />
        <span className="absolute size-[min(40rem,100vw)] rounded-full bg-white/[0.07] blur-[110px]" />
      </div>

      <div className="container-site relative text-center">
        <motion.nav {...fade(0)} aria-label="Breadcrumb">
          <Link href={category.href} className="eyebrow inline-flex items-center gap-3 text-white/70 transition-colors hover:text-white">
            <span aria-hidden className="h-px w-8 bg-white/40" />
            {category.label}
            <span aria-hidden className="h-px w-8 bg-white/40" />
          </Link>
        </motion.nav>

        <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(3rem,8.2vw,7.4rem)] font-bold leading-[0.98] tracking-[-0.045em]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: reduced ? 0 : "110%" }}
                animate={ready ? { y: "0%" } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.08 }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p {...fade(0.6)} className="mx-auto mt-8 max-w-3xl text-[clamp(1.12rem,1.6vw,1.4rem)] leading-relaxed text-white/80">
          {content.hero.subtitle}
        </motion.p>

        <motion.div {...fade(0.8)} className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={startHref(slug)} variant="light" arrow>
            Start This Service
          </Button>
          <Button href={consultHref} variant="outline-light">
            Talk to a Consultant
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.span
        aria-hidden
        {...fade(1.2)}
        className="absolute bottom-8 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-white/20 sm:block"
      >
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-white"
          animate={reduced ? undefined : { y: ["-100%", "200%"] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.span>
    </section>
  );
}

// ── 2 · Overview (white) ───────────────────────────────────────────────────

function Overview({ content }: { content: PathwayPage }) {
  const { hero, meaning } = content;
  const words = splitStatement(hero.title, hero.highlight);
  return (
    <WhiteBand className="py-section">
      <div className="container-site">
        <Eyebrow index="01" tone="ink">
          Service Overview
        </Eyebrow>
        <motion.h2
          variants={wordParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-8 max-w-5xl text-[clamp(2.4rem,5.2vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.035em]"
        >
          {words.map(({ w, hl }, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span variants={wordChild} className={cn("inline-block", hl && "font-serif font-semibold italic text-brand")}>
                {w}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </motion.h2>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <EditorialImage
            image={meaning.image}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[4/3] self-start lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:aspect-[4/5]"
          />
          <div className="lg:pt-4">
            <Reveal>
              <h3 className="text-[clamp(1.5rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.015em]">{meaning.title}</h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[clamp(1.2rem,1.7vw,1.45rem)] leading-[1.55] text-ink-soft">{meaning.lead}</p>
            </Reveal>
            <div className="mt-10 space-y-8">
              {meaning.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <DrawLine className="bg-line" />
                  <p className="pt-6 text-[1.08rem] leading-[1.8] text-ink-muted">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WhiteBand>
  );
}

// ── 3 · What we handle (blue, editorial rows) ──────────────────────────────

function Handles({ content }: { content: PathwayPage }) {
  const { handles } = content;
  return (
    <section className="py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow index="02">What We Handle</Eyebrow>
            <Reveal delay={0.08}>
              <h2 className={cn(H2, "mt-7")}>{handles.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="text-lead text-white/75">{handles.intro}</p>
          </Reveal>
        </div>

        <ol className="mt-[clamp(3rem,6vw,5rem)]">
          {handles.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={0.04} className="group relative">
              <DrawLine className="bg-white/20" />
              <div className="grid gap-3 py-8 md:grid-cols-[5rem_1fr_1.15fr] md:items-baseline md:gap-10 md:py-10">
                <span className="font-serif text-[1rem] font-semibold tabular-nums text-white/50 transition-colors duration-500 group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.5rem,2.5vw,2.15rem)] font-semibold leading-tight tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:translate-x-2">
                  {item.title}
                </h3>
                <p className="max-w-xl text-[1.06rem] leading-relaxed text-white/75">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <DrawLine className="bg-white/20" />

        <div className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-8 md:grid-cols-[5rem_1fr_1.15fr] md:gap-10">
          <span aria-hidden className="hidden md:block" />
          <Reveal>
            <p className="eyebrow text-white/75">What you receive</p>
            <p className="mt-4 max-w-xs text-[1.06rem] leading-relaxed text-white/70">Delivered, explained and yours to keep.</p>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {handles.receive.map((r, i) => (
              <Reveal as="li" key={r} delay={0.05 * i} className="flex items-start gap-3 text-[1.02rem] leading-snug">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                {r}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── 4 · Why it matters (white, big statement) ──────────────────────────────

function Matters({ content }: { content: PathwayPage }) {
  const { matters } = content;
  return (
    <WhiteBand className="py-section">
      <div className="container-site text-center">
        <Eyebrow index="03" tone="ink" center>
          Why It Matters
        </Eyebrow>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-8 max-w-5xl text-[clamp(2.5rem,5.6vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em]">{matters.title}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-lead text-ink-muted">{matters.intro}</p>
        </Reveal>
      </div>

      <div className="container-site mt-[clamp(3rem,6vw,5rem)]">
        <EditorialImage image={matters.image} sizes="(min-width: 1280px) 80rem, 100vw" className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />

        <ol className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {matters.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.08 * i}>
              <DrawLine className="bg-brand" delay={0.1 * i} />
              <span className="mt-6 block font-serif text-[1rem] font-semibold tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[1.35rem] font-semibold leading-snug tracking-[-0.01em]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>

        {matters.note && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-14 flex max-w-3xl items-start justify-center gap-3 border-y border-line py-5 text-left text-[1rem] leading-relaxed text-ink-soft">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              {matters.note}
            </p>
          </Reveal>
        )}
      </div>
    </WhiteBand>
  );
}

// ── 5 · Process (blue, scroll-filled timeline) ─────────────────────────────

function Process({ content }: { content: PathwayPage }) {
  const { process } = content;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fill = useTransform(smooth, (v) => (reduced ? 1 : v));

  return (
    <section className="py-section">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+3rem)] lg:self-start">
          <Eyebrow index="04">How It Works</Eyebrow>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{process.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-lead text-white/75">{process.intro}</p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative">
          <span aria-hidden className="absolute bottom-3 left-[0.45rem] top-3 w-px bg-white/20" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-3 left-[0.45rem] top-3 w-px origin-top bg-white" />
          {process.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.05} className="relative pb-14 pl-12 last:pb-0 sm:pl-16">
              <span aria-hidden className="absolute left-0 top-2 size-[0.95rem] rounded-full border-2 border-white bg-brand" />
              <p className="font-serif text-[0.95rem] font-semibold tabular-nums text-white/55">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 max-w-xl text-[1.06rem] leading-relaxed text-white/75">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── 6 · Best fit (white) ───────────────────────────────────────────────────

function Fit({ content, related }: { content: PathwayPage; related: Related[] }) {
  const { fit } = content;
  return (
    <WhiteBand className="py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow index="05" tone="ink">
              Best Fit
            </Eyebrow>
            <Reveal delay={0.08}>
              <h2 className={cn(H2, "mt-7")}>{fit.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="text-lead text-ink-muted">{fit.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-[clamp(3rem,6vw,4.5rem)]">
          {fit.authors.map((a, i) => (
            <Reveal as="li" key={a.who} delay={0.04 * i} className="group">
              <DrawLine className="bg-line" />
              <div className="grid gap-3 py-8 md:grid-cols-[1fr_1.15fr] md:items-baseline md:gap-12">
                <h3 className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold leading-tight tracking-[-0.025em] transition-colors duration-500 group-hover:text-brand">
                  {a.who}
                </h3>
                <p className="text-[1.06rem] leading-relaxed text-ink-muted">{a.why}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <DrawLine className="bg-line" />

        {related.length > 0 && (
          <Reveal delay={0.1} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="eyebrow shrink-0 text-ink-muted">Often paired with</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.href}
                    className="group/link inline-flex items-center gap-1.5 border-b border-brand/30 pb-1 text-[1.02rem] font-semibold text-brand transition-colors duration-300 hover:border-brand"
                  >
                    {r.title}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </WhiteBand>
  );
}

// ── 7 · Closing CTA (blue) ─────────────────────────────────────────────────

function Closing({ content, slug }: { content: PathwayPage; slug: string }) {
  return (
    <section className="relative overflow-hidden py-[clamp(5.5rem,11vw,10rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="absolute size-[min(44rem,120vw)] rounded-full border border-white/[0.1]" />
        <span className="absolute size-[min(38rem,100vw)] rounded-full bg-white/[0.07] blur-[110px]" />
      </div>
      <div className="container-site relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-[clamp(2.6rem,5.8vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.04em]">{content.cta.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-2xl text-lead text-white/80">{content.cta.text}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={startHref(slug)} variant="light" arrow>
              Start This Service
            </Button>
            <Button href={consultHref} variant="outline-light">
              Talk to a Consultant
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
