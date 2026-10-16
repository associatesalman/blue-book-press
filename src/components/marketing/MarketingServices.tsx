"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { mvServices } from "@/data/marketingVisibility";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 3 · The seven services as an editorial index on brand blue. Hovering,
 * focusing or tapping a row opens it (what it does / why / outcome) while a
 * sticky photo beside the list crossfades to that service.
 */
export function MarketingServices() {
  const [active, setActive] = useState(0);
  const current = mvServices[active];

  return (
    <section id="services" className="scroll-mt-[var(--spacing-header)] bg-brand py-section text-white">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow inline-flex rounded-full bg-ink px-4 py-2">Marketing Services</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-[clamp(2.5rem,5.4vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.04em]">Seven ways readers find your book.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="text-lead text-white/80">Choose one service or combine them into a campaign. Each is planned around your book, your readers and a budget you are comfortable with.</p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <ol className="border-b border-white/20">
            {mvServices.map((s, i) => {
              const open = active === i;
              return (
                <Reveal as="li" key={s.slug} delay={0.04 * i} className="border-t border-white/20" onMouseEnter={() => setActive(i)}>
                  <div className="flex items-center gap-4">
                  <h3 className="flex-1">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`mv-service-${s.slug}`}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group flex w-full items-baseline gap-5 py-6 text-left sm:gap-8 sm:py-7"
                    >
                      <span className={cn("font-serif text-[1rem] italic tabular-nums transition-colors duration-500", open ? "text-white" : "text-white/50")}>
                        {String(s.index).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] transition-[color,translate] duration-500 ease-[var(--ease-soft)]",
                          open ? "translate-x-2 text-white" : "text-white/55 group-hover:text-white/80",
                        )}
                      >
                        {s.name}
                      </span>
                      <Plus aria-hidden className={cn("size-6 shrink-0 self-center transition-transform duration-500", open && "rotate-45")} />
                    </button>
                  </h3>
                  <Link
                    href={s.href}
                    aria-label={`${s.name} service page`}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
                  >
                    <ArrowUpRight aria-hidden className="size-5" />
                  </Link>
                  </div>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`mv-service-${s.slug}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 sm:pl-[3.4rem]">
                          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl bg-white/10 lg:hidden">
                            <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
                          </div>
                          <p className="max-w-2xl text-[1.12rem] leading-relaxed text-white">{s.what}</p>
                          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                            <div>
                              <dt className="eyebrow text-white/60">Why authors need it</dt>
                              <dd className="mt-2 leading-relaxed text-white/80">{s.why}</dd>
                            </div>
                            <div>
                              <dt className="eyebrow text-white/60">The outcome</dt>
                              <dd className="mt-2 leading-relaxed text-white/80">{s.outcome}</dd>
                            </div>
                          </dl>
                          <Link
                            href={s.href}
                            className="group/link mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                          >
                            Explore {s.name}
                            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ol>

          {/* Sticky preview that follows the open service (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--spacing-header)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-white/10">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image src={current.image.src} alt={current.image.alt} fill sizes="34vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute bottom-6 left-6 right-6 flex items-baseline gap-3 text-white"
                  >
                    <span className="font-serif italic text-white/70">{String(current.index).padStart(2, "0")} / {String(mvServices.length).padStart(2, "0")}</span>
                    <span className="text-[1.15rem] font-semibold">{current.name}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
