"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projectStories, type PortfolioBook, type ProjectStory } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { EASE, Kicker, LineReveal, MaskReveal, Parallax } from "./motion";

/**
 * How selected books moved through the press: alternating magazine spreads.
 * Covers are layered on a flat paper panel and drift at different speeds
 * while the text column stays pinned beside them.
 */
export function ProjectStories() {
  return (
    <section aria-labelledby="stories-title" className="bg-white py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker>Through the press</Kicker>
            <LineReveal
              id="stories-title"
              className="mt-6 text-[clamp(2.8rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink"
              lines={[
                "How the work",
                <span key="b">
                  was <span className="italic text-brand">made.</span>
                </span>,
              ]}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="max-w-sm text-[1.05rem] leading-relaxed text-ink-muted lg:col-span-4 lg:justify-self-end"
          >
            A cover is the visible result. These three projects show the services and decisions behind it.
          </motion.p>
        </div>

        <div className="mt-[clamp(3rem,7vw,6rem)]">
          {projectStories.map((p, i) => (
            <Story key={p.id} story={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Story({ story, index }: { story: ProjectStory; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 border-t-2 border-ink py-[clamp(3.5rem,7vw,6.5rem)] lg:grid-cols-12">
      {/* Composition */}
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <MaskReveal bleed className="relative aspect-[5/4] bg-mist sm:aspect-[4/3] lg:aspect-[6/7]" direction={flip ? "left" : "right"}>
          <Composition books={story.books} flip={flip} />
        </MaskReveal>
      </div>

      {/* Text, pinned beside the composition on desktop */}
      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <div className="lg:sticky lg:top-28">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] font-semibold leading-none text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="eyebrow text-right text-[0.72rem] text-ink-muted">
              {story.label}
              <span className="block text-ink">{story.author}</span>
            </span>
          </div>
          <LineReveal
            as="h3"
            className="mt-6 text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.05] tracking-[-0.025em] text-ink"
            lines={[story.title]}
          />
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">{story.story}</p>

          <ol aria-label="Services on this project" className="mt-8 border-t border-line">
            {story.steps.map((s, i) => (
              <motion.li
                key={s.service}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-line py-4"
              >
                <span className="pt-0.5 text-[0.8rem] font-bold tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-semibold text-ink">{s.service}</span>
                  <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-ink-muted">{s.note}</span>
                </span>
              </motion.li>
            ))}
          </ol>

          <p className="mt-7 border-l-[3px] border-brand pl-5 font-serif text-[1.25rem] leading-snug text-ink">{story.outcome}</p>
        </div>
      </div>
    </article>
  );
}

function Cover({ book, sizes, className, priority }: { book: PortfolioBook; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[2/3] overflow-hidden shadow-[0_40px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/5", className)}>
      <Image src={book.cover} alt={`${book.title} by ${book.author}, book cover`} fill sizes={sizes} priority={priority} className="object-cover" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-black/25 via-white/10 to-transparent" />
    </div>
  );
}

/** Layered covers on the paper panel; each layer drifts at its own speed. */
function Composition({ books, flip }: { books: PortfolioBook[]; flip: boolean }) {
  if (books.length === 1) {
    const [b] = books;
    // One title: the cover, plus an enlarged detail of its own artwork.
    return (
      <>
        <Parallax speed={30} className={cn("absolute top-[9%] w-[48%]", flip ? "right-[10%]" : "left-[10%]")}>
          <Cover book={b} sizes="(min-width: 1024px) 26vw, 46vw" />
        </Parallax>
        <Parallax speed={-40} className={cn("absolute bottom-[-6%] w-[40%]", flip ? "left-0 sm:left-[-3%]" : "right-0 sm:right-[-3%]")}>
          <figure>
            <div className="relative aspect-square overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]">
              <Image src={b.cover} alt="" fill sizes="(min-width: 1024px) 22vw, 40vw" className="scale-[2.1] object-cover object-[50%_92%]" />
            </div>
            <figcaption className="eyebrow mt-3 text-[0.65rem] text-ink-muted">Cover detail</figcaption>
          </figure>
        </Parallax>
      </>
    );
  }
  if (books.length === 2) {
    return (
      <>
        <Parallax speed={20} className={cn("absolute top-[8%] w-[42%]", flip ? "right-[8%]" : "left-[8%]")}>
          <Cover book={books[0]} sizes="(min-width: 1024px) 22vw, 42vw" />
        </Parallax>
        <Parallax speed={-45} className={cn("absolute bottom-[-7%] w-[42%]", flip ? "left-[6%]" : "right-[6%]")}>
          <Cover book={books[1]} sizes="(min-width: 1024px) 22vw, 42vw" />
        </Parallax>
      </>
    );
  }
  return (
    <>
      <Parallax speed={35} className="absolute left-[5%] top-[14%] w-[34%]">
        <Cover book={books[0]} sizes="(min-width: 1024px) 18vw, 34vw" />
      </Parallax>
      <Parallax speed={-30} className="absolute left-[33%] top-[26%] z-10 w-[36%]">
        <Cover book={books[1]} sizes="(min-width: 1024px) 19vw, 36vw" />
      </Parallax>
      <Parallax speed={50} className="absolute right-[4%] top-[8%] w-[32%]">
        <Cover book={books[2]} sizes="(min-width: 1024px) 17vw, 32vw" />
      </Parallax>
    </>
  );
}
