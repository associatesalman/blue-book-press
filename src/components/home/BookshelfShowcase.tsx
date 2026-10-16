"use client";

import dynamic from "next/dynamic";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { TextLink } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { shelfBooks, type ShelfCategory } from "@/data/books";
import { pages } from "@/data/pages";
import { cn } from "@/lib/cn";

// Three.js is only downloaded when this section approaches the viewport.
const ShelfCanvas = dynamic(() => import("@/components/bookshelf/ShelfCanvas"), { ssr: false });

const labelStyle: Record<ShelfCategory, string> = {
  "Best Selling": "bg-ink text-white",
  "Featured Titles": "bg-brand text-white",
  "New Releases": "border-2 border-ink text-ink",
  Upcoming: "border-2 border-brand text-brand",
};

/** The homepage's single 3D section: four books arrive one by one above their categories. */
export function BookshelfShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const slots = useMemo(() => shelfBooks.map(() => createRef<HTMLDivElement>()), []);
  const near = useInView(container, { once: true, margin: "400px 0px" });
  const visible = useInView(container, { amount: 0.25 });
  const onScreen = useInView(container, { margin: "100px 0px" });
  const reducedMotion = !!useReducedMotion();
  const [play, setPlay] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (visible) setPlay(true);
  }, [visible]);

  return (
    <section id="bookshelf" className="relative overflow-hidden bg-white py-section">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-white to-mist" />
      <div className="container-site relative">
        <SectionHeader
          align="center"
          eyebrow="The Bookshelf"
          title="Books that found their readers."
          intro="A glimpse of the titles we have edited, designed, published and launched — from reader favourites to books still on the press."
        />

        <div ref={container} className="relative mt-11">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-0">
            {shelfBooks.map((book, i) => (
              <li
                key={book.model}
                className="flex flex-col items-center text-center lg:border-l lg:border-line lg:px-6 lg:first:border-l-0"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Slot the 3D book renders into */}
                <div ref={slots[i]} aria-hidden className="relative h-64 w-full sm:h-72 lg:h-80">
                  <span className="pointer-events-none absolute inset-x-[24%] bottom-[4%] h-4 rounded-[50%] bg-ink/15 blur-md" />
                </div>
                <Reveal delay={0.25 + i * 0.12} className="mt-6">
                  <span className={cn("eyebrow inline-block whitespace-nowrap rounded-full px-3 py-2 text-[0.72rem] tracking-[0.1em] sm:px-4 sm:text-[0.8125rem] sm:tracking-[0.16em]", labelStyle[book.category])}>
                    {book.category}
                  </span>
                  <h3 className="mt-4 text-[1.4rem] leading-tight text-ink">{book.title}</h3>
                  <p className="mt-1 text-[0.98rem] text-ink-muted">by {book.author}</p>
                  <p className="mx-auto mt-3 max-w-[15rem] text-[0.98rem] leading-relaxed text-ink-soft">{book.note}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          {near && (
            <ShelfCanvas
              container={container}
              slots={slots}
              play={play}
              hovered={hovered}
              active={onScreen}
              reducedMotion={reducedMotion}
            />
          )}
        </div>

        <div className="mt-10 text-center">
          <TextLink href={pages.portfolio.path} className="text-ink decoration-brand hover:text-brand">
            Explore the full Portfolio
          </TextLink>
        </div>
      </div>
    </section>
  );
}
