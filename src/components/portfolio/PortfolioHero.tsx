"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/common/Button";
import { pages } from "@/data/pages";
import { EASE, LineReveal, useReducedMotionSafe } from "./motion";

const MOCKUP = "/portfolio/hero-background.png"; // 1624×968, pure black ground

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

/**
 * Portfolio hero on the supplied "PORTFOLIO · Blue Book Press" mockup.
 *
 * The artwork occupies the middle of its canvas (≈6–91% across, 25–73% down)
 * on pure black, so the section is pure black too and the image blends in.
 * - Desktop / laptop (lg+): the mockup covers everything above the copy
 *   band, centred, so only its empty black margins are trimmed; the copy sits
 *   on the same black beneath it, keeping every label of the artwork clear.
 * - Tablet / mobile: the mockup is recomposed as a full-width band trimmed to
 *   the artwork (all labels kept), with the copy stacked underneath.
 */
export function PortfolioHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], reduced ? [1, 1] : [1, 0.35]);

  const reveal = {
    initial: { clipPath: "inset(48% 0% 48% 0%)", scale: 1.1 },
    animate: { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
    transition: { clipPath: { duration: 1.4, ease: EASE }, scale: { duration: 2.2, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      aria-labelledby="portfolio-hero-title"
      className="relative isolate overflow-hidden bg-black text-white lg:flex lg:h-[max(35rem,min(calc(100svh-var(--spacing-header)),64rem))] lg:flex-col lg:justify-end"
    >
      {/*
        One image element, two compositions (so it downloads once):
        - below lg: an in-flow band trimmed to the artwork, every label kept;
        - lg+: a layer covering everything above the copy band.
      */}
      <motion.div
        style={{ y: drift, opacity: fade }}
        className="relative pt-6 lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-[clamp(12.5rem,27vh,15.5rem)] lg:-z-10 lg:pt-0"
      >
        <motion.div
          {...reveal}
          className="relative mx-auto aspect-[1624/580] w-full max-w-3xl overflow-hidden lg:aspect-auto lg:h-full lg:max-w-[120rem]"
        >
          <Image
            src={MOCKUP}
            alt="Blue Book Press Portfolio, publishing house, 2026"
            width={1624}
            height={968}
            priority
            quality={95}
            sizes="(min-width: 1024px) 100vw, (min-width: 768px) 54rem, 112vw"
            className="absolute left-[-5.2%] top-[-38%] h-auto w-[112%] max-w-none lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-center"
          />
        </motion.div>
      </motion.div>

      {/* Copy — sits in the empty band beneath the artwork */}
      <div className="container-site relative pb-[clamp(2.5rem,5vh,3.5rem)] pt-8 lg:pt-0">
        <div className="grid gap-8 border-t border-white/15 pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-end lg:gap-16">
          <div>
            <motion.p {...rise(0.55)} className="eyebrow flex items-center gap-3 text-white/70">
              <span aria-hidden className="h-0.5 w-8 bg-brand" />
              The Blue Book Press Portfolio
            </motion.p>
            <LineReveal
              id="portfolio-hero-title"
              as="h1"
              onMount
              delay={0.65}
              className="mt-4 text-[clamp(2.3rem,3.7vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
              lines={[
                "Stories We’ve Helped",
                <span key="b" className="italic text-brand">
                  Bring to Life
                </span>,
              ]}
            />
          </div>
          <div>
            <motion.p {...rise(0.9)} className="text-[1.05rem] leading-relaxed text-white/70">
              Twenty-six books developed, designed, published and positioned with their authors — the work, shown in full.
            </motion.p>
            <motion.div {...rise(1.05)} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="#collection" variant="brand-on-dark" arrow className="whitespace-nowrap">
                Explore the Collection
              </Button>
              <Button href={pages["start-your-book"].path} variant="outline-light" className="whitespace-nowrap">
                Publish Your Book
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
