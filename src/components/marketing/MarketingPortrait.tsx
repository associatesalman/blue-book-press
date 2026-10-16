"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DrawLine, Reveal } from "@/components/common/Reveal";
import { mvMedia, mvPortrait } from "@/data/marketingVisibility";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 4 · The human side of marketing: the portrait artwork unveils beside three short lines. */
export function MarketingPortrait() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.08, 1, 1.03]);
  const { portrait } = mvMedia;

  return (
    <section className="overflow-hidden bg-white py-section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div ref={ref} className="mx-auto w-full max-w-[30rem] lg:max-w-none">
          <motion.div
            initial={{ clipPath: "inset(0% 50% 0% 50% round 2rem)", opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="relative mx-auto overflow-hidden rounded-[2rem] bg-white shadow-[0_50px_100px_-60px_rgba(0,0,0,0.45)] ring-1 ring-line lg:max-h-[calc(100svh-var(--spacing-header)-4rem)]"
            style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
          >
            <motion.div className="absolute inset-0" style={{ scale }}>
              <Image src={portrait.src} alt={portrait.alt} fill quality={95} sizes="(min-width: 1024px) 36vw, 30rem" className="object-contain" />
            </motion.div>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow text-brand">{mvPortrait.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 text-[clamp(2.5rem,5.2vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">{mvPortrait.title}</h2>
          </Reveal>
          <ul className="mt-12">
            {mvPortrait.lines.map((l, i) => (
              <Reveal as="li" key={l.title} delay={0.1 + i * 0.08} x={30} y={0}>
                <DrawLine className="bg-line" delay={0.1 * i} />
                <div className="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                  <h3 className="text-[1.3rem] font-semibold text-ink">{l.title}</h3>
                  <p className="leading-relaxed text-ink-muted">{l.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
