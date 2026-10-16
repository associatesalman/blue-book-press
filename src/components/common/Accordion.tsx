"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export type AccordionItem = { q: string; a: string[] };

/**
 * Simple accessible accordion: native buttons with aria-expanded /
 * aria-controls, labelled regions, several items open at once and a
 * smooth height transition. Closed panels are hidden from assistive tech.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const base = useId();
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3 className="font-sans">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "pt-0.5 font-serif text-[clamp(1.1rem,1.5vw,1.28rem)] font-semibold leading-snug transition-colors",
                    isOpen ? "text-brand" : "text-ink group-hover:text-brand",
                  )}
                >
                  {item.q}
                </span>
                <PlusMinus open={isOpen} />
              </button>
            </h3>
            <motion.div
              id={panel}
              role="region"
              aria-labelledby={btn}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1, visibility: "visible" } : { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }}
              transition={{ height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.3 } }}
              className="overflow-hidden"
            >
              <div className="max-w-3xl pb-7 pr-12 text-[1.02rem] leading-[1.75] text-ink-soft">
                {item.a.map((p, n) => (
                  <p key={n} className={n ? "mt-3" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
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
