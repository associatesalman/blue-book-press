"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { mvProcess } from "@/data/marketingVisibility";

/**
 * 6 · How visibility is built, as a journey. On desktop the section pins and
 * the five steps travel sideways as you scroll, with a rule that fills along
 * the way. On smaller screens (or with reduced motion) it is a vertical list.
 */
export function MarketingProcess() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  // Horizontal travel = how far the track overflows the viewport (re-measured on resize).
  useEffect(() => {
    const el = track.current;
    if (!wide || !el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  const header = (
    <div className="w-full shrink-0 lg:w-[30rem]">
      <Reveal>
        <p className="eyebrow text-brand">{mvProcess.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-7 text-[clamp(2.5rem,5vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">{mvProcess.title}</h2>
      </Reveal>
    </div>
  );

  const steps = mvProcess.steps.map((s, i) => (
    <Reveal key={s.title} delay={wide ? 0 : 0.06 * i} className="relative w-full shrink-0 lg:w-[26rem]">
      <span aria-hidden className="block font-serif text-[clamp(4.5rem,8vw,7.5rem)] font-semibold italic leading-none text-transparent [-webkit-text-stroke:1.5px_var(--brand-blue)]">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span aria-hidden className="mt-6 block size-3 rounded-full bg-brand" />
      <h3 className="mt-6 text-[clamp(1.5rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">{s.title}</h3>
      <p className="mt-3 max-w-sm text-[1.06rem] leading-relaxed text-ink-muted">{s.text}</p>
    </Reveal>
  ));

  if (!wide) {
    return (
      <section className="bg-white py-section">
        <div className="container-site">
          {header}
          <ol className="mt-14 grid gap-14 border-l border-line pl-8 sm:grid-cols-2 sm:border-l-0 sm:pl-0">
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative bg-white" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-[var(--spacing-header)] flex h-[calc(100svh-var(--spacing-header))] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-20 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-[10vw]">
          {header}
          <ol className="relative flex gap-16 pt-2">
            {/* The journey rule behind the step dots */}
            <span aria-hidden className="absolute left-0 right-0 top-[calc(clamp(4.5rem,8vw,7.5rem)+2.375rem)] h-px bg-line" />
            <motion.span
              aria-hidden
              style={{ scaleX: smooth }}
              className="absolute left-0 right-0 top-[calc(clamp(4.5rem,8vw,7.5rem)+2.375rem)] h-px origin-left bg-brand"
            />
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
