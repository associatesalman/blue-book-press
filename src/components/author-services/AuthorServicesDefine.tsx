"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { asDefine, asMedia, asServices } from "@/data/authorServices";

/**
 * 3 · What Author Services means. Editorial split: the "Pick A Service"
 * mockup stays pinned on the left (desktop) with a slow parallax drift, while
 * the definition, scope chips and six highlight cards move past on the right.
 */
export function AuthorServicesDefine() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <section id="define" className="bg-white py-section">
      <div className="container-site grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:self-start">
          <ImageReveal className="relative">
            <div
              ref={ref}
              className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#e9e1d8] shadow-[0_40px_80px_-50px_rgba(13,13,13,0.45)] lg:max-h-[calc(100svh-var(--spacing-header)-4rem)] lg:max-w-none"
            >
              <motion.div className="absolute -inset-y-[5%] inset-x-0" style={{ y: drift }}>
                <Image
                  src={asMedia.mockup.src}
                  alt={asMedia.mockup.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </ImageReveal>

          <Reveal delay={0.3} y={16} className="mx-auto mt-5 flex max-w-md items-center gap-4 lg:max-w-none">
            <span className="font-serif text-[2.6rem] font-bold leading-none text-brand">{asServices.length}</span>
            <span className="text-[0.95rem] leading-snug text-ink-muted">
              author services, one standard of care —
              <br className="hidden sm:block" /> choose one or combine several.
            </span>
          </Reveal>
        </div>

        <div>
          <SectionHeader size="xl" eyebrow={asDefine.eyebrow} title={asDefine.title} />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lead text-ink-muted">{asDefine.text}</p>
          </Reveal>

          <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.04} aria-label="What Author Services covers">
            {asDefine.scope.map((item) => (
              <StaggerItem
                as="li"
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.9rem] font-medium text-ink-soft transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                {item}
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {asDefine.highlights.map((h) => {
              const Icon = h.icon;
              return (
                <StaggerItem
                  as="li"
                  key={h.title}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[border-color,translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_50px_-34px_rgba(31,79,224,0.55)]"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-y-100"
                  />
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/[0.08] text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[1.2rem] font-semibold text-ink">{h.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-muted">{h.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
