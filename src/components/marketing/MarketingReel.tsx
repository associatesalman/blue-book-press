"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { mvMedia, mvReel } from "@/data/marketingVisibility";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 5 · Campaign reel. On desktop the section pins: the muted video holds the
 * centre while three statements (Seen. Shared. Remembered.) advance with
 * scroll. A thin bar under the frame tracks the loop. Mobile stacks simply.
 */
export function MarketingReel() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);
  const count = mvReel.statements.length;

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(count - 1, Math.floor(v * count))));

  // Always muted; plays only while visible; the bar follows playback.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    const tick = () => {
      if (bar.current && v.duration) bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
    };
    v.addEventListener("timeupdate", tick);
    if (reduced) return () => v.removeEventListener("timeupdate", tick);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("timeupdate", tick);
    };
  }, [reduced]);

  const frame = (
    <div className="relative mx-auto w-full max-w-[22rem] lg:w-auto lg:max-w-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, clipPath: "inset(12% 12% 12% 12% round 2.5rem)" }}
        whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-ink shadow-[0_60px_120px_-50px_rgba(0,0,0,0.65)] ring-1 ring-white/25 lg:h-[min(76svh,46rem)]"
      >
        <video
          ref={video}
          src={mvMedia.video}
          aria-label="Marketing & Visibility campaign reel (silent)"
          muted
          loop
          playsInline
          autoPlay={!reduced}
          preload="metadata"
          controls={!!reduced}
          className="absolute inset-0 size-full object-cover"
        />
      </motion.div>
      <span aria-hidden className="mt-4 block h-0.5 overflow-hidden rounded-full bg-white/20">
        <span ref={bar} className="block h-full w-full origin-left scale-x-0 bg-white" />
      </span>
    </div>
  );

  return (
    <section ref={section} className="relative bg-brand text-white lg:h-[260vh]">
      <div className="py-section lg:sticky lg:top-[var(--spacing-header)] lg:flex lg:h-[calc(100svh-var(--spacing-header))] lg:items-center lg:py-0">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow inline-flex rounded-full bg-ink px-4 py-2">{mvReel.eyebrow}</p>
            </Reveal>

            {/* Desktop: one statement at a time, driven by scroll */}
            <div className="relative mt-10 hidden h-[16rem] lg:block">
              {mvReel.statements.map((s, i) => (
                <motion.div
                  key={s.word}
                  className="absolute inset-0"
                  animate={{ opacity: step === i ? 1 : 0, y: step === i ? 0 : step > i ? -40 : 40 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  aria-hidden={step !== i}
                >
                  <p className="text-[clamp(3.2rem,5.4vw,5.6rem)] font-bold leading-none tracking-[-0.045em]">{s.word}</p>
                  <p className="mt-6 max-w-sm text-lead text-white/80">{s.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Mobile: all statements */}
            <ul className="mt-8 space-y-6 lg:hidden">
              {mvReel.statements.map((s, i) => (
                <Reveal as="li" key={s.word} delay={0.06 * i}>
                  <p className="text-[2.6rem] font-bold leading-none tracking-[-0.04em]">{s.word}</p>
                  <p className="mt-2 text-white/80">{s.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          {frame}

          <div className="hidden lg:block">
            <ol className="space-y-5">
              {mvReel.statements.map((s, i) => (
                <li key={s.word} className="flex items-center gap-4">
                  <span className={cn("h-px transition-all duration-700 ease-[var(--ease-soft)]", step === i ? "w-14 bg-white" : "w-6 bg-white/35")} />
                  <span className={cn("font-serif text-[1.15rem] italic transition-colors duration-500", step === i ? "text-white" : "text-white/45")}>{s.word}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 max-w-[15rem] text-[0.95rem] leading-relaxed text-white/60">Silent loop. Every campaign is built from your book&apos;s own story and visuals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
