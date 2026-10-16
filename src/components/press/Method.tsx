"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { pages } from "@/data/pages";
import { method } from "@/data/thePress";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Blue Book Press Method: sticky intro on the left, a six-stage timeline
 * on the right whose progress line fills in brand blue as you scroll.
 */
export function Method() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="bg-white py-section">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="The Blue Book Press Method"
            title="Six stages. One clear path to publication."
            intro="A proven sequence that keeps quality high and surprises low. You always know which stage your book is in, what happens next, and what we need from you."
          />
          <Reveal delay={0.2} className="mt-8">
            <Button href={pages.journey.path} variant="outline" arrow>
              Your Publishing Journey
            </Button>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative">
          {/* track + scroll-linked fill */}
          <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-0.5 -translate-x-1/2 bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-6 left-[1.6rem] top-6 w-0.5 origin-top -translate-x-1/2 bg-brand"
          />

          {method.map((step, i) => (
            <motion.li
              key={step.title}
              className="relative flex gap-6 pb-10 last:pb-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="relative z-10 flex size-[3.2rem] shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white font-serif text-[1.3rem] font-semibold text-ink">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-[0_24px_40px_-28px_rgba(0,0,0,0.35)]">
                <h3 className="text-[1.35rem] leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{step.text}</p>
                <p className="mt-4 inline-flex rounded-full bg-mist px-3 py-1 text-[0.85rem] font-semibold text-ink-soft">
                  {step.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
