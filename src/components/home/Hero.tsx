"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { MOBILE_BAND_PX } from "@/components/three/heroLayout";
import { hero } from "@/data/home";

// The WebGL scene loads after the page is interactive; text never waits for it.
const HeroBooks = dynamic(() => import("@/components/three/HeroBooks"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

/**
 * Hero: centred headline framed by 3D books (left/right on wide screens, a
 * row beneath the buttons on narrow screens). In the spirit of the original
 * Blue Book Press hero — editorial frame lines, soft light, books in depth.
 */
export function Hero() {
  const reducedMotion = !!useReducedMotion();
  const words = hero.title.split(" ");

  return (
    <section className="relative isolate flex min-h-[max(40rem,calc(100svh-var(--spacing-header)))] flex-col overflow-hidden bg-white">
      <HeroBackdrop />
      <HeroBooks reducedMotion={reducedMotion} />

      <div className="container-site relative z-10 flex flex-1 flex-col">
        {/* Editorial meta row */}
        <motion.div
          {...rise(0.1)}
          className="flex items-center justify-between border-b border-line py-4 text-[0.95rem] text-ink-soft"
        >
          <p className="eyebrow">
            Print <span className="text-brand">·</span> eBook <span className="text-brand">·</span> Audiobook
          </p>
          <p className="eyebrow hidden sm:block">{hero.eyebrow}</p>
        </motion.div>

        <div
          className="mx-auto flex w-full max-w-[44rem] flex-1 flex-col items-center justify-center pt-10 text-center lg:max-w-[min(46rem,48vw)] lg:pb-14 lg:pt-12"
          style={{ ["--band" as string]: `${MOBILE_BAND_PX}px` }}
        >
          <h1 className="text-[clamp(2.5rem,4.8vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-ink">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.06 }}
                >
                  {word === "Remembered" ? <em className="text-brand">{word}</em> : word}
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p {...rise(0.7)} className="mt-7 text-lead text-ink-muted">
            {hero.text}
          </motion.p>

          <motion.div {...rise(0.85)} className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={hero.primary.href} arrow className="w-full sm:w-auto">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="outline" className="w-full sm:w-auto">
              {hero.secondary.label}
            </Button>
          </motion.div>

          <motion.ul
            {...rise(1)}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[0.98rem] text-ink-soft"
          >
            {hero.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="flex size-5.5 items-center justify-center rounded-full bg-ink text-white">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>

          {/* Reserved band for the 3D books on narrow screens */}
          <div aria-hidden className="h-[var(--band)] shrink-0 lg:hidden" />
        </div>

        {/* Scroll cue */}
        <motion.div {...rise(1.2)} aria-hidden className="hidden flex-col items-center gap-2 pb-6 lg:flex">
          <span className="eyebrow text-[0.7rem] text-ink-muted">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-brand" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* soft light behind the headline */}
      <div className="absolute left-1/2 top-1/2 h-[80vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--brand-blue)_7%,transparent),transparent)]" />
      {/* floor shadow */}
      <div className="absolute inset-x-[10%] bottom-[-10rem] h-[16rem] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),transparent)]" />
    </div>
  );
}
