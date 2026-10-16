"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { books, type BookShelf } from "@/data/books";
import { pages } from "@/data/pages";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The kinds of books we publish (a statement of range, not a title list). */
const SHELVES = ["Fiction", "Romance", "Thriller", "Fantasy", "Memoir", "Children's Books", "Business", "Self-Help", "Faith & Inspiration", "Educational"];

const FILTERS: ("All" | BookShelf)[] = ["All", "Romance", "Dark Romance", "Fiction & Suspense", "Self-Help", "Children's & Faith"];

/**
 * Portfolio cover collage: the publishing range set as a typographic index,
 * then every portfolio cover in a staggered grid that can be filtered by shelf.
 * (The 3D Bookshelf section stays separate.)
 */
export function PortfolioPreview() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const reduced = useReducedMotion();
  const shown = active === "All" ? books : books.filter((b) => b.shelf === active);
  const count = (f: (typeof FILTERS)[number]) => (f === "All" ? books.length : books.filter((b) => b.shelf === f).length);

  return (
    <section className="overflow-hidden border-t border-line bg-white py-section">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="From Our Portfolio"
            title="Stories Across Every Shelf"
            intro="From memoirs and fiction to children's books, business titles, and educational work, Blue Book Press supports authors across a wide range of publishing paths."
          />
          <Button href={pages.portfolio.path} variant="outline" arrow className="shrink-0 self-start lg:self-auto">
            View Portfolio
          </Button>
        </div>

        {/* Publishing range as a typographic index */}
        <Reveal delay={0.1} className="mt-12 border-y border-line py-7">
          <p className="eyebrow text-ink-muted">We publish for every shelf</p>
          <ul className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {SHELVES.map((s, i) => (
              <li key={s} className="flex items-baseline gap-5">
                <span className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-tight text-ink transition-colors duration-300 hover:text-brand">
                  {s}
                </span>
                {i < SHELVES.length - 1 && <span aria-hidden className="size-1.5 -translate-y-1 rounded-full bg-brand" />}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Shelf filters */}
        <Reveal delay={0.15} className="mt-10">
          <div role="group" aria-label="Filter books by shelf" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={active === f}
                onClick={() => setActive(f)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.92rem] font-semibold transition-colors duration-300",
                  active === f ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-brand hover:text-brand",
                )}
              >
                {f}
                <span className={cn("text-[0.8rem] tabular-nums", active === f ? "text-white/60" : "text-ink-muted")}>{count(f)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cover collage — alternate columns sit lower for a staggered shelf. */}
        <motion.ul layout={!reduced} className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 pb-8 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-6 xl:grid-cols-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((b, i) => (
              <motion.li
                key={b.slug}
                layout={!reduced}
                initial={{ opacity: 0, y: reduced ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 8) * 0.05 }}
                className="group sm:[&:nth-child(even)]:translate-y-8"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-[3px] bg-mist shadow-[0_14px_28px_-16px_rgba(0,0,0,0.45)] transition-[translate,box-shadow] duration-500 ease-[var(--ease-soft)] group-hover:-translate-y-2 group-hover:shadow-[0_28px_44px_-20px_rgba(0,0,0,0.5)]">
                  <Image
                    src={b.cover}
                    alt={`${b.title} by ${b.author}, book cover`}
                    fill
                    sizes="(min-width: 1280px) 11vw, (min-width: 1024px) 15vw, (min-width: 640px) 23vw, 31vw"
                    className="object-cover"
                  />
                  {/* Spine shading so covers read as physical books */}
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/25 via-white/10 to-transparent" />
                </div>
                <p className="mt-3 line-clamp-1 font-serif text-[0.98rem] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-brand">
                  {b.title}
                </p>
                <p className="line-clamp-1 text-[0.82rem] text-ink-muted">{b.genre}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
