"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Button } from "@/components/common/Button";
import { DrawLine, Reveal } from "@/components/common/Reveal";
import { useServicePageReady } from "@/components/common/ServicePageLoader";
import type { ASImage, ASSection, AuthorServicePage, BeforeAfter as BeforeAfterSample } from "@/data/authorServicePages";
import { pages } from "@/data/pages";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tone = "blue" | "white";
type Next = { slug: string; title: string; href: string; summary: string };

type Props = {
  slug: string;
  title: string;
  content: AuthorServicePage;
  next: Next[];
  category: { label: string; href: string };
};

const DEFAULT_ORDER: ASSection[] = ["solves", "handles", "improves", "details", "beforeAfter", "outcome"];
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
const LABEL: Record<ASSection, string> = {
  solves: "What This Solves",
  handles: "How We Handle It",
  improves: "What Gets Improved",
  details: "Service Details",
  beforeAfter: "Before & After",
  outcome: "Your Outcome",
};

/** Tone tokens: blue sheets carry white type, white sheets carry ink and blue. */
const T = {
  blue: { bg: "bg-brand text-white", muted: "text-white/75", faint: "text-white/55", line: "bg-white/20", border: "border-white/20", accent: "text-white", mark: "bg-white" },
  white: { bg: "bg-white text-ink", muted: "text-ink-muted", faint: "text-ink-muted/80", line: "bg-line", border: "border-line", accent: "text-brand", mark: "bg-brand" },
} as const;

const H2 = "text-[clamp(2.2rem,4.4vw,3.9rem)] font-bold leading-[1.05] tracking-[-0.03em]";

/**
 * Author Services solo page. Sections are stacked "sheets" (rounded tops
 * overlapping the one before, like manuscript pages) alternating white and
 * brand blue. Section order and layout variants come from the content, so
 * every service page has its own rhythm within one system.
 */
export function AuthorServiceSoloPage({ slug, title, content, next, category }: Props) {
  const order = content.order ?? DEFAULT_ORDER;
  const startHref = `${pages["start-your-book"].path}?service=${slug}`;
  const ctaTone: Tone = order.length % 2 === 0 ? "white" : "blue";

  return (
    <div className="overflow-x-clip bg-brand">
      <Hero title={title} content={content} category={category} startHref={startHref} />
      {order.map((key, i) => {
        const tone: Tone = i % 2 === 0 ? "white" : "blue";
        const sheet = { tone, z: i + 1, index: ROMAN[i], label: LABEL[key] };
        switch (key) {
          case "solves":
            return <Solves key={key} {...sheet} data={content.solves} />;
          case "handles":
            return <Handles key={key} {...sheet} data={content.handles} />;
          case "improves":
            return <Improves key={key} {...sheet} data={content.improves} />;
          case "details":
            return <Details key={key} {...sheet} data={content.details} />;
          case "beforeAfter":
            return <BeforeAfter key={key} {...sheet} data={content.beforeAfter} />;
          case "outcome":
            return <Outcome key={key} {...sheet} data={content.outcome} service={title} />;
        }
      })}
      <Closing tone={ctaTone} z={order.length + 1} content={content} next={next} startHref={startHref} category={category} />
    </div>
  );
}

// ── Shared bits ─────────────────────────────────────────────────────────────

type SheetProps = { tone: Tone; z: number; index: string; label: string };

/** A full-width band whose rounded top overlaps the band before it. */
function Sheet({ tone, z, children, className }: { tone: Tone; z: number; children: ReactNode; className?: string }) {
  return (
    <section
      style={{ zIndex: z }}
      className={cn(
        "relative -mt-10 rounded-t-[2.5rem] pb-[clamp(6rem,10vw,9rem)] pt-[clamp(5rem,9vw,8rem)] shadow-[0_-30px_60px_-45px_rgba(0,0,0,0.45)] sm:rounded-t-[3.5rem]",
        T[tone].bg,
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Chapter-style label: a roman numeral in italic serif, then the section name. */
function Label({ tone, index, children, center }: { tone: Tone; index: string; children: ReactNode; center?: boolean }) {
  return (
    <Reveal>
      <p className={cn("flex items-baseline gap-3", center && "justify-center")}>
        <span className={cn("font-serif text-[1.35rem] italic", T[tone].accent)}>{index}.</span>
        <span className={cn("eyebrow", T[tone].muted)}>{children}</span>
      </p>
    </Reveal>
  );
}

/** Photo that opens from a soft inset and drifts gently with scroll. */
function Photo({ image, className, sizes }: { image: ASImage; className?: string; sizes: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0% 0% 18% 0% round 1.75rem)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.75rem)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
      className={cn("relative overflow-hidden rounded-[1.75rem] bg-mist", className)}
    >
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

// ── Hero (centred: heading, purpose, one CTA) ──────────────────────────────

function Hero({ title, content, category, startHref }: { title: string; content: AuthorServicePage; category: Props["category"]; startHref: string }) {
  const ready = useServicePageReady();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glyphY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "28%"]);
  const glyphRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 6]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-18%"]);
  const words = title.split(" ");

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="relative z-0 flex min-h-[calc(90svh-var(--spacing-header))] items-center overflow-hidden bg-brand pb-[clamp(7rem,12vw,10rem)] pt-[clamp(4rem,8vw,6rem)] text-white">
      {/* The service's typographic mark, drifting behind the heading */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.span
          style={{ y: glyphY, rotate: glyphRotate }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2, ease: EASE }}
          className="select-none font-serif text-[min(80vw,46rem)] font-semibold italic leading-none text-white/[0.07]"
        >
          {content.hero.glyph}
        </motion.span>
      </div>

      <motion.div style={{ y: textY }} className="container-site relative text-center">
        <motion.div {...fade(0)}>
          <Link
            href={category.href}
            className="eyebrow inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-white/80 transition-colors hover:border-white hover:text-white"
          >
            {category.label}
          </Link>
        </motion.div>

        <h1 className="mx-auto mt-9 max-w-6xl text-[clamp(3rem,8vw,7.2rem)] font-bold leading-[0.98] tracking-[-0.045em]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: reduced ? 0 : "0.35em", filter: reduced ? "none" : "blur(10px)" }}
              animate={ready ? { opacity: 1, y: "0em", filter: "blur(0px)" } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.1 }}
            >
              {w}
              {i < words.length - 1 && " "}
            </motion.span>
          ))}
        </h1>

        <motion.p {...fade(0.55)} className="mx-auto mt-8 max-w-2xl text-[clamp(1.12rem,1.6vw,1.4rem)] leading-relaxed text-white/80">
          {content.hero.purpose}
        </motion.p>

        <motion.div {...fade(0.75)} className="mt-11">
          <Button href={startHref} variant="light" arrow>
            Start This Service
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── What this solves ───────────────────────────────────────────────────────

function Solves({ tone, z, index, label, data }: SheetProps & { data: AuthorServicePage["solves"] }) {
  const t = T[tone];
  if (data.variant === "manifesto" || !data.image) {
    return (
      <Sheet tone={tone} z={z}>
        <div className="container-site">
          <div className="text-center">
            <Label tone={tone} index={index} center>
              {label}
            </Label>
            <Reveal delay={0.08}>
              <h2 className="mx-auto mt-8 max-w-5xl text-[clamp(2.5rem,5.4vw,4.9rem)] font-bold leading-[1.03] tracking-[-0.04em]">{data.title}</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className={cn("mx-auto mt-8 max-w-3xl text-lead", t.muted)}>{data.intro}</p>
            </Reveal>
          </div>
          <ol className="mt-[clamp(3.5rem,7vw,5.5rem)] grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {data.problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.08 * i} className={cn("sm:px-6 lg:border-l lg:first:border-l-0 lg:first:pl-0", t.border)}>
                <span className={cn("font-serif text-[2.4rem] italic leading-none", t.accent)}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[1.3rem] font-semibold leading-snug">{p.title}</h3>
                <p className={cn("mt-3 leading-relaxed", t.muted)}>{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Photo image={data.image} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] self-start lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:aspect-[4/5]" />
        <div>
          <Label tone={tone} index={index}>
            {label}
          </Label>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={cn("mt-7 text-lead", t.muted)}>{data.intro}</p>
          </Reveal>
          <ul className="mt-12">
            {data.problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.05 * i} className="group">
                <DrawLine className={t.line} />
                <div className="flex gap-5 py-7">
                  <span aria-hidden className={cn("mt-3.5 h-px w-7 shrink-0 transition-[width] duration-500 group-hover:w-10", t.mark)} />
                  <div>
                    <h3 className="text-[clamp(1.3rem,1.9vw,1.6rem)] font-semibold leading-snug">{p.title}</h3>
                    <p className={cn("mt-2 leading-relaxed", t.muted)}>{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Sheet>
  );
}

// ── How we handle it ───────────────────────────────────────────────────────

function Handles({ tone, z, index, label, data }: SheetProps & { data: AuthorServicePage["handles"] }) {
  const t = T[tone];
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fill = useTransform(smooth, (v) => (reduced ? 1 : v));

  if (data.variant === "flow") {
    const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" }[data.steps.length] ?? "lg:grid-cols-4";
    return (
      <Sheet tone={tone} z={z}>
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <Label tone={tone} index={index}>
                {label}
              </Label>
              <Reveal delay={0.08}>
                <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <p className={cn("text-lead", t.muted)}>{data.intro}</p>
            </Reveal>
          </div>

          <ol ref={ref} className={cn("relative mt-[clamp(3.5rem,7vw,5.5rem)] grid gap-10 lg:gap-8", cols)}>
            {/* Track: vertical on mobile, horizontal on desktop; fills with scroll */}
            <span aria-hidden className={cn("absolute bottom-0 left-[0.4rem] top-0 w-px lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.4rem] lg:h-px lg:w-auto", t.line)} />
            <motion.span aria-hidden style={{ scaleY: fill }} className={cn("absolute bottom-0 left-[0.4rem] top-0 w-px origin-top lg:hidden", t.mark)} />
            <motion.span aria-hidden style={{ scaleX: fill }} className={cn("absolute left-0 right-0 top-[0.4rem] hidden h-px origin-left lg:block", t.mark)} />
            {data.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.08 * i} className="relative pl-10 lg:pl-0 lg:pt-12">
                <span aria-hidden className={cn("absolute left-0 top-1 size-[0.85rem] rounded-full lg:top-0", t.mark)} />
                <p className={cn("font-serif text-[1rem] italic", t.faint)}>Step {i + 1}</p>
                <h3 className="mt-2 text-[1.35rem] font-semibold leading-snug">{s.title}</h3>
                <p className={cn("mt-3 leading-relaxed", t.muted)}>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+3rem)] lg:self-start">
          <Label tone={tone} index={index}>
            {label}
          </Label>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={cn("mt-6 max-w-md text-lead", t.muted)}>{data.intro}</p>
          </Reveal>
        </div>
        <ol ref={ref}>
          {data.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.05} x={24} y={0} className="group">
              <DrawLine className={t.line} />
              <div className="flex gap-6 py-9 sm:gap-10">
                <span
                  className={cn(
                    "w-[4.5rem] shrink-0 font-serif text-[clamp(3.2rem,5vw,4.6rem)] font-semibold italic leading-[0.85] text-transparent transition-colors duration-500 sm:w-[6rem]",
                    tone === "blue" ? "[-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] group-hover:text-white" : "[-webkit-text-stroke:1.5px_var(--brand-blue)] group-hover:text-brand",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-tight tracking-[-0.015em]">{s.title}</h3>
                  <p className={cn("mt-3 max-w-xl text-[1.06rem] leading-relaxed", t.muted)}>{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Sheet>
  );
}

// ── What gets improved ─────────────────────────────────────────────────────

/** One large quality word that drifts horizontally as it scrolls through. */
function DriftWord({ word, text, i, tone }: { word: string; text: string; i: number; tone: Tone }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dir = i % 2 === 0 ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : [`${-6 * dir}%`, `${6 * dir}%`]);
  const t = T[tone];
  return (
    <li ref={ref}>
      <DrawLine className={t.line} />
      <div className={cn("flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between md:gap-10", i % 2 === 1 && "md:flex-row-reverse md:text-right")}>
        <motion.p style={{ x }} className="text-[clamp(2.8rem,7.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.045em]">
          {word}
          <span className={t.accent}>.</span>
        </motion.p>
        <Reveal delay={0.1} className={cn("max-w-sm text-[1.06rem] leading-relaxed md:pb-3", t.muted)}>
          {text}
        </Reveal>
      </div>
    </li>
  );
}

function Improves({ tone, z, index, label, data }: SheetProps & { data: AuthorServicePage["improves"] }) {
  const t = T[tone];
  if (data.variant === "words" || !data.image) {
    return (
      <Sheet tone={tone} z={z}>
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <Label tone={tone} index={index}>
                {label}
              </Label>
              <Reveal delay={0.08}>
                <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <p className={cn("text-lead", t.muted)}>{data.intro}</p>
            </Reveal>
          </div>
          <ul className="mt-[clamp(3rem,6vw,4.5rem)]">
            {data.qualities.map((q, i) => (
              <DriftWord key={q.word} word={q.word} text={q.text} i={i} tone={tone} />
            ))}
          </ul>
          <DrawLine className={t.line} />
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <Label tone={tone} index={index}>
            {label}
          </Label>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={cn("mt-6 text-lead", t.muted)}>{data.intro}</p>
          </Reveal>
          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {data.qualities.map((q, i) => (
              <Reveal key={q.word} delay={0.06 * i} className="py-6">
                <DrawLine className={t.line} />
                <dt className="mt-6 text-[clamp(1.7rem,2.6vw,2.2rem)] font-bold leading-tight tracking-[-0.025em]">
                  {q.word}
                  <span className={t.accent}>.</span>
                </dt>
                <dd className={cn("mt-2 leading-relaxed", t.muted)}>{q.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <Photo image={data.image} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] self-start lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:aspect-[4/5]" />
      </div>
    </Sheet>
  );
}

// ── Service details ────────────────────────────────────────────────────────

function Details({ tone, z, index, label, data }: SheetProps & { data: AuthorServicePage["details"] }) {
  const t = T[tone];
  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+3rem)] lg:self-start">
          <Label tone={tone} index={index}>
            {label}
          </Label>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={cn("mt-6 max-w-md text-lead", t.muted)}>{data.intro}</p>
          </Reveal>
          {data.image && <Photo image={data.image} sizes="(min-width: 1024px) 34vw, 100vw" className="mt-10 aspect-[16/10]" />}
        </div>

        <div className="space-y-14">
          {data.groups.map((g, gi) => (
            <Reveal key={g.title} delay={0.05 * gi}>
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-[clamp(1.5rem,2.3vw,1.95rem)] font-semibold tracking-[-0.02em]">{g.title}</h3>
                <span className={cn("font-serif text-[1rem] italic", t.faint)}>{g.items.length} included</span>
              </div>
              <DrawLine className={cn("mt-5", tone === "blue" ? "bg-white/60" : "bg-brand")} />
              <ul className="mt-2 grid md:grid-cols-2 md:gap-x-10">
                {g.items.map((item) => (
                  <li key={item} className={cn("flex items-start gap-3 border-b py-4 text-[1.04rem] leading-snug", t.border)}>
                    <span aria-hidden className={cn("mt-[0.6rem] h-px w-3.5 shrink-0", t.mark)} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

// ── Before / after ─────────────────────────────────────────────────────────

const RAW_TEXT =
  "The rain had stopped by the time Mara reached the gate. She stood there for a long time, the key cold in her hand, listening to the house. Nothing moved. Somewhere inside, a clock she remembered from childhood was still keeping time.";

/** Illustrative book page: a raw manuscript page or a typeset one. */
function PageMock({ set, focus }: { set: boolean; focus: "body" | "opener" }) {
  if (!set) {
    return (
      <div className="mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-sm bg-white p-[8%] text-left font-[Arial,sans-serif] text-[0.62rem] leading-[2.1] text-ink shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] sm:text-[0.7rem]">
        <p className="text-[0.85rem] font-bold">{focus === "opener" ? "Chapter 3: The Locked Room" : "Chapter 3"}</p>
        <p className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{RAW_TEXT}</p>
        <p className="mt-2">{RAW_TEXT.slice(0, 120)}</p>
        <p className="pl-1">&nbsp;&nbsp;{RAW_TEXT.slice(40, 170)}</p>
      </div>
    );
  }
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-sm bg-white px-[11%] py-[10%] text-left font-serif text-[0.6rem] leading-[1.5] text-ink shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] sm:text-[0.68rem]">
      {focus === "body" ? (
        <>
          <p className="text-center text-[0.55rem] uppercase tracking-[0.3em] text-ink-muted">Home Again</p>
          <div className="mt-[8%] space-y-0 text-justify hyphens-auto">
            <p>{RAW_TEXT}</p>
            <p className="indent-4">{RAW_TEXT}</p>
            <p className="indent-4">{RAW_TEXT.slice(0, 150)}.</p>
          </div>
          <p className="absolute inset-x-0 bottom-[5%] text-center text-[0.55rem] text-ink-muted">47</p>
        </>
      ) : (
        <>
          <div className="pt-[18%] text-center">
            <p className="text-[0.55rem] uppercase tracking-[0.4em] text-brand">Chapter Three</p>
            <p className="mt-2 text-[1.15rem] italic leading-tight">The Locked Room</p>
            <p aria-hidden className="mt-2 text-brand">❦</p>
          </div>
          <p className="mt-[10%] text-justify hyphens-auto first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5 first-letter:text-[2.6em] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-brand">
            {RAW_TEXT}
          </p>
        </>
      )}
    </div>
  );
}

/** Illustrative cover: a typical first-attempt draft, or the finished cover image. */
function CoverMock({ set, sample }: { set: boolean; sample: Extract<BeforeAfterSample, { kind: "cover" }> }) {
  if (set) {
    return (
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[15rem] overflow-hidden rounded-[3px] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.6)]">
        <Image src={sample.cover} alt={`${sample.title} by ${sample.author}, finished cover`} fill sizes="15rem" className="object-cover" />
        <span aria-hidden className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/25 via-white/10 to-transparent" />
      </div>
    );
  }
  return (
    <div className="mx-auto flex aspect-[2/3] w-full max-w-[15rem] flex-col items-center justify-between rounded-[3px] bg-gradient-to-b from-mist to-line p-[10%] font-[Arial,sans-serif] text-ink-muted shadow-[0_20px_40px_-24px_rgba(0,0,0,0.4)]">
      <p className="text-[0.95rem]">{sample.title}</p>
      <span aria-hidden className="size-20 rounded-full bg-ink/10" />
      <p className="text-[0.6rem]">{sample.author}</p>
    </div>
  );
}

function SampleBody({ sample, after }: { sample: BeforeAfterSample; after: boolean }) {
  switch (sample.kind) {
    case "text":
      return <p className="font-serif text-[clamp(1.08rem,1.5vw,1.3rem)] leading-[1.7]">{after ? sample.after : sample.before}</p>;
    case "fields":
      return (
        <dl className="divide-y divide-current/10">
          {sample.rows.map((r) => (
            <div key={r.label} className="grid gap-1 py-3.5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="text-[0.78rem] font-bold uppercase tracking-[0.14em] opacity-60">{r.label}</dt>
              <dd className="text-[1rem] leading-snug">{after ? r.after : r.before}</dd>
            </div>
          ))}
        </dl>
      );
    case "page":
      return <PageMock set={after} focus={sample.focus} />;
    case "cover":
      return <CoverMock set={after} sample={sample} />;
  }
}

function BeforeAfter({ tone, z, index, label, data }: SheetProps & { data: AuthorServicePage["beforeAfter"] }) {
  const t = T[tone];
  const blue = tone === "blue";
  const panels = [
    {
      after: false,
      name: "Before",
      notes: data.notes.before,
      Icon: X,
      cls: blue ? "border border-dashed border-white/40 text-white/85" : "border border-dashed border-ink/25 bg-mist/60 text-ink-soft",
    },
    {
      after: true,
      name: "After",
      notes: data.notes.after,
      Icon: Check,
      cls: blue ? "bg-white text-ink shadow-[0_40px_70px_-40px_rgba(0,0,0,0.6)]" : "bg-brand text-white shadow-[0_40px_70px_-40px_rgba(31,79,224,0.7)]",
    },
  ];
  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <Label tone={tone} index={index} center>
            {label}
          </Label>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={cn("mt-6 text-lead", t.muted)}>{data.intro}</p>
          </Reveal>
        </div>

        <div className="relative mt-[clamp(3rem,6vw,4.5rem)] grid gap-6 lg:grid-cols-2 lg:gap-10">
          {panels.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40, rotate: i === 0 ? -1.2 : 1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.12 * i }}
              className={cn("flex flex-col rounded-[1.75rem] p-7 sm:p-10", p.cls)}
            >
              <p className="eyebrow flex items-center gap-2 opacity-80">
                <span aria-hidden className={cn("size-2 rounded-full", p.after ? (blue ? "bg-brand" : "bg-white") : "bg-current opacity-50")} />
                {p.name}
              </p>
              <div className="mt-7 flex-1">
                <SampleBody sample={data.sample} after={p.after} />
              </div>
              <ul className="mt-8 space-y-2.5 border-t border-current/15 pt-6">
                {p.notes.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-[0.98rem] leading-snug">
                    <p.Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", p.after ? (blue ? "text-brand" : "text-white") : "opacity-60")} strokeWidth={2.5} />
                    {n}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <span
            aria-hidden
            className={cn(
              "absolute left-1/2 top-1/2 hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full lg:flex",
              blue ? "bg-ink text-white" : "bg-ink text-white",
            )}
          >
            <ArrowRight className="size-5" />
          </span>
        </div>
        <p className={cn("mt-6 text-center text-[0.88rem] italic", t.faint)}>Illustrative example</p>
      </div>
    </Sheet>
  );
}

// ── Outcome ────────────────────────────────────────────────────────────────

function Outcome({ tone, z, index, label, data, service }: SheetProps & { data: AuthorServicePage["outcome"]; service: string }) {
  const t = T[tone];
  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
        <div>
          <Label tone={tone} index={index}>
            {label}
          </Label>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{data.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={cn("mt-6 max-w-xl text-lead", t.muted)}>{data.text}</p>
          </Reveal>
          <ol className="mt-12 space-y-8">
            {data.benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={0.06 * i} className="flex gap-6">
                <span className={cn("font-serif text-[2.2rem] italic leading-none", t.accent)}>{ROMAN[i]}</span>
                <div>
                  <h3 className="text-[1.35rem] font-semibold leading-snug">{b.title}</h3>
                  <p className={cn("mt-1.5 leading-relaxed", t.muted)}>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Delivery note: what the author receives */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className={cn(
            "rounded-[1.25rem] bg-white p-7 text-ink sm:p-10 lg:sticky lg:top-[calc(var(--spacing-header)+3rem)]",
            tone === "blue" ? "shadow-[0_50px_80px_-40px_rgba(0,0,0,0.6)]" : "border border-line shadow-[0_40px_70px_-45px_rgba(0,0,0,0.45)]",
          )}
        >
          <div className="flex items-start justify-between gap-6 border-b-2 border-ink pb-5">
            <div>
              <p className="eyebrow text-brand">Delivery note</p>
              <p className="mt-2 text-[1.5rem] font-bold leading-tight tracking-[-0.02em]">{service}</p>
            </div>
            <p className="font-serif text-[0.95rem] italic text-ink-muted">Blue Book Press</p>
          </div>
          <ul>
            {data.receive.map((r, i) => (
              <li key={r} className="flex items-center gap-4 border-b border-dashed border-line py-4">
                <span className="w-6 font-serif text-[0.9rem] italic tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[1.04rem] leading-snug">{r}</span>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap justify-between gap-2 text-[0.88rem] text-ink-muted">
            <span>Yours to keep</span>
            <span>Final approval: you</span>
          </p>
        </motion.div>
      </div>
    </Sheet>
  );
}

// ── Closing CTA ────────────────────────────────────────────────────────────

function Closing({
  tone,
  z,
  content,
  next,
  startHref,
  category,
}: {
  tone: Tone;
  z: number;
  content: AuthorServicePage;
  next: Next[];
  startHref: string;
  category: Props["category"];
}) {
  const t = T[tone];
  const blue = tone === "blue";
  return (
    <Sheet tone={tone} z={z}>
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-[clamp(2.7rem,6.4vw,5.8rem)] font-bold leading-[0.98] tracking-[-0.045em]">{content.cta.title}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className={cn("mt-7 max-w-xl text-lead", t.muted)}>{content.cta.text}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Button href={startHref} variant={blue ? "light" : "primary"} arrow>
                Start This Service
              </Button>
              <Link
                href={category.href}
                className={cn("group inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline", blue ? "text-white" : "text-ink")}
              >
                All {category.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {next.length > 0 && (
            <Reveal delay={0.15}>
              <p className={cn("eyebrow", t.muted)}>Often next</p>
              <ul className="mt-4">
                {next.map((n) => (
                  <li key={n.slug}>
                    <Link href={n.href} className={cn("group flex items-start justify-between gap-6 border-t py-6", t.border)}>
                      <span>
                        <span className="block text-[1.4rem] font-semibold leading-tight transition-colors duration-300 group-hover:underline group-hover:underline-offset-4">
                          {n.title}
                        </span>
                        <span className={cn("mt-1.5 block text-[0.98rem] leading-relaxed", t.muted)}>{n.summary}</span>
                      </span>
                      <ArrowUpRight aria-hidden className={cn("mt-1 size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1", t.accent)} />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </Sheet>
  );
}
