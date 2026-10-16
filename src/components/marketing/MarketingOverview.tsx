"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DrawLine, Reveal } from "@/components/common/Reveal";
import { mvOverview } from "@/data/marketingVisibility";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 2 · Why publishing alone isn't enough: text beside a drifting photo, then the four pillars of visibility. */
export function MarketingOverview() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);
  const quoteY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["30%", "-30%"]);

  return (
    <section className="border-t border-line bg-white py-section">
      <div className="container-site grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-10 bg-brand" />
              {mvOverview.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 text-[clamp(2.4rem,5vw,4.4rem)] font-bold leading-[1.03] tracking-[-0.04em] text-ink">{mvOverview.title}</h2>
          </Reveal>
          <div className="mt-10 space-y-6">
            {mvOverview.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.06}>
                <p className={i === 0 ? "text-[clamp(1.2rem,1.7vw,1.45rem)] leading-[1.55] text-ink-soft" : "text-[1.08rem] leading-[1.8] text-ink-muted"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={ref} className="relative self-start lg:mt-16">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 1.75rem)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.75rem)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-mist"
          >
            <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y }}>
              <Image src={mvOverview.image.src} alt={mvOverview.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </motion.div>
          </motion.div>
          <motion.blockquote
            style={{ y: quoteY }}
            className="relative -mt-16 ml-6 max-w-xs rounded-2xl bg-brand p-6 text-white shadow-[0_30px_60px_-30px_rgba(31,79,224,0.8)] sm:ml-auto sm:mr-[-1.5rem] lg:absolute lg:-left-16 lg:bottom-12 lg:mt-0"
          >
            <p className="font-serif text-[1.3rem] italic leading-snug">Publishing makes it available. Marketing makes it visible.</p>
          </motion.blockquote>
        </div>
      </div>

      <div className="container-site mt-[clamp(4rem,8vw,6.5rem)]">
        <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {mvOverview.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.08 * i}>
              <DrawLine className="bg-ink" delay={0.1 * i} />
              <p className="mt-5 font-serif text-[0.95rem] italic text-brand">0{i + 1}</p>
              <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.1rem)] font-bold tracking-[-0.025em] text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
