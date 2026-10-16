"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, Search, X } from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLenis } from "@/components/common/Providers";
import { EASE } from "@/components/portfolio/motion";
import { faqCategories, faqs, type Faq, type FaqCategory } from "@/data/faqs";
import { cn } from "@/lib/cn";
import { ResourceHero } from "./ResourceSections";

type Filter = "All" | FaqCategory;

const normalise = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wraps every search term found in `text` in a <mark>. */
function highlight(text: string, terms: string[]): ReactNode {
  if (!terms.length) return text;
  const parts = text.split(new RegExp(`(${terms.map(escape).join("|")})`, "gi"));
  return parts.map((p, i) =>
    i % 2 ? (
      <mark key={i} className="bg-brand/15 text-ink">
        {p}
      </mark>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

/**
 * The searchable FAQ: hero with live search, category navigation (sticky
 * side list on desktop, horizontal filter on mobile) and an accessible
 * accordion. Several answers can be open at once; each question has its own
 * link (/faqs#question-id) that opens and scrolls to it.
 */
export function FaqExplorer() {
  const lenis = useLenis();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const terms = useMemo(() => normalise(query).split(/\s+/).filter((t) => t.length > 1), [query]);
  const matches = useCallback(
    (f: Faq) => {
      if (!terms.length) return true;
      const hay = normalise(`${f.q} ${f.a.join(" ")} ${f.category}`);
      return terms.every((t) => hay.includes(t));
    },
    [terms],
  );

  const found = useMemo(() => faqs.filter(matches), [matches]);
  const visible = filter === "All" ? found : found.filter((f) => f.category === filter);
  const grouped = faqCategories
    .map((c) => ({ category: c, items: visible.filter((f) => f.category === c) }))
    .filter((g) => g.items.length);
  const count = (c: Filter) => (c === "All" ? found.length : found.filter((f) => f.category === c).length);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = visible.length > 0 && visible.every((f) => open.has(f.id));
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(visible.map((f) => f.id)));

  const scrollToEl = useCallback(
    (el: HTMLElement) => {
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );

  // Deep links: /faqs#question-id opens that answer and brings it into view.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const faq = faqs.find((f) => f.id === id);
      if (!faq) return;
      setQuery("");
      setFilter("All");
      setOpen((prev) => new Set(prev).add(id));
      window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) scrollToEl(el);
      }, 120);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [scrollToEl]);

  const copyLink = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    history.replaceState(history.state, "", `#${id}`);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 2000);
    } catch {
      // Clipboard unavailable — the address bar now holds the link.
    }
  };

  const choose = (f: Filter) => {
    setFilter(f);
    const top = listRef.current;
    if (top && top.getBoundingClientRect().top < 0) scrollToEl(top);
  };

  return (
    <>
      <ResourceHero
        centered
        label="Author Resources"
        lines={["Questions About Publishing?", <span key="b" className="text-brand">Start Here.</span>]}
        description="Find straightforward answers about our process, services, ownership, publishing platforms, timelines, and author support."
      >
        <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto mt-10 max-w-2xl">
          <label htmlFor="faq-search" className="sr-only">
            Search publishing questions
          </label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-5 sm:left-6 top-1/2 size-5 -translate-y-1/2 text-brand" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search publishing questions…"
              autoComplete="off"
              aria-controls="faq-list"
              className={cn("h-16 w-full rounded-full border-2 border-ink bg-white pl-13 text-[1rem] sm:pl-15 sm:text-[1.05rem] text-ink outline-none transition-shadow placeholder:text-ink-muted focus:border-brand focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand-blue)_18%,transparent)] [&::-webkit-search-cancel-button]:hidden", query ? "pr-14" : "pr-5")}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-mist hover:text-ink"
              >
                <X aria-hidden className="size-5" />
              </button>
            )}
          </div>
          <p aria-live="polite" className="mt-4 min-h-[1.5em] text-[0.95rem] text-ink-muted">
            {terms.length > 0 &&
              (found.length ? `${found.length} ${found.length === 1 ? "answer" : "answers"} found` : "No answers match your search")}
          </p>
        </form>
      </ResourceHero>

      <section aria-label="Frequently asked questions" className="bg-white pb-section">
        <div ref={listRef} className="container-site scroll-mt-6 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          {/* Category navigation */}
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4 hidden text-[0.72rem] text-ink-muted lg:block">Categories</p>
            <div className="-mx-gutter overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              <ul className="flex w-max gap-2 border-b border-line pb-5 lg:w-auto lg:flex-col lg:gap-0 lg:border-b-0 lg:pb-0">
                {(["All", ...faqCategories] as Filter[]).map((c) => {
                  const active = c === filter;
                  const n = count(c);
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => choose(c)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-[0.95rem] font-semibold transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:py-2.5 lg:text-left",
                          active
                            ? "border-ink bg-ink text-white lg:border-brand lg:bg-transparent lg:text-ink"
                            : "border-line text-ink-soft hover:border-ink hover:text-ink lg:border-line",
                          n === 0 && !active && "opacity-50",
                        )}
                      >
                        {c === "All" ? "All questions" : c}
                        <span className={cn("text-[0.8rem] tabular-nums", active ? "text-white/70 lg:text-brand" : "text-ink-muted")}>{n}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link
              href="#ask"
              className="mt-8 hidden border-t border-line pt-6 text-[0.95rem] leading-relaxed text-ink-muted lg:block"
            >
              Can't find your answer?{" "}
              <span className="font-semibold text-brand underline underline-offset-4">Ask our team</span>
            </Link>
          </nav>

          {/* Accordion */}
          <div id="faq-list" className="mt-10 min-w-0 lg:mt-0">
            {visible.length > 0 && (
              <div className="mb-2 flex justify-end">
                <button type="button" onClick={toggleAll} className="text-[0.92rem] font-semibold text-ink-muted underline underline-offset-4 hover:text-brand">
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              </div>
            )}

            {grouped.map((g) => (
              <section key={g.category} aria-labelledby={`cat-${g.category}`} className="mb-12 last:mb-0">
                <h2 id={`cat-${g.category}`} className="flex items-baseline gap-3 pb-3 text-[clamp(1.45rem,2.2vw,1.8rem)] tracking-[-0.02em] text-ink">
                  {highlight(g.category, terms)}
                  <span className="font-sans text-[0.85rem] font-semibold tabular-nums text-ink-muted">{g.items.length}</span>
                </h2>
                <div className="border-t-2 border-ink">
                  {g.items.map((f) => (
                    <FaqItem
                      key={f.id}
                      faq={f}
                      open={open.has(f.id)}
                      onToggle={() => toggle(f.id)}
                      onCopy={() => copyLink(f.id)}
                      copied={copied === f.id}
                      terms={terms}
                    />
                  ))}
                </div>
              </section>
            ))}

            {visible.length === 0 && (
              <div className="border-y border-line py-14 text-center">
                <p className="font-serif text-[1.6rem] font-semibold text-ink">
                  {terms.length ? <>No answers match “{query.trim()}”.</> : "No questions in this category."}
                </p>
                <p className="mx-auto mt-3 max-w-md text-ink-muted">
                  Try a different word, browse all questions, or ask our team directly — we're happy to help.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setFilter("All");
                    }}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    Show all questions
                  </button>
                  <Link
                    href="#ask"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 font-semibold text-white transition-colors hover:bg-ink"
                  >
                    Ask your question
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  faq,
  open,
  onToggle,
  onCopy,
  copied,
  terms,
}: {
  faq: Faq;
  open: boolean;
  onToggle: () => void;
  onCopy: () => void;
  copied: boolean;
  terms: string[];
}) {
  const btn = `${faq.id}-button`;
  const panel = `${faq.id}-panel`;
  return (
    <div id={faq.id} className="scroll-mt-6 border-b border-line">
      <h3 className="font-sans">
        <button
          id={btn}
          type="button"
          aria-expanded={open}
          aria-controls={panel}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left"
        >
          <span
            className={cn(
              "pt-0.5 font-serif text-[clamp(1.1rem,1.5vw,1.28rem)] font-semibold leading-snug transition-colors",
              open ? "text-brand" : "text-ink group-hover:text-brand",
            )}
          >
            {highlight(faq.q, terms)}
          </span>
          <PlusMinus open={open} />
        </button>
      </h3>
      <motion.div
        id={panel}
        role="region"
        aria-labelledby={btn}
        initial={false}
        animate={open ? { height: "auto", opacity: 1, visibility: "visible" } : { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }}
        transition={{ height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.3 } }}
        className="overflow-hidden"
      >
        <div className="max-w-3xl pb-7 pr-12 text-[1.02rem] leading-[1.75] text-ink-soft">
          {faq.a.map((p, i) => (
            <p key={i} className={i ? "mt-3" : undefined}>
              {highlight(p, terms)}
            </p>
          ))}
          <button
            type="button"
            onClick={onCopy}
            tabIndex={open ? undefined : -1}
            className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink-muted transition-colors hover:text-brand"
          >
            {copied ? <Check aria-hidden className="size-4 text-brand" /> : <Link2 aria-hidden className="size-4" />}
            <span aria-live="polite">{copied ? "Link copied" : "Copy link to this answer"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
        open ? "border-brand bg-brand text-white" : "border-ink/80 text-ink group-hover:border-brand group-hover:text-brand",
      )}
    >
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <AnimatePresence initial={false}>
        {!open && (
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute h-3.5 w-0.5 rounded-full bg-current"
          />
        )}
      </AnimatePresence>
    </span>
  );
}
