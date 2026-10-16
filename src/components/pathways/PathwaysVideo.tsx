"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FeatureVideo } from "@/components/common/FeatureVideo";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ppMedia, ppVideo } from "@/data/publishingPathways";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 5 · Cinematic video feature. The silent 9:16 clip stands centre stage in a
 * tall rounded frame that opens from a narrow slit and grows slightly as it
 * scrolls into place; the statement and three working principles flank it.
 */
export function PathwaysVideo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.9, 1]);

  return (
    <section className="relative overflow-hidden bg-white py-section">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(48rem,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.05] blur-3xl"
      />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,21rem)_1fr] lg:gap-12 xl:grid-cols-[1fr_minmax(0,24rem)_1fr] xl:gap-16">
        <div>
          <SectionHeader size="xl" eyebrow={ppVideo.eyebrow} title={ppVideo.title} />
          <Reveal delay={0.12}>
            <p className="mt-6 text-lead text-ink-muted">{ppVideo.text}</p>
          </Reveal>
        </div>

        <motion.div ref={ref} style={{ scale }} className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-none">
          <motion.div
            initial={{ clipPath: "inset(0% 42% 0% 42% round 2rem)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-mist p-1.5 shadow-[0_50px_100px_-50px_rgba(31,79,224,0.6)] ring-1 ring-brand/25"
          >
            <div className="h-full overflow-hidden rounded-[1.6rem]">
              <FeatureVideo src={ppMedia.video.src} label="Blue Book Press publishing pathways — books prepared for every format" />
            </div>
          </motion.div>
        </motion.div>

        <Stagger as="ol" className="space-y-8" stagger={0.12}>
          {ppVideo.points.map((p, i) => (
            <StaggerItem as="li" key={p.title} className="group flex gap-5">
              <span className="font-serif text-[2.4rem] font-bold leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
              <div className="border-l border-line pl-5 transition-colors duration-500 group-hover:border-brand">
                <h3 className="text-[1.3rem] font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
