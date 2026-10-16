import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { headingId, type ArticleBlock } from "@/data/articles";
import { pages } from "@/data/pages";

/** Renders an article's structured body with comfortable reading typography. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="text-[1.075rem] leading-[1.8] text-ink-soft">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={headingId(b.text)}
                className="mt-14 scroll-mt-6 text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.2] tracking-[-0.02em] text-ink outline-none first:mt-0"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-9 text-[1.3rem] leading-snug text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-5">
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="relative pl-7">
                    <span aria-hidden className="absolute left-0 top-[0.8em] h-0.5 w-3.5 bg-brand" />
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-6 space-y-3">
                {b.items.map((it, n) => (
                  <li key={it} className="grid grid-cols-[2.25rem_1fr]">
                    <span aria-hidden className="font-serif font-semibold tabular-nums text-brand">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    {it}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-12 border-l-4 border-brand py-1 pl-6 sm:pl-8">
                <p className="font-serif text-[clamp(1.4rem,2.3vw,1.85rem)] font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
                  {b.text}
                </p>
              </blockquote>
            );
          case "note":
            return (
              <aside key={i} className="mt-12 bg-ink p-7 text-white sm:p-9">
                <p className="font-serif text-[1.35rem] font-semibold leading-snug">{b.title}</p>
                <p className="mt-3 text-[1rem] leading-relaxed text-white/80">{b.text}</p>
                <Link
                  href={pages["start-your-book"].path}
                  className="group mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-brand decoration-2 underline-offset-[6px] hover:decoration-white"
                >
                  Talk to our team
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </aside>
            );
        }
      })}
    </div>
  );
}
