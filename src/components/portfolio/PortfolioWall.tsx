"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type FocusEvent } from "react";
import { useLenis } from "@/components/common/Providers";
import { pages } from "@/data/pages";
import { booksFor, filters, shelves, upcomingBooks, type PortfolioBook, type ShelfFilter } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { BookDialog } from "./BookDialog";
import { EASE, Kicker, useReducedMotionSafe } from "./motion";

type Size = "lg" | "md" | "sm";
type Entry =
  | { kind: "chapter"; key: string; index: string; label: string; note: string; count: number }
  | { kind: "book"; key: string; book: PortfolioBook; n: number; size: Size; low: boolean };

/** Scale rhythm across the wall: large, medium (raised), small (lowered), medium (lowered)… */
const RHYTHM: { size: Size; low: boolean }[] = [
  { size: "lg", low: false },
  { size: "md", low: false },
  { size: "sm", low: true },
  { size: "md", low: true },
  { size: "lg", low: false },
  { size: "sm", low: false },
];

/** Cover height as a share of the wall's height (the caption below takes 7.5rem). */
const COVER_H: Record<Size, string> = {
  lg: "calc(100% - 7.5rem)",
  md: "calc(88% - 7.5rem)",
  sm: "calc(76% - 7.5rem)",
};

function buildEntries(filter: ShelfFilter): Entry[] {
  const groups =
    filter === "All"
      ? [
          ...shelves.map((s, i) => ({ id: s.id, label: s.label, note: s.note, index: i + 1 })),
          { id: "Upcoming", label: "Upcoming", note: "Titles on the press now.", index: shelves.length + 1 },
        ]
      : filter === "Upcoming"
        ? [{ id: "Upcoming", label: "Upcoming", note: "Titles on the press now.", index: shelves.length + 1 }]
        : shelves.filter((s) => s.id === filter).map((s) => ({ id: s.id, label: s.label, note: s.note, index: shelves.indexOf(s) + 1 }));

  const entries: Entry[] = [];
  let n = 0;
  for (const g of groups) {
    const list = g.id === "Upcoming" ? upcomingBooks : booksFor(g.id as ShelfFilter);
    entries.push({ kind: "chapter", key: `c-${g.id}`, index: String(g.index).padStart(2, "0"), label: g.label, note: g.note, count: list.length });
    list.forEach((book, i) => {
      n += 1;
      entries.push({ kind: "book", key: book.slug, book, n, ...RHYTHM[i % RHYTHM.length] });
    });
  }
  return entries;
}

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useWide = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  );

/**
 * The full collection as an exhibition wall. On tablet and desktop the
 * section pins and vertical scrolling walks the wall sideways; on phones (and
 * for reduced motion) it is a native swipe gallery. Covers alternate in scale
 * and height, shelves open with a typographic chapter marker, and every book
 * opens a detail dialog. Filtering by shelf rebuilds the wall in place.
 */
export function PortfolioWall() {
  const [filter, setFilter] = useState<ShelfFilter>("All");
  const [open, setOpen] = useState<PortfolioBook | null>(null);
  const reduced = useReducedMotionSafe();
  const wide = useWide();
  const pinned = wide && !reduced;
  const lenis = useLenis();

  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const measure = useCallback(() => {
    const t = track.current;
    if (!t || !pinned) return setDistance(0);
    setDistance(Math.max(0, t.scrollWidth - window.innerWidth));
  }, [pinned]);

  useLayoutEffect(() => {
    measure();
    const t = track.current;
    if (!t) return;
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, filter]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => (pinned ? -p * distance : 0));
  const progress = useTransform(scrollYProgress, (p) => (pinned ? p : 0));

  const entries = buildEntries(filter);
  const total = booksFor(filter).length;
  const label = filters.find((f) => f.id === filter)!.label;

  const choose = (f: ShelfFilter) => {
    if (f === filter) return;
    setFilter(f);
    const el = outer.current;
    if (el && pinned && el.getBoundingClientRect().top < -2) {
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 0.9 });
      else el.scrollIntoView({ block: "start" });
    }
    if (!pinned && track.current) track.current.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
  };

  // Keyboard users tabbing along a pinned wall: scroll the page so the focused book is in view.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const el = outer.current;
    const item = (e.target as HTMLElement).closest<HTMLElement>("[data-wall-item]");
    if (!pinned || !el || !item || !distance) return;
    const left = Math.min(Math.max(item.offsetLeft - window.innerWidth * 0.3, 0), distance);
    const top = el.getBoundingClientRect().top + window.scrollY + left;
    if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
    else window.scrollTo(0, top);
  };

  return (
    <section id="collection" aria-labelledby="collection-title" className="relative bg-ink text-white">
      {/* Clears the studio film that hangs over this section's top edge on desktop */}
      <div aria-hidden className="hidden h-[clamp(8rem,16vw,14rem)] lg:block" />
      <div ref={outer} style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}>
        <div className={cn("flex flex-col overflow-hidden", pinned ? "sticky top-0 h-[100svh]" : "py-[clamp(4rem,10vw,6rem)] lg:pt-0")}>
          {/* Wall header */}
          <div className={cn("container-site", pinned ? "pt-[clamp(4.5rem,9vh,6rem)]" : "")}>
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <Kicker tone="dark">The Collection · {total} titles</Kicker>
                <h2 id="collection-title" className="mt-4 overflow-hidden text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={label}
                      className="block"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      {label}
                    </motion.span>
                  </AnimatePresence>
                </h2>
              </div>
  
              <LayoutGroup id="wall-filter">
                <div
                  role="group"
                  aria-label="Filter the collection"
                  className="-mx-gutter flex gap-x-6 overflow-x-auto px-gutter [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 xl:max-w-[54rem] xl:justify-end"
                >
                  {filters.map((f) => {
                    const active = f.id === filter;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => choose(f.id)}
                        className={cn(
                          "relative shrink-0 py-2.5 text-[1rem] font-semibold transition-colors duration-300",
                          active ? "text-white" : "text-white/50 hover:text-white",
                        )}
                      >
                        {f.label}
                        <sup className="ml-1 text-[0.7rem] tabular-nums text-white/40">{booksFor(f.id).length}</sup>
                        {active && (
                          <motion.span
                            layoutId="wall-underline"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-brand"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>
          </div>
  
          {/* The wall */}
          <div className={cn("relative mt-6", pinned ? "min-h-0 flex-1 pb-4" : "")}>
            <motion.div
              ref={track}
              key={filter}
              onFocus={onFocus}
              style={pinned ? { x } : undefined}
              className={cn(
                "flex gap-[clamp(1.5rem,3vw,3rem)] px-gutter",
                "[&:has([data-wall-item]:hover)_[data-wall-item]:not(:hover)]:opacity-55",
                pinned
                  ? "h-full w-max"
                  : "h-[min(74svh,38rem)] snap-x snap-mandatory scroll-px-gutter overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:thin]",
              )}
            >
              {entries.map((entry, i) =>
                entry.kind === "chapter" ? (
                  <Chapter key={entry.key} entry={entry} />
                ) : (
                  <WallBook key={entry.key} entry={entry} delay={Math.min(i, 6) * 0.06} onOpen={setOpen} />
                ),
              )}
              <WallEnd />
            </motion.div>
          </div>
  
          {/* Progress */}
          {pinned && (
            <div className="container-site pb-[clamp(1.25rem,3vh,2rem)]">
              <div className="flex items-center gap-5 text-[0.85rem] text-white/50">
                <span className="eyebrow text-[0.7rem]">Scroll to walk the wall</span>
                <span className="relative h-px flex-1 bg-white/15">
                  <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-brand" />
                </span>
                <span className="tabular-nums">{total} books</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <BookDialog book={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function Chapter({ entry }: { entry: Extract<Entry, { kind: "chapter" }> }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="flex w-[min(17rem,70vw)] shrink-0 snap-start flex-col justify-end border-l border-white/20 pb-[7.5rem] pl-6"
    >
      <span className="font-serif text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-none text-brand">{entry.index}</span>
      <h3 className="mt-4 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.02] tracking-[-0.02em]">{entry.label}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">{entry.note}</p>
      <p className="eyebrow mt-5 text-[0.7rem] text-white/45">
        {entry.count} {entry.count === 1 ? "title" : "titles"}
      </p>
    </motion.div>
  );
}

function WallBook({
  entry,
  delay,
  onOpen,
}: {
  entry: Extract<Entry, { kind: "book" }>;
  delay: number;
  onOpen: (b: PortfolioBook) => void;
}) {
  const { book, size, low, n } = entry;
  return (
    <motion.div
      data-wall-item
      initial={{ opacity: 0, y: low ? 50 : -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE, delay }}
      className={cn(
        "group flex h-full shrink-0 snap-start flex-col transition-opacity duration-500",
        low ? "justify-end" : "justify-start",
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(book)}
        aria-label={`${book.title} by ${book.author}${book.status ? ` (${book.status.toLowerCase()})` : ""} — view details`}
        className="flex min-w-[13.5rem] flex-col text-left outline-offset-4"
        style={{ height: `calc(${COVER_H[size]} + 7.5rem)` }}
      >
        <span
          className="relative block aspect-[2/3] shrink-0 overflow-hidden bg-white/5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-2.5"
          style={{ height: `calc(100% - 7.5rem)` }}
        >
          <Image
            src={book.cover}
            alt=""
            fill
            sizes={size === "lg" ? "(min-width: 768px) 32vh, 60vw" : "(min-width: 768px) 26vh, 48vw"}
            className="object-cover transition-transform duration-1000 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
          />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-black/30 via-white/10 to-transparent" />
          {book.status && (
            <span className="eyebrow absolute left-3 top-3 bg-brand px-2.5 py-1.5 text-[0.62rem] text-white">{book.status}</span>
          )}
        </span>

        {/* Caption: always shows title and author; the description slides in on hover / focus */}
        <span className="relative mt-3.5 block h-[6.75rem] w-full max-w-[17rem] overflow-hidden">
          <span className="flex items-baseline gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/45">
            <span className="tabular-nums text-brand">{String(n).padStart(2, "0")}</span>
            <span className="truncate">{book.genre}</span>
          </span>
          <span className="mt-1.5 block font-serif text-[1.3rem] font-semibold leading-tight text-white">{book.title}</span>
          <span className="relative mt-1 block">
            <span className="block text-[0.92rem] text-white/60 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-0 group-focus-visible:-translate-y-2 group-focus-visible:opacity-0">
              {book.author}
            </span>
            <span className="absolute inset-x-0 top-0 block translate-y-3 text-[0.88rem] leading-snug text-white/75 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="line-clamp-2">{book.description}</span>
              <span className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-white">
                View details <ArrowRight aria-hidden className="size-3.5" />
              </span>
            </span>
          </span>
        </span>
      </button>
    </motion.div>
  );
}

function WallEnd() {
  return (
    <div className="flex w-[min(22rem,80vw)] shrink-0 snap-start flex-col justify-center border-l border-white/20 pl-8 pr-[10vw]">
      <p className="font-serif text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
        The next book on this wall <span className="italic text-brand">could be yours.</span>
      </p>
      <Link
        href={pages["start-your-book"].path}
        className="group mt-8 inline-flex min-h-12 items-center gap-2 self-start font-semibold text-white underline decoration-brand decoration-2 underline-offset-[6px]"
      >
        Start your book
        <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
