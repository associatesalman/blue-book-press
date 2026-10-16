"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { articleCategories, type Article, type ArticleCategory } from "@/data/articles";
import { pages } from "@/data/pages";
import { EASE } from "@/components/portfolio/motion";
import { cn } from "@/lib/cn";
import { LeadStory, MediumStory, SmallStory, WideRow } from "./ArticlePreview";
import { ContactStrip } from "./ResourceSections";

type Filter = "All Articles" | ArticleCategory;
const filters: Filter[] = ["All Articles", ...articleCategories];

const toParam = (f: Filter) => (f === "All Articles" ? "" : f.toLowerCase().replace(/\s+/g, "-"));
const fromParam = (p: string | null): Filter =>
  articleCategories.find((c) => toParam(c) === p) ?? "All Articles";

/**
 * Filterable article collection. Each view is composed editorially rather
 * than as a uniform grid: a lead story, two medium blocks, a contact strip,
 * wide rows, then small supporting articles.
 * The active category is mirrored to ?category= so it can be linked to.
 */
export function ArticleLibrary({ items }: { items: Article[] }) {
  const [filter, setFilter] = useState<Filter>("All Articles");

  // Read the category from the URL after mount (keeps the page static).
  useEffect(() => {
    setFilter(fromParam(new URLSearchParams(window.location.search).get("category")));
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    const p = toParam(f);
    if (p) url.searchParams.set("category", p);
    else url.searchParams.delete("category");
    window.history.replaceState(window.history.state, "", url);
  };

  const counts = useMemo(() => {
    const m = new Map<Filter, number>([["All Articles", items.length]]);
    for (const c of articleCategories) m.set(c, items.filter((a) => a.category === c).length);
    return m;
  }, [items]);

  const visible = filter === "All Articles" ? items : items.filter((a) => a.category === filter);
  const [lead, ...rest] = visible;
  const medium = rest.slice(0, 2);
  // 3–5 wide rows, chosen so the three-column grid of small articles has no orphans.
  const remaining = rest.length - medium.length;
  const wideCount = remaining <= 5 ? remaining : [4, 3, 5].find((n) => (remaining - n) % 3 === 0)!;
  const wide = rest.slice(2, 2 + wideCount);
  const small = rest.slice(2 + wideCount);

  return (
    <section id="articles" aria-labelledby="articles-title" className="scroll-mt-6 bg-white pb-section">
      <div className="container-site">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="articles-title" className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ink">
            Browse the library
          </h2>
          <p aria-live="polite" className="text-[0.95rem] text-ink-muted">
            {visible.length} {visible.length === 1 ? "article" : "articles"}
            {filter !== "All Articles" && <> in {filter}</>}
          </p>
        </div>

        {/* Category filter — scrolls sideways on small screens */}
        <div className="-mx-gutter mt-7 overflow-x-auto px-gutter [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-line md:mx-0 md:px-0">
          <div role="group" aria-label="Filter articles by category" className="isolate flex w-max gap-2 pb-5 md:w-auto md:flex-wrap">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f)}
                  className={cn(
                    "relative inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4.5 text-[0.95rem] font-semibold transition-colors duration-300",
                    active ? "border-ink text-white" : "border-line text-ink-soft hover:border-ink hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="article-filter"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                    />
                  )}
                  {f}
                  <span className={cn("text-[0.8rem] tabular-nums", active ? "text-white/70" : "text-ink-muted")}>{counts.get(f)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="isolate"
          >
            {/* Group one: lead + medium */}
            {lead && (
              <div className="mt-12">
                <LeadStory article={lead} />
              </div>
            )}
            {medium.length > 0 && (
              <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
                {medium.map((a) => (
                  <MediumStory key={a.slug} article={a} />
                ))}
              </div>
            )}

            <ContactStrip
              className="my-[clamp(3.5rem,7vw,5.5rem)]"
              title="Not Sure Which Publishing Path Fits Your Book?"
              text="Our team can help you understand the next practical step based on your manuscript, goals, and publishing plans."
              primary={{ label: "Contact Our Team", href: pages["start-your-book"].path }}
              secondary={{ label: "Explore Publishing Services", href: pages["publishing-pathways"].path }}
            />

            {/* Group two: wide rows + small supporting articles */}
            {wide.length > 0 && (
              <div className="border-b border-line">
                {wide.map((a) => (
                  <WideRow key={a.slug} article={a} />
                ))}
              </div>
            )}
            {small.length > 0 && (
              <>
                <h3 className="eyebrow mt-16 text-[0.78rem] text-ink-muted">More guidance</h3>
                <div className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {small.map((a, i) => (
                    <SmallStory key={a.slug} article={a} index={i + 1} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
