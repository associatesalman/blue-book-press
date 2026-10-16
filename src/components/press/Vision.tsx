"use client";

import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { vision } from "@/data/thePress";

const EASE = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035 } } };
const word: Variants = {
  hidden: { opacity: 0.12, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Cinematic black band: the vision statement lights up word by word. */
export function Vision() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-[calc(var(--spacing-section)*1.15)] text-white">
      {/* faint ruled-page texture and an oversized quotation mark */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_54px,rgba(255,255,255,0.05)_54px,rgba(255,255,255,0.05)_55px)] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[3%] -z-10 select-none font-serif text-[16rem] leading-none text-brand/40 sm:-bottom-56 sm:text-[22rem]"
      >
        ”
      </span>

      <div className="container-site">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-white/70">
            <span aria-hidden className="h-0.5 w-8 bg-brand" />
            {vision.eyebrow}
          </p>
        </Reveal>

        <motion.blockquote
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          className="mt-8 max-w-5xl font-serif text-[clamp(1.9rem,3.8vw,3.4rem)] font-medium leading-[1.22] tracking-[-0.015em]"
        >
          {vision.quote.split(" ").map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block">
              {w}
              {" "}
            </motion.span>
          ))}
        </motion.blockquote>

        <Reveal delay={0.4} className="mt-10 flex items-center gap-4">
          <span aria-hidden className="h-px w-16 bg-white/40" />
          <span className="text-[1rem] font-semibold text-white/75">{vision.signoff}</span>
        </Reveal>
      </div>
    </section>
  );
}
