"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { pages } from "@/data/pages";
import { upcomingBooks, type PortfolioBook } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { BookDialog } from "./BookDialog";
import { BookCoverflow, CoverflowControls } from "./BookCoverflow";
import { EASE, Kicker, LineReveal } from "./motion";

/**
 * Upcoming Releases on black, composed differently from Best Selling: the
 * heading and release queue run down the left, the 3D stage fills the right,
 * and the active title's release details sit beneath the queue.
 */
export function UpcomingSlider() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<PortfolioBook | null>(null);
  const book = upcomingBooks[active];

  return (
    <section id="upcoming-releases" aria-labelledby="upcoming-title" className="relative overflow-hidden bg-ink py-section text-white">
      <div className="container-site grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Kicker tone="dark">Upcoming Releases</Kicker>
          <LineReveal
            id="upcoming-title"
            className="mt-6 text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[0.96] tracking-[-0.04em]"
            lines={[
              "On the press",
              <span key="b" className="italic text-brand">
                right now.
              </span>,
            ]}
          />

          {/* Release queue */}
          <ol className="mt-10 border-t border-white/15">
            {upcomingBooks.map((b, i) => (
              <li key={b.slug} className="border-b border-white/15">
                <button type="button" onClick={() => setActive(i)} aria-current={i === active} className="group flex w-full items-center gap-5 py-4 text-left">
                  <span className={cn("font-serif text-[1rem] tabular-nums transition-colors", i === active ? "text-brand" : "text-white/40")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "flex-1 font-serif text-[clamp(1.3rem,2vw,1.6rem)] font-semibold leading-tight transition-colors",
                      i === active ? "text-white" : "text-white/45 group-hover:text-white/80",
                    )}
                  >
                    {b.title}
                  </span>
                  <span className={cn("eyebrow text-[0.65rem]", i === active ? "text-white/80" : "text-white/40")}>{b.status}</span>
                </button>
              </li>
            ))}
          </ol>

          <div aria-live="polite" className="mt-8 min-h-[14rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="eyebrow text-[0.72rem] text-brand">{book.genre}</p>
                <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.02em]">{book.title}</h3>
                <p className="mt-1 text-white/60">
                  by <span className="font-semibold text-white">{book.author}</span>
                </p>
                <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-white/75">{book.description}</p>
                <p className="mt-4 inline-flex items-center gap-2.5 text-[0.92rem] text-white/70">
                  <CalendarClock aria-hidden className="size-4 text-brand" />
                  {book.release}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <BookCoverflow items={upcomingBooks} active={active} onChange={setActive} label="Upcoming releases" tone="dark" gap={1.25} />
          </motion.div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
            <CoverflowControls count={upcomingBooks.length} active={active} onChange={setActive} label="upcoming release" tone="dark" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={() => setOpen(book)}
                className="group inline-flex min-h-12 items-center gap-2 font-semibold text-white underline decoration-brand decoration-2 underline-offset-[6px]"
              >
                View details
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Button href={pages["start-your-book"].path} variant="brand-on-dark" arrow>
                Bring Your Book to the Press
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BookDialog book={open} onClose={() => setOpen(null)} />
    </section>
  );
}
