"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { useLenis } from "@/components/common/Providers";
import { cn } from "@/lib/cn";

type Item = { id: string; text: string };

/**
 * Table of contents: a sticky list beside the article on large screens and a
 * collapsible panel above it on smaller ones. Highlights the section being
 * read and scrolls smoothly (via Lenis) to the chosen heading.
 */
export function ArticleToc({ items, label = "In this article" }: { items: Item[]; label?: string }) {
  const lenis = useLenis();
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(history.state, "", `#${id}`);
    setActive(id);
    // Move keyboard focus to the section for screen readers and keyboard users.
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  const list = (
    <ol className="space-y-1">
      {items.map((it, i) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={go(it.id)}
            aria-current={active === it.id ? "location" : undefined}
            className={cn(
              "flex gap-3 border-l-2 py-1.5 pl-4 text-[0.95rem] leading-snug transition-colors",
              active === it.id ? "border-brand font-semibold text-ink" : "border-line text-ink-muted hover:border-ink hover:text-ink",
            )}
          >
            <span aria-hidden className="tabular-nums text-ink-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            {it.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="group border-y border-line lg:hidden">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
          {label}
          <ChevronDown aria-hidden className="size-5 text-brand transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <nav aria-label={label} className="pb-5">
          {list}
        </nav>
      </details>

      <nav aria-label={label} className="hidden lg:block">
        <p className="eyebrow mb-4 text-[0.72rem] text-ink-muted">{label}</p>
        {list}
      </nav>
    </>
  );
}
