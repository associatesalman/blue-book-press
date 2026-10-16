"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { bestSelling, type PortfolioBook } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { AmazonButton, BookDialog } from "./BookDialog";
import { BookCoverflow, CoverflowControls } from "./BookCoverflow";
import { EASE, Kicker, LineReveal, useReducedMotionSafe } from "./motion";

/**
 * Best Selling on brand blue. The black of the collection above dissolves
 * into blue as the section arrives; an oversized heading frames a 3D
 * coverflow, and the active title swaps in through a mask beneath it.
 */
export function BestSellingSlider() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<PortfolioBook | null>(null);
  const book = bestSelling[active];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const ink = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [1, 0]);

  return (
    <section ref={ref} id="best-selling" aria-labelledby="best-selling-title" className="relative isolate overflow-hidden bg-brand py-section text-white">
      <motion.div aria-hidden style={{ opacity: ink }} className="absolute inset-0 -z-10 bg-ink" />

      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker tone="blue">Reader favourites</Kicker>
            <LineReveal
              id="best-selling-title"
              className="mt-4 text-[clamp(3.4rem,11vw,10.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
              lines={["Best Selling"]}
            />
          </div>
          <CoverflowControls count={bestSelling.length} active={active} onChange={setActive} label="best-selling book" tone="dark" className="pb-3" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="mt-6"
      >
        <BookCoverflow items={bestSelling} active={active} onChange={setActive} label="Best-selling books" tone="dark" gap={1.12} />
      </motion.div>

      <div className="container-site">
        {/* Segmented progress */}
        <div className="mt-8 flex gap-1.5" role="group" aria-label="Choose a best-selling book">
          {bestSelling.map((b, i) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${b.title}`}
              aria-current={i === active}
              className="group flex h-8 flex-1 items-center"
            >
              <span className={cn("block h-0.5 w-full transition-colors duration-500", i === active ? "bg-white" : "bg-white/25 group-hover:bg-white/60")} />
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[0.75rem] text-white/70">
              {String(active + 1).padStart(2, "0")} · {book.genre}
            </p>
            <h3 className="mt-3 overflow-hidden pb-[0.08em] text-[clamp(2.3rem,5vw,4.4rem)] leading-[1] tracking-[-0.035em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={book.slug}
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-105%" }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {book.title}
                </motion.span>
              </AnimatePresence>
            </h3>
            <p className="mt-3 text-[1.1rem] text-white/80">
              by <span className="font-semibold text-white">{book.author}</span>
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="border-t border-white/25 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1"
            >
              <p className="text-[1.08rem] leading-relaxed text-white/90">{book.description}</p>
              {book.credential && <p className="mt-3 text-[0.92rem] text-white/65">On the cover: {book.credential}</p>}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={() => setOpen(book)}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.98rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  View details
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
                <AmazonButton book={book} tone="dark" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BookDialog book={open} onClose={() => setOpen(null)} />
    </section>
  );
}
