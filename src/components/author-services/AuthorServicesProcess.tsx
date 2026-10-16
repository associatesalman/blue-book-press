"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { asProcess } from "@/data/authorServices";

/**
 * 5 · The five-step process as a timeline. Horizontal on desktop, vertical on
 * smaller screens; a brand-blue line fills along the track as the section
 * scrolls through view, and each step rises in beneath its marker.
 */
export function AuthorServicesProcess() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fill = useTransform(smooth, (v) => (reduced ? 1 : v));

  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeader size="xl" eyebrow={asProcess.eyebrow} title={asProcess.title} />
          <Reveal delay={0.12}>
            <p className="text-lead text-ink-muted">{asProcess.intro}</p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-10 pl-10 lg:mt-20 lg:grid-cols-5 lg:gap-8 lg:pl-0 lg:pt-12">
          {/* Track + scroll-linked fill: vertical below lg, horizontal from lg. */}
          <span aria-hidden className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-line lg:hidden" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top bg-brand lg:hidden"
          />
          <span aria-hidden className="absolute left-0 right-0 top-[0.6875rem] hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden
            style={{ scaleX: fill }}
            className="absolute left-0 right-0 top-[0.6875rem] hidden h-px origin-left bg-brand lg:block"
          />

          {asProcess.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.08 * i} y={24} className="group relative">
              <span
                aria-hidden
                className="absolute -left-10 top-3 flex size-[1.375rem] items-center justify-center rounded-full border border-brand/40 bg-white transition-colors duration-500 group-hover:border-brand lg:-top-12 lg:left-0"
              >
                <span className="size-2 rounded-full bg-brand transition-transform duration-500 group-hover:scale-125" />
              </span>
              <p className="font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[1.4rem] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
