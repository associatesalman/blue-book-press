"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { DrawLine, Reveal } from "@/components/common/Reveal";
import { useServicePageReady } from "@/components/common/ServicePageLoader";
import { getMarketingServicePage, type MarketingServicePage, type MVImage } from "@/data/marketingServicePages";
import { pages } from "@/data/pages";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type Related = { slug: string; title: string; href: string };

type Props = {
  slug: string;
  title: string;
  related: Related[];
  category: { label: string; href: string };
};

const H2 = "text-[clamp(2.3rem,4.6vw,4.1rem)] font-bold leading-[1.04] tracking-[-0.035em]";

/**
 * Marketing & Visibility solo page ("campaign" layout):
 * hero with a widening cinematic frame → understanding (scroll-filled
 * statement + Q&A) → what we handle (blue, tracked index) → why it matters
 * (image band + statement grid) → zig-zag process → closing CTA.
 * Content is read here by slug (it carries icon components).
 */
export function MarketingSoloPage({ slug, title, related, category }: Props) {
  const content = getMarketingServicePage(slug);
  if (!content) return null;
  return (
    <div className="overflow-x-clip bg-white text-ink">
      <Hero slug={slug} title={title} content={content} category={category} />
      <Understand title={title} content={content} />
      <Handles content={content} />
      <Matters content={content} />
      <Process content={content} />
      <Closing title={title} related={related} category={category} />
    </div>
  );
}

function Label({ index, children, light }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Reveal>
      <p className={cn("eyebrow flex items-center gap-3", light ? "text-white/80" : "text-brand")}>
        <span className={cn("flex size-7 items-center justify-center rounded-full text-[0.75rem] tracking-normal", light ? "bg-white text-brand" : "bg-brand text-white")}>
          {index}
        </span>
        {children}
      </p>
    </Reveal>
  );
}

/** Image that unveils upward and drifts slightly with scroll. */
function Photo({ image, className, sizes }: { image: MVImage; className?: string; sizes: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-5%", "5%"]);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
      className={cn("relative overflow-hidden rounded-[1.5rem] bg-mist", className)}
    >
      <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

// ── 1 · Hero: centred text, then a frame that widens to full bleed ────────

function Hero({ slug, title, content, category }: { slug: string; title: string; content: MarketingServicePage; category: Props["category"] }) {
  const ready = useServicePageReady();
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start 0.9", "start 0.15"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const clipPath = useTransform(p, (v) => {
    if (reduced) return "inset(0% 4% 0% 4% round 1.75rem)";
    const t = Math.min(1, Math.max(0, v));
    return `inset(0% ${(1 - t) * 6}% 0% ${(1 - t) * 6}% round ${(1 - t) * 28}px)`;
  });

  const { hero } = content;
  const [before, after = ""] = hero.title.split(hero.highlight);
  const words = [
    ...before.trim().split(" ").filter(Boolean).map((w) => ({ w, hl: false })),
    ...hero.highlight.split(" ").map((w) => ({ w, hl: true })),
    ...after.trim().split(" ").filter(Boolean).map((w) => ({ w, hl: false })),
  ];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-site text-center">
        <motion.div {...fade(0)}>
          <Link
            href={category.href}
            className="inline-flex items-center gap-2.5 rounded-full border border-line py-2 pl-3 pr-4 text-[0.9rem] font-semibold text-ink-soft transition-colors hover:border-brand hover:text-brand"
          >
            <span aria-hidden className="size-2 rounded-full bg-brand" />
            {category.label}
            <span aria-hidden className="text-ink-muted">/</span>
            <span className="text-ink">{title}</span>
          </Link>
        </motion.div>

        <h1 className="mx-auto mt-8 max-w-6xl text-[clamp(2.7rem,6.6vw,6.2rem)] font-bold leading-[1] tracking-[-0.045em]">
          {words.map(({ w, hl }, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={cn("inline-block", hl && "text-brand")}
                initial={{ y: reduced ? 0 : "110%" }}
                animate={ready ? { y: "0%" } : undefined}
                transition={{ duration: 1.05, ease: EASE, delay: 0.12 + i * 0.06 }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p {...fade(0.55)} className="mx-auto mt-8 max-w-2xl text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-ink-soft">
          {hero.purpose}
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${pages["start-your-book"].path}?service=${slug}`} arrow>
            Start This Service
          </Button>
          <Button href={pages["book-consultation"].path} variant="outline">
            Talk to a Consultant
          </Button>
        </motion.div>
      </div>

      {/* Cinematic frame: rises in on load, then opens to full width on scroll */}
      <motion.div
        ref={frame}
        initial={{ opacity: 0, y: reduced ? 0 : 60 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
        className="mt-[clamp(3rem,6vw,5rem)]"
      >
        <motion.div style={{ clipPath }} className="relative aspect-[4/3] w-full overflow-hidden bg-mist sm:aspect-[16/9] lg:aspect-[21/9]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduced ? 1 : 1.15 }}
            animate={ready ? { scale: 1 } : undefined}
            transition={{ duration: 2.4, ease: EASE, delay: 0.45 }}
          >
            <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── 2 · Understanding the service ──────────────────────────────────────────

function FillWord({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

function Understand({ title, content }: { title: string; content: MarketingServicePage }) {
  const { understand } = content;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = understand.statement.split(" ");

  return (
    <section className="py-section">
      <div className="container-site">
        <Label index="01">Understanding {title}</Label>
        <h2 className="sr-only">Understanding {title}</h2>
        <p ref={ref} className="mt-9 max-w-6xl text-[clamp(1.9rem,3.8vw,3.4rem)] font-semibold leading-[1.18] tracking-[-0.03em]">
          {reduced
            ? understand.statement
            : words.map((w, i) => <FillWord key={i} word={w} progress={scrollYProgress} start={i / words.length} end={(i + 1) / words.length} />)}
        </p>

        <div className="mt-[clamp(4rem,8vw,6rem)] grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Photo
            image={understand.image}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] self-start lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:aspect-[4/5]"
          />
          <dl>
            {understand.points.map((pt, i) => (
              <Reveal key={pt.q} delay={0.05 * i}>
                <DrawLine className="bg-line" />
                <div className="py-8">
                  <dt className="flex items-baseline gap-3 text-[0.82rem] font-bold uppercase tracking-[0.16em] text-brand">
                    <span className="font-serif text-[1rem] normal-case italic tracking-normal text-ink-muted">0{i + 1}</span>
                    {pt.q}
                  </dt>
                  <dd className="mt-4 text-[clamp(1.12rem,1.5vw,1.3rem)] leading-[1.65] text-ink-soft">{pt.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// ── 3 · What Blue Book Press handles (blue, tracked index) ────────────────

function Handles({ content }: { content: MarketingServicePage }) {
  const { handles } = content;
  const [active, setActive] = useState(0);

  return (
    <section className="bg-brand py-section text-white">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <Label index="02" light>
              What Blue Book Press Handles
            </Label>
            <Reveal delay={0.08}>
              <h2 className={cn(H2, "mt-7")}>{handles.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="text-lead text-white/80">{handles.intro}</p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,5.5rem)] grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-20">
          {/* Index: highlights the item currently in view */}
          <nav aria-label="Service workflow" className="hidden lg:block">
            <ol className="sticky top-[calc(var(--spacing-header)+3rem)] space-y-1">
              {handles.items.map((it, i) => (
                <li key={it.title} className="flex items-center gap-3 py-1.5">
                  <span className={cn("h-px transition-all duration-500 ease-[var(--ease-soft)]", active === i ? "w-10 bg-white" : "w-4 bg-white/35")} />
                  <span className={cn("text-[0.95rem] transition-colors duration-500", active === i ? "font-semibold text-white" : "text-white/55")}>{it.title}</span>
                </li>
              ))}
            </ol>
          </nav>

          <ol>
            {handles.items.map((it, i) => (
              <motion.li
                key={it.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="group"
              >
                <DrawLine className="bg-white/25" />
                <Reveal className="grid gap-4 py-9 md:grid-cols-[5.5rem_1fr] md:gap-8 md:py-11">
                  <span className="font-serif text-[clamp(2.6rem,4vw,3.4rem)] font-semibold italic leading-none text-white/40 transition-colors duration-500 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.6rem,2.6vw,2.3rem)] font-bold leading-tight tracking-[-0.025em]">{it.title}</h3>
                    <p className="mt-3 max-w-2xl text-[1.08rem] leading-relaxed text-white/80">{it.text}</p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-1.5 text-[0.85rem] font-semibold">
                      <span className="text-white/60">Deliverable</span>
                      {it.deliverable}
                    </p>
                  </div>
                </Reveal>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* What the author receives */}
        <Reveal className="mt-[clamp(3.5rem,7vw,5rem)] border-t border-white/25 pt-10">
          <div className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <p className="eyebrow text-white/75">You receive</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {handles.receive.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-[1.08rem] font-medium">
                  <span className="flex size-5 items-center justify-center rounded-full bg-white text-brand">
                    <Check aria-hidden className="size-3" strokeWidth={3.5} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 4 · Why it matters ─────────────────────────────────────────────────────

function Matters({ content }: { content: MarketingServicePage }) {
  const { matters } = content;
  const reduced = useReducedMotion();
  const band = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: band, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section className="py-section">
      <div className="container-site">
        <Label index="03">Why It Matters for Authors</Label>
      </div>

      {/* Cinematic band with the core statement laid over it */}
      <div ref={band} className="relative mt-9">
        <motion.div
          initial={{ clipPath: "inset(0% 50% 0% 50%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.5, ease: EASE }}
          className="relative h-[clamp(20rem,46vw,36rem)] overflow-hidden bg-mist"
        >
          <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y }}>
            <Image src={matters.image.src} alt={matters.image.alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
        <div className="container-site relative -mt-24 sm:-mt-32">
          <Reveal y={50} className="max-w-3xl rounded-[1.5rem] bg-white p-7 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.5)] sm:p-11">
            <h2 className={H2}>{matters.title}</h2>
          </Reveal>
        </div>
      </div>

      <div className="container-site mt-[clamp(3.5rem,7vw,5rem)]">
        <ul className="grid sm:grid-cols-2">
          {matters.statements.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={0.08 * i}
                className={cn(
                  "group border-line py-9 sm:px-10",
                  i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0",
                  i < 2 ? "border-b" : i === 2 ? "border-b sm:border-b-0" : "",
                )}
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2.05rem)] font-bold leading-tight tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-2 max-w-md text-[1.06rem] leading-relaxed text-ink-muted">{s.text}</p>
              </Reveal>
            );
          })}
        </ul>

        {matters.note && (
          <Reveal delay={0.1}>
            <p className="mt-10 flex max-w-3xl items-start gap-3 border-l-2 border-brand pl-5 text-[1rem] leading-relaxed text-ink-soft">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              {matters.note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ── 5 · Process (zig-zag timeline around a centre line) ───────────────────

function Process({ content }: { content: MarketingServicePage }) {
  const { process } = content;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fill = useTransform(smooth, (v) => (reduced ? 1 : v));

  return (
    <section className="bg-mist py-section">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Label index="04">How It Works</Label>
          </div>
          <Reveal delay={0.08}>
            <h2 className={cn(H2, "mt-7")}>{process.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lead text-ink-muted">{process.intro}</p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mx-auto mt-[clamp(3.5rem,7vw,5.5rem)] max-w-5xl">
          <span aria-hidden className="absolute bottom-0 left-[0.55rem] top-0 w-px bg-line lg:left-1/2" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-0 left-[0.55rem] top-0 w-px origin-top bg-brand lg:left-1/2" />
          {process.steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li key={s.title} className="relative grid pb-14 pl-12 last:pb-0 lg:grid-cols-2 lg:pl-0">
                <span aria-hidden className="absolute left-0 top-1.5 flex size-[1.15rem] items-center justify-center rounded-full border-2 border-brand bg-white lg:left-1/2 lg:-translate-x-1/2">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="size-full rounded-full bg-brand"
                  />
                </span>
                <Reveal x={reduced ? 0 : right ? 40 : -40} y={0} className={cn(right ? "lg:col-start-2 lg:pl-16" : "lg:pr-16 lg:text-right")}>
                  <p className="font-serif text-[1rem] italic text-brand">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[clamp(1.45rem,2.3vw,1.9rem)] font-bold leading-tight tracking-[-0.02em]">{s.title}</h3>
                  <p className={cn("mt-3 max-w-md text-[1.05rem] leading-relaxed text-ink-muted", !right && "lg:ml-auto")}>{s.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// ── 6 · Closing CTA ────────────────────────────────────────────────────────

function Closing({ title, related, category }: { title: string; related: Related[]; category: Props["category"] }) {
  return (
    <section className="relative overflow-hidden bg-brand py-[clamp(5.5rem,11vw,10rem)] text-white">
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-white/10" />
      <div className="container-site relative text-center">
        <Reveal>
          <p className="eyebrow text-white/70">{title}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mx-auto mt-6 max-w-5xl text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[1] tracking-[-0.045em]">
            Ready to Build More Visibility Around Your Book?
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-8 max-w-2xl text-lead text-white/80">
            Blue Book Press helps authors create professional marketing foundations designed to connect their stories with the right readers.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={pages["book-consultation"].path} variant="light" arrow>
              Request Marketing Consultation
            </Button>
            <Button href={category.href} variant="outline-light">
              Explore Other Services
            </Button>
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal delay={0.3} className="mt-[clamp(4rem,8vw,6rem)] border-t border-white/20 pt-8">
            <p className="eyebrow text-white/60">Works well with</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-10 gap-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={r.href} className="group inline-flex items-center gap-2 text-[clamp(1.2rem,1.8vw,1.5rem)] font-semibold">
                    <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-white">{r.title}</span>
                    <ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
