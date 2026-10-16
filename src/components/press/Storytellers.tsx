"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { pages } from "@/data/pages";
import { storytellers } from "@/data/thePress";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Built for Storytellers — an interactive index. Hovering (or focusing) a
 * storyteller type brings its matching book onto a sticky "book stage" on
 * desktop; on smaller screens each row carries its own cover and expands
 * on tap. Cover images are used only in this section.
 */
export function Storytellers() {
  const [active, setActive] = useState(0);
  const current = storytellers[active];

  // Warm the browser cache so every cover appears instantly on hover.
  useEffect(() => {
    storytellers.forEach((s) => {
      const img = new window.Image();
      img.src = s.image.src;
    });
  }, []);

  return (
    <section className="bg-white py-section">
      <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Built for Storytellers"
            title="Whatever your story, there is a place for it here."
            intro="The press is built for retired teachers and first-time novelists, grandparents and business leaders — anyone with a story worth telling well."
          />

          <ul className="mt-10 border-t border-line">
            {storytellers.map((s, i) => {
              const isActive = i === active;
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.title} delay={i * 0.05} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative flex w-full items-start gap-4 py-5 text-left sm:gap-5"
                  >
                    {/* active marker */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-px top-0 h-full w-0.5 origin-top bg-brand transition-transform duration-500 ease-[var(--ease-soft)]",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    {/* cover thumbnail on small screens */}
                    <span className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-[3px] shadow-[0_10px_18px_-10px_rgba(0,0,0,0.5)] sm:w-16 lg:hidden">
                      <Image src={s.image.src} alt="" fill sizes="4rem" className="object-cover" />
                    </span>
                    <span
                      className={cn(
                        "hidden size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 lg:flex",
                        isActive ? "bg-brand text-white" : "bg-mist text-ink group-hover:bg-ink group-hover:text-white",
                      )}
                    >
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 lg:pl-1">
                      <span className="flex items-center justify-between gap-4">
                        <span
                          className={cn(
                            "font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight transition-colors duration-300",
                            isActive ? "text-brand" : "text-ink",
                          )}
                        >
                          {s.title}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-serif text-[0.95rem] font-semibold text-ink-muted">0{i + 1}</span>
                          <ArrowRight
                            aria-hidden
                            className={cn(
                              "size-5 transition-all duration-300",
                              isActive ? "translate-x-0 text-brand opacity-100" : "-translate-x-2 opacity-0",
                            )}
                          />
                        </span>
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="text"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-2 text-[1.02rem] leading-relaxed text-ink-muted">{s.text}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={pages["book-consultation"].path} arrow>
              Tell Us About Your Book
            </Button>
            <p className="text-[0.98rem] text-ink-muted">Not sure which describes you? That is perfectly fine.</p>
          </Reveal>
        </div>

        {/* Book stage (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] bg-mist">
              {/* oversized index numeral */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`n-${active}`}
                  aria-hidden
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute -right-4 -top-10 select-none font-serif text-[16rem] font-semibold leading-none text-ink/[0.05]"
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>

              {/* floor shadow */}
              <span aria-hidden className="absolute bottom-[12%] left-1/2 h-8 w-[46%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-xl" />

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.image.src}
                  initial={{ opacity: 0, y: 40, rotate: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
                  exit={{ opacity: 0, y: -24, rotate: -8, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="relative w-[52%]"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] shadow-[0_40px_60px_-28px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
                    {/* Pre-sized 600×900 WebP files, served as-is so the preloaded copies are reused. */}
                    <Image src={current.image.src} alt={current.image.alt} fill unoptimized className="object-cover" />
                    <span className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* caption */}
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-2xl bg-white/90 px-5 py-3.5 shadow-sm backdrop-blur">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="font-semibold text-ink"
                  >
                    {current.title}
                  </motion.p>
                </AnimatePresence>
                <span className="eyebrow text-[0.7rem] text-brand">From our bookshelf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
