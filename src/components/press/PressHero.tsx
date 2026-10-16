"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { pressHero } from "@/data/thePress";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

/**
 * The Press hero: pure white, centred editorial headline over a fan of real
 * portfolio covers that opens like a hand of books. Flat imagery only — 3D
 * stays on the homepage.
 */
export function PressHero() {
  const words = pressHero.title.split(" ");
  const covers = pressHero.covers;
  const mid = (covers.length - 1) / 2;

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="container-site flex flex-col items-center pb-12 pt-8 text-center sm:pt-10 lg:pb-16">
        <motion.p {...rise(0.05)} className="eyebrow mt-4 inline-flex items-center gap-3 rounded-full bg-ink px-5 py-2.5 text-white">
          <span aria-hidden className="size-2 rounded-full bg-brand" />
          <span className="sm:hidden">The Press</span>
          <span className="hidden sm:inline">Publishing · Design · Distribution · Audio · Marketing</span>
        </motion.p>

        <h1 className="mt-7 max-w-4xl text-display font-semibold text-ink">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.06 }}
              >
                {word === "Meaningful" ? <em className="text-brand">{word}</em> : word}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p {...rise(0.6)} className="mt-7 max-w-3xl text-lead text-ink-muted">
          {pressHero.text}
        </motion.p>

        <motion.div {...rise(0.75)} className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href={pressHero.primary.href} arrow className="w-full sm:w-auto">
            {pressHero.primary.label}
          </Button>
          <Button href={pressHero.secondary.href} variant="outline" className="w-full sm:w-auto">
            {pressHero.secondary.label}
          </Button>
        </motion.div>

        {/* Fan of covers */}
        <div aria-hidden className="relative mt-12 h-[12rem] w-full sm:h-[17rem] lg:mt-16 lg:h-[20rem]">
          <span className="absolute inset-x-[18%] bottom-0 h-8 rounded-[50%] bg-ink/15 blur-xl" />
          {covers.map((src, i) => {
            const offset = i - mid;
            return (
              <div
                key={src}
                className="absolute bottom-4 left-1/2 w-24 -translate-x-1/2 sm:w-36 lg:w-44"
                style={{ zIndex: 10 - Math.abs(offset) }}
              >
                <motion.div
                  className="origin-bottom"
                  initial={{ x: "0%", y: 60, rotate: 0, opacity: 0 }}
                  animate={{ x: `${offset * 60}%`, y: Math.abs(offset) * 10, rotate: offset * 7, opacity: 1 }}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.9 + Math.abs(offset) * 0.12 }}
                  whileHover={{ y: Math.abs(offset) * 10 - 16, transition: { duration: 0.35, ease: EASE } }}
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] shadow-[0_30px_45px_-22px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
                    <Image src={src} alt="" fill sizes="(min-width: 1024px) 11rem, 9rem" className="object-cover" priority={offset === 0} />
                    {/* spine shading */}
                    <span className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
